import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
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
import {
  DEFAULT_PROFILE,
  DEFAULT_HERO_IMAGES,
  DEFAULT_SCHEDULES,
  DEFAULT_LEADERS,
  DEFAULT_BANK_ACCOUNTS,
  DEFAULT_PASTORAL_CONTACT,
  DEFAULT_PRAYER_REQUESTS,
  DEFAULT_ARTICLES,
  DEFAULT_ADMIN,
} from '../data/defaults';
import { supabase } from '../lib/supabase';

interface SupabaseStatus {
  isConnected: boolean;
  checking: boolean;
  tableStatus: Record<string, boolean>;
  message: string;
}

interface ChurchContextType {
  profile: ChurchProfile;
  heroImages: HeroImage[];
  schedules: WorshipSchedule[];
  articles: Article[];
  prayerRequests: PrayerRequest[];
  leaders: ChurchLeader[];
  bankAccounts: BankAccount[];
  pastoralContact: PastoralContact;
  adminCredential: AdminCredential;
  isLoading: boolean;
  supabaseStatus: SupabaseStatus;

  // Actions
  updateProfile: (profile: Partial<ChurchProfile>) => Promise<boolean>;
  addHeroImage: (image: Omit<HeroImage, 'id'>) => Promise<boolean>;
  updateHeroImage: (image: HeroImage) => Promise<boolean>;
  deleteHeroImage: (id: string) => Promise<boolean>;
  setPrimaryHeroImage: (id: string) => Promise<boolean>;

  addSchedule: (schedule: Omit<WorshipSchedule, 'id'>) => Promise<boolean>;
  updateSchedule: (schedule: WorshipSchedule) => Promise<boolean>;
  deleteSchedule: (id: string) => Promise<boolean>;

  addArticle: (article: Omit<Article, 'id'>) => Promise<boolean>;
  updateArticle: (article: Article) => Promise<boolean>;
  deleteArticle: (id: string) => Promise<boolean>;

  addPrayerRequest: (request: { nama: string; permohonan: string; isPublic: boolean }) => Promise<boolean>;
  incrementPrayerCount: (id: string) => Promise<void>;
  updatePrayerRequest: (request: PrayerRequest) => Promise<boolean>;
  deletePrayerRequest: (id: string) => Promise<boolean>;

  addLeader: (leader: Omit<ChurchLeader, 'id'>) => Promise<boolean>;
  updateLeader: (leader: ChurchLeader) => Promise<boolean>;
  deleteLeader: (id: string) => Promise<boolean>;

  addBankAccount: (bank: Omit<BankAccount, 'id'>) => Promise<boolean>;
  updateBankAccount: (bank: BankAccount) => Promise<boolean>;
  deleteBankAccount: (id: string) => Promise<boolean>;

  updatePastoralContact: (contact: Partial<PastoralContact>) => Promise<boolean>;
  updateAdminCredentials: (newUsername: string, newPassword: string) => Promise<boolean>;

  refreshData: () => Promise<void>;
  seedAllDefaultsToSupabase: () => Promise<{ success: boolean; message: string }>;
}

const ChurchContext = createContext<ChurchContextType | undefined>(undefined);

