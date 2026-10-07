'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import FileUpload from '@/components/admin/FileUpload';
import {
  Field,
  TextArea,
  SectionHeader,
  Grid,
  InfoBanner,
  ItemCard,
} from '@/components/admin/Field';

/* ─── Types ──────────────────────────────────────────────── */
type SectionAccent = 'green' | 'blue' | 'amber' | 'red' | 'purple';

type Section = {
  id: string;
  label: string;
  icon: string;
  accent: SectionAccent;
  description: string;
};

const SECTIONS: Section[] = [
  { id: 'hero',     label: 'Hero',           icon: 'fas fa-image',        accent: 'green',  description: 'Top banner with title and stats.' },
  { id: 'who',      label: 'Who We Are',     icon: 'fas fa-info-circle',  accent: 'blue',   description: 'Full history, image and intro.' },
  { id: 'journey',  label: 'Our Journey',    icon: 'fas fa-timeline',     accent: 'purple', description: 'Timeline of milestones since 2000.' },
  { id: 'mission',  label: 'Mission & Vision', icon: 'fas fa-compass',    accent: 'amber',  description: 'Mission, vision and guiding quote.' },
  { id: 'values',   label: 'Core Values',    icon: 'fas fa-heart',        accent: 'amber',  description: 'Values grid.' },
  { id: 'capacity', label: 'Our Capacity',   icon: 'fas fa-shield-halved', accent: 'blue',  description: 'Organisational strengths.' },
  { id: 'cta',      label: 'Call to Action', icon: 'fas fa-bullhorn',     accent: 'red',    description: 'Bottom banner with buttons.' },
];

/* ─── Helpers ─────────────────────────────────────────────── */
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

/* ════════════════════════════════════════════════════════════
   MAIN
   ════════════════════════════════════════════════════════════ */
