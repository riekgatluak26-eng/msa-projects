'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Link from 'next/link';

/* ════════════════════════════════════════════════════════════
   ADMIN NAVIGATION
   ════════════════════════════════════════════════════════════ */
const ADMIN_NAV = [
  { href: '/admin/dashboard',  label: 'Dashboard',       icon: 'fas fa-chart-pie' },
  { href: '/admin/homepage',   label: 'Homepage',        icon: 'fas fa-home' },
  { href: '/admin/about',      label: 'About',           icon: 'fas fa-info-circle' },
  { href: '/admin/education',  label: 'Education',       icon: 'fas fa-graduation-cap' },
  { href: '/admin/health',     label: 'Health',          icon: 'fas fa-heart-pulse' },
  { href: '/admin/resilience', label: 'Resilience',      icon: 'fas fa-seedling' },
  { href: '/admin/governance', label: 'Governance',      icon: 'fas fa-balance-scale' },
  { href: '/admin/protection', label: 'Protection',      icon: 'fas fa-shield-halved' },
  { href: '/admin/media',      label: 'Media',           icon: 'fas fa-tower-broadcast' },
  { href: '/admin/impact',     label: 'Impact',          icon: 'fas fa-chart-line' },
  { href: '/admin/news',       label: 'News',            icon: 'fas fa-newspaper' },
  { href: '/admin/contact',    label: 'Contact',         icon: 'fas fa-envelope' },
  { href: '/admin/resources',  label: 'Resources',       icon: 'fas fa-folder-open' },
];

const ADMIN_ACCOUNT_NAV = [
  { href: '/admin/account',    label: 'Account',         icon: 'fas fa-user-shield' },
  { href: '/admin/settings',   label: 'Settings',        icon: 'fas fa-cog' },
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin';

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  /* ── Auth check on every admin navigation ─────────────── */
  useEffect(() => {
    if (isAdmin && !isLoginPage) {
      const auth = localStorage.getItem('msa-admin-auth');
      if (auth === 'true') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.replace('/admin');
      }
    } else {
      setIsAuthenticated(null);
    }
  }, [pathname, isAdmin, isLoginPage, router]);

  const handleLogout = () => {
    localStorage.removeItem('msa-admin-auth');
    setIsAuthenticated(false);
    router.replace('/admin');
  };

  /* ── Login page: render as-is (no chrome) ─────────────── */
  if (isLoginPage) return <>{children}</>;

  /* ── Public site: Header + main + Footer ──────────────── */
  if (!isAdmin) {
    return (
      <>
        <Header />
        <main>{children}</main>
        <Footer />
      </>
    );
  }

  /* ── Admin: waiting for auth check ────────────────────── */
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading…</p>
        </div>
      </div>
    );
  }

  /* ── Admin: not authenticated (redirect is in progress) ─ */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Redirecting to login…</p>
        </div>
      </div>
    );
  }

  /* ── Admin: authenticated → sidebar layout ────────────── */
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ═══ Sidebar ═══ */}
      <aside className="w-64 bg-[#001b52] text-white flex-shrink-0 flex flex-col sticky top-0 h-screen">

        {/* Brand */}
        <Link
          href="/admin/dashboard"
          className="px-5 py-5 border-b border-white/10 flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-blue-700 flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0">
            MSA
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold leading-tight truncate">
              MSA Admin
            </p>
            <p className="text-[11px] text-yellow-400 leading-tight font-semibold">
              Content Manager
            </p>
          </div>
        </Link>

        {/* Nav */}
        <nav className="p-3 flex-1 overflow-y-auto">

          {/* Content sections */}
          <p className="px-3 pt-1 pb-2 text-[10px] font-extrabold text-white/40 uppercase tracking-widest">
            Content
          </p>
          <div className="space-y-0.5">
            {ADMIN_NAV.map((n) => {
              const isActive =
                pathname === n.href || pathname.startsWith(n.href + '/');
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-green-500/15 text-yellow-400'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <i
                    className={`${n.icon} w-4 text-center ${
                      isActive ? 'text-yellow-400' : 'text-green-400'
                    }`}
                  />
                  {n.label}
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-3 border-t border-white/10" />

          {/* Account sections */}
          <p className="px-3 pb-2 text-[10px] font-extrabold text-white/40 uppercase tracking-widest">
            Your Account
          </p>
          <div className="space-y-0.5">
            {ADMIN_ACCOUNT_NAV.map((n) => {
              const isActive =
                pathname === n.href || pathname.startsWith(n.href + '/');
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-green-500/15 text-yellow-400'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <i
                    className={`${n.icon} w-4 text-center ${
                      isActive ? 'text-yellow-400' : 'text-green-400'
                    }`}
                  />
                  {n.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-white/60 hover:bg-white/5 hover:text-white transition-colors"
          >
            <i className="fas fa-external-link-alt w-4 text-center" />
            View Site
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-white/60 hover:bg-red-500/20 hover:text-red-300 transition-colors"
          >
            <i className="fas fa-sign-out-alt w-4 text-center" />
            Logout
          </button>
        </div>
      </aside>

      {/* ═══ Main ═══ */}
      <main className="flex-1 min-w-0">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}