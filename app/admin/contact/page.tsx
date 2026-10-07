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

type SectionAccent = 'green' | 'blue' | 'amber' | 'red' | 'purple';

type Section = {
  id: string;
  label: string;
  icon: string;
  accent: SectionAccent;
  description: string;
};

const SECTIONS: Section[] = [
  { id: 'hero',    label: 'Hero',            icon: 'fas fa-image',          accent: 'blue',   description: 'Top banner with title and quick-contact pills.' },
  { id: 'details', label: 'Contact Details', icon: 'fas fa-map-location-dot', accent: 'green', description: 'Offices, phone, email, hours and socials.' },
  { id: 'form',    label: 'Contact Form',    icon: 'fas fa-paper-plane',    accent: 'amber',  description: 'Form labels, interests and success text.' },
  { id: 'map',     label: 'Map',             icon: 'fas fa-map-marked-alt', accent: 'green',  description: 'Google Maps embed and directions link.' },
  { id: 'faq',     label: 'FAQ',             icon: 'fas fa-circle-question', accent: 'purple', description: 'Frequently asked questions.' },
  { id: 'cta',     label: 'Bottom CTA',      icon: 'fas fa-bullhorn',       accent: 'red',    description: 'Bottom banner with two buttons.' },
];

function clone<T>(v: T): T { return JSON.parse(JSON.stringify(v)); }

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

export default function ContactEditor() {
  const [data, setData] = useState<any>(null);
  const [active, setActive] = useState<string>('hero');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);
  const [dirty, setDirty] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    fetch('/api/contact')
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
      const res = await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        let msg = `Save failed (${res.status})`;
        try { const b = await res.json(); if (b?.error) msg = b.error; } catch {}
        throw new Error(msg);
      }
      showToast('ok', 'Contact page saved!');
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
          <h2 className="text-lg font-bold text-gray-900 mb-2">Could not load Contact page</h2>
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
            <span>Contact</span>
          </div>
          <h1 className="text-lg font-bold text-gray-900">Edit Contact Page</h1>
        </div>
        <div className="flex items-center gap-3">
          {dirty && (
            <span className="hidden sm:flex text-xs font-semibold text-amber-600 items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Unsaved changes
            </span>
          )}
          <Link href="/contact" target="_blank" className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100">
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
    case 'hero':    return <HeroForm data={data} setField={setField} />;
    case 'details': return <DetailsForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'form':    return <FormForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'map':     return <MapForm data={data} setField={setField} />;
    case 'faq':     return <FaqForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'cta':     return <CtaForm data={data} setField={setField} />;
    default:        return null;
  }
}

type FormProps = {
  data: any;
  setField: (p: string, v: any) => void;
  mutate: (fn: (d: any) => void) => void;
  arrayActions: (i: number, path: string) => any;
};

/* HERO */
function HeroForm({ data, setField }: { data: any; setField: any }) {
  const h = data.hero || {};
  return (
    <div className="space-y-6">
      <InfoBanner>Top banner of the contact page.</InfoBanner>
      <Field label="Eyebrow" value={h.eyebrow} onChange={(v) => setField('hero.eyebrow', v)} />
      <Grid cols={2}>
        <Field label="Title" value={h.title} onChange={(v) => setField('hero.title', v)} />
        <Field label="Title Accent (gold)" value={h.titleAccent} onChange={(v) => setField('hero.titleAccent', v)} />
      </Grid>
      <TextArea label="Subtitle" value={h.subtitle} onChange={(v) => setField('hero.subtitle', v)} rows={3} />
    </div>
  );
}

