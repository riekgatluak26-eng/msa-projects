'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Invalid credentials.');
        setLoading(false);
        return;
      }

      // Success — persist auth and go to dashboard
      localStorage.setItem('msa-admin-auth', 'true');
      router.replace('/admin/dashboard');
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'linear-gradient(135deg, #0f0f1a 0%, #0d1b3d 40%, #0a2a1a 100%)',
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative orbs */}
      <div
        className="orb"
        style={{
          width: 400,
          height: 400,
          background: 'rgba(7,137,48,.35)',
          top: -100,
          left: -100,
        }}
      />
      <div
        className="orb"
        style={{
          width: 320,
          height: 320,
          background: 'rgba(0,51,160,.35)',
          bottom: -80,
          right: -80,
          animationDelay: '5s',
        }}
      />

      {/* Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 420,
          background: '#fff',
          borderRadius: 24,
          padding: '2.5rem 2rem',
          boxShadow: '0 30px 80px -20px rgba(0,0,0,.5)',
        }}
      >
        {/* Logo + Title */}
        <div className="text-center mb-8">
          <div
            className="mx-auto mb-4 flex items-center justify-center"
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: 'linear-gradient(135deg, #078930, #0033A0)',
              boxShadow: '0 12px 30px -8px rgba(7,137,48,.5)',
            }}
          >
            <span className="text-white font-extrabold text-lg tracking-tight">
              MSA
            </span>
          </div>
          <h1 className="font-display text-2xl font-extrabold text-gray-900 mb-1">
            Admin Login
          </h1>
          <p className="text-sm text-gray-500">
            Mission for Sustainable Advancement
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700 flex items-start gap-2"
            role="alert"
          >
            <i className="fas fa-exclamation-circle text-red-500 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <i
                className="fas fa-user"
                style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af',
                  fontSize: 14,
                }}
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                autoFocus
                placeholder="Enter username"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <i
                className="fas fa-lock"
                style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af',
                  fontSize: 14,
                }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Enter password"
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  padding: 6,
                  borderRadius: 8,
                }}
              >
                <i
                  className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                  style={{ fontSize: 14 }}
                />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #078930, #055e1f)',
              boxShadow: loading
                ? 'none'
                : '0 10px 30px -8px rgba(7,137,48,.5)',
            }}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin" />
                Signing in...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt" />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Back link */}
        <div className="text-center mt-6 pt-6 border-t border-gray-100">
          <a
            href="/"
            className="text-xs font-semibold text-gray-500 hover:text-green-600 transition-colors"
          >
            <i className="fas fa-arrow-left mr-1.5" />
            Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}