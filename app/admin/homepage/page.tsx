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
  TagEditor,
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
  { id: 'hero',         label: 'Hero',           icon: 'fas fa-image',       accent: 'green',  description: 'Top banner with headline, buttons and stats.' },
  { id: 'about',        label: 'About',          icon: 'fas fa-info-circle', accent: 'blue',   description: 'Who we are, mission, vision and quote.' },
  { id: 'values',       label: 'Core Values',    icon: 'fas fa-star',        accent: 'amber',  description: 'The values that guide MSA.' },
  { id: 'impact',       label: 'Impact',         icon: 'fas fa-chart-bar',   accent: 'purple', description: 'Numbers and beneficiary tags.' },
  { id: 'programs',     label: 'Programs',       icon: 'fas fa-th-large',    accent: 'green',  description: 'Education, Health, Media and more.' },
  { id: 'featured',     label: 'Featured',       icon: 'fas fa-lightbulb',   accent: 'amber',  description: 'Highlight one initiative — Girl Child Education.' },
  { id: 'achievements', label: 'Achievements',   icon: 'fas fa-trophy',      accent: 'amber',  description: 'Key milestones across program areas.' },
  { id: 'news',         label: 'News & Media',   icon: 'fas fa-newspaper',   accent: 'red',    description: 'Publish news articles and stories.' },
  { id: 'newsletter',   label: 'Newsletter',     icon: 'fas fa-envelope',    accent: 'blue',   description: 'Subscribe box title and text.' },
  { id: 'partners',     label: 'Partners',       icon: 'fas fa-handshake',   accent: 'purple', description: 'Partner and collaborator logos.' },
  { id: 'cta',          label: 'Call to Action', icon: 'fas fa-bullhorn',    accent: 'red',    description: 'Big banner with two buttons.' },
  { id: 'contact',      label: 'Contact',        icon: 'fas fa-phone',       accent: 'green',  description: 'Contact info and message form.' },
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

/* ─── Main component ──────────────────────────────────────── */
export default function HomepageEditor() {
  const [data, setData] = useState<any>(null);
  const [active, setActive] = useState<string>('hero');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);
  const [dirty, setDirty] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    fetch('/api/homepage')
      .then((r) => r.json())
      .then((d) => {
        if (!d || typeof d !== 'object') throw new Error('Bad data');
        const safe: any = { ...d };
        for (const s of SECTIONS) {
          if (!safe[s.id] || typeof safe[s.id] !== 'object') safe[s.id] = {};
        }
        if (!Array.isArray(safe.news.articles)) safe.news.articles = [];
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
          if (copy.id && typeof copy.id === 'string') {
            copy.id = `${copy.id}-copy-${Date.now()}`;
          }
          if (copy.title) copy.title = `${copy.title} (Copy)`;
          if (copy.slug && typeof copy.slug === 'string') {
            copy.slug = `${copy.slug}-copy-${Date.now()}`;
          }
          arr.splice(i + 1, 0, copy);
        }),
    }),
    [mutate]
  );

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Save failed');
      showToast('ok', 'Saved successfully!');
      setDirty(false);
    } catch (err: any) {
      showToast('err', err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (!data && !loadError) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading homepage data...</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-red-100 flex items-center justify-center mb-4">
            <i className="fas fa-exclamation-triangle text-red-600 text-xl" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Could not load homepage</h2>
          <p className="text-sm text-gray-500 mb-6">Check your database connection and try again.</p>
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
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <Link href="/admin" className="hover:text-green-600">Dashboard</Link>
            <i className="fas fa-chevron-right text-[8px]" />
            <span>Homepage</span>
          </div>
          <h1 className="text-lg font-bold text-gray-900">Edit Homepage</h1>
        </div>

        <div className="flex items-center gap-3">
          {dirty && (
            <span className="hidden sm:flex text-xs font-semibold text-amber-600 items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Unsaved changes
            </span>
          )}
          <Link
            href="/"
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
              <><i className="fas fa-spinner fa-spin" /> Saving...</>
            ) : (
              <><i className="fas fa-save" /> Save Changes</>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        <aside className="w-60 bg-white border-r border-gray-200 flex-shrink-0 py-4 sticky top-[73px] self-start max-h-[calc(100vh-73px)] overflow-y-auto hidden lg:block">
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
            {SECTIONS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
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
        <div
          className={`fixed bottom-6 right-6 px-5 py-3.5 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-3 z-50 ${
            toast.type === 'ok' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}
        >
          <i
            className={`fas ${toast.type === 'ok' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}
          />
          {toast.msg}
        </div>
      )}
    </div>
  );
}

