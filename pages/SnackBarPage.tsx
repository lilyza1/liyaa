
import React, { useState, useMemo } from 'react';
import { Coffee, ShoppingBag, ArrowLeft, Star, Heart, TrendingUp, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SNACKS } from '../constants';

const SnackBarPage: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'COMBO'>('ALL');

  const filteredSnacks = useMemo(() => {
    if (filter === 'ALL') return SNACKS;
    return SNACKS.filter(item => item.name.toLowerCase().includes('combo'));
  }, [filter]);

  return (
    <div className="pb-32">
      {/* Hero Header */}
      <div className="relative h-[40vh] overflow-hidden flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1572177191856-3cde618dee1f?q=80&w=2070&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover blur-sm brightness-[0.2]" 
          alt="Snack Background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent"></div>
        <div className="relative z-10 text-center space-y-4 px-6">
          <div className="inline-flex items-center gap-3 bg-emerald-500/20 text-emerald-400 px-6 py-2 rounded-full border border-emerald-500/20 text-[10px] font-black tracking-[0.4em] uppercase">
            <Coffee size={14} /> Official Snack Bar
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            Cxi•<span className="text-emerald-500">Menu</span>
          </h1>
          <p className="text-emerald-100/40 text-lg font-bold max-w-lg mx-auto">
            Katalog lengkap makanan dan minuman segar untuk menemani setiap detak jantung film favoritmu.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="bg-[#062c2d]/30 border border-emerald-900/30 p-12 rounded-[4rem] backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <Link to="/" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-black text-xs uppercase tracking-widest transition-colors">
              <ArrowLeft size={16} /> Kembali Beranda
            </Link>
            <div className="flex gap-4">
              <button 
                onClick={() => setFilter('ALL')}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === 'ALL' 
                  ? 'bg-emerald-500 text-emerald-950 shadow-lg shadow-emerald-500/20' 
                  : 'bg-white/5 text-emerald-100/40 hover:text-emerald-100 border border-white/5'
                }`}
              >
                Semua Menu
              </button>
              <button 
                onClick={() => setFilter('COMBO')}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                  filter === 'COMBO' 
                  ? 'bg-emerald-500 text-emerald-950 shadow-lg shadow-emerald-500/20' 
                  : 'bg-white/5 text-emerald-100/40 hover:text-emerald-100 border border-white/5'
                }`}
              >
                <Sparkles size={12} /> Paket Combo
              </button>
            </div>
          </div>

          {filteredSnacks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {filteredSnacks.map((item) => (
                <div key={item.id} className="group bg-emerald-950/20 border border-emerald-900/50 rounded-[3rem] overflow-hidden hover:border-emerald-500/40 transition-all duration-500">
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6 flex gap-2">
                      <div className="bg-emerald-50 text-emerald-950 px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">
                        {item.category}
                      </div>
                      {item.name.toLowerCase().includes('combo') && (
                        <div className="bg-amber-400 text-amber-950 px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">
                          PROMO COMBO
                        </div>
                      )}
                    </div>
                    <div className="absolute top-6 right-6">
                      <button className="bg-black/60 backdrop-blur-md p-3 rounded-2xl text-white/40 hover:text-red-500 transition-colors border border-white/5">
                        <Heart size={18} />
                      </button>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                       <Link to="/#trending" className="w-full bg-white text-emerald-950 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-center shadow-xl translate-y-4 group-hover:translate-y-0 transition-all">
                         Order with Movie
                       </Link>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-black text-white group-hover:text-emerald-400 transition-colors leading-tight line-clamp-2 pr-4">{item.name}</h3>
                      <div className="flex items-center gap-1 text-yellow-500 font-black text-xs">
                        <Star size={14} fill="currentColor" /> 5.0
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-emerald-900/30">
                      <div className="text-emerald-400 font-black text-xl">
                        Rp {item.price.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2 text-[9px] text-emerald-100/40 font-black uppercase tracking-widest">
                        <TrendingUp size={14} className="text-emerald-500" /> Bestseller
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 opacity-30">
              <ShoppingBag size={64} className="mx-auto mb-6 text-emerald-500" />
              <p className="text-xl font-black uppercase tracking-[0.2em]">Belum Ada Menu Combo Tersedia</p>
            </div>
          )}

          <div className="mt-20 p-12 bg-emerald-500/10 border border-emerald-500/20 rounded-[3rem] text-center md:text-left flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">Ingin Pesan Sekarang?</h3>
              <p className="text-emerald-100/40 font-bold">Pilih film favoritmu terlebih dahulu untuk memesan menu Snack Bar.</p>
            </div>
            <Link to="/#trending" className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-12 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-emerald-500/20 transition-all flex items-center gap-3">
              <ShoppingBag size={22} /> Pilih Film
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnackBarPage;
