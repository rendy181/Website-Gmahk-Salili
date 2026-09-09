import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  HeartHandshake,
  Send,
  Heart,
  CheckCircle,
  MessageSquare,
  Sparkles,
  Lock,
  Globe,
  Loader2,
} from 'lucide-react';

export const PrayerWallSection: React.FC = () => {
  const { prayerRequests, addPrayerRequest, incrementPrayerCount } = useChurch();

  const [nama, setNama] = useState('');
  const [permohonan, setPermohonan] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Filter public requests for the wall
  const publicPrayers = prayerRequests.filter((p) => p.isPublic !== false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !permohonan.trim()) return;

    setIsSubmitting(true);
    try {
      await addPrayerRequest({
        nama: nama.trim(),
        permohonan: permohonan.trim(),
        isPublic,
      });

      setNama('');
      setPermohonan('');
      setSuccessMessage(
        isPublic
          ? 'Puji Tuhan, permohonan doa Anda telah dikirim dan tampil di Dinding Doa Jemaat.'
          : 'Puji Tuhan, permohonan doa pribadi Anda telah dikirimkan secara rahasia kepada Tim Pastoral.'
      );
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="doa" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
            <span>Pelayanan Syafaat Jemaat</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Permohonan Doa & Dinding Doa
          </h2>
          <p className="mt-3 text-slate-300 text-base">
            &ldquo;Doa orang yang benar, bila dengan yakin didoakan, sangat besar kuasanya.&rdquo; — Yakobus 5:16b
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form Kirim Doa (Left Column) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Kirim Pokok Doa</h3>
                <p className="text-xs text-slate-400">Tim pendoa syafaat Salili akan mendoakannya</p>
              </div>
            </div>

            {successMessage && (
              <div className="mb-5 p-4 rounded-xl bg-emerald-900/50 border border-emerald-500/50 text-emerald-200 text-xs flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Nama Anda / Keluarga *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Keluarga Derek / Sdr. Daniel"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Isi Permohonan Doa *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tuliskan pergumulan, permohonan kesembuhan, ucapan syukur, atau kebutuhan doa Anda..."
                  value={permohonan}
                  onChange={(e) => setPermohonan(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              {/* Privacy Setting */}
              <div className="pt-1">
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Visibilitas Doa
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPublic(true)}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      isPublic
                        ? 'bg-blue-600/30 text-blue-200 border-blue-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Dinding Publik</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPublic(false)}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      !isPublic
                        ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Hanya Pastoral</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-3 py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Mengirimkan...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Kirim Permohonan Doa</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Dinding Doa / Prayer Wall (Right Column) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl font-bold text-white">Dinding Doa Bersama</h3>
              </div>
              <span className="text-xs text-slate-400">
                {publicPrayers.length} Permohonan Doa Aktif
              </span>
            </div>

            {publicPrayers.length === 0 ? (
              <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-400 text-sm">
                Belum ada permohonan doa publik. Jadilah yang pertama mengirimkan pokok doa!
              </div>
            ) : (
              <div className="space-y-4 max-h-[640px] overflow-y-auto pr-1">
                {publicPrayers.map((prayer) => (
                  <div
                    key={prayer.id}
                    className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-md flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="font-bold text-white text-base">{prayer.nama}</h4>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            prayer.status === 'Terjawab'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : prayer.status === 'Sedang Didoakan'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          }`}
                        >
                          {prayer.status === 'Terjawab'
                            ? 'Puji Tuhan Terjawab'
                            : prayer.status}
                        </span>
                      </div>

                      <p className="text-slate-300 text-sm leading-relaxed mb-4 whitespace-pre-line">
                        {prayer.permohonan}
                      </p>

                      {/* Pastoral Notes if any */}
                      {prayer.pastoralNotes && (
                        <div className="mb-4 p-3 rounded-xl bg-blue-950/60 border border-blue-500/30 text-xs text-blue-200 flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-amber-300 block mb-0.5">
                              Catatan Pastoral:
                            </strong>
                            <span>{prayer.pastoralNotes}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <span>
                        {prayer.created_at
                          ? new Date(prayer.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })
                          : 'Baru saja'}
                      </span>

                      {/* Interactive Pray For This Button */}
                      <button
                        onClick={() => incrementPrayerCount(prayer.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 transition-all group"
                      >
                        <Heart className="w-3.5 h-3.5 fill-rose-500/40 group-hover:fill-rose-500 transition-colors" />
                        <span className="font-semibold text-xs">
                          {prayer.prayerCount || 0} Turut Mendoakan
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
