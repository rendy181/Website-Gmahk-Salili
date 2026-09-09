export interface ChurchProfile {
  id: string;
  name: string;
  tagline: string;
  shortDescription: string;
  village: string;
  district: string;
  regency: string;
  province: string;
  phone: string;
  email: string;
  logo_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  tiktok_url?: string;
  history?: string;
  vision?: string;
  mission?: string;
  motto?: string;
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
  id: string;
  hari: string;
  waktu: string;
  kegiatan: string;
  keterangan?: string;
  created_at?: string;
}

export interface Article {
  id: string;
  judul: string;
  konten: string;
  gambar_url: string;
  slug: string;
  kategori?: string;
  penulis?: string;
  created_at?: string;
}

export interface PrayerRequest {
  id: string;
  nama: string;
  permohonan: string;
  status: 'Menunggu Doa' | 'Sedang Didoakan' | 'Terjawab';
  prayerCount: number;
  pastoralNotes?: string;
  isPublic?: boolean;
  created_at?: string;
}

export interface ChurchLeader {
  id: string;
  nama: string;
  jabatan: string;
  foto_url: string;
  urutan?: number;
  created_at?: string;
}

export interface BankAccount {
  id: string;
  nama_bank: string;
  nomor_rekening: string;
  atas_nama: string;
  keterangan?: string;
  created_at?: string;
}

export interface PastoralContact {
  id: string;
  name: string;
  whatsappNumber: string;
  welcomeMessage: string;
  foto_url?: string;
  jabatan?: string;
  created_at?: string;
}

export interface AdminCredential {
  id: string;
  username: string;
  passwordHash: string;
  lastUpdated?: string;
}

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
  | 'setup_guide';
