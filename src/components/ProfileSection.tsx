import React from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  Compass,
  Target,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  BookOpen,
} from 'lucide-react';

export const ProfileSection: React.FC = () => {
  const { profile } = useChurch();

  return (
    <section id="profil" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Mengenal Jemaat Kami</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Profil GMAHK Jemaat Salili
          </h2>
          <p className="mt-3 text-slate-300 text-base leading-relaxed">
            {profile.shortDescription}
          </p>
        </div>

        {/* Motto Callout Banner */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-900/60 via-blue-800/40 to-slate-900 border border-blue-500/30 text-center relative shadow-xl">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-widest">
            Motto Pelayanan
          </div>
          <div className="text-xl sm:text-2xl font-bold text-amber-300 italic max-w-2xl mx-auto mt-2">
            &ldquo;{profile.motto || 'Setia dalam Pengharapan, Tangguh dalam Pelayanan'}&rdquo;
          </div>
          <div className="text-xs text-blue-200 mt-2">
            Gereja Masehi Advent Hari Ketujuh • Siau Tengah, Sitaro
          </div>
        </div>

        {/* 3 Main Profile Cards: Sejarah, Visi, Misi */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sejarah Singkat */}
          <div className="p-7 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-blue-500/40 transition-all flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mb-5">
                <Compass className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                Sejarah Singkat
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {profile.history}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-700/60 text-xs text-blue-300 font-medium flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Warisan Iman & Pekabaran Tiga Malaikat</span>
            </div>
          </div>

          {/* Visi Gereja */}
          <div className="p-7 rounded-2xl bg-gradient-to-b from-blue-950/70 to-slate-800/90 border border-blue-500/40 hover:border-blue-400 transition-all flex flex-col justify-between shadow-xl ring-1 ring-blue-500/20">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center mb-5">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Visi Kami</h3>
              <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line">
                {profile.vision}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-blue-500/20 text-xs text-amber-300 font-medium">
              Fokus Pelayanan Kerajaan Allah
            </div>
          </div>

          {/* Misi Gereja */}
          <div className="p-7 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-blue-500/40 transition-all flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mb-5">
                <Sparkles className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Misi Pelayanan</h3>
              <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line space-y-2">
                {profile.mission}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-700/60 text-xs text-blue-300 font-medium">
              Amanat Agung & Kasih Kristus
            </div>
          </div>
        </div>

        {/* Location & Quick Contact Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-800/50 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-600/20 text-amber-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase font-semibold text-slate-400">
                Lokasi Peribadatan
              </div>
              <div className="text-sm font-semibold text-white">
                {profile.village}, {profile.district}, {profile.regency}, {profile.province}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
            {profile.phone && (
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>{profile.phone}</span>
              </a>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>{profile.email}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
