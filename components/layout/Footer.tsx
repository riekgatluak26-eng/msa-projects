'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const FALLBACK = {
  aboutText:
    'A legally registered National Organisation empowering communities and Local Governments in South Sudan through Education, Health, Resilience & Recovery, Governance, Protection and Media programs — for a sustainable future.',
  trustBadges: [
    { icon: 'fas fa-shield-halved', text: 'Registered NGO' },
    { icon: 'fas fa-calendar-check', text: 'Since 2000' },
    { icon: 'fas fa-handshake', text: 'Oxfam Novib Partner' },
  ],
  newsletterTitle: 'Stay connected',
  newsletterSubtitle:
    'Get impact stories, programme updates and partnership opportunities straight to your inbox.',
  officeLocations: [
    { label: 'Head Office', city: 'Juba', accent: 'gold' },
    { label: 'Field Office', city: 'Maridi', accent: 'brand' },
    { label: 'Field Office', city: 'Aweil', accent: 'brand' },
    { label: 'Field Office', city: 'Yei', accent: 'brand' },
  ],
  columns: [],
  contacts: [
    { label: 'Head Office', value: 'Juba, South Sudan', icon: 'fas fa-map-marker-alt', accent: 'brand' },
    { label: 'Field Offices', value: 'Maridi • Aweil • Yei', icon: 'fas fa-building', accent: 'gold' },
    { label: 'Phone', value: '+211 925 784 075', href: 'tel:+211925784075', icon: 'fas fa-phone', accent: 'brand' },
    { label: 'Email', value: 'info@msasouthsudan.org', href: 'mailto:info@msasouthsudan.org', icon: 'fas fa-envelope', accent: 'brand' },
    { label: 'Office Hours', value: 'Mon – Fri, 8:00 – 17:00', icon: 'fas fa-clock', accent: 'brand' },
  ],
  socialLinks: [
    { icon: 'fab fa-facebook-f', label: 'Facebook', url: '#', color: 'brand' },
    { icon: 'fab fa-instagram', label: 'Instagram', url: '#', color: 'pink' },
    { icon: 'fab fa-x-twitter', label: 'X', url: '#', color: 'blue' },
    { icon: 'fab fa-whatsapp', label: 'WhatsApp', url: '#', color: 'green' },
    { icon: 'fab fa-youtube', label: 'YouTube', url: '#', color: 'red' },
  ],
  copyrightText: 'Mission for Sustainable Advancement (MSA). All rights reserved.',
  legalLinks: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Use', href: '#' },
    { label: 'Cookies', href: '#' },
    { label: 'Safeguarding', href: '#' },
  ],
  legalText:
    'MSA is a legally registered National Organisation operating in South Sudan.',
};

