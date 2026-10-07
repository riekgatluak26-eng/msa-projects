'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import FileUpload from '@/components/admin/FileUpload';
import ProgramGalleryForm from '@/components/admin/ProgramGalleryForm';
import {
  Field, TextArea, Select, SectionHeader, Grid, InfoBanner, ItemCard,
} from '@/components/admin/Field';

type SectionAccent = 'green' | 'blue' | 'amber' | 'red' | 'purple';

type Section = {
  id: string; label: string; icon: string; accent: SectionAccent; description: string;
};

const SECTIONS: Section[] = [
  { id: 'hero',             label: 'Hero',                icon: 'fas fa-image',        accent: 'blue',   description: 'Split hero — image left, content right.' },
  { id: 'overview',         label: 'Overview',            icon: 'fas fa-balance-scale', accent: 'blue',  description: 'Intro heading + 3 focus cards.' },
  { id: 'activities',       label: 'Activities',          icon: 'fas fa-list-check',   accent: 'amber',  description: 'The 3 core governance areas.' },
  { id: 'ruleOfLawFeature', label: 'Rule of Law Feature', icon: 'fas fa-gavel',        accent: 'red',    description: 'Rule of law + 2017 advocacy win.' },
  { id: 'peaceFeature',     label: 'Peace Feature',       icon: 'fas fa-dove',         accent: 'green',  description: 'Peace building feature block.' },
  { id: 'approach',         label: 'Our Approach',        icon: 'fas fa-route',        accent: 'amber',  description: '4-step approach + stats.' },
  { id: 'gallery', label: 'Gallery', icon: 'fas fa-images', accent: 'amber', description: 'Photo grid of program moments.' },
  { id: 'testimonials',     label: 'Testimonials',        icon: 'fas fa-quote-left',   accent: 'purple', description: 'Voices from the community.' },
  { id: 'support',          label: 'Support CTA',         icon: 'fas fa-bullhorn',     accent: 'red',    description: 'Bottom support banner.' },
  { id: 'otherPrograms',    label: 'Other Programs',      icon: 'fas fa-compass',      accent: 'green',  description: 'Links to other program pages.' },
];

function clone<T>(v: T): T { return JSON.parse(JSON.stringify(v)); }

function getPath(obj: any, path: string): any {
  const parts = path.split('.');
  let cur: any = obj;
  for (const part of parts) {
    const m = part.match(/^(\w+)\[(\d+)\]$/);
    if (m) { const [, key, idx] = m; cur = cur?.[key]?.[Number(idx)]; }
    else { cur = cur?.[part]; }
    if (cur === undefined) return undefined;
  }
  return cur;
}

const COLOR_OPTIONS = [
  { value: 'brand',  label: 'Green' },
  { value: 'navy',   label: 'Navy Blue' },
  { value: 'blue',   label: 'Blue' },
  { value: 'gold',   label: 'Gold' },
  { value: 'red',    label: 'Red' },
  { value: 'purple', label: 'Purple' },
  { value: 'pink',   label: 'Pink' },
  { value: 'green',  label: 'Green (alt)' },
];

