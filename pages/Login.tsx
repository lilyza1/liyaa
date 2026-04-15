
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Eye, EyeOff, Lock } from 'lucide-react';

const Login: React.FC<{ setIsAdmin: (val: boolean) => void }> = ({ setIsAdmin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock logic for demonstration
    if (username === 'admin' && password === 'smktkj') {
      setIsAdmin(true);
      navigate('/admin');
    } else {
      alert('Invalid credentials (Try admin/smktkj)');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-[#062c2d]/40 border border-emerald-900/50 rounded-[2.5rem] p-10 backdrop-blur-xl shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-emerald-400 rotate-12">
            <Lock size={36} />
          </div>
          <h1 className="text-3xl font-black mb-2">Admin Portal</h1>
          <p className="text-emerald-100/50">Restricted access for cinema staff</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-emerald-500 uppercase mb-2 tracking-widest">Username</label>
            <input 
              required
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-emerald-950/50 border border-emerald-900 focus:border-emerald-500 outline-none rounded-2xl px-5 py-4 text-emerald-50 transition-all"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-emerald-500 uppercase mb-2 tracking-widest">Password</label>
            <div className="relative">
              <input 
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-emerald-950/50 border border-emerald-900 focus:border-emerald-500 outline-none rounded-2xl px-5 py-4 pr-14 text-emerald-50 transition-all"
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-100/30 hover:text-emerald-400 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-amber-500/70 bg-amber-500/5 p-3 rounded-lg border border-amber-500/10">
            <ShieldAlert size={14} />
            Only authorized personnel can access dashboard.
          </div>

          <button 
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-emerald-950 flex items-center justify-center gap-2 group"
          >
            Authenticate <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
