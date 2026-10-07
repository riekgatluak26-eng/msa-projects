'use client';

import { useState } from 'react';

export default function FaqAccordion({ items }: { items: any[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="hidden-anim space-y-4" data-anim="fadeInUp">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={`bg-white rounded-2xl border-2 transition-all overflow-hidden ${
              isOpen ? 'border-green-500 shadow-lg shadow-green-500/10' : 'border-gray-100 hover:border-gray-200'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-start gap-4 p-6 text-left"
              aria-expanded={isOpen}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                  isOpen ? 'bg-green-500' : 'bg-gray-100'
                }`}
              >
                <i
                  className={`fas fa-plus text-sm transition-transform duration-300 ${
                    isOpen ? 'text-white rotate-45' : 'text-gray-500'
                  }`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3
                  className={`font-extrabold text-base leading-snug transition-colors ${
                    isOpen ? 'text-green-700' : 'text-gray-900'
                  }`}
                >
                  {item.question}
                </h3>
              </div>

              <i
                className={`fas fa-chevron-down text-xs text-gray-400 mt-3 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-6 pl-20">
                  <p className="text-gray-600 leading-relaxed text-[15px]">{item.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}