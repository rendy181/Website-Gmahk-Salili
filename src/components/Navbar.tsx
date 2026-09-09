import React, { useState, useEffect } from 'react';
import { useChurch } from '../context/ChurchContext';
import { AdventistLogo } from './AdventistLogo';
import {
  Menu,
  X,
  Lock,
  PhoneCall,
  Calendar,
  HeartHandshake,
  BookOpen,
  Users,
  CreditCard,
  Info,
} from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, isAdminLoggedIn }) => {
  const { profile, pastoralContact, isLoading } = useChurch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ===== TAMPILKAN PLACEHOLDER SAAT LOADING =====
  if (isLoading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-blue-800/40 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-700 animate-pulse" />
            <div>
              <div className="w-32 h-4 bg-slate-700 rounded animate-pulse" />
              <div className="w-24 h-3 bg-slate-700 rounded animate-pulse mt-1" />
            </div>
          </div>
          <div className="w-20 h-8 bg-slate-700 rounded-lg animate-pulse" />
        </div>
      </header>
    );
  }

  const navLinks = [
    { label: 'Beranda', href: '#beranda', icon: null },
    { label: 'Profil', href: '#profil', icon: Info },
    { label: 'Jadwal', href: '#jadwal', icon: Calendar },
    { label: 'Pengurus', href: '#pengurus', icon: Users },
    { label: 'Artikel', href: '#artikel', icon: BookOpen },
    { label: 'Dinding Doa', href: '#doa', icon: HeartHandshake },
    { label: 'Rekening', href: '#rekening', icon: CreditCard },
    { label: 'Kontak', href: '#kontak', icon: PhoneCall },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-blue-800/40 py-2.5'
          : 'bg-gradient-to-b from-slate-950/80 via-slate-900/50 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo & Brand */}
        <a
          href="#beranda"
          onClick={(e) => handleScrollTo(e, '#beranda')}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <AdventistLogo key={profile.logo_url || 'default'} size={42} customLogoUrl={profile.logo_url} />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-extrabold tracking-wide text-base sm:text-lg group-hover:text-amber-300 transition-colors">
                GMAHK Salili
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                Siau Tengah
              </span>
            </div>
            <p className="text-xs text-blue-200/80 hidden sm:block">
              Sitaro • Sulawesi Utara
            </p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-amber-300 hover:bg-white/5 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          {pastoralContact?.whatsappNumber && (
            <a
              href={`https://wa.me/${pastoralContact.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                'Salam Pdt. Christov Tumonggor, saya ingin berkonsultasi / memohon dukungan doa jemaat Salili.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>WA Pastoral</span>
            </a>
          )}

          <button
            id="btn-admin-login"
            onClick={onOpenAdmin}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-all ${
              isAdminLoggedIn
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold hover:bg-amber-400 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{isAdminLoggedIn ? 'Dashboard Admin' : 'Admin'}</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenAdmin}
            className="p-2 rounded-lg bg-white/10 text-white text-xs flex items-center gap-1"
            title="Admin Login"
          >
            <Lock className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-blue-800/60 px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 py-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-blue-900/50 hover:text-amber-300"
              >
                {link.icon && <link.icon className="w-4 h-4 text-blue-400" />}
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            {pastoralContact?.whatsappNumber && (
              <a
                href={`https://wa.me/${pastoralContact.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  'Salam Pdt. Christov Tumonggor, saya ingin berkonsultasi seputar GMAHK Jemaat Salili.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-emerald-600 text-white shadow"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Hubungi WA Pastoral</span>
              </a>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-amber-500 text-slate-950 shadow"
            >
              <Lock className="w-4 h-4" />
              <span>{isAdminLoggedIn ? 'Buka Dashboard Admin' : 'Login Admin Gereja'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};