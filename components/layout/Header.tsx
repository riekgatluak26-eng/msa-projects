'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const FALLBACK = {
  logo: '/images/msalogo.jpeg',
  brandName: 'Mission for Sustainable',
  brandTagline: 'Advancement • South Sudan',
  ctaText: 'Partner With Us',
  ctaLink: '/contact',
  topBarPhone: '+211 925 784 075',
  topBarEmail: 'info@msasouthsudan.org',
  topBarAddress: 'Maridi Head Office, Western Equatoria State',
  topBarLinks: [
    { label: 'Facebook', icon: 'fab fa-facebook-f', href: '#' },
    { label: 'Instagram', icon: 'fab fa-instagram', href: '#' },
    { label: 'X', icon: 'fab fa-x-twitter', href: '#' },
    { label: 'WhatsApp', icon: 'fab fa-whatsapp', href: '#' },
    { label: 'YouTube', icon: 'fab fa-youtube', href: '#' },
  ],
  navLinks: [
    { label: 'Home', href: '/' },
    {
      label: 'About',
      href: '/about',
      children: [
        { label: 'Who We Are', href: '/about#who' },
        { label: 'Mission & Vision', href: '/about#mission' },
        { label: 'Core Values', href: '/about#values' },
        { label: 'Our Capacity', href: '/about#capacity' },
      ],
    },
    {
      label: 'Programs',
      href: '/programs',
      children: [
        { label: 'Education', href: '/education' },
        { label: 'Health', href: '/programs#health' },
        { label: 'Resilience & Recovery', href: '/programs#resilience' },
        { label: 'Governance', href: '/programs#governance' },
        { label: 'Protection', href: '/programs#protection' },
        { label: 'Information & Media', href: '/programs#media' },
      ],
    },
    { label: 'Impact', href: '/impact' },
    { label: 'News', href: '/news' },
     { label: 'Resources', href: '/resources' },
    { label: 'Contact', href: '/contact' },
  ],
};