export const ChurchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ChurchProfile>(DEFAULT_PROFILE);
  const [heroImages, setHeroImages] = useState<HeroImage[]>(DEFAULT_HERO_IMAGES);
  const [schedules, setSchedules] = useState<WorshipSchedule[]>(DEFAULT_SCHEDULES);
  const [articles, setArticles] = useState<Article[]>(DEFAULT_ARTICLES);
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>(DEFAULT_PRAYER_REQUESTS);
  const [leaders, setLeaders] = useState<ChurchLeader[]>(DEFAULT_LEADERS);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(DEFAULT_BANK_ACCOUNTS);
  const [pastoralContact, setPastoralContact] = useState<PastoralContact>(DEFAULT_PASTORAL_CONTACT);
  const [adminCredential, setAdminCredential] = useState<AdminCredential>(DEFAULT_ADMIN);
  const [isLoading, setIsLoading] = useState(true);
  const [supabaseStatus, setSupabaseStatus] = useState<SupabaseStatus>({
    isConnected: false,
    checking: true,
    tableStatus: {},
    message: 'Memeriksa koneksi Supabase...',
  });

  // ===== FUNGSI AMBIL DATA DARI SUPABASE =====
  const loadSupabaseData = useCallback(async () => {
    setIsLoading(true);
    setSupabaseStatus((prev) => ({ ...prev, checking: true }));

    const tableResults: Record<string, boolean> = {};

    try {
      // 1. Profile
      const { data: profData, error: profErr } = await supabase.from('profile').select('*').limit(1);
      tableResults['profile'] = !profErr;
      if (profData && profData.length > 0) {
        setProfile({ ...DEFAULT_PROFILE, ...profData[0] });
      }

      // 2. Hero Images
      const { data: heroData, error: heroErr } = await supabase
        .from('hero_images')
        .select('*')
        .order('created_at', { ascending: true });
      tableResults['hero_images'] = !heroErr;
      if (heroData && heroData.length > 0) {
        setHeroImages(heroData);
      }

      // 3. Schedules
      const { data: schData, error: schErr } = await supabase
        .from('schedules')
        .select('*')
        .order('created_at', { ascending: true });
      tableResults['schedules'] = !schErr;
      if (schData && schData.length > 0) {
        setSchedules(schData);
      }

      // 4. Articles
      const { data: artData, error: artErr } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });
      tableResults['articles'] = !artErr;
      if (artData && artData.length > 0) {
        setArticles(artData);
      }

      // 5. Prayer Requests
      const { data: prayData, error: prayErr } = await supabase
        .from('prayer_requests')
        .select('*')
        .order('created_at', { ascending: false });
      tableResults['prayer_requests'] = !prayErr;
      if (prayData && prayData.length > 0) {
        setPrayerRequests(prayData);
      }

      // 6. Leaders
      const { data: ldrData, error: ldrErr } = await supabase
        .from('leaders')
        .select('*')
        .order('created_at', { ascending: true });
      tableResults['leaders'] = !ldrErr;
      if (ldrData && ldrData.length > 0) {
        setLeaders(ldrData);
      }

      // 7. Bank Accounts
      const { data: bnkData, error: bnkErr } = await supabase.from('bank_accounts').select('*');
      tableResults['bank_accounts'] = !bnkErr;
      if (bnkData && bnkData.length > 0) {
        setBankAccounts(bnkData);
      }

      // 8. Pastoral Contacts
      const { data: pastData, error: pastErr } = await supabase
        .from('pastoral_contacts')
        .select('*')
        .limit(1);
      tableResults['pastoral_contacts'] = !pastErr;
      if (pastData && pastData.length > 0) {
        const raw = pastData[0];
        // Mapping lowercase columns from Supabase to camelCase
        setPastoralContact({
          id: raw.id,
          name: raw.name,
          jabatan: raw.jabatan || '',
          whatsappNumber: raw.whatsappnumber || raw.whatsappNumber || '',
          welcomeMessage: raw.welcomemessage || raw.welcomeMessage || '',
          foto_url: raw.foto_url || '',
        });
      }

      // 9. Admin Credentials
      const { data: admData, error: admErr } = await supabase
        .from('admin_credentials')
        .select('*')
        .limit(1);
      tableResults['admin_credentials'] = !admErr;
      if (admData && admData.length > 0) {
        setAdminCredential({ ...DEFAULT_ADMIN, ...admData[0] });
      }

      const anyTableSuccess = Object.values(tableResults).some((val) => val === true);

      setSupabaseStatus({
        isConnected: true,
        checking: false,
        tableStatus: tableResults,
        message: anyTableSuccess
          ? '✅ Terhubung ke Supabase Database'
          : '⚠️ Tabel belum dibuat. Jalankan SQL Schema.',
      });
    } catch (err: any) {
      console.warn('Supabase fetch error:', err);
      setSupabaseStatus({
        isConnected: false,
        checking: false,
        tableStatus: tableResults,
        message: `❌ Gagal terhubung: ${err.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ===== LOAD DATA SAAT PERTAMA =====
  useEffect(() => {
    loadSupabaseData();
  }, [loadSupabaseData]);

  // ===== REFRESH DATA =====
  const refreshData = async () => {
    await loadSupabaseData();
  };

  // ===== SEED DATA DEFAULT =====
  const seedAllDefaultsToSupabase = async (): Promise<{ success: boolean; message: string }> => {
    try {
      await supabase.from('profile').upsert([DEFAULT_PROFILE]);
      await supabase.from('hero_images').upsert(DEFAULT_HERO_IMAGES);
      await supabase.from('schedules').upsert(DEFAULT_SCHEDULES);
      await supabase.from('articles').upsert(DEFAULT_ARTICLES);
      await supabase.from('prayer_requests').upsert(DEFAULT_PRAYER_REQUESTS);
      await supabase.from('leaders').upsert(DEFAULT_LEADERS);
      await supabase.from('bank_accounts').upsert(DEFAULT_BANK_ACCOUNTS);
      await supabase.from('pastoral_contacts').upsert([DEFAULT_PASTORAL_CONTACT]);
      await supabase.from('admin_credentials').upsert([DEFAULT_ADMIN]);

      await loadSupabaseData();
      return { success: true, message: '✅ Data default berhasil di-seed ke Supabase!' };
    } catch (err: any) {
      return {
        success: false,
        message: `❌ Gagal seed: ${err.message}`,
      };
    }
  };

  // ============================================
  // ACTIONS (SEMUA LANGSUNG KE SUPABASE)
  // ============================================

  // 1. Profile
  const updateProfile = async (newFields: Partial<ChurchProfile>): Promise<boolean> => {
    try {
      const updated = { ...profile, ...newFields };
      await supabase.from('profile').upsert([updated]);
      setProfile(updated);
      return true;
    } catch (e) {
      console.warn('Update profile error:', e);
      return false;
    }
  };

  // 2. Hero Images
  const addHeroImage = async (img: Omit<HeroImage, 'id'>): Promise<boolean> => {
    try {
      const newId = `hero-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      
      const { data, error } = await supabase
        .from('hero_images')
        .insert([{
          id: newId,
          imageUrl: img.imageUrl,
          title: img.title,
          subtitle: img.subtitle || '',
          badgeText: img.badgeText || 'GMAHK Salili',
          isPrimary: img.isPrimary || false,
          created_at: new Date().toISOString(),
        }])
        .select();

      if (error) {
        console.error('Add hero image error:', error);
        return false;
      }
      if (data) {
        setHeroImages([...heroImages, data[0]]);
      }
      return true;
    } catch (e) {
      console.error('Add hero image error:', e);
      return false;
    }
  };

  const updateHeroImage = async (image: HeroImage): Promise<boolean> => {
    try {
      await supabase.from('hero_images').update(image).eq('id', image.id);
      setHeroImages(heroImages.map((item) => (item.id === image.id ? image : item)));
      return true;
    } catch (e) {
      console.warn('Update hero image error:', e);
      return false;
    }
  };

  const deleteHeroImage = async (id: string): Promise<boolean> => {
    try {
      await supabase.from('hero_images').delete().eq('id', id);
      setHeroImages(heroImages.filter((item) => item.id !== id));
      return true;
    } catch (e) {
      console.warn('Delete hero image error:', e);
      return false;
    }
  };

  const setPrimaryHeroImage = async (id: string): Promise<boolean> => {
    try {
      const updatedList = heroImages.map((item) => ({
        ...item,
        isPrimary: item.id === id,
      }));
      for (const item of updatedList) {
        await supabase.from('hero_images').update({ isPrimary: item.isPrimary }).eq('id', item.id);
      }
      setHeroImages(updatedList);
      return true;
    } catch (e) {
      console.warn('Set primary hero image error:', e);
      return false;
    }
  };

  // 3. Schedules
  const addSchedule = async (sch: Omit<WorshipSchedule, 'id'>): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('schedules')
        .insert([sch])
        .select();
      if (error) throw error;
      if (data) {
        setSchedules([...schedules, data[0]]);
      }
      return true;
    } catch (e) {
      console.warn('Add schedule error:', e);
      return false;
    }
  };

  const updateSchedule = async (schedule: WorshipSchedule): Promise<boolean> => {
    try {
      await supabase.from('schedules').update(schedule).eq('id', schedule.id);
      setSchedules(schedules.map((item) => (item.id === schedule.id ? schedule : item)));
      return true;
    } catch (e) {
      console.warn('Update schedule error:', e);
      return false;
    }
  };

  const deleteSchedule = async (id: string): Promise<boolean> => {
    try {
      await supabase.from('schedules').delete().eq('id', id);
      setSchedules(schedules.filter((item) => item.id !== id));
      return true;
    } catch (e) {
      console.warn('Delete schedule error:', e);
      return false;
    }
  };

  // 4. Articles
  const addArticle = async (art: Omit<Article, 'id'>): Promise<boolean> => {
    try {
      const slug = art.slug || art.judul.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      const { data, error } = await supabase
        .from('articles')
        .insert([{
          judul: art.judul,
          konten: art.konten,
          gambar_url: art.gambar_url || '',
          slug: slug,
          penulis: art.penulis || 'Admin',
          kategori: art.kategori || 'Rohani'
        }])
        .select();

      if (error) {
        console.error('Supabase insert error:', error);
        return false;
      }

      if (data) {
        setArticles([data[0], ...articles]);
      }
      return true;
    } catch (e) {
      console.error('Add article error:', e);
      return false;
    }
  };

  const updateArticle = async (article: Article): Promise<boolean> => {
    try {
      await supabase.from('articles').update(article).eq('id', article.id);
      setArticles(articles.map((item) => (item.id === article.id ? article : item)));
      return true;
    } catch (e) {
      console.warn('Update article error:', e);
      return false;
    }
  };

  const deleteArticle = async (id: string): Promise<boolean> => {
    try {
      await supabase.from('articles').delete().eq('id', id);
      setArticles(articles.filter((item) => item.id !== id));
      return true;
    } catch (e) {
      console.warn('Delete article error:', e);
      return false;
    }
  };

  // 5. Prayer Requests
  const addPrayerRequest = async (req: { nama: string; permohonan: string; isPublic: boolean }): Promise<boolean> => {
    try {
      const newReq = {
        nama: req.nama,
        permohonan: req.permohonan,
        status: 'Menunggu Doa',
        prayerCount: 1,
        isPublic: req.isPublic,
      };
      const { data, error } = await supabase
        .from('prayer_requests')
        .insert([newReq])
        .select();
      if (error) throw error;
      if (data) {
        setPrayerRequests([data[0], ...prayerRequests]);
      }
      return true;
    } catch (e) {
      console.warn('Add prayer request error:', e);
      return false;
    }
  };

  const incrementPrayerCount = async (id: string) => {
    try {
      const target = prayerRequests.find((item) => item.id === id);
      if (!target) return;
      const updated = { ...target, prayerCount: (target.prayerCount || 0) + 1 };
      await supabase.from('prayer_requests').update({ prayerCount: updated.prayerCount }).eq('id', id);
      setPrayerRequests(prayerRequests.map((item) => (item.id === id ? updated : item)));
    } catch (e) {
      console.warn('Increment prayer count error:', e);
    }
  };

  const updatePrayerRequest = async (request: PrayerRequest): Promise<boolean> => {
    try {
      await supabase.from('prayer_requests').update(request).eq('id', request.id);
      setPrayerRequests(prayerRequests.map((item) => (item.id === request.id ? request : item)));
      return true;
    } catch (e) {
      console.warn('Update prayer request error:', e);
      return false;
    }
  };

  const deletePrayerRequest = async (id: string): Promise<boolean> => {
    try {
      await supabase.from('prayer_requests').delete().eq('id', id);
      setPrayerRequests(prayerRequests.filter((item) => item.id !== id));
      return true;
    } catch (e) {
      console.warn('Delete prayer request error:', e);
      return false;
    }
  };

  // 6. Leaders