/* DETAILS */
function DetailsForm({ data, setField, mutate, arrayActions }: FormProps) {
  const d = data.details || {};
  const offices: any[] = Array.isArray(d.offices) ? d.offices : [];
  const socials: any[] = Array.isArray(d.socials) ? d.socials : [];

  return (
    <div className="space-y-6">
      <Grid cols={3}>
        <Field label="Eyebrow" value={d.eyebrow} onChange={(v) => setField('details.eyebrow', v)} />
        <Field label="Title" value={d.title} onChange={(v) => setField('details.title', v)} />
        <Field label="Title Accent" value={d.titleAccent} onChange={(v) => setField('details.titleAccent', v)} />
      </Grid>
      <TextArea label="Subtitle" value={d.subtitle} onChange={(v) => setField('details.subtitle', v)} rows={2} />

      {/* Offices */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-gray-900">Office Locations ({offices.length})</h3>
            <p className="text-xs text-gray-500 mt-0.5">Each office shows as a card.</p>
          </div>
          <button
            onClick={() => mutate((x: any) => {
              if (!Array.isArray(x.details.offices)) x.details.offices = [];
              x.details.offices.push({
                icon: 'fas fa-building', color: 'brand', label: 'Field Office',
                city: 'New City', address: 'Location', note: '',
              });
            })}
            className="text-xs font-bold text-green-600 hover:text-green-700"
          >
            <i className="fas fa-plus mr-1" /> Add Office
          </button>
        </div>
        <div className="space-y-3">
          {offices.map((o, i) => {
            const a = arrayActions(i, 'details.offices');
            return (
              <ItemCard key={i} index={i} title={`${o.label} · ${o.city}`} canMoveUp={i > 0} canMoveDown={i < offices.length - 1} {...a}>
                <Grid cols={2}>
                  <Field label="Icon" value={o.icon} onChange={(v) => setField(`details.offices[${i}].icon`, v)} mono />
                  <Select label="Color" value={o.color} onChange={(v) => setField(`details.offices[${i}].color`, v)} options={COLOR_OPTIONS} />
                  <Field label="Label" value={o.label} onChange={(v) => setField(`details.offices[${i}].label`, v)} help='e.g. "Head Office"' />
                  <Field label="City" value={o.city} onChange={(v) => setField(`details.offices[${i}].city`, v)} />
                </Grid>
                <TextArea label="Address" value={o.address} onChange={(v) => setField(`details.offices[${i}].address`, v)} rows={2} />
                <Field label="Note (optional)" value={o.note} onChange={(v) => setField(`details.offices[${i}].note`, v)} />
              </ItemCard>
            );
          })}
        </div>
      </div>

      {/* Contact row */}
      <div className="pt-4 border-t border-gray-100 space-y-3">
        <p className="text-sm font-bold text-gray-900">Phone & Email</p>
        <Grid cols={2}>
          <Field label="Primary Phone" value={d.phone} onChange={(v) => setField('details.phone', v)} />
          <Field label="Phone Link" value={d.phoneLink} onChange={(v) => setField('details.phoneLink', v)} mono help="e.g. tel:+211..." />
          <Field label="Secondary Phone (optional)" value={d.phoneAlt} onChange={(v) => setField('details.phoneAlt', v)} />
          <Field label="Primary Email" value={d.email} onChange={(v) => setField('details.email', v)} />
          <Field label="Email Link" value={d.emailLink} onChange={(v) => setField('details.emailLink', v)} mono help="e.g. mailto:info@..." />
          <Field label="Secondary Email (optional)" value={d.emailAlt} onChange={(v) => setField('details.emailAlt', v)} />
        </Grid>
        <Grid cols={2}>
          <Field label="Office Hours" value={d.hoursText} onChange={(v) => setField('details.hoursText', v)} />
          <Field label="Hours Note" value={d.hoursNote} onChange={(v) => setField('details.hoursNote', v)} />
        </Grid>
      </div>

      {/* Socials */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">Social Icons ({socials.length})</h3>
          <button
            onClick={() => mutate((x: any) => {
              if (!Array.isArray(x.details.socials)) x.details.socials = [];
              x.details.socials.push({ icon: 'fab fa-facebook-f', label: 'Facebook', url: '#' });
            })}
            className="text-xs font-bold text-green-600 hover:text-green-700"
          >
            <i className="fas fa-plus mr-1" /> Add Social
          </button>
        </div>
        <div className="space-y-2">
          {socials.map((s, i) => {
            const a = arrayActions(i, 'details.socials');
            return (
              <div key={i} className="flex gap-2 items-end rounded-lg border border-gray-200 bg-white p-3">
                <div className="flex-1 grid grid-cols-3 gap-3">
                  <Field label="Icon" value={s.icon} onChange={(v) => setField(`details.socials[${i}].icon`, v)} mono />
                  <Field label="Label" value={s.label} onChange={(v) => setField(`details.socials[${i}].label`, v)} />
                  <Field label="URL" value={s.url} onChange={(v) => setField(`details.socials[${i}].url`, v)} mono />
                </div>
                <div className="flex gap-1 pb-2">
                  <button onClick={a.onRemove} className="w-7 h-7 rounded hover:bg-red-50 text-red-500 flex items-center justify-center"><i className="fas fa-trash-alt text-xs" /></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* FORM */
function FormForm({ data, setField, mutate, arrayActions }: FormProps) {
  const f = data.form || {};
  const fields = f.fields || {};
  const interestOptions: string[] = Array.isArray(f.interestOptions) ? f.interestOptions : [];

  return (
    <div className="space-y-6">
      <InfoBanner>
        Customize the labels and options in the contact form. The form sends submissions via Web3Forms.
      </InfoBanner>

      <Grid cols={2}>
        <Field label="Eyebrow" value={f.eyebrow} onChange={(v) => setField('form.eyebrow', v)} />
        <Field label="Title" value={f.title} onChange={(v) => setField('form.title', v)} />
        <Field label="Title Accent" value={f.titleAccent} onChange={(v) => setField('form.titleAccent', v)} />
        <Field label="Submit Button" value={f.submitText} onChange={(v) => setField('form.submitText', v)} />
      </Grid>
      <TextArea label="Subtitle" value={f.subtitle} onChange={(v) => setField('form.subtitle', v)} rows={2} />

      <div className="rounded-xl border border-gray-200 p-4 space-y-3">
        <p className="text-sm font-bold text-gray-900">Success Message</p>
        <Field label="Success Title" value={f.successTitle} onChange={(v) => setField('form.successTitle', v)} />
        <TextArea label="Success Text" value={f.successText} onChange={(v) => setField('form.successText', v)} rows={2} />
      </div>

      <div className="rounded-xl border border-gray-200 p-4 space-y-3">
        <p className="text-sm font-bold text-gray-900">Field Labels</p>
        <Grid cols={2}>
          <Field label="First Name" value={fields.firstName} onChange={(v) => setField('form.fields.firstName', v)} />
          <Field label="Last Name" value={fields.lastName} onChange={(v) => setField('form.fields.lastName', v)} />
          <Field label="Email" value={fields.email} onChange={(v) => setField('form.fields.email', v)} />
          <Field label="Phone" value={fields.phone} onChange={(v) => setField('form.fields.phone', v)} />
          <Field label="Organization" value={fields.organization} onChange={(v) => setField('form.fields.organization', v)} />
          <Field label="Interest" value={fields.interest} onChange={(v) => setField('form.fields.interest', v)} />
          <Field label="Subject" value={fields.subject} onChange={(v) => setField('form.fields.subject', v)} />
          <Field label="Message" value={fields.message} onChange={(v) => setField('form.fields.message', v)} />
        </Grid>
        <Field label="Message Placeholder" value={fields.messagePlaceholder} onChange={(v) => setField('form.fields.messagePlaceholder', v)} />
      </div>

      <div className="rounded-xl border border-gray-200 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-gray-900">Interest Options ({interestOptions.length})</p>
          <button
            onClick={() => mutate((x: any) => {
              if (!Array.isArray(x.form.interestOptions)) x.form.interestOptions = [];
              x.form.interestOptions.push('New Option');
            })}
            className="text-xs font-bold text-green-600 hover:text-green-700"
          >
            <i className="fas fa-plus mr-1" /> Add
          </button>
        </div>
        <div className="space-y-2">
          {interestOptions.map((o, i) => (
            <div key={i} className="flex gap-2 items-end">
              <div className="flex-1">
                <Field
                  label={`Option ${i + 1}`}
                  value={o}
                  onChange={(v) => setField(`form.interestOptions[${i}]`, v)}
                />
              </div>
              <button
                onClick={() => mutate((x: any) => x.form.interestOptions.splice(i, 1))}
                className="w-9 h-9 mb-0.5 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center"
              >
                <i className="fas fa-times text-xs" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-amber-50 border border-amber-100 p-4 space-y-3">
        <p className="text-sm font-bold text-amber-900 flex items-center gap-2">
          <i className="fas fa-key" /> Web3Forms Key
        </p>
        <Field
          label="Access Key"
          value={f.web3formsKey}
          onChange={(v) => setField('form.web3formsKey', v)}
          mono
          help="Get a free key from web3forms.com so the form sends emails to you."
        />
      </div>
    </div>
  );
}

/* MAP */
function MapForm({ data, setField }: { data: any; setField: any }) {
  const m = data.map || {};
  return (
    <div className="space-y-6">
      <InfoBanner>
        The map uses a Google Maps embed. To change the location, open Google Maps, search
        for your address, click <strong>Share</strong> → <strong>Embed a map</strong> → copy
        the <code>src</code> URL, and paste it below.
      </InfoBanner>
      <Grid cols={3}>
        <Field label="Eyebrow" value={m.eyebrow} onChange={(v) => setField('map.eyebrow', v)} />
        <Field label="Title" value={m.title} onChange={(v) => setField('map.title', v)} />
        <Field label="Title Accent" value={m.titleAccent} onChange={(v) => setField('map.titleAccent', v)} />
      </Grid>
      <TextArea label="Subtitle" value={m.subtitle} onChange={(v) => setField('map.subtitle', v)} rows={2} />
      <TextArea
        label="Google Maps Embed URL"
        value={m.embedUrl}
        onChange={(v) => setField('map.embedUrl', v)}
        rows={5}
        mono
        help="The full https://www.google.com/maps/embed?... URL from Google Maps."
      />
      <Grid cols={2}>
        <Field label="Directions Button Text" value={m.directionsText} onChange={(v) => setField('map.directionsText', v)} />
        <Field label="Directions Link" value={m.directionsLink} onChange={(v) => setField('map.directionsLink', v)} mono />
      </Grid>
    </div>
  );
}

/* FAQ */
function FaqForm({ data, setField, mutate, arrayActions }: FormProps) {
  const f = data.faq || {};
  const items: any[] = Array.isArray(f.items) ? f.items : [];
  return (
    <div className="space-y-6">
      <Grid cols={3}>
        <Field label="Eyebrow" value={f.eyebrow} onChange={(v) => setField('faq.eyebrow', v)} />
        <Field label="Title" value={f.title} onChange={(v) => setField('faq.title', v)} />
        <Field label="Title Accent" value={f.titleAccent} onChange={(v) => setField('faq.titleAccent', v)} />
      </Grid>
      <TextArea label="Subtitle" value={f.subtitle} onChange={(v) => setField('faq.subtitle', v)} rows={2} />

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <h3 className="font-bold text-gray-900">Questions ({items.length})</h3>
        <button
          onClick={() => mutate((x: any) => {
            if (!Array.isArray(x.faq.items)) x.faq.items = [];
            x.faq.items.push({ question: 'New question?', answer: 'Answer goes here.' });
          })}
          className="text-xs font-bold text-green-600 hover:text-green-700"
        >
          <i className="fas fa-plus mr-1" /> Add Question
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => {
          const a = arrayActions(i, 'faq.items');
          return (
            <ItemCard key={i} index={i} title={item.question || 'Untitled'} canMoveUp={i > 0} canMoveDown={i < items.length - 1} {...a}>
              <Field label="Question" value={item.question} onChange={(v) => setField(`faq.items[${i}].question`, v)} />
              <TextArea label="Answer" value={item.answer} onChange={(v) => setField(`faq.items[${i}].answer`, v)} rows={4} />
            </ItemCard>
          );
        })}
      </div>
    </div>
  );
}

/* CTA */
function CtaForm({ data, setField }: { data: any; setField: any }) {
  const c = data.cta || {};
  return (
    <div className="space-y-6">
      <Field label="Title" value={c.title} onChange={(v) => setField('cta.title', v)} />
      <TextArea label="Text" value={c.text} onChange={(v) => setField('cta.text', v)} rows={3} />
      <Grid cols={2}>
        <Field label="Button 1 Text" value={c.button1Text} onChange={(v) => setField('cta.button1Text', v)} />
        <Field label="Button 1 Link" value={c.button1Link} onChange={(v) => setField('cta.button1Link', v)} mono />
        <Field label="Button 2 Text" value={c.button2Text} onChange={(v) => setField('cta.button2Text', v)} />
        <Field label="Button 2 Link" value={c.button2Link} onChange={(v) => setField('cta.button2Link', v)} mono />
      </Grid>
      <FileUpload label="Background Image" value={c.backgroundImage} onChange={(v) => setField('cta.backgroundImage', v)} />
    </div>
  );
}