export default function Header() {
  const [settings, setSettings] = useState<any>(FALLBACK);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  /* ── Load settings ────────────────────────────────────── */
  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((d) => {
        if (d?.header) {
          setSettings({
            ...FALLBACK,
            ...d.header,
            topBarLinks:
              Array.isArray(d.header.topBarLinks) && d.header.topBarLinks.length > 0
                ? d.header.topBarLinks
                : FALLBACK.topBarLinks,
            navLinks:
              Array.isArray(d.header.navLinks) && d.header.navLinks.length > 0
                ? d.header.navLinks
                : FALLBACK.navLinks,
          });
        }
      })
      .catch(() => {});
  }, []);

  /* ── Scroll state ─────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Body lock while mobile open ──────────────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  /* ── Escape closes ────────────────────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  /* ── Outside click closes dropdowns ───────────────────── */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current) return;
      if (!headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const linkColor = scrolled ? '#1a1a2e' : 'rgba(255,255,255,0.9)';
  const linkHover = '#078930';
  const phoneHref = `tel:${(settings.topBarPhone || '').replace(/[^0-9+]/g, '')}`;

  return (
    <header
      ref={headerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
      }}
    >
      {/* Top bar */}
      <div
        style={{
          background: '#0f0f1a',
          color: 'rgba(255,255,255,0.6)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          maxHeight: scrolled ? 0 : 60,
          opacity: scrolled ? 0 : 1,
          overflow: 'hidden',
          transition: 'max-height 0.4s ease, opacity 0.3s ease',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 40,
              fontSize: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              {settings.topBarAddress && (
                <a
                  href={`https://www.google.com/maps?q=${encodeURIComponent(settings.topBarAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'inherit' }}
                >
                  <i className="fas fa-map-marker-alt" style={{ color: '#4ade80' }} />
                  <span>{settings.topBarAddress}</span>
                </a>
              )}
              {settings.topBarPhone && (
                <a
                  href={phoneHref}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'inherit' }}
                >
                  <i className="fas fa-phone" style={{ color: '#4ade80' }} />
                  <span>{settings.topBarPhone}</span>
                </a>
              )}
              {settings.topBarEmail && (
                <a
                  href={`mailto:${settings.topBarEmail}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'inherit' }}
                >
                  <i className="fas fa-envelope" style={{ color: '#4ade80' }} />
                  <span>{settings.topBarEmail}</span>
                </a>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {(settings.topBarLinks || []).map((s: any, i: number) => (
                <a
                  key={i}
                  href={s.href || '#'}
                  aria-label={s.label}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'inherit',
                  }}
                >
                  <i className={s.icon} style={{ fontSize: 11 }} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav
        style={{
          background: scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(10,10,26,0.65)',
          backdropFilter: scrolled ? 'none' : 'blur(14px)',
          WebkitBackdropFilter: scrolled ? 'none' : 'blur(14px)',
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 80,
            }}
          >
            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  overflow: 'hidden',
                  background: '#fff',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  flexShrink: 0,
                }}
              >
                <img
                  src={settings.logo || '/images/msalogo.jpeg'}
                  alt="Logo"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <div
                  style={{
                    color: linkColor,
                    fontWeight: 700,
                    fontSize: 15,
                    lineHeight: 1.15,
                    transition: 'color 0.3s',
                  }}
                >
                  {settings.brandName}
                </div>
                <div
                  style={{
                    color: scrolled ? '#078930' : '#4ade80',
                    fontSize: 11,
                    fontWeight: 700,
                    transition: 'color 0.3s',
                  }}
                >
                  {settings.brandTagline}
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="msa-desktop-nav" style={{ alignItems: 'center', gap: 2 }}>
              {(settings.navLinks || []).map((link: any) => {
                if (link.children?.length) {
                  const isOpen = openDropdown === link.label;
                  return (
                    <div
                      key={link.label}
                      style={{ position: 'relative' }}
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded={isOpen}
                        onClick={() => setOpenDropdown(isOpen ? null : link.label)}
                        style={{
                          color: isOpen ? linkHover : linkColor,
                          padding: '8px 12px',
                          fontSize: 14,
                          fontWeight: 600,
                          background: 'transparent',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          transition: 'color 0.2s',
                        }}
                      >
                        {link.label}
                        <i
                          className="fas fa-chevron-down"
                          style={{
                            marginLeft: 6,
                            fontSize: 9,
                            transform: isOpen ? 'rotate(180deg)' : 'none',
                            transition: 'transform 0.3s',
                          }}
                        />
                      </button>

                      <div
                        role="menu"
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          paddingTop: 12,
                          transform: 'translateX(-50%)',
                          opacity: isOpen ? 1 : 0,
                          visibility: isOpen ? 'visible' : 'hidden',
                          pointerEvents: isOpen ? 'auto' : 'none',
                          transition: 'opacity .2s, visibility .2s',
                          zIndex: 60,
                        }}
                      >
                        <div
                          style={{
                            minWidth: 260,
                            background: '#fff',
                            borderRadius: 14,
                            padding: 8,
                            boxShadow: '0 20px 50px -10px rgba(0,0,0,0.22)',
                            border: '1px solid rgba(0,0,0,0.06)',
                            maxHeight: '70vh',
                            overflowY: 'auto',
                            overscrollBehavior: 'contain',
                          }}
                        >
                          {link.children.map((c: any) => (
                            <Link
                              key={c.label}
                              href={c.href}
                              onClick={() => setOpenDropdown(null)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                padding: '10px 14px',
                                borderRadius: 10,
                                fontSize: 14,
                                fontWeight: 500,
                                color: '#1a1a2e',
                                transition: 'background 0.15s, color 0.15s',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#f0fdf4';
                                e.currentTarget.style.color = '#078930';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = '#1a1a2e';
                              }}
                            >
                              <i className="fas fa-circle" style={{ fontSize: 5, color: '#078930', flexShrink: 0 }} />
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{
                      color: linkColor,
                      padding: '8px 12px',
                      fontSize: 14,
                      fontWeight: 600,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = linkHover)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {settings.ctaText && (
                <Link
                  href={settings.ctaLink || '/contact'}
                  className="btn-primary"
                  style={{
                    marginLeft: 16,
                    padding: '10px 22px',
                    borderRadius: 12,
                    fontSize: 14,
                    fontWeight: 700,
                    gap: 8,
                  }}
                >
                  <span>{settings.ctaText}</span>
                  <i className="fas fa-arrow-right" />
                </Link>
              )}
            </div>

            {/* Mobile button */}
            <button
              type="button"
              className="msa-mobile-btn"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                border: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.15)',
                background: scrolled ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)',
                color: scrolled ? '#1a1a2e' : '#fff',
                fontSize: 18,
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
              }}
            >
              <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              background: '#fff',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              maxHeight: 'calc(100vh - 5rem)',
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.5rem',
                background: 'linear-gradient(135deg, #0f0f1a 0%, #0d1b3d 60%, #0a2a1a 100%)',
                color: '#fff',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 800, fontSize: 15 }}>
                <i className="fas fa-compass" style={{ color: '#FFD100' }} />
                Navigation Menu
              </div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <i className="fas fa-times" />
              </button>
            </div>

            <div style={{ padding: '1rem 1.25rem 1.5rem' }}>
              {(settings.navLinks || []).map((link: any) => {
                if (link.children?.length) {
                  const isOpen = openDropdown === link.label;
                  return (
                    <div key={link.label} style={{ marginBottom: 4 }}>
                      <button
                        type="button"
                        onClick={() => setOpenDropdown(isOpen ? null : link.label)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: '14px 16px',
                          borderRadius: 12,
                          background: isOpen ? '#f0fdf4' : 'transparent',
                          color: isOpen ? '#055e1f' : '#1f2937',
                          fontWeight: 700,
                          fontSize: 15,
                          border: 'none',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          textAlign: 'left',
                        }}
                      >
                        <span
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: 10,
                            background: isOpen ? '#078930' : '#f3f4f6',
                            color: isOpen ? '#fff' : '#078930',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 13,
                            flexShrink: 0,
                          }}
                        >
                          <i className="fas fa-circle-info" />
                        </span>
                        {link.label}
                        <i
                          className="fas fa-chevron-down"
                          style={{
                            marginLeft: 'auto',
                            fontSize: 11,
                            color: isOpen ? '#078930' : '#9ca3af',
                            transform: isOpen ? 'rotate(180deg)' : 'none',
                            transition: 'transform 0.3s',
                          }}
                        />
                      </button>
                      {isOpen && (
                        <div style={{ paddingLeft: 46, paddingTop: 4, paddingBottom: 6 }}>
                          {link.children.map((c: any) => (
                            <Link
                              key={c.label}
                              href={c.href}
                              onClick={() => {
                                setMenuOpen(false);
                                setOpenDropdown(null);
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                padding: '10px 12px',
                                borderRadius: 9,
                                fontSize: 14,
                                color: '#4b5563',
                                fontWeight: 500,
                              }}
                            >
                              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#078930' }} />
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '14px 16px',
                      borderRadius: 12,
                      fontSize: 15,
                      fontWeight: 700,
                      color: link.href === '/' ? '#055e1f' : '#1f2937',
                      background: link.href === '/' ? '#f0fdf4' : 'transparent',
                    }}
                  >
                    <span
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        background: link.href === '/' ? '#078930' : '#f3f4f6',
                        color: link.href === '/' ? '#fff' : '#078930',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 13,
                        flexShrink: 0,
                      }}
                    >
                      <i className="fas fa-home" />
                    </span>
                    {link.label}
                  </Link>
                );
              })}

              <div
                style={{
                  height: 1,
                  background: 'linear-gradient(to right, transparent, #e5e7eb, transparent)',
                  margin: '14px 0',
                }}
              />

              {settings.ctaText && (
                <Link
                  href={settings.ctaLink || '/contact'}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    padding: '16px',
                    borderRadius: 14,
                    background: 'linear-gradient(135deg,#078930,#055e1f)',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: 15,
                    boxShadow: '0 10px 25px -8px rgba(7,137,48,.5)',
                    marginTop: 6,
                  }}
                >
                  <i className="fas fa-handshake" />
                  {settings.ctaText}
                </Link>
              )}

              <div
                style={{
                  marginTop: 20,
                  padding: 18,
                  borderRadius: 14,
                  background: 'linear-gradient(135deg, #f9fafb 0%, #f0fdf4 100%)',
                  border: '1px solid #e5e7eb',
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    color: '#078930',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: 12,
                  }}
                >
                  Get in touch
                </p>
                {settings.topBarPhone && (
                  <a
                    href={phoneHref}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '6px 0',
                      fontSize: 13,
                      color: '#4b5563',
                    }}
                  >
                    <i className="fas fa-phone" style={{ color: '#078930' }} />
                    {settings.topBarPhone}
                  </a>
                )}
                {settings.topBarEmail && (
                  <a
                    href={`mailto:${settings.topBarEmail}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '6px 0',
                      fontSize: 13,
                      color: '#4b5563',
                    }}
                  >
                    <i className="fas fa-envelope" style={{ color: '#078930' }} />
                    {settings.topBarEmail}
                  </a>
                )}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '6px 0',
                    fontSize: 13,
                    color: '#4b5563',
                  }}
                >
                  <i className="fas fa-map-marker-alt" style={{ color: '#078930' }} />
                  Juba • Maridi • Aweil • Yei
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}