const addLeader = async (ldr: Omit<ChurchLeader, 'id'>): Promise<boolean> => {
  try {
    // Mapping ke lowercase (sesuai Supabase)
    const { data, error } = await supabase
      .from('leaders')
      .insert([{
        nama: ldr.nama,
        jabatan: ldr.jabatan,
        foto_url: ldr.foto_url || '',
        urutan: ldr.urutan || 1,
      }])
      .select();

    if (error) {
      console.error('Add leader error:', error);
      return false;
    }
    if (data) {
      setLeaders([...leaders, data[0]]);
    }
    return true;
  } catch (e) {
    console.warn('Add leader error:', e);
    return false;
  }
};

const updateLeader = async (leader: ChurchLeader): Promise<boolean> => {
  try {
    // Mapping ke lowercase (sesuai Supabase)
    const { error } = await supabase
      .from('leaders')
      .update({
        nama: leader.nama,
        jabatan: leader.jabatan,
        foto_url: leader.foto_url || '',
        urutan: leader.urutan || 1,
      })
      .eq('id', leader.id);

    if (error) {
      console.error('Update leader error:', error);
      return false;
    }

    // Update state lokal
    setLeaders(leaders.map((item) => (item.id === leader.id ? leader : item)));
    await refreshData();
    return true;
  } catch (e) {
    console.warn('Update leader error:', e);
    return false;
  }
};

  const deleteLeader = async (id: string): Promise<boolean> => {
    try {
      await supabase.from('leaders').delete().eq('id', id);
      setLeaders(leaders.filter((item) => item.id !== id));
      return true;
    } catch (e) {
      console.warn('Delete leader error:', e);
      return false;
    }
  };

  // 7. Bank Accounts
