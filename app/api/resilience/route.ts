import { NextResponse } from 'next/server';
import { getPage, savePage } from '@/lib/db';
import { resilienceDefaults } from '@/lib/defaults';

export async function GET() {
  try {
    const saved = await getPage('msa-resilience-page');
    const data = saved ? { ...resilienceDefaults, ...saved } : resilienceDefaults;
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('[resilience GET] error:', err?.message);
    return NextResponse.json(resilienceDefaults);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }
    await savePage('msa-resilience-page', body);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[resilience PUT] error:', err);
    return NextResponse.json(
      { error: err?.message || 'Save failed' },
      { status: 500 }
    );
  }
}