'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import FileUpload from '@/components/admin/FileUpload';
import {
  Field, TextArea, Select, SectionHeader, Grid, InfoBanner, ItemCard,
} from '@/components/admin/Field';

type SectionAccent = 'green' | 'blue' | 'amber' | 'red' | 'purple';

type Section = {
  id: string; label: string; icon: string; accent: SectionAccent; description: string;
};

const SECTIONS: Section[] = [
  { id: 'hero',           label: 'Hero',              icon: 'fas fa-image',         accent: 'green',  description: 'Split hero with headline and key numbers.' },
  { id: 'atAGlance',      label: 'At a Glance',       icon: 'fas fa-calendar-check', accent: 'green', description: 'Top 4 impact cards.' },
  { id: 'programs',       label: 'Programs 2024',     icon: 'fas fa-trophy',        accent: 'amber',  description: '5 program impact blocks.' },
  { id: 'disasterRisk',   label: 'Disaster Risk 2023', icon: 'fas fa-shield-halved', accent: 'red',   description: '2023 Disaster Risk Management report.' },
  { id: 'impactNumbers',  label: 'Impact Numbers',    icon: 'fas fa-chart-bar',     accent: 'blue',   description: 'Combined stats grid.' },
  { id: 'successStories', label: 'Success Stories',   icon: 'fas fa-star',          accent: 'purple', description: '3 story cards.' },
  { id: 'partners',       label: 'Partners',          icon: 'fas fa-handshake',     accent: 'blue',   description: 'Partner logos grid.' },
  { id: 'support',        label: 'Support CTA',       icon: 'fas fa-bullhorn',      accent: 'red',    description: 'Bottom support banner.' },
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
  { value: 'gold',   label: 'Gold' },
  { value: 'red',    label: 'Red' },
  { value: 'purple', label: 'Purple' },
  { value: 'pink',   label: 'Pink' },
  { value: 'green',  label: 'Green (alt)' },
];

