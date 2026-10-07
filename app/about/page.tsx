import Link from 'next/link';
import { getPage } from '@/lib/db';
import { aboutDefaults } from '@/lib/defaults';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'About Us',
  description:
    'The story, mission, vision, values and capacity of Mission for Sustainable Advancement (MSA) in South Sudan.',
};

export default async function AboutPage() {
  let data: any = { ...aboutDefaults };
  try {
    const saved = await getPage('msa-about-page');
    if (saved && typeof saved === 'object') {
      data = { ...aboutDefaults, ...saved };
    }
  } catch {
    // silently fall back to defaults
  }

  return (
    <>
      <AboutHero data={data.hero} />
      <div className="flag-bar" />
      <WhoWeAre data={data.who} />
      <Journey data={data.journey} />
      <MissionVision data={data.mission} />
      <CoreValues data={data.values} />
      <Capacity data={data.capacity} />
      <AboutCta data={data.cta} />
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   HERO
   ════════════════════════════════════════════════════════════ */
function AboutHero({ data }: { data: any }) {
  if (!data) return null;
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="hero-image-bg">
        <div className="hero-overlay-photo" style={{ backgroundImage: `url(${data.backgroundImage})` }} />
        <div className="orb" style={{ width: 384, height: 384, background: 'rgba(7,137,48,.25)', top: -80, left: -80 }} />
        <div className="orb" style={{ width: 320, height: 320, background: 'rgba(0,51,160,.25)', bottom: 0, right: 0, animationDelay: '5s' }} />
      </div>

      <div className="container relative z-10" style={{ paddingTop: 160, paddingBottom: 96 }}>
        <div className="max-w-3xl">
          <span className="glass inline-flex items-center px-4 py-2 rounded-full text-yellow-400 text-sm font-bold mb-8">
            <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2 animate-pulse" />
            {data.badge}
          </span>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-8">
            {data.titleLine1}<br />
            <span className="text-gradient-gold">{data.titleLine2}</span><br />
            {data.titleLine3}
          </h1>

          <p className="text-lg sm:text-xl text-white/75 leading-relaxed max-w-2xl mb-12">
            {data.subtitle}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-white/10">
            {(data.stats || []).map((s: any, i: number) => (
              <div key={i}>
                <div
                  className={`text-3xl sm:text-4xl font-extrabold text-white ${s.static ? '' : 'counter-value'}`}
                  data-target={s.static ? undefined : s.value}
                >
                  {s.static ? s.value : '0'}
                </div>
                <div className="text-white/55 text-xs sm:text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   WHO WE ARE
   ════════════════════════════════════════════════════════════ */
function WhoWeAre({ data }: { data: any }) {
  if (!data) return null;
  return (
    <section id="who" className="py-28 mesh-bg-1 relative overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="hidden-anim lg:sticky lg:top-28" data-anim="fadeInLeft">
            <div className="relative">
              <div className="overflow-hidden rounded-3xl h-[600px] shadow-2xl img-zoom">
                <img src={data.image} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-white font-extrabold text-xl">{data.imageCaption}</p>
                  <p className="text-white/70 text-sm">{data.imageSubcaption}</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-green-500/15 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-blue-500/15 blur-2xl" />
            </div>
          </div>

          <div className="hidden-anim" data-anim="fadeInRight">
            <span className="section-badge bg-green-50 text-green-700 mb-6">
              <i className="fas fa-info-circle mr-2" />
              {data.eyebrow}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
              {data.title} <span className="text-gradient-green">{data.titleAccent}</span>{' '}
              {data.titleEnd}
            </h2>

            <div className="space-y-5 text-gray-600 leading-relaxed text-[17px]">
              <p className="first-letter:font-display first-letter:text-5xl first-letter:font-extrabold first-letter:text-green-600 first-letter:mr-2 first-letter:float-left first-letter:leading-none">
                {data.paragraph1}
              </p>
              <p>{data.paragraph2}</p>
              <p>{data.paragraph3}</p>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-200 grid grid-cols-2 gap-6">
              <div>
                <p className="text-3xl font-extrabold text-green-600 counter-value" data-target="15">
                  0
                </p>
                <p className="text-gray-500 text-sm mt-1">Years of Service</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-blue-700 counter-value" data-target="4">
                  0
                </p>
                <p className="text-gray-500 text-sm mt-1">Offices Nationwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   JOURNEY (TIMELINE)
   ════════════════════════════════════════════════════════════ */
function Journey({ data }: { data: any }) {
  if (!data) return null;
  const milestones: any[] = Array.isArray(data.milestones) ? data.milestones : [];

  return (
    <section id="journey" className="py-28 mesh-bg-dark noise-overlay relative overflow-hidden">
      <div className="container relative">
        <div className="text-center mb-20 hidden-anim" data-anim="fadeInUp">
          <span className="section-badge bg-white/10 text-yellow-400 mb-6">
            <i className="fas fa-timeline mr-2" />
            {data.eyebrow}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-4">
            {data.title} <span className="text-gradient-gold">{data.titleAccent}</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">{data.subtitle}</p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-yellow-400 to-blue-500 opacity-40" />

          <div className="space-y-12">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`hidden-anim relative flex items-start gap-6 sm:gap-0 ${
                    isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                  data-anim={isLeft ? 'fadeInLeft' : 'fadeInRight'}
                >
                  {/* Dot */}
                  <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 z-10 mt-2">
                    <div className="w-5 h-5 rounded-full bg-green-500 border-4 border-[#0f0f1a] shadow-lg shadow-green-500/40" />
                  </div>

                  {/* Content */}
                  <div className={`pl-14 sm:pl-0 sm:w-1/2 ${isLeft ? 'sm:pr-14 sm:text-right' : 'sm:pl-14'}`}>
                    <div className="glass rounded-2xl p-6">
                      <span className="inline-block px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-extrabold tracking-wider uppercase mb-3">
                        {m.year}
                      </span>
                      <h3 className="text-white font-display font-bold text-xl mb-2">
                        {m.title}
                      </h3>
                      <p className="text-white/65 text-sm leading-relaxed">{m.text}</p>
                    </div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden sm:block sm:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   MISSION & VISION
   ════════════════════════════════════════════════════════════ */
function MissionVision({ data }: { data: any }) {
  if (!data) return null;
  return (
    <section id="mission" className="py-28 bg-white">
      <div className="container">
        <div className="text-center mb-16 hidden-anim" data-anim="fadeInUp">
          <span className="section-badge bg-blue-50 text-blue-700 mb-6">
            <i className="fas fa-compass mr-2" />
            {data.eyebrow}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            {data.title} <span className="text-gradient-green">{data.titleAccent}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">{data.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <div className="hidden-anim relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-10 text-white" data-anim="fadeInLeft">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mb-6">
                <i className="fas fa-bullseye text-yellow-400 text-2xl" />
              </div>
              <h3 className="font-display text-3xl font-extrabold mb-4">{data.missionTitle}</h3>
              <p className="text-white/80 leading-relaxed text-lg">{data.missionText}</p>
            </div>
          </div>

          {/* Vision */}
          <div className="hidden-anim relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 via-green-600 to-green-800 p-10 text-white" data-anim="fadeInRight">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-yellow-400/20 blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mb-6">
                <i className="fas fa-eye text-yellow-400 text-2xl" />
              </div>
              <h3 className="font-display text-3xl font-extrabold mb-4">{data.visionTitle}</h3>
              <p className="text-white/80 leading-relaxed text-lg">{data.visionText}</p>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="hidden-anim max-w-3xl mx-auto" data-anim="fadeInUp">
          <div className="relative pl-8 py-4 border-l-4 border-yellow-400">
            <i className="fas fa-quote-left absolute -left-3 top-0 text-3xl text-yellow-400/20" />
            <p className="font-display italic text-2xl text-gray-800 leading-relaxed mb-3">
              "{data.quote}"
            </p>
            <p className="text-gray-500 text-sm font-semibold tracking-wide">— {data.quoteAuthor}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   CORE VALUES
   ════════════════════════════════════════════════════════════ */
function CoreValues({ data }: { data: any }) {
  if (!data) return null;
  const items: any[] = Array.isArray(data.items) ? data.items : [];

  return (
    <section id="values" className="py-28 mesh-bg-2 relative overflow-hidden">
      <div className="container">
        <div className="text-center mb-16 hidden-anim" data-anim="fadeInUp">
          <span className="section-badge bg-yellow-100 text-yellow-700 mb-6">
            <i className="fas fa-heart mr-2" />
            {data.eyebrow}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            {data.title} <span className="text-gradient-green">{data.titleAccent}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">{data.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((v, i) => (
            <div
              key={i}
              className="hidden-anim card-modern bg-white rounded-2xl p-7 text-center"
              data-anim="fadeInUp"
              style={{ animationDelay: `${i * 0.06}s` }}
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
   OUR CAPACITY
   ════════════════════════════════════════════════════════════ */
function Capacity({ data }: { data: any }) {
  if (!data) return null;
  const items: any[] = Array.isArray(data.items) ? data.items : [];

  return (
    <section id="capacity" className="py-28 bg-white relative overflow-hidden">
      <div className="container">
        <div className="text-center mb-16 hidden-anim" data-anim="fadeInUp">
          <span className="section-badge bg-blue-50 text-blue-700 mb-6">
            <i className="fas fa-shield-halved mr-2" />
            {data.eyebrow}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            {data.title} <span className="text-gradient-green">{data.titleAccent}</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">{data.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {items.map((c, i) => (
            <div
              key={i}
              className="hidden-anim card-modern group relative bg-white rounded-3xl p-8 border border-gray-100 overflow-hidden"
              data-anim="fadeInUp"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
                <i className={`${c.icon} text-white text-xl`} />
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-3">{c.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   CTA
   ════════════════════════════════════════════════════════════ */
function AboutCta({ data }: { data: any }) {
  if (!data) return null;
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="hero-image-bg">
        <div className="hero-overlay-photo" style={{ backgroundImage: `url(${data.backgroundImage})` }} />
      </div>
      <div className="absolute inset-0 bg-black/45" />
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
              <i className="fas fa-handshake mr-3" />
              <span>{data.button1Text}</span>
            </Link>
            <Link href={data.button2Link} className="btn-outline px-10 py-4 rounded-2xl font-bold text-lg">
              <i className="fas fa-arrow-right mr-3" />
              <span>{data.button2Text}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}