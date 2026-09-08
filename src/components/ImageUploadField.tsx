import React, { useState, useRef } from 'react';
import { Upload, X, Image, Loader2 } from 'lucide-react';

const SUPABASE_URL = "https://trbazsjcmxsqeqluqzku.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyYmF6c2pjbXhzcWVxbHVxemt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0MTI4NzUsImV4cCI6MjEwMzk4ODg3NX0.HeLSP86467zmNkQX0AAQeOwhBiYNeVi3etZxJIow6Mg";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  recommendedSize?: string;
  helpText?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  required = false,
  recommendedSize = '1920 x 1080 px',
  helpText = 'Upload file gambar atau masukkan URL gambar.',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadToSupabase = async (file: File): Promise<string | null> => {
    const fileName = `${Date.now()}-${file.name}`;
    try {
      const response = await fetch(
        `${SUPABASE_URL}/storage/v1/object/public/church-assets/${fileName}`,
        {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': file.type,
          },
          body: file,
          mode: 'cors',
          credentials: 'omit',
        }
      );

      if (response.ok) {
        return `${SUPABASE_URL}/storage/v1/object/public/church-assets/${fileName}`;
      } else {
        const errorText = await response.text();
        console.error('Upload error response:', errorText);
        return null;
      }
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran file terlalu besar. Maksimal 5MB.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar.');
      return;
    }

    setIsUploading(true);
    setError(null);

    const url = await uploadToSupabase(file);
    if (url) {
      onChange(url);
      setError(null);
    } else {
      setError('Gagal upload gambar. Silakan coba lagi.');
    }
    setIsUploading(false);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    onChange(url);
    if (url && !url.startsWith('http')) {
      setError('URL harus dimulai dengan http:// atau https://');
    } else {
      setError(null);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 hover:border-blue-400 transition-colors">
        <div className="flex flex-col items-center justify-center gap-3">
          {value ? (
            <div className="relative w-full max-w-md mx-auto">
              <img
                src={value}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg border border-slate-200"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = '';
                  setError('Gambar tidak dapat dimuat. Periksa URL.');
                }}
              />
              <button
                onClick={() => onChange('')}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                title="Hapus gambar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="text-center py-4">
              <Image className="w-12 h-12 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-500">Tarik & lepas gambar di sini</p>
              <p className="text-xs text-slate-400">atau</p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-2"
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Pilih File Gambar</span>
                  </>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <input
          type="text"
          placeholder="Atau masukkan URL gambar..."
          value={value}
          onChange={handleUrlChange}
          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}

      {recommendedSize && (
        <p className="text-[10px] text-slate-400">
          Ukuran yang disarankan: {recommendedSize}
        </p>
      )}
      {helpText && (
        <p className="text-[10px] text-slate-400">{helpText}</p>
      )}
    </div>
  );
};