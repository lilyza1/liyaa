
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Users, DollarSign, Ticket, Activity, Search, Film, TrendingUp, Sparkles, Coffee } from 'lucide-react';
import { Booking } from '../types';

const AdminDashboard: React.FC<{ bookings: Booking[] }> = ({ bookings }) => {
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const totalTickets = bookings.reduce((sum, b) => sum + b.seats.length, 0);
  
  const ticketRevenue = bookings.reduce((sum, b) => {
    // Re-calculating ticket revenue part
    const moviePrice = 50000; // Simplified average
    return sum + (b.seats.length * moviePrice);
  }, 0);

  const foodRevenue = bookings.reduce((sum, b) => {
    return sum + b.foodOrders.reduce((fSum, f) => fSum + (f.price * f.quantity), 0);
  }, 0);

  const movieStats = bookings.reduce((acc: any, b) => {
    acc[b.movieTitle] = (acc[b.movieTitle] || 0) + b.seats.length;
    return acc;
  }, {});

  const chartData = Object.keys(movieStats).map(key => ({
    name: key.length > 12 ? key.substring(0, 12) + '..' : key,
    value: movieStats[key]
  }));

  const revenueData = [
    { name: 'Tiket', value: ticketRevenue },
    { name: 'Makanan', value: foodRevenue }
  ];

  const COLORS = ['#10b981', '#34d399', '#6ee7b7', '#059669', '#064e3b'];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-gradient-to-r from-emerald-900/40 to-transparent p-10 rounded-[3rem] border border-emerald-800/30 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-2 rounded-xl">
              <Film className="text-emerald-950" size={24} />
            </div>
            <span className="text-2xl font-black text-white">Cxi•Cinema Ops</span>
          </div>
          <h1 className="text-4xl font-black text-white">Dashboard Kontrol Admin</h1>
          <p className="text-emerald-100/60 max-w-lg">
            Monitor penjualan tiket dan F&B secara real-time. Data diperbarui setiap ada transaksi masuk.
          </p>
        </div>
        <div className="hidden lg:block bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10">
          <div className="flex items-center gap-3 mb-2 text-emerald-400">
            <TrendingUp size={20} />
            <span className="font-bold text-sm uppercase">F&B Performance</span>
          </div>
          <p className="text-xs text-emerald-100/40 italic">
            Kontribusi F&B terhadap total omset: <br/> 
            <span className="text-emerald-400 font-bold">{totalRevenue > 0 ? ((foodRevenue/totalRevenue)*100).toFixed(1) : 0}%</span> dari total pendapatan.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Revenue Total', value: `Rp ${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Tiket Terjual', value: `${totalTickets} Tiket`, icon: Ticket, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Revenue F&B', value: `Rp ${foodRevenue.toLocaleString()}`, icon: Coffee, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Customer Visit', value: bookings.length, icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10' }
        ].map((m, i) => (
          <div key={i} className="group bg-[#062c2d]/40 border border-emerald-900/50 p-8 rounded-[2rem] hover:border-emerald-500/30 transition-all">
            <div className={`p-4 rounded-2xl ${m.bg} inline-block mb-6 ${m.color}`}>
              <m.icon size={28} />
            </div>
            <p className="text-emerald-100/40 text-[10px] mb-2 uppercase tracking-[0.2em] font-bold">{m.label}</p>
            <h3 className="text-2xl font-black text-white group-hover:scale-105 transition-transform origin-left">{m.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-8 mb-12">
        {/* Chart */}
        <div className="lg:col-span-3 bg-[#062c2d]/40 border border-emerald-900/50 p-10 rounded-[2.5rem]">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="text-emerald-500" /> Distribusi Penonton Film
            </h3>
            <span className="text-xs text-emerald-100/30 uppercase tracking-widest">By Tickets Sold</span>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#064e3b" />
                <XAxis dataKey="name" stroke="#10b981" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#10b981" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: '#ffffff05'}}
                  contentStyle={{ backgroundColor: '#022c22', border: '1px solid #064e3b', borderRadius: '16px', color: '#fff' }}
                />
                <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transaction History */}
        <div className="lg:col-span-2 bg-[#062c2d]/40 border border-emerald-900/50 p-10 rounded-[2.5rem] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">Log Transaksi</h3>
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Search className="text-emerald-500" size={18} />
            </div>
          </div>
          <div className="flex-grow overflow-auto custom-scrollbar pr-2">
            {bookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full opacity-30 text-center py-10">
                <Ticket size={48} className="mb-4" />
                <p className="text-xs font-bold uppercase tracking-widest">Belum ada aktivitas</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.slice().reverse().slice(0, 10).map((b) => (
                  <div key={b.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/20 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider">#{b.id}</span>
                      <span className="text-xs font-bold text-emerald-50">Rp {(b.totalPrice/1000).toFixed(0)}k</span>
                    </div>
                    <div className="font-bold text-xs mb-1">{b.customerName}</div>
                    <div className="flex justify-between items-center text-[9px] text-emerald-100/40 italic">
                      <div className="line-clamp-1">{b.movieTitle}</div>
                      <div className="whitespace-nowrap flex items-center gap-1">
                        {b.foodOrders.length > 0 && <Coffee size={10} className="text-amber-500" />}
                        {new Date(b.timestamp).getHours()}:{new Date(b.timestamp).getMinutes()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="mt-8 text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em] hover:text-emerald-300 transition-colors w-full text-center py-4 border-t border-emerald-900/50">
            Export Data Laporan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
