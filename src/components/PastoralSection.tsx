import React from 'react';
import { useChurch } from '../context/ChurchContext';
import { PhoneCall, MessageCircle, Heart, ShieldCheck } from 'lucide-react';

export const PastoralSection: React.FC = () => {
  const { pastoralContact } = useChurch();

  const rawPhone = pastoralContact.whatsappNumber.replace(/[^0-9]/g, '');
  const cleanPhone = rawPhone.startsWith('0') ? '62' + rawPhone.slice(1) : rawPhone;
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'Salam Pdt. Christov Tumonggor, saya menghubungi Anda melalui Website Resmi GMAHK Jemaat Salili.'
  )}`;

  return (
    <section id="kontak" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-950/90 via-slate-900 to-blue-900/60 border border-blue-500/40 rounded-3xl p-8 sm:p-12 shadow-2xl relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Pastor Photo */}
            <div className="md:col-span-5 flex flex-col items-center text-center">
              <div className="relative group">
                <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden ring-4 ring-amber-400/80 shadow-2xl bg-slate-800">
                  <img
                    src={
                      pastoralContact.foto_url ||
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
                    }
                    alt={pastoralContact.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-xs shadow-md uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Pelayanan Pastoral</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-white">{pastoralContact.name}</h3>
                <p className="text-sm text-amber-300 font-medium">{pastoralContact.jabatan || 'Pendeta Jemaat GMAHK Salili'}</p>
                <p className="text-xs text-slate-400 mt-0.5">Siau Tengah, Sitaro, Sulut</p>
              </div>
            </div>

            {/* Welcome & Contact Action */}
            <div className="md:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 text-emerald-400" />
                <span>Konseling & Bimbingan Rohani</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Layanan Pastoral & Doa
              </h2>

              <blockquote className="text-slate-300 text-sm sm:text-base leading-relaxed italic border-l-2 border-amber-400 pl-4 bg-white/5 py-3 rounded-r-xl">
                &ldquo;{pastoralContact.welcomeMessage}&rdquo;
              </blockquote>

              <p className="text-xs text-blue-200">
                Apakah Saudara memerlukan bimbingan firman Allah, konseling keluarga, pelayanan perjamuan kudus, atau doa khusus? Pendeta jemaat siap melayani Saudara.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all border border-emerald-400/40"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Chat WhatsApp Pastoral</span>
                </a>

                <a
                  href={`tel:${cleanPhone}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-blue-400" />
                  <span>+{cleanPhone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
