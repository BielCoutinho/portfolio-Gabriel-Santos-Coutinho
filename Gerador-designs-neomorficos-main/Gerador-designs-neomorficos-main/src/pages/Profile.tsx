import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Palette, Trash2, ExternalLink, User, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getUserPresets, deletePreset, type DesignPreset } from '../services/firestoreService';

export default function ProfilePage() {
  const [user, loading] = useAuthState(auth);
  const [presets, setPresets] = useState<DesignPreset[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (user) {
      fetchPresets();
    }
  }, [user]);

  const fetchPresets = async () => {
    if (!user) return;
    setIsFetching(true);
    try {
      const data = await getUserPresets(user.uid);
      setPresets(data);
    } catch (error) {
      console.error("Fetch Presets Error:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Deseja realmente excluir este design?")) {
      await deletePreset(id);
      setPresets(prev => prev.filter(p => p.id !== id));
    }
  };

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
    <div className="min-h-screen p-6 md:p-12 lg:p-20 max-w-6xl mx-auto space-y-12">
      <header className="flex justify-between items-center">
        <Link to="/" className="neu-convex bg-base p-4 rounded-2xl text-slate-600 hover:text-slate-800 transition-all flex items-center gap-2 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest hidden sm:inline">Voltar ao Gerador</span>
        </Link>
        <h1 className="text-2xl font-black tracking-tighter text-slate-800">Seu Perfil</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 items-start">
        {/* Avatar Sidebar */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="neu-convex bg-base p-10 rounded-[48px] flex flex-col items-center gap-8"
        >
          <div className="w-32 h-32 rounded-full neu-concave p-1.5 overflow-hidden">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center">
                <User className="w-12 h-12 text-slate-400" />
              </div>
            )}
          </div>
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">{user.displayName}</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{user.email}</p>
          </div>
          
          <div className="w-full h-px bg-slate-400/10" />
          
          <div className="w-full space-y-5">
            <div className="flex items-center gap-3 text-slate-600">
              <Calendar className="w-4 h-4 opacity-50" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Membro desde 2026</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <Palette className="w-4 h-4 opacity-50" />
              <span className="text-[10px] font-bold uppercase tracking-widest">{presets.length} Designs Salvos</span>
            </div>
          </div>
        </motion.section>

        {/* Saved Designs List */}
        <motion.section 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-10"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-[4px] text-slate-300">Coleção de Designs</h3>
            <button onClick={fetchPresets} className="text-[10px] font-bold uppercase tracking-widest text-blue-500 hover:text-blue-600 transition-colors">Atualizar</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {presets.length === 0 && !isFetching && (
                <div className="col-span-full p-20 neu-concave rounded-[40px] text-center space-y-4">
                  <Palette className="w-12 h-12 mx-auto opacity-10" />
                  <p className="text-sm text-slate-400 font-medium">Você ainda não salvou nenhum design.</p>
                </div>
              )}
              
              {presets.map((preset) => (
                <motion.div
                  key={preset.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="neu-convex bg-base p-6 rounded-[32px] space-y-6 group"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-800 tracking-tight">{preset.name}</h4>
                    <span className={`text-[9px] font-bold uppercase py-1 px-2 rounded-lg ${preset.isPublic ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
                      {preset.isPublic ? 'Público' : 'Privado'}
                    </span>
                  </div>
                  
                  <div className="aspect-video rounded-2xl overflow-hidden neu-concave flex items-center justify-center" style={{ backgroundColor: preset.settings.color }}>
                     <div 
                       style={{
                         width: '60px',
                         height: '60px',
                         borderRadius: `${(preset.settings.radius / preset.settings.size) * 60}px`,
                         background: preset.settings.color,
                         boxShadow: `6px 6px 12px rgba(0,0,0,0.1), -6px -6px 12px rgba(255,255,255,0.7)` 
                       }}
                     />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button 
                      onClick={() => handleDelete(preset.id!)}
                      className="p-3 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <Link 
                      to={`/?preset=${preset.id}`}
                      className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[2px] bg-slate-800 text-white px-5 py-3 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-slate-900/20"
                    >
                      Editar <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
