import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  CreditCard,
  Copy,
  Check,
  Building,
  HeartHandshake,
  ShieldCheck,
  PhoneCall,
} from 'lucide-react';

export const BankSection: React.FC = () => {
  const { bankAccounts, pastoralContact } = useChurch();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  return (
    <section id="rekening" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
            <span>Pelayanan Persepuluhan & Persembahan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Rekening Resmi Jemaat Salili
          </h2>
          <p className="mt-3 text-slate-300 text-base leading-relaxed">
            Mendukung kemajuan pekabaran Injil, operasional rumah ibadah, dan dana pembangunan jemaat melalui persembahan yang setia.
          </p>
        </div>

        {/* Bank Account Cards Grid */}
        <div className="max-w-4xl mx-auto space-y-6">
          {bankAccounts.map((account) => (
            <div
              key={account.id}
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-950 via-slate-800 to-slate-900 border-2 border-blue-500/30 hover:border-amber-400/50 shadow-2xl transition-all"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
                      <Building className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                        Rekening Bank Resmi
                      </span>
                      <h3 className="text-2xl font-black text-white">{account.nama_bank}</h3>
                    </div>
                  </div>

                  {/* Account Number Box */}
                  <div className="bg-slate-950/80 border border-slate-700/80 rounded-2xl px-5 py-3.5 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] uppercase text-slate-400 font-semibold tracking-wider">
                        Nomor Rekening
                      </div>
                      <div className="text-xl sm:text-2xl font-mono font-bold text-amber-300 tracking-wider">
                        {account.nomor_rekening}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(account.id, account.nomor_rekening)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                        copiedId === account.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                      }`}
                    >
                      {copiedId === account.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Salin Nomor</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Account Owner */}
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-slate-400">Atas Nama:</span>
                    <strong className="text-white font-bold text-base">{account.atas_nama}</strong>
                  </div>

                  {/* Purpose */}
                  {account.keterangan && (
                    <div className="text-xs text-blue-200/90 bg-blue-900/30 p-3 rounded-xl border border-blue-600/30">
                      📌 <strong>Tujuan:</strong> {account.keterangan}
                    </div>
                  )}
                </div>

                {/* Right Visual Badge */}
                <div className="w-full md:w-64 flex flex-col gap-3 p-5 rounded-2xl bg-slate-900/90 border border-slate-700 text-center">
                  <div className="flex justify-center">
                    <ShieldCheck className="w-10 h-10 text-emerald-400" />
                  </div>
                  <div className="text-xs font-semibold text-slate-200">
                    Akun Resmi Terverifikasi
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Setiap dana yang masuk dicatat secara transparan oleh Bendahara Jemaat Salili.
                  </p>
                  {pastoralContact?.whatsappNumber && (
                    <a
                      href={`https://wa.me/${pastoralContact.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        'Halo Bendahara/Pastoral GMAHK Salili, saya ingin mengonfirmasi bukti transfer persembahan/persepuluhan.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-semibold border border-emerald-500/30 transition-all"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Konfirmasi Transfer</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Biblical Reminder on Giving */}
        <div className="mt-12 text-center max-w-2xl mx-auto p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 italic">
          &ldquo;Bawalah seluruh persembahan persepuluhan itu ke dalam rumah perbendaharaan, supaya ada makanan di rumah-Ku dan ujilah Aku, firman TUHAN semesta alam...&rdquo; — Maleakhi 3:10
        </div>
      </div>
    </section>
  );
};
