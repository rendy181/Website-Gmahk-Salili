import {
  ChurchProfile,
  HeroImage,
  WorshipSchedule,
  Article,
  PrayerRequest,
  ChurchLeader,
  BankAccount,
  PastoralContact,
  AdminCredential,
} from '../types';

export const DEFAULT_PROFILE: ChurchProfile = {
  id: 1,
  name: 'Gereja Masehi Advent Hari Ketujuh (GMAHK) Jemaat Salili',
  tagline: 'Mempersiapkan Umat yang Setia Menyambut Kedatangan Kristus',
  shortDescription:
    'Gereja Masehi Advent Hari Ketujuh Jemaat Salili, berdiri di tengah keindahan Pulau Siau, berdedikasi melayani Tuhan dan masyarakat dengan kasih, kebenaran Alkitab, dan pengharapan yang kekal.',
  village: 'Desa Salili',
  district: 'Kecamatan Siau Tengah',
  regency: 'Kabupaten Kepulauan Siau Tagulandang Biaro (Sitaro)',
  province: 'Sulawesi Utara',
  phone: '+62 851-8552-6431',
  email: 'gmahk.salili@gmail.com',
  logo_url:
    'https://images.unsplash.com/photo-1548625361-16a7f34f7136?auto=format&fit=crop&w=300&q=80',
  facebook_url: 'https://facebook.com/perkumpulan.salili',
  instagram_url: 'https://instagram.com/gmahksalili',
  tiktok_url: 'https://tiktok.com/@gmahksalili',
  history:
    'GMAHK Jemaat Salili dirintis oleh para perintis pekabaran Tiga Malaikat di tanah Siau. Berada di Kecamatan Siau Tengah, jemaat ini bertumbuh dari persekutuan rumah tangga sederhana menjadi pusat peribadatan dan pelayanan rohani yang aktif membimbing generasi muda dan keluarga di Kepulauan Sitaro, Sulawesi Utara.',
  vision:
    'Menjadi jemaat yang berpusat pada Kristus, memuliakan Allah, dan memberitakan Injil Kekal kepada segala bangsa di Siau dan sekitarnya.',
  mission:
    '1. Menjadikan murid-murid Yesus Kristus yang hidup berlandaskan Alkitab.\n2. Mengabarkan Pekabaran Tiga Malaikat (Wahyu 14:6-12) dengan kuasa Roh Kudus.\n3. Memenuhi kebutuhan jasmani, emosional, dan rohani masyarakat melalui pelayanan kesehatan dan sosial.',
  motto: 'Setia dalam Pengharapan, Tangguh dalam Pelayanan',
};

export const DEFAULT_HERO_IMAGES: HeroImage[] = [
  {
    id: 'hero-1',
    imageUrl:
      'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=1920&q=80',
    title: 'Selamat Datang di GMAHK Jemaat Salili',
    subtitle: 'Menyembah Tuhan Pencipta Langit dan Bumi dalam Suasana Penuh Sukacita dan Damai Sejahtera di Siau Tengah',
    badgeText: 'Hari Sabat yang Kudus',
    isPrimary: true,
  },
  {
    id: 'hero-2',
    imageUrl:
      'https://images.unsplash.com/photo-1519491058804-747355938596?auto=format&fit=crop&w=1920&q=80',
    title: 'Persekutuan Keluarga dalam Kasih Kristus',
    subtitle: 'Membangun iman yang teguh, mempererat kasih persaudaraan, dan mempersiapkan jemaat bagi kedatangan Tuhan Yesus yang kedua kali.',
    badgeText: 'Keluarga Allah',
    isPrimary: false,
  },
  {
    id: 'hero-3',
    imageUrl:
      'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1920&q=80',
    title: 'Pemuda Advent yang Tangguh & Berdedikasi',
    subtitle: 'Generasi muda yang rindu melayani, berkarya, dan menjadi terang di tengah Kepulauan Siau Tagulandang Biaro.',
    badgeText: 'Adventist Youth',
    isPrimary: false,
  },
];

