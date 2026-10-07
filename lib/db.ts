import { Pool } from 'pg';

declare global {
  var _pgPool: Pool | undefined;
  var _pgSchemaReady: boolean | undefined;
}

const connectionString = process.env.POSTGRES_URL || '';

if (!connectionString) {
  console.error('[db] POSTGRES_URL is not set! Check .env.local');
}

// Strip SSL params that conflict with our explicit `ssl` option
let sanitizedConnectionString = connectionString;
try {
  const url = new URL(connectionString);
  url.searchParams.delete('sslmode');
  url.searchParams.delete('channel_binding');
  sanitizedConnectionString = url.toString();
} catch {
  // leave as-is if not a valid URL
}

export const pool =
  global._pgPool ||
  new Pool({
    connectionString: sanitizedConnectionString,
    ssl: { rejectUnauthorized: false },
    max: 5,
    // Neon cold start needs up to ~15s. Give it 30s to be safe.
    connectionTimeoutMillis: 30_000,
    idleTimeoutMillis: 30_000,
    // Helps Neon keep the socket healthy
    keepAlive: true,
    keepAliveInitialDelayMillis: 10_000,
  });

if (process.env.NODE_ENV !== 'production') global._pgPool = pool;

// Silence background errors so a dead idle connection doesn't crash the app
pool.on('error', (err) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('[db] idle client error (ignored):', err.message);
  }
});

/**
 * Ensure the `pages` table exists. Runs once per boot.
 */
async function ensureSchema(): Promise<void> {
  if (global._pgSchemaReady) return;
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pages (
        key TEXT PRIMARY KEY,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    global._pgSchemaReady = true;
  } catch (err: any) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[db] ensureSchema failed:', err.message);
    }
  }
}

/**
 * Run a promise with a hard timeout. If it times out, return null.
 */
async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<null>((resolve) => {
    timer = setTimeout(() => resolve(null), ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timer!);
  }
}

/**
 * Retry wrapper — useful for Neon cold starts where the first
 * connection fails but the second succeeds (DB is now awake).
 */
async function withRetry<T>(
  fn: () => Promise<T>,
  attempts = 3,
  delayMs = 1500
): Promise<T> {
  let lastError: any;
  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn();
    } catch (err: any) {
      lastError = err;
      const msg = String(err?.message || '');
      const isTransient =
        msg.includes('timeout') ||
        msg.includes('terminated') ||
        msg.includes('ECONNRESET') ||
        msg.includes('Connection');
      if (!isTransient || i === attempts) throw err;
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[db] attempt ${i} failed (${msg.slice(0, 60)}), retrying…`);
      }
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw lastError;
}

export async function getPage(key: string): Promise<any | null> {
  try {
    await ensureSchema();
    const result = await withTimeout(
      withRetry(() => pool.query('SELECT data FROM pages WHERE key = $1', [key])),
      15_000
    );
    if (!result) {
      console.warn('[db] getPage timed out for key:', key);
      return null;
    }
    return (result as any).rows?.[0]?.data ?? null;
  } catch (error: any) {
    console.warn('[db] getPage failed:', error?.message);
    return null;
  }
}

export async function savePage(key: string, data: any): Promise<boolean> {
  await ensureSchema();
  const json = JSON.stringify(data);

  await withRetry(() =>
    pool.query(
      `INSERT INTO pages (key, data, updated_at)
       VALUES ($1, $2::jsonb, NOW())
       ON CONFLICT (key)
       DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
      [key, json]
    )
  );

  return true;
}

/**
 * Optional: call this on server startup to warm the DB
 * (prevents the first user request from eating the cold start).
 */
export async function warmup(): Promise<void> {
  try {
    await withRetry(() => pool.query('SELECT 1'), 3, 2000);
    if (process.env.NODE_ENV !== 'production') {
      console.log('[db] warmup OK');
    }
  } catch (err: any) {
    console.warn('[db] warmup failed:', err.message);
  }
}