import React from 'react';
import { useChurch } from '../context/ChurchContext';
import { AdventistLogo } from './AdventistLogo';
import { MapPin, Phone, Mail, Lock, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { profile } = useChurch();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Summary */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              <AdventistLogo size={42} customLogoUrl={profile.logo_url} />
              <div>
                <span className="block font-bold text-white text-base">GMAHK Salili</span>
                <span className="block text-xs text-amber-300">Siau Tengah, Sitaro</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gereja Masehi Advent Hari Ketujuh Jemaat Salili berdedikasi melayani Tuhan dan memberitakan Injil Kekal ke seluruh penjuru Pulau Siau.
            </p>
            <div className="pt-2">
              <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Motto Jemaat
              </div>
              <p className="text-xs italic text-amber-300/90 font-medium">
                &ldquo;{profile.motto || 'Setia dalam Pengharapan, Tangguh dalam Pelayanan'}&rdquo;
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#beranda" className="hover:text-amber-300 transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#profil" className="hover:text-amber-300 transition-colors">
                  Profil & Sejarah
                </a>
              </li>
              <li>
                <a href="#jadwal" className="hover:text-amber-300 transition-colors">
                  Jadwal Ibadah Sabat
                </a>
              </li>
              <li>
                <a href="#pengurus" className="hover:text-amber-300 transition-colors">
                  Pengurus Jemaat
                </a>
              </li>
              <li>
                <a href="#doa" className="hover:text-amber-300 transition-colors">
                  Dinding Doa
                </a>
              </li>
              <li>
                <a href="#artikel" className="hover:text-amber-300 transition-colors">
                  Artikel & Renungan
                </a>
              </li>
              <li>
                <a href="#rekening" className="hover:text-amber-300 transition-colors">
                  Rekening Persembahan
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
              Alamat & Kontak
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>
                  {profile.village}, {profile.district}, {profile.regency}, {profile.province}
                </span>
              </div>
              {profile.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <a href={`tel:${profile.phone}`} className="hover:text-white transition-colors">
                    {profile.phone}
                  </a>
                </div>
              )}
              {profile.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors">
                    {profile.email}
                  </a>
                </div>
              )}
              <div className="pt-2">
                <span className="inline-block px-2.5 py-1 rounded bg-blue-900/40 text-blue-200 border border-blue-700/40 text-[11px] font-semibold">
                  Zona Waktu: WITA (UTC+8)
                </span>
              </div>
            </div>
          </div>

          {/* Adventist Worldwide & Admin */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
              Jaringan Gereja Advent
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              GMAHK Salili adalah bagian dari Konferens / Daerah Misi Gereja Masehi Advent Hari Ketujuh sedunia.
            </p>
            <div className="space-y-2">
              <a
                href="https://www.adventist.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-300 hover:text-amber-300 transition-colors"
              >
                <span>Seventh-day Adventist World Church</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={onOpenAdmin}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-700 transition-all text-xs font-semibold"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Portal Login Admin Gereja</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Gereja Masehi Advent Hari Ketujuh (GMAHK) Jemaat Salili, Siau Tengah, Kepulauan Sitaro. Seluruh hak cipta dilindungi.
          </div>
          <div className="flex items-center gap-1">
            <span>Dirancang untuk kemuliaan nama Tuhan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
