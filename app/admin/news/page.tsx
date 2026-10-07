'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import FileUpload from '@/components/admin/FileUpload';
import {
  Field,
  TextArea,
  Select,
  Grid,
  InfoBanner,
} from '@/components/admin/Field';

/* ════════════════════════════════════════════════════════════
   TYPES
   ════════════════════════════════════════════════════════════ */
type Article = {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
  author: string;
  featured: boolean;
  published: boolean;
};

/* ════════════════════════════════════════════════════════════
   HELPERS
   ════════════════════════════════════════════════════════════ */
function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
    .replace(/^-+|-+$/g, '');
}

function today() {
  return new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function newArticle(): Article {
  return {
    id: `article-${Date.now()}`,
    title: '',
    slug: '',
    date: today(),
    category: 'education',
    image: '',
    excerpt: '',
    content: '',
    author: 'MSA Media Team',
    featured: false,
    published: true,
  };
}

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════ */
export default function NewsEditor() {
  const [data, setData] = useState<any>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'featured'>('all');
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);
  const [dirty, setDirty] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  /* Load */
  useEffect(() => {
    fetch('/api/news')
      .then((r) => r.json())
      .then((d) => {
        if (!d || typeof d !== 'object') throw new Error('Bad data');
        if (!Array.isArray(d.articles)) d.articles = [];
        if (!Array.isArray(d.categories)) d.categories = [];
        setData(d);
        // Auto-select first article
        if (d.articles.length > 0) setSelectedId(d.articles[0].id);
      })
      .catch(() => setLoadError(true));
  }, []);

  const showToast = (type: 'ok' | 'err', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 2800);
  };

  /* Update a single field on an article */
  const updateArticle = useCallback((id: string, updates: Partial<Article>) => {
    setData((prev: any) => {
      if (!prev) return prev;
      const next = clone(prev);
      const idx = next.articles.findIndex((a: Article) => a.id === id);
      if (idx === -1) return prev;
      next.articles[idx] = { ...next.articles[idx], ...updates };
      return next;
    });
    setDirty(true);
  }, []);

  /* Add a new article */
  const addArticle = () => {
    const a = newArticle();
    setData((prev: any) => {
      const next = clone(prev);
      next.articles.unshift(a);
      return next;
    });
    setSelectedId(a.id);
    setDirty(true);
  };

  /* Delete an article */
  const deleteArticle = (id: string) => {
    setData((prev: any) => {
      const next = clone(prev);
      next.articles = next.articles.filter((a: Article) => a.id !== id);
      return next;
    });
    if (selectedId === id) setSelectedId(null);
    setConfirmDelete(null);
    setDirty(true);
  };

  /* Duplicate an article */
  const duplicateArticle = (id: string) => {
    const source = data?.articles?.find((a: Article) => a.id === id);
    if (!source) return;
    const copy = clone(source);
    copy.id = `article-${Date.now()}`;
    copy.title = `${copy.title} (Copy)`;
    copy.slug = `${copy.slug}-copy-${Date.now()}`;
    copy.published = false;
    setData((prev: any) => {
      const next = clone(prev);
      const idx = next.articles.findIndex((a: Article) => a.id === id);
      next.articles.splice(idx + 1, 0, copy);
      return next;
    });
    setSelectedId(copy.id);
    setDirty(true);
  };

  /* Toggle featured / published */
  const toggleField = (id: string, field: 'featured' | 'published') => {
    const a = data?.articles?.find((x: Article) => x.id === id);
    if (!a) return;
    updateArticle(id, { [field]: !a[field] } as any);
  };

  /* Save all */
  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/news', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        let msg = `Save failed (${res.status})`;
        try {
          const b = await res.json();
          if (b?.error) msg = b.error;
        } catch {}
        throw new Error(msg);
      }
      showToast('ok', 'Changes saved successfully!');
      setDirty(false);
    } catch (err: any) {
      showToast('err', err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  /* Filtered + searched article list */
  const visibleArticles = useMemo(() => {
    if (!data?.articles) return [];
    let list: Article[] = data.articles;
    if (filter === 'published') list = list.filter((a) => a.published);
    else if (filter === 'draft') list = list.filter((a) => !a.published);
    else if (filter === 'featured') list = list.filter((a) => a.featured);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.author?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [data, filter, search]);

  const selectedArticle: Article | null =
    data?.articles?.find((a: Article) => a.id === selectedId) || null;

  /* Counts for filter tabs */
  const counts = useMemo(() => {
    const all = data?.articles?.length || 0;
    const published = data?.articles?.filter((a: Article) => a.published).length || 0;
    const draft = all - published;
    const featured = data?.articles?.filter((a: Article) => a.featured).length || 0;
    return { all, published, draft, featured };
  }, [data]);

  /* ── Loading / error ─────────────────────────────────────── */
  if (!data && !loadError) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading news articles...</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-red-100 flex items-center justify-center mb-4">
            <i className="fas fa-exclamation-triangle text-red-600 text-xl" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Could not load news</h2>
          <button
            onClick={() => location.reload()}
            className="px-5 py-2.5 rounded-lg bg-green-600 text-white font-bold text-sm"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* ═════ TOP BAR ═════ */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <Link href="/admin/dashboard" className="hover:text-green-600">
              Dashboard
            </Link>
            <i className="fas fa-chevron-right text-[8px]" />
            <span>News</span>
          </div>
          <h1 className="text-lg font-bold text-gray-900">Manage News</h1>
        </div>

        <div className="flex items-center gap-3">
          {dirty && (
            <span className="hidden sm:flex text-xs font-semibold text-amber-600 items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Unsaved changes
            </span>
          )}
          <Link
            href="/news"
            target="_blank"
            className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100"
          >
            <i className="fas fa-eye" /> View Site
          </Link>
          <button
            onClick={save}
            disabled={saving || !dirty}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {saving ? (
              <>
                <i className="fas fa-spinner fa-spin" /> Saving...
              </>
            ) : (
              <>
                <i className="fas fa-save" /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* ═════ LEFT: ARTICLE LIST ═════ */}
        <aside className="w-[340px] bg-white border-r border-gray-200 flex-shrink-0 flex flex-col sticky top-[73px] self-start max-h-[calc(100vh-73px)]">
          {/* Add + Search */}
          <div className="p-4 border-b border-gray-100 space-y-3">
            <button
              onClick={addArticle}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-sm transition-all"
            >
              <i className="fas fa-plus" /> New Article
            </button>

            <div className="relative">
              <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/15"
              />
            </div>
          </div>

          {/* Filter tabs */}
          <div className="px-4 py-3 border-b border-gray-100 flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'All', count: counts.all },
              { id: 'published', label: 'Live', count: counts.published },
              { id: 'draft', label: 'Draft', count: counts.draft },
              { id: 'featured', label: 'Featured', count: counts.featured },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id as any)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                  filter === t.id
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t.label} <span className="opacity-70">· {t.count}</span>
              </button>
            ))}
          </div>

          {/* Article list */}
          <div className="flex-1 overflow-y-auto">
            {visibleArticles.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-12 h-12 mx-auto rounded-xl bg-gray-100 flex items-center justify-center mb-3">
                  <i className="fas fa-newspaper text-gray-400" />
                </div>
                <p className="text-sm font-semibold text-gray-500 mb-1">
                  {data.articles.length === 0 ? 'No articles yet' : 'No matches'}
                </p>
                <p className="text-xs text-gray-400">
                  {data.articles.length === 0
                    ? 'Click "New Article" to publish your first story'
                    : 'Try a different filter or search term'}
                </p>
              </div>
            ) : (
              <div className="p-2 space-y-1">
                {visibleArticles.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setSelectedId(a.id)}
                    className={`w-full text-left rounded-xl p-3 transition-all ${
                      selectedId === a.id
                        ? 'bg-green-50 border-2 border-green-500'
                        : 'border-2 border-transparent hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {a.image ? (
                          <img src={a.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <i className="fas fa-image text-sm" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          {a.featured && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-yellow-400 text-gray-900 text-[9px] font-extrabold uppercase">
                              <i className="fas fa-star text-[7px]" /> Featured
                            </span>
                          )}
                          {!a.published && (
                            <span className="px-1.5 py-0.5 rounded bg-gray-200 text-gray-600 text-[9px] font-extrabold uppercase">
                              Draft
                            </span>
                          )}
                        </div>
                        <p className="font-bold text-xs text-gray-900 leading-snug ppf-clamp-2 mb-1">
                          {a.title || 'Untitled article'}
                        </p>
                        <p className="text-[10px] text-gray-500">{a.date}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* ═════ RIGHT: EDITOR ═════ */}
        <main className="flex-1 min-w-0 bg-gray-50">
          {!selectedArticle ? (
            <EmptyState onAdd={addArticle} />
          ) : (
            <ArticleForm
              article={selectedArticle}
              categories={data.categories || []}
              onChange={(updates) => updateArticle(selectedArticle.id, updates)}
              onDuplicate={() => duplicateArticle(selectedArticle.id)}
              onDelete={() => setConfirmDelete(selectedArticle.id)}
              onTogglePublished={() => toggleField(selectedArticle.id, 'published')}
              onToggleFeatured={() => toggleField(selectedArticle.id, 'featured')}
            />
          )}
        </main>
      </div>

      {/* ═════ TOAST ═════ */}
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

      {/* ═════ DELETE CONFIRMATION ═════ */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="w-14 h-14 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
              <i className="fas fa-trash-alt text-red-600 text-xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
              Delete this article?
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
              This action cannot be undone. The article will be removed permanently once you
              save your changes.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 font-bold text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteArticle(confirmDelete)}
                className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   EMPTY STATE
   ════════════════════════════════════════════════════════════ */
function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-white shadow-sm flex items-center justify-center mb-6">
          <i className="fas fa-newspaper text-gray-300 text-3xl" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">No article selected</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Pick an article from the list to edit it, or start fresh with a new one.
        </p>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-sm transition-all"
        >
          <i className="fas fa-plus" /> Create New Article
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   ARTICLE FORM
   ════════════════════════════════════════════════════════════ */
function ArticleForm({
  article,
  categories,
  onChange,
  onDuplicate,
  onDelete,
  onTogglePublished,
  onToggleFeatured,
}: {
  article: Article;
  categories: any[];
  onChange: (updates: Partial<Article>) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onTogglePublished: () => void;
  onToggleFeatured: () => void;
}) {
  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      {/* ═════ Status banner ═════ */}
      <div
        className={`rounded-2xl p-4 mb-6 flex flex-wrap items-center gap-4 ${
          article.published
            ? 'bg-green-50 border border-green-100'
            : 'bg-amber-50 border border-amber-100'
        }`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-[200px]">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              article.published ? 'bg-green-500' : 'bg-amber-500'
            }`}
          >
            <i
              className={`fas ${
                article.published ? 'fa-check' : 'fa-pencil'
              } text-white text-sm`}
            />
          </div>
          <div>
            <p
              className={`font-bold text-sm ${
                article.published ? 'text-green-900' : 'text-amber-900'
              }`}
            >
              {article.published ? 'Published — visible on the site' : 'Draft — not visible yet'}
            </p>
            <p
              className={`text-xs ${
                article.published ? 'text-green-700' : 'text-amber-700'
              }`}
            >
              {article.published
                ? 'Readers can see this article on the News page'
                : 'Only you can see this article until you publish it'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={onTogglePublished}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              article.published
                ? 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            <i className={`fas ${article.published ? 'fa-eye-slash' : 'fa-check'}`} />
            {article.published ? 'Unpublish' : 'Publish'}
          </button>

          <button
            onClick={onToggleFeatured}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              article.featured
                ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <i className="fas fa-star" />
            {article.featured ? 'Featured' : 'Feature it'}
          </button>
        </div>
      </div>

      {/* ═════ Section: Basics ═════ */}
      <Section title="Article Basics" icon="fas fa-heading" description="The title and date readers will see.">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Article Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={article.title}
            onChange={(e) => {
              const title = e.target.value;
              const updates: Partial<Article> = { title };
              // Auto-generate slug if the user hasn't set one, or if the slug still
              // matches the previous title's slug
              if (!article.slug || article.slug === slugify(article.title || '')) {
                updates.slug = slugify(title);
              }
              onChange(updates);
            }}
            placeholder="e.g. MSA Launches Girls' Education Campaign in Maridi"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/15"
          />
          <p className="mt-1.5 text-xs text-gray-500">
            This is the headline readers see. Keep it clear and specific.
          </p>
        </div>

        <Grid cols={2}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Date
            </label>
            <input
              type="text"
              value={article.date}
              onChange={(e) => onChange({ date: e.target.value })}
              placeholder="July 17, 2026"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/15"
            />
            <p className="mt-1.5 text-xs text-gray-500">
              e.g. July 17, 2026
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Author
            </label>
            <input
              type="text"
              value={article.author}
              onChange={(e) => onChange({ author: e.target.value })}
              placeholder="MSA Media Team"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/15"
            />
            <p className="mt-1.5 text-xs text-gray-500">
              Who wrote it? Usually "MSA Media Team" or a specific person.
            </p>
          </div>
        </Grid>
      </Section>

      {/* ═════ Section: Category ═════ */}
      <Section title="Category" icon="fas fa-tags" description="Which filter tab should this article appear under?">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categories.map((c) => {
            const isActive = article.category === c.id;
            const colorMap: Record<string, string> = {
              gold: 'bg-yellow-400 text-gray-900 border-yellow-400',
              red: 'bg-red-500 text-white border-red-500',
              purple: 'bg-purple-500 text-white border-purple-500',
              navy: 'bg-blue-700 text-white border-blue-700',
              blue: 'bg-blue-500 text-white border-blue-500',
              green: 'bg-green-500 text-white border-green-500',
            };
            const col = colorMap[c.color] || colorMap.green;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onChange({ category: c.id })}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                  isActive
                    ? col
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                {isActive && <i className="fas fa-check text-xs" />}
                {c.label}
              </button>
            );
          })}
        </div>
      </Section>

      {/* ═════ Section: Cover Image ═════ */}
      <Section title="Cover Image" icon="fas fa-image" description="The image shown on the card and at the top of the article.">
        <FileUpload
          label="Article Image"
          value={article.image}
          onChange={(v) => onChange({ image: v })}
          help="Recommended 1200×675 (16:9). PNG or JPG up to 10MB."
        />
      </Section>

      {/* ═════ Section: Short Summary ═════ */}
      <Section title="Short Summary" icon="fas fa-align-left" description="Shown on the news list card — 1-2 sentences that make readers want to click.">
        <TextArea
          label="Excerpt"
          value={article.excerpt}
          onChange={(v) => onChange({ excerpt: v })}
          placeholder="A short, punchy summary of the article..."
          rows={3}
          help={`${(article.excerpt || '').length} characters (aim for 120-200)`}
        />
      </Section>

      {/* ═════ Section: Full Article Content ═════ */}
      <Section
        title="Full Article"
        icon="fas fa-file-lines"
        description="The complete article body readers see when they open the story."
      >
        <InfoBanner>
          <strong>Formatting tips:</strong>
          <ul className="mt-2 space-y-1 text-xs">
            <li>• Separate paragraphs with a <strong>blank line</strong></li>
            <li>• Start a line with <code className="px-1 bg-blue-100 rounded">## </code> for a <strong>heading</strong></li>
            <li>• Start lines with <code className="px-1 bg-blue-100 rounded">- </code> for <strong>bullet points</strong></li>
            <li>• Use <code className="px-1 bg-blue-100 rounded">**text**</code> for <strong>bold</strong></li>
          </ul>
        </InfoBanner>

        <TextArea
          label="Content"
          value={article.content}
          onChange={(v) => onChange({ content: v })}
          placeholder={`Write your article here...\n\n## Section heading\n\nA paragraph of text.\n\n- Bullet point one\n- Bullet point two`}
          rows={20}
          help={`${(article.content || '').split(/\s+/).filter(Boolean).length} words`}
        />
      </Section>

      {/* ═════ Section: URL slug ═════ */}
      <Section title="URL (Advanced)" icon="fas fa-link" description="The link where this article lives. Leave auto-generated unless you need to change it.">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            URL Slug
          </label>
          <div className="flex items-stretch">
            <span className="inline-flex items-center px-3 rounded-l-xl bg-gray-100 text-gray-500 text-xs font-mono border border-r-0 border-gray-200">
              /news/
            </span>
            <input
              type="text"
              value={article.slug}
              onChange={(e) => onChange({ slug: slugify(e.target.value) })}
              placeholder="article-slug"
              className="flex-1 px-4 py-3 rounded-r-xl border border-gray-200 text-sm font-mono outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/15"
            />
          </div>
          <p className="mt-1.5 text-xs text-gray-500">
            Auto-generated from the title. Change only if needed.
          </p>
        </div>
      </Section>

      {/* ═════ Danger zone ═════ */}
      <div className="mt-10 pt-6 border-t border-gray-200 flex flex-wrap gap-3">
        <button
          onClick={onDuplicate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors"
        >
          <i className="fas fa-copy" /> Duplicate
        </button>
        <button
          onClick={onDelete}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 transition-colors ml-auto"
        >
          <i className="fas fa-trash-alt" /> Delete Article
        </button>
      </div>

      {/* Bottom note */}
      <div className="mt-6 p-4 rounded-xl bg-gray-100 text-xs text-gray-600 text-center">
        <i className="fas fa-info-circle mr-1.5" />
        Changes are saved when you click <strong>Save Changes</strong> in the top-right corner.
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SECTION WRAPPER
   ════════════════════════════════════════════════════════════ */
function Section({
  title,
  icon,
  description,
  children,
}: {
  title: string;
  icon: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-5">
      <div className="flex items-start gap-3 mb-5 pb-4 border-b border-gray-100">
        <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
          <i className={`${icon} text-green-600 text-sm`} />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-base">{title}</h3>
          {description && (
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}