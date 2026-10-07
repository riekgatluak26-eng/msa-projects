import Link from 'next/link';
import { getPage } from '@/lib/db';
import { impactPageDefaults } from '@/lib/defaults';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Our Impact',
  description:
    'MSA\'s measurable impact across South Sudan — 10,663 direct beneficiaries, 30,000+ radio listeners, education, health, livelihoods and disaster resilience.',
};

export default async function ImpactPage() {
  let data: any = { ...impactPageDefaults };
  try {
    const saved = await getPage('msa-impact-page');
    if (saved && typeof saved === 'object') {
      data = { ...impactPageDefaults, ...saved };
    }
  } catch {}

  return (
    <>
      <SplitHero data={data.hero} />
      <div className="flag-bar" />
      <AtAGlance data={data.atAGlance} />
      <Programs data={data.programs} />
      <DisasterRisk data={data.disasterRisk} />
      <ImpactNumbers data={data.impactNumbers} />
      <SuccessStories data={data.successStories} />
      <Partners data={data.partners} />
      <SupportCta data={data.support} />
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
        <div className="orb" style={{ width: 288, height: 288, background: 'rgba(7,137,48,.25)', top: -40, right: -64 }} />
        <div className="orb" style={{ width: 256, height: 256, background: 'rgba(255,209,0,.22)', bottom: 40, left: 0, animationDelay: '5s' }} />
        <div className="orb" style={{ width: 192, height: 192, background: 'rgba(0,51,160,.18)', top: '50%', right: '33%', animationDelay: '9s' }} />

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
              <i className="fas fa-handshake mr-2.5" />
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
   AT A GLANCE — 4 BIG CARDS
   ════════════════════════════════════════════════════════════ */
function AtAGlance({ data }: { data: any }) {
  if (!data) return null;
  const cards: any[] = Array.isArray(data.cards) ? data.cards : [];

  const colorMap: Record<string, { grad: string; shadow: string; icon: string; text: string; }> = {
    brand: { grad: 'from-green-500 to-green-700', shadow: 'shadow-green-500/25', icon: 'bg-green-500', text: 'text-green-600' },
    gold:  { grad: 'from-yellow-400 to-yellow-600', shadow: 'shadow-yellow-400/30', icon: 'bg-yellow-400', text: 'text-yellow-600' },
    red:   { grad: 'from-red-500 to-red-700', shadow: 'shadow-red-500/25', icon: 'bg-red-500', text: 'text-red-500' },
    navy:  { grad: 'from-blue-700 to-blue-900', shadow: 'shadow-blue-500/25', icon: 'bg-blue-700', text: 'text-blue-700' },
    purple: { grad: 'from-purple-500 to-purple-700', shadow: 'shadow-purple-500/25', icon: 'bg-purple-500', text: 'text-purple-600' },
    pink:  { grad: 'from-pink-500 to-pink-700', shadow: 'shadow-pink-500/25', icon: 'bg-pink-500', text: 'text-pink-600' },
  };

  return (
    <section id="at-a-glance" className="py-24 mesh-bg-1 relative overflow-hidden">
      <div className="container max-w-7xl">
        <div className="text-center mb-16 hidden-anim" data-anim="fadeInUp">
          <span className="section-badge bg-green-50 text-green-700 mb-6">
            <i className="fas fa-calendar-check mr-2" />
            {data.eyebrow}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            {data.title} <span className="text-gradient-green">{data.titleAccent}</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">{data.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => {
            const cl = colorMap[c.color] || colorMap.brand;
            return (
              <div
                key={i}
                className="hidden-anim group relative bg-white rounded-3xl p-8 border border-gray-100 card-modern overflow-hidden text-center"
                data-anim="fadeInUp"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Top gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cl.grad}`} />

                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${cl.grad} flex items-center justify-center shadow-lg ${cl.shadow} mb-6`}>
                  <i className={`${c.icon} text-white text-2xl`} />
                </div>

                <div className="mb-3">
                  <div
                    className={`text-4xl sm:text-5xl font-extrabold bg-gradient-to-r ${cl.grad} bg-clip-text text-transparent tabular-nums ${c.static ? '' : 'counter-value'}`}
                    data-target={c.static ? undefined : c.value}
                  >
                    {c.static ? `${c.value}${c.suffix || ''}` : '0'}
                  </div>
                </div>

                <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider mb-3">
                  {c.label}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed">{c.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   PROGRAMS — 5 IMPACT BLOCKS
   ════════════════════════════════════════════════════════════ */
function Programs({ data }: { data: any }) {
  if (!data) return null;
  const items: any[] = Array.isArray(data.items) ? data.items : [];

  const palette: Record<string, { grad: string; shadow: string; badge: string; }> = {
    brand:  { grad: 'from-green-500 to-green-700',  shadow: 'shadow-green-500/25',  badge: 'bg-green-50 text-green-700' },
    navy:   { grad: 'from-blue-700 to-blue-900',    shadow: 'shadow-blue-500/25',   badge: 'bg-blue-50 text-blue-700' },
    gold:   { grad: 'from-yellow-400 to-yellow-600', shadow: 'shadow-yellow-400/30', badge: 'bg-amber-50 text-yellow-700' },
    red:    { grad: 'from-red-500 to-red-700',      shadow: 'shadow-red-500/25',    badge: 'bg-red-50 text-red-600' },
    purple: { grad: 'from-purple-500 to-purple-700', shadow: 'shadow-purple-500/25', badge: 'bg-purple-50 text-purple-600' },
  };

  return (
    <section id="programs" className="py-24 mesh-bg-2 relative overflow-hidden">
      <div className="container max-w-7xl">
        <div className="text-center mb-16 hidden-anim" data-anim="fadeInUp">
          <span className="section-badge bg-blue-50 text-blue-700 mb-6">
            <i className="fas fa-trophy mr-2" />
            {data.eyebrow}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            {data.title} <span className="text-gradient-green">{data.titleAccent}</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">{data.subtitle}</p>
        </div>

        <div className="space-y-20">
          {items.map((item, i) => {
            const isReversed = i % 2 === 1;
            const p = palette[item.color] || palette.brand;

            return (
              <div
                key={i}
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  isReversed ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Image side */}
                <div className={`hidden-anim relative ${isReversed ? 'lg:order-2' : ''}`} data-anim={isReversed ? 'fadeInRight' : 'fadeInLeft'}>
                  <div className="relative">
                    <div className="overflow-hidden rounded-3xl h-[420px] shadow-2xl img-zoom">
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    {/* Big number badge */}
                    <div className={`absolute -top-5 ${isReversed ? '-left-5' : '-right-5'} w-24 h-24 rounded-3xl bg-gradient-to-br ${p.grad} shadow-2xl ${p.shadow} flex flex-col items-center justify-center text-white`}>
                      <span className="text-[10px] font-extrabold tracking-widest opacity-70">PROGRAM</span>
                      <span className="text-3xl font-extrabold">{item.number}</span>
                    </div>

                    {/* Supporter badge */}
                    {item.supporter && (
                      <div className={`absolute bottom-4 ${isReversed ? 'right-4' : 'left-4'} glass rounded-xl px-4 py-2 backdrop-blur-md max-w-[80%]`}>
                        <p className="text-[10px] font-extrabold text-yellow-400 uppercase tracking-wider">Supported by</p>
                        <p className="text-white text-xs font-semibold">{item.supporter}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content side */}
                <div className={`hidden-anim ${isReversed ? 'lg:order-1' : ''}`} data-anim={isReversed ? 'fadeInLeft' : 'fadeInRight'}>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.grad} flex items-center justify-center shadow-lg ${p.shadow} mb-6`}>
                    <i className={`${item.icon} text-white text-2xl`} />
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">{item.description}</p>

                  {/* Achievements grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(item.achievements || []).map((a: any, ai: number) => (
                      <div
                        key={ai}
                        className="rounded-2xl bg-white border border-gray-100 p-4 text-center hover:shadow-lg hover:-translate-y-1 transition-all"
                      >
                        <div className={`w-8 h-8 mx-auto rounded-lg ${p.badge} flex items-center justify-center mb-2`}>
                          <i className={`${a.icon} text-xs`} />
                        </div>
                        <div
                          className={`text-xl font-extrabold text-gray-900 ${a.static ? '' : 'counter-value'}`}
                          data-target={a.static ? undefined : a.value}
                        >
                          {a.static ? `${a.value}${a.suffix || ''}` : '0'}
                        </div>
                        <div className="text-[10px] font-semibold text-gray-500 mt-1 leading-tight uppercase tracking-wide">
                          {a.label}
                        </div>
                      </div>
                    ))}
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
   DISASTER RISK 2023
   ════════════════════════════════════════════════════════════ */
function DisasterRisk({ data }: { data: any }) {
  if (!data) return null;

  const colorMap: Record<string, string> = {
    brand: 'bg-green-500/20 text-green-400',
    navy: 'bg-blue-500/20 text-blue-400',
    gold: 'bg-yellow-400/20 text-yellow-400',
    red: 'bg-red-500/20 text-red-400',
    purple: 'bg-purple-500/20 text-purple-400',
  };

  const accentMap: Record<string, { grad: string; shadow: string; }> = {
    brand: { grad: 'from-green-500 to-green-700', shadow: 'shadow-green-500/25' },
    red:   { grad: 'from-red-500 to-red-700', shadow: 'shadow-red-500/25' },
    gold:  { grad: 'from-yellow-400 to-yellow-600', shadow: 'shadow-yellow-400/30' },
    navy:  { grad: 'from-blue-700 to-blue-900', shadow: 'shadow-blue-500/25' },
  };

  return (
    <section id="disaster-risk" className="py-24 mesh-bg-dark noise-overlay relative overflow-hidden">
      <div className="container relative z-10 max-w-7xl">
        <div className="text-center mb-14 hidden-anim" data-anim="fadeInUp">
          <span className="section-badge bg-white/10 text-yellow-400 mb-6">
            <i className="fas fa-shield-halved mr-2" />
            {data.eyebrow}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            {data.title} <span className="text-gradient-gold">{data.titleAccent}</span>
          </h2>
          {data.partnership && (
            <p className="text-yellow-400 text-sm font-bold mb-4 uppercase tracking-wider">
              <i className="fas fa-handshake mr-2" />
              {data.partnership}
            </p>
          )}
          <p className="text-white/65 max-w-4xl mx-auto text-lg leading-relaxed">{data.subtitle}</p>
        </div>

        {/* Top stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {(data.stats || []).map((s: any, i: number) => (
            <div
              key={i}
              className="hidden-anim stat-card rounded-2xl p-6 text-center"
              data-anim="scaleIn"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className={`w-12 h-12 mx-auto rounded-xl ${colorMap[s.color] || colorMap.brand} flex items-center justify-center mb-3`}>
                <i className={`${s.icon} text-lg`} />
              </div>
              <div className="text-3xl font-extrabold text-white counter-value" data-target={s.value}>
                0
              </div>
              <div className="text-white/50 text-xs mt-1.5 font-semibold">{s.label}</div>
            </div>
          ))}
        </div>

        {/* EWC section */}
        <div className="hidden-anim grid lg:grid-cols-3 gap-6 mb-16" data-anim="fadeInUp">
          <div className="lg:col-span-2 glass rounded-3xl p-8">
            <h3 className="font-display text-2xl font-extrabold text-white mb-4 flex items-center gap-3">
              <i className="fas fa-satellite-dish text-yellow-400" />
              {data.ewcTitle}
            </h3>
            <p className="text-white/70 leading-relaxed mb-6">{data.ewcText}</p>

            {/* Attendance chips */}
            <div className="flex flex-wrap gap-3">
              {(data.attendance || []).map((a: any, i: number) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 min-w-[100px]">
                  <div className="text-2xl font-extrabold text-white tabular-nums">{a.value}</div>
                  <div className="text-[10px] font-extrabold text-yellow-400 uppercase tracking-wider mt-1">
                    {a.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements side */}
          <div className="space-y-4">
            {(data.achievements || []).map((a: any, i: number) => {
              const acc = accentMap[a.color] || accentMap.brand;
              return (
                <div
                  key={i}
                  className="hidden-anim glass rounded-2xl p-5"
                  data-anim="fadeInRight"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${acc.grad} shadow-lg ${acc.shadow} flex items-center justify-center flex-shrink-0`}>
                      <i className={`${a.icon} text-white text-sm`} />
                    </div>
                    <div>
                      <h4 className="text-white font-extrabold text-sm mb-1">{a.title}</h4>
                      <p className="text-white/60 text-xs leading-relaxed">{a.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Public Awareness + Boma Table */}
        <div className="hidden-anim glass rounded-3xl p-8 mb-16" data-anim="fadeInUp">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-yellow-400/20 flex items-center justify-center">
              <i className="fas fa-bullhorn text-yellow-400 text-lg" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-extrabold text-white">{data.awarenessTitle}</h3>
            </div>
          </div>
          <p className="text-white/70 leading-relaxed mb-6">{data.awarenessText}</p>

          {/* Boma breakdown table */}
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="text-left text-xs font-extrabold text-yellow-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Boma Location</th>
                  <th className="py-3 px-4 text-right">PWDs</th>
                  <th className="py-3 px-4 text-right">IDPs</th>
                  <th className="py-3 px-4 text-right">Male</th>
                  <th className="py-3 px-4 text-right">Female</th>
                  <th className="py-3 px-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {(data.bomas || []).map((b: any, i: number) => (
                  <tr key={i} className="text-white/80 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-bold text-white">{b.name}</td>
                    <td className="py-4 px-4 text-right tabular-nums">{b.pwd}</td>
                    <td className="py-4 px-4 text-right tabular-nums">{b.idp}</td>
                    <td className="py-4 px-4 text-right tabular-nums">{b.male}</td>
                    <td className="py-4 px-4 text-right tabular-nums">{b.female}</td>
                    <td className="py-4 px-4 text-right tabular-nums font-extrabold text-yellow-400">
                      {b.total}
                    </td>
                  </tr>
                ))}
                <tr className="bg-white/5 font-extrabold">
                  <td className="py-4 px-4 text-white">TOTAL COVERAGE</td>
                  <td className="py-4 px-4 text-right text-yellow-400 tabular-nums">47</td>
                  <td className="py-4 px-4 text-right text-yellow-400 tabular-nums">212</td>
                  <td className="py-4 px-4 text-right text-yellow-400 tabular-nums">1,464</td>
                  <td className="py-4 px-4 text-right text-yellow-400 tabular-nums">1,221</td>
                  <td className="py-4 px-4 text-right text-yellow-400 tabular-nums">2,685</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Challenges & Success Story */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Challenges */}
          <div className="hidden-anim glass rounded-3xl p-8" data-anim="fadeInLeft">
            <h3 className="font-display text-2xl font-extrabold text-white mb-6 flex items-center gap-3">
              <i className="fas fa-cloud-showers-heavy text-blue-400" />
              Challenges & Adaptation
            </h3>
            <div className="space-y-4">
              {(data.challenges || []).map((c: any, i: number) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <i className={`${c.icon} text-blue-400 text-sm`} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1">{c.title}</h4>
                    <p className="text-white/60 text-xs leading-relaxed">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Success story */}
          {data.successStory && (
            <div className="hidden-anim relative rounded-3xl overflow-hidden" data-anim="fadeInRight">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-yellow-500" />
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,.15) 1px, transparent 1px), radial-gradient(circle at 80% 70%, rgba(255,255,255,.15) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              <div className="relative p-8">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                  <i className="fas fa-fire text-white text-2xl" />
                </div>
                <h3 className="font-display text-2xl font-extrabold text-white mb-4">
                  {data.successStory.title}
                </h3>
                <p className="text-white/90 leading-relaxed text-sm">{data.successStory.text}</p>
              </div>
            </div>
          )}
        </div>

        {/* Stakeholders */}
        {data.stakeholders?.length > 0 && (
          <div className="hidden-anim mt-16 text-center" data-anim="fadeInUp">
            <p className="text-white/50 text-xs font-extrabold uppercase tracking-widest mb-6">
              {data.stakeholdersTitle}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {data.stakeholders.map((s: any, i: number) => (
                <div
                  key={i}
                  className="glass rounded-2xl px-5 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors"
                >
                  <i className={`${s.icon} text-yellow-400 text-sm`} />
                  <span className="text-white text-sm font-bold">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   IMPACT NUMBERS
   ════════════════════════════════════════════════════════════ */
function ImpactNumbers({ data }: { data: any }) {
  if (!data) return null;
  const items: any[] = Array.isArray(data.items) ? data.items : [];

  const colorMap: Record<string, string> = {
    brand: 'bg-green-500/15 text-green-500',
    navy: 'bg-blue-500/15 text-blue-600',
    gold: 'bg-yellow-400/20 text-yellow-600',
    red: 'bg-red-500/15 text-red-500',
    purple: 'bg-purple-500/15 text-purple-500',
    pink: 'bg-pink-500/15 text-pink-500',
    green: 'bg-green-500/15 text-green-500',
  };

  return (
    <section id="impact-numbers" className="py-24 bg-white relative overflow-hidden">
      <div className="container max-w-7xl">
        <div className="text-center mb-16 hidden-anim" data-anim="fadeInUp">
          <span className="section-badge bg-amber-100 text-yellow-700 mb-6">
            <i className="fas fa-chart-bar mr-2" />
            {data.eyebrow}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            {data.title} <span className="text-gradient-green">{data.titleAccent}</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">{data.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {items.map((s, i) => (
            <div
              key={i}
              className="hidden-anim card-modern group bg-white rounded-2xl p-6 border border-gray-100 hover:border-green-200"
              data-anim="scaleIn"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className={`w-11 h-11 rounded-xl ${colorMap[s.color] || colorMap.brand} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <i className={`${s.icon} text-lg`} />
              </div>
              <div
                className={`text-3xl font-extrabold text-gray-900 tabular-nums ${s.static ? '' : 'counter-value'}`}
                data-target={s.static ? undefined : s.value}
              >
                {s.static ? `${s.value}${s.suffix || ''}` : '0'}
              </div>
              <div className="text-gray-500 text-xs mt-2 font-semibold leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   SUCCESS STORIES
   ════════════════════════════════════════════════════════════ */
function SuccessStories({ data }: { data: any }) {
  if (!data) return null;
  const items: any[] = Array.isArray(data.items) ? data.items : [];

  const badgeMap: Record<string, string> = {
    brand: 'bg-green-500 text-white',
    gold: 'bg-yellow-400 text-gray-900',
    red: 'bg-red-500 text-white',
    navy: 'bg-blue-700 text-white',
  };

  return (
    <section className="py-24 mesh-bg-1 relative overflow-hidden">
      <div className="container max-w-7xl">
        <div className="text-center mb-16 hidden-anim" data-anim="fadeInUp">
          <span className="section-badge bg-pink-50 text-pink-600 mb-6">
            <i className="fas fa-star mr-2" />
            {data.eyebrow}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            {data.title} <span className="text-gradient-green">{data.titleAccent}</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">{data.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {items.map((s, i) => (
            <article
              key={i}
              className="hidden-anim card-modern group bg-white rounded-3xl overflow-hidden border border-gray-100"
              data-anim="fadeInUp"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="relative h-56 img-zoom overflow-hidden">
                <img src={s.image} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                {s.badge && (
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full ${badgeMap[s.badgeColor] || badgeMap.brand} text-[10px] font-extrabold uppercase tracking-wide`}>
                    {s.badge}
                  </span>
                )}
              </div>
              <div className="p-7">
                {s.tag && (
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                    {s.tag}
                  </p>
                )}
                <h3 className="font-display text-xl font-extrabold text-gray-900 mb-3 leading-tight">
                  {s.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   PARTNERS
   ════════════════════════════════════════════════════════════ */
function Partners({ data }: { data: any }) {
  if (!data) return null;
  const items: any[] = Array.isArray(data.items) ? data.items : [];

  const colorMap: Record<string, { grad: string; shadow: string; }> = {
    brand: { grad: 'from-green-500 to-green-700', shadow: 'shadow-green-500/25' },
    gold:  { grad: 'from-yellow-400 to-yellow-600', shadow: 'shadow-yellow-400/30' },
    red:   { grad: 'from-red-500 to-red-700', shadow: 'shadow-red-500/25' },
    navy:  { grad: 'from-blue-700 to-blue-900', shadow: 'shadow-blue-500/25' },
    purple: { grad: 'from-purple-500 to-purple-700', shadow: 'shadow-purple-500/25' },
    pink:  { grad: 'from-pink-500 to-pink-700', shadow: 'shadow-pink-500/25' },
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container max-w-7xl">
        <div className="text-center mb-16 hidden-anim" data-anim="fadeInUp">
          <span className="section-badge bg-blue-50 text-blue-700 mb-6">
            <i className="fas fa-handshake mr-2" />
            {data.eyebrow}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            {data.title} <span className="text-gradient-green">{data.titleAccent}</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">{data.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {items.map((p, i) => {
            const c = colorMap[p.color] || colorMap.brand;
            return (
              <div
                key={i}
                className="hidden-anim group bg-white rounded-2xl p-6 border border-gray-100 card-modern text-center"
                data-anim="fadeInUp"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${c.grad} shadow-lg ${c.shadow} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <i className={`${p.icon} text-white text-xl`} />
                </div>
                <h3 className="font-extrabold text-gray-900 text-sm mb-1 leading-tight">{p.label}</h3>
                <p className="text-gray-500 text-xs">{p.subtitle}</p>
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
      <div className="absolute inset-0 bg-gradient-to-br from-green-700 via-green-600 to-yellow-600" />
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="orb" style={{ width: 384, height: 384, background: 'rgba(255,209,0,.4)', top: -96, right: -64 }} />
        <div className="orb" style={{ width: 320, height: 320, background: 'rgba(7,137,48,.4)', bottom: 0, left: -64, animationDelay: '6s' }} />
      </div>

      <div className="container max-w-4xl text-center relative z-10">
        <div className="hidden-anim" data-anim="scaleIn">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-7 shadow-2xl">
            <i className={`${data.icon} text-yellow-400 text-3xl`} />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
            {data.title}
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            {data.text}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={data.button1Link}
              className="px-8 py-4 rounded-2xl bg-white text-green-700 font-bold text-base inline-flex items-center hover:bg-yellow-400 hover:text-gray-900 transition-all shadow-lg"
            >
              <i className="fas fa-heart mr-3" />
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