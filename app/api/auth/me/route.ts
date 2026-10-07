import { NextResponse } from 'next/server';
import { getPage } from '@/lib/db';

const FALLBACK_USERNAME = 'sustainable';

export async function GET() {
  try {
    const existing = (await getPage('msa-settings')) || {};
    const username = existing?.account?.username || FALLBACK_USERNAME;
    const hasCustomPassword = !!existing?.account?.passwordHash;
    return NextResponse.json({ username, hasCustomPassword });
  } catch {
    return NextResponse.json({
      username: FALLBACK_USERNAME,
      hasCustomPassword: false,
    });
  }
}