export default function Footer() {
  const [footer, setFooter] = useState<any>(FALLBACK);
  const [site, setSite] = useState<any>({});

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((d) => {
        if (d?.footer) setFooter({ ...FALLBACK, ...d.footer });
        if (d?.site) setSite(d.site);
      })
      .catch(() => {});
  }, []);

  const accentMap: Record<string, string> = {
    brand: '#078930',
    gold: '#FFD100',
    navy: '#0033A0',
    red: '#DA291C',
  };

  const contactAccentMap: Record<string, { bg: string; border: string; text: string }> = {
    brand: { bg: 'rgba(7,137,48,.15)', border: 'rgba(7,137,48,.3)', text: '#4ade80' },
    gold: { bg: 'rgba(255,209,0,.15)', border: 'rgba(255,209,0,.3)', text: '#FFD100' },
    navy: { bg: 'rgba(0,51,160,.15)', border: 'rgba(0,51,160,.3)', text: '#60a5fa' },
    red: { bg: 'rgba(218,41,28,.15)', border: 'rgba(218,41,28,.3)', text: '#f87171' },
  };

  return (
    <footer
      style={{
        background: '#0f0f1a',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="flag-bar" />

      <div style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }}>
        <div className="orb" style={{ width: 384, height: 384, background: 'rgba(7,137,48,.4)', top: -128, left: -80 }} />
        <div className="orb" style={{ width: 320, height: 320, background: 'rgba(0,51,160,.4)', bottom: -96, right: 0, animationDelay: '6s' }} />
      </div>

      <div
        className="container"
        style={{ position: 'relative', paddingTop: 80, paddingBottom: 40, zIndex: 1 }}
      >
        {/* Top: brand + newsletter */}
        <div
          className="grid lg:grid-cols-12"
          style={{ gap: 40, paddingBottom: 56, borderBottom: '1px solid rgba(255,255,255,0.1)' }}
        >
          {/* Brand */}
          <div className="lg:col-span-5">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: site?.logo ? '#fff' : 'linear-gradient(135deg, #078930, #0033A0)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 30px rgba(7,137,48,0.35)',
                  overflow: 'hidden',
                }}
              >
                {site?.logo ? (
                  <img src={site.logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.5px' }}>
                    {site?.shortName || 'MSA'}
                  </span>
                )}
              </div>
              <div>
                <h3 style={{ fontWeight: 800, fontSize: 18, lineHeight: 1.15, margin: 0 }}>
                  {site?.name || 'Mission for Sustainable Advancement'}
                </h3>
                <p style={{ color: '#4ade80', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', margin: 0 }}>
                  {(site?.tagline || 'Empowering Communities').toUpperCase()} • SOUTH SUDAN 🇸🇸
                </p>
              </div>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 24, fontSize: 14, maxWidth: 420 }}>
              {footer.aboutText}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {(footer.trustBadges || []).map((b: any, i: number) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 12px',
                    borderRadius: 999,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  <i className={b.icon} style={{ color: '#4ade80' }} />
                  {b.text}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {(footer.socialLinks || []).map((s: any, i: number) => (
                <a
                  key={i}
                  href={s.url || '#'}
                  aria-label={s.label}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 14,
                    transition: 'all 0.3s',
                  }}
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-7" style={{ paddingLeft: 40, borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
            <h4 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
              {footer.newsletterTitle}
            </h4>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 24 }}>
              {footer.newsletterSubtitle}
            </p>

            <form
              style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="you@example.com"
                required
                style={{
                  flex: 1,
                  minWidth: 200,
                  padding: '14px 20px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: 14,
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '14px 28px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #078930, #067527)',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  whiteSpace: 'nowrap',
                }}
              >
                Subscribe
              </button>
            </form>

            <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: 12 }}>
              {(footer.officeLocations || []).map((o: any, i: number) => {
                const c = accentMap[o.accent] || accentMap.brand;
                return (
                  <div
                    key={i}
                    style={{
                      borderRadius: 12,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      padding: 12,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: c }} />
                      <p style={{ fontSize: 10, fontWeight: 800, color: c, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                        {o.label}
                      </p>
                    </div>
                    <p style={{ fontSize: 12, fontWeight: 700, margin: 0 }}>{o.city}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Middle: link columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 40, paddingTop: 56, paddingBottom: 56 }}>
          {(footer.columns || []).map((col: any, ci: number) => {
            const accent = accentMap[col.accent] || accentMap.brand;
            return (
              <div key={ci}>
                <h4
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: 24,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ width: 24, height: 2, background: accent, marginRight: 12 }} />
                  {col.title}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {(col.links || []).map((l: any, li: number) => (
                    <li key={li}>
                      <Link href={l.href} className="msa-footer-link">
                        {l.icon ? (
                          <i className={l.icon} style={{ marginRight: 8, fontSize: 12 }} />
                        ) : (
                          <i className="fas fa-chevron-right" style={{ fontSize: 9, color: '#4ade80', marginRight: 8 }} />
                        )}
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Contact column */}
          <div>
            <h4
              style={{
                fontSize: 13,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 24,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span style={{ width: 24, height: 2, background: '#DA291C', marginRight: 12 }} />
              Contact Us
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {(footer.contacts || []).map((c: any, i: number) => {
                const ac = contactAccentMap[c.accent] || contactAccentMap.brand;
                return (
                  <li key={i} style={{ display: 'flex', gap: 12 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: ac.bg,
                        border: `1px solid ${ac.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: ac.text,
                        fontSize: 13,
                        flexShrink: 0,
                      }}
                    >
                      <i className={c.icon} />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: 10,
                          fontWeight: 800,
                          color: ac.text,
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          marginBottom: 2,
                        }}
                      >
                        {c.label}
                      </p>
                      {c.href ? (
                        <a href={c.href} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                          {c.value}
                        </a>
                      ) : (
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, margin: 0 }}>{c.value}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 20, alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, margin: 0 }}>
              © {new Date().getFullYear()} {footer.copyrightText}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, fontSize: 13 }}>
              {(footer.legalLinks || []).map((l: any, i: number) => (
                <a key={i} href={l.href} style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
                  {l.label}
                </a>
              ))}
            </div>

            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, margin: 0, display: 'flex', alignItems: 'center' }}>
              Made with{' '}
              <i className="fas fa-heart" style={{ color: '#DA291C', margin: '0 6px', animation: 'pulse 2s infinite' }} />{' '}
              for South Sudan 🇸🇸
            </p>
          </div>

          {footer.legalText && (
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, lineHeight: 1.7, maxWidth: 780, margin: '0 auto' }}>
                {footer.legalText}
              </p>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}