import { NextResponse } from 'next/server';
import { getPage, savePage } from '@/lib/db';
import { healthDefaults } from '@/lib/defaults';

export async function GET() {
  try {
    const saved = await getPage('msa-health-page');
    const data = saved ? { ...healthDefaults, ...saved } : healthDefaults;
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('[health GET] error:', err?.message);
    return NextResponse.json(healthDefaults);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }
    await savePage('msa-health-page', body);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[health PUT] error:', err);
    return NextResponse.json(
      { error: err?.message || 'Save failed' },
      { status: 500 }
    );
  }
}