import Link from 'next/link';
import { getPage } from '@/lib/db';
import { newsPageDefaults } from '@/lib/defaults';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'News & Media',
  description:
    'Campaigns, press releases, media coverage and impact stories from Mission for Sustainable Advancement (MSA) across South Sudan.',
};

export default async function NewsPage() {
  let data: any = { ...newsPageDefaults };
  try {
    const saved = await getPage('msa-news');
    if (saved && typeof saved === 'object') {
      data = { ...newsPageDefaults, ...saved };
    }
  } catch {}

  const articles = (Array.isArray(data.articles) ? data.articles : []).filter(
    (a: any) => a.published !== false
  );
  const featured = articles.find((a: any) => a.featured);
  const rest = featured
    ? articles.filter((a: any) => a.id !== featured.id)
    : articles;
  const categories: any[] = Array.isArray(data.categories) ? data.categories : [];

  return (
    <>
      <NewsHero data={data.hero} />
      <div className="flag-bar" />

      <section className="py-20 bg-white">
        <div className="container max-w-7xl">
          {/* Featured article */}
          {featured && (
            <div className="hidden-anim mb-16" data-anim="fadeInUp">
              <FeaturedCard article={featured} categories={categories} />
            </div>
          )}

          {/* Category filter tabs */}
          <CategoryFilters categories={categories} active="all" />

          {/* Grid */}
          {rest.length === 0 ? (
            <div className="text-center py-24 rounded-3xl bg-gray-50 border border-dashed border-gray-200">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white flex items-center justify-center mb-4 shadow-sm">
                <i className="fas fa-newspaper text-gray-400 text-2xl" />
              </div>
              <p className="text-gray-500 font-semibold">No stories published yet</p>
              <p className="text-gray-400 text-sm mt-1">
                Check back soon — we publish regularly.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {rest.map((a: any, i: number) => (
                <NewsCard
                  key={a.id || i}
                  article={a}
                  categories={categories}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ════════ HERO ════════ */
function NewsHero({ data }: { data: any }) {
  if (!data) return null;
  return (
    <section className="relative pt-40 pb-20 mesh-bg-dark noise-overlay overflow-hidden">
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
      </div>

      <div className="container relative z-10 text-center max-w-3xl">
        <span className="section-badge bg-white/10 text-yellow-400 mb-6">
          <i className="fas fa-newspaper mr-2" />
          {data.eyebrow}
        </span>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
          {data.title}{' '}
          <span className="text-gradient-gold">{data.titleAccent}</span>
        </h1>
        <p className="text-lg text-white/65 max-w-2xl mx-auto">{data.subtitle}</p>
      </div>
    </section>
  );
}

/* ════════ FEATURED CARD ════════ */
function FeaturedCard({
  article,
  categories,
}: {
  article: any;
  categories: any[];
}) {
  const cat = categories.find((c: any) => c.id === article.category);
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group block relative rounded-3xl overflow-hidden bg-white border border-gray-100 card-modern"
    >
      <div className="grid lg:grid-cols-5">
        <div className="lg:col-span-3 relative h-72 lg:h-auto min-h-[320px] img-zoom">
          <img
            src={article.image || '/images/msa1.jpeg'}
            alt={article.title}
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <span className="absolute top-5 left-5 inline-flex items-center px-3.5 py-1.5 rounded-full bg-yellow-400 text-gray-900 text-[11px] font-extrabold tracking-wider uppercase">
            <i className="fas fa-star mr-1.5" />
            Featured Story
          </span>
        </div>

        <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
            {cat && (
              <span className="px-3 py-1 rounded-full bg-green-500 text-white text-[11px] font-bold tracking-wide uppercase">
                {cat.label}
              </span>
            )}
            <span className="text-xs text-gray-500 flex items-center">
              <i className="far fa-calendar mr-1.5" />
              {article.date}
            </span>
          </div>

          <h2 className="font-display text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight mb-4 group-hover:text-green-600 transition-colors">
            {article.title}
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6 ppf-clamp-3">
            {article.excerpt}
          </p>

          <span className="inline-flex items-center gap-2 text-green-600 font-bold text-sm">
            Read full story{' '}
            <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ════════ CATEGORY FILTERS ════════ */
function CategoryFilters({
  categories,
  active,
}: {
  categories: any[];
  active: string;
}) {
  return (
    <div
      className="flex flex-wrap justify-center gap-2.5 mb-12 hidden-anim"
      data-anim="fadeInUp"
    >
      <Link
        href="/news"
        className={`ppf-news-tab ${active === 'all' ? 'is-active' : ''}`}
      >
        All Stories
      </Link>
      {categories.map((c: any) => (
        <Link
          key={c.id}
          href={`/news?category=${c.id}`}
          className={`ppf-news-tab ${active === c.id ? 'is-active' : ''}`}
        >
          {c.label}
        </Link>
      ))}
    </div>
  );
}

/* ════════ NEWS CARD ════════ */
function NewsCard({
  article,
  categories,
  index,
}: {
  article: any;
  categories: any[];
  index: number;
}) {
  const cat = categories.find((c: any) => c.id === article.category);
  const colorMap: Record<string, string> = {
    gold: 'bg-yellow-400 text-gray-900',
    red: 'bg-red-500 text-white',
    purple: 'bg-purple-500 text-white',
    navy: 'bg-blue-700 text-white',
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
  };

  return (
    <Link
      href={`/news/${article.slug}`}
      className="hidden-anim ppf-news-card group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col"
      data-anim="fadeInUp"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="h-52 relative img-zoom overflow-hidden">
        <img
          src={article.image || '/images/msa1.jpeg'}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {cat && (
          <span
            className={`absolute top-4 left-4 px-3 py-1 rounded-full ${
              colorMap[cat.color] || colorMap.green
            } text-[11px] font-bold tracking-wide uppercase`}
          >
            {cat.label}
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2.5 text-[11px] text-gray-500 mb-3">
          <span>
            <i className="far fa-calendar mr-1.5" />
            {article.date}
          </span>
          {article.author && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>{article.author}</span>
            </>
          )}
        </div>

        <h3 className="font-extrabold text-[17px] text-gray-900 leading-snug mb-2.5 ppf-clamp-2 group-hover:text-green-600 transition-colors">
          {article.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 ppf-clamp-3 flex-1">
          {article.excerpt}
        </p>

        <span className="inline-flex items-center gap-1.5 text-green-600 text-sm font-bold pt-4 border-t border-gray-100">
          Read more{' '}
          <i className="fas fa-arrow-right text-xs transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}