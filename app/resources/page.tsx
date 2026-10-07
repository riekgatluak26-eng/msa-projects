import Link from 'next/link';
import { getPage } from '@/lib/db';
import { resourcesPageDefaults } from '@/lib/defaults';
import ResourceLibrary from '@/components/resources/ResourceLibrary';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Resources',
  description:
    "Download MSA's annual reports, policies, financial statements, research, guides and forms — free to access.",
};

export default async function ResourcesPage() {
  let data: any = { ...resourcesPageDefaults };
  try {
    const saved = await getPage('msa-resources');
    if (saved && typeof saved === 'object') {
      data = { ...resourcesPageDefaults, ...saved };
    }
  } catch {}

  const allDocs: any[] = Array.isArray(data.documents) ? data.documents : [];
  const documents = allDocs.filter((d: any) => d.published !== false);
  const categories: any[] = Array.isArray(data.categories) ? data.categories : [];

  /* ── Compute live stats from the real documents ── */
  const usedCategories = new Set(
    documents.map((d) => d.category).filter(Boolean)
  );
  const latestYear = (() => {
    // Try to extract the newest year from document dates
    const years = documents
      .map((d) => {
        const m = String(d.date || '').match(/\b(20\d{2})\b/);
        return m ? Number(m[1]) : null;
      })
      .filter((y): y is number => y !== null);
    return years.length > 0 ? String(Math.max(...years)) : '2026';
  })();

  const liveStats = [
    {
      icon: 'fas fa-file-lines',
      color: 'brand',
      value: String(documents.length),
      label: 'Documents',
      suffix: '',
      static: false,
    },
    {
      icon: 'fas fa-folder-tree',
      color: 'gold',
      value: String(usedCategories.size),
      label: 'Categories',
      suffix: '',
      static: false,
    },
    {
      icon: 'fas fa-folder',
      color: 'navy',
      value: String(categories.length),
      label: 'Total Categories',
      suffix: '',
      static: false,
    },
    {
      icon: 'fas fa-calendar-check',
      color: 'red',
      value: latestYear,
      label: 'Latest Update',
      suffix: '',
      static: true,
    },
  ];

  /* Fallback to stored stats if the array is empty (matches old shape) */
  const statsItems =
    documents.length > 0
      ? liveStats
      : Array.isArray(data.stats?.items)
        ? data.stats.items
        : liveStats;

  return (
    <>
      <ResourcesHero data={data.hero} />
      <div className="flag-bar" />

      {/* Stats — only show when there is at least one document */}
      {data.stats?.show !== false && documents.length > 0 && (
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="container max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {statsItems.map((s: any, i: number) => {
                const colorMap: Record<string, string> = {
                  brand: 'bg-green-50 text-green-500',
                  navy: 'bg-blue-50 text-blue-600',
                  gold: 'bg-amber-100 text-yellow-600',
                  red: 'bg-red-50 text-red-500',
                  purple: 'bg-purple-50 text-purple-500',
                };
                return (
                  <div
                    key={i}
                    className="hidden-anim text-center p-6 rounded-2xl bg-gray-50 border border-gray-100"
                    data-anim="fadeInUp"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <div
                      className={`w-12 h-12 mx-auto rounded-xl ${
                        colorMap[s.color] || colorMap.brand
                      } flex items-center justify-center mb-3`}
                    >
                      <i className={`${s.icon} text-lg`} />
                    </div>
                    <div
                      className={`text-3xl font-extrabold text-gray-900 tabular-nums ${
                        s.static ? '' : 'counter-value'
                      }`}
                      data-target={s.static ? undefined : s.value}
                    >
                      {s.static ? `${s.value}${s.suffix || ''}` : '0'}
                    </div>
                    <div className="text-gray-500 text-xs mt-1.5 font-semibold">
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Library */}
      <ResourceLibrary
        documents={documents}
        categories={categories}
        emptyState={data.emptyState}
      />

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-700 via-green-600 to-blue-800" />
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <div
            className="orb"
            style={{
              width: 384,
              height: 384,
              background: 'rgba(255,209,0,.4)',
              top: -96,
              right: -64,
            }}
          />
          <div
            className="orb"
            style={{
              width: 320,
              height: 320,
              background: 'rgba(0,51,160,.4)',
              bottom: 0,
              left: -64,
              animationDelay: '6s',
            }}
          />
        </div>

        <div className="container max-w-4xl text-center relative z-10">
          <div className="hidden-anim" data-anim="scaleIn">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-7 shadow-2xl">
              <i className="fas fa-folder-open text-yellow-400 text-3xl" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
              {data.cta.title}
            </h2>
            <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              {data.cta.text}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={data.cta.button1Link}
                className="px-8 py-4 rounded-2xl bg-white text-green-700 font-bold text-base inline-flex items-center hover:bg-yellow-400 hover:text-gray-900 transition-all shadow-lg"
              >
                <i className="fas fa-envelope mr-3" />
                <span>{data.cta.button1Text}</span>
              </Link>
              <Link
                href={data.cta.button2Link}
                className="btn-outline px-8 py-4 rounded-2xl font-bold text-base"
              >
                <i className="fas fa-arrow-right mr-3" />
                <span>{data.cta.button2Text}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ════════ HERO ════════ */
function ResourcesHero({ data }: { data: any }) {
  if (!data) return null;
  return (
    <section className="relative pt-40 pb-24 mesh-bg-dark noise-overlay overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="orb"
          style={{
            width: 400,
            height: 400,
            background: 'rgba(7,137,48,.4)',
            top: -100,
            right: -100,
          }}
        />
        <div
          className="orb"
          style={{
            width: 320,
            height: 320,
            background: 'rgba(0,51,160,.4)',
            bottom: -80,
            left: -80,
            animationDelay: '6s',
          }}
        />
        <div
          className="orb"
          style={{
            width: 240,
            height: 240,
            background: 'rgba(255,209,0,.25)',
            top: '40%',
            left: '40%',
            animationDelay: '10s',
          }}
        />
      </div>

      <div className="container relative z-10 text-center max-w-3xl">
        <span className="section-badge bg-white/10 text-yellow-400 mb-6">
          <i className="fas fa-folder-open mr-2" />
          {data.eyebrow}
        </span>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
          {data.title}{' '}
          <span className="text-gradient-gold">{data.titleAccent}</span>
        </h1>
        <p className="text-lg text-white/65 max-w-2xl mx-auto leading-relaxed">
          {data.subtitle}
        </p>
      </div>
    </section>
  );
}