export default function ImpactEditor() {
  const [data, setData] = useState<any>(null);
  const [active, setActive] = useState<string>('hero');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);
  const [dirty, setDirty] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    fetch('/api/impact')
      .then((r) => r.json())
      .then((d) => {
        if (!d || typeof d !== 'object') throw new Error('Bad data');
        const safe: any = { ...d };
        for (const s of SECTIONS) {
          if (!safe[s.id] || typeof safe[s.id] !== 'object') safe[s.id] = {};
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
      const res = await fetch('/api/impact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        let msg = `Save failed (${res.status})`;
        try { const b = await res.json(); if (b?.error) msg = b.error; } catch {}
        throw new Error(msg);
      }
      showToast('ok', 'Impact page saved!');
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
          <h2 className="text-lg font-bold text-gray-900 mb-2">Could not load Impact page</h2>
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
            <span>Impact</span>
          </div>
          <h1 className="text-lg font-bold text-gray-900">Edit Impact Page</h1>
        </div>
        <div className="flex items-center gap-3">
          {dirty && (
            <span className="hidden sm:flex text-xs font-semibold text-amber-600 items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Unsaved changes
            </span>
          )}
          <Link href="/impact" target="_blank" className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100">
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
    case 'hero':           return <HeroForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'atAGlance':      return <AtAGlanceForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'programs':       return <ProgramsForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'disasterRisk':   return <DisasterRiskForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'impactNumbers':  return <NumbersForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'successStories': return <StoriesForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'partners':       return <PartnersForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'support':        return <SupportForm data={data} setField={setField} />;
    default: return null;
  }
}

type FormProps = {
  data: any;
  setField: (p: string, v: any) => void;
  mutate: (fn: (d: any) => void) => void;
  arrayActions: (i: number, path: string) => any;
};

/* HERO */
function HeroForm({ data, setField, mutate, arrayActions }: FormProps) {
  const h = data.hero || {};
  const sideStats: any[] = Array.isArray(h.sideStats) ? h.sideStats : [];
  const stats: any[] = Array.isArray(h.stats) ? h.stats : [];

  return (
    <div className="space-y-6">
      <InfoBanner>Split hero — image left, content right.</InfoBanner>
      <FileUpload label="Left Image" value={h.image} onChange={(v) => setField('hero.image', v)} />
      <Field label="Badge on Image" value={h.badge} onChange={(v) => setField('hero.badge', v)} />
      <TextArea label="Caption" value={h.imageCaption} onChange={(v) => setField('hero.imageCaption', v)} rows={2} />

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

/* AT A GLANCE */
function AtAGlanceForm({ data, setField, mutate, arrayActions }: FormProps) {
  const a = data.atAGlance || {};
  const cards: any[] = Array.isArray(a.cards) ? a.cards : [];
  return (
    <div className="space-y-6">
      <Grid cols={3}>
        <Field label="Eyebrow" value={a.eyebrow} onChange={(v) => setField('atAGlance.eyebrow', v)} />
        <Field label="Title" value={a.title} onChange={(v) => setField('atAGlance.title', v)} />
        <Field label="Title Accent" value={a.titleAccent} onChange={(v) => setField('atAGlance.titleAccent', v)} />
      </Grid>
      <TextArea label="Subtitle" value={a.subtitle} onChange={(v) => setField('atAGlance.subtitle', v)} rows={3} />

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <h3 className="font-bold text-gray-900">Big Cards ({cards.length})</h3>
        <button
          onClick={() => mutate((d: any) => {
            if (!Array.isArray(d.atAGlance.cards)) d.atAGlance.cards = [];
            d.atAGlance.cards.push({ icon: 'fas fa-chart-line', color: 'brand', value: '0', label: 'New Metric', text: 'Description...' });
          })}
          className="text-xs font-bold text-green-600 hover:text-green-700"
        >
          <i className="fas fa-plus mr-1" /> Add Card
        </button>
      </div>

      <div className="space-y-3">
        {cards.map((c, i) => {
          const act = arrayActions(i, 'atAGlance.cards');
          return (
            <ItemCard key={i} index={i} title={c.label || 'Untitled'} canMoveUp={i > 0} canMoveDown={i < cards.length - 1} {...act}>
              <Grid cols={2}>
                <Field label="Value" value={c.value} onChange={(v) => setField(`atAGlance.cards[${i}].value`, v)} />
                <Field label="Label" value={c.label} onChange={(v) => setField(`atAGlance.cards[${i}].label`, v)} />
                <Field label="Icon" value={c.icon} onChange={(v) => setField(`atAGlance.cards[${i}].icon`, v)} mono />
                <Select label="Color" value={c.color} onChange={(v) => setField(`atAGlance.cards[${i}].color`, v)} options={COLOR_OPTIONS} />
              </Grid>
              <TextArea label="Text" value={c.text} onChange={(v) => setField(`atAGlance.cards[${i}].text`, v)} rows={2} />
            </ItemCard>
          );
        })}
      </div>
    </div>
  );
}

/* PROGRAMS */
function ProgramsForm({ data, setField, mutate, arrayActions }: FormProps) {
  const p = data.programs || {};
  const items: any[] = Array.isArray(p.items) ? p.items : [];
  return (
    <div className="space-y-6">
      <Grid cols={3}>
        <Field label="Eyebrow" value={p.eyebrow} onChange={(v) => setField('programs.eyebrow', v)} />
        <Field label="Title" value={p.title} onChange={(v) => setField('programs.title', v)} />
        <Field label="Title Accent" value={p.titleAccent} onChange={(v) => setField('programs.titleAccent', v)} />
      </Grid>
      <TextArea label="Subtitle" value={p.subtitle} onChange={(v) => setField('programs.subtitle', v)} rows={3} />

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <h3 className="font-bold text-gray-900">Programs ({items.length})</h3>
        <button
          onClick={() => mutate((d: any) => {
            if (!Array.isArray(d.programs.items)) d.programs.items = [];
            d.programs.items.push({
              number: String(d.programs.items.length + 1).padStart(2, '0'),
              icon: 'fas fa-star', color: 'brand', image: '', title: 'New Program',
              supporter: '', description: 'Description...', achievements: [],
            });
          })}
          className="text-xs font-bold text-green-600 hover:text-green-700"
        >
          <i className="fas fa-plus mr-1" /> Add Program
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => {
          const act = arrayActions(i, 'programs.items');
          const achievements: any[] = Array.isArray(item.achievements) ? item.achievements : [];
          return (
            <ItemCard key={i} index={i} title={`${item.number || ''} · ${item.title || 'Untitled'}`} canMoveUp={i > 0} canMoveDown={i < items.length - 1} {...act}>
              <FileUpload label="Image" value={item.image} onChange={(v) => setField(`programs.items[${i}].image`, v)} />
              <Grid cols={2}>
                <Field label="Number" value={item.number} onChange={(v) => setField(`programs.items[${i}].number`, v)} help='e.g. "01"' />
                <Field label="Icon" value={item.icon} onChange={(v) => setField(`programs.items[${i}].icon`, v)} mono />
              </Grid>
              <Field label="Title" value={item.title} onChange={(v) => setField(`programs.items[${i}].title`, v)} />
              <Select label="Color" value={item.color} onChange={(v) => setField(`programs.items[${i}].color`, v)} options={COLOR_OPTIONS} />
              <Field label="Supporter line" value={item.supporter} onChange={(v) => setField(`programs.items[${i}].supporter`, v)} help="e.g. Supported by CWS New Zealand" />
              <TextArea label="Description" value={item.description} onChange={(v) => setField(`programs.items[${i}].description`, v)} rows={3} />

              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-gray-600 uppercase">Achievements ({achievements.length})</p>
                  <button
                    onClick={() => mutate((d: any) => {
                      if (!Array.isArray(d.programs.items[i].achievements)) d.programs.items[i].achievements = [];
                      d.programs.items[i].achievements.push({ icon: 'fas fa-star', value: '0', label: 'New Metric' });
                    })}
                    className="text-xs font-bold text-green-600 hover:text-green-700"
                  >
                    <i className="fas fa-plus mr-1" /> Add
                  </button>
                </div>
                <div className="space-y-2">
                  {achievements.map((a, ai) => (
                    <div key={ai} className="flex gap-2 items-end">
                      <div className="flex-1 grid grid-cols-4 gap-2">
                        <Field label="Icon" value={a.icon} onChange={(v) => setField(`programs.items[${i}].achievements[${ai}].icon`, v)} mono />
                        <Field label="Value" value={a.value} onChange={(v) => setField(`programs.items[${i}].achievements[${ai}].value`, v)} />
                        <Field label="Label" value={a.label} onChange={(v) => setField(`programs.items[${i}].achievements[${ai}].label`, v)} />
                        <Field label="Suffix" value={a.suffix} onChange={(v) => setField(`programs.items[${i}].achievements[${ai}].suffix`, v)} mono />
                      </div>
                      <button
                        onClick={() => mutate((d: any) => d.programs.items[i].achievements.splice(ai, 1))}
                        className="w-9 h-9 mb-0.5 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center"
                      >
                        <i className="fas fa-times text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 cursor-pointer mt-2">
                  <input
                    type="checkbox"
                    checked={!!achievements[0]?.static}
                    onChange={(e) => setField(`programs.items[${i}].achievements[0].static`, e.target.checked)}
                    className="rounded border-gray-300 text-green-600"
                  />
                  First achievement is static (e.g. "83.4%")
                </label>
              </div>
            </ItemCard>
          );
        })}
      </div>
    </div>
  );
}

/* DISASTER RISK */
function DisasterRiskForm({ data, setField, mutate, arrayActions }: FormProps) {
  const d = data.disasterRisk || {};
  const stats: any[] = Array.isArray(d.stats) ? d.stats : [];
  const attendance: any[] = Array.isArray(d.attendance) ? d.attendance : [];
  const bomas: any[] = Array.isArray(d.bomas) ? d.bomas : [];
  const achievements: any[] = Array.isArray(d.achievements) ? d.achievements : [];
  const challenges: any[] = Array.isArray(d.challenges) ? d.challenges : [];
  const stakeholders: any[] = Array.isArray(d.stakeholders) ? d.stakeholders : [];

  return (
    <div className="space-y-6">
      <Grid cols={2}>
        <Field label="Eyebrow" value={d.eyebrow} onChange={(v) => setField('disasterRisk.eyebrow', v)} />
        <Field label="Title" value={d.title} onChange={(v) => setField('disasterRisk.title', v)} />
        <Field label="Title Accent" value={d.titleAccent} onChange={(v) => setField('disasterRisk.titleAccent', v)} />
        <Field label="Partnership line" value={d.partnership} onChange={(v) => setField('disasterRisk.partnership', v)} />
      </Grid>
      <TextArea label="Subtitle" value={d.subtitle} onChange={(v) => setField('disasterRisk.subtitle', v)} rows={4} />

      {/* Top stats */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">Top Stats ({stats.length})</h3>
          <button
            onClick={() => mutate((x: any) => {
              if (!Array.isArray(x.disasterRisk.stats)) x.disasterRisk.stats = [];
              x.disasterRisk.stats.push({ icon: 'fas fa-chart-line', color: 'brand', value: '0', label: 'New' });
            })}
            className="text-xs font-bold text-green-600 hover:text-green-700"
          >
            <i className="fas fa-plus mr-1" /> Add
          </button>
        </div>
        <div className="space-y-2">
          {stats.map((s, i) => (
            <div key={i} className="flex gap-2 items-end">
              <div className="flex-1 grid grid-cols-4 gap-2">
                <Field label="Icon" value={s.icon} onChange={(v) => setField(`disasterRisk.stats[${i}].icon`, v)} mono />
                <Field label="Value" value={s.value} onChange={(v) => setField(`disasterRisk.stats[${i}].value`, v)} />
                <Field label="Label" value={s.label} onChange={(v) => setField(`disasterRisk.stats[${i}].label`, v)} />
                <Select label="Color" value={s.color} onChange={(v) => setField(`disasterRisk.stats[${i}].color`, v)} options={COLOR_OPTIONS} />
              </div>
              <button
                onClick={() => mutate((x: any) => x.disasterRisk.stats.splice(i, 1))}
                className="w-9 h-9 mb-0.5 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center"
              >
                <i className="fas fa-times text-xs" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* EWC */}
      <div className="pt-4 border-t border-gray-100 space-y-3">
        <Field label="EWC Section Title" value={d.ewcTitle} onChange={(v) => setField('disasterRisk.ewcTitle', v)} />
        <TextArea label="EWC Section Text" value={d.ewcText} onChange={(v) => setField('disasterRisk.ewcText', v)} rows={3} />
      </div>

      {/* Attendance chips */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">Attendance Chips ({attendance.length})</h3>
          <button
            onClick={() => mutate((x: any) => {
              if (!Array.isArray(x.disasterRisk.attendance)) x.disasterRisk.attendance = [];
              x.disasterRisk.attendance.push({ label: 'New', value: '0' });
            })}
            className="text-xs font-bold text-green-600 hover:text-green-700"
          >
            <i className="fas fa-plus mr-1" /> Add
          </button>
        </div>
        <div className="space-y-2">
          {attendance.map((a, i) => (
            <div key={i} className="flex gap-2 items-end">
              <div className="flex-1 grid grid-cols-2 gap-3">
                <Field label="Label" value={a.label} onChange={(v) => setField(`disasterRisk.attendance[${i}].label`, v)} />
                <Field label="Value" value={a.value} onChange={(v) => setField(`disasterRisk.attendance[${i}].value`, v)} />
              </div>
              <button
                onClick={() => mutate((x: any) => x.disasterRisk.attendance.splice(i, 1))}
                className="w-9 h-9 mb-0.5 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center"
              >
                <i className="fas fa-times text-xs" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Awareness */}
      <div className="pt-4 border-t border-gray-100 space-y-3">
        <Field label="Awareness Title" value={d.awarenessTitle} onChange={(v) => setField('disasterRisk.awarenessTitle', v)} />
        <TextArea label="Awareness Text" value={d.awarenessText} onChange={(v) => setField('disasterRisk.awarenessText', v)} rows={3} />
      </div>

      {/* Bomas */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">Boma Breakdown ({bomas.length})</h3>
          <button
            onClick={() => mutate((x: any) => {
              if (!Array.isArray(x.disasterRisk.bomas)) x.disasterRisk.bomas = [];
              x.disasterRisk.bomas.push({ name: 'New Boma', pwd: '0', idp: '0', male: '0', female: '0', total: '0' });
            })}
            className="text-xs font-bold text-green-600 hover:text-green-700"
          >
            <i className="fas fa-plus mr-1" /> Add
          </button>
        </div>
        <div className="space-y-2">
          {bomas.map((b, i) => (
            <div key={i} className="flex gap-2 items-end">
              <div className="flex-1 grid grid-cols-6 gap-2">
                <Field label="Name" value={b.name} onChange={(v) => setField(`disasterRisk.bomas[${i}].name`, v)} />
                <Field label="PWDs" value={b.pwd} onChange={(v) => setField(`disasterRisk.bomas[${i}].pwd`, v)} />
                <Field label="IDPs" value={b.idp} onChange={(v) => setField(`disasterRisk.bomas[${i}].idp`, v)} />
                <Field label="Male" value={b.male} onChange={(v) => setField(`disasterRisk.bomas[${i}].male`, v)} />
                <Field label="Female" value={b.female} onChange={(v) => setField(`disasterRisk.bomas[${i}].female`, v)} />
                <Field label="Total" value={b.total} onChange={(v) => setField(`disasterRisk.bomas[${i}].total`, v)} />
              </div>
              <button
                onClick={() => mutate((x: any) => x.disasterRisk.bomas.splice(i, 1))}
                className="w-9 h-9 mb-0.5 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center"
              >
                <i className="fas fa-times text-xs" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">Key Achievements ({achievements.length})</h3>
          <button
            onClick={() => mutate((x: any) => {
              if (!Array.isArray(x.disasterRisk.achievements)) x.disasterRisk.achievements = [];
              x.disasterRisk.achievements.push({ icon: 'fas fa-star', color: 'brand', title: 'New', text: 'Description...' });
            })}
            className="text-xs font-bold text-green-600 hover:text-green-700"
          >
            <i className="fas fa-plus mr-1" /> Add
          </button>
        </div>
        <div className="space-y-2">
          {achievements.map((a, i) => (
            <div key={i} className="rounded-lg border border-gray-200 bg-white p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase">Achievement {i + 1}</span>
                <button
                  onClick={() => mutate((x: any) => x.disasterRisk.achievements.splice(i, 1))}
                  className="text-red-500 text-xs font-semibold"
                >
                  <i className="fas fa-trash-alt" />
                </button>
              </div>
              <Grid cols={2}>
                <Field label="Icon" value={a.icon} onChange={(v) => setField(`disasterRisk.achievements[${i}].icon`, v)} mono />
                <Select label="Color" value={a.color} onChange={(v) => setField(`disasterRisk.achievements[${i}].color`, v)} options={COLOR_OPTIONS} />
              </Grid>
              <Field label="Title" value={a.title} onChange={(v) => setField(`disasterRisk.achievements[${i}].title`, v)} />
              <TextArea label="Text" value={a.text} onChange={(v) => setField(`disasterRisk.achievements[${i}].text`, v)} rows={2} />
            </div>
          ))}
        </div>
      </div>

      {/* Challenges */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">Challenges ({challenges.length})</h3>
          <button
            onClick={() => mutate((x: any) => {
              if (!Array.isArray(x.disasterRisk.challenges)) x.disasterRisk.challenges = [];
              x.disasterRisk.challenges.push({ icon: 'fas fa-star', title: 'New', text: 'Description...' });
            })}
            className="text-xs font-bold text-green-600 hover:text-green-700"
          >
            <i className="fas fa-plus mr-1" /> Add
          </button>
        </div>
        <div className="space-y-2">
          {challenges.map((c, i) => (
            <div key={i} className="rounded-lg border border-gray-200 bg-white p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase">Item {i + 1}</span>
                <button
                  onClick={() => mutate((x: any) => x.disasterRisk.challenges.splice(i, 1))}
                  className="text-red-500 text-xs font-semibold"
                >
                  <i className="fas fa-trash-alt" />
                </button>
              </div>
              <Field label="Icon" value={c.icon} onChange={(v) => setField(`disasterRisk.challenges[${i}].icon`, v)} mono />
              <Field label="Title" value={c.title} onChange={(v) => setField(`disasterRisk.challenges[${i}].title`, v)} />
              <TextArea label="Text" value={c.text} onChange={(v) => setField(`disasterRisk.challenges[${i}].text`, v)} rows={2} />
            </div>
          ))}
        </div>
      </div>

      {/* Success story */}
      <div className="pt-4 border-t border-gray-100 space-y-3">
        <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <i className="fas fa-fire text-red-500" /> Success Story
        </p>
        <Field label="Title" value={d.successStory?.title} onChange={(v) => setField('disasterRisk.successStory.title', v)} />
        <TextArea label="Text" value={d.successStory?.text} onChange={(v) => setField('disasterRisk.successStory.text', v)} rows={4} />
      </div>

      {/* Stakeholders */}
      <div className="pt-4 border-t border-gray-100">
        <Field label="Stakeholders Title" value={d.stakeholdersTitle} onChange={(v) => setField('disasterRisk.stakeholdersTitle', v)} />
        <div className="flex items-center justify-between my-3">
          <h3 className="font-bold text-gray-900">Stakeholders ({stakeholders.length})</h3>
          <button
            onClick={() => mutate((x: any) => {
              if (!Array.isArray(x.disasterRisk.stakeholders)) x.disasterRisk.stakeholders = [];
              x.disasterRisk.stakeholders.push({ icon: 'fas fa-handshake', label: 'New Stakeholder' });
            })}
            className="text-xs font-bold text-green-600 hover:text-green-700"
          >
            <i className="fas fa-plus mr-1" /> Add
          </button>
        </div>
        <div className="space-y-2">
          {stakeholders.map((s, i) => (
            <div key={i} className="flex gap-2 items-end">
              <div className="flex-1 grid grid-cols-2 gap-3">
                <Field label="Icon" value={s.icon} onChange={(v) => setField(`disasterRisk.stakeholders[${i}].icon`, v)} mono />
                <Field label="Label" value={s.label} onChange={(v) => setField(`disasterRisk.stakeholders[${i}].label`, v)} />
              </div>
              <button
                onClick={() => mutate((x: any) => x.disasterRisk.stakeholders.splice(i, 1))}
                className="w-9 h-9 mb-0.5 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center"
              >
                <i className="fas fa-times text-xs" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* IMPACT NUMBERS */
function NumbersForm({ data, setField, mutate, arrayActions }: FormProps) {
  const n = data.impactNumbers || {};
  const items: any[] = Array.isArray(n.items) ? n.items : [];
  return (
    <div className="space-y-6">
      <Grid cols={3}>
        <Field label="Eyebrow" value={n.eyebrow} onChange={(v) => setField('impactNumbers.eyebrow', v)} />
        <Field label="Title" value={n.title} onChange={(v) => setField('impactNumbers.title', v)} />
        <Field label="Title Accent" value={n.titleAccent} onChange={(v) => setField('impactNumbers.titleAccent', v)} />
      </Grid>
      <TextArea label="Subtitle" value={n.subtitle} onChange={(v) => setField('impactNumbers.subtitle', v)} rows={2} />

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <h3 className="font-bold text-gray-900">Stats ({items.length})</h3>
        <button
          onClick={() => mutate((x: any) => {
            if (!Array.isArray(x.impactNumbers.items)) x.impactNumbers.items = [];
            x.impactNumbers.items.push({ icon: 'fas fa-chart-line', color: 'brand', value: '0', label: 'New' });
          })}
          className="text-xs font-bold text-green-600 hover:text-green-700"
        >
          <i className="fas fa-plus mr-1" /> Add Stat
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item, i) => {
          const act = arrayActions(i, 'impactNumbers.items');
          return (
            <div key={i} className="rounded-lg border border-gray-200 bg-white p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase">Stat {i + 1}</span>
                <div className="flex gap-1">
                  <button onClick={act.onMoveUp} disabled={i === 0} className="w-6 h-6 rounded hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center"><i className="fas fa-arrow-up text-[10px]" /></button>
                  <button onClick={act.onMoveDown} disabled={i === items.length - 1} className="w-6 h-6 rounded hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center"><i className="fas fa-arrow-down text-[10px]" /></button>
                  <button onClick={act.onRemove} className="w-6 h-6 rounded hover:bg-red-100 text-red-500 flex items-center justify-center"><i className="fas fa-trash-alt text-[10px]" /></button>
                </div>
              </div>
              <Grid cols={2}>
                <Field label="Icon" value={item.icon} onChange={(v) => setField(`impactNumbers.items[${i}].icon`, v)} mono />
                <Select label="Color" value={item.color} onChange={(v) => setField(`impactNumbers.items[${i}].color`, v)} options={COLOR_OPTIONS} />
                <Field label="Value" value={item.value} onChange={(v) => setField(`impactNumbers.items[${i}].value`, v)} />
                <Field label="Label" value={item.label} onChange={(v) => setField(`impactNumbers.items[${i}].label`, v)} />
                <Field label="Suffix" value={item.suffix} onChange={(v) => setField(`impactNumbers.items[${i}].suffix`, v)} mono />
              </Grid>
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!item.static}
                  onChange={(e) => setField(`impactNumbers.items[${i}].static`, e.target.checked)}
                  className="rounded border-gray-300 text-green-600"
                />
                Static
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* SUCCESS STORIES */
function StoriesForm({ data, setField, mutate, arrayActions }: FormProps) {
  const s = data.successStories || {};
  const items: any[] = Array.isArray(s.items) ? s.items : [];
  return (
    <div className="space-y-6">
      <Grid cols={3}>
        <Field label="Eyebrow" value={s.eyebrow} onChange={(v) => setField('successStories.eyebrow', v)} />
        <Field label="Title" value={s.title} onChange={(v) => setField('successStories.title', v)} />
        <Field label="Title Accent" value={s.titleAccent} onChange={(v) => setField('successStories.titleAccent', v)} />
      </Grid>
      <TextArea label="Subtitle" value={s.subtitle} onChange={(v) => setField('successStories.subtitle', v)} rows={2} />

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <h3 className="font-bold text-gray-900">Stories ({items.length})</h3>
        <button
          onClick={() => mutate((x: any) => {
            if (!Array.isArray(x.successStories.items)) x.successStories.items = [];
            x.successStories.items.push({ image: '', badge: 'New', badgeColor: 'brand', title: 'New Story', text: 'Description...', tag: '' });
          })}
          className="text-xs font-bold text-green-600 hover:text-green-700"
        >
          <i className="fas fa-plus mr-1" /> Add Story
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => {
          const act = arrayActions(i, 'successStories.items');
          return (
            <ItemCard key={i} index={i} title={item.title || 'Untitled'} canMoveUp={i > 0} canMoveDown={i < items.length - 1} {...act}>
              <FileUpload label="Image" value={item.image} onChange={(v) => setField(`successStories.items[${i}].image`, v)} />
              <Grid cols={2}>
                <Field label="Badge" value={item.badge} onChange={(v) => setField(`successStories.items[${i}].badge`, v)} />
                <Select
                  label="Badge Color"
                  value={item.badgeColor}
                  onChange={(v) => setField(`successStories.items[${i}].badgeColor`, v)}
                  options={[
                    { value: 'brand', label: 'Green' },
                    { value: 'gold', label: 'Gold' },
                    { value: 'red', label: 'Red' },
                    { value: 'navy', label: 'Navy' },
                  ]}
                />
                <Field label="Title" value={item.title} onChange={(v) => setField(`successStories.items[${i}].title`, v)} />
                <Field label="Tag" value={item.tag} onChange={(v) => setField(`successStories.items[${i}].tag`, v)} />
              </Grid>
              <TextArea label="Text" value={item.text} onChange={(v) => setField(`successStories.items[${i}].text`, v)} rows={3} />
            </ItemCard>
          );
        })}
      </div>
    </div>
  );
}

/* PARTNERS */
function PartnersForm({ data, setField, mutate, arrayActions }: FormProps) {
  const p = data.partners || {};
  const items: any[] = Array.isArray(p.items) ? p.items : [];
  return (
    <div className="space-y-6">
      <Grid cols={3}>
        <Field label="Eyebrow" value={p.eyebrow} onChange={(v) => setField('partners.eyebrow', v)} />
        <Field label="Title" value={p.title} onChange={(v) => setField('partners.title', v)} />
        <Field label="Title Accent" value={p.titleAccent} onChange={(v) => setField('partners.titleAccent', v)} />
      </Grid>
      <TextArea label="Subtitle" value={p.subtitle} onChange={(v) => setField('partners.subtitle', v)} rows={2} />

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <h3 className="font-bold text-gray-900">Partners ({items.length})</h3>
        <button
          onClick={() => mutate((x: any) => {
            if (!Array.isArray(x.partners.items)) x.partners.items = [];
            x.partners.items.push({ icon: 'fas fa-handshake', label: 'New Partner', subtitle: 'Subtitle', color: 'brand' });
          })}
          className="text-xs font-bold text-green-600 hover:text-green-700"
        >
          <i className="fas fa-plus mr-1" /> Add Partner
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item, i) => {
          const act = arrayActions(i, 'partners.items');
          return (
            <div key={i} className="rounded-lg border border-gray-200 bg-white p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase">Partner {i + 1}</span>
                <div className="flex gap-1">
                  <button onClick={act.onMoveUp} disabled={i === 0} className="w-6 h-6 rounded hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center"><i className="fas fa-arrow-up text-[10px]" /></button>
                  <button onClick={act.onMoveDown} disabled={i === items.length - 1} className="w-6 h-6 rounded hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center"><i className="fas fa-arrow-down text-[10px]" /></button>
                  <button onClick={act.onRemove} className="w-6 h-6 rounded hover:bg-red-100 text-red-500 flex items-center justify-center"><i className="fas fa-trash-alt text-[10px]" /></button>
                </div>
              </div>
              <Grid cols={2}>
                <Field label="Icon" value={item.icon} onChange={(v) => setField(`partners.items[${i}].icon`, v)} mono />
                <Select label="Color" value={item.color} onChange={(v) => setField(`partners.items[${i}].color`, v)} options={COLOR_OPTIONS} />
                <Field label="Label" value={item.label} onChange={(v) => setField(`partners.items[${i}].label`, v)} />
                <Field label="Subtitle" value={item.subtitle} onChange={(v) => setField(`partners.items[${i}].subtitle`, v)} />
              </Grid>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* SUPPORT */
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