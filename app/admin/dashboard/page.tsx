import Link from 'next/link';

/* ════════════════════════════════════════════════════════════
   DASHBOARD CARDS
   ════════════════════════════════════════════════════════════ */
type Card = {
  href: string;
  icon: string;
  title: string;
  description: string;
  accent: 'green' | 'blue' | 'amber' | 'red' | 'purple' | 'pink' | 'navy';
  badge?: string;
};

const CARDS: Card[] = [
  {
    href: '/admin/homepage',
    icon: 'fas fa-home',
    title: 'Homepage',
    description:
      'Hero, About, Values, Programs, News, CTA, Contact and more.',
    accent: 'green',
  },
  {
    href: '/admin/about',
    icon: 'fas fa-info-circle',
    title: 'About Page',
    description: 'History, mission, vision, values and capacity.',
    accent: 'blue',
  },
  {
    href: '/admin/education',
    icon: 'fas fa-graduation-cap',
    title: 'Education',
    description: 'Schools, scholarships, girl child education programs.',
    accent: 'amber',
  },
  {
    href: '/admin/health',
    icon: 'fas fa-heart-pulse',
    title: 'Health',
    description: 'Primary Health Care, HIV/AIDS, VCT, SRH and nutrition.',
    accent: 'red',
  },
  {
    href: '/admin/resilience',
    icon: 'fas fa-seedling',
    title: 'Resilience & Recovery',
    description: 'Food security, livelihoods, youth & women empowerment.',
    accent: 'green',
  },
  {
    href: '/admin/governance',
    icon: 'fas fa-balance-scale',
    title: 'Governance',
    description: 'Democracy, rule of law, peace building and community security.',
    accent: 'blue',
  },
  {
    href: '/admin/protection',
    icon: 'fas fa-shield-halved',
    title: 'Protection',
    description: 'Child protection, GBV response and psychosocial support.',
    accent: 'purple',
  },
  {
    href: '/admin/media',
    icon: 'fas fa-tower-broadcast',
    title: 'Information & Media',
    description: 'Maridi FM 88.9, awareness campaigns and community media.',
    accent: 'amber',
  },
  {
    href: '/admin/impact',
    icon: 'fas fa-chart-line',
    title: 'Impact Page',
    description: 'Annual reports, program achievements and key numbers.',
    accent: 'green',
    badge: 'Reports',
  },
  {
    href: '/admin/news',
    icon: 'fas fa-newspaper',
    title: 'News & Articles',
    description: 'Write, edit and publish news stories to your website.',
    accent: 'red',
  },
  {
    href: '/admin/contact',
    icon: 'fas fa-envelope',
    title: 'Contact Page',
    description: 'Contact form, office locations, map and FAQ.',
    accent: 'blue',
  },
  {
    href: '/admin/resources',
    icon: 'fas fa-folder-open',
    title: 'Resources',
    description: 'Upload and manage reports, policies and documents.',
    accent: 'amber',
  },
];

const ACCOUNT_CARDS: Card[] = [
  {
    href: '/admin/account',
    icon: 'fas fa-user-shield',
    title: 'Account & Security',
    description: 'Change your admin username and password.',
    accent: 'purple',
  },
  {
    href: '/admin/settings',
    icon: 'fas fa-cog',
    title: 'Site Settings',
    description: 'Logo, header, footer, navigation and social links.',
    accent: 'navy',
  },
];

/* ════════════════════════════════════════════════════════════
   ACCENT COLOR THEMES
   ════════════════════════════════════════════════════════════ */
const ACCENTS: Record<
  Card['accent'],
  { bg: string; icon: string; ring: string; text: string }
> = {
  green: {
    bg: 'bg-green-50',
    icon: 'text-green-600',
    ring: 'group-hover:ring-green-200',
    text: 'text-green-600',
  },
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    ring: 'group-hover:ring-blue-200',
    text: 'text-blue-600',
  },
  amber: {
    bg: 'bg-amber-50',
    icon: 'text-amber-600',
    ring: 'group-hover:ring-amber-200',
    text: 'text-amber-600',
  },
  red: {
    bg: 'bg-red-50',
    icon: 'text-red-600',
    ring: 'group-hover:ring-red-200',
    text: 'text-red-600',
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'text-purple-600',
    ring: 'group-hover:ring-purple-200',
    text: 'text-purple-600',
  },
  pink: {
    bg: 'bg-pink-50',
    icon: 'text-pink-600',
    ring: 'group-hover:ring-pink-200',
    text: 'text-pink-600',
  },
  navy: {
    bg: 'bg-indigo-50',
    icon: 'text-indigo-600',
    ring: 'group-hover:ring-indigo-200',
    text: 'text-indigo-600',
  },
};