export default function GovernanceEditor() {
  const [data, setData] = useState<any>(null);
  const [active, setActive] = useState<string>('hero');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);
  const [dirty, setDirty] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
  fetch('/api/governance')
    .then((r) => r.json())
    .then((d) => {
      if (!d || typeof d !== 'object') throw new Error('Bad data');
      const safe: any = { ...d };

      /* Fill in missing sections from SECTIONS */
      for (const s of SECTIONS) {
        if (!safe[s.id] || typeof safe[s.id] !== 'object') safe[s.id] = {};
      }

      /* ── Ensure gallery has an items array ── */
      if (!Array.isArray(safe.gallery?.items)) {
        if (!safe.gallery) safe.gallery = {};
        if (!Array.isArray(safe.gallery.items)) safe.gallery.items = [];
      }

      setData(safe);
    })
    .catch(() => setLoadError(true));
}, []);

  const showToast = (type: 'ok' | 'err', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 2800);
  };

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
      } else { obj[last] = value; }
      return next;
    });
    setDirty(true);
  }, []);

  const mutate = useCallback((fn: (d: any) => void) => {
    setData((prev: any) => {
      if (!prev) return prev;
      const next = clone(prev);
      fn(next);
      return next;
    });
    setDirty(true);
  }, []);

  const arrayActions = useCallback(
    (i: number, path: string) => ({
      onMoveUp: () => mutate((d) => {
        const arr = getPath(d, path);
        if (!Array.isArray(arr) || i <= 0 || !arr[i] || !arr[i - 1]) return;
        [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
      }),
      onMoveDown: () => mutate((d) => {
        const arr = getPath(d, path);
        if (!Array.isArray(arr) || i >= arr.length - 1 || !arr[i] || !arr[i + 1]) return;
        [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]];
      }),
      onRemove: () => mutate((d) => {
        const arr = getPath(d, path);
        if (!Array.isArray(arr)) return;
        arr.splice(i, 1);
      }),
      onDuplicate: () => mutate((d) => {
        const arr = getPath(d, path);
        if (!Array.isArray(arr) || !arr[i]) return;
        const copy = clone(arr[i]);
        if (copy.title) copy.title = `${copy.title} (Copy)`;
        arr.splice(i + 1, 0, copy);
      }),
    }),
    [mutate]
  );

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/governance', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        let msg = `Save failed (${res.status})`;
        try { const b = await res.json(); if (b?.error) msg = b.error; } catch {}
        throw new Error(msg);
      }
      showToast('ok', 'Governance page saved!');
      setDirty(false);
    } catch (err: any) {
      showToast('err', err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (!data && !loadError) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading...</p>
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
          <h2 className="text-lg font-bold text-gray-900 mb-2">Could not load Governance page</h2>
          <button onClick={() => location.reload()} className="px-5 py-2.5 rounded-lg bg-green-600 text-white font-bold text-sm">Reload</button>
        </div>
      </div>
    );
  }

  const activeSection = SECTIONS.find((s) => s.id === active) || SECTIONS[0];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <Link href="/admin/dashboard" className="hover:text-green-600">Dashboard</Link>
            <i className="fas fa-chevron-right text-[8px]" />
            <span>Governance</span>
          </div>
          <h1 className="text-lg font-bold text-gray-900">Edit Governance Page</h1>
        </div>
        <div className="flex items-center gap-3">
          {dirty && (
            <span className="hidden sm:flex text-xs font-semibold text-amber-600 items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Unsaved changes
            </span>
          )}
          <Link href="/governance" target="_blank" className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100">
            <i className="fas fa-eye" /> Preview
          </Link>
          <button
            onClick={save}
            disabled={saving || !dirty}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {saving ? <><i className="fas fa-spinner fa-spin" /> Saving...</> : <><i className="fas fa-save" /> Save Changes</>}
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 py-4 sticky top-[73px] self-start max-h-[calc(100vh-73px)] overflow-y-auto hidden lg:block">
          <p className="px-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">Sections</p>
          <nav className="space-y-0.5 px-2">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all text-left ${
                  active === s.id ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <i className={`${s.icon} w-4 text-center ${active === s.id ? 'text-green-600' : 'text-gray-400'}`} />
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="lg:hidden w-full p-4 bg-gray-50 border-b border-gray-200">
          <select
            value={active}
            onChange={(e) => setActive(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white font-semibold text-sm"
          >
            {SECTIONS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>

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

      {toast && (
        <div className={`fixed bottom-6 right-6 px-5 py-3.5 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-3 z-50 ${
          toast.type === 'ok' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          <i className={`fas ${toast.type === 'ok' ? 'fa-check-circle' : 'fa-exclamation-circle'}`} />
          {toast.msg}
        </div>
      )}
    </div>
  );
}

function renderSection(id: string, data: any, setField: any, mutate: any, arrayActions: any) {
  switch (id) {
    case 'hero':             return <HeroForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'overview':         return <OverviewForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'activities':       return <ActivitiesForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'ruleOfLawFeature': return <FeatureForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} keyPath="ruleOfLawFeature" />;
    case 'peaceFeature':     return <FeatureForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} keyPath="peaceFeature" />;
    case 'approach':         return <ApproachForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'gallery':      return <ProgramGalleryForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'testimonials':     return <TestimonialsForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'support':          return <SupportForm data={data} setField={setField} />;
    case 'otherPrograms':    return <OtherProgramsForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    default: return null;
  }
}

type FormProps = {
  data: any;
  setField: (p: string, v: any) => void;
  mutate: (fn: (d: any) => void) => void;
  arrayActions: (i: number, path: string) => any;
};

function HeroForm({ data, setField, mutate, arrayActions }: FormProps) {
  const h = data.hero || {};
  const sideStats: any[] = Array.isArray(h.sideStats) ? h.sideStats : [];
  const stats: any[] = Array.isArray(h.stats) ? h.stats : [];

  return (
    <div className="space-y-6">
      <InfoBanner>Split hero — image on the left, title + stats on the right.</InfoBanner>
      <FileUpload label="Left Image" value={h.image} onChange={(v) => setField('hero.image', v)} />
      <Field label="Badge on Image" value={h.badge} onChange={(v) => setField('hero.badge', v)} />
      <TextArea label="Caption under Badge" value={h.imageCaption} onChange={(v) => setField('hero.imageCaption', v)} rows={2} />

      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">Small Stats on Image</h3>
          <button
            onClick={() => mutate((d: any) => {
              if (!Array.isArray(d.hero.sideStats)) d.hero.sideStats = [];
              d.hero.sideStats.push({ value: '0', label: 'New' });
            })}
            className="text-xs font-bold text-green-600 hover:text-green-700"
          >
            <i className="fas fa-plus mr-1" /> Add
          </button>
        </div>
        <div className="space-y-2">
          {sideStats.map((s, i) => {
            const a = arrayActions(i, 'hero.sideStats');
            return (
              <div key={i} className="flex gap-2 items-end">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <Field label="Value" value={s.value} onChange={(v) => setField(`hero.sideStats[${i}].value`, v)} />
                  <Field label="Label" value={s.label} onChange={(v) => setField(`hero.sideStats[${i}].label`, v)} />
                </div>
                <button onClick={a.onRemove} className="w-9 h-9 mb-0.5 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center">
                  <i className="fas fa-times text-xs" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 space-y-3">
        <Grid cols={3}>
          <Field label="Title Line 1" value={h.titleLine1} onChange={(v) => setField('hero.titleLine1', v)} />
          <Field label="Title Line 2 (gold)" value={h.titleLine2} onChange={(v) => setField('hero.titleLine2', v)} />
          <Field label="Title Line 3" value={h.titleLine3} onChange={(v) => setField('hero.titleLine3', v)} />
        </Grid>
        <TextArea label="Subtitle" value={h.subtitle} onChange={(v) => setField('hero.subtitle', v)} rows={3} />
      </div>

      <Grid cols={2}>
        <Field label="Primary Button Text" value={h.primaryCtaText} onChange={(v) => setField('hero.primaryCtaText', v)} />
        <Field label="Primary Button Link" value={h.primaryCtaLink} onChange={(v) => setField('hero.primaryCtaLink', v)} mono />
        <Field label="Secondary Button Text" value={h.secondaryCtaText} onChange={(v) => setField('hero.secondaryCtaText', v)} />
        <Field label="Secondary Button Link" value={h.secondaryCtaLink} onChange={(v) => setField('hero.secondaryCtaLink', v)} mono />
      </Grid>

      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">Bottom Stats</h3>
          <button
            onClick={() => mutate((d: any) => {
              if (!Array.isArray(d.hero.stats)) d.hero.stats = [];
              d.hero.stats.push({ value: '0', label: 'New' });
            })}
            className="text-xs font-bold text-green-600 hover:text-green-700"
          >
            <i className="fas fa-plus mr-1" /> Add
          </button>
        </div>
        <div className="space-y-2">
          {stats.map((s, i) => {
            const a = arrayActions(i, 'hero.stats');
            return (
              <div key={i} className="rounded-lg border border-gray-200 bg-white p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase">Stat {i + 1}</span>
                  <div className="flex gap-1">
                    <button onClick={a.onMoveUp} disabled={i === 0} className="w-6 h-6 rounded hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center"><i className="fas fa-arrow-up text-[10px]" /></button>
                    <button onClick={a.onMoveDown} disabled={i === stats.length - 1} className="w-6 h-6 rounded hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center"><i className="fas fa-arrow-down text-[10px]" /></button>
                    <button onClick={a.onRemove} className="w-6 h-6 rounded hover:bg-red-100 text-red-500 flex items-center justify-center"><i className="fas fa-trash-alt text-[10px]" /></button>
                  </div>
                </div>
                <Grid cols={2}>
                  <Field label="Value" value={s.value} onChange={(v) => setField(`hero.stats[${i}].value`, v)} />
                  <Field label="Label" value={s.label} onChange={(v) => setField(`hero.stats[${i}].label`, v)} />
                </Grid>
                <Grid cols={2}>
                  <Field label="Suffix" value={s.suffix} onChange={(v) => setField(`hero.stats[${i}].suffix`, v)} mono />
                  <label className="flex items-end gap-2 pb-2 text-xs font-semibold text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!s.static}
                      onChange={(e) => setField(`hero.stats[${i}].static`, e.target.checked)}
                      className="rounded border-gray-300 text-green-600"
                    />
                    Static
                  </label>
                </Grid>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function OverviewForm({ data, setField, mutate, arrayActions }: FormProps) {
  const o = data.overview || {};
  const cards: any[] = Array.isArray(o.cards) ? o.cards : [];
  return (
    <div className="space-y-6">
      <Grid cols={3}>
        <Field label="Eyebrow" value={o.eyebrow} onChange={(v) => setField('overview.eyebrow', v)} />
        <Field label="Title" value={o.title} onChange={(v) => setField('overview.title', v)} />
        <Field label="Title Accent" value={o.titleAccent} onChange={(v) => setField('overview.titleAccent', v)} />
      </Grid>
      <Field label="Title Ending" value={o.titleEnd} onChange={(v) => setField('overview.titleEnd', v)} />
      <TextArea label="Subtitle" value={o.subtitle} onChange={(v) => setField('overview.subtitle', v)} rows={3} />

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <h3 className="font-bold text-gray-900">Cards ({cards.length})</h3>
        <button
          onClick={() => mutate((d: any) => {
            if (!Array.isArray(d.overview.cards)) d.overview.cards = [];
            d.overview.cards.push({ icon: 'fas fa-star', color: 'blue', title: 'New Card', text: 'Description...' });
          })}
          className="text-xs font-bold text-green-600 hover:text-green-700"
        >
          <i className="fas fa-plus mr-1" /> Add Card
        </button>
      </div>

      <div className="space-y-3">
        {cards.map((c, i) => {
          const a = arrayActions(i, 'overview.cards');
          return (
            <ItemCard key={i} index={i} title={c.title || 'Untitled'} canMoveUp={i > 0} canMoveDown={i < cards.length - 1} {...a}>
              <Grid cols={2}>
                <Field label="Title" value={c.title} onChange={(v) => setField(`overview.cards[${i}].title`, v)} />
                <Field label="Icon" value={c.icon} onChange={(v) => setField(`overview.cards[${i}].icon`, v)} mono />
              </Grid>
              <Select label="Color Theme" value={c.color} onChange={(v) => setField(`overview.cards[${i}].color`, v)} options={COLOR_OPTIONS} />
              <TextArea label="Text" value={c.text} onChange={(v) => setField(`overview.cards[${i}].text`, v)} rows={3} />
            </ItemCard>
          );
        })}
      </div>
    </div>
  );
}

function ActivitiesForm({ data, setField, mutate, arrayActions }: FormProps) {
  const a = data.activities || {};
  const items: any[] = Array.isArray(a.items) ? a.items : [];
  return (
    <div className="space-y-6">
      <Grid cols={3}>
        <Field label="Eyebrow" value={a.eyebrow} onChange={(v) => setField('activities.eyebrow', v)} />
        <Field label="Title" value={a.title} onChange={(v) => setField('activities.title', v)} />
        <Field label="Title Accent" value={a.titleAccent} onChange={(v) => setField('activities.titleAccent', v)} />
      </Grid>
      <TextArea label="Subtitle" value={a.subtitle} onChange={(v) => setField('activities.subtitle', v)} rows={3} />

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <h3 className="font-bold text-gray-900">Activities ({items.length})</h3>
        <button
          onClick={() => mutate((d: any) => {
            if (!Array.isArray(d.activities.items)) d.activities.items = [];
            d.activities.items.push({
              number: String(d.activities.items.length + 1).padStart(2, '0'),
              icon: 'fas fa-star', color: 'blue', title: 'New Activity',
              badge: '', text: 'Description...', features: [], wide: false,
            });
          })}
          className="text-xs font-bold text-green-600 hover:text-green-700"
        >
          <i className="fas fa-plus mr-1" /> Add Activity
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => {
          const act = arrayActions(i, 'activities.items');
          return (
            <ItemCard key={i} index={i} title={`${item.number || ''} · ${item.title || 'Untitled'}`} canMoveUp={i > 0} canMoveDown={i < items.length - 1} {...act}>
              <Grid cols={2}>
                <Field label="Number" value={item.number} onChange={(v) => setField(`activities.items[${i}].number`, v)} help='e.g. "01"' />
                <Field label="Icon" value={item.icon} onChange={(v) => setField(`activities.items[${i}].icon`, v)} mono />
              </Grid>
              <Grid cols={2}>
                <Field label="Title" value={item.title} onChange={(v) => setField(`activities.items[${i}].title`, v)} />
                <Field label="Badge" value={item.badge} onChange={(v) => setField(`activities.items[${i}].badge`, v)} />
              </Grid>
              <Select label="Color" value={item.color} onChange={(v) => setField(`activities.items[${i}].color`, v)} options={COLOR_OPTIONS} />
              <TextArea label="Text" value={item.text} onChange={(v) => setField(`activities.items[${i}].text`, v)} rows={4} />
              <TextArea
                label="Features (one per line)"
                value={Array.isArray(item.features) ? item.features.join('\n') : ''}
                onChange={(v) => setField(`activities.items[${i}].features`, v.split('\n').map((s) => s.trim()).filter(Boolean))}
                rows={4}
              />
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!item.wide}
                  onChange={(e) => setField(`activities.items[${i}].wide`, e.target.checked)}
                  className="rounded border-gray-300 text-green-600"
                />
                Wide card (spans both columns)
              </label>
            </ItemCard>
          );
        })}
      </div>

      <div className="pt-4 border-t border-gray-100 space-y-3">
        <TextArea label="Footer Text" value={a.footerText} onChange={(v) => setField('activities.footerText', v)} rows={2} />
        <Grid cols={2}>
          <Field label="CTA Text" value={a.ctaText} onChange={(v) => setField('activities.ctaText', v)} />
          <Field label="CTA Link" value={a.ctaLink} onChange={(v) => setField('activities.ctaLink', v)} mono />
        </Grid>
      </div>
    </div>
  );
}

function FeatureForm({ data, setField, mutate, arrayActions, keyPath }: FormProps & { keyPath: string }) {
  const g = data[keyPath] || {};
  const benefits: any[] = Array.isArray(g.benefits) ? g.benefits : [];

  return (
    <div className="space-y-6">
      <Grid cols={2}>
        <Field label="Eyebrow" value={g.eyebrow} onChange={(v) => setField(`${keyPath}.eyebrow`, v)} />
        <Field label="Title" value={g.title} onChange={(v) => setField(`${keyPath}.title`, v)} />
        <Field label="Title Accent (gold)" value={g.titleAccent} onChange={(v) => setField(`${keyPath}.titleAccent`, v)} />
      </Grid>
      <TextArea label="Subtitle" value={g.subtitle} onChange={(v) => setField(`${keyPath}.subtitle`, v)} rows={3} />
      <TextArea label="Second Paragraph" value={g.paragraph2} onChange={(v) => setField(`${keyPath}.paragraph2`, v)} rows={3} />

      <FileUpload label="Feature Image" value={g.image} onChange={(v) => setField(`${keyPath}.image`, v)} />
      <Grid cols={2}>
        <Field label="Image Badge" value={g.imageBadge} onChange={(v) => setField(`${keyPath}.imageBadge`, v)} />
        <Field label="Image Caption" value={g.imageCaption} onChange={(v) => setField(`${keyPath}.imageCaption`, v)} />
        <Field label="Image Subcaption" value={g.imageSubcaption} onChange={(v) => setField(`${keyPath}.imageSubcaption`, v)} />
      </Grid>

      <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <div className="rounded-xl border border-gray-200 p-4 space-y-3">
          <p className="text-sm font-bold text-gray-900">Floating Card 1</p>
          <Field label="Icon" value={g.floatCard1?.icon} onChange={(v) => setField(`${keyPath}.floatCard1.icon`, v)} mono />
          <Field label="Title" value={g.floatCard1?.title} onChange={(v) => setField(`${keyPath}.floatCard1.title`, v)} />
          <Field label="Subtitle" value={g.floatCard1?.sub} onChange={(v) => setField(`${keyPath}.floatCard1.sub`, v)} />
        </div>
        <div className="rounded-xl border border-gray-200 p-4 space-y-3">
          <p className="text-sm font-bold text-gray-900">Floating Card 2</p>
          <Field label="Icon" value={g.floatCard2?.icon} onChange={(v) => setField(`${keyPath}.floatCard2.icon`, v)} mono />
          <Field label="Title" value={g.floatCard2?.title} onChange={(v) => setField(`${keyPath}.floatCard2.title`, v)} />
          <Field label="Subtitle" value={g.floatCard2?.sub} onChange={(v) => setField(`${keyPath}.floatCard2.sub`, v)} />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">Benefits ({benefits.length})</h3>
          <button
            onClick={() => mutate((d: any) => {
              if (!Array.isArray(d[keyPath].benefits)) d[keyPath].benefits = [];
              d[keyPath].benefits.push({ icon: 'fas fa-star', color: 'blue', title: 'New', text: 'Description...' });
            })}
            className="text-xs font-bold text-green-600 hover:text-green-700"
          >
            <i className="fas fa-plus mr-1" /> Add Benefit
          </button>
        </div>
        <div className="space-y-2">
          {benefits.map((b, i) => {
            const act = arrayActions(i, `${keyPath}.benefits`);
            return (
              <div key={i} className="rounded-lg border border-gray-200 bg-white p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase">Benefit {i + 1}</span>
                  <div className="flex gap-1">
                    <button onClick={act.onMoveUp} disabled={i === 0} className="w-6 h-6 rounded hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center"><i className="fas fa-arrow-up text-[10px]" /></button>
                    <button onClick={act.onMoveDown} disabled={i === benefits.length - 1} className="w-6 h-6 rounded hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center"><i className="fas fa-arrow-down text-[10px]" /></button>
                    <button onClick={act.onRemove} className="w-6 h-6 rounded hover:bg-red-100 text-red-500 flex items-center justify-center"><i className="fas fa-trash-alt text-[10px]" /></button>
                  </div>
                </div>
                <Grid cols={2}>
                  <Field label="Icon" value={b.icon} onChange={(v) => setField(`${keyPath}.benefits[${i}].icon`, v)} mono />
                  <Select label="Color" value={b.color} onChange={(v) => setField(`${keyPath}.benefits[${i}].color`, v)} options={COLOR_OPTIONS} />
                  <Field label="Title" value={b.title} onChange={(v) => setField(`${keyPath}.benefits[${i}].title`, v)} />
                  <Field label="Text" value={b.text} onChange={(v) => setField(`${keyPath}.benefits[${i}].text`, v)} />
                </Grid>
              </div>
            );
          })}
        </div>
      </div>

      <Grid cols={2} className="pt-4 border-t border-gray-100">
        <Field label="CTA Text" value={g.ctaText} onChange={(v) => setField(`${keyPath}.ctaText`, v)} />
        <Field label="CTA Link" value={g.ctaLink} onChange={(v) => setField(`${keyPath}.ctaLink`, v)} mono />
      </Grid>
    </div>
  );
}

function ApproachForm({ data, setField, mutate, arrayActions }: FormProps) {
  const a = data.approach || {};
  const steps: any[] = Array.isArray(a.steps) ? a.steps : [];
  const stats: any[] = Array.isArray(a.stats) ? a.stats : [];

  return (
    <div className="space-y-6">
      <Grid cols={2}>
        <Field label="Eyebrow" value={a.eyebrow} onChange={(v) => setField('approach.eyebrow', v)} />
        <Field label="Title" value={a.title} onChange={(v) => setField('approach.title', v)} />
      </Grid>
      <TextArea label="Subtitle" value={a.subtitle} onChange={(v) => setField('approach.subtitle', v)} rows={2} />

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <h3 className="font-bold text-gray-900">Steps ({steps.length})</h3>
        <button
          onClick={() => mutate((d: any) => {
            if (!Array.isArray(d.approach.steps)) d.approach.steps = [];
            d.approach.steps.push({ number: String(d.approach.steps.length + 1), color: 'blue', title: 'New', text: 'Description...' });
          })}
          className="text-xs font-bold text-green-600 hover:text-green-700"
        >
          <i className="fas fa-plus mr-1" /> Add Step
        </button>
      </div>

      <div className="space-y-2">
        {steps.map((s, i) => {
          const act = arrayActions(i, 'approach.steps');
          return (
            <div key={i} className="rounded-lg border border-gray-200 bg-white p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase">Step {i + 1}</span>
                <div className="flex gap-1">
                  <button onClick={act.onMoveUp} disabled={i === 0} className="w-6 h-6 rounded hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center"><i className="fas fa-arrow-up text-[10px]" /></button>
                  <button onClick={act.onMoveDown} disabled={i === steps.length - 1} className="w-6 h-6 rounded hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center"><i className="fas fa-arrow-down text-[10px]" /></button>
                  <button onClick={act.onRemove} className="w-6 h-6 rounded hover:bg-red-100 text-red-500 flex items-center justify-center"><i className="fas fa-trash-alt text-[10px]" /></button>
                </div>
              </div>
              <Grid cols={2}>
                <Field label="Number" value={s.number} onChange={(v) => setField(`approach.steps[${i}].number`, v)} />
                <Select label="Color" value={s.color} onChange={(v) => setField(`approach.steps[${i}].color`, v)} options={COLOR_OPTIONS} />
              </Grid>
              <Field label="Title" value={s.title} onChange={(v) => setField(`approach.steps[${i}].title`, v)} />
              <TextArea label="Text" value={s.text} onChange={(v) => setField(`approach.steps[${i}].text`, v)} rows={2} />
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">Bottom Stats ({stats.length})</h3>
          <button
            onClick={() => mutate((d: any) => {
              if (!Array.isArray(d.approach.stats)) d.approach.stats = [];
              d.approach.stats.push({ icon: 'fas fa-star', color: 'blue', value: '0', label: 'New' });
            })}
            className="text-xs font-bold text-green-600 hover:text-green-700"
          >
            <i className="fas fa-plus mr-1" /> Add Stat
          </button>
        </div>
        <div className="space-y-2">
          {stats.map((s, i) => {
            const act = arrayActions(i, 'approach.stats');
            return (
              <div key={i} className="rounded-lg border border-gray-200 bg-white p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase">Stat {i + 1}</span>
                  <div className="flex gap-1">
                    <button onClick={act.onMoveUp} disabled={i === 0} className="w-6 h-6 rounded hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center"><i className="fas fa-arrow-up text-[10px]" /></button>
                    <button onClick={act.onMoveDown} disabled={i === stats.length - 1} className="w-6 h-6 rounded hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center"><i className="fas fa-arrow-down text-[10px]" /></button>
                    <button onClick={act.onRemove} className="w-6 h-6 rounded hover:bg-red-100 text-red-500 flex items-center justify-center"><i className="fas fa-trash-alt text-[10px]" /></button>
                  </div>
                </div>
                <Grid cols={3}>
                  <Field label="Icon" value={s.icon} onChange={(v) => setField(`approach.stats[${i}].icon`, v)} mono />
                  <Field label="Value" value={s.value} onChange={(v) => setField(`approach.stats[${i}].value`, v)} />
                  <Field label="Label" value={s.label} onChange={(v) => setField(`approach.stats[${i}].label`, v)} />
                </Grid>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TestimonialsForm({ data, setField, mutate, arrayActions }: FormProps) {
  const t = data.testimonials || {};
  const items: any[] = Array.isArray(t.items) ? t.items : [];
  return (
    <div className="space-y-6">
      <Grid cols={3}>
        <Field label="Eyebrow" value={t.eyebrow} onChange={(v) => setField('testimonials.eyebrow', v)} />
        <Field label="Title" value={t.title} onChange={(v) => setField('testimonials.title', v)} />
        <Field label="Title Accent" value={t.titleAccent} onChange={(v) => setField('testimonials.titleAccent', v)} />
      </Grid>
      <TextArea label="Subtitle" value={t.subtitle} onChange={(v) => setField('testimonials.subtitle', v)} rows={2} />

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <h3 className="font-bold text-gray-900">Quotes ({items.length})</h3>
        <button
          onClick={() => mutate((d: any) => {
            if (!Array.isArray(d.testimonials.items)) d.testimonials.items = [];
            d.testimonials.items.push({ quote: '"..."', author: 'Name', role: 'Role', color: 'blue' });
          })}
          className="text-xs font-bold text-green-600 hover:text-green-700"
        >
          <i className="fas fa-plus mr-1" /> Add Quote
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => {
          const act = arrayActions(i, 'testimonials.items');
          return (
            <ItemCard key={i} index={i} title={item.author || 'Untitled'} canMoveUp={i > 0} canMoveDown={i < items.length - 1} {...act}>
              <TextArea label="Quote" value={item.quote} onChange={(v) => setField(`testimonials.items[${i}].quote`, v)} rows={3} />
              <Grid cols={2}>
                <Field label="Author" value={item.author} onChange={(v) => setField(`testimonials.items[${i}].author`, v)} />
                <Field label="Role" value={item.role} onChange={(v) => setField(`testimonials.items[${i}].role`, v)} />
              </Grid>
              <Select label="Color" value={item.color} onChange={(v) => setField(`testimonials.items[${i}].color`, v)} options={COLOR_OPTIONS} />
            </ItemCard>
          );
        })}
      </div>
    </div>
  );
}

function SupportForm({ data, setField }: { data: any; setField: any }) {
  const s = data.support || {};
  return (
    <div className="space-y-6">
      <Field label="Icon" value={s.icon} onChange={(v) => setField('support.icon', v)} mono />
      <Field label="Title" value={s.title} onChange={(v) => setField('support.title', v)} />
      <TextArea label="Text" value={s.text} onChange={(v) => setField('support.text', v)} rows={3} />
      <Grid cols={2}>
        <Field label="Button 1 Text" value={s.button1Text} onChange={(v) => setField('support.button1Text', v)} />
        <Field label="Button 1 Link" value={s.button1Link} onChange={(v) => setField('support.button1Link', v)} mono />
        <Field label="Button 2 Text" value={s.button2Text} onChange={(v) => setField('support.button2Text', v)} />
        <Field label="Button 2 Link" value={s.button2Link} onChange={(v) => setField('support.button2Link', v)} mono />
      </Grid>
    </div>
  );
}

function OtherProgramsForm({ data, setField, mutate, arrayActions }: FormProps) {
  const o = data.otherPrograms || {};
  const items: any[] = Array.isArray(o.items) ? o.items : [];
  return (
    <div className="space-y-6">
      <Grid cols={3}>
        <Field label="Eyebrow" value={o.eyebrow} onChange={(v) => setField('otherPrograms.eyebrow', v)} />
        <Field label="Title" value={o.title} onChange={(v) => setField('otherPrograms.title', v)} />
        <Field label="Title Accent" value={o.titleAccent} onChange={(v) => setField('otherPrograms.titleAccent', v)} />
      </Grid>
      <TextArea label="Subtitle" value={o.subtitle} onChange={(v) => setField('otherPrograms.subtitle', v)} rows={2} />

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <h3 className="font-bold text-gray-900">Cards ({items.length})</h3>
        <button
          onClick={() => mutate((d: any) => {
            if (!Array.isArray(d.otherPrograms.items)) d.otherPrograms.items = [];
            d.otherPrograms.items.push({ icon: 'fas fa-star', color: 'green', title: 'New', subtitle: 'Subtitle', href: '/' });
          })}
          className="text-xs font-bold text-green-600 hover:text-green-700"
        >
          <i className="fas fa-plus mr-1" /> Add Card
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item, i) => {
          const act = arrayActions(i, 'otherPrograms.items');
          return (
            <div key={i} className="rounded-lg border border-gray-200 bg-white p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase">Card {i + 1}</span>
                <div className="flex gap-1">
                  <button onClick={act.onMoveUp} disabled={i === 0} className="w-6 h-6 rounded hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center"><i className="fas fa-arrow-up text-[10px]" /></button>
                  <button onClick={act.onMoveDown} disabled={i === items.length - 1} className="w-6 h-6 rounded hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center"><i className="fas fa-arrow-down text-[10px]" /></button>
                  <button onClick={act.onRemove} className="w-6 h-6 rounded hover:bg-red-100 text-red-500 flex items-center justify-center"><i className="fas fa-trash-alt text-[10px]" /></button>
                </div>
              </div>
              <Grid cols={2}>
                <Field label="Icon" value={item.icon} onChange={(v) => setField(`otherPrograms.items[${i}].icon`, v)} mono />
                <Select label="Color" value={item.color} onChange={(v) => setField(`otherPrograms.items[${i}].color`, v)} options={COLOR_OPTIONS} />
                <Field label="Title" value={item.title} onChange={(v) => setField(`otherPrograms.items[${i}].title`, v)} />
                <Field label="Subtitle" value={item.subtitle} onChange={(v) => setField(`otherPrograms.items[${i}].subtitle`, v)} />
              </Grid>
              <Field label="Link" value={item.href} onChange={(v) => setField(`otherPrograms.items[${i}].href`, v)} mono />
            </div>
          );
        })}
      </div>
    </div>
  );
}