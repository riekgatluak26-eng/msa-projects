import { NextResponse } from 'next/server';
import { getPage, savePage } from '@/lib/db';
import { newsPageDefaults } from '@/lib/defaults';

export async function GET() {
  try {
    const saved = await getPage('msa-news');
    const data = saved ? { ...newsPageDefaults, ...saved } : newsPageDefaults;
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('[news GET] error:', err?.message);
    return NextResponse.json(newsPageDefaults);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }
    await savePage('msa-news', body);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[news PUT] error:', err);
    return NextResponse.json({ error: err?.message || 'Save failed' }, { status: 500 });
  }
}