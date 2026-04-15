
import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Ticket, CheckCircle2, Clock, Calendar as CalIcon, MapPin, Coffee, Plus, Minus, ShoppingBag } from 'lucide-react';
import { MOVIES, SNACKS } from '../constants';
import SeatSelector from '../components/SeatSelector';
import { Booking, FoodOrder } from '../types';

interface BookingPageProps {
  onBookingComplete: (booking: Booking) => void;
}

const BookingPage: React.FC<BookingPageProps> = ({ onBookingComplete }) => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const schedule = searchParams.get('time') || '12:00';
  const selectedDay = searchParams.get('day') || 'Senin';
  const selectedDate = searchParams.get('date') || '1';
  const selectedStudio = searchParams.get('studio') || '1';
  
  const movie = MOVIES.find(m => m.id === id);

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [foodOrders, setFoodOrders] = useState<FoodOrder[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'DETAILS' | 'PAYMENT' | 'COMPLETE'>('DETAILS');

  const foodTotal = useMemo(() => {
    return foodOrders.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [foodOrders]);

  const totalPrice = useMemo(() => {
    if (!movie) return 0;
    return (selectedSeats.length * movie.price) + foodTotal;
  }, [selectedSeats, movie, foodTotal]);

  const toggleSeat = (seatId: string) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(s => s !== seatId) 
        : [...prev, seatId]
    );
  };

  const updateFoodQuantity = (foodId: string, delta: number) => {
    const foodItem = SNACKS.find(f => f.id === foodId);
    if (!foodItem) return;

    setFoodOrders(prev => {
      const existing = prev.find(f => f.id === foodId);
      if (existing) {
        const newQuantity = existing.quantity + delta;
        if (newQuantity <= 0) {
          return prev.filter(f => f.id !== foodId);
        }
        return prev.map(f => f.id === foodId ? { ...f, quantity: newQuantity } : f);
      } else if (delta > 0) {
        return [...prev, { id: foodId, name: foodItem.name, price: foodItem.price, quantity: 1 }];
      }
      return prev;
    });
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSeats.length === 0) {
      alert("Harap pilih minimal satu kursi.");
      return;
    }
    setPaymentStep('PAYMENT');
  };

  const simulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      if (!movie) return;
      
      const newBooking: Booking = {
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        movieId: movie.id,
        movieTitle: movie.title,
        schedule,
        date: `${selectedDay}, ${selectedDate} Nov 2024`,
        studio: selectedStudio,
        seats: selectedSeats,
        foodOrders,
        totalPrice,
        customerName,
        customerEmail,
        timestamp: new Date().toISOString(),
        status: 'PAID'
      };

      onBookingComplete(newBooking);
      setIsProcessing(false);
      setPaymentStep('COMPLETE');
      
      setTimeout(() => {
        navigate(`/success/${newBooking.id}`);
      }, 1500);
    }, 2000);
  };

  if (!movie) return <div className="p-20 text-center">Film tidak ditemukan</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-12 transition-colors font-bold group"
      >
        <ChevronLeft className="group-hover:-translate-x-1 transition-transform" /> Ganti Jadwal / Studio
      </button>

      <div className="grid lg:grid-cols-3 gap-16">
        {/* Left Column: Seat Map & Food */}
        <div className="lg:col-span-2 space-y-12">
          {/* Seat Map */}
          <div className="bg-[#062c2d]/30 border border-emerald-900/30 rounded-[3rem] p-10 backdrop-blur-sm shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <h2 className="text-3xl font-black flex items-center gap-3">
                <Ticket className="text-emerald-500" /> Area Studio {selectedStudio}
              </h2>
              <div className="text-sm font-black text-emerald-400 bg-emerald-500/10 px-6 py-3 rounded-full border border-emerald-500/20 shadow-lg">
                {selectedSeats.length} Kursi Terpilih
              </div>
            </div>
            
            <SeatSelector 
              selectedSeats={selectedSeats} 
              onToggleSeat={toggleSeat} 
            />
          </div>

          {/* Food Selection */}
          <div className="bg-[#062c2d]/30 border border-emerald-900/30 rounded-[3rem] p-10 backdrop-blur-sm shadow-2xl">
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-emerald-500/20 p-3 rounded-2xl text-emerald-400">
                <Coffee size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-black">Cxi•Snack Bar</h2>
                <p className="text-emerald-100/40 text-sm font-bold">Popcorn & Minuman untuk teman menonton</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SNACKS.map(item => {
                const quantity = foodOrders.find(f => f.id === item.id)?.quantity || 0;
                return (
                  <div key={item.id} className="bg-emerald-950/40 border border-emerald-900/50 rounded-3xl p-5 flex gap-5 items-center hover:border-emerald-500/30 transition-all">
                    <img src={item.image} className="w-20 h-20 rounded-2xl object-cover shadow-lg" alt={item.name} />
                    <div className="flex-grow">
                      <h4 className="font-black text-emerald-50 mb-1">{item.name}</h4>
                      <p className="text-emerald-400 font-bold text-sm">Rp {item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-black/40 px-3 py-2 rounded-xl border border-white/5">
                      <button 
                        onClick={() => updateFoodQuantity(item.id, -1)}
                        className="p-1 hover:text-emerald-400 text-emerald-100/40 transition-colors"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="font-black text-emerald-100 min-w-[20px] text-center">{quantity}</span>
                      <button 
                        onClick={() => updateFoodQuantity(item.id, 1)}
                        className="p-1 hover:text-emerald-400 text-emerald-100/40 transition-colors"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Form */}
        <div className="space-y-8">
          <div className="bg-[#062c2d]/60 border border-emerald-900/50 rounded-[3rem] p-10 sticky top-28 shadow-2xl">
            <div className="mb-10 pb-10 border-b border-emerald-900/50">
              <h3 className="text-[10px] uppercase text-emerald-500 font-black tracking-[0.4em] mb-8">Ringkasan Pesanan</h3>
              <div className="flex gap-6 mb-8">
                <img src={movie.image} className="w-20 h-28 rounded-2xl object-cover shadow-2xl border-2 border-emerald-500/20" />
                <div>
                  <h4 className="font-black text-xl leading-tight mb-3 text-white">{movie.title}</h4>
                  <div className="space-y-1.5 text-emerald-100/60 text-[10px] font-bold uppercase tracking-wider">
                    <p className="flex items-center gap-2"><CalIcon size={12} className="text-emerald-500" /> {selectedDay}, {selectedDate} Nov</p>
                    <p className="flex items-center gap-2"><Clock size={12} className="text-emerald-500" /> {schedule} WIB</p>
                    <p className="flex items-center gap-2"><MapPin size={12} className="text-emerald-500" /> STUDIO {selectedStudio}</p>
                  </div>
                </div>
              </div>

              {/* Selected Seats & Food List */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-emerald-100/50 uppercase tracking-widest">Kursi ({selectedSeats.length})</span>
                  <span className="text-emerald-100">{selectedSeats.join(', ') || '-'}</span>
                </div>
                {foodOrders.length > 0 && (
                  <div className="pt-3 border-t border-emerald-900/30 space-y-2">
                    <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest block mb-2">Tambahan Menu</span>
                    {foodOrders.map(f => (
                      <div key={f.id} className="flex justify-between text-[11px] font-bold">
                        <span className="text-emerald-100/60">{f.quantity}x {f.name}</span>
                        <span className="text-emerald-100">Rp {(f.price * f.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {paymentStep === 'DETAILS' && (
              <form onSubmit={handleBooking} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-3">Nama Pemesan</label>
                  <input 
                    required
                    type="text" 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full bg-emerald-950/50 border border-emerald-900 focus:border-emerald-500 outline-none rounded-2xl px-6 py-4 text-emerald-50 transition-all font-bold text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-3">Email Valid</label>
                  <input 
                    required
                    type="email" 
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="email@sekolah.sch.id"
                    className="w-full bg-emerald-950/50 border border-emerald-900 focus:border-emerald-500 outline-none rounded-2xl px-6 py-4 text-emerald-50 transition-all font-bold text-sm"
                  />
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-6 my-8">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-xs text-emerald-500 uppercase tracking-widest">Total Bayar</span>
                    <span className="text-2xl font-black text-emerald-400">Rp {totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={selectedSeats.length === 0}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-emerald-950 flex items-center justify-center gap-3 group"
                >
                  Konfirmasi Pesanan <ChevronLeft size={20} className="rotate-180 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}

            {paymentStep === 'PAYMENT' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="text-center">
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-emerald-400 shadow-xl">
                    <CreditCard size={40} />
                  </div>
                  <h3 className="text-2xl font-black mb-1 text-white">Metode Transfer</h3>
                  <p className="text-emerald-100/40 text-[10px] font-black uppercase tracking-widest">Virtual Account Cxi•Cinema</p>
                </div>

                <div className="p-6 bg-emerald-900/20 rounded-[2rem] border border-emerald-900/50 space-y-4">
                  <div className="text-2xl font-mono text-center tracking-[0.2em] text-emerald-300 bg-black/40 py-4 rounded-xl border border-white/5 shadow-inner">
                    8809 1234 5678
                  </div>
                  <div className="text-center text-[9px] text-emerald-100/30 uppercase font-black tracking-[0.2em]">Atas Nama: PT SINEMA TEKNISI JAYA</div>
                </div>

                <button 
                  onClick={simulatePayment}
                  disabled={isProcessing}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-2xl"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Memproses...
                    </>
                  ) : (
                    'OK / Pesanan Selesai'
                  )}
                </button>
                <button 
                  onClick={() => setPaymentStep('DETAILS')}
                  className="w-full text-emerald-100/40 text-xs font-bold hover:text-emerald-400 transition-colors"
                >
                  Kembali ke Detail
                </button>
              </div>
            )}

            {paymentStep === 'COMPLETE' && (
              <div className="text-center py-16 animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-emerald-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-emerald-950 shadow-2xl shadow-emerald-500/40 rotate-12">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-black mb-3 text-white">Berhasil!</h3>
                <p className="text-emerald-100/50 text-sm font-medium">Mencetak tiket digital Anda...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
