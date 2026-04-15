
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Printer, ArrowLeft, Ticket as TicketIcon, MapPin, Calendar, Clock, Instagram, Mail, Coffee } from 'lucide-react';
import { Booking } from '../types';

const SuccessPage: React.FC<{ bookings: Booking[] }> = ({ bookings }) => {
  const { id } = useParams();
  const booking = bookings.find(b => b.id === id);

  if (!booking) return <div className="p-20 text-center text-emerald-500 font-bold">Tiket tidak ditemukan</div>;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="no-print mb-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h2 className="text-3xl font-black text-white mb-2">Transaksi Berhasil!</h2>
          <p className="text-emerald-100/50 font-medium">Bawa tiket digital ini ke pintu masuk bioskop.</p>
        </div>
        <div className="flex gap-4">
          <Link to="/" className="bg-white/5 border border-white/10 text-emerald-100 px-8 py-4 rounded-2xl font-black hover:bg-white/10 transition-all flex items-center gap-2">
            <ArrowLeft size={18} /> Beranda
          </Link>
          <button 
            onClick={handlePrint}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black flex items-center gap-2 transition-all shadow-2xl shadow-emerald-900/40"
          >
            <Printer size={18} /> Cetak Struk
          </button>
        </div>
      </div>

      <div className="bg-white text-zinc-900 rounded-[3rem] overflow-hidden shadow-[0_45px_100px_-20px_rgba(16,185,129,0.25)] relative">
        {/* Ticket Header */}
        <div className="bg-emerald-900 text-emerald-50 p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b-4 border-dashed border-zinc-200 relative">
          <div className="flex items-center gap-6">
            <div className="bg-emerald-500 p-4 rounded-2xl text-emerald-950 shadow-2xl rotate-3">
              <TicketIcon size={36} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-400 block mb-2">Cxi•Cinema Electronic Pass</span>
              <h1 className="text-3xl font-black leading-tight tracking-tight">{booking.movieTitle}</h1>
              <p className="text-emerald-300/60 font-mono text-xs mt-1 font-bold tracking-widest uppercase">TX-ID: {booking.id}</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-xl text-[10px] font-black border border-white/20 uppercase tracking-[0.2em] shadow-inner">
            STUDIO {booking.studio} VIP
          </div>
        </div>

        {/* Ticket Body */}
        <div className="p-12 md:p-14 flex flex-col md:flex-row gap-12">
          <div className="flex-grow space-y-10">
            <div className="grid grid-cols-2 gap-10">
              <div>
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] block mb-2">Tanggal</span>
                <div className="flex items-center gap-3 text-zinc-800 font-black">
                  <Calendar size={18} className="text-emerald-600" />
                  <span className="text-lg">{booking.date}</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] block mb-2">Jam Tayang</span>
                <div className="flex items-center gap-3 text-zinc-800 font-black">
                  <Clock size={18} className="text-emerald-600" />
                  <span className="text-lg">{booking.schedule} WIB</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] block mb-2">Nomor Kursi</span>
                <div className="flex items-center gap-3 text-zinc-800 font-black">
                  <div className="bg-emerald-50 text-emerald-900 px-4 py-1.5 rounded-xl border-2 border-emerald-100 text-xl shadow-sm">
                    {booking.seats.join(', ')}
                  </div>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] block mb-2">Lokasi Studio</span>
                <div className="flex items-center gap-3 text-zinc-800 font-black">
                  <MapPin size={18} className="text-emerald-600" />
                  <span className="text-lg">STUDIO {booking.studio} (Lantai 2)</span>
                </div>
              </div>
            </div>

            {/* Food Section in Ticket */}
            {booking.foodOrders.length > 0 && (
              <div className="pt-8 border-t-2 border-zinc-50">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] block mb-4 flex items-center gap-2">
                  <Coffee size={14} className="text-emerald-600" /> Tambahan F&B
                </span>
                <div className="bg-zinc-50 rounded-2xl p-6 space-y-2 border border-zinc-100">
                  {booking.foodOrders.map(f => (
                    <div key={f.id} className="flex justify-between text-xs font-bold text-zinc-600">
                      <span>{f.quantity}x {f.name}</span>
                      <span>Ready at Snack Bar</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-8 border-t-2 border-zinc-100 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] block mb-2">Customer</span>
                <p className="font-black text-xl text-zinc-900 tracking-tight">{booking.customerName}</p>
                <p className="text-zinc-400 font-bold text-xs mt-0.5">{booking.customerEmail}</p>
              </div>
              <div className="text-left md:text-right bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100">
                <span className="text-[9px] font-black text-emerald-600/60 uppercase tracking-[0.2em] block mb-1">Grand Total</span>
                <p className="text-2xl font-black text-emerald-700 tracking-tight">Rp {booking.totalPrice.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-center justify-center md:pl-12 md:border-l-2 border-dashed border-zinc-200">
            {/* QR Code Simulation */}
            <div className="bg-white p-6 rounded-[2.5rem] shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] border-2 border-zinc-50 mb-6 group transition-all">
              <div className="w-36 h-36 bg-zinc-900 rounded-3xl flex items-center justify-center relative overflow-hidden shadow-xl border-4 border-zinc-800">
                <div className="absolute inset-0 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=CXICINEMA-'+booking.id)] bg-cover grayscale group-hover:grayscale-0 transition-all duration-700"></div>
              </div>
            </div>
            <div className="text-center space-y-1">
              <span className="text-[9px] text-zinc-400 font-black tracking-[0.4em] uppercase block">SCAN AT COUNTER</span>
              <p className="text-[10px] text-emerald-600 font-black italic uppercase tracking-widest">Digital Verified</p>
            </div>
          </div>
        </div>

        {/* Ticket Footer */}
        <div className="bg-zinc-50 p-8 text-center text-[10px] text-zinc-400 uppercase tracking-[0.3em] font-black border-t-2 border-zinc-100">
          * Harap tunjukkan QR ini ke petugas • Tiket tidak dapat direfund *
        </div>

        {/* Punches */}
        <div className="absolute top-[160px] md:top-[170px] -left-5 w-10 h-10 bg-[#020617] rounded-full no-print shadow-[inset_-4px_0_8px_rgba(0,0,0,0.2)]"></div>
        <div className="absolute top-[160px] md:top-[170px] -right-5 w-10 h-10 bg-[#020617] rounded-full no-print shadow-[inset_4px_0_8px_rgba(0,0,0,0.2)]"></div>
      </div>
    </div>
  );
};

export default SuccessPage;