export const DEFAULT_SCHEDULES: WorshipSchedule[] = [
  {
    id: 1,
    hari: 'Sabtu (Hari Sabat)',
    waktu: '09:00 - 10:15 WITA',
    kegiatan: 'Sekolah Sabat Dewasa & Anak',
    keterangan: 'Pendalaman Firman Tuhan melalui Pelajaran Sekolah Sabat sedunia.',
  },
  {
    id: 2,
    hari: 'Sabtu (Hari Sabat)',
    waktu: '10:30 - 12:00 WITA',
    kegiatan: 'Khotbah & Kebaktian Ilahi',
    keterangan: 'Pemberitaan Firman Allah, puji-pujian, dan persembahan syukur jemaat.',
  },
  {
    id: 3,
    hari: 'Sabtu (Hari Sabat)',
    waktu: '15:30 - 17:00 WITA',
    kegiatan: 'Kebaktian Pemuda Advent (AY) & Tutup Sabat',
    keterangan: 'Persekutuan rohani muda-mudi, diskusi Alkitab, dan doa bersama.',
  },
  {
    id: 4,
    hari: 'Minggu',
    waktu: '18:00 - 19:30 WITA',
    kegiatan: 'Persekutuan Pemuda',
    keterangan: 'Latihan puji-pujian, vokal grup, dan pembinaan karakter pemuda.',
  },
  {
    id: 5,
    hari: 'Rabu',
    waktu: '19:00 - 20:00 WITA',
    kegiatan: 'Kebaktian Doa Jemaat (Rabu Malam)',
    keterangan: 'Membawa pokok-pokok doa syafaat jemaat, keluarga, dan bangsa.',
  },
];

export const DEFAULT_LEADERS: ChurchLeader[] = [
  {
    id: 1,
    nama: 'Pdt. Christov Tumonggor, S.Fil',
    jabatan: 'Pendeta Jemaat',
    foto_url:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    urutan: 1,
  },
  {
    id: 2,
    nama: 'Bpk. Markus Derek',
    jabatan: 'Ketua Jemaat (Head Elder)',
    foto_url:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    urutan: 2,
  },
  {
    id: 3,
    nama: 'Ibu Ester Salindeho',
    jabatan: 'Sekretaris Jemaat',
    foto_url:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    urutan: 3,
  },
  {
    id: 4,
    nama: 'Bpk. Ronny Tatengkeng',
    jabatan: 'Bendahara Jemaat',
    foto_url:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    urutan: 4,
  },
  {
    id: 5,
    nama: 'Bpk. James Kaemba',
    jabatan: 'Ketua Diakon',
    foto_url:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    urutan: 5,
  },
  {
    id: 6,
    nama: 'Sdr. Daniel Bawinto',
    jabatan: 'Pemimpin Pemuda Advent (AY Leader)',
    foto_url:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    urutan: 6,
  },
];

export const DEFAULT_BANK_ACCOUNTS: BankAccount[] = [
  {
    id: 1,
    nama_bank: 'Bank SulutGo (BSG)',
    nomor_rekening: '01802110058471',
    atas_nama: 'GMAHK Jemaat Salili',
    keterangan: 'Digunakan untuk Persembahan Sabat, Persepuluhan Kudus, dan Dana Pembangunan Fasilitas Ibadah.',
  },
];

export const DEFAULT_PASTORAL_CONTACT: PastoralContact = {
  id: 1,
  name: 'Pdt. Christov Tumonggor, S.Fil',
  jabatan: 'Pendeta Jemaat GMAHK Salili',
  whatsappNumber: '6282293827489',
  welcomeMessage:
    'Salam Damai Sejahtera dalam Kasih Kristus. Saya Pdt. Christov Tumonggor, S.Fil menyambut Saudara sekalian. Jika Saudara membutuhkan konseling rohani, bimbingan doa, ataupun ingin mempelajari Alkitab bersama, silakan menghubungi saya melalui WhatsApp ini.',
  foto_url:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
};

export const DEFAULT_PRAYER_REQUESTS: PrayerRequest[] = [
  {
    id: 'prayer-1',
    nama: 'Keluarga Kaemba - Salindeho',
    permohonan:
      'Mohon dukungan doa untuk pemulihan kesehatan orang tua kami yang sedang dirawat, serta penghiburan bagi keluarga besar di Salili.',
    status: 'Sedang Didoakan',
    prayerCount: 14,
    pastoralNotes: 'Telah didoakan dalam persekutuan doa Rabu malam jemaat.',
    isPublic: true,
    created_at: '2026-09-02T10:00:00Z',
  },
  {
    id: 'prayer-2',
    nama: 'Panitia Pembangunan Jemaat',
    permohonan:
      'Berdoa bagi kelancaran renovasi atap dan ruang serbaguna gereja agar selesai tepat waktu demi kemuliaan Tuhan.',
    status: 'Sedang Didoakan',
    prayerCount: 28,
    pastoralNotes: 'Bahan material sudah mulai tiba di Siau. Puji Tuhan.',
    isPublic: true,
    created_at: '2026-09-04T08:30:00Z',
  },
  {
    id: 'prayer-3',
    nama: 'Pemuda Advent Salili',
    permohonan:
      'Doakan adik-adik siswa dan mahasiswa jemaat yang sedang menghadapi ujian akhir dan mencari pekerjaan.',
    status: 'Terjawab',
    prayerCount: 21,
    pastoralNotes: 'Puji Tuhan 2 pemuda telah lulus dan mendapat tempat kerja.',
    isPublic: true,
    created_at: '2026-08-28T14:15:00Z',
  },
];

