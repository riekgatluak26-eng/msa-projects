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
  { id: 'brand',    label: 'Brand & Logo',   icon: 'fas fa-image',         accent: 'green',  description: 'Site name, logo and tagline.' },
  { id: 'header',   label: 'Header & Top Bar', icon: 'fas fa-heading',     accent: 'blue',   description: 'Header logo, brand text, top bar info and CTA.' },
  { id: 'socials',  label: 'Top Bar Socials', icon: 'fas fa-share-nodes',  accent: 'purple', description: 'Icons shown in the top bar.' },
  { id: 'nav',      label: 'Navigation Menu', icon: 'fas fa-bars',         accent: 'amber',  description: 'Main menu links and dropdown items.' },
  { id: 'footer',   label: 'Footer — Content', icon: 'fas fa-align-left',  accent: 'green',  description: 'About text, trust badges, newsletter.' },
  { id: 'columns',  label: 'Footer — Columns', icon: 'fas fa-columns',     accent: 'blue',   description: 'Quick Links, Programs, Get Involved columns.' },
  { id: 'contacts', label: 'Footer — Contact', icon: 'fas fa-address-book', accent: 'red',   description: 'Contact list and office locations.' },
  { id: 'fsocials', label: 'Footer — Socials', icon: 'fab fa-facebook',    accent: 'purple', description: 'Social icons in the footer.' },
  { id: 'legal',    label: 'Footer — Legal',  icon: 'fas fa-gavel',        accent: 'amber',  description: 'Copyright, legal links, registration text.' },
  { id: 'contact',  label: 'Site Contact',    icon: 'fas fa-phone',        accent: 'green',  description: 'Global phone, email, address used across the site.' },
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
export default function SettingsEditor() {
  const [data, setData] = useState<any>(null);
  const [active, setActive] = useState<string>('brand');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);
  const [dirty, setDirty] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((d) => {
        if (!d || typeof d !== 'object') throw new Error('Bad data');
        // Ensure the top-level shape exists
        const safe: any = {
          site: d.site || {},
          header: d.header || {},
          footer: d.footer || {},
          account: d.account || {},
        };
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
          if (copy.label) copy.label = `${copy.label} (Copy)`;
          arr.splice(i + 1, 0, copy);
        }),
    }),
    [mutate]
  );

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        let errMsg = `Save failed (${res.status})`;
        try {
          const body = await res.json();
          if (body?.error) errMsg = body.error;
        } catch {}
        throw new Error(errMsg);
      }
      showToast('ok', 'Settings saved successfully!');
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
          <p className="text-sm text-gray-500">Loading settings...</p>
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
          <h2 className="text-lg font-bold text-gray-900 mb-2">Could not load settings</h2>
          <p className="text-sm text-gray-500 mb-6">Check your database and try again.</p>
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
            <span>Site Settings</span>
          </div>
          <h1 className="text-lg font-bold text-gray-900">Site Settings</h1>
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

      {/* Toast */}
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

/* ════════════════════════════════════════════════════════════
   ROUTER
   ════════════════════════════════════════════════════════════ */
function renderSection(
  id: string,
  data: any,
  setField: (p: string, v: any) => void,
  mutate: (fn: (d: any) => void) => void,
  arrayActions: any
) {
  switch (id) {
    case 'brand':    return <BrandForm data={data} setField={setField} />;
    case 'header':   return <HeaderForm data={data} setField={setField} />;
    case 'socials':  return <TopSocialsForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'nav':      return <NavForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'footer':   return <FooterContentForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'columns':  return <FooterColumnsForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'contacts': return <FooterContactsForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'fsocials': return <FooterSocialsForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'legal':    return <LegalForm data={data} setField={setField} mutate={mutate} arrayActions={arrayActions} />;
    case 'contact':  return <SiteContactForm data={data} setField={setField} />;
    default:         return null;
  }
}

/* ════════════════════════════════════════════════════════════
   BRAND & LOGO
   ════════════════════════════════════════════════════════════ */
