'use client';

import FileUpload from '@/components/admin/FileUpload';
import {
  Field,
  TextArea,
  Select,
  Grid,
  InfoBanner,
  ItemCard,
} from '@/components/admin/Field';

/* ════════════════════════════════════════════════════════════
   PROGRAM GALLERY FORM — Reusable admin editor
   ════════════════════════════════════════════════════════════ */
export default function ProgramGalleryForm({
  data,
  setField,
  mutate,
  arrayActions,
  keyPath = 'gallery',
}: {
  data: any;
  setField: (path: string, value: any) => void;
  mutate: (fn: (d: any) => void) => void;
  arrayActions: (i: number, path: string) => any;
  keyPath?: string;
}) {
  const g = data[keyPath] || {};
  const items: any[] = Array.isArray(g.items) ? g.items : [];

  return (
    <div className="space-y-6">
      <InfoBanner>
        The gallery appears as a bento-style grid below the main content.
        Upload photos, add captions, and mark one as <strong>Large</strong>{' '}
        to make it span 2×2 tiles.
      </InfoBanner>

      {/* Section header */}
      <Grid cols={3}>
        <Field
          label="Eyebrow"
          value={g.eyebrow}
          onChange={(v) => setField(`${keyPath}.eyebrow`, v)}
        />
        <Field
          label="Title"
          value={g.title}
          onChange={(v) => setField(`${keyPath}.title`, v)}
        />
        <Field
          label="Title Accent"
          value={g.titleAccent}
          onChange={(v) => setField(`${keyPath}.titleAccent`, v)}
        />
      </Grid>
      <TextArea
        label="Subtitle"
        value={g.subtitle}
        onChange={(v) => setField(`${keyPath}.subtitle`, v)}
        rows={2}
      />

      {/* Items */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div>
          <h3 className="font-bold text-gray-900">
            Photos ({items.length})
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Mark one photo as &quot;Large&quot; to feature it in the grid.
          </p>
        </div>
        <button
          onClick={() =>
            mutate((d: any) => {
              if (!Array.isArray(d[keyPath].items)) d[keyPath].items = [];
              d[keyPath].items.push({
                image: '',
                badge: '',
                badgeColor: 'gold',
                title: 'New Photo',
                subtitle: '',
                size: 'small',
              });
            })
          }
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-600 text-white text-xs font-bold hover:bg-green-700 shadow-sm"
        >
          <i className="fas fa-plus" /> Add Photo
        </button>
      </div>

      {items.length === 0 && (
        <div className="text-center py-10 rounded-xl bg-gray-50 border border-dashed border-gray-200">
          <div className="w-12 h-12 mx-auto rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm">
            <i className="fas fa-images text-gray-400" />
          </div>
          <p className="text-sm text-gray-500">
            No photos yet. Click <strong>Add Photo</strong> to build your
            gallery.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item, i) => {
          const a = arrayActions(i, `${keyPath}.items`);
          return (
            <ItemCard
              key={i}
              index={i}
              title={item.title || 'Untitled'}
              canMoveUp={i > 0}
              canMoveDown={i < items.length - 1}
              {...a}
            >
              <FileUpload
                label="Photo"
                value={item.image}
                onChange={(v) => setField(`${keyPath}.items[${i}].image`, v)}
                help="Recommended 800×600 or larger. JPG, PNG or WebP."
              />

              <Grid cols={2}>
                <Field
                  label="Title"
                  value={item.title}
                  onChange={(v) =>
                    setField(`${keyPath}.items[${i}].title`, v)
                  }
                />
                <Field
                  label="Subtitle (optional)"
                  value={item.subtitle}
                  onChange={(v) =>
                    setField(`${keyPath}.items[${i}].subtitle`, v)
                  }
                />
                <Field
                  label="Badge Text (optional)"
                  value={item.badge}
                  onChange={(v) =>
                    setField(`${keyPath}.items[${i}].badge`, v)
                  }
                  help="Small label in the top-left corner, e.g. Featured"
                />
                <Select
                  label="Badge Color"
                  value={item.badgeColor}
                  onChange={(v) =>
                    setField(`${keyPath}.items[${i}].badgeColor`, v)
                  }
                  options={[
                    { value: 'gold', label: 'Gold' },
                    { value: 'brand', label: 'Green' },
                    { value: 'navy', label: 'Navy' },
                    { value: 'pink', label: 'Pink' },
                    { value: 'red', label: 'Red' },
                    { value: 'purple', label: 'Purple' },
                  ]}
                />
              </Grid>

              <Select
                label="Size in Grid"
                value={item.size || 'small'}
                onChange={(v) =>
                  setField(`${keyPath}.items[${i}].size`, v)
                }
                options={[
                  { value: 'small', label: 'Small (1×1 tile)' },
                  { value: 'large', label: 'Large (2×2 tiles — featured)' },
                ]}
                help="Only mark ONE photo as Large for the best layout."
              />
            </ItemCard>
          );
        })}
      </div>

      {/* Footer + CTA */}
      <div className="pt-4 border-t border-gray-100 space-y-3">
        <TextArea
          label="Footer Text (optional)"
          value={g.footerText}
          onChange={(v) => setField(`${keyPath}.footerText`, v)}
          rows={2}
        />
        <Grid cols={2}>
          <Field
            label="CTA Button Text"
            value={g.ctaText}
            onChange={(v) => setField(`${keyPath}.ctaText`, v)}
          />
          <Field
            label="CTA Button Link"
            value={g.ctaLink}
            onChange={(v) => setField(`${keyPath}.ctaLink`, v)}
            mono
          />
        </Grid>
      </div>
    </div>
  );
}