'use client';

import { useEffect } from 'react';

/**
 * Global DOM scripts.
 *
 * NOTE: Mobile menu, dropdowns, and header scroll state are handled
 * by <Header /> via React state. This file handles only:
 *   • Footer year
 *   • Scroll-reveal animations   (.hidden-anim  →  .animate-*)
 *   • Animated number counters   (.counter-value)
 *   • Back-to-top button         (auto-creates if missing)
 *   • Contact form fallback      (#contactForm)    — for plain-HTML forms
 *   • News filter tabs fallback  (.ppf-news-tab)   — for plain-HTML markup
 *   • Smooth in-page anchors     (a[href^="#"])
 *
 * Everything is guarded so missing elements never throw.
 */
export default function Scripts() {
  useEffect(() => {
    /* ──────────────────────────────────────────────────────
       HELPERS
       ────────────────────────────────────────────────────── */
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ──────────────────────────────────────────────────────
       FOOTER YEAR
       ────────────────────────────────────────────────────── */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    /* ──────────────────────────────────────────────────────
       BACK TO TOP
       Creates the button if it doesn't exist. Toggles on scroll.
       ────────────────────────────────────────────────────── */
    let backToTop = document.getElementById('backToTop') as HTMLButtonElement | null;
    let createdBackBtn = false;

    if (!backToTop) {
      backToTop = document.createElement('button');
      backToTop.id = 'backToTop';
      backToTop.type = 'button';
      backToTop.setAttribute('aria-label', 'Back to top');
      backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
      Object.assign(backToTop.style, {
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        background: '#078930',
        color: '#fff',
        border: 'none',
        boxShadow: '0 10px 25px -8px rgba(7,137,48,.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: '0',
        pointerEvents: 'none',
        transition: 'opacity .3s, transform .3s, background .3s',
        zIndex: '50',
        cursor: 'pointer',
        fontSize: '16px',
      });
      document.body.appendChild(backToTop);
      createdBackBtn = true;

      backToTop.addEventListener('mouseenter', () => {
        if (backToTop) {
          backToTop.style.background = '#067527';
          backToTop.style.transform = 'translateY(-2px)';
        }
      });
      backToTop.addEventListener('mouseleave', () => {
        if (backToTop) {
          backToTop.style.background = '#078930';
          backToTop.style.transform = 'translateY(0)';
        }
      });
    }

    const toggleBackToTop = () => {
      if (!backToTop) return;
      const show = window.scrollY > 500;
      backToTop.style.opacity = show ? '1' : '0';
      backToTop.style.pointerEvents = show ? 'auto' : 'none';
    };

    const onBackToTopClick = () =>
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });

    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    backToTop.addEventListener('click', onBackToTopClick);
    toggleBackToTop();

    /* ──────────────────────────────────────────────────────
       REVEAL ANIMATIONS (IntersectionObserver)
       Uses MutationObserver to catch async-rendered content
       (e.g. homepage sections that appear after fetch()).
       ────────────────────────────────────────────────────── */
    const revealed = new WeakSet<Element>();

    const revealObserver =
      !prefersReduced && 'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target as HTMLElement;
                const anim = el.dataset.anim || 'fadeInUp';
                el.classList.remove('hidden-anim');
                el.classList.add('animate-' + anim);
                el.dataset.revealed = '1';
                revealObserver?.unobserve(el);
              });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
          )
        : null;

    const scanReveal = () => {
      document
        .querySelectorAll<HTMLElement>('.hidden-anim:not([data-revealed])')
        .forEach((el) => {
          if (revealed.has(el)) return;
          revealed.add(el);
          if (!revealObserver) {
            el.classList.remove('hidden-anim');
            el.dataset.revealed = '1';
          } else {
            revealObserver.observe(el);
          }
        });
    };

    /* ──────────────────────────────────────────────────────
       COUNTERS (IntersectionObserver, animate on enter)
       ────────────────────────────────────────────────────── */
    const counted = new WeakSet<Element>();

    const animateCounter = (el: HTMLElement) => {
      const target = parseInt(el.dataset.target || '0', 10) || 0;

      if (prefersReduced) {
        el.textContent = target.toLocaleString() + (target >= 100 ? '+' : '');
        el.dataset.counted = '1';
        return;
      }

      const duration = 2000;
      const start = performance.now();

      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(target * eased).toLocaleString();
        if (p < 1) requestAnimationFrame(tick);
        else {
          el.textContent = target.toLocaleString() + (target >= 100 ? '+' : '');
          el.dataset.counted = '1';
        }
      };
      requestAnimationFrame(tick);
    };

    const counterObserver =
      !prefersReduced && 'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                animateCounter(entry.target as HTMLElement);
                counterObserver?.unobserve(entry.target);
              });
            },
            { threshold: 0.3 }
          )
        : null;

    const scanCounters = () => {
      document
        .querySelectorAll<HTMLElement>('.counter-value:not([data-counted])')
        .forEach((el) => {
          if (counted.has(el)) return;
          counted.add(el);
          if (!counterObserver) animateCounter(el);
          else counterObserver.observe(el);
        });
    };

    /* ──────────────────────────────────────────────────────
       MUTATION OBSERVER — re-scan when DOM changes
       (this is what fixes async-rendered sections)
       ────────────────────────────────────────────────────── */
    let rafId: number | null = null;
    const scheduleScan = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        scanReveal();
        scanCounters();
        bindNewsTabs();
      });
    };

    const mo = new MutationObserver(scheduleScan);
    mo.observe(document.body, { childList: true, subtree: true });

    scheduleScan(); // initial pass

    /* ──────────────────────────────────────────────────────
       CONTACT FORM (fallback for plain-HTML forms only)
       React forms aren't affected.
       ────────────────────────────────────────────────────── */
    const contactForm = document.getElementById('contactForm') as HTMLFormElement | null;
    const formSuccess = document.getElementById('formSuccess') as HTMLElement | null;

    const onContactSubmit = (e: Event) => {
      if (!contactForm || !formSuccess) return;
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      contactForm.style.display = 'none';
      formSuccess.classList.remove('hidden');
      formSuccess.focus?.();
      setTimeout(() => {
        contactForm.style.display = '';
        formSuccess.classList.add('hidden');
        contactForm.reset();
      }, 5000);
    };

    if (contactForm && formSuccess) {
      contactForm.addEventListener('submit', onContactSubmit);
    }

    /* ──────────────────────────────────────────────────────
       NEWS FILTER TABS (fallback for plain-HTML markup)
       React-driven news tabs are unaffected.
       ────────────────────────────────────────────────────── */
    const applyNewsFilter = (filter: string) => {
      const items = document.querySelectorAll<HTMLElement>('.ppf-news-item');
      const empty = document.getElementById('ppfNewsEmpty');
      let visible = 0;

      items.forEach((item, i) => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('is-hidden', !match);
        if (match) {
          visible++;
          item.classList.remove('is-in');
          void item.offsetWidth;
          item.style.animationDelay = prefersReduced
            ? '0s'
            : Math.min(i * 40, 320) + 'ms';
          item.classList.add('is-in');
        }
      });

      if (empty) empty.classList.toggle('hidden', visible > 0);
    };

    const bindNewsTabs = () => {
      document
        .querySelectorAll<HTMLButtonElement>('.ppf-news-tab:not([data-bound])')
        .forEach((tab) => {
          tab.dataset.bound = '1';
          tab.addEventListener('click', () => {
            document.querySelectorAll<HTMLButtonElement>('.ppf-news-tab').forEach((t) => {
              const active = t === tab;
              t.classList.toggle('is-active', active);
              t.setAttribute('aria-pressed', String(active));
            });
            applyNewsFilter(tab.dataset.filter || 'all');
          });
        });
    };
    bindNewsTabs();

    /* ──────────────────────────────────────────────────────
       SMOOTH IN-PAGE ANCHORS
       Offsets by header height so target isn't hidden.
       ────────────────────────────────────────────────────── */
    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as Element)?.closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      const top =
        (target as HTMLElement).getBoundingClientRect().top +
        window.scrollY -
        110;
      window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
      history.replaceState(null, '', hash);
    };
    document.addEventListener('click', onAnchorClick);

    /* ──────────────────────────────────────────────────────
       CLEANUP
       ────────────────────────────────────────────────────── */
    return () => {
      window.removeEventListener('scroll', toggleBackToTop);
      backToTop?.removeEventListener('click', onBackToTopClick);
      document.removeEventListener('click', onAnchorClick);
      revealObserver?.disconnect();
      counterObserver?.disconnect();
      mo.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (contactForm) contactForm.removeEventListener('submit', onContactSubmit);
      if (createdBackBtn && backToTop?.parentNode) {
        backToTop.parentNode.removeChild(backToTop);
      }
    };
  }, []);

  return null;
}