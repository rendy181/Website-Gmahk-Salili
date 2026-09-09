import React from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  Calendar,
  Clock,
  Sun,
  Users,
  BookOpen,
  Sparkles,
} from 'lucide-react';

export const ScheduleSection: React.FC = () => {
  const { schedules } = useChurch();

  // Separate Sabat (Saturday) vs other gatherings
  const sabatSchedules = schedules.filter((s) =>
    s.hari.toLowerCase().includes('sabat') || s.hari.toLowerCase().includes('sabtu')
  );
  const otherSchedules = schedules.filter(
    (s) => !s.hari.toLowerCase().includes('sabat') && !s.hari.toLowerCase().includes('sabtu')
  );

  return (
    <section id="jadwal" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Waktu Indonesia Tengah (WITA)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Jadwal Ibadah & Persekutuan
          </h2>
          <p className="mt-3 text-slate-300 text-base">
            Kami mengundang seluruh anggota jemaat, sahabat, dan para tamu untuk beribadah dan bertumbuh bersama dalam hadirat Tuhan.
          </p>
        </div>

        {/* Highlight Banner: Hari Sabat Kudus */}
        <div className="mb-10 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 border border-blue-400/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Sun className="w-48 h-48 text-amber-300" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider">
                Hari Sabat Yang Kudus (Sabtu)
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Kebaktian Hari Sabat di GMAHK Salili
              </h3>
              <p className="text-blue-200 text-sm max-w-2xl">
                Dari matahari terbenam hari Jumat hingga matahari terbenam hari Sabtu. Bergabunglah bersama kami untuk memuji Tuhan, belajar firman-Nya, dan bersekutu.
              </p>
            </div>
            <div className="flex-shrink-0 bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20 text-center">
              <div className="text-xs uppercase text-amber-300 font-bold tracking-wider">
                Waktu Mulai Sabat Pagi
              </div>
              <div className="text-2xl font-black text-white">09:00 WITA</div>
            </div>
          </div>
        </div>

        {/* Grid for Sabbath Schedules */}
        <div className="mb-14">
          <h3 className="text-lg font-bold text-amber-300 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Rangkaian Kebaktian Sabat</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sabatSchedules.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-slate-900/90 border border-blue-500/30 hover:border-blue-400 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-600/30 text-blue-300 border border-blue-500/30">
                      {item.hari}
                    </span>
                    <div className="flex items-center gap-1.5 text-amber-300 font-semibold text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.waktu}</span>
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2">{item.kegiatan}</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {item.keterangan || 'Kebaktian resmi GMAHK Jemaat Salili.'}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Gedung Gereja GMAHK Salili</span>
                  <span className="text-amber-400 font-medium">Terbuka Untuk Umum</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid for Midweek / Youth / Other Schedules */}
        {otherSchedules.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-blue-300 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span>Ibadah Tengah Pekan & Persekutuan Pemuda</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherSchedules.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-800 text-slate-200 border border-slate-700">
                        {item.hari}
                      </span>
                      <div className="flex items-center gap-1.5 text-blue-300 font-semibold text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{item.waktu}</span>
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-white mb-2">{item.kegiatan}</h4>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {item.keterangan || 'Pertemuan rohani jemaat.'}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                    Siau Tengah, Kab. Sitaro
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Visitor Friendly Note */}
        <div className="mt-12 p-4 rounded-xl bg-blue-950/40 border border-blue-800/40 text-center text-xs text-blue-200">
          💡 Bagi saudara atau sahabat yang baru pertama kali berkunjung ke Pulau Siau dan ingin beribadah bersama kami di Jemaat Salili, pintu gereja kami selalu terbuka hangat menyambut Saudara.
        </div>
      </div>
    </section>
  );
};
