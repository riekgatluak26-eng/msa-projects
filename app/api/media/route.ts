import { NextResponse } from 'next/server';
import { getPage, savePage } from '@/lib/db';
import { mediaDefaults } from '@/lib/defaults';

export async function GET() {
  try {
    const saved = await getPage('msa-media-page');
    const data = saved ? { ...mediaDefaults, ...saved } : mediaDefaults;
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('[media GET] error:', err?.message);
    return NextResponse.json(mediaDefaults);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }
    await savePage('msa-media-page', body);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[media PUT] error:', err);
    return NextResponse.json({ error: err?.message || 'Save failed' }, { status: 500 });
  }
}