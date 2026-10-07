import { NextResponse } from 'next/server';
import { getPage, savePage } from '@/lib/db';
import { educationDefaults } from '@/lib/defaults';

export async function GET() {
  try {
    const saved = await getPage('msa-education-page');
    const data = saved ? { ...educationDefaults, ...saved } : educationDefaults;
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('[education GET] error:', err?.message);
    return NextResponse.json(educationDefaults);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }
    await savePage('msa-education-page', body);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[education PUT] error:', err);
    return NextResponse.json(
      { error: err?.message || 'Save failed' },
      { status: 500 }
    );
  }
}