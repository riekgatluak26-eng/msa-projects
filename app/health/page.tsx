import Link from 'next/link';
import { getPage } from '@/lib/db';
import { healthDefaults } from '@/lib/defaults';
import ProgramGallery from '@/components/programs/ProgramGallery';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Health Program',
  description:
    "MSA's Health Program — Primary Health Care, Sexual Reproductive Health, Nutrition and comprehensive HIV/AIDS programs including Youth-Friendly VCT services since 2013.",
};

export default async function HealthPage() {
  let data: any = { ...healthDefaults };
  try {
    const saved = await getPage('msa-health-page');
    if (saved && typeof saved === 'object') {
      data = { ...healthDefaults, ...saved };
    }
  } catch {
    // silently fall back
  }

  return (
    <>
      <SplitHero data={data.hero} />
      <div className="flag-bar" />
      <Overview data={data.overview} />
      <Activities data={data.activities} />
      <VctFeature data={data.vctFeature} />
      <Services data={data.services} />
      <Stats data={data.stats} />
      <Approach data={data.approach} />
      <ProgramGallery data={data.gallery} />
      <Testimonials data={data.testimonials} />
      <SupportCta data={data.support} />
      <OtherPrograms data={data.otherPrograms} />
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   SPLIT HERO
   ════════════════════════════════════════════════════════════ */
function SplitHero({ data }: { data: any }) {
  if (!data) return null;
  return (
    <section id="hero" className="split-hero">
      <div className="hero-photo-half">
        <img src={data.image} alt="" />
        <div className="hero-photo-overlay" />
        <div className="hero-photo-caption">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full glass text-yellow-400 text-[11px] sm:text-xs font-bold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mr-2 animate-pulse" />
            {data.badge}
          </span>
          {data.imageCaption && (
            <p className="hidden lg:block text-white/75 text-sm leading-relaxed max-w-sm mt-4">
              {data.imageCaption}
            </p>
          )}
          {data.sideStats?.length > 0 && (
            <div className="hidden lg:grid grid-cols-3 gap-3 mt-5">
              {data.sideStats.map((s: any, i: number) => (
                <div key={i} className="glass rounded-xl p-3 backdrop-blur-md">
                  <div className="text-xl font-extrabold text-white">{s.value}</div>
                  <div className="text-white/60 text-[10px] mt-0.5 font-semibold uppercase tracking-wide">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="hero-content-half">
        <div className="orb" style={{ width: 288, height: 288, background: 'rgba(218,41,28,.25)', top: -40, right: -64 }} />
        <div className="orb" style={{ width: 256, height: 256, background: 'rgba(0,51,160,.25)', bottom: 40, left: 0, animationDelay: '5s' }} />
        <div className="orb" style={{ width: 192, height: 192, background: 'rgba(255,209,0,.15)', top: '50%', right: '33%', animationDelay: '9s' }} />

        <div className="relative z-10 w-full max-w-xl">
          <h1 className="font-display font-extrabold text-white leading-[1.05] text-[2.25rem] sm:text-5xl lg:text-[3.5rem] mb-6">
            {data.titleLine1}<br />
            <span className="text-gradient-gold">{data.titleLine2}</span><br />
            {data.titleLine3}
          </h1>

          <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
            {data.subtitle}
          </p>

          <div className="flex flex-wrap gap-3 mb-9">
            <a href={data.primaryCtaLink} className="btn-primary px-6 py-3.5 rounded-2xl font-bold text-sm">
              <span>{data.primaryCtaText}</span>
              <i className="fas fa-arrow-right ml-2.5" />
            </a>
            <a href={data.secondaryCtaLink} className="btn-outline px-6 py-3.5 rounded-2xl font-bold text-sm">
              <i className="fas fa-heart-pulse mr-2.5" />
              <span>{data.secondaryCtaText}</span>
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-7 border-t border-white/10">
            {(data.stats || []).map((s: any, i: number) => (
              <div key={i}>
                <div
                  className={`text-2xl sm:text-3xl font-extrabold text-white ${s.static ? '' : 'counter-value'}`}
                  data-target={s.static ? undefined : s.value}
                >
                  {s.static ? `${s.value}${s.suffix || ''}` : '0'}
                </div>
                <div className="text-white/55 text-[10px] sm:text-xs mt-1 font-semibold uppercase tracking-wide">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   OVERVIEW
   ════════════════════════════════════════════════════════════ */
function Overview({ data }: { data: any }) {
  if (!data) return null;
  const colorMap: Record<string, string> = {
    brand: 'bg-green-50 text-green-500',
    navy: 'bg-blue-50 text-blue-600',
    gold: 'bg-amber-100 text-yellow-600',
    red: 'bg-red-50 text-red-500',
    purple: 'bg-purple-50 text-purple-500',
  };

  return (
    <section className="py-24 mesh-bg-1 relative overflow-hidden">
      <div className="container max-w-6xl">
        <div className="text-center mb-14 hidden-anim" data-anim="fadeInUp">
          <span className="section-badge bg-red-50 text-red-600 mb-6">
            <i className="fas fa-heart-pulse mr-2" />
            {data.eyebrow}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {data.title} <span className="text-gradient-green">{data.titleAccent}</span> {data.titleEnd}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {(data.cards || []).map((c: any, i: number) => (
            <div
              key={i}
              className="hidden-anim card-modern bg-white rounded-2xl p-7"
              data-anim="fadeInUp"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-2xl ${colorMap[c.color] || colorMap.brand} flex items-center justify-center mb-5`}>
                <i className={`${c.icon} text-xl`} />
              </div>
              <h3 className="font-extrabold text-gray-900 text-lg mb-2">{c.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   ACTIVITIES
   ════════════════════════════════════════════════════════════ */
function Activities({ data }: { data: any }) {
  if (!data) return null;
  const items: any[] = Array.isArray(data.items) ? data.items : [];

  const palette: Record<string, { icon: string; bar: string; badge: string; }> = {
    brand:  { icon: 'from-green-500 to-green-700 shadow-green-500/25',    bar: 'from-green-500 via-green-400 to-blue-500',     badge: 'bg-green-50 text-green-700' },
    navy:   { icon: 'from-blue-700 to-blue-900 shadow-blue-500/25',       bar: 'from-blue-700 to-blue-900',                    badge: 'bg-blue-50 text-blue-700' },
    gold:   { icon: 'from-yellow-400 to-yellow-600 shadow-yellow-400/30', bar: 'from-yellow-400 to-yellow-600',                badge: 'bg-amber-50 text-yellow-700' },
    red:    { icon: 'from-red-500 to-red-700 shadow-red-500/25',          bar: 'from-red-500 via-red-400 to-yellow-400',       badge: 'bg-red-50 text-red-600' },
    purple: { icon: 'from-purple-500 to-purple-700 shadow-purple-500/25', bar: 'from-purple-500 via-purple-400 to-pink-500',   badge: 'bg-purple-50 text-purple-600' },
    pink:   { icon: 'from-pink-500 to-pink-700 shadow-pink-500/25',       bar: 'from-pink-500 via-pink-400 to-green-500',      badge: 'bg-pink-100 text-pink-700' },
  };

  return (
    <section id="activities" className="py-24 mesh-bg-1 relative overflow-hidden">
      <div className="container max-w-6xl">
        <div className="text-center mb-16 hidden-anim" data-anim="fadeInUp">
          <span className="section-badge bg-red-50 text-red-600 mb-6">
            <i className="fas fa-list-check mr-2" />
            {data.eyebrow}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            {data.title} <span className="text-gradient-green">{data.titleAccent}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, i) => {
            const c = palette[item.color] || palette.brand;
            const isWide = item.wide || false;

            if (isWide) {
              return (
                <article
                  key={i}
                  className="hidden-anim group relative bg-white rounded-3xl border border-gray-100 card-modern overflow-hidden md:col-span-2"
                  data-anim="fadeInUp"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${c.bar}`} />
                  <div className="p-7 sm:p-9">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${c.icon} flex items-center justify-center shadow-lg`}>
                          <i className={`${item.icon} text-white text-2xl`} />
                        </div>
                        <p className="text-[10px] font-extrabold text-gray-400 tracking-widest mt-3 text-center">
                          {item.number}
                        </p>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <h3 className="text-2xl font-display font-extrabold text-gray-900">{item.title}</h3>
                          {item.badge && (
                            <span className={`px-3 py-1 rounded-full ${c.badge} text-[10px] font-extrabold uppercase tracking-wide`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">{item.text}</p>

                        {item.features?.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {item.features.map((f: string, fi: number) => (
                              <span
                                key={fi}
                                className={`inline-flex items-center px-3 py-1.5 rounded-full ${c.badge} text-xs font-bold`}
                              >
                                <i className="fas fa-check-circle mr-1.5 text-[10px]" />
                                {f}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            }

            return (
              <article
                key={i}
                className="hidden-anim group relative bg-white rounded-3xl border border-gray-100 card-modern overflow-hidden"
                data-anim="fadeInUp"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${c.bar}`} />
                <div className="p-7">
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.icon} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <i className={`${item.icon} text-white text-xl`} />
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold text-gray-400 tracking-widest mb-1">{item.number}</p>
                      <h3 className="text-lg font-display font-extrabold text-gray-900 leading-tight">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm mb-4">{item.text}</p>
                  {item.features?.length > 0 && (
                    <ul className="space-y-2 text-sm text-gray-600">
                      {item.features.map((f: string, fi: number) => (
                        <li key={fi} className="flex items-start">
                          <i className="fas fa-check text-green-500 mr-2.5 mt-1 text-[10px]" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {data.footerText && (
          <div className="text-center mt-14 hidden-anim" data-anim="fadeInUp">
            <p className="text-gray-500 text-sm mb-6 max-w-2xl mx-auto">{data.footerText}</p>
            {data.ctaText && (
              <Link href={data.ctaLink} className="btn-primary px-8 py-4 rounded-2xl font-bold">
                <span>{data.ctaText}</span>
                <i className="fas fa-arrow-right ml-3" />
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   VCT FEATURE
   ════════════════════════════════════════════════════════════ */
function VctFeature({ data }: { data: any }) {
  if (!data) return null;
  const colorMap: Record<string, string> = {
    pink: 'bg-pink-500',
    navy: 'bg-blue-700',
    gold: 'bg-yellow-400',
    brand: 'bg-green-500',
    red: 'bg-red-500',
  };
  const iconColor: Record<string, string> = {
    pink: 'text-white',
    navy: 'text-white',
    gold: 'text-gray-900',
    brand: 'text-white',
    red: 'text-white',
  };

  return (
    <section className="py-24 mesh-bg-2 relative overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="hidden-anim order-2 lg:order-1 relative" data-anim="fadeInLeft">
            <div className="relative">
              <div className="overflow-hidden rounded-3xl h-[560px] shadow-2xl img-zoom relative">
                <img src={data.image} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  {data.imageBadge && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-400/25 backdrop-blur-sm text-yellow-300 text-xs font-bold mb-3">
                      {data.imageBadge}
                    </span>
                  )}
                  <p className="text-white font-display font-bold text-2xl mb-1">{data.imageCaption}</p>
                  <p className="text-white/75 text-sm">{data.imageSubcaption}</p>
                </div>
              </div>

              {data.floatCard1 && (
                <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-5 shadow-xl border border-gray-100 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                      <i className={`${data.floatCard1.icon} text-blue-600 text-xl`} />
                    </div>
                    <div>
                      <p className="font-extrabold text-gray-900 text-lg leading-none">{data.floatCard1.title}</p>
                      <p className="text-gray-500 text-xs mt-1">{data.floatCard1.sub}</p>
                    </div>
                  </div>
                </div>
              )}

              {data.floatCard2 && (
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-gray-100 animate-float" style={{ animationDelay: '3s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                      <i className={`${data.floatCard2.icon} text-green-500 text-xl`} />
                    </div>
                    <div>
                      <p className="font-extrabold text-gray-900 text-lg leading-none">{data.floatCard2.title}</p>
                      <p className="text-gray-500 text-xs mt-1">{data.floatCard2.sub}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="hidden-anim order-1 lg:order-2" data-anim="fadeInRight">
            <span className="section-badge bg-blue-50 text-blue-700 mb-6">
              <i className="fas fa-vial mr-2" />
              {data.eyebrow}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {data.title}<br />
              <span className="text-gradient-gold">{data.titleAccent}</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">{data.subtitle}</p>
            <p className="text-gray-600 leading-relaxed mb-8">{data.paragraph2}</p>

            <div className="space-y-4 mb-10">
              {(data.benefits || []).map((b: any, i: number) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                  <div className={`w-11 h-11 rounded-xl ${colorMap[b.color] || colorMap.brand} flex items-center justify-center flex-shrink-0`}>
                    <i className={`${b.icon} ${iconColor[b.color] || 'text-white'}`} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-sm">{b.title}</h4>
                    <p className="text-gray-600 text-xs mt-0.5">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {data.ctaText && (
              <Link href={data.ctaLink} className="btn-primary px-8 py-4 rounded-2xl font-bold">
                <span>{data.ctaText}</span>
                <i className="fas fa-arrow-right ml-3" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   SERVICES (3 pillars)
   ════════════════════════════════════════════════════════════ */
function Services({ data }: { data: any }) {
  if (!data) return null;
  const items: any[] = Array.isArray(data.items) ? data.items : [];

  const palette: Record<string, { grad: string; shadow: string; badge: string; }> = {
    brand:  { grad: 'from-green-500 to-green-700',  shadow: 'shadow-green-500/25',  badge: 'bg-green-50 text-green-700' },
    navy:   { grad: 'from-blue-700 to-blue-900',    shadow: 'shadow-blue-500/25',   badge: 'bg-blue-50 text-blue-700' },
    red:    { grad: 'from-red-500 to-red-700',      shadow: 'shadow-red-500/25',    badge: 'bg-red-50 text-red-600' },
    gold:   { grad: 'from-yellow-400 to-yellow-600', shadow: 'shadow-yellow-400/30', badge: 'bg-amber-50 text-yellow-700' },
    purple: { grad: 'from-purple-500 to-purple-700', shadow: 'shadow-purple-500/25', badge: 'bg-purple-50 text-purple-600' },
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container max-w-6xl">
        <div className="text-center mb-14 hidden-anim" data-anim="fadeInUp">
          <span className="section-badge bg-red-50 text-red-600 mb-6">
            <i className="fas fa-shield-heart mr-2" />
            {data.eyebrow}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            {data.title} <span className="text-gradient-green">{data.titleAccent}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">{data.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {items.map((s, i) => {
            const c = palette[s.color] || palette.brand;
            return (
              <div
                key={i}
                className="hidden-anim card-modern relative bg-white rounded-3xl p-8 border border-gray-100 overflow-hidden"
                data-anim="fadeInUp"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.grad} flex items-center justify-center mb-6 shadow-lg ${c.shadow}`}>
                  <i className={`${s.icon} text-white text-xl`} />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm mb-5">{s.text}</p>

                {s.features?.length > 0 && (
                  <div className="space-y-2 pt-5 border-t border-gray-100">
                    {s.features.map((f: string, fi: number) => (
                      <div key={fi} className="flex items-start text-sm text-gray-600">
                        <i className="fas fa-check-circle text-green-500 mr-2.5 mt-0.5 text-xs" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   STATS
   ════════════════════════════════════════════════════════════ */
function Stats({ data }: { data: any }) {
  if (!data) return null;
  const items: any[] = Array.isArray(data.items) ? data.items : [];

  const colorMap: Record<string, string> = {
    brand: 'bg-green-500/20 text-green-400',
    navy: 'bg-blue-500/20 text-blue-400',
    gold: 'bg-yellow-400/20 text-yellow-400',
    red: 'bg-red-500/20 text-red-400',
    purple: 'bg-purple-500/20 text-purple-400',
    pink: 'bg-pink-500/20 text-pink-400',
  };

  return (
    <section className="py-24 mesh-bg-dark noise-overlay relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center mb-14 hidden-anim" data-anim="fadeInUp">
          <span className="section-badge bg-white/10 text-yellow-400 mb-6">
            <i className="fas fa-chart-line mr-2" />
            {data.eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            {data.title} <span className="text-gradient-gold">{data.titleAccent}</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">{data.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {items.map((s, i) => (
            <div
              key={i}
              className="hidden-anim stat-card rounded-2xl p-6 text-center"
              data-anim="scaleIn"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className={`w-12 h-12 mx-auto rounded-xl ${colorMap[s.color] || colorMap.brand} flex items-center justify-center mb-3`}>
                <i className={`${s.icon} text-lg`} />
              </div>
              <div
                className={`text-3xl font-extrabold text-white ${s.static ? '' : 'counter-value'}`}
                data-target={s.static ? undefined : s.value}
              >
                {s.static ? `${s.value}${s.suffix || ''}` : '0'}
              </div>
              <div className="text-white/50 text-xs mt-1.5 font-semibold leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   APPROACH
   ════════════════════════════════════════════════════════════ */
function Approach({ data }: { data: any }) {
  if (!data) return null;
  const bgMap: Record<string, string> = {
    brand: 'bg-green-500',
    navy: 'bg-blue-700',
    gold: 'bg-yellow-400',
    red: 'bg-red-500',
  };
  const textMap: Record<string, string> = {
    brand: 'text-white',
    navy: 'text-white',
    gold: 'text-gray-900',
    red: 'text-white',
  };

  return (
    <section className="py-24 mesh-bg-2 noise-overlay relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center mb-14 hidden-anim" data-anim="fadeInUp">
          <span className="section-badge bg-blue-50 text-blue-700 mb-6">
            <i className="fas fa-route mr-2" />
            {data.eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            {data.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{data.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(data.steps || []).map((s: any, i: number) => (
            <div
              key={i}
              className="hidden-anim bg-white rounded-2xl p-7 relative border border-gray-100"
              data-anim="fadeInUp"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className={`absolute -top-4 left-7 w-10 h-10 rounded-xl ${bgMap[s.color] || bgMap.brand} flex items-center justify-center font-extrabold ${textMap[s.color] || 'text-white'} shadow-lg`}>
                {s.number}
              </div>
              <div className="pt-3">
                <h3 className="text-gray-900 font-extrabold text-lg mb-3 mt-4">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.text}</p>
              </div>
            </div>
          ))}
        </div>

        {data.stats?.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-14">
            {data.stats.map((s: any, i: number) => (
              <div
                key={i}
                className="hidden-anim card-modern bg-white rounded-2xl p-6 text-center border border-gray-100"
                data-anim="scaleIn"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-gray-50 flex items-center justify-center mb-3">
                  <i className={`${s.icon} text-green-600 text-lg`} />
                </div>
                <div
                  className={`text-3xl font-extrabold text-gray-900 ${s.static ? '' : 'counter-value'}`}
                  data-target={s.static ? undefined : s.value}
                >
                  {s.static ? `${s.value}${s.suffix || ''}` : '0'}
                </div>
                <div className="text-gray-500 text-xs mt-1.5 font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   TESTIMONIALS
   ════════════════════════════════════════════════════════════ */
function Testimonials({ data }: { data: any }) {
  if (!data) return null;
  const items: any[] = Array.isArray(data.items) ? data.items : [];

  const theme: Record<string, { bg: string; border: string; iconBg: string; iconText: string; }> = {
    brand: { bg: 'from-green-50 to-white', border: 'border-green-100', iconBg: 'bg-green-500',  iconText: 'text-white' },
    navy:  { bg: 'from-blue-50 to-white',  border: 'border-blue-100',  iconBg: 'bg-blue-700',   iconText: 'text-white' },
    gold:  { bg: 'from-amber-50 to-white', border: 'border-amber-200', iconBg: 'bg-yellow-400', iconText: 'text-gray-900' },
    red:   { bg: 'from-red-50 to-white',   border: 'border-red-100',   iconBg: 'bg-red-500',    iconText: 'text-white' },
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container">
        <div className="text-center mb-14 hidden-anim" data-anim="fadeInUp">
          <span className="section-badge bg-amber-100 text-yellow-700 mb-6">
            <i className="fas fa-quote-left mr-2" />
            {data.eyebrow}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            {data.title} <span className="text-gradient-green">{data.titleAccent}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">{data.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t, i) => {
            const th = theme[t.color] || theme.brand;
            return (
              <div
                key={i}
                className={`hidden-anim bg-gradient-to-br ${th.bg} rounded-3xl p-7 border ${th.border} relative`}
                data-anim="fadeInUp"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <i className="fas fa-quote-left text-gray-200 text-4xl absolute top-5 right-5" />
                <p className="text-gray-700 leading-relaxed mb-5 relative">{t.quote}</p>
                <div className={`flex items-center gap-3 pt-5 border-t ${th.border}`}>
                  <div className={`w-11 h-11 rounded-full ${th.iconBg} flex items-center justify-center`}>
                    <i className={`fas fa-user ${th.iconText}`} />
                  </div>
                  <div>
                    <p className="font-extrabold text-gray-900 text-sm">{t.author}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   SUPPORT CTA
   ════════════════════════════════════════════════════════════ */
function SupportCta({ data }: { data: any }) {
  if (!data) return null;
  return (
    <section id="support" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-blue-900" />
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="orb" style={{ width: 384, height: 384, background: 'rgba(255,209,0,.4)', top: -96, right: -64 }} />
        <div className="orb" style={{ width: 320, height: 320, background: 'rgba(0,51,160,.4)', bottom: 0, left: -64, animationDelay: '6s' }} />
      </div>

      <div className="container max-w-4xl text-center relative z-10">
        <div className="hidden-anim" data-anim="scaleIn">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-7 shadow-2xl">
            <i className={`${data.icon} text-yellow-400 text-3xl`} />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
            {data.title}
          </h2>
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            {data.text}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={data.button1Link}
              className="px-8 py-4 rounded-2xl bg-white text-red-700 font-bold text-base inline-flex items-center hover:bg-yellow-400 hover:text-gray-900 transition-all shadow-lg"
            >
              <i className="fas fa-heart-pulse mr-3" />
              <span>{data.button1Text}</span>
            </Link>
            <Link href={data.button2Link} className="btn-outline px-8 py-4 rounded-2xl font-bold text-base">
              <i className="fas fa-handshake mr-3" />
              <span>{data.button2Text}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   OTHER PROGRAMS
   ════════════════════════════════════════════════════════════ */
function OtherPrograms({ data }: { data: any }) {
  if (!data) return null;
  const items: any[] = Array.isArray(data.items) ? data.items : [];

  const colorMap: Record<string, { bg: string; text: string; hover: string; }> = {
    red:    { bg: 'bg-red-50',    text: 'text-red-500',    hover: 'group-hover:bg-red-500' },
    green:  { bg: 'bg-green-50',  text: 'text-green-500',  hover: 'group-hover:bg-green-500' },
    blue:   { bg: 'bg-blue-50',   text: 'text-blue-500',   hover: 'group-hover:bg-blue-500' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-500', hover: 'group-hover:bg-purple-500' },
    gold:   { bg: 'bg-amber-50',  text: 'text-yellow-600', hover: 'group-hover:bg-yellow-500' },
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container">
        <div className="text-center mb-14 hidden-anim" data-anim="fadeInUp">
          <span className="section-badge bg-blue-50 text-blue-700 mb-6">
            <i className="fas fa-compass mr-2" />
            {data.eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5">
            {data.title} <span className="text-gradient-green">{data.titleAccent}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{data.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {items.map((p: any, i: number) => {
            const c = colorMap[p.color] || colorMap.green;
            return (
              <Link
                key={i}
                href={p.href}
                className="hidden-anim group bg-white rounded-2xl p-6 border border-gray-100 card-modern text-center"
                data-anim="fadeInUp"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={`w-14 h-14 mx-auto rounded-2xl ${c.bg} flex items-center justify-center mb-4 transition-colors ${c.hover}`}>
                  <i className={`${p.icon} ${c.text} group-hover:text-white text-xl transition-colors`} />
                </div>
                <h3 className="font-extrabold text-gray-900 text-sm mb-1">{p.title}</h3>
                <p className="text-gray-500 text-xs">{p.subtitle}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}