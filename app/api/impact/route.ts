import { NextResponse } from 'next/server';
import { getPage, savePage } from '@/lib/db';
import { impactPageDefaults } from '@/lib/defaults';

export async function GET() {
  try {
    const saved = await getPage('msa-impact-page');
    const data = saved ? { ...impactPageDefaults, ...saved } : impactPageDefaults;
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('[impact GET] error:', err?.message);
    return NextResponse.json(impactPageDefaults);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }
    await savePage('msa-impact-page', body);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[impact PUT] error:', err);
    return NextResponse.json({ error: err?.message || 'Save failed' }, { status: 500 });
  }
}