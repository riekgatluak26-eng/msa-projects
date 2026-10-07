'use client';

import { useState, useRef, useCallback } from 'react';
import { upload } from '@vercel/blob/client';

interface FileUploadProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  help?: string;
  accept?: string;
  /** Route that generates the upload token */
  endpoint?: string;
  /** Max file size in bytes (default: 20 MB) */
  maxSize?: number;
}

export default function FileUpload({
  label,
  value = '',
  onChange,
  help,
  accept = 'image/*',
  endpoint = '/api/upload',
  maxSize = 20 * 1024 * 1024,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      setError('');
      setUploading(true);
      setProgress(0);

      try {
        const blob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: endpoint,
          onUploadProgress: (event) => {
            if (event.total) {
              setProgress(Math.round((event.loaded / event.total) * 100));
            }
          },
        });

        setProgress(100);
        onChange(blob.url);
        setTimeout(() => setProgress(0), 800);
      } catch (err: any) {
        console.error('Upload error:', err);
        const msg = err?.message || 'Upload failed';
        if (msg.toLowerCase().includes('too large')) {
          setError(`File is too large. Maximum ${Math.round(maxSize / 1024 / 1024)}MB.`);
        } else if (msg.toLowerCase().includes('content type')) {
          setError('File type not allowed.');
        } else {
          setError(msg);
        }
        setProgress(0);
      } finally {
        setUploading(false);
      }
    },
    [endpoint, onChange, maxSize]
  );

  const handleFile = (file?: File | null) => {
    if (!file) return;
    if (file.size > maxSize) {
      setError(`File is too large. Maximum ${Math.round(maxSize / 1024 / 1024)}MB.`);
      return;
    }
    uploadFile(file);
  };

  const isImage = accept.includes('image') && value && !uploading;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        {value && !uploading && (
          <button
            type="button"
            onClick={() => {
              onChange('');
              setError('');
            }}
            className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            <i className="fas fa-trash-alt text-[10px]" />
            Remove
          </button>
        )}
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        onClick={() => !uploading && inputRef.current?.click()}
        className={`relative overflow-hidden rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
          dragOver
            ? 'border-green-500 bg-green-50'
            : 'border-gray-200 bg-gray-50 hover:border-green-400 hover:bg-green-50/40'
        }`}
      >
        {isImage ? (
          <div className="relative h-44 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span className="text-white font-semibold text-sm bg-black/70 px-4 py-2 rounded-lg">
                <i className="fas fa-camera mr-2" />
                Click to change
              </span>
            </div>
            <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded">
              ✓ Uploaded
            </div>
          </div>
        ) : value ? (
          <div className="p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-file text-green-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {value.split('/').pop()}
              </p>
              <p className="text-xs text-gray-500 truncate font-mono">{value}</p>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
              <i className="fas fa-cloud-upload-alt text-green-600 text-xl" />
            </div>
            <p className="text-sm font-bold text-gray-700">
              Click to upload or drag & drop
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {help || 'PNG, JPG, SVG — up to 20MB'}
            </p>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                  <i className="fas fa-cloud-upload-alt text-green-600" />
                  Uploading...
                </span>
                <span className="text-xs font-bold text-green-600 tabular-nums">
                  {progress}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-200 ease-out"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #4ade80 0%, #078930 100%)',
                  }}
                />
              </div>
              <p className="text-[11px] text-gray-500 mt-2 text-center">
                Please don&apos;t close this page
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-xs text-red-600 flex items-center gap-1.5 font-medium">
          <i className="fas fa-exclamation-circle" />
          {error}
        </p>
      )}

      <details className="mt-2">
        <summary className="text-xs text-gray-500 cursor-pointer hover:text-green-600 select-none font-medium">
          <i className="fas fa-link mr-1" />
          Or paste an image URL manually
        </summary>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/example.jpg"
          className="mt-2 w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/15 outline-none font-mono"
        />
      </details>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = '';
        }}
      />
    </div>
  );
}