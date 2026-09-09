import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { AdminTab, Article, HeroImage, WorshipSchedule, ChurchLeader, BankAccount, PrayerRequest } from '../types';
import { uploadImageToSupabase, SUPABASE_SQL_SCHEMA, BUCKET_NAME } from '../lib/supabase';
import {
  X,
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Shield,
  Users,
  Share2,
  CreditCard,
  PhoneCall,
  HeartHandshake,
  Calendar,
  Building,
  KeyRound,
  BookMarked,
  LogOut,
  Save,
  Plus,
  Trash2,
  Edit2,
  Upload,
  CheckCircle,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  Loader2,
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const {
    profile,
    heroImages,
    schedules,
    articles,
    prayerRequests,
    leaders,
    bankAccounts,
    pastoralContact,
    adminCredential,
    supabaseStatus,
    updateProfile,
    addHeroImage,
    updateHeroImage,
    deleteHeroImage,
    setPrimaryHeroImage,
    addSchedule,
    updateSchedule,
    deleteSchedule,
    addArticle,
    updateArticle,
    deleteArticle,
    updatePrayerRequest,
    deletePrayerRequest,
    addLeader,
    updateLeader,
    deleteLeader,
    addBankAccount,
    updateBankAccount,
    deleteBankAccount,
    updatePastoralContact,
    updateAdminCredentials,
    refreshData,
    seedAllDefaultsToSupabase,
  } = useChurch();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Login Form States
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Status message
  const [actionNotice, setActionNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const showNotice = (text: string, type: 'success' | 'error' = 'success') => {
    setActionNotice({ type, text });
    setTimeout(() => setActionNotice(null), 4000);
  };

  // 1. Articles editing state
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreatingArticle, setIsCreatingArticle] = useState(false);
  const [articleForm, setArticleForm] = useState({
    judul: '',
    kategori: 'Rohani',
    konten: '',
    gambar_url: '',
    penulis: 'GMAHK Salili',
  });

  // 2. Banner editing state
  const [isAddingBanner, setIsAddingBanner] = useState(false);
  const [bannerForm, setBannerForm] = useState({
    title: '',
    subtitle: '',
    badgeText: 'Hari Sabat yang Kudus',
    imageUrl: '',
    isPrimary: false,
  });

  // 3. Leader editing state
  const [editingLeader, setEditingLeader] = useState<ChurchLeader | null>(null);
  const [isCreatingLeader, setIsCreatingLeader] = useState(false);
  const [leaderForm, setLeaderForm] = useState({
    nama: '',
    jabatan: '',
    foto_url: '',
    urutan: 1,
  });

  // 4. Schedule editing state
  const [editingSchedule, setEditingSchedule] = useState<WorshipSchedule | null>(null);
  const [isCreatingSchedule, setIsCreatingSchedule] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    hari: 'Sabtu (Hari Sabat)',
    waktu: '09:00 - 10:15 WITA',
    kegiatan: '',
    keterangan: '',
  });

  // 5. Bank editing state
  const [editingBank, setEditingBank] = useState<BankAccount | null>(null);
  const [isCreatingBank, setIsCreatingBank] = useState(false);
  const [bankForm, setBankForm] = useState({
    nama_bank: 'Bank SulutGo (BSG)',
    nomor_rekening: '',
    atas_nama: 'GMAHK Jemaat Salili',
    keterangan: 'Persembahan & Persepuluhan',
  });

  // Profile Form state
  const [profileForm, setProfileForm] = useState({ ...profile });

  // Pastoral Form state
  const [pastoralForm, setPastoralForm] = useState({ ...pastoralContact });

  // Security Form state
  const [newUsername, setNewUsername] = useState(adminCredential.username);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      loginUsername.trim() === adminCredential.username &&
      loginPassword === adminCredential.passwordHash
    ) {
      setIsLoggedIn(true);
      setLoginError(null);
      setLoginUsername('');
      setLoginPassword('');
      showNotice('Selamat datang di Dashboard Admin GMAHK Salili');
    } else {
      setLoginError('Username atau password salah. Silakan coba lagi.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActionNotice(null);
  };

  // Image Upload Handler
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const res = await uploadImageToSupabase(file);
      onSuccess(res.url);
      if (res.error) {
        showNotice(res.error, 'error');
      } else {
        showNotice('Gambar berhasil diunggah ke Supabase Storage!');
      }
    } catch (err: any) {
      showNotice(err.message || 'Gagal upload', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <LayoutDashboard className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-white">
                  Dashboard Administrasi GMAHK Salili
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  Supabase Live
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Siau Tengah, Kabupaten Kepulauan Sitaro, Sulawesi Utara
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-red-500/30"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Notification Banner */}
        {actionNotice && (
          <div
            className={`px-6 py-2.5 text-xs font-medium flex items-center gap-2 ${
              actionNotice.type === 'success'
                ? 'bg-emerald-900/80 text-emerald-200 border-b border-emerald-700'
                : 'bg-rose-900/80 text-rose-200 border-b border-rose-700'
            }`}
          >
            {actionNotice.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            )}
            <span>{actionNotice.text}</span>
          </div>
        )}

        {/* Main Body */}
        {!isLoggedIn ? (
          /* Login Form */
          <div className="p-8 sm:p-12 max-w-md mx-auto w-full my-auto text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <Shield className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">Login Admin GMAHK Salili</h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              Masukkan akun pengurus jemaat untuk mengelola konten website
            </p>

            {loginError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs text-left">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

             {/* Hapus pesan default credentials untuk keamanan */}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>Masuk ke Dashboard</span>
              </button>
            </form>
          </div>
        ) : (
          /* Dashboard Layout with Sidebar & Content Area */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 bg-slate-950/90 border-r border-slate-800 p-3 overflow-y-auto flex flex-row md:flex-col gap-1">
              <div className="hidden md:block px-3 py-2 text-[10px] uppercase tracking-wider font-bold text-slate-400">
                Menu Kelola
              </div>

              {[
                { id: 'overview' as AdminTab, label: '1. Ringkasan', icon: LayoutDashboard },
                { id: 'articles' as AdminTab, label: '2. Artikel & Warta', icon: FileText },
                { id: 'banners' as AdminTab, label: '3. Gambar & Banner', icon: ImageIcon },
                { id: 'logo' as AdminTab, label: '4. Logo Gereja', icon: Shield },
                { id: 'leaders' as AdminTab, label: '5. Pengurus Gereja', icon: Users },
                { id: 'social' as AdminTab, label: '6. Media Sosial', icon: Share2 },
                { id: 'banking' as AdminTab, label: '7. Rekening Jemaat', icon: CreditCard },
                { id: 'pastoral' as AdminTab, label: '8. Kontak Pastoral', icon: PhoneCall },
                { id: 'prayers' as AdminTab, label: '9. Permohonan Doa', icon: HeartHandshake },
                { id: 'schedules' as AdminTab, label: '10. Jadwal Ibadah', icon: Calendar },
                { id: 'profile' as AdminTab, label: '11. Profil & Visi Misi', icon: Building },
                { id: 'security' as AdminTab, label: '12. Ubah Password', icon: KeyRound },
                { id: 'setup_guide' as AdminTab, label: '★ Panduan Vercel & SQL', icon: BookMarked },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-all whitespace-nowrap md:whitespace-normal ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white font-bold shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              ))}
            </aside>

            {/* Main Tab Content Panel */}
            <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-slate-900">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Ringkasan Sistem & Database</h3>
                    <p className="text-xs text-slate-400">
                      Status sinkronisasi data GMAHK Jemaat Salili dengan Supabase
                    </p>
                  </div>

                  {/* Supabase Connection Status Card */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3.5 h-3.5 rounded-full ${
                          supabaseStatus.isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                        }`}
                      />
                      <div>
                        <div className="text-sm font-bold text-white">
                          Status Supabase: {supabaseStatus.message}
                        </div>
                        <div className="text-xs text-slate-400">
                          URL: https://trbazsjcmxsqeqluqzku.supabase.co
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={refreshData}
                        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 flex items-center gap-1.5 transition-colors border border-slate-700"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Refresh Data</span>
                      </button>
                      <button
                        onClick={async () => {
                          setIsProcessing(true);
                          const res = await seedAllDefaultsToSupabase();
                          setIsProcessing(false);
                          showNotice(res.message, res.success ? 'success' : 'error');
                        }}
                        disabled={isProcessing}
                        className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow transition-all disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Upload className="w-3.5 h-3.5" />
                        )}
                        <span>Sinkron Data Awal ke Supabase</span>
                      </button>
                    </div>
                  </div>

                  {/* Quick Stat Counters */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                      <div className="text-xs text-slate-400">Artikel & Warta</div>
                      <div className="text-2xl font-extrabold text-white mt-1">{articles.length}</div>
                      <div className="text-[10px] text-blue-400 mt-1">Dipublikasikan</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                      <div className="text-xs text-slate-400">Permohonan Doa</div>
                      <div className="text-2xl font-extrabold text-white mt-1">{prayerRequests.length}</div>
                      <div className="text-[10px] text-amber-400 mt-1">Pokok Syafaat</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                      <div className="text-xs text-slate-400">Jadwal Ibadah</div>
                      <div className="text-2xl font-extrabold text-white mt-1">{schedules.length}</div>
                      <div className="text-[10px] text-emerald-400 mt-1">Sabat & Pekanan</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                      <div className="text-xs text-slate-400">Pengurus Jemaat</div>
                      <div className="text-2xl font-extrabold text-white mt-1">{leaders.length}</div>
                      <div className="text-[10px] text-purple-400 mt-1">Pelayan Aktif</div>
                    </div>
                  </div>

                  {/* Pastoral Information Preview */}
                  <div className="p-5 rounded-2xl bg-blue-950/40 border border-blue-800/40 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-amber-300 font-bold uppercase">
                        Pendeta Jemaat Aktif
                      </div>
                      <div className="text-base font-bold text-white">{pastoralContact.name}</div>
                      <div className="text-xs text-slate-300">
                        Nomor WhatsApp: +{pastoralContact.whatsappNumber}
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('pastoral')}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                    >
                      Ubah Kontak
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: ARTIKEL & WARTA */}
              {activeTab === 'articles' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">Kelola Artikel & Warta Jemaat</h3>
                      <p className="text-xs text-slate-400">
                        Tambah, edit, dan hapus renungan rohani serta pengumuman
                      </p>
                    </div>
                    {!isCreatingArticle && !editingArticle && (
                      <button
                        onClick={() => {
                          setIsCreatingArticle(true);
                          setArticleForm({
                            judul: '',
                            kategori: 'Rohani',
                            konten: '',
                            gambar_url: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80',
                            penulis: 'Pdt. Christov Tumonggor, S.Fil',
                          });
                        }}
                        className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Tulis Artikel Baru</span>
                      </button>
                    )}
                  </div>

                  {/* Form for Create / Edit */}
                  {(isCreatingArticle || editingArticle) && (
                    <div className="p-5 rounded-2xl bg-slate-950 border border-blue-500/40 space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <h4 className="font-bold text-white text-sm">
                          {editingArticle ? 'Edit Artikel' : 'Tulis Artikel Baru'}
                        </h4>
                        <button
                          onClick={() => {
                            setIsCreatingArticle(false);
                            setEditingArticle(null);
                          }}
                          className="text-xs text-slate-400 hover:text-white"
                        >
                          Batal
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-300 mb-1">Judul Artikel *</label>
                          <input
                            type="text"
                            value={articleForm.judul}
                            onChange={(e) => setArticleForm({ ...articleForm, judul: e.target.value })}
                            placeholder="Contoh: Sukacita Hari Sabat"
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-300 mb-1">Kategori</label>
                          <input
                            type="text"
                            value={articleForm.kategori}
                            onChange={(e) => setArticleForm({ ...articleForm, kategori: e.target.value })}
                            placeholder="Pelajaran Alkitab / Doktrin / Warta"
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-400"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-300 mb-1">Penulis</label>
                          <input
                            type="text"
                            value={articleForm.penulis}
                            onChange={(e) => setArticleForm({ ...articleForm, penulis: e.target.value })}
                            placeholder="GMAHK Salili"
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-300 mb-1">URL Gambar</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={articleForm.gambar_url}
                              onChange={(e) => setArticleForm({ ...articleForm, gambar_url: e.target.value })}
                              placeholder="https://..."
                              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-400"
                            />
                            <label className="cursor-pointer px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileUpload(e, (url) =>
                                    setArticleForm((prev) => ({ ...prev, gambar_url: url }))
                                  )
                                }
                              />
                            </label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-slate-300 mb-1">Isi Konten Artikel *</label>
                        <textarea
                          rows={6}
                          value={articleForm.konten}
                          onChange={(e) => setArticleForm({ ...articleForm, konten: e.target.value })}
                          placeholder="Tuliskan naskah renungan lengkap..."
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-400"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={async () => {
                            if (!articleForm.judul.trim() || !articleForm.konten.trim()) {
                              showNotice('Judul dan konten tidak boleh kosong', 'error');
                              return;
                            }
                            if (editingArticle) {
                              await updateArticle({
                                ...editingArticle,
                                ...articleForm,
                              });
                              showNotice('Artikel berhasil diperbarui!');
                              setEditingArticle(null);
                            } else {
                              await addArticle({
                                ...articleForm,
                                slug: articleForm.judul.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                              });
                              showNotice('Artikel baru berhasil diterbitkan!');
                              setIsCreatingArticle(false);
                            }
                          }}
                          className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Simpan Artikel</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* List of articles */}
                  <div className="space-y-3">
                    {articles.map((art) => (
                      <div
                        key={art.id}
                        className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={art.gambar_url}
                            alt={art.judul}
                            className="w-14 h-14 rounded-xl object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="text-[10px] font-bold text-amber-300 uppercase">
                              {art.kategori || 'Artikel'}
                            </span>
                            <h4 className="font-bold text-white text-sm">{art.judul}</h4>
                            <p className="text-xs text-slate-400 line-clamp-1">{art.konten}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => {
                              setEditingArticle(art);
                              setIsCreatingArticle(false);
                              setArticleForm({
                                judul: art.judul,
                                kategori: art.kategori || 'Rohani',
                                konten: art.konten,
                                gambar_url: art.gambar_url,
                                penulis: art.penulis || 'GMAHK Salili',
                              });
                            }}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm('Yakin ingin menghapus artikel ini?')) {
                                await deleteArticle(art.id);
                                showNotice('Artikel berhasil dihapus!');
                              }
                            }}
                            className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: GAMBAR & BANNER */}
              {activeTab === 'banners' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">Kelola Gambar & Banner Hero</h3>
                      <p className="text-xs text-slate-400">
                        Atur foto gereja untuk carousel halaman utama website
                      </p>
                    </div>
                    {!isAddingBanner && (
                      <button
                        onClick={() => {
                          setIsAddingBanner(true);
                          setBannerForm({
                            title: 'Ibadah GMAHK Salili',
                            subtitle: 'Suasana damai dan persekutuan umat Tuhan di Siau Tengah.',
                            badgeText: 'Hari Sabat yang Kudus',
                            imageUrl: '',
                            isPrimary: false,
                          });
                        }}
                        className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Banner</span>
                      </button>
                    )}
                  </div>

                  {isAddingBanner && (
                    <div className="p-5 rounded-2xl bg-slate-950 border border-blue-500/40 space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <h4 className="font-bold text-white text-sm">Tambah Banner Baru</h4>
                        <button
                          onClick={() => setIsAddingBanner(false)}
                          className="text-xs text-slate-400 hover:text-white"
                        >
                          Batal
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-300 mb-1">Judul Banner *</label>
                          <input
                            type="text"
                            value={bannerForm.title}
                            onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-300 mb-1">Teks Badge Atas</label>
                          <input
                            type="text"
                            value={bannerForm.badgeText}
                            onChange={(e) => setBannerForm({ ...bannerForm, badgeText: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-slate-300 mb-1">Subjudul / Deskripsi</label>
                        <input
                          type="text"
                          value={bannerForm.subtitle}
                          onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-slate-300 mb-1">Foto Banner *</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={bannerForm.imageUrl}
                            onChange={(e) => setBannerForm({ ...bannerForm, imageUrl: e.target.value })}
                            placeholder="URL gambar atau unggah langsung..."
                            className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                          />
                          <label className="cursor-pointer px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white flex items-center gap-1.5 shadow">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Unggah Foto</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(e, (url) =>
                                  setBannerForm((prev) => ({ ...prev, imageUrl: url }))
                                )
                              }
                            />
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          onClick={async () => {
                            if (!bannerForm.title || !bannerForm.imageUrl) {
                              showNotice('Judul dan Gambar wajib diisi', 'error');
                              return;
                            }
                            await addHeroImage(bannerForm);
                            showNotice('Banner baru berhasil ditambahkan!');
                            setIsAddingBanner(false);
                          }}
                          className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Simpan Banner</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Banner List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {heroImages.map((hero) => (
                      <div
                        key={hero.id}
                        className={`p-4 rounded-2xl bg-slate-950 border transition-all ${
                          hero.isPrimary ? 'border-amber-400 shadow-lg' : 'border-slate-800'
                        }`}
                      >
                        <div className="relative h-40 rounded-xl overflow-hidden mb-3">
                          <img
                            src={hero.imageUrl}
                            alt={hero.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          {hero.isPrimary && (
                            <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                              Primary (Slide 1)
                            </span>
                          )}
                        </div>

                        <h4 className="font-bold text-white text-sm">{hero.title}</h4>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-1">{hero.subtitle}</p>

                        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                          {!hero.isPrimary ? (
                            <button
                              onClick={async () => {
                                await setPrimaryHeroImage(hero.id);
                                showNotice('Slide utama diatur!');
                              }}
                              className="text-xs text-blue-400 hover:text-amber-300 font-medium"
                            >
                              Jadikan Slide Utama
                            </button>
                          ) : (
                            <span className="text-xs text-amber-300 font-semibold">Slide Utama</span>
                          )}

                          <button
                            onClick={async () => {
                              if (heroImages.length <= 1) {
                                showNotice('Minimal harus ada 1 banner', 'error');
                                return;
                              }
                              if (confirm('Hapus banner ini?')) {
                                await deleteHeroImage(hero.id);
                                showNotice('Banner berhasil dihapus!');
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-950/40 text-rose-300 hover:bg-rose-900/60"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: LOGO GEREJA */}
              {activeTab === 'logo' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Logo Gereja GMAHK Salili</h3>
                    <p className="text-xs text-slate-400">
                      Ganti logo gereja dengan mengunggah gambar atau menggunakan lambang resmi GMAHK
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6 max-w-xl">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center overflow-hidden">
                        {profile.logo_url ? (
                          <img
                            src={profile.logo_url}
                            alt="Logo"
                            className="w-full h-full object-contain p-2"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span className="text-xs text-slate-500 text-center px-2">
                            Logo Bawaan GMAHK
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">Logo Jemaat Saat Ini</h4>
                        <p className="text-xs text-slate-400 mt-1">
                          Format PNG/JPG/SVG dengan latar transparan direkomendasikan.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-xs font-semibold text-slate-300">
                        Unggah Logo Baru ke Supabase Storage
                      </label>
                      <label className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow">
                        <Upload className="w-4 h-4" />
                        <span>Pilih & Unggah File Logo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(e, async (url) => {
                              await updateProfile({ logo_url: url });
                              showNotice('Logo gereja berhasil diperbarui di Supabase!');
                            })
                          }
                        />
                      </label>

                      <div className="text-center text-xs text-slate-500">— ATAU MASUKKAN URL —</div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="https://.../logo.png"
                          defaultValue={profile.logo_url || ''}
                          id="input-logo-url"
                          className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                        <button
                          onClick={async () => {
                            const val = (document.getElementById('input-logo-url') as HTMLInputElement)?.value;
                            await updateProfile({ logo_url: val });
                            showNotice('Logo gereja disimpan!');
                          }}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                        >
                          Simpan URL
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: PENGURUS GEREJA */}
              {activeTab === 'leaders' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">Kelola Pengurus Gereja</h3>
                      <p className="text-xs text-slate-400">
                        Ketua Jemaat, Sekretaris, Bendahara, Diaken, dll.
                      </p>
                    </div>
                    {!isCreatingLeader && !editingLeader && (
                      <button
                        onClick={() => {
                          setIsCreatingLeader(true);
                          setLeaderForm({
                            nama: '',
                            jabatan: '',
                            foto_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
                            urutan: leaders.length + 1,
                          });
                        }}
                        className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Pengurus</span>
                      </button>
                    )}
                  </div>

                  {/* Leader Form */}
                  {(isCreatingLeader || editingLeader) && (
                    <div className="p-5 rounded-2xl bg-slate-950 border border-blue-500/40 space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <h4 className="font-bold text-white text-sm">
                          {editingLeader ? 'Edit Pengurus' : 'Tambah Pengurus Baru'}
                        </h4>
                        <button
                          onClick={() => {
                            setIsCreatingLeader(false);
                            setEditingLeader(null);
                          }}
                          className="text-xs text-slate-400 hover:text-white"
                        >
                          Batal
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-300 mb-1">Nama Lengkap *</label>
                          <input
                            type="text"
                            value={leaderForm.nama}
                            onChange={(e) => setLeaderForm({ ...leaderForm, nama: e.target.value })}
                            placeholder="Contoh: Bpk. Markus Derek"
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-300 mb-1">Jabatan / Peran *</label>
                          <input
                            type="text"
                            value={leaderForm.jabatan}
                            onChange={(e) => setLeaderForm({ ...leaderForm, jabatan: e.target.value })}
                            placeholder="Ketua Jemaat / Sekretaris / Bendahara"
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-slate-300 mb-1">Foto Pengurus</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={leaderForm.foto_url}
                            onChange={(e) => setLeaderForm({ ...leaderForm, foto_url: e.target.value })}
                            className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                          />
                          <label className="cursor-pointer px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(e, (url) =>
                                  setLeaderForm((prev) => ({ ...prev, foto_url: url }))
                                )
                              }
                            />
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          onClick={async () => {
                            if (!leaderForm.nama || !leaderForm.jabatan) {
                              showNotice('Nama dan jabatan wajib diisi', 'error');
                              return;
                            }
                            if (editingLeader) {
                              await updateLeader({
                                ...editingLeader,
                                ...leaderForm,
                              });
                              showNotice('Data pengurus diperbarui!');
                              setEditingLeader(null);
                            } else {
                              await addLeader(leaderForm);
                              showNotice('Pengurus baru ditambahkan!');
                              setIsCreatingLeader(false);
                            }
                          }}
                          className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Simpan Pengurus</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Leader List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {leaders.map((ldr) => (
                      <div
                        key={ldr.id}
                        className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={ldr.foto_url}
                            alt={ldr.nama}
                            className="w-12 h-12 rounded-xl object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h4 className="font-bold text-white text-sm">{ldr.nama}</h4>
                            <span className="text-xs text-amber-300">{ldr.jabatan}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingLeader(ldr);
                              setIsCreatingLeader(false);
                              setLeaderForm({
                                nama: ldr.nama,
                                jabatan: ldr.jabatan,
                                foto_url: ldr.foto_url,
                                urutan: ldr.urutan || 1,
                              });
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm(`Hapus ${ldr.nama}?`)) {
                                await deleteLeader(ldr.id);
                                showNotice('Pengurus dihapus!');
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: MEDIA SOSIAL */}
              {activeTab === 'social' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Kelola Tautan Media Sosial</h3>
                    <p className="text-xs text-slate-400">
                      Edit link resmi Facebook, Instagram, dan TikTok GMAHK Salili
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 max-w-xl">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Link Facebook
                      </label>
                      <input
                        type="url"
                        value={profileForm.facebook_url || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, facebook_url: e.target.value })}
                        placeholder="https://facebook.com/gmahksalili"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Link Instagram
                      </label>
                      <input
                        type="url"
                        value={profileForm.instagram_url || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, instagram_url: e.target.value })}
                        placeholder="https://instagram.com/gmahksalili"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Link TikTok
                      </label>
                      <input
                        type="url"
                        value={profileForm.tiktok_url || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, tiktok_url: e.target.value })}
                        placeholder="https://tiktok.com/@gmahksalili"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={async () => {
                          await updateProfile({
                            facebook_url: profileForm.facebook_url,
                            instagram_url: profileForm.instagram_url,
                            tiktok_url: profileForm.tiktok_url,
                          });
                          await refreshData();
                          showNotice('Tautan media sosial berhasil disimpan!');
                        }}
                        className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Simpan Media Sosial</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: REKENING JEMAAT */}
              {activeTab === 'banking' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">Kelola Rekening Jemaat (BSG)</h3>
                      <p className="text-xs text-slate-400">
                        Rekening Bank SulutGo untuk Persembahan, Persepuluhan, Pembangunan
                      </p>
                    </div>
                    {!isCreatingBank && !editingBank && (
                      <button
                        onClick={() => {
                          setIsCreatingBank(true);
                          setBankForm({
                            nama_bank: 'Bank SulutGo (BSG)',
                            nomor_rekening: '',
                            atas_nama: 'GMAHK Jemaat Salili',
                            keterangan: 'Persembahan Sabat & Persepuluhan',
                          });
                        }}
                        className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Rekening</span>
                      </button>
                    )}
                  </div>

                  {/* Form */}
                  {(isCreatingBank || editingBank) && (
                    <div className="p-5 rounded-2xl bg-slate-950 border border-blue-500/40 space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <h4 className="font-bold text-white text-sm">
                          {editingBank ? 'Edit Rekening' : 'Tambah Rekening Baru'}
                        </h4>
                        <button
                          onClick={() => {
                            setIsCreatingBank(false);
                            setEditingBank(null);
                          }}
                          className="text-xs text-slate-400 hover:text-white"
                        >
                          Batal
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-300 mb-1">Nama Bank *</label>
                          <input
                            type="text"
                            value={bankForm.nama_bank}
                            onChange={(e) => setBankForm({ ...bankForm, nama_bank: e.target.value })}
                            placeholder="Bank SulutGo (BSG)"
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-300 mb-1">Nomor Rekening *</label>
                          <input
                            type="text"
                            value={bankForm.nomor_rekening}
                            onChange={(e) => setBankForm({ ...bankForm, nomor_rekening: e.target.value })}
                            placeholder="01802110058471"
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-300 mb-1">Atas Nama *</label>
                          <input
                            type="text"
                            value={bankForm.atas_nama}
                            onChange={(e) => setBankForm({ ...bankForm, atas_nama: e.target.value })}
                            placeholder="GMAHK Jemaat Salili"
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-300 mb-1">Tujuan / Keterangan</label>
                          <input
                            type="text"
                            value={bankForm.keterangan}
                            onChange={(e) => setBankForm({ ...bankForm, keterangan: e.target.value })}
                            placeholder="Persembahan, Persepuluhan, Pembangunan"
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          onClick={async () => {
                            if (!bankForm.nama_bank || !bankForm.nomor_rekening || !bankForm.atas_nama) {
                              showNotice('Semua bidang bertanda * wajib diisi', 'error');
                              return;
                            }
                            if (editingBank) {
                              await updateBankAccount({
                                ...editingBank,
                                ...bankForm,
                              });
                              showNotice('Rekening bank diperbarui!');
                              setEditingBank(null);
                            } else {
                              await addBankAccount(bankForm);
                              showNotice('Rekening bank baru ditambahkan!');
                              setIsCreatingBank(false);
                            }
                          }}
                          className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Simpan Rekening</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* List of accounts */}
                  <div className="space-y-3">
                    {bankAccounts.map((acc) => (
                      <div
                        key={acc.id}
                        className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4"
                      >
                        <div>
                          <span className="text-xs font-bold text-amber-300 uppercase">
                            {acc.nama_bank}
                          </span>
                          <div className="text-lg font-mono font-bold text-white">
                            {acc.nomor_rekening}
                          </div>
                          <div className="text-xs text-slate-300">a.n. {acc.atas_nama}</div>
                          {acc.keterangan && (
                            <div className="text-[11px] text-slate-400 mt-1">{acc.keterangan}</div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingBank(acc);
                              setIsCreatingBank(false);
                              setBankForm({
                                nama_bank: acc.nama_bank,
                                nomor_rekening: acc.nomor_rekening,
                                atas_nama: acc.atas_nama,
                                keterangan: acc.keterangan || '',
                              });
                            }}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm('Hapus rekening ini?')) {
                                await deleteBankAccount(acc.id);
                                showNotice('Rekening dihapus!');
                              }
                            }}
                            className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 8: KONTAK WA PASTORAL */}
              {activeTab === 'pastoral' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Kontak WA Pastoral</h3>
                    <p className="text-xs text-slate-400">
                      Pdt. Christov Tumonggor, S.Fil (Pendeta Jemaat Salili)
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 max-w-xl">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Nama Pendeta *
                      </label>
                      <input
                        type="text"
                        value={pastoralForm.name}
                        onChange={(e) => setPastoralForm({ ...pastoralForm, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Nomor WhatsApp (Contoh: 6282293827489) *
                      </label>
                      <input
                        type="text"
                        value={pastoralForm.whatsappNumber}
                        onChange={(e) =>
                          setPastoralForm({ ...pastoralForm, whatsappNumber: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Pesan Sambutan Pastoral
                      </label>
                      <textarea
                        rows={4}
                        value={pastoralForm.welcomeMessage}
                        onChange={(e) =>
                          setPastoralForm({ ...pastoralForm, welcomeMessage: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Foto Pendeta
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={pastoralForm.foto_url || ''}
                          onChange={(e) =>
                            setPastoralForm({ ...pastoralForm, foto_url: e.target.value })
                          }
                          className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                        <label className="cursor-pointer px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleFileUpload(e, (url) =>
                                setPastoralForm((prev) => ({ ...prev, foto_url: url }))
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={async () => {
                          await updatePastoralContact(pastoralForm);
                          showNotice('Data kontak pastoral berhasil disimpan!');
                        }}
                        className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Simpan Kontak Pastoral</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 9: PERMOHONAN DOA */}
              {activeTab === 'prayers' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Kelola Permohonan Doa Jemaat</h3>
                    <p className="text-xs text-slate-400">
                      Lihat, perbarui status doa, dan tambahkan catatan pastoral
                    </p>
                  </div>

                  <div className="space-y-4">
                    {prayerRequests.map((req) => (
                      <div
                        key={req.id}
                        className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-base">{req.nama}</span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                req.status === 'Terjawab'
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : req.status === 'Sedang Didoakan'
                                  ? 'bg-blue-500/20 text-blue-300'
                                  : 'bg-amber-500/20 text-amber-300'
                              }`}
                            >
                              {req.status}
                            </span>
                            <span className="text-xs text-slate-500">
                              {req.isPublic ? '• Publik' : '• Privat (Pastoral)'}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={req.status}
                              onChange={async (e) => {
                                await updatePrayerRequest({
                                  ...req,
                                  status: e.target.value as any,
                                });
                                showNotice('Status doa diperbarui!');
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                            >
                              <option value="Menunggu Doa">Menunggu Doa</option>
                              <option value="Sedang Didoakan">Sedang Didoakan</option>
                              <option value="Terjawab">Puji Tuhan Terjawab</option>
                            </select>

                            <button
                              onClick={async () => {
                                if (confirm('Hapus permohonan doa ini?')) {
                                  await deletePrayerRequest(req.id);
                                  showNotice('Permohonan doa dihapus!');
                                }
                              }}
                              className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900 text-rose-300"
                              title="Hapus"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {req.permohonan}
                        </p>

                        {/* Pastoral Note Input */}
                        <div className="pt-2 flex gap-2">
                          <input
                            type="text"
                            defaultValue={req.pastoralNotes || ''}
                            id={`note-${req.id}`}
                            placeholder="Tambahkan catatan pastoral / tanggapan doa..."
                            className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                          />
                          <button
                            onClick={async () => {
                              const note = (document.getElementById(`note-${req.id}`) as HTMLInputElement)?.value;
                              await updatePrayerRequest({
                                ...req,
                                pastoralNotes: note,
                              });
                              showNotice('Catatan pastoral disimpan!');
                            }}
                            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                          >
                            Simpan Catatan
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 10: JADWAL IBADAH */}
              {activeTab === 'schedules' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">Kelola Jadwal Ibadah</h3>
                      <p className="text-xs text-slate-400">
                        Sekolah Sabat (09:00 WITA), Khotbah (10:30 WITA), Pemuda (Minggu 18:00 WITA)
                      </p>
                    </div>
                    {!isCreatingSchedule && !editingSchedule && (
                      <button
                        onClick={() => {
                          setIsCreatingSchedule(true);
                          setScheduleForm({
                            hari: 'Sabtu (Hari Sabat)',
                            waktu: '09:00 - 10:15 WITA',
                            kegiatan: '',
                            keterangan: '',
                          });
                        }}
                        className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Jadwal</span>
                      </button>
                    )}
                  </div>

                  {(isCreatingSchedule || editingSchedule) && (
                    <div className="p-5 rounded-2xl bg-slate-950 border border-blue-500/40 space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <h4 className="font-bold text-white text-sm">
                          {editingSchedule ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}
                        </h4>
                        <button
                          onClick={() => {
                            setIsCreatingSchedule(false);
                            setEditingSchedule(null);
                          }}
                          className="text-xs text-slate-400 hover:text-white"
                        >
                          Batal
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-300 mb-1">Hari *</label>
                          <input
                            type="text"
                            value={scheduleForm.hari}
                            onChange={(e) => setScheduleForm({ ...scheduleForm, hari: e.target.value })}
                            placeholder="Sabtu (Hari Sabat) / Minggu / Rabu"
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-300 mb-1">Waktu (WITA) *</label>
                          <input
                            type="text"
                            value={scheduleForm.waktu}
                            onChange={(e) => setScheduleForm({ ...scheduleForm, waktu: e.target.value })}
                            placeholder="09:00 WITA"
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-slate-300 mb-1">Nama Kegiatan *</label>
                        <input
                          type="text"
                          value={scheduleForm.kegiatan}
                          onChange={(e) => setScheduleForm({ ...scheduleForm, kegiatan: e.target.value })}
                          placeholder="Sekolah Sabat / Khotbah / Persekutuan Pemuda"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-slate-300 mb-1">Keterangan Tambahan</label>
                        <input
                          type="text"
                          value={scheduleForm.keterangan}
                          onChange={(e) => setScheduleForm({ ...scheduleForm, keterangan: e.target.value })}
                          placeholder="Deskripsi kegiatan..."
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          onClick={async () => {
                            if (!scheduleForm.hari || !scheduleForm.waktu || !scheduleForm.kegiatan) {
                              showNotice('Hari, Waktu, dan Kegiatan wajib diisi', 'error');
                              return;
                            }
                            if (editingSchedule) {
                              await updateSchedule({
                                ...editingSchedule,
                                ...scheduleForm,
                              });
                              showNotice('Jadwal ibadah diperbarui!');
                              setEditingSchedule(null);
                            } else {
                              await addSchedule(scheduleForm);
                              showNotice('Jadwal ibadah baru ditambahkan!');
                              setIsCreatingSchedule(false);
                            }
                          }}
                          className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Simpan Jadwal</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {schedules.map((sch) => (
                      <div
                        key={sch.id}
                        className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600/30 text-blue-300">
                              {sch.hari}
                            </span>
                            <span className="text-xs font-semibold text-amber-300">{sch.waktu}</span>
                          </div>
                          <h4 className="font-bold text-white text-sm">{sch.kegiatan}</h4>
                          {sch.keterangan && (
                            <p className="text-xs text-slate-400 mt-0.5">{sch.keterangan}</p>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingSchedule(sch);
                              setIsCreatingSchedule(false);
                              setScheduleForm({
                                hari: sch.hari,
                                waktu: sch.waktu,
                                kegiatan: sch.kegiatan,
                                keterangan: sch.keterangan || '',
                              });
                            }}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm('Hapus jadwal ini?')) {
                                await deleteSchedule(sch.id);
                                showNotice('Jadwal dihapus!');
                              }
                            }}
                            className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 11: PROFIL & VISI MISI */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Profil, Sejarah, Visi & Misi Gereja</h3>
                    <p className="text-xs text-slate-400">
                      Edit data resmi GMAHK Jemaat Salili di Siau Tengah, Sitaro
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 max-w-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Nama Gereja
                        </label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Motto Pelayanan
                        </label>
                        <input
                          type="text"
                          value={profileForm.motto || ''}
                          onChange={(e) => setProfileForm({ ...profileForm, motto: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Tagline Utama
                      </label>
                      <input
                        type="text"
                        value={profileForm.tagline}
                        onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Deskripsi Singkat
                      </label>
                      <textarea
                        rows={3}
                        value={profileForm.shortDescription}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, shortDescription: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Sejarah Singkat Jemaat Salili
                      </label>
                      <textarea
                        rows={4}
                        value={profileForm.history || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, history: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Visi Gereja
                        </label>
                        <textarea
                          rows={4}
                          value={profileForm.vision || ''}
                          onChange={(e) => setProfileForm({ ...profileForm, vision: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Misi Gereja
                        </label>
                        <textarea
                          rows={4}
                          value={profileForm.mission || ''}
                          onChange={(e) => setProfileForm({ ...profileForm, mission: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>
                    </div>

                    {/* Location fields */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Desa/Kelurahan</label>
                        <input
                          type="text"
                          value={profileForm.village}
                          onChange={(e) => setProfileForm({ ...profileForm, village: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Kecamatan</label>
                        <input
                          type="text"
                          value={profileForm.district}
                          onChange={(e) => setProfileForm({ ...profileForm, district: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Kabupaten</label>
                        <input
                          type="text"
                          value={profileForm.regency}
                          onChange={(e) => setProfileForm({ ...profileForm, regency: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Provinsi</label>
                        <input
                          type="text"
                          value={profileForm.province}
                          onChange={(e) => setProfileForm({ ...profileForm, province: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="pt-3 flex justify-end">
                      <button
                        onClick={async () => {
                          await updateProfile(profileForm);
                          showNotice('Profil & Visi Misi gereja berhasil disimpan ke Supabase!');
                        }}
                        className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Simpan Seluruh Profil</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 12: UBAH USER & PASSWORD */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Ubah Username & Password Admin</h3>
                    <p className="text-xs text-slate-400">
                      Kelola keamanan akses dashboard admin jemaat (Tersimpan di Supabase & aman)
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 max-w-md">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Username Admin
                      </label>
                      <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Password Baru
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Ketik password baru..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Konfirmasi Password Baru
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Ulangi password baru..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={async () => {
                          if (!newUsername.trim()) {
                            showNotice('Username tidak boleh kosong', 'error');
                            return;
                          }
                          if (newPassword !== confirmPassword) {
                            showNotice('Password dan konfirmasi password tidak cocok!', 'error');
                            return;
                          }
                          if (newPassword.length < 5) {
                            showNotice('Password minimal 5 karakter', 'error');
                            return;
                          }

                          await updateAdminCredentials(newUsername.trim(), newPassword);
                          showNotice('Username dan Password admin berhasil diperbarui!');
                          setNewPassword('');
                          setConfirmPassword('');
                        }}
                        className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Simpan Password Baru</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 13: PANDUAN VERCEL & SUPABASE SQL SCHEMA */}
              {activeTab === 'setup_guide' && (
                <div className="space-y-6 max-w-4xl">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Panduan Deploy Vercel & Skrip SQL Supabase
                    </h3>
                    <p className="text-xs text-slate-400">
                      Langkah lengkap menghubungkan Supabase secara permanen dan deployment ke Vercel
                    </p>
                  </div>

                  {/* Supabase SQL Setup Step */}
                  <div className="p-6 rounded-2xl bg-slate-950 border border-blue-500/40 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                          1
                        </span>
                        <h4 className="text-base font-bold text-white">
                          Jalankan Skrip SQL Schema di Supabase
                        </h4>
                      </div>

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
                          setCopiedSql(true);
                          setTimeout(() => setCopiedSql(false), 2500);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow"
                      >
                        {copiedSql ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Salin Semua SQL (1-Click)</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      Buka dashboard Supabase Anda:
                      <br />
                      1. Masuk ke{' '}
                      <a
                        href="https://supabase.com/dashboard/project/trbazsjcmxsqeqluqzku/sql"
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-300 underline font-semibold inline-flex items-center gap-1"
                      >
                        Supabase SQL Editor <ExternalLink className="w-3 h-3" />
                      </a>
                      <br />
                      2. Klik <strong>&ldquo;New query&rdquo;</strong>, tempel (paste) kode SQL di bawah ini, lalu klik <strong>&ldquo;Run&rdquo;</strong>.
                      <br />
                      3. Ini akan otomatis membuat 9 tabel, RLS policies, dan bucket penyimpanan <code className="text-blue-300 bg-blue-950 px-1 py-0.5 rounded">{BUCKET_NAME}</code>!
                    </p>

                    <div className="relative max-h-56 overflow-y-auto rounded-xl bg-slate-900 p-4 font-mono text-[11px] text-slate-300 border border-slate-800">
                      <pre className="whitespace-pre">{SUPABASE_SQL_SCHEMA}</pre>
                    </div>
                  </div>

                  {/* Vercel Deployment Step */}
                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                        2
                      </span>
                      <h4 className="text-base font-bold text-white">Langkah Deploy ke Vercel</h4>
                    </div>

                    <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                      <p>
                        1. <strong>Push ke GitHub</strong>: Buat repository GitHub baru (misal: <code className="text-amber-300 font-mono">gmahk-salili</code>) dan push kode ini.
                      </p>
                      <p>
                        2. <strong>Buka Vercel</strong>: Masuk ke <a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="text-blue-300 underline">vercel.com/new</a>, import repository GitHub Anda.
                      </p>
                      <p>
                        3. <strong>Tambahkan Environment Variables di Vercel</strong>:
                      </p>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-amber-300 space-y-1">
                        <div>VITE_SUPABASE_URL = https://trbazsjcmxsqeqluqzku.supabase.co</div>
                        <div className="break-all">VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyYmF6c2pjbXhzcWVxbHVxemt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0MTI4NzUsImV4cCI6MjEwMzk4ODg3NX0.HeLSP86467zmNkQX0AAQeOwhBiYNeVi3etZxJIow6Mg</div>
                      </div>
                      <p>
                        4. <strong>Klik Deploy</strong>: Vercel akan otomatis meng-compile aplikasi Vite React TypeScript dan website GMAHK Jemaat Salili langsung online!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
};