export default function AboutEditor() {
  const [data, setData] = useState<any>(null);
  const [active, setActive] = useState<string>('hero');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);
  const [dirty, setDirty] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    fetch('/api/about')
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
      } else {
        obj[last] = value;
      }
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
          arr.splice(i + 1, 0, copy);
        }),
    }),
    [mutate]
  );

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        let msg = `Save failed (${res.status})`;
        try {
          const body = await res.json();
          if (body?.error) msg = body.error;
        } catch {}
        throw new Error(msg);
      }
      showToast('ok', 'About page saved successfully!');
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
          <p className="text-sm text-gray-500">Loading about page data...</p>
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
          <h2 className="text-lg font-bold text-gray-900 mb-2">Could not load About page</h2>
          <p className="text-sm text-gray-500 mb-6">Check your connection and try again.</p>
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
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <Link href="/admin/dashboard" className="hover:text-green-600">Dashboard</Link>
            <i className="fas fa-chevron-right text-[8px]" />
            <span>About</span>
          </div>
          <h1 className="text-lg font-bold text-gray-900">Edit About Page</h1>
        </div>

        <div className="flex items-center gap-3">
          {dirty && (
            <span className="hidden sm:flex text-xs font-semibold text-amber-600 items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Unsaved changes
            </span>
          )}
          <Link
            href="/about"
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
            {saving ? <><i className="fas fa-spinner fa-spin" /> Saving...</> : <><i className="fas fa-save" /> Save Changes</>}
          </button>
        </div>
      </div>

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
                <i className={`${s.icon} w-4 text-center ${active === s.id ? 'text-green-600' : 'text-gray-400'}`} />
                {s.label}
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
            {SECTIONS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>

        {/* Form */}
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

/* ─── Router ─────────────────────────────────────────────── */
function renderSection(
  id: string,
  data: any,
  setField: any,
  mutate: any,
  arrayActions: any
) {
  switch (id) {
    case 'hero':     return <HeroForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'who':      return <WhoForm data={data} setField={setField} />;
    case 'journey':  return <JourneyForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'mission':  return <MissionForm data={data} setField={setField} />;
    case 'values':   return <ValuesForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'capacity': return <CapacityForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'cta':      return <CtaForm data={data} setField={setField} />;
    default:         return null;
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
function HeroForm({ data, setField, mutate, arrayActions }: FormProps) {
  const h = data.hero || {};
  const stats: any[] = Array.isArray(h.stats) ? h.stats : [];

  return (
    <div className="space-y-6">
      <InfoBanner>Big hero banner at the very top of the About page.</InfoBanner>

      <Field label="Badge" value={h.badge} onChange={(v) => setField('hero.badge', v)} />
      <Grid cols={3}>
        <Field label="Title Line 1" value={h.titleLine1} onChange={(v) => setField('hero.titleLine1', v)} />
        <Field label="Title Line 2 (gold)" value={h.titleLine2} onChange={(v) => setField('hero.titleLine2', v)} help="Gets the gold gradient." />
        <Field label="Title Line 3" value={h.titleLine3} onChange={(v) => setField('hero.titleLine3', v)} />
      </Grid>
      <TextArea label="Subtitle" value={h.subtitle} onChange={(v) => setField('hero.subtitle', v)} rows={3} />

      <FileUpload label="Background Image" value={h.backgroundImage} onChange={(v) => setField('hero.backgroundImage', v)} />

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <h3 className="font-bold text-gray-900">Stats ({stats.length})</h3>
        <button
          onClick={() =>
            mutate((d) => {
              if (!Array.isArray(d.hero.stats)) d.hero.stats = [];
              d.hero.stats.push({ value: '0', label: 'New Stat' });
            })
          }
          className="text-xs font-bold text-green-600 hover:text-green-700"
        >
          <i className="fas fa-plus mr-1" /> Add Stat
        </button>
      </div>

      <div className="space-y-3">
        {stats.map((s, i) => {
          const a = arrayActions(i, 'hero.stats');
          return (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-500 uppercase">Stat {i + 1}</span>
                <div className="flex gap-1">
                  <button onClick={a.onMoveUp} disabled={i === 0} className="w-7 h-7 rounded-lg hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center text-gray-500"><i className="fas fa-arrow-up text-xs" /></button>
                  <button onClick={a.onMoveDown} disabled={i === stats.length - 1} className="w-7 h-7 rounded-lg hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center text-gray-500"><i className="fas fa-arrow-down text-xs" /></button>
                  <button onClick={a.onDuplicate} className="w-7 h-7 rounded-lg hover:bg-blue-50 text-blue-500 flex items-center justify-center"><i className="fas fa-copy text-xs" /></button>
                  <button onClick={a.onRemove} className="w-7 h-7 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center"><i className="fas fa-trash-alt text-xs" /></button>
                </div>
              </div>
              <Grid cols={2}>
                <Field label="Value" value={s.value} onChange={(v) => setField(`hero.stats[${i}].value`, v)} />
                <Field label="Label" value={s.label} onChange={(v) => setField(`hero.stats[${i}].label`, v)} />
              </Grid>
              <label className="flex items-center gap-2 mt-3 text-xs font-semibold text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!s.static}
                  onChange={(e) => setField(`hero.stats[${i}].static`, e.target.checked)}
                  className="rounded border-gray-300 text-green-600"
                />
                Show as-is (don't count up — good for "2000")
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   WHO WE ARE
   ════════════════════════════════════════════════════════════ */
function WhoForm({ data, setField }: { data: any; setField: any }) {
  const w = data.who || {};
  return (
    <div className="space-y-6">
      <Grid cols={3}>
        <Field label="Eyebrow" value={w.eyebrow} onChange={(v) => setField('who.eyebrow', v)} />
        <Field label="Title" value={w.title} onChange={(v) => setField('who.title', v)} />
        <Field label="Title Accent (green)" value={w.titleAccent} onChange={(v) => setField('who.titleAccent', v)} />
      </Grid>
      <Field label="Title Ending" value={w.titleEnd} onChange={(v) => setField('who.titleEnd', v)} />

      <TextArea label="Paragraph 1" value={w.paragraph1} onChange={(v) => setField('who.paragraph1', v)} rows={4} help="The opening paragraph — gets a decorative drop-cap." />
      <TextArea label="Paragraph 2" value={w.paragraph2} onChange={(v) => setField('who.paragraph2', v)} rows={4} />
      <TextArea label="Paragraph 3" value={w.paragraph3} onChange={(v) => setField('who.paragraph3', v)} rows={4} />

      <FileUpload label="Side Image" value={w.image} onChange={(v) => setField('who.image', v)} />
      <Grid cols={2}>
        <Field label="Image Caption" value={w.imageCaption} onChange={(v) => setField('who.imageCaption', v)} />
        <Field label="Image Subcaption" value={w.imageSubcaption} onChange={(v) => setField('who.imageSubcaption', v)} />
      </Grid>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   JOURNEY
   ════════════════════════════════════════════════════════════ */
function JourneyForm({ data, setField, mutate, arrayActions }: FormProps) {
  const j = data.journey || {};
  const milestones: any[] = Array.isArray(j.milestones) ? j.milestones : [];

  return (
    <div className="space-y-6">
      <Grid cols={2}>
        <Field label="Eyebrow" value={j.eyebrow} onChange={(v) => setField('journey.eyebrow', v)} />
        <Field label="Title" value={j.title} onChange={(v) => setField('journey.title', v)} />
        <Field label="Title Accent" value={j.titleAccent} onChange={(v) => setField('journey.titleAccent', v)} />
        <Field label="Subtitle" value={j.subtitle} onChange={(v) => setField('journey.subtitle', v)} />
      </Grid>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <h3 className="font-bold text-gray-900">Milestones ({milestones.length})</h3>
        <button
          onClick={() =>
            mutate((d) => {
              if (!Array.isArray(d.journey.milestones)) d.journey.milestones = [];
              d.journey.milestones.push({ year: '2026', title: 'New Milestone', text: 'Describe the milestone...' });
            })
          }
          className="text-xs font-bold text-green-600 hover:text-green-700"
        >
          <i className="fas fa-plus mr-1" /> Add Milestone
        </button>
      </div>

      <div className="space-y-3">
        {milestones.map((m, i) => {
          const a = arrayActions(i, 'journey.milestones');
          return (
            <ItemCard
              key={i}
              index={i}
              title={`${m.year || '—'} · ${m.title || 'Untitled'}`}
              canMoveUp={i > 0}
              canMoveDown={i < milestones.length - 1}
              {...a}
            >
              <Grid cols={2}>
                <Field label="Year" value={m.year} onChange={(v) => setField(`journey.milestones[${i}].year`, v)} />
                <Field label="Title" value={m.title} onChange={(v) => setField(`journey.milestones[${i}].title`, v)} />
              </Grid>
              <TextArea label="Description" value={m.text} onChange={(v) => setField(`journey.milestones[${i}].text`, v)} rows={3} />
            </ItemCard>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MISSION & VISION
   ════════════════════════════════════════════════════════════ */
function MissionForm({ data, setField }: { data: any; setField: any }) {
  const m = data.mission || {};
  return (
    <div className="space-y-6">
      <Grid cols={3}>
        <Field label="Eyebrow" value={m.eyebrow} onChange={(v) => setField('mission.eyebrow', v)} />
        <Field label="Title" value={m.title} onChange={(v) => setField('mission.title', v)} />
        <Field label="Title Accent" value={m.titleAccent} onChange={(v) => setField('mission.titleAccent', v)} />
      </Grid>
      <Field label="Subtitle" value={m.subtitle} onChange={(v) => setField('mission.subtitle', v)} />

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 space-y-3">
        <p className="text-sm font-bold text-blue-900 flex items-center gap-2">
          <i className="fas fa-bullseye" /> Mission Card (blue)
        </p>
        <Field label="Mission Title" value={m.missionTitle} onChange={(v) => setField('mission.missionTitle', v)} />
        <TextArea label="Mission Text" value={m.missionText} onChange={(v) => setField('mission.missionText', v)} rows={3} />
      </div>

      <div className="rounded-xl border border-green-200 bg-green-50 p-4 space-y-3">
        <p className="text-sm font-bold text-green-900 flex items-center gap-2">
          <i className="fas fa-eye" /> Vision Card (green)
        </p>
        <Field label="Vision Title" value={m.visionTitle} onChange={(v) => setField('mission.visionTitle', v)} />
        <TextArea label="Vision Text" value={m.visionText} onChange={(v) => setField('mission.visionText', v)} rows={3} />
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 space-y-3">
        <p className="text-sm font-bold text-amber-900 flex items-center gap-2">
          <i className="fas fa-quote-left" /> Guiding Quote
        </p>
        <TextArea label="Quote" value={m.quote} onChange={(v) => setField('mission.quote', v)} rows={2} />
        <Field label="Quote Author" value={m.quoteAuthor} onChange={(v) => setField('mission.quoteAuthor', v)} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   VALUES
   ════════════════════════════════════════════════════════════ */
function ValuesForm({ data, setField, mutate, arrayActions }: FormProps) {
  const v = data.values || {};
  const items: any[] = Array.isArray(v.items) ? v.items : [];

  return (
    <div className="space-y-6">
      <Grid cols={2}>
        <Field label="Eyebrow" value={v.eyebrow} onChange={(x) => setField('values.eyebrow', x)} />
        <Field label="Subtitle" value={v.subtitle} onChange={(x) => setField('values.subtitle', x)} />
        <Field label="Title" value={v.title} onChange={(x) => setField('values.title', x)} />
        <Field label="Title Accent" value={v.titleAccent} onChange={(x) => setField('values.titleAccent', x)} />
      </Grid>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <h3 className="font-bold text-gray-900">Values ({items.length})</h3>
        <button
          onClick={() =>
            mutate((d) => {
              if (!Array.isArray(d.values.items)) d.values.items = [];
              d.values.items.push({ icon: 'fas fa-star', color: 'brand', title: 'New Value', text: 'Description' });
            })
          }
          className="text-xs font-bold text-green-600 hover:text-green-700"
        >
          <i className="fas fa-plus mr-1" /> Add Value
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => {
          const a = arrayActions(i, 'values.items');
          return (
            <ItemCard
              key={i}
              index={i}
              title={item.title || 'Untitled'}
              canMoveUp={i > 0}
              canMoveDown={i < items.length - 1}
              {...a}
            >
              <Grid cols={2}>
                <Field label="Title" value={item.title} onChange={(x) => setField(`values.items[${i}].title`, x)} />
                <Field label="Icon" value={item.icon} onChange={(x) => setField(`values.items[${i}].icon`, x)} mono />
              </Grid>
              <TextArea label="Description" value={item.text} onChange={(x) => setField(`values.items[${i}].text`, x)} rows={2} />
            </ItemCard>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   CAPACITY
   ════════════════════════════════════════════════════════════ */
function CapacityForm({ data, setField, mutate, arrayActions }: FormProps) {
  const c = data.capacity || {};
  const items: any[] = Array.isArray(c.items) ? c.items : [];

  return (
    <div className="space-y-6">
      <Grid cols={3}>
        <Field label="Eyebrow" value={c.eyebrow} onChange={(x) => setField('capacity.eyebrow', x)} />
        <Field label="Title" value={c.title} onChange={(x) => setField('capacity.title', x)} />
        <Field label="Title Accent" value={c.titleAccent} onChange={(x) => setField('capacity.titleAccent', x)} />
      </Grid>
      <TextArea label="Subtitle" value={c.subtitle} onChange={(x) => setField('capacity.subtitle', x)} rows={3} />

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <h3 className="font-bold text-gray-900">Capacity Areas ({items.length})</h3>
        <button
          onClick={() =>
            mutate((d) => {
              if (!Array.isArray(d.capacity.items)) d.capacity.items = [];
              d.capacity.items.push({ icon: 'fas fa-star', color: 'brand', title: 'New Area', text: 'Description...' });
            })
          }
          className="text-xs font-bold text-green-600 hover:text-green-700"
        >
          <i className="fas fa-plus mr-1" /> Add Area
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => {
          const a = arrayActions(i, 'capacity.items');
          return (
            <ItemCard
              key={i}
              index={i}
              title={item.title || 'Untitled'}
              canMoveUp={i > 0}
              canMoveDown={i < items.length - 1}
              {...a}
            >
              <Grid cols={2}>
                <Field label="Title" value={item.title} onChange={(x) => setField(`capacity.items[${i}].title`, x)} />
                <Field label="Icon" value={item.icon} onChange={(x) => setField(`capacity.items[${i}].icon`, x)} mono />
              </Grid>
              <TextArea label="Description" value={item.text} onChange={(x) => setField(`capacity.items[${i}].text`, x)} rows={3} />
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
      <Field label="Title" value={c.title} onChange={(x) => setField('cta.title', x)} />
      <TextArea label="Text" value={c.text} onChange={(x) => setField('cta.text', x)} rows={3} />
      <Grid cols={2}>
        <Field label="Button 1 Text" value={c.button1Text} onChange={(x) => setField('cta.button1Text', x)} />
        <Field label="Button 1 Link" value={c.button1Link} onChange={(x) => setField('cta.button1Link', x)} mono />
        <Field label="Button 2 Text" value={c.button2Text} onChange={(x) => setField('cta.button2Text', x)} />
        <Field label="Button 2 Link" value={c.button2Link} onChange={(x) => setField('cta.button2Link', x)} mono />
      </Grid>
      <FileUpload label="Background Image" value={c.backgroundImage} onChange={(x) => setField('cta.backgroundImage', x)} />
    </div>
  );
}