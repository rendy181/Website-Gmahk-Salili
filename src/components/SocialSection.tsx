import React from 'react';
import { useChurch } from '../context/ChurchContext';
import { ExternalLink, Sparkles, Share2 } from 'lucide-react';

export const SocialSection: React.FC = () => {
  const { profile } = useChurch();

  const socialChannels = [
    {
      name: 'Facebook',
      handle: '@perkumpulan.salili',
      description: 'Siaran Langsung Ibadah Sabat, warta jemaat, dan album foto kegiatan persekutuan.',
      url: profile.facebook_url || 'https://facebook.com/perkumpulan.salili',
      color: 'from-blue-600 to-blue-800',
      iconBg: 'bg-blue-600',
    },
    {
      name: 'Instagram',
      handle: '@gmahksalili',
      description: 'Kutipan ayat Alkitab harian, dokumentasi Pemuda Advent, dan kegiatan sosial.',
      url: profile.instagram_url || 'https://instagram.com/gmahksalili',
      color: 'from-pink-600 via-purple-600 to-amber-500',
      iconBg: 'bg-pink-600',
    },
    {
      name: 'TikTok',
      handle: '@gmahksalili',
      description: 'Vokal grup, paduan suara jemaat, rekaman khotbah singkat, dan sukacita Sabat.',
      url: profile.tiktok_url || 'https://tiktok.com/@gmahksalili',
      color: 'from-slate-900 via-slate-800 to-cyan-900',
      iconBg: 'bg-slate-900',
    },
  ];

  return (
    <section className="py-16 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Share2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Terhubung Bersama Kami</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Media Sosial GMAHK Salili
          </h2>
          <p className="mt-2 text-slate-300 text-sm">
            Ikuti kabar pelayanan, siaran rohani, dan sukacita jemaat kami melalui platform media sosial resmi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socialChannels.map((channel) => (
            <a
              key={channel.name}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between shadow-lg relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${channel.color} flex items-center justify-center font-bold text-white shadow-md`}
                    >
                      {channel.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white group-hover:text-amber-300 transition-colors">
                        {channel.name}
                      </h3>
                      <span className="text-xs text-slate-400">{channel.handle}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {channel.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-blue-400 group-hover:text-amber-300 font-semibold">
                <span>Kunjungi Akun</span>
                <span>→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