/* ─── Router ──────────────────────────────────────────────── */
function renderSection(
  id: string,
  data: any,
  setField: (path: string, value: any) => void,
  mutate: (fn: (d: any) => void) => void,
  arrayActions: (i: number, path: string) => {
    onMoveUp: () => void;
    onMoveDown: () => void;
    onRemove: () => void;
    onDuplicate: () => void;
  }
) {
  switch (id) {
    case 'hero':         return <HeroForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'about':        return <AboutForm data={data} setField={setField} />;
    case 'values':       return <ValuesForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'impact':       return <ImpactForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'programs':     return <ProgramsForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'featured':     return <FeaturedForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'achievements': return <AchievementsForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'news':         return <NewsForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'newsletter':   return <NewsletterForm data={data} setField={setField} />;
    case 'partners':     return <PartnersForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'cta':          return <CtaForm data={data} setField={setField} />;
    case 'contact':      return <ContactForm data={data} setField={setField} />;
    default:             return null;
  }
}

/* ─── Types for props ─────────────────────────────────────── */
type ArrayActions = (i: number, path: string) => {
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  onDuplicate: () => void;
};

interface FormProps {
  data: any;
  setField: (path: string, value: any) => void;
  mutate: (fn: (d: any) => void) => void;
  arrayActions: ArrayActions;
}

/* ════════════════════════════════════════════════════════════
   HERO
   ════════════════════════════════════════════════════════════ */
