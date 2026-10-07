import { NextResponse } from 'next/server';
import { getPage, savePage } from '@/lib/db';
import { aboutDefaults } from '@/lib/defaults';

export async function GET() {
  try {
    const saved = await getPage('msa-about-page');
    const data = saved ? { ...aboutDefaults, ...saved } : aboutDefaults;
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('[about GET] error:', err?.message);
    return NextResponse.json(aboutDefaults);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }
    await savePage('msa-about-page', body);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[about PUT] error:', err);
    return NextResponse.json(
      { error: err?.message || 'Save failed' },
      { status: 500 }
    );
  }
}