/* ════════════════════════════════════════════════════════════
   DASHBOARD
   ════════════════════════════════════════════════════════════ */
export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto">

      {/* ═══ Header ═══ */}
      <header className="mb-10">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <span>Dashboard</span>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-blue-700 flex items-center justify-center shadow-lg shadow-green-500/25">
                <i className="fas fa-chart-pie text-white text-lg" />
              </span>
              Welcome back 👋
            </h1>
            <p className="text-gray-500 mt-2 ml-15">
              Manage every part of your website from here. Pick a section
              below to get started.
            </p>
          </div>

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 bg-white border border-gray-200 hover:border-green-500 hover:text-green-600 transition-all shadow-sm"
          >
            <i className="fas fa-external-link-alt text-xs" />
            View Live Site
          </Link>
        </div>
      </header>

      {/* ═══ Content Sections ═══ */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1 h-6 bg-green-500 rounded-full" />
          <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest">
            Website Content
          </h2>
          <span className="text-xs text-gray-400 font-semibold">
            · {CARDS.length} sections
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CARDS.map((c) => (
            <DashboardCard key={c.href} card={c} />
          ))}
        </div>
      </section>

      {/* ═══ Account Sections ═══ */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1 h-6 bg-indigo-500 rounded-full" />
          <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest">
            Your Account
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ACCOUNT_CARDS.map((c) => (
            <DashboardCard key={c.href} card={c} />
          ))}
        </div>
      </section>

      {/* ═══ Quick tips footer ═══ */}
      <div className="rounded-2xl bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 text-white p-6 lg:p-8 relative overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div
            className="orb"
            style={{
              width: 280,
              height: 280,
              background: 'rgba(7,137,48,.5)',
              top: -80,
              right: -60,
            }}
          />
          <div
            className="orb"
            style={{
              width: 220,
              height: 220,
              background: 'rgba(255,209,0,.3)',
              bottom: -60,
              left: -60,
              animationDelay: '5s',
            }}
          />
        </div>

        <div className="relative flex flex-wrap items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
            <i className="fas fa-lightbulb text-yellow-400 text-2xl" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-xl font-extrabold mb-2">
              Quick Tips
            </h3>
            <ul className="space-y-2 text-sm text-white/75">
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-green-400 mt-0.5 text-xs" />
                <span>
                  Every section saves with the{' '}
                  <strong className="text-white">Save Changes</strong> button at
                  the top-right — nothing saves automatically.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-green-400 mt-0.5 text-xs" />
                <span>
                  Images upload directly — drag and drop or click to select.
                  Preview appears instantly.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-green-400 mt-0.5 text-xs" />
                <span>
                  Use{' '}
                  <strong className="text-white">Preview</strong> to see the
                  live page while you edit.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check-circle text-green-400 mt-0.5 text-xs" />
                <span>
                  Change your admin{' '}
                  <strong className="text-white">
                    username and password
                  </strong>{' '}
                  from the{' '}
                  <strong className="text-white">Account</strong> section below.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   DASHBOARD CARD
   ════════════════════════════════════════════════════════════ */
function DashboardCard({ card }: { card: Card }) {
  const a = ACCENTS[card.accent];

  return (
    <Link
      href={card.href}
      className={`group relative bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ring-4 ring-transparent ${a.ring} overflow-hidden`}
    >
      {/* Top accent bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
          card.accent === 'green'
            ? 'from-green-500 to-green-600'
            : card.accent === 'blue'
            ? 'from-blue-500 to-blue-600'
            : card.accent === 'amber'
            ? 'from-amber-500 to-amber-600'
            : card.accent === 'red'
            ? 'from-red-500 to-red-600'
            : card.accent === 'purple'
            ? 'from-purple-500 to-purple-600'
            : card.accent === 'pink'
            ? 'from-pink-500 to-pink-600'
            : 'from-indigo-500 to-indigo-600'
        } opacity-0 group-hover:opacity-100 transition-opacity`}
      />

      {/* Optional badge */}
      {card.badge && (
        <span
          className={`absolute top-4 right-4 px-2.5 py-1 rounded-full ${a.bg} ${a.icon} text-[10px] font-extrabold uppercase tracking-wide`}
        >
          {card.badge}
        </span>
      )}

      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-2xl ${a.bg} flex items-center justify-center mb-5 transition-transform group-hover:scale-110`}
      >
        <i className={`${card.icon} ${a.icon} text-xl`} />
      </div>

      {/* Title + description */}
      <h3 className="text-lg font-bold text-gray-900 mb-1.5">
        {card.title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-5">
        {card.description}
      </p>

      {/* Open link */}
      <span
        className={`inline-flex items-center gap-2 text-sm font-bold ${a.text}`}
      >
        Open
        <i className="fas fa-arrow-right text-xs transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}