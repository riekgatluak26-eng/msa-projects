import { NextResponse } from 'next/server';
import { getPage, savePage } from '@/lib/db';
import { protectionDefaults } from '@/lib/defaults';

export async function GET() {
  try {
    const saved = await getPage('msa-protection-page');
    const data = saved ? { ...protectionDefaults, ...saved } : protectionDefaults;
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('[protection GET] error:', err?.message);
    return NextResponse.json(protectionDefaults);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }
    await savePage('msa-protection-page', body);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[protection PUT] error:', err);
    return NextResponse.json({ error: err?.message || 'Save failed' }, { status: 500 });
  }
}