import React from 'react';
import { useChurch } from '../context/ChurchContext';
import { Users, Shield, Award } from 'lucide-react';

export const LeadersSection: React.FC = () => {
  const { leaders } = useChurch();

  return (
    <section id="pengurus" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/15 border border-blue-400/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Pelayan Jemaat</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Pengurus GMAHK Jemaat Salili
          </h2>
          <p className="mt-3 text-slate-300 text-base">
            Para pemimpin dan pelayan yang melayani dengan ketulusan hati, membimbing jemaat dalam pertumbuhan iman dan kasih Kristus.
          </p>
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((leader) => (
            <div
              key={leader.id}
              className="group rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 overflow-hidden shadow-lg flex flex-col justify-between"
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-800">
                <img
                  src={
                    leader.foto_url ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
                  }
                  alt={leader.nama}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                {/* Badge Jabatan on Image */}
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold bg-blue-600/90 text-white backdrop-blur-md border border-blue-400/40 shadow-sm">
                    {leader.jabatan}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {leader.nama}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-blue-400" />
                    <span>GMAHK Jemaat Salili • Siau Tengah</span>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Pelayanan 2025/2026</span>
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
