import { createClient } from '@supabase/supabase-js';

// Default Supabase project credentials provided by user
const metaEnv = (import.meta as any)?.env || {};

export const SUPABASE_URL =
  metaEnv.VITE_SUPABASE_URL || 'https://trbazsjcmxsqeqluqzku.supabase.co';

export const SUPABASE_ANON_KEY =
  metaEnv.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyYmF6c2pjbXhzcWVxbHVxemt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0MTI4NzUsImV4cCI6MjEwMzk4ODg3NX0.HeLSP86467zmNkQX0AAQeOwhBiYNeVi3etZxJIow6Mg';


export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const BUCKET_NAME = 'church-assets';

/**
 * Uploads an image file to Supabase Storage.
 * Falls back to Base64 data URL if bucket is not yet provisioned or upload encounters an error.
 */
export async function uploadImageToSupabase(
  file: File,
  folder = 'uploads'
): Promise<{ url: string; error?: string }> {
  try {
    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.warn('Supabase storage upload error, falling back to FileReader:', error.message);
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            url: reader.result as string,
            error: `Bucket '${BUCKET_NAME}' belum aktif atau izin upload dibatasi (${error.message}). Gambar disimpan lokal/dataURL.`,
          });
        };
        reader.readAsDataURL(file);
      });
    }

    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    return { url: publicUrlData.publicUrl };
  } catch (err: any) {
    console.error('Upload exception:', err);
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          url: reader.result as string,
          error: err.message || 'Gagal upload ke Supabase Storage, menggunakan data URL.',
        });
      };
      reader.readAsDataURL(file);
    });
  }
}

// Complete SQL Migration Script for Supabase SQL Editor
export const SUPABASE_SQL_SCHEMA = `-- =========================================================================
-- SQL SCHEMA UNTUK GMAHK JEMAAT SALILI (SIAU TENGAH, SITARO)
-- Jalankan skrip ini di: Supabase Dashboard -> SQL Editor -> New Query -> Run
-- =========================================================================

-- 1. Tabel profile
CREATE TABLE IF NOT EXISTS public.profile (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT,
  "shortDescription" TEXT,
  village TEXT,
  district TEXT,
  regency TEXT,
  province TEXT,
  phone TEXT,
  email TEXT,
  logo_url TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  tiktok_url TEXT,
  history TEXT,
  vision TEXT,
  mission TEXT,
  motto TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Tabel hero_images
CREATE TABLE IF NOT EXISTS public.hero_images (
  id TEXT PRIMARY KEY,
  "imageUrl" TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  "badgeText" TEXT,
  "isPrimary" BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Tabel schedules
CREATE TABLE IF NOT EXISTS public.schedules (
  id TEXT PRIMARY KEY,
  hari TEXT NOT NULL,
  waktu TEXT NOT NULL,
  kegiatan TEXT NOT NULL,
  keterangan TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Tabel articles
CREATE TABLE IF NOT EXISTS public.articles (
  id TEXT PRIMARY KEY,
  judul TEXT NOT NULL,
  konten TEXT NOT NULL,
  gambar_url TEXT,
  slug TEXT UNIQUE,
  kategori TEXT DEFAULT 'Rohani',
  penulis TEXT DEFAULT 'GMAHK Salili',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. Tabel prayer_requests
CREATE TABLE IF NOT EXISTS public.prayer_requests (
  id TEXT PRIMARY KEY,
  nama TEXT NOT NULL,
  permohonan TEXT NOT NULL,
  status TEXT DEFAULT 'Menunggu Doa',
  "prayerCount" INTEGER DEFAULT 0,
  "pastoralNotes" TEXT,
  "isPublic" BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. Tabel leaders
CREATE TABLE IF NOT EXISTS public.leaders (
  id TEXT PRIMARY KEY,
  nama TEXT NOT NULL,
  jabatan TEXT NOT NULL,
  foto_url TEXT,
  urutan INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. Tabel bank_accounts
CREATE TABLE IF NOT EXISTS public.bank_accounts (
  id TEXT PRIMARY KEY,
  nama_bank TEXT NOT NULL,
  nomor_rekening TEXT NOT NULL,
  atas_nama TEXT NOT NULL,
  keterangan TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 8. Tabel pastoral_contacts
CREATE TABLE IF NOT EXISTS public.pastoral_contacts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  "whatsappNumber" TEXT NOT NULL,
  "welcomeMessage" TEXT,
  foto_url TEXT,
  jabatan TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 9. Tabel admin_credentials
CREATE TABLE IF NOT EXISTS public.admin_credentials (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "lastUpdated" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Aktifkan RLS & Buka Kebijakan Akses Publik (untuk operasional website & admin)
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pastoral_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_credentials ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  -- Kebijakan akses anon/public
  DROP POLICY IF EXISTS "Public Full Access profile" ON public.profile;
  CREATE POLICY "Public Full Access profile" ON public.profile FOR ALL USING (true) WITH CHECK (true);

  DROP POLICY IF EXISTS "Public Full Access hero_images" ON public.hero_images;
  CREATE POLICY "Public Full Access hero_images" ON public.hero_images FOR ALL USING (true) WITH CHECK (true);

  DROP POLICY IF EXISTS "Public Full Access schedules" ON public.schedules;
  CREATE POLICY "Public Full Access schedules" ON public.schedules FOR ALL USING (true) WITH CHECK (true);

  DROP POLICY IF EXISTS "Public Full Access articles" ON public.articles;
  CREATE POLICY "Public Full Access articles" ON public.articles FOR ALL USING (true) WITH CHECK (true);

  DROP POLICY IF EXISTS "Public Full Access prayer_requests" ON public.prayer_requests;
  CREATE POLICY "Public Full Access prayer_requests" ON public.prayer_requests FOR ALL USING (true) WITH CHECK (true);

  DROP POLICY IF EXISTS "Public Full Access leaders" ON public.leaders;
  CREATE POLICY "Public Full Access leaders" ON public.leaders FOR ALL USING (true) WITH CHECK (true);

  DROP POLICY IF EXISTS "Public Full Access bank_accounts" ON public.bank_accounts;
  CREATE POLICY "Public Full Access bank_accounts" ON public.bank_accounts FOR ALL USING (true) WITH CHECK (true);

  DROP POLICY IF EXISTS "Public Full Access pastoral_contacts" ON public.pastoral_contacts;
  CREATE POLICY "Public Full Access pastoral_contacts" ON public.pastoral_contacts FOR ALL USING (true) WITH CHECK (true);

  DROP POLICY IF EXISTS "Public Full Access admin_credentials" ON public.admin_credentials;
  CREATE POLICY "Public Full Access admin_credentials" ON public.admin_credentials FOR ALL USING (true) WITH CHECK (true);
END $$;

-- Storage Bucket church-assets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('church-assets', 'church-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Public Access church-assets" ON storage.objects
FOR ALL USING (bucket_id = 'church-assets') WITH CHECK (bucket_id = 'church-assets');
`;
