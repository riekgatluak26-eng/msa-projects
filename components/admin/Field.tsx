'use client';

import { ReactNode, useState } from 'react';

/* ════════════════════════════════════════════════════════════
   BASE INPUTS
   ════════════════════════════════════════════════════════════ */

export function Field({
  label,
  value,
  onChange,
  placeholder,
  help,
  type = 'text',
  mono = false,
}: {
  label: string;
  value: any;
  onChange: (v: string) => void;
  placeholder?: string;
  help?: string;
  type?: string;
  mono?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/15 ${
          mono ? 'font-mono text-xs' : ''
        }`}
      />
      {help && (
        <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">{help}</p>
      )}
    </div>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  help,
  rows = 4,
  mono = false,
}: {
  label: string;
  value: any;
  onChange: (v: string) => void;
  placeholder?: string;
  help?: string;
  rows?: number;
  mono?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
      </label>
      <textarea
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/15 resize-y ${
          mono ? 'font-mono text-xs' : ''
        }`}
      />
      {help && (
        <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">{help}</p>
      )}
    </div>
  );
}

export function Select({
  label,
  value,
  onChange,
  options,
  help,
}: {
  label: string;
  value: any;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  help?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
      </label>
      <select
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/15"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {help && (
        <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">{help}</p>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   LAYOUT HELPERS
   ════════════════════════════════════════════════════════════ */

export function SectionHeader({
  icon,
  title,
  description,
  accent = 'green',
}: {
  icon: string;
  title: string;
  description: string;
  accent?: 'green' | 'blue' | 'amber' | 'red' | 'purple';
}) {
  const accents: Record<string, { bg: string; text: string }> = {
    green: { bg: 'bg-green-50', text: 'text-green-600' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600' },
    red: { bg: 'bg-red-50', text: 'text-red-600' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600' },
  };
  const a = accents[accent] || accents.green;

  return (
    <div className="flex items-start gap-4 pb-6 mb-6 border-b border-gray-100">
      <div
        className={`w-12 h-12 rounded-xl ${a.bg} flex items-center justify-center flex-shrink-0`}
      >
        <i className={`${icon} ${a.text} text-lg`} />
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export function Grid({
  children,
  cols = 2,
  className = '',
}: {
  children: ReactNode;
  cols?: 1 | 2 | 3;
  className?: string;
}) {
  const map = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };
  return (
    <div className={`grid ${map[cols]} gap-4 ${className}`}>{children}</div>
  );
}

export function InfoBanner({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-blue-900 flex items-start gap-3">
      <i className="fas fa-info-circle text-blue-500 mt-0.5" />
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   REPEATING ITEM CARD
   ════════════════════════════════════════════════════════════ */

export function ItemCard({
  index,
  title,
  onMoveUp,
  onMoveDown,
  onRemove,
  onDuplicate,
  canMoveUp,
  canMoveDown,
  children,
  defaultOpen = false,
}: {
  index: number;
  title: string;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  onDuplicate?: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-xl border border-gray-200 bg-white overflow-hidden"
    >
      <summary className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none hover:bg-gray-50 transition-colors list-none">
        <span className="w-7 h-7 rounded-lg bg-green-50 text-green-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
          {index + 1}
        </span>
        <span className="font-semibold text-sm text-gray-800 flex-1 truncate">
          {title}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onMoveUp();
          }}
          disabled={!canMoveUp}
          className="w-7 h-7 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-gray-500"
          title="Move up"
        >
          <i className="fas fa-arrow-up text-xs" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onMoveDown();
          }}
          disabled={!canMoveDown}
          className="w-7 h-7 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-gray-500"
          title="Move down"
        >
          <i className="fas fa-arrow-down text-xs" />
        </button>
        {onDuplicate && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onDuplicate();
            }}
            className="w-7 h-7 rounded-lg hover:bg-blue-50 text-blue-500 flex items-center justify-center"
            title="Duplicate"
          >
            <i className="fas fa-copy text-xs" />
          </button>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (confirm('Remove this item?')) onRemove();
          }}
          className="w-7 h-7 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center"
          title="Remove"
        >
          <i className="fas fa-trash-alt text-xs" />
        </button>
        <i className="fas fa-chevron-down text-xs text-gray-400 transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-4 pb-4 pt-1 border-t border-gray-100 space-y-4">
        {children}
      </div>
    </details>
  );
}

/* ════════════════════════════════════════════════════════════
   TAG EDITOR
   ════════════════════════════════════════════════════════════ */

export function TagEditor({
  label = 'Tags',
  tags,
  onChange,
}: {
  label?: string;
  tags: string[];
  onChange: (t: string[]) => void;
}) {
  const [input, setInput] = useState('');

  const add = () => {
    const v = input.trim();
    if (!v) return;
    onChange([...tags, v]);
    setInput('');
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
      </label>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {tags.map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-xs font-semibold text-gray-700"
            >
              {t}
              <button
                type="button"
                onClick={() => onChange(tags.filter((_, x) => x !== i))}
                className="text-gray-400 hover:text-red-500"
                aria-label={`Remove ${t}`}
              >
                <i className="fas fa-times text-[9px]" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add();
            }
          }}
          placeholder="Type and press Enter"
          className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/15 outline-none"
        />
        <button
          type="button"
          onClick={add}
          className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200"
        >
          Add
        </button>
      </div>
    </div>
  );
}