'use client';

import { useState, useMemo } from 'react';

/* ─── File type → icon + color ───────────────────────────── */
const FILE_STYLES: Record<string, { icon: string; color: string; bg: string }> = {
  pdf:  { icon: 'fas fa-file-pdf',        color: 'text-red-600',     bg: 'bg-red-50' },
  doc:  { icon: 'fas fa-file-word',       color: 'text-blue-600',    bg: 'bg-blue-50' },
  docx: { icon: 'fas fa-file-word',       color: 'text-blue-600',    bg: 'bg-blue-50' },
  xls:  { icon: 'fas fa-file-excel',      color: 'text-green-600',   bg: 'bg-green-50' },
  xlsx: { icon: 'fas fa-file-excel',      color: 'text-green-600',   bg: 'bg-green-50' },
  ppt:  { icon: 'fas fa-file-powerpoint', color: 'text-orange-600',  bg: 'bg-orange-50' },
  pptx: { icon: 'fas fa-file-powerpoint', color: 'text-orange-600',  bg: 'bg-orange-50' },
  zip:  { icon: 'fas fa-file-zipper',     color: 'text-yellow-600',  bg: 'bg-amber-50' },
  txt:  { icon: 'fas fa-file-lines',      color: 'text-gray-600',    bg: 'bg-gray-100' },
  csv:  { icon: 'fas fa-file-csv',        color: 'text-emerald-600', bg: 'bg-emerald-50' },
  default: { icon: 'fas fa-file',         color: 'text-gray-500',    bg: 'bg-gray-100' },
};

function getFileStyle(type?: string) {
  const t = (type || '').toLowerCase().replace(/^\./, '');
  return FILE_STYLES[t] || FILE_STYLES.default;
}

/* ─── Guess file extension from a file URL ──────────────── */
function extFromUrl(url?: string) {
  if (!url) return '';
  const m = String(url).match(/\.([a-z0-9]+)(?:\?|$)/i);
  return m ? m[1].toLowerCase() : '';
}

export default function ResourceLibrary({
  documents,
  categories,
  emptyState,
}: {
  documents: any[];
  categories: any[];
  emptyState: any;
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  /* No documents at all → Coming Soon panel */
  if (documents.length === 0) {
    return <ComingSoon emptyState={emptyState} />;
  }

  const featured = documents.find((d) => d.featured);
  const filtered = useMemo(() => {
    let list = documents;
    if (activeCategory !== 'all') {
      list = list.filter((d) => d.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (d) =>
          d.title?.toLowerCase().includes(q) ||
          d.description?.toLowerCase().includes(q) ||
          d.fileName?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [documents, activeCategory, search]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: documents.length };
    categories.forEach((cat) => {
      c[cat.id] = documents.filter((d) => d.category === cat.id).length;
    });
    return c;
  }, [documents, categories]);

  return (
    <section className="py-20 bg-white">
      <div className="container max-w-7xl">
        {/* Featured document */}
        {featured && !search && activeCategory === 'all' && (
          <div className="hidden-anim mb-16" data-anim="fadeInUp">
            <FeaturedDocument document={featured} categories={categories} />
          </div>
        )}

        {/* Search + Filters */}
        <div className="mb-10 space-y-6">
          <div className="hidden-anim max-w-2xl mx-auto" data-anim="fadeInUp">
            <div className="relative">
              <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search reports, policies, guides..."
                className="w-full pl-14 pr-4 py-4 rounded-2xl border border-gray-200 bg-white text-base outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all shadow-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <i className="fas fa-times-circle" />
                </button>
              )}
            </div>
          </div>

          <div
            className="hidden-anim flex flex-wrap justify-center gap-2.5"
            data-anim="fadeInUp"
          >
            <button
              onClick={() => setActiveCategory('all')}
              className={`ppf-news-tab ${activeCategory === 'all' ? 'is-active' : ''}`}
            >
              <i className="fas fa-folder-open mr-2" />
              All Documents
              <span className="ml-2 opacity-70">· {counts.all}</span>
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`ppf-news-tab ${activeCategory === c.id ? 'is-active' : ''}`}
              >
                <i className={`${c.icon} mr-2`} />
                {c.label}
                <span className="ml-2 opacity-70">· {counts[c.id] || 0}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Document grid */}
        {filtered.length === 0 ? (
          <NoResults
            onClear={() => {
              setActiveCategory('all');
              setSearch('');
            }}
          />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((doc, i) => (
              <DocumentCard
                key={doc.id || i}
                document={doc}
                categories={categories}
                index={i}
              />
            ))}
          </div>
        )}

        {filtered.length > 0 && (
          <p className="text-center text-sm text-gray-500 mt-10">
            Showing <strong className="text-gray-900">{filtered.length}</strong>{' '}
            {filtered.length === 1 ? 'document' : 'documents'}
          </p>
        )}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   COMING SOON
   ════════════════════════════════════════════════════════════ */
