import Link from 'next/link';
import { getPage } from '@/lib/db';
import { homepageDefaults } from '@/lib/defaults';
import NewsSection from '@/components/home/NewsSection';

/* Server-rendered homepage. No client fetch, no loading spinner —
   the HTML arrives with content already baked in. */

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  /* ── Load homepage defaults + saved overrides ─────────── */
  let data: any = { ...homepageDefaults };
  try {
    const saved = await getPage('msa-homepage');
    if (saved && typeof saved === 'object') {
      data = { ...homepageDefaults, ...saved };
    }
  } catch {}

  /* ── Homepage news comes from the homepage admin ──────────────
     The `data.news.articles` array is now managed from
     /admin/homepage → News & Media. It is NOT pulled from the
     /news page. Both are independent. */

  return (
    <>
      <HeroSection data={data.hero} />
      <div className="flag-bar" />
      <AboutSection data={data.about} />
      <ValuesSection data={data.values} />
      <ImpactSection data={data.impact} />
      <ProgramsSection data={data.programs} />
      <FeaturedSection data={data.featured} />
      <AchievementsSection data={data.achievements} />
      <NewsSection news={data.news} newsletter={data.newsletter} />
      <PartnersSection data={data.partners} />
      <CtaSection data={data.cta} />
      <ContactSection data={data.contact} />
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   HERO
   ════════════════════════════════════════════════════════════ */
function HeroSection({ data }: { data: any }) {
  if (!data) return null;
  const {
    badge, titleLine1, titleLine2, titleLine3, subtitle,
    backgroundImage, heroImage, heroBadge, heroCardTitle, heroCardText,
    primaryCtaText, primaryCtaLink, secondaryCtaText, secondaryCtaLink,
    stats, floatCard1, floatCard2,
  } = data;

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="hero-image-bg">
        <div className="hero-overlay-photo" style={{ backgroundImage: `url(${backgroundImage})` }} />
        <div className="orb" style={{ width: 384, height: 384, background: 'rgba(7,137,48,.25)', top: -80, left: -80 }} />
        <div className="orb" style={{ width: 320, height: 320, background: 'rgba(0,51,160,.25)', top: '33%', right: 0, animationDelay: '5s' }} />
        <div className="orb" style={{ width: 256, height: 256, background: 'rgba(255,209,0,.15)', bottom: 80, left: '33%', animationDelay: '10s' }} />
      </div>

      <div className="container relative z-10" style={{ paddingTop: 128, paddingBottom: 128 }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="glass inline-flex items-center px-4 py-2 rounded-full text-yellow-400 text-sm font-bold mb-8">
              <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2 animate-pulse" />
              {badge}
            </span>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-8">
              {titleLine1}<br />
              <span className="text-gradient-gold">{titleLine2}</span><br />
              {titleLine3}
            </h1>

            <p className="text-lg sm:text-xl text-white/75 mb-10 leading-relaxed max-w-xl">
              {subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <a href={primaryCtaLink} className="btn-primary px-8 py-4 rounded-2xl font-bold text-base">
                <span>{primaryCtaText}</span>
                <i className="fas fa-arrow-right ml-3" />
              </a>
              <a href={secondaryCtaLink} className="btn-outline px-8 py-4 rounded-2xl font-bold text-base">
                <i className="fas fa-play mr-3 text-sm" />
                <span>{secondaryCtaText}</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-white/10">
              {(stats || []).map((s: any, i: number) => (
                <div key={i}>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white counter-value" data-target={s.value}>
                    0
                  </div>
                  <div className="text-white/55 text-xs sm:text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="overflow-hidden rounded-3xl h-[520px] shadow-2xl img-zoom">
                <img src={heroImage} alt="" className="w-full h-full object-cover" />
                <div className="img-overlay-gradient" />
                <div className="img-overlay-pattern" />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                  <span className="inline-block px-3 py-1 rounded-full bg-yellow-400/25 backdrop-blur text-yellow-300 text-xs font-bold mb-3">
                    {heroBadge}
                  </span>
                  <h3 className="text-white font-display font-bold text-2xl mb-2">{heroCardTitle}</h3>
                  <p className="text-white/75 text-sm">{heroCardText}</p>
                </div>
              </div>

              {floatCard1 && (
                <div className="absolute -top-6 -right-6 glass rounded-2xl p-4 animate-float shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                      <i className={`${floatCard1.icon} text-white text-sm`} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{floatCard1.title}</p>
                      <p className="text-white/60 text-xs">{floatCard1.sub}</p>
                    </div>
                  </div>
                </div>
              )}

              {floatCard2 && (
                <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 animate-float shadow-2xl" style={{ animationDelay: '3s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
                      <i className={`${floatCard2.icon} text-gray-900 text-sm`} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{floatCard2.title}</p>
                      <p className="text-white/60 text-xs">{floatCard2.sub}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   ABOUT
   ════════════════════════════════════════════════════════════ */
function AboutSection({ data }: { data: any }) {
  if (!data) return null;
  const {
    eyebrow, title, titleAccent, titleEnd,
    paragraph1, paragraph2,
    missionTitle, missionText, visionTitle, visionText,
    quote, quoteAuthor, image,
  } = data;

  return (
    <section id="about" className="py-28 mesh-bg-1 relative overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="hidden-anim" data-anim="fadeInLeft">
            <div className="relative overflow-hidden rounded-3xl h-[560px] shadow-2xl img-zoom">
              <img src={image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
          </div>

          <div className="hidden-anim" data-anim="fadeInRight">
            <span className="section-badge bg-green-50 text-green-700 mb-6">
              <i className="fas fa-info-circle mr-2" />
              {eyebrow}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {title} <span className="text-gradient-green">{titleAccent}</span> {titleEnd}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">{paragraph1}</p>
            <p className="text-gray-600 leading-relaxed mb-8">{paragraph2}</p>

            <div className="space-y-5 mb-10">
              <div className="flex gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-blue-700 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-bullseye text-white" />
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900 text-lg">{missionTitle}</h4>
                  <p className="text-gray-600 mt-1 text-sm leading-relaxed">{missionText}</p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-eye text-white" />
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900 text-lg">{visionTitle}</h4>
                  <p className="text-gray-600 mt-1 text-sm leading-relaxed">{visionText}</p>
                </div>
              </div>
            </div>

            <div className="pl-6 border-l-4 border-yellow-400 py-2">
              <p className="text-gray-700 italic font-display text-lg">"{quote}"</p>
              <p className="text-gray-500 text-sm mt-2 font-semibold">— {quoteAuthor}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   VALUES
   ════════════════════════════════════════════════════════════ */
function ValuesSection({ data }: { data: any }) {
  if (!data) return null;
  return (
    <section id="values" className="py-28 bg-white">
      <div className="container">
        <div className="hidden-anim text-center mb-16" data-anim="fadeInUp">
          <span className="section-badge bg-yellow-100 text-yellow-700 mb-6">
            <i className="fas fa-heart mr-2" />
            {data.eyebrow}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            {data.title} <span className="text-gradient-green">{data.titleAccent}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">{data.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(data.items || []).map((v: any, i: number) => (
            <div
              key={i}
              className="hidden-anim card-modern bg-white rounded-2xl p-7 text-center"
              data-anim="fadeInUp"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-green-50 flex items-center justify-center mb-5">
                <i className={`${v.icon} text-green-500 text-xl`} />
              </div>
              <h3 className="font-extrabold text-gray-900 mb-2">{v.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   IMPACT
   ════════════════════════════════════════════════════════════ */
function ImpactSection({ data }: { data: any }) {
  if (!data) return null;
  return (
    <section id="impact" className="py-20 mesh-bg-dark noise-overlay relative overflow-hidden">
      <div className="container relative">
        <div className="hidden-anim text-center mb-14" data-anim="fadeInUp">
          <span className="section-badge bg-white/10 text-yellow-400 mb-6">
            <i className="fas fa-chart-line mr-2" />
            {data.eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            {data.title}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">{data.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {(data.stats || []).map((s: any, i: number) => (
            <div
              key={i}
              className="hidden-anim stat-card rounded-2xl p-6 text-center"
              data-anim="scaleIn"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-green-500/20 flex items-center justify-center mb-3">
                <i className={`${s.icon} text-green-400 text-lg`} />
              </div>
              <div
                className={`text-3xl font-extrabold text-white ${s.static ? '' : 'counter-value'}`}
                data-target={s.static ? undefined : s.value}
              >
                {s.static ? s.value : '0'}
              </div>
              <div className="text-white/50 text-xs mt-1.5 font-semibold">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="hidden-anim glass rounded-2xl p-7" data-anim="fadeInLeft">
            <h3 className="text-white font-extrabold text-lg mb-4 flex items-center">
              <i className="fas fa-users text-yellow-400 mr-3" />
              {data.directTitle}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(data.directTags || []).map((t: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-semibold border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="hidden-anim glass rounded-2xl p-7" data-anim="fadeInRight">
            <h3 className="text-white font-extrabold text-lg mb-4 flex items-center">
              <i className="fas fa-share-nodes text-yellow-400 mr-3" />
              {data.indirectTitle}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(data.indirectTags || []).map((t: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-semibold border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   PROGRAMS
   ════════════════════════════════════════════════════════════ */
function ProgramsSection({ data }: { data: any }) {
  if (!data) return null;
  return (
    <section id="programs" className="py-28 bg-white">
      <div className="container">
        <div className="hidden-anim text-center mb-16" data-anim="fadeInUp">
          <span className="section-badge bg-green-50 text-green-700 mb-6">
            <i className="fas fa-cogs mr-2" />
            {data.eyebrow}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            {data.title} <span className="text-gradient-green">{data.titleAccent}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">{data.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(data.items || []).map((p: any, i: number) => (
            <div
              key={i}
              id={p.id}
              className="hidden-anim card-modern bg-white rounded-3xl overflow-hidden"
              data-anim="fadeInUp"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="h-52 relative overflow-hidden img-zoom">
                <img src={p.image} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 text-gray-800 text-xs font-extrabold uppercase tracking-wide">
                  {p.tag}
                </span>
                <i className={`${p.icon} text-white text-3xl absolute bottom-4 left-4 drop-shadow-lg`} />
              </div>
              <div className="p-7">
                <h3 className="text-xl font-extrabold text-gray-900 mb-3">{p.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4 text-sm">{p.text}</p>
                <ul className="space-y-1.5 mb-5 text-sm text-gray-600">
                  {(p.features || []).map((f: string, fi: number) => (
                    <li key={fi} className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2 text-xs" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={p.link} className="inline-flex items-center text-green-600 font-bold text-sm">
                  Learn more <i className="fas fa-arrow-right ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   FEATURED
   ════════════════════════════════════════════════════════════ */
function FeaturedSection({ data }: { data: any }) {
  if (!data) return null;
  const steps = data.steps || [];
  return (
    <section className="py-28 mesh-bg-2">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="hidden-anim order-2 lg:order-1" data-anim="fadeInLeft">
            <span className="section-badge bg-yellow-100 text-yellow-700 mb-6">
              <i className="fas fa-star mr-2" />
              {data.eyebrow}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {data.title}<br />
              <span className="text-gradient-gold">{data.titleAccent}</span> {data.titleEnd}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">{data.text}</p>

            <div className="space-y-5 mb-10">
              {steps.map((s: any, i: number) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="timeline-dot" />
                    {i < steps.length - 1 && <div className="w-0.5 h-14 bg-green-200 mt-2" />}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-900">{s.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href={data.ctaLink} className="btn-primary px-8 py-4 rounded-2xl font-bold">
              <span>{data.ctaText}</span>
              <i className="fas fa-arrow-right ml-3" />
            </Link>
          </div>

          <div className="hidden-anim order-1 lg:order-2" data-anim="fadeInRight">
            <div className="overflow-hidden rounded-3xl h-[540px] shadow-2xl img-zoom relative">
              <img src={data.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 flex items-center justify-between">
                <div>
                  <p className="text-white font-extrabold text-lg">{data.imageCaption}</p>
                  <p className="text-white/70 text-sm">{data.imageSubcaption}</p>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-yellow-400 flex items-center justify-center">
                  <i className="fas fa-female text-yellow-400 text-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   ACHIEVEMENTS
   ════════════════════════════════════════════════════════════ */
function AchievementsSection({ data }: { data: any }) {
  if (!data) return null;
  return (
    <section className="py-28 bg-white">
      <div className="container">
        <div className="hidden-anim text-center mb-16" data-anim="fadeInUp">
          <span className="section-badge bg-blue-50 text-blue-700 mb-6">
            <i className="fas fa-trophy mr-2" />
            {data.eyebrow}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            {data.title} <span className="text-gradient-green">{data.titleAccent}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">{data.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(data.items || []).map((a: any, i: number) => (
            <div
              key={i}
              className="hidden-anim bg-gray-50 rounded-3xl p-7 border border-gray-100"
              data-anim="fadeInUp"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center mb-5">
                <i className={`${a.icon} text-white`} />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-3">{a.title}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {(a.points || []).map((pt: string, pi: number) => (
                  <li key={pi} className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mr-2 mt-0.5 text-xs" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   PARTNERS
   ════════════════════════════════════════════════════════════ */
function PartnersSection({ data }: { data: any }) {
  if (!data) return null;

  const items: any[] = Array.isArray(data.items) ? data.items : [];

  return (
    <section className="py-16 bg-white border-y border-gray-100 overflow-hidden">
      <div className="container mb-8">
        <p className="text-center text-gray-400 text-sm font-bold uppercase tracking-wider">
          {data.title}
        </p>
      </div>

      {items.length === 0 ? (
        <p className="text-center text-gray-400 text-sm italic">
          Partners coming soon
        </p>
      ) : (
        <div className="relative overflow-hidden">
          <div className="marquee-track">
            {[0, 1].map((dup) => (
              <div
                key={dup}
                className="flex items-center gap-14 px-7"
                aria-hidden={dup === 1}
              >
                {items.map((p: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 whitespace-nowrap shrink-0"
                    title={p.label || 'Partner'}
                  >
                    {p.logo ? (
                      /* Logo present → show image */
                      <img
                        src={p.logo}
                        alt={p.label || 'Partner logo'}
                        className="h-12 w-auto max-w-[160px] object-contain opacity-80 hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      /* No logo → show icon + name */
                      <>
                        <i
                          className={`${p.icon || 'fas fa-handshake'} text-2xl text-gray-400`}
                        />
                        <span className="text-gray-500 font-bold text-base">
                          {p.label}
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   CTA
   ════════════════════════════════════════════════════════════ */
function CtaSection({ data }: { data: any }) {
  if (!data) return null;
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="hero-image-bg">
        <div className="hero-overlay-photo" style={{ backgroundImage: `url(${data.backgroundImage})` }} />
      </div>
      <div className="absolute inset-0 bg-black/40" />
      <div className="container text-center relative z-10 max-w-4xl">
        <div className="hidden-anim" data-anim="scaleIn">
          <div className="w-20 h-20 mx-auto rounded-full bg-yellow-400/25 backdrop-blur flex items-center justify-center mb-8 text-4xl">
            🇸🇸
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
            {data.title}
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">{data.text}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={data.button1Link} className="btn-primary px-10 py-4 rounded-2xl font-bold text-lg">
              <i className="fas fa-hand-holding-heart mr-3" />
              <span>{data.button1Text}</span>
            </Link>
            <Link href={data.button2Link} className="btn-outline px-10 py-4 rounded-2xl font-bold text-lg">
              <i className="fas fa-donate mr-3" />
              <span>{data.button2Text}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   CONTACT
   ════════════════════════════════════════════════════════════ */
function ContactSection({ data }: { data: any }) {
  if (!data) return null;

  return (
    <section id="contact" className="py-28 bg-white">
      <div className="container">
        <div className="hidden-anim max-w-4xl mx-auto" data-anim="scaleIn">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 p-10 sm:p-14 text-center">
            {/* Decorative orbs */}
            <div
              className="orb"
              style={{
                width: 320,
                height: 320,
                background: 'rgba(7,137,48,.35)',
                top: -80,
                right: -80,
                pointerEvents: 'none',
              }}
            />
            <div
              className="orb"
              style={{
                width: 260,
                height: 260,
                background: 'rgba(255,209,0,.25)',
                bottom: -60,
                left: -60,
                animationDelay: '5s',
                pointerEvents: 'none',
              }}
            />

            <div className="relative z-10">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-6">
                <i className="fas fa-envelope mr-2" />
                {data.eyebrow}
              </span>

              <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
                {data.title}{' '}
                <span className="text-gradient-gold">{data.titleAccent}</span>
              </h2>

              <p className="text-white/75 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                {data.subtitle}
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="btn-primary px-8 py-4 rounded-2xl font-bold text-base"
                >
                  <span>Get in Touch</span>
                  <i className="fas fa-arrow-right ml-3" />
                </Link>
                <a
                  href={data.phoneLink || 'tel:+211925784075'}
                  className="btn-outline px-8 py-4 rounded-2xl font-bold text-base"
                >
                  <i className="fas fa-phone mr-3 text-sm" />
                  <span>{data.phone || 'Call Us'}</span>
                </a>
              </div>

              {/* Quick contact strip */}
              <div className="mt-12 pt-8 border-t border-white/10 grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-yellow-400 text-sm" />
                  </div>
                  <div>
                    <p className="text-white/50 text-[10px] font-bold uppercase tracking-wider">
                      {data.headOfficeTitle}
                    </p>
                    <p className="text-white text-sm font-semibold">
                      {data.headOfficeText}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-envelope text-yellow-400 text-sm" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white/50 text-[10px] font-bold uppercase tracking-wider">
                      {data.emailTitle}
                    </p>
                    <a
                      href={data.emailLink}
                      className="text-white text-sm font-semibold hover:text-yellow-400 truncate block"
                    >
                      {data.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-clock text-yellow-400 text-sm" />
                  </div>
                  <div>
                    <p className="text-white/50 text-[10px] font-bold uppercase tracking-wider">
                      {data.hoursTitle}
                    </p>
                    <p className="text-white text-sm font-semibold">
                      {data.hoursText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}