import React, { useState } from 'react';
import { ChurchProvider, useChurch } from './context/ChurchContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProfileSection } from './components/ProfileSection';
import { ScheduleSection } from './components/ScheduleSection';
import { LeadersSection } from './components/LeadersSection';
import { PastoralSection } from './components/PastoralSection';
import { BankSection } from './components/BankSection';
import { PrayerWallSection } from './components/PrayerWallSection';
import { ArticlesSection } from './components/ArticlesSection';
import { SocialSection } from './components/SocialSection';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';
import { Sparkles, ArrowUp } from 'lucide-react';

const ChurchMainContent: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  React.useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* Top Sabbath Greeting Ribbon */}
      <aside
        id="top-sabbath-ribbon"
        aria-label="Sabbath Greeting"
        className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 border-b border-blue-700/40 text-center py-1.5 px-4 text-xs font-semibold text-blue-100 flex items-center justify-center gap-2"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>
          Selamat Hari Sabat! &ldquo;Ingatlah dan kuduskanlah hari Sabat&rdquo; (Keluaran 20:8)
        </span>
      </aside>

      {/* Primary Fixed Navbar */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Content Sections */}
      <main>
        <HeroSection />
        <ProfileSection />
        <ScheduleSection />
        <PastoralSection />
        <LeadersSection />
        <BankSection />
        <PrayerWallSection />
        <ArticlesSection />
        <SocialSection />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-30 p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-900/50 border border-blue-400/40 transition-all duration-300"
          aria-label="Kembali ke atas"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* 12-Menu Admin Dashboard Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        isLoggedIn={isAdminLoggedIn}
        setIsLoggedIn={setIsAdminLoggedIn}
      />
    </div>
  );
};

export default function App() {
  return (
    <ChurchProvider>
      <ChurchMainContent />
    </ChurchProvider>
  );
}
