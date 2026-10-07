'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';

export default function AccountPage() {
  /* ── Current account info ─────────────────────────────── */
  const [currentUsername, setCurrentUsername] = useState('');
  const [hasCustomPassword, setHasCustomPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ── Form state ──────────────────────────────────────── */
  const [currentPassword, setCurrentPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);

  /* ── Load current username ───────────────────────────── */
  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((d) => {
        setCurrentUsername(d.username || 'sustainable');
        setNewUsername(d.username || 'sustainable');
        setHasCustomPassword(!!d.hasCustomPassword);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* ── Password strength ───────────────────────────────── */
  const passwordStrength = useMemo(() => {
    if (!newPassword) return { score: 0, label: '', color: '' };
    let score = 0;
    if (newPassword.length >= 6) score++;
    if (newPassword.length >= 10) score++;
    if (/[A-Z]/.test(newPassword)) score++;
    if (/[0-9]/.test(newPassword)) score++;
    if (/[^A-Za-z0-9]/.test(newPassword)) score++;

    if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' };
    if (score <= 3) return { score, label: 'Fair', color: 'bg-amber-500' };
    if (score <= 4) return { score, label: 'Good', color: 'bg-blue-500' };
    return { score, label: 'Strong', color: 'bg-green-500' };
  }, [newPassword]);

  /* ── Detect what's being changed ─────────────────────── */
  const usernameChanged = newUsername.trim() !== currentUsername;
  const passwordChanging = !!newPassword;
  const anythingChanging = usernameChanged || passwordChanging;

  /* ── Submit ──────────────────────────────────────────── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!currentPassword) {
      setError('Please enter your current password to save changes.');
      return;
    }

    if (!anythingChanging) {
      setError('Nothing to save — make a change to your username or password first.');
      return;
    }

    if (passwordChanging) {
      if (newPassword.length < 6) {
        setError('New password must be at least 6 characters long.');
        return;
      }
      if (newPassword !== confirmPassword) {
        setError('The two new passwords do not match.');
        return;
      }
    }

    setSaving(true);
    try {
      const res = await fetch('/api/auth/change-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newUsername: newUsername.trim(),
          newPassword: passwordChanging ? newPassword : undefined,
          confirmPassword: passwordChanging ? confirmPassword : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to update credentials.');
        return;
      }

      /* Success — reset the form */
      setCurrentUsername(data.username);
      setNewUsername(data.username);
      setHasCustomPassword(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      const parts: string[] = [];
      if (data.usernameChanged) parts.push('username');
      if (data.passwordChanged) parts.push('password');
      const what = parts.length === 2 ? 'Username and password' : `${parts[0]} updated`;
      setToast({ type: 'ok', msg: `${what} successfully!` });
      setTimeout(() => setToast(null), 3200);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  /* ═══════════ LOADING ═══════════ */
  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
          <Link href="/admin/dashboard" className="hover:text-green-600">
            Dashboard
          </Link>
          <i className="fas fa-chevron-right text-[8px]" />
          <span>Account</span>
        </div>
        <h1 className="text-lg font-bold text-gray-900">
          Account & Security
        </h1>
      </div>

      <div className="p-6 lg:p-8 max-w-3xl mx-auto">
        {/* ══════════ Current Account Card ══════════ */}
        <div className="hidden-anim bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 text-white rounded-3xl p-6 lg:p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div
              className="orb"
              style={{
                width: 300,
                height: 300,
                background: 'rgba(7,137,48,.5)',
                top: -80,
                right: -60,
              }}
            />
            <div
              className="orb"
              style={{
                width: 240,
                height: 240,
                background: 'rgba(255,209,0,.3)',
                bottom: -60,
                left: -60,
                animationDelay: '5s',
              }}
            />
          </div>

          <div className="relative flex flex-wrap items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <i className="fas fa-user-shield text-yellow-400 text-2xl" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-extrabold text-white/50 uppercase tracking-widest mb-1">
                Signed in as
              </p>
              <p className="text-2xl font-display font-extrabold truncate">
                {currentUsername}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/20 text-green-300 text-[10px] font-extrabold uppercase tracking-wider">
                  <i className="fas fa-circle text-[6px]" />
                  Administrator
                </span>
                {hasCustomPassword ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-400/20 text-yellow-300 text-[10px] font-extrabold uppercase tracking-wider">
                    <i className="fas fa-shield-halved text-[9px]" />
                    Custom password set
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 text-[10px] font-extrabold uppercase tracking-wider">
                    <i className="fas fa-triangle-exclamation text-[9px]" />
                    Using default password
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════ Info Banner ══════════ */}
        {!hasCustomPassword && (
          <div className="hidden-anim rounded-2xl bg-amber-50 border border-amber-200 p-5 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-triangle-exclamation text-white text-lg" />
              </div>
              <div>
                <h3 className="font-bold text-amber-900 mb-1">
                  You&apos;re using the default password
                </h3>
                <p className="text-sm text-amber-800 leading-relaxed">
                  For your security, change your password to something only you know.
                  Anyone who knows the default credentials can access this admin panel.
                  Use the form below to set a custom username and password.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ══════════ Error Banner ══════════ */}
        {error && (
          <div
            className="hidden-anim rounded-2xl bg-red-50 border border-red-200 p-4 mb-6 flex items-start gap-3"
            role="alert"
          >
            <i className="fas fa-circle-exclamation text-red-500 mt-0.5" />
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* ══════════ Main Form ══════════ */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ─── Section 1: Verify identity ─── */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-start gap-4 mb-5 pb-4 border-b border-gray-100">
              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-lock text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Verify Your Identity</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Enter your current password to authorize any changes below.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Current Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <i className="fas fa-key absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type={showCurrent ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your current password"
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  aria-label={showCurrent ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-700 rounded-lg"
                >
                  <i
                    className={`fas ${
                      showCurrent ? 'fa-eye-slash' : 'fa-eye'
                    } text-sm`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* ─── Section 2: Change username ─── */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-start gap-4 mb-5 pb-4 border-b border-gray-100">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-user-pen text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Username</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  This is the name you use to log in.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Username
              </label>
              <div className="relative">
                <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  autoComplete="username"
                  placeholder="e.g. sustainable"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all font-mono"
                />
              </div>
              <p className="mt-2 text-xs text-gray-500 flex items-center gap-1.5">
                <i className="fas fa-info-circle text-gray-400" />
                Letters, numbers, dots, dashes and underscores only. Minimum 3
                characters.
              </p>

              {usernameChanged && (
                <div className="mt-3 p-3 rounded-lg bg-blue-50 border border-blue-100 flex items-center gap-2">
                  <i className="fas fa-arrow-right text-blue-500 text-xs" />
                  <p className="text-xs text-blue-800">
                    Username will change from{' '}
                    <strong className="font-mono">{currentUsername}</strong> to{' '}
                    <strong className="font-mono">{newUsername.trim()}</strong>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ─── Section 3: Change password ─── */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-start gap-4 mb-5 pb-4 border-b border-gray-100">
              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-shield-halved text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Password</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Leave blank if you don&apos;t want to change your password.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* New password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type={showNew ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                    placeholder="Leave blank to keep current password"
                    className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    aria-label={showNew ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-700 rounded-lg"
                  >
                    <i
                      className={`fas ${
                        showNew ? 'fa-eye-slash' : 'fa-eye'
                      } text-sm`}
                    />
                  </button>
                </div>

                {/* Strength meter */}
                {newPassword && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-gray-500">
                        Password strength
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          passwordStrength.label === 'Weak'
                            ? 'text-red-600'
                            : passwordStrength.label === 'Fair'
                            ? 'text-amber-600'
                            : passwordStrength.label === 'Good'
                            ? 'text-blue-600'
                            : 'text-green-600'
                        }`}
                      >
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <div
                          key={n}
                          className={`h-1.5 flex-1 rounded-full transition-colors ${
                            n <= passwordStrength.score
                              ? passwordStrength.color
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    placeholder="Type the new password again"
                    className={`w-full pl-11 pr-12 py-3.5 rounded-xl border text-sm outline-none focus:ring-4 transition-all ${
                      confirmPassword && confirmPassword !== newPassword
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
                        : 'border-gray-200 focus:border-green-500 focus:ring-green-500/10'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-700 rounded-lg"
                  >
                    <i
                      className={`fas ${
                        showConfirm ? 'fa-eye-slash' : 'fa-eye'
                      } text-sm`}
                    />
                  </button>
                </div>
                {confirmPassword && confirmPassword !== newPassword && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5 font-medium">
                    <i className="fas fa-circle-exclamation" />
                    Passwords do not match
                  </p>
                )}
                {confirmPassword && confirmPassword === newPassword && (
                  <p className="mt-1.5 text-xs text-green-600 flex items-center gap-1.5 font-medium">
                    <i className="fas fa-circle-check" />
                    Passwords match
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ─── Save button ─── */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              {anythingChanging ? (
                <>
                  <i className="fas fa-circle-info mr-1.5 text-green-600" />
                  Ready to save:{' '}
                  {usernameChanged && passwordChanging
                    ? 'username + password'
                    : usernameChanged
                    ? 'username'
                    : 'password'}
                </>
              ) : (
                <>
                  <i className="fas fa-circle-info mr-1.5 text-gray-400" />
                  Make a change above, then save.
                </>
              )}
            </div>

            <button
              type="submit"
              disabled={saving || !anythingChanging}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
            >
              {saving ? (
                <>
                  <i className="fas fa-spinner fa-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <i className="fas fa-save" />
                  Save Changes
                </>
              )}
            </button>
          </div>

          {/* ─── What if I forget? ─── */}
          <div className="bg-gray-100 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <i className="fas fa-lightbulb text-yellow-500" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">
                  What if I forget my password?
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Keep your username and password somewhere safe. If you ever lose
                  access, a developer can reset the credentials directly from the
                  database.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* ══════════ Toast ══════════ */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-5 py-3.5 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-3 z-50 ${
            toast.type === 'ok' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}
        >
          <i
            className={`fas ${
              toast.type === 'ok' ? 'fa-check-circle' : 'fa-exclamation-circle'
            }`}
          />
          {toast.msg}
        </div>
      )}
    </div>
  );
}