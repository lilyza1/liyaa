
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Tag, Calendar, ChevronLeft, MapPin, Sparkles, Layers, Bell, BellOff } from 'lucide-react';
import { MOVIES } from '../constants';
import { useNotifications } from '../contexts/NotificationContext';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movie = MOVIES.find(m => m.id === id);
  const { subscribe, unsubscribe, isSubscribed, subscriptions } = useNotifications();

  const [selectedDay, setSelectedDay] = useState('Senin');
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [selectedStudio, setSelectedStudio] = useState('1');

  if (!movie) return <div className="p-20 text-center text-emerald-500 font-black">Film tidak ditemukan</div>;

  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  const studios = [
    { id: '1', type: '4K LASER' },
    { id: '2', type: 'ATMOS' },
    { id: '3', type: 'STANDARD' },
    { id: '4', type: 'SWEETBOX' },
    { id: '5', type: 'VIP GOLD' }
  ];

  return (
    <div className="min-h-screen pb-32">
      <div className="relative h-[55vh] overflow-hidden">
        <img src={movie.image} className="w-full h-full object-cover blur-xl opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-10 group bg-emerald-500/10 px-6 py-2.5 rounded-2xl border border-emerald-500/20 backdrop-blur-md font-black text-xs tracking-wider">
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> KEMBALI KE KATALOG
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-40 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Side: Poster */}
          <div className="w-full lg:w-[350px] shrink-0">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border-4 border-[#021c1a]">
              <img src={movie.image} alt={movie.title} className="w-full" />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-[#062c2d]/40 p-6 rounded-[2rem] border border-emerald-900/30 text-center backdrop-blur-sm">
                <span className="text-[10px] uppercase text-emerald-500 font-black block mb-2 tracking-widest">Harga</span>
                <span className="text-2xl font-black text-white">Rp {(movie.price / 1000).toFixed(0)}k</span>
              </div>
              <div className="bg-[#062c2d]/40 p-6 rounded-[2rem] border border-emerald-900/30 text-center backdrop-blur-sm">
                <span className="text-[10px] uppercase text-emerald-500 font-black block mb-2 tracking-widest">Rating</span>
                <span className="text-2xl font-black text-white">{movie.rating}</span>
              </div>
            </div>
          </div>

          {/* Main: Details & Scheduling */}
          <div className="flex-grow space-y-12">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
                {movie.title}
              </h1>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-emerald-500 text-emerald-950 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest">
                  <Tag size={14} /> {movie.genre}
                </div>
                <div className="flex items-center gap-2 bg-white/5 text-emerald-100/60 px-4 py-2 rounded-xl border border-white/10 font-bold text-[10px]">
                  <Clock size={14} /> {movie.duration}
                </div>
                
                <button 
                  onClick={() => {
                    if (isSubscribed(movie.id, 'MOVIE_RELEASE')) {
                      const sub = subscriptions.find(s => s.movieId === movie.id && s.type === 'MOVIE_RELEASE');
                      if (sub) unsubscribe(sub.id);
                    } else {
                      subscribe({
                        movieId: movie.id,
                        movieTitle: movie.title,
                        type: 'MOVIE_RELEASE'
                      });
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-black text-[10px] uppercase tracking-widest transition-all ${
                    isSubscribed(movie.id, 'MOVIE_RELEASE')
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                    : 'bg-white/5 border-white/10 text-emerald-100/60 hover:bg-white/10'
                  }`}
                >
                  {isSubscribed(movie.id, 'MOVIE_RELEASE') ? <BellOff size={14} /> : <Bell size={14} />}
                  {isSubscribed(movie.id, 'MOVIE_RELEASE') ? 'Berhenti Berlangganan' : 'Ingatkan Saya'}
                </button>
              </div>
              <p className="text-emerald-100/50 text-lg leading-relaxed max-w-2xl font-medium">{movie.description}</p>
            </div>

            {/* Selection Engine */}
            <div className="bg-[#062c2d]/20 border border-emerald-900/50 rounded-[3rem] p-10 backdrop-blur-md shadow-xl space-y-10">
              {/* Step 1: Days */}
              <div>
                <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                  <Calendar size={14} /> Pilih Hari
                </h3>
                <div className="flex flex-wrap gap-3">
                  {days.map(day => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-6 py-2.5 rounded-xl font-black text-xs transition-all ${
                        selectedDay === day 
                        ? 'bg-emerald-500 text-emerald-950 shadow-lg' 
                        : 'bg-white/5 text-emerald-100/40 hover:bg-white/10'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Dates */}
              <div>
                <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-6">Pilih Tanggal</h3>
                <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
                  {dates.map(date => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`shrink-0 w-12 h-16 rounded-xl flex flex-col items-center justify-center transition-all border ${
                        selectedDate === date 
                        ? 'bg-emerald-500 border-emerald-400 text-emerald-950 scale-105 shadow-md' 
                        : 'bg-emerald-950/40 border-white/5 text-emerald-100/40 hover:bg-emerald-900/60'
                      }`}
                    >
                      <span className="text-[8px] font-black uppercase opacity-60 mb-1 tracking-tighter">NOV</span>
                      <span className="text-xl font-black">{date}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Studios */}
              <div>
                <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                  <Layers size={14} /> Pilih Studio
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {studios.map(studio => (
                    <button
                      key={studio.id}
                      onClick={() => setSelectedStudio(studio.id)}
                      className={`p-4 rounded-2xl border transition-all text-center group ${
                        selectedStudio === studio.id 
                        ? 'bg-emerald-500 border-emerald-400 text-emerald-950' 
                        : 'bg-white/5 border-white/5 text-emerald-100/40 hover:border-emerald-500/30'
                      }`}
                    >
                      <div className="text-2xl font-black mb-1">ST {studio.id}</div>
                      <div className="text-[8px] uppercase font-black opacity-80 tracking-widest">{studio.type}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Showtimes */}
              <div className="pt-6 border-t border-emerald-900/50">
                <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-6">Pilih Jam</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {movie.schedules.map(time => (
                    <div key={time} className="relative group">
                      <Link 
                        to={`/book/${movie.id}?time=${time}&day=${selectedDay}&date=${selectedDate}&studio=${selectedStudio}`}
                        className="bg-emerald-950/60 border border-emerald-900/50 hover:border-emerald-500 p-5 rounded-2xl text-center transition-all block"
                      >
                        <span className="text-2xl font-black text-white group-hover:text-emerald-400 block">{time}</span>
                        <span className="text-[9px] font-black text-emerald-500/40 mt-0.5 block uppercase">WIB</span>
                      </Link>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          if (isSubscribed(movie.id, 'SHOWTIME_REMINDER', time)) {
                            const sub = subscriptions.find(s => s.movieId === movie.id && s.type === 'SHOWTIME_REMINDER' && s.schedule === time);
                            if (sub) unsubscribe(sub.id);
                          } else {
                            subscribe({
                              movieId: movie.id,
                              movieTitle: movie.title,
                              type: 'SHOWTIME_REMINDER',
                              schedule: time
                            });
                          }
                        }}
                        className={`absolute -top-2 -right-2 p-2 rounded-full border shadow-lg transition-all ${
                          isSubscribed(movie.id, 'SHOWTIME_REMINDER', time)
                          ? 'bg-emerald-500 border-emerald-400 text-emerald-950'
                          : 'bg-[#022c22] border-emerald-900/50 text-emerald-500/40 hover:text-emerald-400'
                        }`}
                        title={isSubscribed(movie.id, 'SHOWTIME_REMINDER', time) ? "Hapus Pengingat" : "Ingatkan Jadwal Ini"}
                      >
                        <Bell size={12} fill={isSubscribed(movie.id, 'SHOWTIME_REMINDER', time) ? "currentColor" : "none"} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
