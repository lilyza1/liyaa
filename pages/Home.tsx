
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, TrendingUp, Calendar, Star, Clock, ChevronDown, CheckCircle2, ShieldCheck, Coffee, ShoppingBag, ArrowRight, Bell } from 'lucide-react';
import { MOVIES, SNACKS } from '../constants';

const Home: React.FC = () => {
  const scrollToCatalog = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById('trending');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover brightness-[0.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/70 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 w-full text-center md:text-left">
          <div className="max-w-3xl">
            <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-400 mb-6">
              <div className="h-[2px] w-8 bg-emerald-500"></div>
              <TrendingUp size={18} />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase">Eksklusif SMK TKJ Cinema</span>
            </div>
            <h1 className="text-5xl md:text-[5.5rem] font-black text-white mb-8 leading-[1.05] tracking-tighter">
              Sinema <br/> <span className="text-emerald-500 italic">Terbaik</span> Kita
            </h1>
            <p className="text-emerald-100/70 text-lg md:text-2xl mb-12 leading-relaxed max-w-xl mx-auto md:mx-0 font-medium">
              Nikmati kualitas visual 4K Laser dan audio Dolby Atmos hanya di <span className="text-emerald-400 font-bold">Cxi•Cinema</span>. <br/>
              <span className="text-white font-black underline decoration-emerald-500 decoration-2 underline-offset-4">Pesan film favoritmu sekarang!</span>
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a 
                href="#trending" 
                onClick={scrollToCatalog}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black transition-all shadow-xl shadow-emerald-950/40 flex items-center gap-3 group text-lg"
              >
                <Play fill="currentColor" size={22} className="group-hover:translate-x-1 transition-transform" /> Beli Tiket
              </a>
              <button 
                onClick={scrollToCatalog}
                className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-emerald-100 px-10 py-4 rounded-2xl font-black transition-all text-lg flex items-center gap-2 group"
              >
                <Calendar size={20} className="group-hover:scale-110 transition-transform text-emerald-400" /> Cek Jadwal
              </button>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 opacity-30">
          <ChevronDown size={24} className="text-emerald-500" />
        </div>
      </section>

      {/* Catalog Section */}
      <section id="trending" className="max-w-7xl mx-auto px-6 py-28 text-center scroll-mt-10">
        <div className="flex flex-col items-center gap-6 mb-20">
          <div className="inline-flex items-center gap-3 bg-emerald-500/10 text-emerald-400 px-6 py-2 rounded-full border border-emerald-500/20 text-[10px] font-black tracking-[0.4em] uppercase">
            <CheckCircle2 size={14} /> Ready To Watch
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            Sedang <span className="text-emerald-500 italic opacity-80">Tayang</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-500 rounded-full"></div>
          <p className="text-emerald-100/40 text-lg max-w-xl font-bold">
            Pilih film terbaru dan amankan kursi terbaikmu di Studio 1-5 hari ini.
          </p>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOVIES.filter(m => !m.isUpcoming).map((movie) => (
            <Link 
              to={`/movie/${movie.id}`} 
              key={movie.id} 
              className="group bg-[#062c2d]/20 rounded-[2.5rem] overflow-hidden border border-emerald-900/30 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-900/10"
            >
              <div className="relative aspect-[3/4.2] overflow-hidden">
                <img 
                  src={movie.image} 
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-emerald-500 text-emerald-950 font-black px-3 py-1.5 rounded-xl text-[9px] shadow-lg">
                  {movie.rating}
                </div>
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md text-emerald-400 px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest border border-emerald-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  STUDIO {Math.floor(Math.random() * 5) + 1}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-6 left-0 right-0 px-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-emerald-500 text-emerald-950 w-full py-4 rounded-xl text-center font-black text-[10px] shadow-xl uppercase tracking-widest">
                    Pilih Kursi
                  </div>
                </div>
              </div>
              <div className="p-8 text-left">
                <div className="text-emerald-400 text-[9px] font-black uppercase tracking-[0.4em] mb-3 opacity-60">
                   {movie.genre}
                </div>
                <h3 className="text-xl font-black text-white mb-6 line-clamp-1 group-hover:text-emerald-400 transition-colors tracking-tight leading-tight">{movie.title}</h3>
                <div className="flex items-center justify-between text-[10px] text-emerald-100/40 font-black uppercase tracking-[0.2em] border-t border-emerald-900/30 pt-5">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-emerald-500" />
                    <span>{movie.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-emerald-100">4.9</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Snack Bar Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-emerald-950/20 rounded-[4rem] border border-emerald-900/30 mb-20 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-500/5 blur-[100px] rounded-full"></div>
        <div className="flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
            <div className="inline-flex items-center gap-3 text-emerald-400 font-black text-xs uppercase tracking-widest">
              <Coffee size={20} /> Cxi•Snack Bar
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Teman Nonton <br/> <span className="text-emerald-500">Paling Asik!</span>
            </h2>
            <p className="text-emerald-100/40 text-lg font-medium leading-relaxed">
              Lengkapi pengalaman menontonmu dengan popcorn caramel hangat dan minuman segar. Pesan online sekarang, ambil langsung di counter tanpa antri!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                to="/snack-bar"
                className="bg-emerald-500/10 border border-emerald-500/20 px-8 py-4 rounded-2xl flex items-center gap-4 hover:bg-emerald-500/20 transition-all group"
              >
                <ShoppingBag className="text-emerald-500 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-white font-black text-sm flex items-center gap-2">
                    Pesan Online <ArrowRight size={14} />
                  </div>
                  <div className="text-[10px] text-emerald-100/40 font-bold uppercase">Ready at Booking</div>
                </div>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
            {SNACKS.slice(0, 4).map((item, i) => (
              <div key={item.id} className={`bg-emerald-900/20 border border-emerald-900/50 p-6 rounded-[2.5rem] hover:border-emerald-500/30 transition-all group ${i % 2 !== 0 ? 'translate-y-8' : ''}`}>
                <img src={item.image} className="w-full aspect-square object-cover rounded-3xl mb-4 shadow-xl grayscale group-hover:grayscale-0 transition-all" alt={item.name} />
                <h4 className="text-white font-black text-sm mb-1 line-clamp-1">{item.name}</h4>
                <div className="text-emerald-400 font-black text-xs">Rp {item.price.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center gap-6 mb-16">
          <div className="inline-flex items-center gap-3 bg-emerald-500/10 text-emerald-400 px-6 py-2 rounded-full border border-emerald-500/20 text-[10px] font-black tracking-[0.4em] uppercase">
            <Calendar size={14} /> Coming Soon
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter">
            Segera <span className="text-emerald-500 italic opacity-80">Hadir</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOVIES.filter(m => m.isUpcoming).map((movie) => (
            <Link 
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="group flex flex-col sm:flex-row bg-emerald-950/20 border border-emerald-900/30 rounded-[2.5rem] overflow-hidden hover:border-emerald-500/50 transition-all"
            >
              <div className="w-full sm:w-48 h-64 shrink-0 overflow-hidden">
                <img src={movie.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={movie.title} />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-2">{movie.genre}</div>
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-emerald-400 transition-colors">{movie.title}</h3>
                <p className="text-emerald-100/40 text-sm line-clamp-2 mb-6">{movie.description}</p>
                <div className="flex items-center gap-2 text-emerald-400 font-black text-[10px] uppercase tracking-widest">
                  <Bell size={14} /> Ingatkan Saya
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-[#062c2d]/10 border border-emerald-900/20 p-8 rounded-[3rem] flex flex-wrap justify-center gap-12 grayscale opacity-50">
          <div className="flex items-center gap-2 font-black text-sm"><ShieldCheck className="text-emerald-500" /> IMAX ENHANCED</div>
          <div className="flex items-center gap-2 font-black text-sm"><CheckCircle2 className="text-emerald-500" /> DOLBY ATMOS</div>
          <div className="flex items-center gap-2 font-black text-sm"><ShieldCheck className="text-emerald-500" /> 4K LASER PROJECTION</div>
          <div className="flex items-center gap-2 font-black text-sm"><CheckCircle2 className="text-emerald-500" /> LUXURY RECLINER</div>
        </div>
      </section>
    </div>
  );
};

export default Home;
