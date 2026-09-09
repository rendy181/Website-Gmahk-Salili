import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { Article } from '../types';
import {
  BookOpen,
  Calendar,
  User,
  ArrowRight,
  X,
  Share2,
  Check,
} from 'lucide-react';

export const ArticlesSection: React.FC = () => {
  const { articles, isLoading } = useChurch();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // ===== TAMPILKAN LOADING SAAT DATA BELUM SIAP =====
  if (isLoading) {
    return (
      <section id="artikel" className="py-20 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-[300px] flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 text-lg font-medium">Memuat artikel...</p>
          </div>
        </div>
      </section>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <section id="artikel" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Kabar & Renungan Rohani</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Artikel & Warta Jemaat Salili
          </h2>
          <p className="mt-3 text-slate-300 text-base">
            Bertumbuh dalam pengetahuan firman Tuhan, nubuatan Alkitab, dan warta kegiatan pelayanan di Siau Tengah.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-400">
              <p className="text-lg">Belum ada artikel. Silakan tambahkan dari Dashboard Admin.</p>
            </div>
          ) : (
            articles.map((article) => (
              <div
                key={article.id}
                className="group rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/40 transition-all duration-300 overflow-hidden shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                    <img
                      src={article.gambar_url || 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80'}
                      alt={article.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-600/90 text-white backdrop-blur-md border border-blue-400/30">
                        {article.kategori || 'Renungan'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>
                          {article.created_at
                            ? new Date(article.created_at).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })
                            : 'Baru saja'}
                        </span>
                      </div>
                      {article.penulis && (
                        <div className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-blue-400" />
                          <span>{article.penulis}</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                      {article.judul}
                    </h3>

                    <p className="mt-2.5 text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {article.konten}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-blue-600 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 border border-slate-700 hover:border-blue-500 shadow-sm"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl my-8">
            {/* Header Image */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <img
                src={selectedArticle.gambar_url || 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80'}
                alt={selectedArticle.judul}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white transition-colors border border-white/20"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-600 text-white mb-2 inline-block">
                  {selectedArticle.kategori || 'Artikel Rohani'}
                </span>
                <h2 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
                  {selectedArticle.judul}
                </h2>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    {selectedArticle.created_at
                      ? new Date(selectedArticle.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                      : 'Baru saja'}
                  </span>
                  {selectedArticle.penulis && (
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-blue-400" />
                      {selectedArticle.penulis}
                    </span>
                  )}
                </div>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Tautan Disalin</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Bagikan</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-slate-200 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4">
                {selectedArticle.konten}
              </div>

              <div className="pt-6 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
                >
                  Tutup Artikel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};