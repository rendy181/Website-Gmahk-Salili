import React, { useState, useEffect } from 'react';
import { useChurch } from '../context/ChurchContext';
import { AdventistLogo } from './AdventistLogo';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  HeartHandshake,
  Clock,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { heroImages, profile } = useChurch();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto advance slides every 6 seconds if multiple slides
  useEffect(() => {
    if (heroImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const activeImage = heroImages[currentIndex] || heroImages[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <section id="beranda" className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Slides */}
      {heroImages.map((hero, idx) => (
        <div
          key={hero.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 pointer-events-none scale-105'
          }`}
          style={{ transition: 'opacity 1s ease-in-out, transform 7s ease-out' }}
        >
          <img
            src={hero.imageUrl}
            alt={hero.title}
            className="w-full h-full object-cover object-center brightness-[0.42]"
            referrerPolicy="no-referrer"
          />
        </div>
      ))}

      {/* Adventist Gradient Overlays: Blue (#4A90D9, #2563EB, #1D4ED8) into Dark Navy (#0B1329) */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-blue-950/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/15 via-transparent to-transparent pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center text-white z-10 flex flex-col items-center">
        {/* Emblem & Location Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider backdrop-blur-md mb-6 shadow-sm">
          {/* Ikon bintang dihapus */}
          <span>{activeImage?.badgeText || 'Gereja Masehi Advent Hari Ketujuh'}</span>
          <span className="w-1 h-1 rounded-full bg-blue-300" />
          <span className="text-amber-300 font-bold">Perkumpulan Salili</span>
        </div>

        {/* Large Adventist Symbolic Logo */}
        <div className="mb-4">
          <AdventistLogo size={70} customLogoUrl={profile.logo_url} />
        </div>

        {/* Main Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl text-white drop-shadow-md">
          {activeImage?.title || 'Selamat Datang di GMAHK Jemaat Salili'}
        </h1>

        {/* Subtitle / Description */}
        <p className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-200 max-w-3xl leading-relaxed font-normal drop-shadow-sm">
          {activeImage?.subtitle || profile.tagline}
        </p>

        {/* Location Marker */}
        <div className="mt-3 flex items-center justify-center gap-1.5 text-xs sm:text-sm text-blue-200/90 font-medium">
          <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>
            {profile.village}, {profile.district}, {profile.regency}, {profile.province}
          </span>
        </div>

        {/* Quick Sabat Worship Announcement Card */}
        <div className="mt-8 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-blue-900/80 via-blue-800/80 to-indigo-900/80 border border-blue-400/30 backdrop-blur-md shadow-2xl max-w-xl w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-amber-300 font-bold">
                Jadwal Ibadah Sabat
              </div>
              <div className="text-sm font-semibold text-white">
                Sekolah Sabat 09:00 WITA • Khotbah 10:30 WITA
              </div>
            </div>
          </div>
          <a
            href="#jadwal"
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors flex items-center gap-1.5 border border-white/20 whitespace-nowrap"
          >
            <span>Lihat Semua</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="#jadwal"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 border border-blue-400/30"
          >
            <Calendar className="w-4 h-4" />
            <span>Jadwal Ibadah Lengkap</span>
          </a>
          <a
            href="#doa"
            className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/25 transition-all flex items-center gap-2"
          >
            <HeartHandshake className="w-4 h-4 text-amber-400" />
            <span>Kirim Permohonan Doa</span>
          </a>
        </div>

        {/* Carousel Slide Indicators & Controls */}
        {heroImages.length > 1 && (
          <div className="mt-12 flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              aria-label="Slide Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentIndex ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              aria-label="Slide Selanjutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-slate-900 to-transparent" />
    </section>
  );
};