function BrandForm({ data, setField }: { data: any; setField: any }) {
  const s = data.site || {};
  return (
    <div className="space-y-6">
      <InfoBanner>
        These are the primary brand values used across the site. The logo shows in the
        header; if you don&apos;t upload one, the text name is used.
      </InfoBanner>

      <Grid cols={2}>
        <Field label="Site Name (full)" value={s.name} onChange={(v) => setField('site.name', v)} />
        <Field label="Short Name (acronym)" value={s.shortName} onChange={(v) => setField('site.shortName', v)} />
        <Field label="Tagline" value={s.tagline} onChange={(v) => setField('site.tagline', v)} />
        <Field label="Registration" value={s.registration} onChange={(v) => setField('site.registration', v)} />
      </Grid>

      <TextArea label="Site Description" value={s.description} onChange={(v) => setField('site.description', v)} rows={3} />

      <div className="grid md:grid-cols-2 gap-4">
        <FileUpload
          label="Site Logo"
          value={s.logo}
          onChange={(v) => setField('site.logo', v)}
          help="Used in header and footer. Recommended 200×200 PNG with transparency."
        />
        <FileUpload
          label="Favicon"
          value={s.favicon}
          onChange={(v) => setField('site.favicon', v)}
          help="Small icon shown in browser tabs. Recommended 32×32 .ico or .png."
        />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   HEADER
   ════════════════════════════════════════════════════════════ */
function HeaderForm({ data, setField }: { data: any; setField: any }) {
  const h = data.header || {};
  return (
    <div className="space-y-6">
      <Grid cols={2}>
        <Field label="Brand Name Line 1" value={h.brandName} onChange={(v) => setField('header.brandName', v)} />
        <Field label="Brand Tagline Line 2" value={h.brandTagline} onChange={(v) => setField('header.brandTagline', v)} />
      </Grid>

      <FileUpload
        label="Header Logo"
        value={h.logo}
        onChange={(v) => setField('header.logo', v)}
        help="Shown in the header. If empty, falls back to site logo."
      />

      <div className="pt-4 border-t border-gray-100">
        <p className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
          <i className="fas fa-star text-yellow-500" /> CTA Button
        </p>
        <Grid cols={2}>
          <Field label="CTA Text" value={h.ctaText} onChange={(v) => setField('header.ctaText', v)} />
          <Field label="CTA Link" value={h.ctaLink} onChange={(v) => setField('header.ctaLink', v)} mono />
        </Grid>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <p className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
          <i className="fas fa-info-circle text-blue-500" /> Top Bar Contact
        </p>
        <Grid cols={1}>
          <Field label="Phone" value={h.topBarPhone} onChange={(v) => setField('header.topBarPhone', v)} />
          <Field label="Email" value={h.topBarEmail} onChange={(v) => setField('header.topBarEmail', v)} />
          <Field label="Address" value={h.topBarAddress} onChange={(v) => setField('header.topBarAddress', v)} />
        </Grid>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   TOP BAR SOCIALS
   ════════════════════════════════════════════════════════════ */
function TopSocialsForm({ data, setField, mutate, arrayActions }: any) {
  const items: any[] = Array.isArray(data.header?.topBarLinks) ? data.header.topBarLinks : [];
  return (
    <div className="space-y-6">
      <InfoBanner>Small social icons on the right side of the top bar.</InfoBanner>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Icons ({items.length})</h3>
        <button
          onClick={() =>
            mutate((d: any) => {
              if (!d.header.topBarLinks) d.header.topBarLinks = [];
              d.header.topBarLinks.push({ label: 'New', icon: 'fas fa-link', href: '#' });
            })
          }
          className="text-xs font-bold text-green-600 hover:text-green-700"
        >
          <i className="fas fa-plus mr-1" /> Add Icon
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item, i) => {
          const a = arrayActions(i, 'header.topBarLinks');
          return (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-500 uppercase">Icon {i + 1}</span>
                <div className="flex gap-1">
                  <button onClick={a.onMoveUp} disabled={i === 0} className="w-7 h-7 rounded-lg hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center text-gray-500"><i className="fas fa-arrow-up text-xs" /></button>
                  <button onClick={a.onMoveDown} disabled={i === items.length - 1} className="w-7 h-7 rounded-lg hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center text-gray-500"><i className="fas fa-arrow-down text-xs" /></button>
                  <button onClick={a.onDuplicate} className="w-7 h-7 rounded-lg hover:bg-blue-50 text-blue-500 flex items-center justify-center"><i className="fas fa-copy text-xs" /></button>
                  <button onClick={a.onRemove} className="w-7 h-7 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center"><i className="fas fa-trash-alt text-xs" /></button>
                </div>
              </div>
              <Grid cols={2}>
                <Field label="Label" value={item.label} onChange={(x) => setField(`header.topBarLinks[${i}].label`, x)} />
                <Field label="Icon (Font Awesome)" value={item.icon} onChange={(x) => setField(`header.topBarLinks[${i}].icon`, x)} mono help="e.g. fab fa-facebook-f" />
              </Grid>
              <div className="mt-3">
                <Field label="Link URL" value={item.href} onChange={(x) => setField(`header.topBarLinks[${i}].href`, x)} mono />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   NAVIGATION
   ════════════════════════════════════════════════════════════ */
function NavForm({ data, setField, mutate, arrayActions }: any) {
  const links: any[] = Array.isArray(data.header?.navLinks) ? data.header.navLinks : [];

  const addLink = () =>
    mutate((d: any) => {
      if (!d.header.navLinks) d.header.navLinks = [];
      d.header.navLinks.push({ label: 'New Link', href: '/', children: [] });
    });

  return (
    <div className="space-y-6">
      <InfoBanner>
        Main navigation. Links with a dropdown (About, Programs) have <strong>Children</strong>.
        Simple links have none.
      </InfoBanner>

      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Nav Links ({links.length})</h3>
        <button onClick={addLink} className="text-xs font-bold text-green-600 hover:text-green-700">
          <i className="fas fa-plus mr-1" /> Add Link
        </button>
      </div>

      <div className="space-y-3">
        {links.map((link, i) => {
          const a = arrayActions(i, 'header.navLinks');
          const children: any[] = Array.isArray(link.children) ? link.children : [];

          return (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase">Link {i + 1}</span>
                <div className="flex gap-1">
                  <button onClick={a.onMoveUp} disabled={i === 0} className="w-7 h-7 rounded-lg hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center text-gray-500"><i className="fas fa-arrow-up text-xs" /></button>
                  <button onClick={a.onMoveDown} disabled={i === links.length - 1} className="w-7 h-7 rounded-lg hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center text-gray-500"><i className="fas fa-arrow-down text-xs" /></button>
                  <button onClick={a.onDuplicate} className="w-7 h-7 rounded-lg hover:bg-blue-50 text-blue-500 flex items-center justify-center"><i className="fas fa-copy text-xs" /></button>
                  <button onClick={a.onRemove} className="w-7 h-7 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center"><i className="fas fa-trash-alt text-xs" /></button>
                </div>
              </div>

              <Grid cols={2}>
                <Field label="Label" value={link.label} onChange={(x) => setField(`header.navLinks[${i}].label`, x)} />
                <Field label="Href" value={link.href} onChange={(x) => setField(`header.navLinks[${i}].href`, x)} mono />
              </Grid>

              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-gray-600 uppercase">
                    Dropdown Items ({children.length})
                  </p>
                  <button
                    onClick={() =>
                      mutate((d: any) => {
                        if (!Array.isArray(d.header.navLinks[i].children)) d.header.navLinks[i].children = [];
                        d.header.navLinks[i].children.push({ label: 'New Item', href: '#' });
                      })
                    }
                    className="text-xs font-bold text-green-600 hover:text-green-700"
                  >
                    <i className="fas fa-plus mr-1" /> Add Dropdown Item
                  </button>
                </div>

                {children.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">
                    No dropdown items — this is a simple link.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {children.map((c, ci) => (
                      <div key={ci} className="flex gap-2 items-end">
                        <div className="flex-1 grid grid-cols-2 gap-2">
                          <Field
                            label={`Item ${ci + 1} Label`}
                            value={c.label}
                            onChange={(x) => setField(`header.navLinks[${i}].children[${ci}].label`, x)}
                          />
                          <Field
                            label="Href"
                            value={c.href}
                            onChange={(x) => setField(`header.navLinks[${i}].children[${ci}].href`, x)}
                            mono
                          />
                        </div>
                        <button
                          onClick={() =>
                            mutate((d: any) => {
                              d.header.navLinks[i].children.splice(ci, 1);
                            })
                          }
                          className="w-9 h-9 mb-0.5 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center"
                          title="Remove dropdown item"
                        >
                          <i className="fas fa-times text-xs" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   FOOTER — Content
   ════════════════════════════════════════════════════════════ */
function FooterContentForm({ data, setField, mutate, arrayActions }: any) {
  const f = data.footer || {};
  const badges: any[] = Array.isArray(f.trustBadges) ? f.trustBadges : [];

  return (
    <div className="space-y-6">
      <TextArea label="About Text" value={f.aboutText} onChange={(x) => setField('footer.aboutText', x)} rows={4} />

      <div className="pt-4 border-t border-gray-100 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-gray-900">Trust Badges ({badges.length})</p>
          <button
            onClick={() =>
              mutate((d: any) => {
                if (!Array.isArray(d.footer.trustBadges)) d.footer.trustBadges = [];
                d.footer.trustBadges.push({ icon: 'fas fa-check', text: 'New Badge' });
              })
            }
            className="text-xs font-bold text-green-600 hover:text-green-700"
          >
            <i className="fas fa-plus mr-1" /> Add Badge
          </button>
        </div>

        <div className="space-y-2">
          {badges.map((b, i) => {
            const a = arrayActions(i, 'footer.trustBadges');
            return (
              <div key={i} className="flex gap-2 items-end rounded-lg border border-gray-200 bg-white p-3">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <Field label="Icon" value={b.icon} onChange={(x) => setField(`footer.trustBadges[${i}].icon`, x)} mono />
                  <Field label="Text" value={b.text} onChange={(x) => setField(`footer.trustBadges[${i}].text`, x)} />
                </div>
                <div className="flex gap-1 pb-2">
                  <button onClick={a.onDuplicate} className="w-7 h-7 rounded hover:bg-blue-50 text-blue-500 flex items-center justify-center"><i className="fas fa-copy text-xs" /></button>
                  <button onClick={a.onRemove} className="w-7 h-7 rounded hover:bg-red-50 text-red-500 flex items-center justify-center"><i className="fas fa-trash-alt text-xs" /></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 space-y-4">
        <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <i className="fas fa-envelope text-green-600" /> Newsletter Box
        </p>
        <Field label="Title" value={f.newsletterTitle} onChange={(x) => setField('footer.newsletterTitle', x)} />
        <TextArea label="Subtitle" value={f.newsletterSubtitle} onChange={(x) => setField('footer.newsletterSubtitle', x)} rows={2} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   FOOTER — Columns
   ════════════════════════════════════════════════════════════ */
function FooterColumnsForm({ data, setField, mutate, arrayActions }: any) {
  const columns: any[] = Array.isArray(data.footer?.columns) ? data.footer.columns : [];

  return (
    <div className="space-y-6">
      <InfoBanner>
        Each column has a title and a list of links. The Programs column links usually
        include an icon.
      </InfoBanner>

      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Columns ({columns.length})</h3>
        <button
          onClick={() =>
            mutate((d: any) => {
              if (!Array.isArray(d.footer.columns)) d.footer.columns = [];
              d.footer.columns.push({ title: 'New Column', accent: 'brand', links: [] });
            })
          }
          className="text-xs font-bold text-green-600 hover:text-green-700"
        >
          <i className="fas fa-plus mr-1" /> Add Column
        </button>
      </div>

      <div className="space-y-3">
        {columns.map((col, ci) => {
          const a = arrayActions(ci, 'footer.columns');
          const links: any[] = Array.isArray(col.links) ? col.links : [];

          return (
            <div key={ci} className="rounded-xl border border-gray-200 bg-white p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase">Column {ci + 1}</span>
                <div className="flex gap-1">
                  <button onClick={a.onMoveUp} disabled={ci === 0} className="w-7 h-7 rounded-lg hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center text-gray-500"><i className="fas fa-arrow-up text-xs" /></button>
                  <button onClick={a.onMoveDown} disabled={ci === columns.length - 1} className="w-7 h-7 rounded-lg hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center text-gray-500"><i className="fas fa-arrow-down text-xs" /></button>
                  <button onClick={a.onDuplicate} className="w-7 h-7 rounded-lg hover:bg-blue-50 text-blue-500 flex items-center justify-center"><i className="fas fa-copy text-xs" /></button>
                  <button onClick={a.onRemove} className="w-7 h-7 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center"><i className="fas fa-trash-alt text-xs" /></button>
                </div>
              </div>

              <Grid cols={2}>
                <Field label="Column Title" value={col.title} onChange={(x) => setField(`footer.columns[${ci}].title`, x)} />
                <Select
                  label="Accent Color"
                  value={col.accent}
                  onChange={(x) => setField(`footer.columns[${ci}].accent`, x)}
                  options={[
                    { value: 'brand', label: 'Green' },
                    { value: 'gold', label: 'Gold' },
                    { value: 'navy', label: 'Navy' },
                    { value: 'red', label: 'Red' },
                  ]}
                />
              </Grid>

              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-gray-600 uppercase">Links ({links.length})</p>
                  <button
                    onClick={() =>
                      mutate((d: any) => {
                        if (!Array.isArray(d.footer.columns[ci].links)) d.footer.columns[ci].links = [];
                        d.footer.columns[ci].links.push({ icon: '', label: 'New Link', href: '#' });
                      })
                    }
                    className="text-xs font-bold text-green-600 hover:text-green-700"
                  >
                    <i className="fas fa-plus mr-1" /> Add Link
                  </button>
                </div>

                <div className="space-y-2">
                  {links.map((l, li) => (
                    <div key={li} className="flex gap-2 items-end">
                      <div className="flex-1 grid grid-cols-3 gap-2">
                        <Field
                          label="Label"
                          value={l.label}
                          onChange={(x) => setField(`footer.columns[${ci}].links[${li}].label`, x)}
                        />
                        <Field
                          label="Href"
                          value={l.href}
                          onChange={(x) => setField(`footer.columns[${ci}].links[${li}].href`, x)}
                          mono
                        />
                        <Field
                          label="Icon (optional)"
                          value={l.icon}
                          onChange={(x) => setField(`footer.columns[${ci}].links[${li}].icon`, x)}
                          mono
                          help="e.g. fas fa-graduation-cap"
                        />
                      </div>
                      <button
                        onClick={() =>
                          mutate((d: any) => {
                            d.footer.columns[ci].links.splice(li, 1);
                          })
                        }
                        className="w-9 h-9 mb-0.5 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center"
                        title="Remove link"
                      >
                        <i className="fas fa-times text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   FOOTER — Contacts & Offices
   ════════════════════════════════════════════════════════════ */
function FooterContactsForm({ data, setField, mutate, arrayActions }: any) {
  const contacts: any[] = Array.isArray(data.footer?.contacts) ? data.footer.contacts : [];
  const offices: any[] = Array.isArray(data.footer?.officeLocations) ? data.footer.officeLocations : [];

  return (
    <div className="space-y-6">
      {/* Office locations strip */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-gray-900">Office Locations ({offices.length})</h3>
            <p className="text-xs text-gray-500 mt-0.5">Shown as a compact grid in the footer.</p>
          </div>
          <button
            onClick={() =>
              mutate((d: any) => {
                if (!Array.isArray(d.footer.officeLocations)) d.footer.officeLocations = [];
                d.footer.officeLocations.push({ label: 'Field Office', city: 'New City', accent: 'brand' });
              })
            }
            className="text-xs font-bold text-green-600 hover:text-green-700"
          >
            <i className="fas fa-plus mr-1" /> Add Office
          </button>
        </div>

        <div className="space-y-2">
          {offices.map((o, i) => {
            const a = arrayActions(i, 'footer.officeLocations');
            return (
              <div key={i} className="flex gap-2 items-end rounded-lg border border-gray-200 bg-white p-3">
                <div className="flex-1 grid grid-cols-3 gap-3">
                  <Field label="Label" value={o.label} onChange={(x) => setField(`footer.officeLocations[${i}].label`, x)} />
                  <Field label="City" value={o.city} onChange={(x) => setField(`footer.officeLocations[${i}].city`, x)} />
                  <Select
                    label="Accent"
                    value={o.accent}
                    onChange={(x) => setField(`footer.officeLocations[${i}].accent`, x)}
                    options={[
                      { value: 'gold', label: 'Gold' },
                      { value: 'brand', label: 'Green' },
                      { value: 'navy', label: 'Navy' },
                    ]}
                  />
                </div>
                <div className="flex gap-1 pb-2">
                  <button onClick={a.onDuplicate} className="w-7 h-7 rounded hover:bg-blue-50 text-blue-500 flex items-center justify-center"><i className="fas fa-copy text-xs" /></button>
                  <button onClick={a.onRemove} className="w-7 h-7 rounded hover:bg-red-50 text-red-500 flex items-center justify-center"><i className="fas fa-trash-alt text-xs" /></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contacts list */}
      <div className="pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-gray-900">Contact List ({contacts.length})</h3>
            <p className="text-xs text-gray-500 mt-0.5">Each row shows icon + label + value.</p>
          </div>
          <button
            onClick={() =>
              mutate((d: any) => {
                if (!Array.isArray(d.footer.contacts)) d.footer.contacts = [];
                d.footer.contacts.push({ label: 'New', value: '', icon: 'fas fa-circle-info', accent: 'brand' });
              })
            }
            className="text-xs font-bold text-green-600 hover:text-green-700"
          >
            <i className="fas fa-plus mr-1" /> Add Contact
          </button>
        </div>

        <div className="space-y-2">
          {contacts.map((c, i) => {
            const a = arrayActions(i, 'footer.contacts');
            return (
              <div key={i} className="rounded-lg border border-gray-200 bg-white p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase">Contact {i + 1}</span>
                  <div className="flex gap-1">
                    <button onClick={a.onMoveUp} disabled={i === 0} className="w-6 h-6 rounded hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center"><i className="fas fa-arrow-up text-[10px]" /></button>
                    <button onClick={a.onMoveDown} disabled={i === contacts.length - 1} className="w-6 h-6 rounded hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center"><i className="fas fa-arrow-down text-[10px]" /></button>
                    <button onClick={a.onDuplicate} className="w-6 h-6 rounded hover:bg-blue-100 text-blue-500 flex items-center justify-center"><i className="fas fa-copy text-[10px]" /></button>
                    <button onClick={a.onRemove} className="w-6 h-6 rounded hover:bg-red-100 text-red-500 flex items-center justify-center"><i className="fas fa-trash-alt text-[10px]" /></button>
                  </div>
                </div>
                <Grid cols={2}>
                  <Field label="Label" value={c.label} onChange={(x) => setField(`footer.contacts[${i}].label`, x)} />
                  <Field label="Value" value={c.value} onChange={(x) => setField(`footer.contacts[${i}].value`, x)} />
                  <Field label="Link (optional)" value={c.href} onChange={(x) => setField(`footer.contacts[${i}].href`, x)} mono help="e.g. tel:+211..." />
                  <Field label="Icon" value={c.icon} onChange={(x) => setField(`footer.contacts[${i}].icon`, x)} mono />
                </Grid>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   FOOTER — Socials
   ════════════════════════════════════════════════════════════ */
function FooterSocialsForm({ data, setField, mutate, arrayActions }: any) {
  const items: any[] = Array.isArray(data.footer?.socialLinks) ? data.footer.socialLinks : [];

  return (
    <div className="space-y-6">
      <InfoBanner>
        Large social buttons in the footer brand area. Colored on hover.
      </InfoBanner>

      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Socials ({items.length})</h3>
        <button
          onClick={() =>
            mutate((d: any) => {
              if (!Array.isArray(d.footer.socialLinks)) d.footer.socialLinks = [];
              d.footer.socialLinks.push({ icon: 'fab fa-facebook-f', label: 'Facebook', url: '#', color: 'brand' });
            })
          }
          className="text-xs font-bold text-green-600 hover:text-green-700"
        >
          <i className="fas fa-plus mr-1" /> Add Social
        </button>
      </div>

      <div className="space-y-2">
        {items.map((s, i) => {
          const a = arrayActions(i, 'footer.socialLinks');
          return (
            <div key={i} className="rounded-lg border border-gray-200 bg-white p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase">Social {i + 1}</span>
                <div className="flex gap-1">
                  <button onClick={a.onMoveUp} disabled={i === 0} className="w-6 h-6 rounded hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center"><i className="fas fa-arrow-up text-[10px]" /></button>
                  <button onClick={a.onMoveDown} disabled={i === items.length - 1} className="w-6 h-6 rounded hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center"><i className="fas fa-arrow-down text-[10px]" /></button>
                  <button onClick={a.onDuplicate} className="w-6 h-6 rounded hover:bg-blue-100 text-blue-500 flex items-center justify-center"><i className="fas fa-copy text-[10px]" /></button>
                  <button onClick={a.onRemove} className="w-6 h-6 rounded hover:bg-red-100 text-red-500 flex items-center justify-center"><i className="fas fa-trash-alt text-[10px]" /></button>
                </div>
              </div>
              <Grid cols={2}>
                <Field label="Icon" value={s.icon} onChange={(x) => setField(`footer.socialLinks[${i}].icon`, x)} mono help="e.g. fab fa-facebook-f" />
                <Field label="Label" value={s.label} onChange={(x) => setField(`footer.socialLinks[${i}].label`, x)} />
              </Grid>
              <Field label="URL" value={s.url} onChange={(x) => setField(`footer.socialLinks[${i}].url`, x)} mono />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   LEGAL
   ════════════════════════════════════════════════════════════ */
function LegalForm({ data, setField, mutate, arrayActions }: any) {
  const links: any[] = Array.isArray(data.footer?.legalLinks) ? data.footer.legalLinks : [];

  return (
    <div className="space-y-6">
      <Field label="Copyright Text" value={data.footer?.copyrightText} onChange={(x) => setField('footer.copyrightText', x)} />
      <TextArea label="Registration / Legal Text" value={data.footer?.legalText} onChange={(x) => setField('footer.legalText', x)} rows={3} />

      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">Legal Links ({links.length})</h3>
          <button
            onClick={() =>
              mutate((d: any) => {
                if (!Array.isArray(d.footer.legalLinks)) d.footer.legalLinks = [];
                d.footer.legalLinks.push({ label: 'New Link', href: '#' });
              })
            }
            className="text-xs font-bold text-green-600 hover:text-green-700"
          >
            <i className="fas fa-plus mr-1" /> Add Legal Link
          </button>
        </div>

        <div className="space-y-2">
          {links.map((l, i) => {
            const a = arrayActions(i, 'footer.legalLinks');
            return (
              <div key={i} className="flex gap-2 items-end rounded-lg border border-gray-200 bg-white p-3">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <Field label="Label" value={l.label} onChange={(x) => setField(`footer.legalLinks[${i}].label`, x)} />
                  <Field label="Href" value={l.href} onChange={(x) => setField(`footer.legalLinks[${i}].href`, x)} mono />
                </div>
                <div className="flex gap-1 pb-2">
                  <button onClick={a.onDuplicate} className="w-7 h-7 rounded hover:bg-blue-50 text-blue-500 flex items-center justify-center"><i className="fas fa-copy text-xs" /></button>
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

/* ════════════════════════════════════════════════════════════
   SITE CONTACT
   ════════════════════════════════════════════════════════════ */
function SiteContactForm({ data, setField }: { data: any; setField: any }) {
  const s = data.site || {};
  return (
    <div className="space-y-6">
      <InfoBanner>
        Global contact info used across the site (footer, contact section, structured data).
      </InfoBanner>
      <Grid cols={2}>
        <Field label="Contact Email" value={s.contactEmail} onChange={(v) => setField('site.contactEmail', v)} />
        <Field label="Phone" value={s.phone} onChange={(v) => setField('site.phone', v)} />
        <Field label="WhatsApp" value={s.whatsapp} onChange={(v) => setField('site.whatsapp', v)} />
        <Field label="Address" value={s.address} onChange={(v) => setField('site.address', v)} />
      </Grid>
    </div>
  );
}