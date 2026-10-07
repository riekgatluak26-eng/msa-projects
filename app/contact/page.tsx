import Link from 'next/link';
import { getPage } from '@/lib/db';
import { contactPageDefaults } from '@/lib/defaults';
import ContactForm from '@/components/contact/ContactForm';
import FaqAccordion from '@/components/contact/FaqAccordion';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Mission for Sustainable Advancement (MSA) in South Sudan. Head office in Juba, field offices in Maridi, Aweil and Yei.',
};

export default async function ContactPage() {
  let data: any = { ...contactPageDefaults };
  try {
    const saved = await getPage('msa-contact-page');
    if (saved && typeof saved === 'object') {
      data = { ...contactPageDefaults, ...saved };
    }
  } catch {}

  return (
    <>
      <ContactHero data={data.hero} />
      <div className="flag-bar" />
      <DetailsGrid data={data.details} />
      <FormSection form={data.form} details={data.details} />
      <MapSection data={data.map} />
      <FaqSection data={data.faq} />
      <ContactCta data={data.cta} />
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   HERO
   ════════════════════════════════════════════════════════════ */
function ContactHero({ data }: { data: any }) {
  if (!data) return null;
  return (
    <section className="relative pt-40 pb-24 mesh-bg-dark noise-overlay overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="orb" style={{ width: 400, height: 400, background: 'rgba(7,137,48,.4)', top: -100, right: -100 }} />
        <div className="orb" style={{ width: 320, height: 320, background: 'rgba(0,51,160,.4)', bottom: -80, left: -80, animationDelay: '6s' }} />
      </div>

      <div className="container relative z-10 text-center max-w-3xl">
        <span className="section-badge bg-white/10 text-yellow-400 mb-6">
          <i className="fas fa-envelope mr-2" />
          {data.eyebrow}
        </span>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
          {data.title} <span className="text-gradient-gold">{data.titleAccent}</span>
        </h1>
        <p className="text-lg text-white/65 max-w-2xl mx-auto leading-relaxed">
          {data.subtitle}
        </p>

        {/* Quick contact pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <a
            href="tel:+211925784075"
            className="glass inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold hover:bg-white/15 transition-colors"
          >
            <i className="fas fa-phone text-green-400" />
            <span>+211 925 784 075</span>
          </a>
          <a
            href="mailto:info@msasouthsudan.org"
            className="glass inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold hover:bg-white/15 transition-colors"
          >
            <i className="fas fa-envelope text-green-400" />
            <span>info@msasouthsudan.org</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   DETAILS GRID — 4 offices + phone + email + hours
   ════════════════════════════════════════════════════════════ */
function DetailsGrid({ data }: { data: any }) {
  if (!data) return null;
  const offices: any[] = Array.isArray(data.offices) ? data.offices : [];

  const colorMap: Record<string, { grad: string; shadow: string; }> = {
    brand: { grad: 'from-green-500 to-green-700', shadow: 'shadow-green-500/25' },
    gold:  { grad: 'from-yellow-400 to-yellow-600', shadow: 'shadow-yellow-400/30' },
    navy:  { grad: 'from-blue-700 to-blue-900', shadow: 'shadow-blue-500/25' },
    red:   { grad: 'from-red-500 to-red-700', shadow: 'shadow-red-500/25' },
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container max-w-7xl">
        <div className="text-center mb-16 hidden-anim" data-anim="fadeInUp">
          <span className="section-badge bg-blue-50 text-blue-700 mb-6">
            <i className="fas fa-map-location-dot mr-2" />
            {data.eyebrow}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            {data.title} <span className="text-gradient-green">{data.titleAccent}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">{data.subtitle}</p>
        </div>

        {/* Office cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {offices.map((o, i) => {
            const c = colorMap[o.color] || colorMap.brand;
            return (
              <div
                key={i}
                className="hidden-anim card-modern bg-white rounded-2xl p-6 border border-gray-100"
                data-anim="fadeInUp"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.grad} shadow-lg ${c.shadow} flex items-center justify-center mb-4`}>
                  <i className={`${o.icon} text-white`} />
                </div>
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">
                  {o.label}
                </p>
                <h3 className="font-display text-xl font-extrabold text-gray-900 mb-2">
                  {o.city}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{o.address}</p>
                {o.note && (
                  <p className="text-xs text-gray-500 italic">{o.note}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Phone / Email / Hours row */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="hidden-anim bg-gradient-to-br from-green-50 to-white rounded-2xl p-7 border border-green-100" data-anim="fadeInUp">
            <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center mb-5 shadow-lg shadow-green-500/25">
              <i className="fas fa-phone text-white" />
            </div>
            <p className="text-[10px] font-extrabold text-green-700 uppercase tracking-widest mb-1">
              Call Us
            </p>
            <a
              href={data.phoneLink}
              className="font-display text-xl font-extrabold text-gray-900 hover:text-green-600 transition-colors block mb-2"
            >
              {data.phone}
            </a>
            {data.phoneAlt && (
              <a
                href={`tel:${data.phoneAlt}`}
                className="text-gray-600 text-sm hover:text-green-600 transition-colors block"
              >
                {data.phoneAlt}
              </a>
            )}
          </div>

          <div className="hidden-anim bg-gradient-to-br from-blue-50 to-white rounded-2xl p-7 border border-blue-100" data-anim="fadeInUp" style={{ animationDelay: '0.08s' }}>
            <div className="w-12 h-12 rounded-xl bg-blue-700 flex items-center justify-center mb-5 shadow-lg shadow-blue-500/25">
              <i className="fas fa-envelope text-white" />
            </div>
            <p className="text-[10px] font-extrabold text-blue-700 uppercase tracking-widest mb-1">
              Email Us
            </p>
            <a
              href={data.emailLink}
              className="font-display text-lg font-extrabold text-gray-900 hover:text-blue-700 transition-colors block mb-2 break-all"
            >
              {data.email}
            </a>
            {data.emailAlt && (
              <a
                href={`mailto:${data.emailAlt}`}
                className="text-gray-600 text-sm hover:text-blue-700 transition-colors block break-all"
              >
                {data.emailAlt}
              </a>
            )}
          </div>

          <div className="hidden-anim bg-gradient-to-br from-amber-50 to-white rounded-2xl p-7 border border-amber-100" data-anim="fadeInUp" style={{ animationDelay: '0.16s' }}>
            <div className="w-12 h-12 rounded-xl bg-yellow-400 flex items-center justify-center mb-5 shadow-lg shadow-yellow-400/30">
              <i className="fas fa-clock text-gray-900" />
            </div>
            <p className="text-[10px] font-extrabold text-yellow-700 uppercase tracking-widest mb-1">
              Office Hours
            </p>
            <p className="font-display text-lg font-extrabold text-gray-900 mb-2">
              {data.hoursText}
            </p>
            {data.hoursNote && (
              <p className="text-gray-500 text-xs">{data.hoursNote}</p>
            )}
          </div>
        </div>

        {/* Social row */}
        {data.socials?.length > 0 && (
          <div className="hidden-anim text-center mt-14" data-anim="fadeInUp">
            <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-4">
              Follow Us
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {data.socials.map((s: any, i: number) => (
                <a
                  key={i}
                  href={s.url}
                  aria-label={s.label}
                  className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-all hover:-translate-y-1"
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   FORM SECTION
   ════════════════════════════════════════════════════════════ */
function FormSection({ form, details }: { form: any; details: any }) {
  if (!form) return null;

  return (
    <section className="py-24 mesh-bg-1 relative overflow-hidden" id="contact-form">
      <div className="container max-w-7xl">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left: Info panel */}
          <div className="lg:col-span-2 hidden-anim" data-anim="fadeInLeft">
            <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 rounded-3xl p-8 lg:p-10 text-white h-full relative overflow-hidden">
              <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="orb" style={{ width: 300, height: 300, background: 'rgba(7,137,48,.4)', top: -80, right: -80 }} />
                <div className="orb" style={{ width: 240, height: 240, background: 'rgba(255,209,0,.3)', bottom: -60, left: -60, animationDelay: '5s' }} />
              </div>

              <div className="relative z-10">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 text-yellow-400 text-[10px] font-extrabold uppercase tracking-wider mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mr-2 animate-pulse" />
                  We reply within 2-3 days
                </span>

                <h3 className="font-display text-3xl font-extrabold mb-4 leading-tight">
                  Let&apos;s Build Something Meaningful Together
                </h3>
                <p className="text-white/70 leading-relaxed mb-8">
                  Whether you want to partner, volunteer, donate, or simply ask a question — our team reads every message and responds personally.
                </p>

                <div className="space-y-5 pt-6 border-t border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-map-marker-alt text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold text-white/50 uppercase tracking-widest mb-0.5">
                        Head Office
                      </p>
                      <p className="text-white font-semibold text-sm">
                        Juba, Central Equatoria State
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-phone text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold text-white/50 uppercase tracking-widest mb-0.5">
                        Phone
                      </p>
                      <a
                        href={details.phoneLink}
                        className="text-white font-semibold text-sm hover:text-yellow-400 transition-colors"
                      >
                        {details.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-envelope text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold text-white/50 uppercase tracking-widest mb-0.5">
                        Email
                      </p>
                      <a
                        href={details.emailLink}
                        className="text-white font-semibold text-sm hover:text-yellow-400 transition-colors break-all"
                      >
                        {details.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3 hidden-anim" data-anim="fadeInRight">
            <ContactForm form={form} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   MAP
   ════════════════════════════════════════════════════════════ */
function MapSection({ data }: { data: any }) {
  if (!data) return null;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container max-w-7xl">
        <div className="text-center mb-14 hidden-anim" data-anim="fadeInUp">
          <span className="section-badge bg-green-50 text-green-700 mb-6">
            <i className="fas fa-map-marked-alt mr-2" />
            {data.eyebrow}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            {data.title} <span className="text-gradient-green">{data.titleAccent}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">{data.subtitle}</p>
        </div>

        {/* Map container */}
        <div className="hidden-anim relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100" data-anim="scaleIn">
          {/* Frame accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-500 via-yellow-400 to-blue-700 z-10" />

          <div className="relative" style={{ height: '540px' }}>
            <iframe
              src={data.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MSA Head Office Location"
            />
          </div>

          {/* Floating card over map */}
          <div className="absolute top-6 left-6 sm:top-8 sm:left-8 max-w-[300px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 p-5 z-20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-blue-700 flex items-center justify-center shadow-lg shadow-green-500/25">
                <i className="fas fa-building text-white" />
              </div>
              <div>
                <p className="text-[10px] font-extrabold text-green-600 uppercase tracking-widest">
                  Head Office
                </p>
                <p className="font-extrabold text-gray-900 text-base leading-tight">
                  Juba, South Sudan
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Central Equatoria State, South Sudan
            </p>
            <a
              href={data.directionsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white text-xs font-bold hover:from-green-700 hover:to-green-800 transition-all shadow-sm"
            >
              <i className="fas fa-directions" />
              {data.directionsText || 'Get Directions'}
            </a>
          </div>
        </div>

        {/* Office chips below map */}
        <div className="hidden-anim flex flex-wrap justify-center gap-3 mt-8" data-anim="fadeInUp">
          {[
            { icon: 'fas fa-building', label: 'Head Office', city: 'Juba', color: 'gold' },
            { icon: 'fas fa-school', label: 'Field Office', city: 'Maridi', color: 'brand' },
            { icon: 'fas fa-city', label: 'Field Office', city: 'Aweil', color: 'brand' },
            { icon: 'fas fa-city', label: 'Field Office', city: 'Yei', color: 'brand' },
          ].map((o, i) => {
            const c = o.color === 'gold'
              ? 'bg-yellow-400 text-gray-900'
              : 'bg-green-500 text-white';
            return (
              <div key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200">
                <span className={`w-7 h-7 rounded-full ${c} flex items-center justify-center text-xs`}>
                  <i className={o.icon} />
                </span>
                <span className="text-xs font-bold text-gray-700">
                  {o.label} · <span className="text-gray-500 font-semibold">{o.city}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   FAQ
   ════════════════════════════════════════════════════════════ */
function FaqSection({ data }: { data: any }) {
  if (!data) return null;
  const items: any[] = Array.isArray(data.items) ? data.items : [];
  if (items.length === 0) return null;

  return (
    <section className="py-24 mesh-bg-2 relative overflow-hidden">
      <div className="container max-w-4xl">
        <div className="text-center mb-14 hidden-anim" data-anim="fadeInUp">
          <span className="section-badge bg-purple-50 text-purple-700 mb-6">
            <i className="fas fa-circle-question mr-2" />
            {data.eyebrow}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            {data.title} <span className="text-gradient-green">{data.titleAccent}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">{data.subtitle}</p>
        </div>

        <FaqAccordion items={items} />
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   CTA
   ════════════════════════════════════════════════════════════ */
function ContactCta({ data }: { data: any }) {
  if (!data) return null;
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="hero-image-bg">
        <div className="hero-overlay-photo" style={{ backgroundImage: `url(${data.backgroundImage})` }} />
      </div>
      <div className="absolute inset-0 bg-black/55" />

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
            <Link
              href={data.button1Link}
              className="btn-primary px-10 py-4 rounded-2xl font-bold text-lg"
            >
              <i className="fas fa-compass mr-3" />
              <span>{data.button1Text}</span>
            </Link>
            <Link
              href={data.button2Link}
              className="btn-outline px-10 py-4 rounded-2xl font-bold text-lg"
            >
              <i className="fas fa-hand-holding-heart mr-3" />
              <span>{data.button2Text}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}