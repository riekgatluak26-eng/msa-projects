'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import FileUpload from '@/components/admin/FileUpload';
import {
  Field,
  TextArea,
  Select,
  SectionHeader,
  Grid,
  InfoBanner,
  ItemCard,
} from '@/components/admin/Field';

/* ════════════════════════════════════════════════════════════
   SECTIONS
   ════════════════════════════════════════════════════════════ */
type SectionAccent = 'green' | 'blue' | 'amber' | 'red' | 'purple';

type Section = {
  id: string;
  label: string;
  icon: string;
  accent: SectionAccent;
  description: string;
};

const SECTIONS: Section[] = [
  { id: 'hero',       label: 'Hero',       icon: 'fas fa-image',       accent: 'blue',   description: 'Page title and subtitle.' },
  { id: 'stats',      label: 'Stats Row',  icon: 'fas fa-chart-line',  accent: 'green',  description: 'Optional top stats strip.' },
  { id: 'categories', label: 'Categories', icon: 'fas fa-folder-tree', accent: 'amber',  description: 'Filter tabs (Annual Reports, Policies, etc).' },
  { id: 'documents',  label: 'Documents',  icon: 'fas fa-file-lines',  accent: 'green',  description: 'Upload and manage all documents.' },
  { id: 'cta',        label: 'Bottom CTA', icon: 'fas fa-bullhorn',    accent: 'red',    description: 'Bottom banner with buttons.' },
];

/* ════════════════════════════════════════════════════════════
   HELPERS
   ════════════════════════════════════════════════════════════ */
function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}

function getPath(obj: any, path: string): any {
  const parts = path.split('.');
  let cur: any = obj;
  for (const part of parts) {
    const m = part.match(/^(\w+)\[(\d+)\]$/);
    if (m) {
      const [, key, idx] = m;
      cur = cur?.[key]?.[Number(idx)];
    } else {
      cur = cur?.[part];
    }
    if (cur === undefined) return undefined;
  }
  return cur;
}

const COLOR_OPTIONS = [
  { value: 'brand',  label: 'Green' },
  { value: 'navy',   label: 'Navy Blue' },
  { value: 'gold',   label: 'Gold' },
  { value: 'red',    label: 'Red' },
  { value: 'purple', label: 'Purple' },
  { value: 'pink',   label: 'Pink' },
];

