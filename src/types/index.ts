// ============================================
// TIPE DATA UNTUK WEBSITE GMAHK SALILI
// ============================================

export interface ChurchProfile {
  id: number;
  name: string;
  tagline: string;
  shortDescription: string;
  village: string;
  district: string;
  regency: string;
  province: string;
  phone: string;
  email: string;
  logo_url: string;
  facebook_url: string;
  instagram_url: string;
  tiktok_url: string;
  history: string;
  vision: string;
  mission: string;
  motto: string;
}

export interface HeroImage {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  badgeText: string;
  isPrimary: boolean;
  created_at?: string;
}

export interface WorshipSchedule {
  id: number;
  hari: string;
  waktu: string;
  kegiatan: string;
  keterangan?: string;
  created_at?: string;
}

export interface Article {
  id: number;
  judul: string;
  konten: string;
  gambar_url: string;
  slug: string;
  kategori: string;
  penulis: string;
  created_at: string;
}

export interface PrayerRequest {
  id: string;
  nama: string;
  permohonan: string;
  status: string;
  prayerCount: number;
  pastoralNotes: string;
  isPublic: boolean;
  created_at: string;
}

export interface ChurchLeader {
  id: number;
  nama: string;
  jabatan: string;
  foto_url: string;
  urutan: number;
  created_at?: string;
}

export interface BankAccount {
  id: number;
  nama_bank: string;
  nomor_rekening: string;
  atas_nama: string;
  keterangan: string;
  created_at?: string;
}

export interface PastoralContact {
  id: number;
  name: string;
  jabatan: string;
  whatsappNumber: string;
  welcomeMessage: string;
  foto_url: string;
}

export interface AdminCredential {
  id: number;
  username: string;
  passwordHash: string;
  lastUpdated: string;
}

// ============================================
// TIPE DATA UNTUK BUKU-BUKU
// ============================================

export interface Book {
  id: number;
  judul: string;
  penulis: string;
  deskripsi?: string;
  cover_url?: string;
  kategori?: string;
  created_at?: string;
}

export interface BookChapter {
  id: number;
  book_id: number;
  judul_chapter: string;
  isi: string;
  urutan: number;
  created_at?: string;
}

// ============================================
// TIPE DATA UNTUK ADMIN TAB
// ============================================

export type AdminTab =
  | 'overview'
  | 'articles'
  | 'banners'
  | 'logo'
  | 'leaders'
  | 'social'
  | 'banking'
  | 'pastoral'
  | 'prayers'
  | 'schedules'
  | 'profile'
  | 'security'
  | 'setup_guide'
  | 'books'; // ← TAMBAHKAN UNTUK BUKU!