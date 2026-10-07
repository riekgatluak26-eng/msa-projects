'use client';

import { useState } from 'react';
import Link from 'next/link';

const FILTERS = [
  { id: 'all',        label: 'All Stories' },
  { id: 'education',  label: 'Education' },
  { id: 'health',     label: 'Health' },
  { id: 'protection', label: 'Protection' },
  { id: 'media',      label: 'Media' },
  { id: 'notices',    label: 'Notices' },
];

export default function NewsSection({
  news,
  newsletter,
}: {
  news: any;
  newsletter: any;
}) {
  const [filter, setFilter] = useState('all');

  if (!news) return null;

  const articles: any[] = Array.isArray(news.articles) ? news.articles : [];
  const visible =
    filter === 'all' ? articles : articles.filter((a) => a.category === filter);

  return (
    <section id="news" className="py-28 bg-white">
      <div className="container">
        {/* ─── Heading ─────────────────────────────────── */}
        <div className="text-center mb-14">
          <span className="section-badge bg-blue-50 text-blue-700 mb-6">
            <i className="fas fa-newspaper mr-2" />
            {news.eyebrow}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            {news.title} <span className="text-gradient-green">{news.titleAccent}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">{news.subtitle}</p>
        </div>

        {/* ─── Filter tabs ─────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`ppf-news-tab ${filter === f.id ? 'is-active' : ''}`}
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ─── Articles or Empty State ─────────────────── */}
        {visible.length === 0 ? (
          <div className="text-center py-16 rounded-3xl bg-gray-50 border border-dashed border-gray-200">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-white flex items-center justify-center mb-4 shadow-sm">
              <i className="fas fa-newspaper text-gray-400 text-xl" />
            </div>
            <p className="text-gray-500 font-semibold">
              No stories in this category yet
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Publish from the admin panel to see them here.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {visible.map((a: any, i: number) => (
              <article
                key={i}
                className="ppf-news-card bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100"
              >
                {a.image && (
                  <div className="h-48 relative img-zoom">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {a.category && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-green-600/95 text-white text-[11px] font-bold tracking-wide uppercase">
                        {a.category}
                      </span>
                    )}
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2.5 text-[11px] text-gray-500 mb-3">
                    <span>
                      <i className="far fa-calendar mr-1.5" />
                      {a.date}
                    </span>
                    {a.author && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span>{a.author}</span>
                      </>
                    )}
                  </div>
                  <h3 className="font-extrabold text-[17px] text-gray-900 leading-snug mb-2.5 ppf-clamp-2">
                    <Link
                      href={`/news/${a.slug}`}
                      className="hover:text-green-600 transition-colors"
                    >
                      {a.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 ppf-clamp-3">
                    {a.excerpt}
                  </p>
                  <Link
                    href={`/news/${a.slug}`}
                    className="ppf-readmore inline-flex items-center gap-1.5 text-green-600 text-sm font-bold"
                  >
                    Read more <i className="fas fa-arrow-right text-xs" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ─── View All button ─────────────────────────── */}
        {articles.length > 0 && (
          <div className="text-center mt-12">
            <Link
              href="/news"
              className="inline-flex items-center px-8 py-4 rounded-2xl border-2 border-gray-200 text-gray-700 font-bold hover:border-green-500 hover:text-green-600 transition-all"
            >
              {news.viewAllText || 'View All News'}
              <i className="fas fa-arrow-right ml-3" />
            </Link>
          </div>
        )}

        {/* ─── Newsletter ──────────────────────────────── */}
        {newsletter && (
          <div className="mt-20">
            <div className="rounded-3xl bg-gradient-to-r from-green-500 via-green-600 to-blue-700 p-8 sm:p-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-7">
                <div className="text-center lg:text-left">
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-2">
                    {newsletter.title}
                  </h3>
                  <p className="text-white/75">{newsletter.subtitle}</p>
                </div>
                <form
                  className="w-full lg:w-auto flex flex-col sm:flex-row gap-3"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    required
                    placeholder={newsletter.placeholder}
                    className="w-full sm:w-72 px-5 py-3.5 rounded-xl bg-white/95 text-gray-900 outline-none focus:ring-4 focus:ring-white/30"
                  />
                  <button
                    type="submit"
                    className="px-7 py-3.5 rounded-xl bg-gray-900 text-white font-bold hover:bg-black whitespace-nowrap"
                  >
                    {newsletter.buttonText}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}