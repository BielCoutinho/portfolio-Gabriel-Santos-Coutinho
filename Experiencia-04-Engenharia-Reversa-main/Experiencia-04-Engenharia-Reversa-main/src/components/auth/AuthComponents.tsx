import React from 'react';
import { auth, googleProvider } from '../../lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LogIn, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AuthStatus = () => {
  const [user, loading] = useAuthState(auth);

  const login = () => signInWithPopup(auth, googleProvider);
  const logout = () => signOut(auth);

  if (loading) return <div className="w-10 h-10 neu-concave rounded-full animate-pulse" />;

  if (!user) {
    return (
      <button 
        onClick={login}
        className="neu-convex bg-base p-2 rounded-full text-slate-600 hover:text-blue-500 transition-colors"
        title="Login with Google"
      >
        <LogIn className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-end hidden sm:flex">
        <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">{user.displayName}</span>
        <div className="flex gap-2">
          <Link to="/profile" className="text-[9px] text-blue-500 hover:text-blue-600 font-bold uppercase transition-colors">Perfil</Link>
          <button onClick={logout} className="text-[9px] text-slate-400 hover:text-rose-500 font-bold uppercase transition-colors">Logout</button>
        </div>
      </div>
      <Link to="/profile" className="w-10 h-10 rounded-full neu-convex p-0.5 overflow-hidden block hover:scale-105 transition-transform">
        {user.photoURL ? (
          <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-slate-400" />
          </div>
        )}
      </Link>
    </div>
  );
};

export const AdminPanel = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-base font-bold uppercase tracking-[1px] text-slate-800">Admin & Config</h3>
      <div className="grid grid-cols-1 gap-4">
        <div className="neu-concave bg-base/50 p-4 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-600">
            <span>System Status</span>
            <span className="text-emerald-500">Online</span>
          </div>
          <p className="text-[10px] text-slate-400">Database ID: ai-studio-8d451f9c-...</p>
        </div>
        
        <button className="neu-convex bg-base py-3 px-4 rounded-xl text-left hover:scale-[1.02] transition-transform">
          <span className="text-xs font-bold text-slate-700 block">Manage Presets</span>
          <span className="text-[10px] text-slate-400 italic">Configure public design gallery</span>
        </button>
        
        <button className="neu-convex bg-base py-3 px-4 rounded-xl text-left hover:scale-[1.02] transition-transform">
          <span className="text-xs font-bold text-slate-700 block">User Reports</span>
          <span className="text-[10px] text-slate-400 italic">View system usage and analytics</span>
        </button>
      </div>
    </div>
  );
};
