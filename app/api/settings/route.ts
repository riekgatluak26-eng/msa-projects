import { NextResponse } from 'next/server';
import { getPage, savePage } from '@/lib/db';
import { settingsDefaults } from '@/lib/defaults';

export async function GET() {
  try {
    const saved = await getPage('msa-settings');
    const merged = saved
      ? {
          ...settingsDefaults,
          ...saved,
          site: { ...settingsDefaults.site, ...(saved.site || {}) },
          header: { ...settingsDefaults.header, ...(saved.header || {}) },
          footer: { ...settingsDefaults.footer, ...(saved.footer || {}) },
          account: { ...settingsDefaults.account, ...(saved.account || {}) },
        }
      : settingsDefaults;
    return NextResponse.json(merged);
  } catch (err: any) {
    console.error('[settings GET] error:', err?.message);
    return NextResponse.json(settingsDefaults);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    // ── Preserve the existing account record ──
    // The client shouldn't be able to overwrite credentials through
    // the Site Settings editor. That's handled by /api/auth/update-credentials.
    const existing = (await getPage('msa-settings')) || {};
    const merged = {
      ...body,
      account: existing?.account || body?.account || settingsDefaults.account,
    };

    await savePage('msa-settings', merged);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[settings PUT] error:', err);
    return NextResponse.json(
      { error: err?.message || 'Save failed' },
      { status: 500 }
    );
  }
}