function HeroForm({ data, setField, mutate, arrayActions }: FormProps) {
  const h = data.hero || {};
  const stats: any[] = Array.isArray(h.stats) ? h.stats : [];
  const fc1 = h.floatCard1 || {};
  const fc2 = h.floatCard2 || {};

  return (
    <div className="space-y-8">
      <InfoBanner>This is the first thing visitors see. Keep the headline short and punchy.</InfoBanner>

      <Grid cols={2}>
        <Field label="Badge Text" value={h.badge} onChange={(v) => setField('hero.badge', v)} help="Small pill text above the title." />
        <Field label="Title Line 1" value={h.titleLine1} onChange={(v) => setField('hero.titleLine1', v)} />
        <Field label="Title Line 2 (highlighted)" value={h.titleLine2} onChange={(v) => setField('hero.titleLine2', v)} help="Gets the gold gradient." />
        <Field label="Title Line 3" value={h.titleLine3} onChange={(v) => setField('hero.titleLine3', v)} />
      </Grid>

      <TextArea label="Subtitle" value={h.subtitle} onChange={(v) => setField('hero.subtitle', v)} rows={3} />

      <Grid cols={2}>
        <Field label="Primary Button Text" value={h.primaryCtaText} onChange={(v) => setField('hero.primaryCtaText', v)} />
        <Field label="Primary Button Link" value={h.primaryCtaLink} onChange={(v) => setField('hero.primaryCtaLink', v)} mono />
        <Field label="Secondary Button Text" value={h.secondaryCtaText} onChange={(v) => setField('hero.secondaryCtaText', v)} />
        <Field label="Secondary Button Link" value={h.secondaryCtaLink} onChange={(v) => setField('hero.secondaryCtaLink', v)} mono />
      </Grid>

      <FileUpload label="Background Image" value={h.backgroundImage} onChange={(v) => setField('hero.backgroundImage', v)} help="1920×1080 recommended." />
      <FileUpload label="Side Card Image" value={h.heroImage} onChange={(v) => setField('hero.heroImage', v)} />

      <Grid cols={2}>
        <Field label="Side Card Badge" value={h.heroBadge} onChange={(v) => setField('hero.heroBadge', v)} />
        <Field label="Side Card Title" value={h.heroCardTitle} onChange={(v) => setField('hero.heroCardTitle', v)} />
      </Grid>
      <TextArea label="Side Card Text" value={h.heroCardText} onChange={(v) => setField('hero.heroCardText', v)} rows={2} />

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">Stats</h3>
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
                    <button onClick={a.onDuplicate} className="w-7 h-7 rounded-lg hover:bg-blue-50 text-blue-500 flex items-center justify-center" title="Duplicate"><i className="fas fa-copy text-xs" /></button>
                    <button onClick={a.onRemove} className="w-7 h-7 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center"><i className="fas fa-trash-alt text-xs" /></button>
                  </div>
                </div>
                <Grid cols={2}>
                  <Field label="Value" value={s.value} onChange={(v) => setField(`hero.stats[${i}].value`, v)} help="Number only." />
                  <Field label="Label" value={s.label} onChange={(v) => setField(`hero.stats[${i}].label`, v)} />
                </Grid>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
          <p className="text-xs font-bold text-gray-500 uppercase">Floating Card 1</p>
          <Field label="Icon" value={fc1.icon} onChange={(v) => setField('hero.floatCard1.icon', v)} mono />
          <Field label="Title" value={fc1.title} onChange={(v) => setField('hero.floatCard1.title', v)} />
          <Field label="Subtitle" value={fc1.sub} onChange={(v) => setField('hero.floatCard1.sub', v)} />
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
          <p className="text-xs font-bold text-gray-500 uppercase">Floating Card 2</p>
          <Field label="Icon" value={fc2.icon} onChange={(v) => setField('hero.floatCard2.icon', v)} mono />
          <Field label="Title" value={fc2.title} onChange={(v) => setField('hero.floatCard2.title', v)} />
          <Field label="Subtitle" value={fc2.sub} onChange={(v) => setField('hero.floatCard2.sub', v)} />
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   ABOUT
   ════════════════════════════════════════════════════════════ */
function AboutForm({ data, setField }: { data: any; setField: FormProps['setField'] }) {
  const a = data.about || {};
  return (
    <div className="space-y-6">
      <Grid cols={3}>
        <Field label="Eyebrow" value={a.eyebrow} onChange={(v) => setField('about.eyebrow', v)} />
        <Field label="Title" value={a.title} onChange={(v) => setField('about.title', v)} />
        <Field label="Title Accent" value={a.titleAccent} onChange={(v) => setField('about.titleAccent', v)} />
      </Grid>
      <Field label="Title Ending" value={a.titleEnd} onChange={(v) => setField('about.titleEnd', v)} />

      <TextArea label="Paragraph 1" value={a.paragraph1} onChange={(v) => setField('about.paragraph1', v)} rows={4} />
      <TextArea label="Paragraph 2" value={a.paragraph2} onChange={(v) => setField('about.paragraph2', v)} rows={4} />

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-gray-200 p-4 space-y-3">
          <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <i className="fas fa-bullseye text-blue-600" /> Mission
          </p>
          <Field label="Title" value={a.missionTitle} onChange={(v) => setField('about.missionTitle', v)} />
          <TextArea label="Text" value={a.missionText} onChange={(v) => setField('about.missionText', v)} rows={3} />
        </div>
        <div className="rounded-xl border border-gray-200 p-4 space-y-3">
          <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <i className="fas fa-eye text-green-600" /> Vision
          </p>
          <Field label="Title" value={a.visionTitle} onChange={(v) => setField('about.visionTitle', v)} />
          <TextArea label="Text" value={a.visionText} onChange={(v) => setField('about.visionText', v)} rows={3} />
        </div>
      </div>

      <TextArea label="Quote" value={a.quote} onChange={(v) => setField('about.quote', v)} rows={2} />
      <Field label="Quote Author" value={a.quoteAuthor} onChange={(v) => setField('about.quoteAuthor', v)} />

      <FileUpload label="Side Image" value={a.image} onChange={(v) => setField('about.image', v)} />
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

      <div className="flex items-center justify-between">
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
                <Field label="Icon (Font Awesome)" value={item.icon} onChange={(x) => setField(`values.items[${i}].icon`, x)} mono />
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
   IMPACT
   ════════════════════════════════════════════════════════════ */
function ImpactForm({ data, setField, mutate, arrayActions }: FormProps) {
  const m = data.impact || {};
  const stats: any[] = Array.isArray(m.stats) ? m.stats : [];

  return (
    <div className="space-y-6">
      <Grid cols={2}>
        <Field label="Eyebrow" value={m.eyebrow} onChange={(x) => setField('impact.eyebrow', x)} />
        <Field label="Title" value={m.title} onChange={(x) => setField('impact.title', x)} />
      </Grid>
      <TextArea label="Subtitle" value={m.subtitle} onChange={(x) => setField('impact.subtitle', x)} rows={2} />

      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Stat Cards ({stats.length})</h3>
        <button
          onClick={() =>
            mutate((d) => {
              if (!Array.isArray(d.impact.stats)) d.impact.stats = [];
              d.impact.stats.push({ icon: 'fas fa-chart-line', value: '0', label: 'New Stat' });
            })
          }
          className="text-xs font-bold text-green-600 hover:text-green-700"
        >
          <i className="fas fa-plus mr-1" /> Add Stat
        </button>
      </div>

      <div className="space-y-3">
        {stats.map((s, i) => {
          const a = arrayActions(i, 'impact.stats');
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
              <Grid cols={3}>
                <Field label="Icon" value={s.icon} onChange={(x) => setField(`impact.stats[${i}].icon`, x)} mono />
                <Field label="Value" value={s.value} onChange={(x) => setField(`impact.stats[${i}].value`, x)} />
                <Field label="Label" value={s.label} onChange={(x) => setField(`impact.stats[${i}].label`, x)} />
              </Grid>
              <label className="flex items-center gap-2 mt-3 text-xs font-semibold text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!s.static}
                  onChange={(e) => setField(`impact.stats[${i}].static`, e.target.checked)}
                  className="rounded border-gray-300 text-green-600"
                />
                Show value as-is (do not count up)
              </label>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-gray-200 p-4 space-y-3">
          <Field label="Direct Title" value={m.directTitle} onChange={(x) => setField('impact.directTitle', x)} />
          <TagEditor tags={Array.isArray(m.directTags) ? m.directTags : []} onChange={(t) => setField('impact.directTags', t)} />
        </div>
        <div className="rounded-xl border border-gray-200 p-4 space-y-3">
          <Field label="Indirect Title" value={m.indirectTitle} onChange={(x) => setField('impact.indirectTitle', x)} />
          <TagEditor tags={Array.isArray(m.indirectTags) ? m.indirectTags : []} onChange={(t) => setField('impact.indirectTags', t)} />
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   PROGRAMS
   ════════════════════════════════════════════════════════════ */
function ProgramsForm({ data, setField, mutate, arrayActions }: FormProps) {
  const p = data.programs || {};
  const items: any[] = Array.isArray(p.items) ? p.items : [];

  return (
    <div className="space-y-6">
      <Grid cols={2}>
        <Field label="Eyebrow" value={p.eyebrow} onChange={(x) => setField('programs.eyebrow', x)} />
        <Field label="Title" value={p.title} onChange={(x) => setField('programs.title', x)} />
        <Field label="Title Accent" value={p.titleAccent} onChange={(x) => setField('programs.titleAccent', x)} />
        <Field label="Subtitle" value={p.subtitle} onChange={(x) => setField('programs.subtitle', x)} />
      </Grid>

      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Program Cards ({items.length})</h3>
        <button
          onClick={() =>
            mutate((d) => {
              if (!Array.isArray(d.programs.items)) d.programs.items = [];
              d.programs.items.push({
                id: `program-${Date.now()}`,
                image: '',
                tag: 'New',
                tagColor: 'green',
                icon: 'fas fa-star',
                title: 'New Program',
                text: 'Short description',
                features: [],
                link: '/programs',
              });
            })
          }
          className="text-xs font-bold text-green-600 hover:text-green-700"
        >
          <i className="fas fa-plus mr-1" /> Add Program
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => {
          const a = arrayActions(i, 'programs.items');
          return (
            <ItemCard
              key={i}
              index={i}
              title={item.title || 'Untitled'}
              canMoveUp={i > 0}
              canMoveDown={i < items.length - 1}
              {...a}
            >
              <FileUpload label="Image" value={item.image} onChange={(x) => setField(`programs.items[${i}].image`, x)} />
              <Grid cols={2}>
                <Field label="Title" value={item.title} onChange={(x) => setField(`programs.items[${i}].title`, x)} />
                <Field label="Icon" value={item.icon} onChange={(x) => setField(`programs.items[${i}].icon`, x)} mono />
                <Field label="Tag" value={item.tag} onChange={(x) => setField(`programs.items[${i}].tag`, x)} />
                <Field label="Link" value={item.link} onChange={(x) => setField(`programs.items[${i}].link`, x)} mono />
              </Grid>
              <TextArea label="Description" value={item.text} onChange={(x) => setField(`programs.items[${i}].text`, x)} rows={3} />
              <Field
                label="Features (comma-separated)"
                value={Array.isArray(item.features) ? item.features.join(', ') : ''}
                onChange={(x) =>
                  setField(
                    `programs.items[${i}].features`,
                    x.split(',').map((s) => s.trim()).filter(Boolean)
                  )
                }
              />
            </ItemCard>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   FEATURED
   ════════════════════════════════════════════════════════════ */
function FeaturedForm({ data, setField, mutate, arrayActions }: FormProps) {
  const f = data.featured || {};
  const steps: any[] = Array.isArray(f.steps) ? f.steps : [];

  return (
    <div className="space-y-6">
      <Grid cols={3}>
        <Field label="Eyebrow" value={f.eyebrow} onChange={(x) => setField('featured.eyebrow', x)} />
        <Field label="Title" value={f.title} onChange={(x) => setField('featured.title', x)} />
        <Field label="Title Accent" value={f.titleAccent} onChange={(x) => setField('featured.titleAccent', x)} />
      </Grid>
      <Field label="Title End" value={f.titleEnd} onChange={(x) => setField('featured.titleEnd', x)} />
      <TextArea label="Description" value={f.text} onChange={(x) => setField('featured.text', x)} rows={4} />

      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Steps</h3>
        <button
          onClick={() =>
            mutate((d) => {
              if (!Array.isArray(d.featured.steps)) d.featured.steps = [];
              d.featured.steps.push({ color: 'brand', title: 'New Step', text: '' });
            })
          }
          className="text-xs font-bold text-green-600 hover:text-green-700"
        >
          <i className="fas fa-plus mr-1" /> Add Step
        </button>
      </div>
      <div className="space-y-3">
        {steps.map((s, i) => {
          const a = arrayActions(i, 'featured.steps');
          return (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase">Step {i + 1}</span>
                <div className="flex gap-1">
                  <button onClick={a.onMoveUp} disabled={i === 0} className="w-7 h-7 rounded-lg hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center text-gray-500"><i className="fas fa-arrow-up text-xs" /></button>
                  <button onClick={a.onMoveDown} disabled={i === steps.length - 1} className="w-7 h-7 rounded-lg hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center text-gray-500"><i className="fas fa-arrow-down text-xs" /></button>
                  <button onClick={a.onDuplicate} className="w-7 h-7 rounded-lg hover:bg-blue-50 text-blue-500 flex items-center justify-center"><i className="fas fa-copy text-xs" /></button>
                  <button onClick={a.onRemove} className="w-7 h-7 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center"><i className="fas fa-trash-alt text-xs" /></button>
                </div>
              </div>
              <Field label="Title" value={s.title} onChange={(x) => setField(`featured.steps[${i}].title`, x)} />
              <TextArea label="Text" value={s.text} onChange={(x) => setField(`featured.steps[${i}].text`, x)} rows={2} />
            </div>
          );
        })}
      </div>

      <Grid cols={2}>
        <Field label="CTA Text" value={f.ctaText} onChange={(x) => setField('featured.ctaText', x)} />
        <Field label="CTA Link" value={f.ctaLink} onChange={(x) => setField('featured.ctaLink', x)} mono />
        <Field label="Image Caption" value={f.imageCaption} onChange={(x) => setField('featured.imageCaption', x)} />
        <Field label="Image Subcaption" value={f.imageSubcaption} onChange={(x) => setField('featured.imageSubcaption', x)} />
      </Grid>

      <FileUpload label="Featured Image" value={f.image} onChange={(x) => setField('featured.image', x)} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   ACHIEVEMENTS
   ════════════════════════════════════════════════════════════ */
function AchievementsForm({ data, setField, mutate, arrayActions }: FormProps) {
  const a = data.achievements || {};
  const items: any[] = Array.isArray(a.items) ? a.items : [];

  return (
    <div className="space-y-6">
      <Grid cols={2}>
        <Field label="Eyebrow" value={a.eyebrow} onChange={(x) => setField('achievements.eyebrow', x)} />
        <Field label="Title" value={a.title} onChange={(x) => setField('achievements.title', x)} />
        <Field label="Title Accent" value={a.titleAccent} onChange={(x) => setField('achievements.titleAccent', x)} />
        <Field label="Subtitle" value={a.subtitle} onChange={(x) => setField('achievements.subtitle', x)} />
      </Grid>

      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Categories ({items.length})</h3>
        <button
          onClick={() =>
            mutate((d) => {
              if (!Array.isArray(d.achievements.items)) d.achievements.items = [];
              d.achievements.items.push({ color: 'brand', icon: 'fas fa-star', title: 'New', points: [] });
            })
          }
          className="text-xs font-bold text-green-600 hover:text-green-700"
        >
          <i className="fas fa-plus mr-1" /> Add Category
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => {
          const ac = arrayActions(i, 'achievements.items');
          return (
            <ItemCard
              key={i}
              index={i}
              title={item.title || 'Untitled'}
              canMoveUp={i > 0}
              canMoveDown={i < items.length - 1}
              {...ac}
            >
              <Grid cols={2}>
                <Field label="Title" value={item.title} onChange={(x) => setField(`achievements.items[${i}].title`, x)} />
                <Field label="Icon" value={item.icon} onChange={(x) => setField(`achievements.items[${i}].icon`, x)} mono />
              </Grid>
              <TextArea
                label="Points (one per line)"
                value={Array.isArray(item.points) ? item.points.join('\n') : ''}
                onChange={(x) =>
                  setField(
                    `achievements.items[${i}].points`,
                    x.split('\n').map((s) => s.trim()).filter(Boolean)
                  )
                }
                rows={5}
              />
            </ItemCard>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   NEWS
   ════════════════════════════════════════════════════════════ */
function NewsForm({ data, setField, mutate, arrayActions }: FormProps) {
  const n = data.news || {};
  const articles: any[] = Array.isArray(n.articles) ? n.articles : [];

  /* Add a new article */
  const addArticle = () =>
    mutate((d: any) => {
      if (!Array.isArray(d.news.articles)) d.news.articles = [];
      d.news.articles.unshift({
        id: `hp-article-${Date.now()}`,
        title: 'New Article',
        slug: `article-${Date.now()}`,
        date: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        category: 'education',
        image: '',
        excerpt: '',
        content: '',
        author: 'MSA Media Team',
        published: true,
      });
    });

  return (
    <div className="space-y-6">
      <InfoBanner>
        These articles appear in the <strong>News section on your homepage</strong>.
        They are <strong>separate</strong> from the News page (/news) which has its own editor.
      </InfoBanner>

      {/* ─── Section heading ─────────────────────────────── */}
      <Grid cols={3}>
        <Field
          label="Eyebrow"
          value={n.eyebrow}
          onChange={(x) => setField('news.eyebrow', x)}
        />
        <Field
          label="Title"
          value={n.title}
          onChange={(x) => setField('news.title', x)}
        />
        <Field
          label="Title Accent"
          value={n.titleAccent}
          onChange={(x) => setField('news.titleAccent', x)}
        />
      </Grid>
      <TextArea
        label="Subtitle"
        value={n.subtitle}
        onChange={(x) => setField('news.subtitle', x)}
        rows={2}
      />
      <Field
        label="View All Button Text"
        value={n.viewAllText}
        onChange={(x) => setField('news.viewAllText', x)}
        help='e.g. "View All News" — the button under the article grid.'
      />

      {/* ─── Articles list ───────────────────────────────── */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <div>
          <h3 className="font-bold text-gray-900">
            Homepage Articles ({articles.length})
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            These are the articles shown in the homepage News section. Pick a few of your
            best stories.
          </p>
        </div>
        <button
          onClick={addArticle}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-600 text-white text-xs font-bold hover:bg-green-700 shadow-sm"
        >
          <i className="fas fa-plus" /> Add Article
        </button>
      </div>

      {articles.length === 0 && (
        <div className="text-center py-10 rounded-xl bg-gray-50 border border-dashed border-gray-200">
          <div className="w-12 h-12 mx-auto rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm">
            <i className="fas fa-newspaper text-gray-400" />
          </div>
          <p className="text-sm text-gray-500">
            No articles yet. Click <strong>Add Article</strong> to show your first story.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {articles.map((item, i) => {
          const a = arrayActions(i, 'news.articles');
          const isPublished = item.published !== false;
          return (
            <ItemCard
              key={i}
              index={i}
              title={item.title || 'Untitled'}
              canMoveUp={i > 0}
              canMoveDown={i < articles.length - 1}
              {...a}
            >
              {/* Publish toggle */}
              <div
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  isPublished ? 'bg-green-50' : 'bg-amber-50'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isPublished ? 'bg-green-500' : 'bg-amber-500'
                  }`}
                >
                  <i
                    className={`fas ${
                      isPublished ? 'fa-check' : 'fa-pencil'
                    } text-white text-xs`}
                  />
                </div>
                <div className="flex-1">
                  <p
                    className={`text-xs font-bold ${
                      isPublished ? 'text-green-900' : 'text-amber-900'
                    }`}
                  >
                    {isPublished
                      ? 'Visible on homepage'
                      : 'Draft — hidden from homepage'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setField(`news.articles[${i}].published`, !isPublished)
                  }
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isPublished
                      ? 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isPublished ? 'Hide' : 'Show'}
                </button>
              </div>

              <FileUpload
                label="Cover Image"
                value={item.image}
                onChange={(x) => setField(`news.articles[${i}].image`, x)}
                help="Recommended 800×500."
              />

              <Grid cols={2}>
                <Field
                  label="Title"
                  value={item.title}
                  onChange={(x) => setField(`news.articles[${i}].title`, x)}
                />
                <Field
                  label="Author"
                  value={item.author}
                  onChange={(x) => setField(`news.articles[${i}].author`, x)}
                />
                <Field
                  label="Date"
                  value={item.date}
                  onChange={(x) => setField(`news.articles[${i}].date`, x)}
                  placeholder="July 17, 2026"
                />
                <Field
                  label="URL Slug"
                  value={item.slug}
                  onChange={(x) => setField(`news.articles[${i}].slug`, x)}
                  mono
                  help="Used in the URL: /news/your-slug"
                />
              </Grid>

              <Select
                label="Category"
                value={item.category}
                onChange={(x) => setField(`news.articles[${i}].category`, x)}
                options={[
                  { value: 'education', label: 'Education' },
                  { value: 'health', label: 'Health' },
                  { value: 'protection', label: 'Protection' },
                  { value: 'media', label: 'Media' },
                  { value: 'governance', label: 'Governance' },
                  { value: 'notices', label: 'Notices' },
                ]}
                help="Which filter tab shows this article."
              />

              <TextArea
                label="Short Summary (Excerpt)"
                value={item.excerpt}
                onChange={(x) => setField(`news.articles[${i}].excerpt`, x)}
                rows={2}
                help="Shown on the article card on the homepage."
              />

              <TextArea
                label="Full Article Content"
                value={item.content}
                onChange={(x) => setField(`news.articles[${i}].content`, x)}
                rows={8}
                help="Only used if someone opens /news/your-slug. Leave blank if you only need the card."
              />
            </ItemCard>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   NEWSLETTER
   ════════════════════════════════════════════════════════════ */
function NewsletterForm({ data, setField }: { data: any; setField: FormProps['setField'] }) {
  const n = data.newsletter || {};
  return (
    <div className="space-y-6">
      <Field label="Title" value={n.title} onChange={(x) => setField('newsletter.title', x)} />
      <TextArea label="Subtitle" value={n.subtitle} onChange={(x) => setField('newsletter.subtitle', x)} rows={2} />
      <Grid cols={2}>
        <Field label="Email Placeholder" value={n.placeholder} onChange={(x) => setField('newsletter.placeholder', x)} />
        <Field label="Button Text" value={n.buttonText} onChange={(x) => setField('newsletter.buttonText', x)} />
      </Grid>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   PARTNERS
   ════════════════════════════════════════════════════════════ */
function PartnersForm({ data, setField, mutate, arrayActions }: FormProps) {
  const p = data.partners || {};
  const items: any[] = Array.isArray(p.items) ? p.items : [];

  return (
    <div className="space-y-6">
      <Field label="Title" value={p.title} onChange={(x) => setField('partners.title', x)} />

      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900">Partners ({items.length})</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Upload a logo for each partner. If no logo is uploaded, the partner&apos;s name and icon are shown instead.
          </p>
        </div>
        <button
          onClick={() =>
            mutate((d) => {
              if (!Array.isArray(d.partners.items)) d.partners.items = [];
              d.partners.items.push({
                logo: '',
                icon: 'fas fa-handshake',
                label: 'New Partner',
              });
            })
          }
          className="text-xs font-bold text-green-600 hover:text-green-700 whitespace-nowrap"
        >
          <i className="fas fa-plus mr-1" /> Add Partner
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => {
          const a = arrayActions(i, 'partners.items');
          return (
            <div
              key={i}
              className="rounded-xl border border-gray-200 bg-white p-4 space-y-3"
            >
              {/* Header row with reorder / duplicate / delete */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase">
                  Partner {i + 1}
                </span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={a.onMoveUp}
                    disabled={i === 0}
                    className="w-7 h-7 rounded-lg hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center text-gray-500"
                    title="Move up"
                  >
                    <i className="fas fa-arrow-up text-xs" />
                  </button>
                  <button
                    type="button"
                    onClick={a.onMoveDown}
                    disabled={i === items.length - 1}
                    className="w-7 h-7 rounded-lg hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center text-gray-500"
                    title="Move down"
                  >
                    <i className="fas fa-arrow-down text-xs" />
                  </button>
                  <button
                    type="button"
                    onClick={a.onDuplicate}
                    className="w-7 h-7 rounded-lg hover:bg-blue-50 text-blue-500 flex items-center justify-center"
                    title="Duplicate"
                  >
                    <i className="fas fa-copy text-xs" />
                  </button>
                  <button
                    type="button"
                    onClick={a.onRemove}
                    className="w-7 h-7 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center"
                    title="Remove"
                  >
                    <i className="fas fa-trash-alt text-xs" />
                  </button>
                </div>
              </div>

              {/* Name + fallback icon */}
              <Grid cols={2}>
                <Field
                  label="Partner Name"
                  value={item.label}
                  onChange={(x) => setField(`partners.items[${i}].label`, x)}
                  help="Used as the logo's alt text, or shown directly if no logo."
                />
                <Field
                  label="Fallback Icon (Font Awesome)"
                  value={item.icon}
                  onChange={(x) => setField(`partners.items[${i}].icon`, x)}
                  mono
                  help="Shown when no logo is uploaded. e.g. fas fa-handshake"
                />
              </Grid>

              {/* Logo upload */}
              <FileUpload
                label="Partner Logo (optional)"
                value={item.logo || ''}
                onChange={(x) => setField(`partners.items[${i}].logo`, x)}
                help="PNG or SVG with transparent background. Recommended ~200×80px."
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   CTA
   ════════════════════════════════════════════════════════════ */
function CtaForm({ data, setField }: { data: any; setField: FormProps['setField'] }) {
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

/* ════════════════════════════════════════════════════════════
   CONTACT
   ════════════════════════════════════════════════════════════ */
function ContactForm({ data, setField }: { data: any; setField: FormProps['setField'] }) {
  const c = data.contact || {};

  return (
    <div className="space-y-6">
      {/* ─── Section heading ──────────────────────────────── */}
      <Grid cols={2}>
        <Field label="Eyebrow" value={c.eyebrow} onChange={(x) => setField('contact.eyebrow', x)} />
        <Field label="Title" value={c.title} onChange={(x) => setField('contact.title', x)} />
        <Field label="Title Accent" value={c.titleAccent} onChange={(x) => setField('contact.titleAccent', x)} />
        <Field label="Subtitle" value={c.subtitle} onChange={(x) => setField('contact.subtitle', x)} />
      </Grid>

      {/* ─── Contact details ──────────────────────────────── */}
      <div className="rounded-xl border border-gray-200 p-4 space-y-3">
        <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <i className="fas fa-address-card text-green-600" /> Contact Details
        </p>
        <Grid cols={2}>
          <Field
            label="Head Office Title"
            value={c.headOfficeTitle}
            onChange={(x) => setField('contact.headOfficeTitle', x)}
          />
          <Field
            label="Head Office Text"
            value={c.headOfficeText}
            onChange={(x) => setField('contact.headOfficeText', x)}
          />
          <Field
            label="Field Offices Title"
            value={c.fieldOfficesTitle}
            onChange={(x) => setField('contact.fieldOfficesTitle', x)}
          />
          <Field
            label="Field Offices Text"
            value={c.fieldOfficesText}
            onChange={(x) => setField('contact.fieldOfficesText', x)}
          />
          <Field
            label="Phone"
            value={c.phone}
            onChange={(x) => setField('contact.phone', x)}
          />
          <Field
            label="Email"
            value={c.email}
            onChange={(x) => setField('contact.email', x)}
          />
          <Field
            label="Office Hours"
            value={c.hoursText}
            onChange={(x) => setField('contact.hoursText', x)}
          />
        </Grid>
      </div>

      {/* ─── Info banner about form ───────────────────────── */}
      <InfoBanner>
        The contact <strong>form</strong> lives on the dedicated <code>/contact</code> page.
        When you're ready to build it, its fields will be managed from a separate admin section.
      </InfoBanner>
    </div>
  );
}