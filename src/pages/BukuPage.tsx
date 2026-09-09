import React, { useState, useEffect } from 'react';
import { useChurch } from '../context/ChurchContext';
import { BookOpen, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

export const BukuPage: React.FC = () => {
  const { books, bookChapters, getChaptersByBook, isLoading } = useChurch();
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<any | null>(null);
  const [chapters, setChapters] = useState<any[]>([]);

  useEffect(() => {
    if (selectedBook) {
      setChapters(getChaptersByBook(selectedBook.id));
    }
  }, [selectedBook, getChaptersByBook]);

  // ===== LOADING =====
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">Memuat buku...</p>
        </div>
      </div>
    );
  }

  // ===== HALAMAN ISI BUKU (BACA) =====
  if (selectedChapter && selectedBook) {
    return (
      <div className="min-h-screen bg-slate-50 py-20 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <button
              onClick={() => setSelectedChapter(null)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali ke Daftar Isi</span>
            </button>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{selectedChapter.judul_chapter}</h1>
          <p className="text-sm text-slate-500 mb-4">Dari buku: {selectedBook.judul}</p>

          <div className="text-slate-700 leading-relaxed space-y-3">
            {selectedChapter.isi.split('\n').map((p: string, i: number) => (
              <p key={i} className="mb-3">{p}</p>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t text-center text-xs text-slate-400">
            © {new Date().getFullYear()} GMAHK Salili • {selectedBook.judul}
          </div>
        </div>
      </div>
    );
  }

  // ===== HALAMAN DAFTAR ISI =====
  if (selectedBook) {
    return (
      <div className="min-h-screen bg-slate-50 py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setSelectedBook(null)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Buku</span>
          </button>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-white">
              <h1 className="text-2xl font-bold text-slate-900">{selectedBook.judul}</h1>
              <p className="text-sm text-slate-500">Oleh: {selectedBook.penulis}</p>
            </div>

            <div className="p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-4">📖 Daftar Isi</h2>
              {chapters.length === 0 ? (
                <p className="text-slate-400 text-center py-8">Belum ada chapter untuk buku ini.</p>
              ) : (
                <ul className="space-y-2">
                  {chapters.map((ch) => (
                    <li key={ch.id}>
                      <button
                        onClick={() => setSelectedChapter(ch)}
                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-between group border border-slate-100"
                      >
                        <span className="text-slate-700 group-hover:text-blue-700 font-medium">
                          {ch.judul_chapter}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== HALAMAN DAFTAR BUKU (COVER) =====
  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Perpustakaan Rohani GMAHK Salili</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Koleksi Buku & Literatur</h1>
          <p className="mt-2 text-slate-500 text-sm">Klik cover buku untuk melihat daftar isi dan membaca</p>
        </div>

        {books.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-slate-200">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-lg">Belum ada buku.</p>
            <p className="text-slate-400 text-sm">Silakan tambahkan buku dari Dashboard Admin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((buku) => (
              <div
                key={buku.id}
                onClick={() => setSelectedBook(buku)}
                className="group cursor-pointer transition-all duration-300 hover:-translate-y-2"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <div className="aspect-[3/4] overflow-hidden bg-slate-100">
                    <img
                      src={buku.cover_url || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80'}
                      alt={buku.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-2">{buku.judul}</h3>
                    <p className="text-xs text-slate-500 mt-1">{buku.penulis}</p>
                    {buku.kategori && (
                      <span className="inline-block mt-2 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {buku.kategori}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};