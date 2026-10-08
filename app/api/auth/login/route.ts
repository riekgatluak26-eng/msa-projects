import { NextResponse } from 'next/server';
import { getPage } from '@/lib/db';
import crypto from 'crypto';
import {
  checkRateLimit,
  recordFailedAttempt,
  clearAttempts,
  getClientIp,
} from '@/lib/rateLimit';

const FALLBACK_USERNAME = process.env.ADMIN_USERNAME || '';
const FALLBACK_PASSWORD = process.env.ADMIN_PASSWORD || '';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateKey = `login:${ip}`;

    /* ── Rate limit check ─────────────────────────────── */
    const status = checkRateLimit(rateKey);
    if (!status.allowed) {
      const minutes = Math.floor(status.retryAfterSeconds / 60);
      const seconds = status.retryAfterSeconds % 60;
      const timeStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
      return NextResponse.json(
        {
          success: false,
          blocked: true,
          retryAfterSeconds: status.retryAfterSeconds,
          error: `Too many failed attempts. Please try again in ${timeStr}.`,
        },
        { status: 429 }
      );
    }

    /* ── Read body ───────────────────────────────────── */
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required.' },
        { status: 400 }
      );
    }

    const candidateHash = hashPassword(password);

    /* ── Load stored account ─────────────────────────── */
    const settings = (await getPage('msa-settings')) || {};
    const storedUsername = settings?.account?.username || '';
    const storedHash = settings?.account?.passwordHash || '';

    /* ── Check: has the account been customized? ─────────
       If YES  → only custom credentials work
       If NO   → fallback credentials work (bootstrap) */
    const hasCustomCredentials = Boolean(storedUsername && storedHash);

    if (hasCustomCredentials) {
      /* ── Custom credentials set — ONLY those work ───── */
      if (username === storedUsername && candidateHash === storedHash) {
        clearAttempts(rateKey);
        return NextResponse.json({ success: true });
      }
      /* If username matches but password doesn't, or vice-versa,
         fall through to the failure handler below. */
    } else {
      /* ── No custom credentials yet — fallback works ─── */
      if (
        username === FALLBACK_USERNAME &&
        candidateHash === hashPassword(FALLBACK_PASSWORD)
      ) {
        clearAttempts(rateKey);
        return NextResponse.json({ success: true });
      }
    }

    /* ── Failure — record attempt ────────────────────── */
    const after = recordFailedAttempt(rateKey);

    if (!after.allowed) {
      const minutes = Math.floor(after.retryAfterSeconds / 60);
      const seconds = after.retryAfterSeconds % 60;
      const timeStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
      return NextResponse.json(
        {
          success: false,
          blocked: true,
          retryAfterSeconds: after.retryAfterSeconds,
          error: `Too many failed attempts. You are blocked for ${timeStr}.`,
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        remainingAttempts: after.remainingAttempts,
        error: `Invalid username or password. ${after.remainingAttempts} attempt${
          after.remainingAttempts === 1 ? '' : 's'
        } remaining.`,
      },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Authentication error.' },
      { status: 500 }
    );
  }
}