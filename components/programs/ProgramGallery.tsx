'use client';

import Link from 'next/link';

/* ════════════════════════════════════════════════════════════
   PROGRAM GALLERY — Reusable bento grid section
   ════════════════════════════════════════════════════════════ */
export default function ProgramGallery({
  data,
  background = 'mesh-bg-2',
}: {
  data: any;
  background?: 'mesh-bg-1' | 'mesh-bg-2' | 'bg-white';
}) {
  if (!data) return null;

  const items: any[] = Array.isArray(data.items) ? data.items : [];

  /* Only render items that actually have an image */
  const validItems = items.filter((g) => g && typeof g.image === 'string' && g.image.trim() !== '');

  if (validItems.length === 0) return null;

  const badgeColorMap: Record<string, string> = {
    gold: 'bg-yellow-400 text-gray-900',
    brand: 'bg-green-500/95 text-white',
    navy: 'bg-blue-700/95 text-white',
    pink: 'bg-pink-500/95 text-white',
    red: 'bg-red-500/95 text-white',
    purple: 'bg-purple-500/95 text-white',
  };

  return (
    <section className={`py-24 ${background} relative overflow-hidden`}>
      <div className="container">
        {/* ═══ Header ═══ */}
        <div
          className="text-center mb-14 hidden-anim"
          data-anim="fadeInUp"
        >
          <span className="section-badge bg-amber-100 text-yellow-700 mb-6">
            <i className="fas fa-images mr-2" />
            {data.eyebrow}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            {data.title}{' '}
            <span className="text-gradient-green">{data.titleAccent}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {data.subtitle}
          </p>
        </div>

        {/* ═══ Bento Grid ═══ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 auto-rows-[180px] sm:auto-rows-[220px] lg:auto-rows-[240px]">
          {validItems.map((g, i) => {
            const isLarge = g.size === 'large';
            const badgeClass =
              badgeColorMap[g.badgeColor] || badgeColorMap.gold;

            return (
              <figure
                key={i}
                className={`hidden-anim group relative rounded-3xl overflow-hidden shadow-lg cursor-pointer ${
                  isLarge ? 'col-span-2 row-span-2' : ''
                }`}
                data-anim="fadeInUp"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <img
                  src={g.image}
                  alt={g.title || 'Gallery image'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {g.badge && (
                  <span
                    className={`absolute top-5 left-5 inline-flex items-center px-3 py-1.5 rounded-full ${badgeClass} text-[10px] sm:text-xs font-extrabold tracking-wide uppercase`}
                  >
                    {isLarge && <i className="fas fa-star mr-1.5" />}
                    {g.badge}
                  </span>
                )}

                <figcaption
                  className={`absolute bottom-0 left-0 right-0 ${
                    isLarge ? 'p-6 sm:p-8' : 'p-5'
                  }`}
                >
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3
                        className={`text-white font-display font-extrabold leading-tight ${
                          isLarge ? 'text-xl sm:text-2xl' : 'text-base'
                        }`}
                      >
                        {g.title}
                      </h3>
                      <p
                        className={`text-white/70 mt-1 ${
                          isLarge
                            ? 'text-xs sm:text-sm max-w-md hidden sm:block'
                            : 'text-xs'
                        }`}
                      >
                        {g.subtitle}
                      </p>
                    </div>
                    {isLarge && (
                      <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400 transition-colors">
                        <i className="fas fa-expand text-white group-hover:text-gray-900 transition-colors" />
                      </div>
                    )}
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {/* ═══ Footer / CTA ═══ */}
        {(data.footerText || data.ctaText) && (
          <div
            className="text-center mt-14 hidden-anim"
            data-anim="fadeInUp"
          >
            {data.footerText && (
              <p className="text-gray-500 text-sm mb-6 max-w-xl mx-auto">
                {data.footerText}
              </p>
            )}
            {data.ctaText && (
              <Link
                href={data.ctaLink || '/contact'}
                className="btn-primary px-8 py-4 rounded-2xl font-bold"
              >
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