const addBankAccount = async (bank: Omit<BankAccount, 'id'>): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('bank_accounts')
      .insert([{
        nama_bank: bank.nama_bank,
        nomor_rekening: bank.nomor_rekening,
        atas_nama: bank.atas_nama,
        keterangan: bank.keterangan || '',
      }])
      .select();

    if (error) {
      console.error('Add bank account error:', error);
      return false;
    }
    if (data) {
      setBankAccounts([...bankAccounts, data[0]]);
    }
    return true;
  } catch (e) {
    console.warn('Add bank account error:', e);
    return false;
  }
};

const updateBankAccount = async (bank: BankAccount): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('bank_accounts')
      .update({
        nama_bank: bank.nama_bank,
        nomor_rekening: bank.nomor_rekening,
        atas_nama: bank.atas_nama,
        keterangan: bank.keterangan || '',
      })
      .eq('id', bank.id);

    if (error) {
      console.error('Update bank account error:', error);
      return false;
    }

    setBankAccounts(bankAccounts.map((item) => (item.id === bank.id ? bank : item)));
    await refreshData();
    return true;
  } catch (e) {
    console.warn('Update bank account error:', e);
    return false;
  }
};

  const deleteBankAccount = async (id: string): Promise<boolean> => {
    try {
      await supabase.from('bank_accounts').delete().eq('id', id);
      setBankAccounts(bankAccounts.filter((item) => item.id !== id));
      return true;
    } catch (e) {
      console.warn('Delete bank account error:', e);
      return false;
    }
  };

  // 8. Pastoral Contact
  const updatePastoralContact = async (contact: Partial<PastoralContact>): Promise<boolean> => {
  try {
    // Buat objek dengan nama kolom lowercase (sesuai Supabase)
    const updated = { 
      id: contact.id || pastoralContact.id,
      name: contact.name || pastoralContact.name,
      jabatan: contact.jabatan || pastoralContact.jabatan || '',
      whatsappnumber: contact.whatsappNumber || pastoralContact.whatsappNumber || '', // lowercase!
      welcomemessage: contact.welcomeMessage || pastoralContact.welcomeMessage || '', // lowercase!
      foto_url: contact.foto_url || pastoralContact.foto_url || '',
    };

    console.log('Menyimpan (lowercase):', updated);

    const { error } = await supabase
      .from('pastoral_contacts')
      .upsert([updated]); // Kirim sebagai array of objects

    if (error) {
      console.error('Supabase error:', error);
      return false;
    }

    // Update state lokal (camelCase)
    setPastoralContact({
      id: updated.id,
      name: updated.name,
      jabatan: updated.jabatan,
      whatsappNumber: updated.whatsappnumber,
      welcomeMessage: updated.welcomemessage,
      foto_url: updated.foto_url,
    });

    await refreshData();
    return true;
  } catch (e) {
    console.warn('Update pastoral contact error:', e);
    return false;
  }
};

  // 9. Admin Credentials
  const updateAdminCredentials = async (newUsername: string, newPassword: string): Promise<boolean> => {
    try {
      const updated: AdminCredential = {
        id: adminCredential.id || 'admin-main',
        username: newUsername,
        passwordHash: newPassword,
        lastUpdated: new Date().toISOString(),
      };
      await supabase.from('admin_credentials').upsert([updated]);
      setAdminCredential(updated);
      return true;
    } catch (e) {
      console.warn('Update admin credentials error:', e);
      return false;
    }
  };

  return (
    <ChurchContext.Provider
      value={{
        profile,
        heroImages,
        schedules,
        articles,
        prayerRequests,
        leaders,
        bankAccounts,
        pastoralContact,
        adminCredential,
        isLoading,
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
        addPrayerRequest,
        incrementPrayerCount,
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
      }}
    >
      {children}
    </ChurchContext.Provider>
  );
};

export const useChurch = () => {
  const context = useContext(ChurchContext);
  if (!context) {
    throw new Error('useChurch must be used within a ChurchProvider');
  }
  return context;
};