import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPage } from '@/lib/db';
import { newsPageDefaults } from '@/lib/defaults';

export const dynamic = 'force-dynamic';

/* ─── Render content with lightweight formatting ──────────── */
function renderContent(content: string) {
  if (!content) return null;
  const blocks = content.split(/\n\n+/);

  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // Heading (## or ###)
    if (trimmed.startsWith('## ')) {
      return (
        <h2
          key={i}
          className="font-display text-3xl font-extrabold text-gray-900 mt-10 mb-4"
        >
          {trimmed.replace(/^##\s+/, '')}
        </h2>
      );
    }
    if (trimmed.startsWith('### ')) {
      return (
        <h3
          key={i}
          className="font-display text-2xl font-extrabold text-gray-900 mt-8 mb-3"
        >
          {trimmed.replace(/^###\s+/, '')}
        </h3>
      );
    }

    // Bullet list
    if (trimmed.split('\n').every((line) => line.trim().startsWith('- '))) {
      const items = trimmed
        .split('\n')
        .map((l) => l.trim().replace(/^-\s+/, ''));
      return (
        <ul key={i} className="my-6 space-y-2 pl-5">
          {items.map((item, ii) => (
            <li
              key={ii}
              className="text-gray-700 leading-relaxed flex items-start"
            >
              <i className="fas fa-check text-green-500 mr-3 mt-1.5 text-xs" />
              <span dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
            </li>
          ))}
        </ul>
      );
    }

    // Regular paragraph
    return (
      <p
        key={i}
        className="text-gray-700 leading-relaxed mb-5 text-[17px]"
        dangerouslySetInnerHTML={{ __html: inlineFormat(trimmed) }}
      />
    );
  });
}

/* ─── Inline formatting: **bold** and *italic* ───────────── */
function inlineFormat(text: string): string {
  return text
    .replace(
      /\*\*([^*]+)\*\*/g,
      '<strong class="text-gray-900 font-bold">$1</strong>'
    )
    .replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>');
}

/* ─── Load article from either collection ─────────────────── */
async function findArticleBySlug(slug: string) {
  // 1. Try the dedicated news collection first
  try {
    const newsData = await getPage('msa-news');
    const newsArticles: any[] = Array.isArray(newsData?.articles)
      ? newsData.articles
      : [];
    const found = newsArticles.find(
      (a) => a.slug === slug && a.published !== false
    );
    if (found) {
      return {
        article: found,
        categories: Array.isArray(newsData?.categories)
          ? newsData.categories
          : [],
        allArticles: newsArticles,
      };
    }
  } catch {}

  // 2. Fall back to the homepage's own news collection
  try {
    const homeData = await getPage('msa-homepage');
    const homeArticles: any[] = Array.isArray(homeData?.news?.articles)
      ? homeData.news.articles
      : [];
    const found = homeArticles.find(
      (a) => a.slug === slug && a.published !== false
    );
    if (found) {
      return {
        article: found,
        categories: Array.isArray(homeData?.news?.categories)
          ? homeData.news.categories
          : [],
        allArticles: homeArticles,
      };
    }
  } catch {}

  return null;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const result = await findArticleBySlug(slug);

  if (!result) notFound();

  const { article, categories, allArticles } = result;
  const cat = categories.find((c: any) => c.id === article.category);

  // Related articles (exclude current, max 3)
  const related = allArticles
    .filter((a: any) => a.id !== article.id && a.published !== false)
    .slice(0, 3);

  // Use a default categories list for display if the source didn't have one
  const displayCategories =
    categories.length > 0
      ? categories
      : [
          { id: 'education',  label: 'Education',  color: 'gold' },
          { id: 'health',     label: 'Health',     color: 'red' },
          { id: 'protection', label: 'Protection', color: 'purple' },
          { id: 'media',      label: 'Media',      color: 'navy' },
          { id: 'governance', label: 'Governance', color: 'blue' },
          { id: 'notices',    label: 'Notices',    color: 'gold' },
        ];

  const displayCat =
    cat || displayCategories.find((c: any) => c.id === article.category);

  return (
    <>
      <ArticleHero article={article} category={displayCat} />
      <div className="flag-bar" />

      <article className="py-20 bg-white">
        <div className="container max-w-3xl">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 pb-8 border-b border-gray-100 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-green-500 to-blue-700 flex items-center justify-center text-white font-bold">
                <i className="fas fa-user-tie" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">
                  {article.author || 'MSA Media Team'}
                </p>
                <p className="text-gray-500 text-xs">Communications Desk</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500 ml-auto">
              <span className="flex items-center gap-1.5">
                <i className="far fa-calendar" />
                {article.date}
              </span>
              {displayCat && (
                <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 font-bold uppercase tracking-wider">
                  {displayCat.label}
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {renderContent(article.content || article.excerpt || '')}
          </div>

          {/* Share row */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-bold text-green-600 hover:text-green-700"
            >
              <i className="fas fa-arrow-left" /> Back to all news
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-2">
                Share:
              </span>
              {[
                { icon: 'fab fa-facebook-f', color: '#1877F2' },
                { icon: 'fab fa-x-twitter', color: '#000' },
                { icon: 'fab fa-whatsapp', color: '#25D366' },
              ].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  style={{ color: s.color }}
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-20 mesh-bg-2 border-t border-gray-100">
          <div className="container max-w-7xl">
            <div className="text-center mb-14">
              <span className="section-badge bg-blue-50 text-blue-700 mb-4">
                <i className="fas fa-newspaper mr-2" />
                More Stories
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900">
                Continue Reading
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-7">
              {related.map((r: any) => {
                const rcat = displayCategories.find(
                  (c: any) => c.id === r.category
                );
                return (
                  <Link
                    key={r.id}
                    href={`/news/${r.slug}`}
                    className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 ppf-news-card"
                  >
                    <div className="h-44 relative img-zoom overflow-hidden">
                      <img
                        src={r.image || '/images/msa1.jpeg'}
                        alt={r.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {rcat && (
                        <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-green-500 text-white text-[10px] font-bold uppercase tracking-wide">
                          {rcat.label}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <p className="text-[11px] text-gray-500 mb-2">
                        <i className="far fa-calendar mr-1.5" />
                        {r.date}
                      </p>
                      <h3 className="font-extrabold text-gray-900 leading-snug mb-3 ppf-clamp-2 group-hover:text-green-600 transition-colors">
                        {r.title}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 text-green-600 text-sm font-bold">
                        Read more <i className="fas fa-arrow-right text-xs" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

/* ════════ ARTICLE HERO ════════ */
function ArticleHero({
  article,
  category,
}: {
  article: any;
  category: any;
}) {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={article.image || '/images/msa1.jpeg'}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/85 to-[#0a0a1a]/60" />
      </div>

      <div className="container relative z-10 max-w-4xl">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-white/60 hover:text-yellow-400 text-sm font-bold mb-6 transition-colors"
        >
          <i className="fas fa-arrow-left" /> Back to News
        </Link>

        {category && (
          <div className="mb-5">
            <span className="inline-block px-3 py-1.5 rounded-full bg-green-500 text-white text-xs font-bold uppercase tracking-wide">
              {category.label}
            </span>
          </div>
        )}

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
          {article.title}
        </h1>

        <p className="text-white/70 text-lg leading-relaxed max-w-3xl">
          {article.excerpt}
        </p>
      </div>
    </section>
  );
}