export const DEFAULT_ARTICLES: Article[] = [
  {
    id: 1,
    judul: 'Makna Hari Sabat: Perhentian Kudus di Hadapan Sang Pencipta',
    konten: `Hari Sabat bukanlah sekadar hari bebas kerja, melainkan lambang peringatan kasih Allah yang tak berkesudahan atas ciptaan-Nya. Sebagaimana tertulis dalam Kejadian 2:2-3 dan Keluaran 20:8-11, Allah menguduskan dan memberkati hari ketujuh. 

Di tengah kesibukan hidup modern di Kepulauan Siau, Sabat menjadi oase rohani bagi setiap keluarga. Saat kita melepaskan urusan duniawi pada matahari terbenam hari Jumat hingga matahari terbenam hari Sabtu, kita memperbaharui hubungan kasih dengan Kristus Yesus, sesama anggota jemaat, dan alam sekitar.

Mari kita senantiasa memelihara kekudusan Sabat dengan hati yang penuh ucapan syukur dan melayani sesama seperti yang dicontohkan oleh Tuhan Yesus Kristus.`,
    gambar_url:
      'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80',
    slug: 'makna-hari-sabat-perhentian-kudus',
    kategori: 'Pelajaran Alkitab',
    penulis: 'Pdt. Christov Tumonggor, S.Fil',
    created_at: '2026-09-05T09:00:00Z',
  },
  {
    id: 2,
    judul: 'Pekabaran Tiga Malaikat: Pengharapan Terakhir bagi Dunia',
    konten: `Kitab Wahyu pasal 14 ayat 6 hingga 12 memuat pesan paling agung bagi akhir zaman: Pekabaran Tiga Malaikat. Malaikat pertama mengajak seluruh umat manusia untuk takut akan Allah dan memuliakan-Nya serta menyembah Dia yang telah menjadikan langit dan bumi.

Sebagai umat yang sisa, GMAHK Jemaat Salili terpanggil untuk menyuarakan pekabaran ini dengan penuh kasih dan kerendahan hati. Bukan dengan perdebatan sengit, melainkan melalui gaya hidup sehat, keluarga yang harmonis, dan tindakan kepedulian nyata bagi tetangga di Desa Salili dan seantero Siau Tengah.`,
    gambar_url:
      'https://images.unsplash.com/photo-1519491058804-747355938596?auto=format&fit=crop&w=800&q=80',
    slug: 'pekabaran-tiga-malaikat-pengharapan-terakhir',
    kategori: 'Doktrin & Nubuatan',
    penulis: 'Departemen Komunikasi GMAHK Salili',
    created_at: '2026-08-30T11:00:00Z',
  },
  {
    id: 3,
    judul: 'Pelayanan Kesehatan Advent: Tubuh adalah Bait Roh Kudus',
    konten: `Gereja Masehi Advent Hari Ketujuh memandang kesehatan sebagai bagian tak terpisahkan dari pemuridan rohani. Rasul Paulus mengingatkan dalam 1 Korintus 6:19-20 bahwa tubuh kita adalah bait Roh Kudus yang ditebus dengan darah yang mahal.

Prinsip NEWSTART (Nutrition, Exercise, Water, Sunshine, Temperance, Air, Rest, Trust in Divine Power) tetap relevan di zaman ini. Mari kita jaga pola makan nabati, istirahat cukup pada hari Sabat, dan menjaga kebugaran jasmani agar kita senantiasa bertenaga melayani sesama di pulau kita tercinta.`,
    gambar_url:
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
    slug: 'pelayanan-kesehatan-advent-bait-roh-kudus',
    kategori: 'Kesehatan Hidup Sehat',
    penulis: 'Departemen Pelayanan Kesehatan',
    created_at: '2026-08-20T07:30:00Z',
  },
];

export const DEFAULT_ADMIN: AdminCredential = {
  id: 1,
  username: 'admin',
  passwordHash: 'admin123',
  lastUpdated: new Date().toISOString(),
};