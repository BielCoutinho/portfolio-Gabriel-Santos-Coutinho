import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { Navigate, Link } from 'react-router-dom';
import { User, Mail, Calendar, Settings, ArrowLeft, Palette } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProfilePage() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base">
        <div className="w-12 h-12 rounded-full neu-concave animate-pulse" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen p-8 md:p-12 lg:p-20 max-w-4xl mx-auto space-y-12">
      <header className="flex justify-between items-center">
        <Link to="/" className="neu-convex bg-base p-3 rounded-xl text-slate-600 hover:text-slate-800 transition-all flex items-center gap-2 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-wider">Voltar ao Gerador</span>
        </Link>
        <h1 className="text-2xl font-black tracking-tighter text-slate-800">Meu Perfil</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12 items-start">
        {/* Avatar Sidebar */}
        <motion.section 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="neu-convex bg-base p-8 rounded-[40px] flex flex-col items-center gap-6"
        >
          <div className="w-32 h-32 rounded-full neu-concave p-1 overflow-hidden">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center">
                <User className="w-12 h-12 text-slate-400" />
              </div>
            )}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-800">{user.displayName}</h2>
            <p className="text-sm text-slate-400 font-medium">{user.email}</p>
          </div>
          
          <div className="w-full h-px bg-slate-300/30" />
          
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 text-slate-600">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Membro desde 2026</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <Palette className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">12 Designs Salvos</span>
            </div>
          </div>
        </motion.section>

        {/* Info & Stats */}
        <motion.section 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="neu-concave bg-base p-8 rounded-[40px] space-y-8">
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[2px] text-slate-400">Informações da Conta</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between p-4 neu-convex bg-base rounded-2xl">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-slate-400" />
                    <span className="text-sm font-bold text-slate-700">Nome de Exibição</span>
                  </div>
                  <span className="text-sm text-slate-400">{user.displayName}</span>
                </div>
                <div className="flex items-center justify-between p-4 neu-convex bg-base rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-slate-400" />
                    <span className="text-sm font-bold text-slate-700">E-mail</span>
                  </div>
                  <span className="text-sm text-slate-400">{user.email}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[2px] text-slate-400">Preferências</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-4">
                   <button className="flex-grow p-4 neu-convex bg-base rounded-2xl text-left hover:scale-[1.02] transition-transform flex items-center gap-3">
                     <Settings className="w-5 h-5 text-slate-400" />
                     <span className="text-sm font-bold text-slate-700">Configurações de Conta</span>
                   </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="neu-convex bg-base p-6 rounded-3xl text-center space-y-2">
              <div className="text-2xl font-black text-slate-800">24</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Designs Gerados</div>
            </div>
            <div className="neu-convex bg-base p-6 rounded-3xl text-center space-y-2">
              <div className="text-2xl font-black text-slate-800">5</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Designs Favoritos</div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
