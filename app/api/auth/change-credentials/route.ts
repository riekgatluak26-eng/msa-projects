import { NextResponse } from 'next/server';
import { getPage, savePage } from '@/lib/db';
import { settingsDefaults } from '@/lib/defaults';
import crypto from 'crypto';

const FALLBACK_USERNAME = process.env.ADMIN_USERNAME || '';
const FALLBACK_PASSWORD = process.env.ADMIN_PASSWORD || '';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { currentPassword, newUsername, newPassword, confirmPassword } = body;

    /* ── Validate current password is provided ───────────── */
    if (!currentPassword) {
      return NextResponse.json(
        { error: 'Please enter your current password to confirm changes.' },
        { status: 400 }
      );
    }

    /* ── Load existing account ───────────────────────────── */
    const existing = (await getPage('msa-settings')) || {};
    const storedUsername = existing?.account?.username || FALLBACK_USERNAME;
    const storedHash = existing?.account?.passwordHash || '';

    /* ── Verify current password ─────────────────────────── */
    const candidateHash = hashPassword(currentPassword);
    const currentIsValid = storedHash
      ? candidateHash === storedHash
      : candidateHash === hashPassword(FALLBACK_PASSWORD);

    if (!currentIsValid) {
      return NextResponse.json(
        { error: 'Current password is incorrect.' },
        { status: 401 }
      );
    }

    /* ── Validate new username (if changed) ──────────────── */
    const trimmedUsername = (newUsername || '').trim();
    if (trimmedUsername && trimmedUsername.length < 3) {
      return NextResponse.json(
        { error: 'Username must be at least 3 characters long.' },
        { status: 400 }
      );
    }
    if (trimmedUsername && !/^[a-zA-Z0-9._-]+$/.test(trimmedUsername)) {
      return NextResponse.json(
        {
          error:
            'Username can only contain letters, numbers, dots, dashes and underscores.',
        },
        { status: 400 }
      );
    }

    /* ── Validate new password (if changed) ──────────────── */
    if (newPassword) {
      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: 'New password must be at least 6 characters.' },
          { status: 400 }
        );
      }
      if (newPassword !== confirmPassword) {
        return NextResponse.json(
          { error: 'New passwords do not match.' },
          { status: 400 }
        );
      }
    }

    /* ── Build updated account ───────────────────────────── */
    const updatedAccount = {
      username: trimmedUsername || storedUsername,
      passwordHash: newPassword ? hashPassword(newPassword) : storedHash,
    };

    const merged = {
      ...settingsDefaults,
      ...existing,
      account: updatedAccount,
    };

    await savePage('msa-settings', merged);

    return NextResponse.json({
      success: true,
      username: updatedAccount.username,
      passwordChanged: !!newPassword,
      usernameChanged: trimmedUsername !== storedUsername,
    });
  } catch (err: any) {
    console.error('[change-credentials] error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to update credentials.' },
      { status: 500 }
    );
  }
}