function ComingSoon({ emptyState }: { emptyState: any }) {
  return (
    <section className="py-24 bg-white">
      <div className="container max-w-4xl">
        <div
          className="hidden-anim relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 via-white to-blue-50 border-2 border-dashed border-green-200"
          data-anim="fadeInUp"
        >
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <div
              className="orb"
              style={{
                width: 320,
                height: 320,
                background: 'rgba(7,137,48,.15)',
                top: -80,
                right: -80,
              }}
            />
            <div
              className="orb"
              style={{
                width: 260,
                height: 260,
                background: 'rgba(255,209,0,.15)',
                bottom: -60,
                left: -60,
                animationDelay: '5s',
              }}
            />
          </div>

          <div className="relative text-center px-6 py-16 sm:px-12 sm:py-20">
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-blue-700 flex items-center justify-center shadow-2xl shadow-green-500/30">
                <i className="fas fa-folder-open text-white text-4xl" />
              </div>
            </div>

            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400 text-gray-900 text-xs font-extrabold uppercase tracking-widest mb-6 shadow-sm">
              <i className="fas fa-hourglass-half" />
              Coming Soon
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
              Resources Are{' '}
              <span className="text-gradient-gold">On The Way</span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              {emptyState?.text ||
                'Our team is currently preparing a curated library of annual reports, policies, financial statements and organizational documents. Check back soon — everything will be free to download and share.'}
            </p>

            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
              {[
                {
                  icon: 'fas fa-file-lines',
                  label: 'Annual Reports',
                  color: 'text-green-600',
                  bg: 'bg-green-50',
                },
                {
                  icon: 'fas fa-file-contract',
                  label: 'Policies',
                  color: 'text-blue-600',
                  bg: 'bg-blue-50',
                },
                {
                  icon: 'fas fa-coins',
                  label: 'Financial Reports',
                  color: 'text-yellow-600',
                  bg: 'bg-amber-50',
                },
              ].map((x, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm"
                >
                  <div
                    className={`w-11 h-11 mx-auto rounded-xl ${x.bg} flex items-center justify-center mb-3`}
                  >
                    <i className={`${x.icon} ${x.color}`} />
                  </div>
                  <p className="text-xs font-bold text-gray-700">{x.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="/contact"
                className="btn-primary px-6 py-3.5 rounded-2xl font-bold text-sm"
              >
                <i className="fas fa-envelope mr-2" />
                <span>Request a Document</span>
              </a>
              <a
                href="/news"
                className="btn-outline-dark px-6 py-3.5 rounded-2xl font-bold text-sm"
              >
                <i className="fas fa-newspaper mr-2" />
                <span>Read Our News</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   NO RESULTS
   ════════════════════════════════════════════════════════════ */
function NoResults({ onClear }: { onClear: () => void }) {
  return (
    <div className="text-center py-20 rounded-3xl bg-gray-50 border border-dashed border-gray-200">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-white flex items-center justify-center mb-4 shadow-sm">
        <i className="fas fa-search text-gray-400 text-xl" />
      </div>
      <p className="text-gray-500 font-semibold mb-1">No matching documents</p>
      <p className="text-gray-400 text-sm mb-5">
        Try a different search term or category.
      </p>
      <button
        onClick={onClear}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 text-sm font-bold hover:bg-gray-50 transition-colors"
      >
        <i className="fas fa-times" /> Clear filters
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   FEATURED CARD
   ════════════════════════════════════════════════════════════ */
function FeaturedDocument({
  document: doc,
  categories,
}: {
  document: any;
  categories: any[];
}) {
  const cat = categories.find((c) => c.id === doc.category);
  const style = getFileStyle(doc.fileType || extFromUrl(doc.fileUrl));
  const hasFile = !!doc.fileUrl;

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 text-white shadow-2xl">
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

      <div className="relative grid lg:grid-cols-5 gap-8 p-8 lg:p-12">
        <div className="lg:col-span-2 flex items-center justify-center">
          <div
            className={`w-32 h-32 lg:w-40 lg:h-40 rounded-3xl ${style.bg} flex items-center justify-center shadow-2xl`}
          >
            <i className={`${style.icon} ${style.color} text-6xl lg:text-7xl`} />
          </div>
        </div>

        <div className="lg:col-span-3 flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400 text-gray-900 text-[11px] font-extrabold tracking-wider uppercase">
              <i className="fas fa-star text-[9px]" /> Featured Resource
            </span>
            {cat && (
              <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-bold tracking-wide uppercase">
                {cat.label}
              </span>
            )}
          </div>

          <h2 className="font-display text-2xl lg:text-4xl font-extrabold leading-tight mb-4">
            {doc.title}
          </h2>

          <p className="text-white/70 leading-relaxed mb-6 max-w-2xl">
            {doc.description}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-6 text-xs text-white/60">
            {doc.fileName && (
              <span className="flex items-center gap-2">
                <i className="fas fa-file" /> {doc.fileName}
              </span>
            )}
            {doc.fileSize && (
              <span className="flex items-center gap-2">
                <i className="fas fa-database" /> {doc.fileSize}
              </span>
            )}
            {doc.date && (
              <span className="flex items-center gap-2">
                <i className="far fa-calendar" /> {doc.date}
              </span>
            )}
          </div>

          {hasFile ? (
            <div className="flex flex-wrap gap-3">
              {/* DOWNLOAD */}
              <a
                href={doc.fileUrl}
                download={doc.fileName || true}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-gray-900 font-bold text-sm hover:bg-yellow-400 transition-all shadow-lg"
              >
                <i className="fas fa-download" /> Download
              </a>

              {/* VIEW / PREVIEW */}
              <a
                href={doc.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl border-2 border-white/30 text-white font-bold text-sm hover:bg-white/10 hover:border-yellow-400 transition-all"
              >
                <i className="fas fa-eye" /> View
              </a>
            </div>
          ) : (
            <p className="text-xs text-white/50 italic">
              File not attached yet — check back soon.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   DOCUMENT CARD
   ════════════════════════════════════════════════════════════ */
function DocumentCard({
  document: doc,
  categories,
  index,
}: {
  document: any;
  categories: any[];
  index: number;
}) {
  const cat = categories.find((c) => c.id === doc.category);
  const style = getFileStyle(doc.fileType || extFromUrl(doc.fileUrl));
  const hasFile = !!doc.fileUrl;
  const fileUrl = doc.fileUrl;
  const fileName = doc.fileName || (fileUrl ? fileUrl.split('/').pop() : 'document');

  return (
    <article
      className="hidden-anim ppf-news-card bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col overflow-hidden"
      data-anim="fadeInUp"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="p-6 flex-1 flex flex-col">
        {/* Icon + category row */}
        <div className="flex items-start justify-between mb-5">
          <div
            className={`w-14 h-14 rounded-2xl ${style.bg} flex items-center justify-center`}
          >
            <i className={`${style.icon} ${style.color} text-2xl`} />
          </div>
          {cat && (
            <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wide">
              {cat.label}
            </span>
          )}
        </div>

        {/* Title + description */}
        <h3 className="font-extrabold text-[17px] text-gray-900 leading-snug mb-3 ppf-clamp-2">
          {doc.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-5 ppf-clamp-3 flex-1">
          {doc.description}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 border-t border-gray-100 text-[11px] text-gray-500 mb-4">
          {doc.fileSize && (
            <span className="flex items-center gap-1.5">
              <i className="fas fa-database" /> {doc.fileSize}
            </span>
          )}
          {doc.date && (
            <span className="flex items-center gap-1.5">
              <i className="far fa-calendar" /> {doc.date}
            </span>
          )}
        </div>

        {/* Actions: Download + View */}
        {hasFile ? (
          <div className="grid grid-cols-2 gap-2">
            {/* DOWNLOAD */}
            <a
              href={fileUrl}
              download={fileName}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white text-sm font-bold hover:from-green-700 hover:to-green-800 transition-all shadow-sm"
              title="Download this file"
            >
              <i className="fas fa-download text-xs" />
              <span>Download</span>
            </a>

            {/* VIEW */}
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-700 text-sm font-bold hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all"
              title="View in a new tab"
            >
              <i className="fas fa-eye text-xs" />
              <span>View</span>
            </a>
          </div>
        ) : (
          <span className="inline-flex items-center justify-center w-full px-5 py-3 rounded-xl bg-gray-100 text-gray-400 text-sm font-bold cursor-not-allowed">
            <i className="fas fa-clock mr-2" /> Coming Soon
          </span>
        )}
      </div>
    </article>
  );
}