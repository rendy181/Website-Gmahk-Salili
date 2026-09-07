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
  const [profile, setProfile] = useState<ChurchProfile>(() => {
    const saved = localStorage.getItem('gmahk_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const [heroImages, setHeroImages] = useState<HeroImage[]>(() => {
    const saved = localStorage.getItem('gmahk_hero_images');
    return saved ? JSON.parse(saved) : DEFAULT_HERO_IMAGES;
  });

  const [schedules, setSchedules] = useState<WorshipSchedule[]>(() => {
    const saved = localStorage.getItem('gmahk_schedules');
    return saved ? JSON.parse(saved) : DEFAULT_SCHEDULES;
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('gmahk_articles');
    return saved ? JSON.parse(saved) : DEFAULT_ARTICLES;
  });

  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>(() => {
    const saved = localStorage.getItem('gmahk_prayer_requests');
    return saved ? JSON.parse(saved) : DEFAULT_PRAYER_REQUESTS;
  });

  const [leaders, setLeaders] = useState<ChurchLeader[]>(() => {
    const saved = localStorage.getItem('gmahk_leaders');
    return saved ? JSON.parse(saved) : DEFAULT_LEADERS;
  });

  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(() => {
    const saved = localStorage.getItem('gmahk_bank_accounts');
    return saved ? JSON.parse(saved) : DEFAULT_BANK_ACCOUNTS;
  });

  const [pastoralContact, setPastoralContact] = useState<PastoralContact>(() => {
    const saved = localStorage.getItem('gmahk_pastoral_contact');
    return saved ? JSON.parse(saved) : DEFAULT_PASTORAL_CONTACT;
  });

  const [adminCredential, setAdminCredential] = useState<AdminCredential>(() => {
    const saved = localStorage.getItem('gmahk_admin_credential');
    return saved ? JSON.parse(saved) : DEFAULT_ADMIN;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [supabaseStatus, setSupabaseStatus] = useState<SupabaseStatus>({
    isConnected: false,
    checking: true,
    tableStatus: {},
    message: 'Memeriksa koneksi Supabase...',
  });

  // Local storage synchronization helper
  const syncToLocal = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('Local storage write warning:', e);
    }
  };

  // Fetch all tables from Supabase
  const loadSupabaseData = useCallback(async () => {
    setIsLoading(true);
    setSupabaseStatus((prev) => ({ ...prev, checking: true }));

    const tableResults: Record<string, boolean> = {};

    try {
      // 1. Profile
      const { data: profData, error: profErr } = await supabase.from('profile').select('*').limit(1);
      tableResults['profile'] = !profErr;
      if (profData && profData.length > 0) {
        const merged = { ...DEFAULT_PROFILE, ...profData[0] };
        setProfile(merged);
        syncToLocal('gmahk_profile', merged);
      }

      // 2. Hero Images
      const { data: heroData, error: heroErr } = await supabase
        .from('hero_images')
        .select('*')
        .order('isPrimary', { ascending: false });
      tableResults['hero_images'] = !heroErr;
      if (heroData && heroData.length > 0) {
        setHeroImages(heroData);
        syncToLocal('gmahk_hero_images', heroData);
      }

      // 3. Schedules
      const { data: schData, error: schErr } = await supabase
        .from('schedules')
        .select('*')
        .order('created_at', { ascending: true });
      tableResults['schedules'] = !schErr;
      if (schData && schData.length > 0) {
        setSchedules(schData);
        syncToLocal('gmahk_schedules', schData);
      }

      // 4. Articles
      const { data: artData, error: artErr } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });
      tableResults['articles'] = !artErr;
      if (artData && artData.length > 0) {
        setArticles(artData);
        syncToLocal('gmahk_articles', artData);
      }

      // 5. Prayer Requests
      const { data: prayData, error: prayErr } = await supabase
        .from('prayer_requests')
        .select('*')
        .order('created_at', { ascending: false });
      tableResults['prayer_requests'] = !prayErr;
      if (prayData && prayData.length > 0) {
        setPrayerRequests(prayData);
        syncToLocal('gmahk_prayer_requests', prayData);
      }

      // 6. Leaders
      const { data: ldrData, error: ldrErr } = await supabase
        .from('leaders')
        .select('*')
        .order('urutan', { ascending: true });
      tableResults['leaders'] = !ldrErr;
      if (ldrData && ldrData.length > 0) {
        setLeaders(ldrData);
        syncToLocal('gmahk_leaders', ldrData);
      }

      // 7. Bank Accounts
      const { data: bnkData, error: bnkErr } = await supabase.from('bank_accounts').select('*');
      tableResults['bank_accounts'] = !bnkErr;
      if (bnkData && bnkData.length > 0) {
        setBankAccounts(bnkData);
        syncToLocal('gmahk_bank_accounts', bnkData);
      }

      // 8. Pastoral Contacts
      const { data: pastData, error: pastErr } = await supabase
        .from('pastoral_contacts')
        .select('*')
        .limit(1);
      tableResults['pastoral_contacts'] = !pastErr;
      if (pastData && pastData.length > 0) {
        const mergedPastoral = { ...DEFAULT_PASTORAL_CONTACT, ...pastData[0] };
        setPastoralContact(mergedPastoral);
        syncToLocal('gmahk_pastoral_contact', mergedPastoral);
      }

      // 9. Admin Credentials
      const { data: admData, error: admErr } = await supabase
        .from('admin_credentials')
        .select('*')
        .limit(1);
      tableResults['admin_credentials'] = !admErr;
      if (admData && admData.length > 0) {
        const mergedAdmin = { ...DEFAULT_ADMIN, ...admData[0] };
        setAdminCredential(mergedAdmin);
        syncToLocal('gmahk_admin_credential', mergedAdmin);
      }

      const anyTableSuccess = Object.values(tableResults).some((val) => val === true);

      setSupabaseStatus({
        isConnected: true,
        checking: false,
        tableStatus: tableResults,
        message: anyTableSuccess
          ? 'Terhubung dengan Database Supabase (Live)'
          : 'Terhubung ke server Supabase. Jalankan Schema SQL untuk membuat tabel.',
      });
    } catch (err: any) {
      console.warn('Supabase initial fetch exception:', err);
      setSupabaseStatus({
        isConnected: false,
        checking: false,
        tableStatus: tableResults,
        message: `Offline / Fallback lokal aktif (${err.message || 'Koneksi terbatas'})`,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSupabaseData();
  }, [loadSupabaseData]);

  // Seed default data into Supabase tables if user clicks button in Admin
  const seedAllDefaultsToSupabase = async (): Promise<{ success: boolean; message: string }> => {
    try {
      // 1. Profile
      await supabase.from('profile').upsert([DEFAULT_PROFILE]);
      // 2. Hero Images
      await supabase.from('hero_images').upsert(DEFAULT_HERO_IMAGES);
      // 3. Schedules
      await supabase.from('schedules').upsert(DEFAULT_SCHEDULES);
      // 4. Articles
      await supabase.from('articles').upsert(DEFAULT_ARTICLES);
      // 5. Prayer Requests
      await supabase.from('prayer_requests').upsert(DEFAULT_PRAYER_REQUESTS);
      // 6. Leaders
      await supabase.from('leaders').upsert(DEFAULT_LEADERS);
      // 7. Bank Accounts
      await supabase.from('bank_accounts').upsert(DEFAULT_BANK_ACCOUNTS);
      // 8. Pastoral Contacts
      await supabase.from('pastoral_contacts').upsert([DEFAULT_PASTORAL_CONTACT]);
      // 9. Admin Credentials
      await supabase.from('admin_credentials').upsert([DEFAULT_ADMIN]);

      await loadSupabaseData();
      return { success: true, message: 'Semua data awal berhasil di-seed ke Supabase!' };
    } catch (err: any) {
      console.error('Seed error:', err);
      return {
        success: false,
        message: `Gagal sinkronisasi seed: ${err.message}. Pastikan SQL schema telah dijalankan di Supabase.`,
      };
    }
  };

  // --- ACTIONS ---

  // 1. Profile
  const updateProfile = async (newFields: Partial<ChurchProfile>): Promise<boolean> => {
    const updated = { ...profile, ...newFields };
    setProfile(updated);
    syncToLocal('gmahk_profile', updated);

    try {
      const { error } = await supabase.from('profile').upsert([updated]);
      if (error) console.warn('Supabase update profile warning:', error.message);
      return !error;
    } catch (e) {
      return true;
    }
  };

  // 2. Hero Images
  const addHeroImage = async (img: Omit<HeroImage, 'id'>): Promise<boolean> => {
    const newImage: HeroImage = {
      ...img,
      id: `hero-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    const updatedList = [newImage, ...heroImages];
    setHeroImages(updatedList);
    syncToLocal('gmahk_hero_images', updatedList);

    try {
      await supabase.from('hero_images').insert([newImage]);
    } catch (e) {
      console.warn(e);
    }
    return true;
  };

  const updateHeroImage = async (image: HeroImage): Promise<boolean> => {
    const updatedList = heroImages.map((item) => (item.id === image.id ? image : item));
    setHeroImages(updatedList);
    syncToLocal('gmahk_hero_images', updatedList);

    try {
      await supabase.from('hero_images').update(image).eq('id', image.id);
    } catch (e) {
      console.warn(e);
    }
    return true;
  };

  const deleteHeroImage = async (id: string): Promise<boolean> => {
    const updatedList = heroImages.filter((item) => item.id !== id);
    setHeroImages(updatedList);
    syncToLocal('gmahk_hero_images', updatedList);

    try {
      await supabase.from('hero_images').delete().eq('id', id);
    } catch (e) {
      console.warn(e);
    }
    return true;
  };

  const setPrimaryHeroImage = async (id: string): Promise<boolean> => {
    const updatedList = heroImages.map((item) => ({
      ...item,
      isPrimary: item.id === id,
    }));
    setHeroImages(updatedList);
    syncToLocal('gmahk_hero_images', updatedList);

    try {
      for (const item of updatedList) {
        await supabase.from('hero_images').update({ isPrimary: item.isPrimary }).eq('id', item.id);
      }
    } catch (e) {
      console.warn(e);
    }
    return true;
  };

  // 3. Schedules
  const addSchedule = async (sch: Omit<WorshipSchedule, 'id'>): Promise<boolean> => {
    const newSch: WorshipSchedule = {
      ...sch,
      id: `sch-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    const updatedList = [...schedules, newSch];
    setSchedules(updatedList);
    syncToLocal('gmahk_schedules', updatedList);

    try {
      await supabase.from('schedules').insert([newSch]);
    } catch (e) {
      console.warn(e);
    }
    return true;
  };

  const updateSchedule = async (schedule: WorshipSchedule): Promise<boolean> => {
    const updatedList = schedules.map((item) => (item.id === schedule.id ? schedule : item));
    setSchedules(updatedList);
    syncToLocal('gmahk_schedules', updatedList);

    try {
      await supabase.from('schedules').update(schedule).eq('id', schedule.id);
    } catch (e) {
      console.warn(e);
    }
    return true;
  };

  const deleteSchedule = async (id: string): Promise<boolean> => {
    const updatedList = schedules.filter((item) => item.id !== id);
    setSchedules(updatedList);
    syncToLocal('gmahk_schedules', updatedList);

    try {
      await supabase.from('schedules').delete().eq('id', id);
    } catch (e) {
      console.warn(e);
    }
    return true;
  };

  // 4. Articles
  const addArticle = async (art: Omit<Article, 'id'>): Promise<boolean> => {
    const slug = art.slug || art.judul.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newArt: Article = {
      ...art,
      id: `art-${Date.now()}`,
      slug,
      created_at: new Date().toISOString(),
    };
    const updatedList = [newArt, ...articles];
    setArticles(updatedList);
    syncToLocal('gmahk_articles', updatedList);

    try {
      await supabase.from('articles').insert([newArt]);
    } catch (e) {
      console.warn(e);
    }
    return true;
  };

  const updateArticle = async (article: Article): Promise<boolean> => {
    const updatedList = articles.map((item) => (item.id === article.id ? article : item));
    setArticles(updatedList);
    syncToLocal('gmahk_articles', updatedList);

    try {
      await supabase.from('articles').update(article).eq('id', article.id);
    } catch (e) {
      console.warn(e);
    }
    return true;
  };

  const deleteArticle = async (id: string): Promise<boolean> => {
    const updatedList = articles.filter((item) => item.id !== id);
    setArticles(updatedList);
    syncToLocal('gmahk_articles', updatedList);

    try {
      await supabase.from('articles').delete().eq('id', id);
    } catch (e) {
      console.warn(e);
    }
    return true;
  };

  // 5. Prayer Requests
  const addPrayerRequest = async (req: {
    nama: string;
    permohonan: string;
    isPublic: boolean;
  }): Promise<boolean> => {
    const newReq: PrayerRequest = {
      id: `prayer-${Date.now()}`,
      nama: req.nama,
      permohonan: req.permohonan,
      status: 'Menunggu Doa',
      prayerCount: 1,
      isPublic: req.isPublic,
      created_at: new Date().toISOString(),
    };
    const updatedList = [newReq, ...prayerRequests];
    setPrayerRequests(updatedList);
    syncToLocal('gmahk_prayer_requests', updatedList);

    try {
      await supabase.from('prayer_requests').insert([newReq]);
    } catch (e) {
      console.warn(e);
    }
    return true;
  };

  const incrementPrayerCount = async (id: string) => {
    const updatedList = prayerRequests.map((item) =>
      item.id === id ? { ...item, prayerCount: (item.prayerCount || 0) + 1 } : item
    );
    setPrayerRequests(updatedList);
    syncToLocal('gmahk_prayer_requests', updatedList);

    try {
      const target = updatedList.find((item) => item.id === id);
      if (target) {
        await supabase
          .from('prayer_requests')
          .update({ prayerCount: target.prayerCount })
          .eq('id', id);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const updatePrayerRequest = async (request: PrayerRequest): Promise<boolean> => {
    const updatedList = prayerRequests.map((item) => (item.id === request.id ? request : item));
    setPrayerRequests(updatedList);
    syncToLocal('gmahk_prayer_requests', updatedList);

    try {
      await supabase.from('prayer_requests').update(request).eq('id', request.id);
    } catch (e) {
      console.warn(e);
    }
    return true;
  };

  const deletePrayerRequest = async (id: string): Promise<boolean> => {
    const updatedList = prayerRequests.filter((item) => item.id !== id);
    setPrayerRequests(updatedList);
    syncToLocal('gmahk_prayer_requests', updatedList);

    try {
      await supabase.from('prayer_requests').delete().eq('id', id);
    } catch (e) {
      console.warn(e);
    }
    return true;
  };

  // 6. Leaders
  const addLeader = async (ldr: Omit<ChurchLeader, 'id'>): Promise<boolean> => {
    const newLdr: ChurchLeader = {
      ...ldr,
      id: `leader-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    const updatedList = [...leaders, newLdr];
    setLeaders(updatedList);
    syncToLocal('gmahk_leaders', updatedList);

    try {
      await supabase.from('leaders').insert([newLdr]);
    } catch (e) {
      console.warn(e);
    }
    return true;
  };

  const updateLeader = async (leader: ChurchLeader): Promise<boolean> => {
    const updatedList = leaders.map((item) => (item.id === leader.id ? leader : item));
    setLeaders(updatedList);
    syncToLocal('gmahk_leaders', updatedList);

    try {
      await supabase.from('leaders').update(leader).eq('id', leader.id);
    } catch (e) {
      console.warn(e);
    }
    return true;
  };

  const deleteLeader = async (id: string): Promise<boolean> => {
    const updatedList = leaders.filter((item) => item.id !== id);
    setLeaders(updatedList);
    syncToLocal('gmahk_leaders', updatedList);

    try {
      await supabase.from('leaders').delete().eq('id', id);
    } catch (e) {
      console.warn(e);
    }
    return true;
  };

  // 7. Bank Accounts
  const addBankAccount = async (bank: Omit<BankAccount, 'id'>): Promise<boolean> => {
    const newBank: BankAccount = {
      ...bank,
      id: `bank-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    const updatedList = [...bankAccounts, newBank];
    setBankAccounts(updatedList);
    syncToLocal('gmahk_bank_accounts', updatedList);

    try {
      await supabase.from('bank_accounts').insert([newBank]);
    } catch (e) {
      console.warn(e);
    }
    return true;
  };

  const updateBankAccount = async (bank: BankAccount): Promise<boolean> => {
    const updatedList = bankAccounts.map((item) => (item.id === bank.id ? bank : item));
    setBankAccounts(updatedList);
    syncToLocal('gmahk_bank_accounts', updatedList);

    try {
      await supabase.from('bank_accounts').update(bank).eq('id', bank.id);
    } catch (e) {
      console.warn(e);
    }
    return true;
  };

  const deleteBankAccount = async (id: string): Promise<boolean> => {
    const updatedList = bankAccounts.filter((item) => item.id !== id);
    setBankAccounts(updatedList);
    syncToLocal('gmahk_bank_accounts', updatedList);

    try {
      await supabase.from('bank_accounts').delete().eq('id', id);
    } catch (e) {
      console.warn(e);
    }
    return true;
  };

  // 8. Pastoral Contact
  const updatePastoralContact = async (contact: Partial<PastoralContact>): Promise<boolean> => {
    const updated = { ...pastoralContact, ...contact };
    setPastoralContact(updated);
    syncToLocal('gmahk_pastoral_contact', updated);

    try {
      const { error } = await supabase.from('pastoral_contacts').upsert([updated]);
      return !error;
    } catch (e) {
      return true;
    }
  };

  // 9. Admin Credentials
  const updateAdminCredentials = async (
    newUsername: string,
    newPassword: string
  ): Promise<boolean> => {
    const updated: AdminCredential = {
      id: adminCredential.id || 'admin-main',
      username: newUsername,
      passwordHash: newPassword,
      lastUpdated: new Date().toISOString(),
    };
    setAdminCredential(updated);
    syncToLocal('gmahk_admin_credential', updated);

    try {
      const { error } = await supabase.from('admin_credentials').upsert([updated]);
      return !error;
    } catch (e) {
      return true;
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
        refreshData: loadSupabaseData,
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
