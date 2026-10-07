import { NextResponse } from 'next/server';
import { getPage, savePage } from '@/lib/db';
import { contactPageDefaults } from '@/lib/defaults';

export async function GET() {
  try {
    const saved = await getPage('msa-contact-page');
    const data = saved ? { ...contactPageDefaults, ...saved } : contactPageDefaults;
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('[contact GET] error:', err?.message);
    return NextResponse.json(contactPageDefaults);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }
    await savePage('msa-contact-page', body);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[contact PUT] error:', err);
    return NextResponse.json({ error: err?.message || 'Save failed' }, { status: 500 });
  }
}