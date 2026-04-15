
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Layout, Film, User, ShieldCheck, Home as HomeIcon, LogOut, Instagram, Mail, Coffee, Bell } from 'lucide-react';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import BookingPage from './pages/BookingPage';
import SuccessPage from './pages/SuccessPage';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import SnackBarPage from './pages/SnackBarPage';
import { Booking } from './types';
import { NotificationProvider, useNotifications } from './contexts/NotificationContext';
import NotificationCenter from './components/NotificationCenter';

const Navbar: React.FC<{ isAdmin: boolean; onLogout: () => void }> = ({ isAdmin, onLogout }) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const { notifications } = useNotifications();

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#022c22]/90 backdrop-blur-md border-b border-emerald-900/50 py-4 px-6 no-print">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-emerald-500 p-2 rounded-lg group-hover:rotate-12 transition-transform">
              <Film className="text-emerald-950 w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
              Cxi•Cinema
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-emerald-100 hover:text-emerald-400 transition-colors flex items-center gap-1 font-bold text-sm">
              <HomeIcon size={18} /> Home
            </Link>
            <Link to="/snack-bar" className="text-emerald-100 hover:text-emerald-400 transition-colors flex items-center gap-1 font-bold text-sm">
              <Coffee size={18} /> Snack Bar
            </Link>
            
            <button 
              onClick={() => setIsNotifOpen(true)}
              className="relative text-emerald-100 hover:text-emerald-400 transition-colors p-2"
            >
              <Bell size={20} />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {notifications.length}
                </span>
              )}
            </button>

            {isAdmin ? (
              <div className="flex items-center gap-4">
                <Link to="/admin" className="text-emerald-100 hover:text-emerald-400 transition-colors flex items-center gap-1 font-bold text-sm">
                  <ShieldCheck size={18} /> Dashboard
                </Link>
                <button 
                  onClick={onLogout}
                  className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/20">
                <User size={18} /> Admin Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <NotificationCenter isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
};

const Footer = () => (
  <footer className="bg-[#020617] border-t border-emerald-900/30 py-12 px-6 no-print">
    <div className="max-w-7xl mx-auto flex flex-col items-center">
      <div className="flex justify-center items-center gap-2 mb-6">
        <Film className="text-emerald-500 w-5 h-5" />
        <span className="text-2xl font-bold text-emerald-100">Cxi•Cinema</span>
      </div>
      
      <div className="flex flex-wrap justify-center gap-8 mb-8">
        <div className="flex items-center gap-2 text-emerald-100/60 hover:text-emerald-400 transition-colors">
          <Instagram size={20} className="text-emerald-500" />
          <span className="font-medium">Cxi•Cinema</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-100/60 hover:text-emerald-400 transition-colors">
          <Mail size={20} className="text-emerald-500" />
          <span className="font-medium">Cxicinema@111.com</span>
        </div>
      </div>

      <div className="h-[1px] w-full max-w-xs bg-gradient-to-r from-transparent via-emerald-900/50 to-transparent mb-6"></div>

      <p className="text-emerald-100/40 text-sm">
        &copy; {new Date().getFullYear()} Project SMK Jurusan TKJ. Built for Excellence.
      </p>
    </div>
  </footer>
);

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [allBookings, setAllBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('cinemax_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cinemax_bookings', JSON.stringify(allBookings));
  }, [allBookings]);

  const handleAddBooking = (booking: Booking) => {
    setAllBookings(prev => [...prev, booking]);
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  return (
    <NotificationProvider>
      <HashRouter>
        <div className="min-h-screen bg-[#020617] text-emerald-50 flex flex-col selection:bg-emerald-500 selection:text-white">
          <Navbar isAdmin={isAdmin} onLogout={handleLogout} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/snack-bar" element={<SnackBarPage />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/book/:id" element={<BookingPage onBookingComplete={handleAddBooking} />} />
              <Route path="/success/:id" element={<SuccessPage bookings={allBookings} />} />
              <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
              <Route path="/admin" element={<AdminDashboard bookings={allBookings} />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </NotificationProvider>
  );
}

export default App;
