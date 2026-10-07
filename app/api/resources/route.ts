import { NextResponse } from 'next/server';
import { getPage, savePage } from '@/lib/db';
import { resourcesPageDefaults } from '@/lib/defaults';

export async function GET() {
  try {
    const saved = await getPage('msa-resources');
    const data = saved ? { ...resourcesPageDefaults, ...saved } : resourcesPageDefaults;
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('[resources GET] error:', err?.message);
    return NextResponse.json(resourcesPageDefaults);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }
    await savePage('msa-resources', body);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[resources PUT] error:', err);
    return NextResponse.json({ error: err?.message || 'Save failed' }, { status: 500 });
  }
}