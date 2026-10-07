import { NextResponse } from 'next/server';
import { getPage, savePage } from '@/lib/db';
import { governanceDefaults } from '@/lib/defaults';

export async function GET() {
  try {
    const saved = await getPage('msa-governance-page');
    const data = saved ? { ...governanceDefaults, ...saved } : governanceDefaults;
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('[governance GET] error:', err?.message);
    return NextResponse.json(governanceDefaults);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }
    await savePage('msa-governance-page', body);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[governance PUT] error:', err);
    return NextResponse.json({ error: err?.message || 'Save failed' }, { status: 500 });
  }
}