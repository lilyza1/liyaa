
import React, { useState } from 'react';
import { Bell, X, Trash2, Info, Calendar, BellOff } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';
import { motion, AnimatePresence } from 'motion/react';

const NotificationCenter: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { subscriptions, unsubscribe, notifications, clearNotifications } = useNotifications();
  const [activeTab, setActiveTab] = useState<'alerts' | 'subscriptions'>('alerts');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end no-print">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        className="relative w-full max-w-md bg-[#022c22] border-l border-emerald-900/50 h-full shadow-2xl flex flex-col"
      >
        <div className="p-6 border-b border-emerald-900/50 flex justify-between items-center bg-[#022c22]/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/20 p-2 rounded-xl">
              <Bell className="text-emerald-400" size={20} />
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">Notifikasi</h2>
          </div>
          <button onClick={onClose} className="text-emerald-100/40 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex p-2 bg-emerald-950/40 m-4 rounded-2xl border border-emerald-900/30">
          <button 
            onClick={() => setActiveTab('alerts')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'alerts' ? 'bg-emerald-500 text-emerald-950 shadow-lg' : 'text-emerald-100/40 hover:text-emerald-100'}`}
          >
            Pesan ({notifications.length})
          </button>
          <button 
            onClick={() => setActiveTab('subscriptions')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'subscriptions' ? 'bg-emerald-500 text-emerald-950 shadow-lg' : 'text-emerald-100/40 hover:text-emerald-100'}`}
          >
            Langganan ({subscriptions.length})
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {activeTab === 'alerts' ? (
              notifications.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <button 
                      onClick={clearNotifications}
                      className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1 hover:text-emerald-400"
                    >
                      <Trash2 size={12} /> Bersihkan Semua
                    </button>
                  </div>
                  {notifications.map((note, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-emerald-900/20 border border-emerald-900/30 p-4 rounded-2xl flex gap-4"
                    >
                      <div className="bg-emerald-500/10 p-2 h-fit rounded-lg">
                        <Info className="text-emerald-500" size={16} />
                      </div>
                      <p className="text-emerald-100/80 text-sm font-medium leading-relaxed">{note}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-20">
                  <BellOff size={48} className="mb-4" />
                  <p className="font-black uppercase tracking-widest text-xs">Tidak ada pesan baru</p>
                </div>
              )
            ) : (
              subscriptions.length > 0 ? (
                <div className="space-y-4">
                  {subscriptions.map((sub) => (
                    <motion.div 
                      key={sub.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-950/60 border border-emerald-900/50 p-5 rounded-[2rem] group"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">
                          {sub.type === 'MOVIE_RELEASE' ? 'Rilis Film' : 'Pengingat Jadwal'}
                        </div>
                        <button 
                          onClick={() => unsubscribe(sub.id)}
                          className="text-emerald-100/20 hover:text-red-400 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <h4 className="text-white font-black text-lg mb-2">{sub.movieTitle}</h4>
                      {sub.schedule && (
                        <div className="flex items-center gap-2 text-emerald-100/40 text-xs font-bold">
                          <Calendar size={14} /> Jam: {sub.schedule}
                        </div>
                      )}
                      <div className="mt-4 text-[9px] text-emerald-100/20 font-black uppercase tracking-widest">
                        Didaftarkan pada {new Date(sub.timestamp).toLocaleDateString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-20">
                  <Calendar size={48} className="mb-4" />
                  <p className="font-black uppercase tracking-widest text-xs">Belum ada langganan</p>
                </div>
              )
            )}
          </AnimatePresence>
        </div>

        <div className="p-6 bg-emerald-950/40 border-t border-emerald-900/30 text-center">
          <p className="text-[10px] text-emerald-100/30 font-bold uppercase tracking-widest">
            Cxi•Cinema Notification System v1.0
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default NotificationCenter;