const FILE_TYPE_OPTIONS = [
  { value: 'pdf',  label: 'PDF Document' },
  { value: 'doc',  label: 'Word (.doc)' },
  { value: 'docx', label: 'Word (.docx)' },
  { value: 'xls',  label: 'Excel (.xls)' },
  { value: 'xlsx', label: 'Excel (.xlsx)' },
  { value: 'ppt',  label: 'PowerPoint (.ppt)' },
  { value: 'pptx', label: 'PowerPoint (.pptx)' },
  { value: 'zip',  label: 'ZIP Archive' },
  { value: 'txt',  label: 'Text File' },
  { value: 'csv',  label: 'CSV' },
];

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════ */
export default function ResourcesEditor() {
  const [data, setData] = useState<any>(null);
  const [active, setActive] = useState<string>('hero');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);
  const [dirty, setDirty] = useState(false);
  const [loadError, setLoadError] = useState(false);

  /* ─── Load ─────────────────────────────────────────────── */
  useEffect(() => {
    fetch('/api/resources')
      .then((r) => r.json())
      .then((d) => {
        if (!d || typeof d !== 'object') throw new Error('Bad data');
        const safe: any = { ...d };
        for (const s of SECTIONS) {
          if (!safe[s.id] || typeof safe[s.id] !== 'object') safe[s.id] = {};
        }
        if (!Array.isArray(safe.categories)) safe.categories = [];
        if (!Array.isArray(safe.documents)) safe.documents = [];
        if (!safe.stats || typeof safe.stats !== 'object') safe.stats = { show: true, items: [] };
        if (!Array.isArray(safe.stats.items)) safe.stats.items = [];
        setData(safe);
      })
      .catch(() => setLoadError(true));
  }, []);

  /* ─── Toast ────────────────────────────────────────────── */
  const showToast = (type: 'ok' | 'err', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 2800);
  };

  /* ─── setField: writes to nested path like "documents[0].title" ── */
  const setField = useCallback((path: string, value: any) => {
    setData((prev: any) => {
      if (!prev) return prev;
      const next = clone(prev);
      const parts = path.split('.');
      let obj: any = next;

      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        const m = part.match(/^(\w+)\[(\d+)\]$/);
        if (m) {
          const [, key, idx] = m;
          if (!Array.isArray(obj[key])) obj[key] = [];
          if (!obj[key][Number(idx)]) obj[key][Number(idx)] = {};
          obj = obj[key][Number(idx)];
        } else {
          if (!obj[part] || typeof obj[part] !== 'object') obj[part] = {};
          obj = obj[part];
        }
      }

      const last = parts[parts.length - 1];
      const lm = last.match(/^(\w+)\[(\d+)\]$/);
      if (lm) {
        const [, key, idx] = lm;
        if (!Array.isArray(obj[key])) obj[key] = [];
        obj[key][Number(idx)] = value;
      } else {
        obj[last] = value;
      }
      return next;
    });
    setDirty(true);
  }, []);

  /* ─── mutate: run a function against the whole data tree ── */
  const mutate = useCallback((fn: (d: any) => void) => {
    setData((prev: any) => {
      if (!prev) return prev;
      const next = clone(prev);
      fn(next);
      return next;
    });
    setDirty(true);
  }, []);

  /* ─── arrayActions: move/remove/duplicate for arrays ── */
  const arrayActions = useCallback(
    (i: number, path: string) => ({
      onMoveUp: () =>
        mutate((d) => {
          const arr = getPath(d, path);
          if (!Array.isArray(arr) || i <= 0 || !arr[i] || !arr[i - 1]) return;
          [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
        }),
      onMoveDown: () =>
        mutate((d) => {
          const arr = getPath(d, path);
          if (!Array.isArray(arr) || i >= arr.length - 1 || !arr[i] || !arr[i + 1]) return;
          [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]];
        }),
      onRemove: () =>
        mutate((d) => {
          const arr = getPath(d, path);
          if (!Array.isArray(arr)) return;
          arr.splice(i, 1);
        }),
      onDuplicate: () =>
        mutate((d) => {
          const arr = getPath(d, path);
          if (!Array.isArray(arr) || !arr[i]) return;
          const copy = clone(arr[i]);
          if (copy.title) copy.title = `${copy.title} (Copy)`;
          if (copy.id) copy.id = `${copy.id}-copy-${Date.now()}`;
          arr.splice(i + 1, 0, copy);
        }),
    }),
    [mutate]
  );

  /* ─── Save ─────────────────────────────────────────────── */
  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/resources', {
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
      showToast('ok', 'Resources saved!');
      setDirty(false);
    } catch (err: any) {
      showToast('err', err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  /* ─── Loading / error ─────────────────────────────────── */
  if (!data && !loadError) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading resources...</p>
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
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Could not load Resources
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Check your connection and try again.
          </p>
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

  const activeSection = SECTIONS.find((s) => s.id === active) || SECTIONS[0];

  return (
    <div className="min-h-screen flex flex-col">
      {/* ═══════ TOP BAR ═══════ */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <Link href="/admin/dashboard" className="hover:text-green-600">
              Dashboard
            </Link>
            <i className="fas fa-chevron-right text-[8px]" />
            <span>Resources</span>
          </div>
          <h1 className="text-lg font-bold text-gray-900">Manage Resources</h1>
        </div>

        <div className="flex items-center gap-3">
          {dirty && (
            <span className="hidden sm:flex text-xs font-semibold text-amber-600 items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Unsaved changes
            </span>
          )}
          <Link
            href="/resources"
            target="_blank"
            className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100"
          >
            <i className="fas fa-eye" /> Preview
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

      {/* ═══════ BODY ═══════ */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 py-4 sticky top-[73px] self-start max-h-[calc(100vh-73px)] overflow-y-auto hidden lg:block">
          <p className="px-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
            Sections
          </p>
          <nav className="space-y-0.5 px-2">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all text-left ${
                  active === s.id
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <i
                  className={`${s.icon} w-4 text-center ${
                    active === s.id ? 'text-green-600' : 'text-gray-400'
                  }`}
                />
                {s.label}
                {s.id === 'documents' && data.documents?.length > 0 && (
                  <span className="ml-auto text-[10px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                    {data.documents.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile section picker */}
        <div className="lg:hidden w-full p-4 bg-gray-50 border-b border-gray-200">
          <select
            value={active}
            onChange={(e) => setActive(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white font-semibold text-sm"
          >
            {SECTIONS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Form area */}
        <div className="flex-1 p-6 lg:p-8 max-w-4xl">
          <SectionHeader
            icon={activeSection.icon}
            title={activeSection.label}
            description={activeSection.description}
            accent={activeSection.accent}
          />
          {renderSection(active, data, setField, mutate, arrayActions)}
        </div>
      </div>

      {/* ═══════ TOAST ═══════ */}
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

/* ════════════════════════════════════════════════════════════
   SECTION ROUTER
   ════════════════════════════════════════════════════════════ */
function renderSection(
  id: string,
  data: any,
  setField: any,
  mutate: any,
  arrayActions: any
) {
  switch (id) {
    case 'hero':       return <HeroForm data={data} setField={setField} />;
    case 'stats':      return <StatsForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'categories': return <CategoriesForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'documents':  return <DocumentsForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'cta':        return <CtaForm data={data} setField={setField} />;
    default:           return null;
  }
}

type FormProps = {
  data: any;
  setField: (p: string, v: any) => void;
  mutate: (fn: (d: any) => void) => void;
  arrayActions: (i: number, path: string) => any;
};

/* ════════════════════════════════════════════════════════════
   HERO
   ════════════════════════════════════════════════════════════ */
function HeroForm({ data, setField }: { data: any; setField: any }) {
  const h = data.hero || {};
  return (
    <div className="space-y-6">
      <InfoBanner>Top banner of the Resources page.</InfoBanner>

      <Field label="Eyebrow" value={h.eyebrow} onChange={(v) => setField('hero.eyebrow', v)} />

      <Grid cols={2}>
        <Field label="Title" value={h.title} onChange={(v) => setField('hero.title', v)} />
        <Field
          label="Title Accent (gold)"
          value={h.titleAccent}
          onChange={(v) => setField('hero.titleAccent', v)}
          help='The gold-highlighted part of the title.'
        />
      </Grid>

      <TextArea
        label="Subtitle"
        value={h.subtitle}
        onChange={(v) => setField('hero.subtitle', v)}
        rows={3}
      />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   STATS
   ════════════════════════════════════════════════════════════ */
function StatsForm({ data, setField, mutate, arrayActions }: FormProps) {
  const s = data.stats || {};
  const items: any[] = Array.isArray(s.items) ? s.items : [];

  return (
    <div className="space-y-6">
      <InfoBanner>
        The stats strip appears just below the hero. Hide it while you have no documents.
      </InfoBanner>

      <label className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 cursor-pointer">
        <input
          type="checkbox"
          checked={s.show !== false}
          onChange={(e) => setField('stats.show', e.target.checked)}
          className="rounded border-gray-300 text-green-600"
        />
        <span className="text-sm font-bold text-gray-900">
          Show stats row on the public page
        </span>
      </label>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <h3 className="font-bold text-gray-900">Stats ({items.length})</h3>
        <button
          onClick={() =>
            mutate((x: any) => {
              if (!Array.isArray(x.stats.items)) x.stats.items = [];
              x.stats.items.push({
                icon: 'fas fa-chart-line',
                color: 'brand',
                value: '0',
                label: 'New Stat',
              });
            })
          }
          className="text-xs font-bold text-green-600 hover:text-green-700"
        >
          <i className="fas fa-plus mr-1" /> Add Stat
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item, i) => {
          const a = arrayActions(i, 'stats.items');
          return (
            <div key={i} className="rounded-lg border border-gray-200 bg-white p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase">
                  Stat {i + 1}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={a.onMoveUp}
                    disabled={i === 0}
                    className="w-6 h-6 rounded hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center"
                  >
                    <i className="fas fa-arrow-up text-[10px]" />
                  </button>
                  <button
                    onClick={a.onMoveDown}
                    disabled={i === items.length - 1}
                    className="w-6 h-6 rounded hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center"
                  >
                    <i className="fas fa-arrow-down text-[10px]" />
                  </button>
                  <button
                    onClick={a.onRemove}
                    className="w-6 h-6 rounded hover:bg-red-100 text-red-500 flex items-center justify-center"
                  >
                    <i className="fas fa-trash-alt text-[10px]" />
                  </button>
                </div>
              </div>

              <Grid cols={2}>
                <Field
                  label="Icon"
                  value={item.icon}
                  onChange={(v) => setField(`stats.items[${i}].icon`, v)}
                  mono
                />
                <Select
                  label="Color"
                  value={item.color}
                  onChange={(v) => setField(`stats.items[${i}].color`, v)}
                  options={COLOR_OPTIONS}
                />
                <Field
                  label="Value"
                  value={item.value}
                  onChange={(v) => setField(`stats.items[${i}].value`, v)}
                />
                <Field
                  label="Label"
                  value={item.label}
                  onChange={(v) => setField(`stats.items[${i}].label`, v)}
                />
                <Field
                  label="Suffix"
                  value={item.suffix}
                  onChange={(v) => setField(`stats.items[${i}].suffix`, v)}
                  mono
                  help='e.g. "+" or "K+"'
                />
              </Grid>

              <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!item.static}
                  onChange={(e) =>
                    setField(`stats.items[${i}].static`, e.target.checked)
                  }
                  className="rounded border-gray-300 text-green-600"
                />
                Static (no count-up animation)
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   CATEGORIES
   ════════════════════════════════════════════════════════════ */
function CategoriesForm({ data, setField, mutate, arrayActions }: FormProps) {
  const categories: any[] = Array.isArray(data.categories) ? data.categories : [];

  return (
    <div className="space-y-6">
      <InfoBanner>
        These are the filter tabs on the public Resources page. The{' '}
        <code className="px-1 bg-blue-100 rounded">id</code> is used internally —
        use lowercase-with-dashes (e.g.{' '}
        <code className="px-1 bg-blue-100 rounded">annual-reports</code>).
      </InfoBanner>

      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Categories ({categories.length})</h3>
        <button
          onClick={() =>
            mutate((x: any) => {
              if (!Array.isArray(x.categories)) x.categories = [];
              x.categories.push({
                id: `category-${Date.now()}`,
                label: 'New Category',
                icon: 'fas fa-folder',
                color: 'brand',
              });
            })
          }
          className="text-xs font-bold text-green-600 hover:text-green-700"
        >
          <i className="fas fa-plus mr-1" /> Add Category
        </button>
      </div>

      <div className="space-y-3">
        {categories.map((c, i) => {
          const a = arrayActions(i, 'categories');
          return (
            <ItemCard
              key={i}
              index={i}
              title={c.label || 'Untitled'}
              canMoveUp={i > 0}
              canMoveDown={i < categories.length - 1}
              {...a}
            >
              <Grid cols={2}>
                <Field
                  label="Label"
                  value={c.label}
                  onChange={(v) => setField(`categories[${i}].label`, v)}
                  help='Shown on the button, e.g. "Annual Reports"'
                />
                <Field
                  label="ID"
                  value={c.id}
                  onChange={(v) => setField(`categories[${i}].id`, v)}
                  mono
                  help="Internal id, e.g. annual-reports"
                />
                <Field
                  label="Icon (Font Awesome)"
                  value={c.icon}
                  onChange={(v) => setField(`categories[${i}].icon`, v)}
                  mono
                  help="e.g. fas fa-file-lines"
                />
                <Select
                  label="Color"
                  value={c.color}
                  onChange={(v) => setField(`categories[${i}].color`, v)}
                  options={COLOR_OPTIONS}
                />
              </Grid>
            </ItemCard>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   DOCUMENTS
   ════════════════════════════════════════════════════════════ */
function DocumentsForm({ data, setField, mutate, arrayActions }: FormProps) {
  const docs: any[] = Array.isArray(data.documents) ? data.documents : [];
  const categories: any[] = Array.isArray(data.categories) ? data.categories : [];

  const catOptions = categories.map((c) => ({
    value: c.id,
    label: c.label,
  }));

  return (
    <div className="space-y-6">
      <InfoBanner>
        Upload documents here. Supported formats: <strong>PDF, Word, Excel, PowerPoint,
        TXT, CSV, ZIP</strong> — max 25 MB per file. Mark one as{' '}
        <strong>Featured</strong> to show it as a big banner at the top of the page.
      </InfoBanner>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900">
            Documents ({docs.length})
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Each document shows as a card with a download button.
          </p>
        </div>
        <button
          onClick={() =>
            mutate((x: any) => {
              if (!Array.isArray(x.documents)) x.documents = [];
              x.documents.unshift({
                id: `doc-${Date.now()}`,
                title: 'New Document',
                description: 'Brief description of this document...',
                category: categories[0]?.id || 'annual-reports',
                fileUrl: '',
                fileName: '',
                fileSize: '',
                fileType: 'pdf',
                date: new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                }),
                featured: false,
                published: true,
              });
            })
          }
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-600 text-white text-xs font-bold hover:bg-green-700 shadow-sm"
        >
          <i className="fas fa-plus" /> Add Document
        </button>
      </div>

      {/* Empty state */}
      {docs.length === 0 && (
        <div className="text-center py-12 rounded-xl bg-gray-50 border border-dashed border-gray-200">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-white flex items-center justify-center mb-3 shadow-sm">
            <i className="fas fa-folder-open text-gray-400 text-lg" />
          </div>
          <p className="text-sm font-semibold text-gray-600 mb-1">
            No documents yet
          </p>
          <p className="text-xs text-gray-500 mb-5">
            The public page shows a friendly &ldquo;Coming Soon&rdquo; panel until you add
            your first document.
          </p>
          <button
            onClick={() =>
              mutate((x: any) => {
                if (!Array.isArray(x.documents)) x.documents = [];
                x.documents.unshift({
                  id: `doc-${Date.now()}`,
                  title: 'New Document',
                  description: 'Brief description of this document...',
                  category: categories[0]?.id || 'annual-reports',
                  fileUrl: '',
                  fileName: '',
                  fileSize: '',
                  fileType: 'pdf',
                  date: new Date().toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  }),
                  featured: false,
                  published: true,
                });
              })
            }
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-600 text-white text-xs font-bold hover:bg-green-700 shadow-sm"
          >
            <i className="fas fa-plus" /> Add Your First Document
          </button>
        </div>
      )}

      {/* Document list */}
      <div className="space-y-3">
        {docs.map((item, i) => {
          const a = arrayActions(i, 'documents');
          const isPublished = item.published !== false;
          return (
            <ItemCard
              key={i}
              index={i}
              title={item.title || 'Untitled'}
              canMoveUp={i > 0}
              canMoveDown={i < docs.length - 1}
              {...a}
            >
              {/* Status toggles */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setField(`documents[${i}].published`, !isPublished)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isPublished
                      ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                      : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  <i className={`fas ${isPublished ? 'fa-check' : 'fa-pencil'}`} />
                  {isPublished ? 'Published' : 'Draft'}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setField(`documents[${i}].featured`, !item.featured)
                  }
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    item.featured
                      ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <i className="fas fa-star" />
                  {item.featured ? 'Featured' : 'Feature it'}
                </button>
              </div>

              {/* File upload */}
              <FileUpload
                label="Document File"
                value={item.fileUrl || ''}
                onChange={(v) => {
                  setField(`documents[${i}].fileUrl`, v);
                  // Auto-fill fileName from URL if empty
                  if (v && !item.fileName) {
                    const parts = v.split('/');
                    setField(`documents[${i}].fileName`, parts[parts.length - 1]);
                  }
                }}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip"
                help="Upload a PDF, Word, Excel, PowerPoint, TXT, CSV or ZIP file (max 25 MB)."
              />

              {/* Title + Date */}
              <Grid cols={2}>
                <Field
                  label="Title"
                  value={item.title}
                  onChange={(v) => setField(`documents[${i}].title`, v)}
                />
                <Field
                  label="Date"
                  value={item.date}
                  onChange={(v) => setField(`documents[${i}].date`, v)}
                  placeholder="December 20, 2024"
                />
                <Field
                  label="File Name"
                  value={item.fileName}
                  onChange={(v) => setField(`documents[${i}].fileName`, v)}
                  mono
                  help="Shown next to the icon, e.g. annual-report-2024.pdf"
                />
                <Field
                  label="File Size"
                  value={item.fileSize}
                  onChange={(v) => setField(`documents[${i}].fileSize`, v)}
                  help='e.g. "2.4 MB" or "890 KB"'
                />
              </Grid>

              {/* Category + File Type */}
              <Grid cols={2}>
                <Select
                  label="Category"
                  value={item.category}
                  onChange={(v) => setField(`documents[${i}].category`, v)}
                  options={catOptions}
                  help="Which filter tab this document appears under."
                />
                <Select
                  label="File Type"
                  value={item.fileType}
                  onChange={(v) => setField(`documents[${i}].fileType`, v)}
                  options={FILE_TYPE_OPTIONS}
                  help="Determines the icon and color shown."
                />
              </Grid>

              {/* Description */}
              <TextArea
                label="Description"
                value={item.description}
                onChange={(v) => setField(`documents[${i}].description`, v)}
                rows={3}
                help="1-2 sentences describing what this document contains."
              />
            </ItemCard>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   CTA
   ════════════════════════════════════════════════════════════ */
function CtaForm({ data, setField }: { data: any; setField: any }) {
  const c = data.cta || {};
  return (
    <div className="space-y-6">
      <InfoBanner>Bottom banner of the Resources page.</InfoBanner>

      <Field
        label="Title"
        value={c.title}
        onChange={(v) => setField('cta.title', v)}
      />

      <TextArea
        label="Text"
        value={c.text}
        onChange={(v) => setField('cta.text', v)}
        rows={3}
      />

      <Grid cols={2}>
        <Field
          label="Button 1 Text"
          value={c.button1Text}
          onChange={(v) => setField('cta.button1Text', v)}
        />
        <Field
          label="Button 1 Link"
          value={c.button1Link}
          onChange={(v) => setField('cta.button1Link', v)}
          mono
        />
        <Field
          label="Button 2 Text"
          value={c.button2Text}
          onChange={(v) => setField('cta.button2Text', v)}
        />
        <Field
          label="Button 2 Link"
          value={c.button2Link}
          onChange={(v) => setField('cta.button2Link', v)}
          mono
        />
      </Grid>
    </div>
  );
}