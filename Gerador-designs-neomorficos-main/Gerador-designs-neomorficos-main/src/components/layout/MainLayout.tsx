import React, { useState } from 'react';
import { AuthStatus } from '../auth/AuthComponents';
import { Link } from 'react-router-dom';
import { saveDesignPreset } from '../../services/firestoreService';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../lib/firebase';
import type { NeumorphismSettings } from '../../hooks/useNeumorphism';
import { useConfig } from '../../context/RemoteConfigContext';
import { Sparkles } from 'lucide-react';

interface MainLayoutProps {
  preview: React.ReactNode;
  controls: React.ReactNode;
  explanation: React.ReactNode;
  examples: React.ReactNode;
  isDarkMode?: boolean;
  settings?: NeumorphismSettings;
}

export const MainLayout = ({ preview, controls, explanation, examples, isDarkMode, settings }: MainLayoutProps) => {
  const [user] = useAuthState(auth);
  const { config } = useConfig();
  const [isSaving, setIsSaving] = useState(false);
  const textColor = isDarkMode ? 'text-white' : 'text-slate-800';
  const mutedTextColor = isDarkMode ? 'text-slate-400' : 'text-slate-500';

  const accentStyle = { color: config.accentColor };
  const accentBgStyle = { backgroundColor: config.accentColor };

  const handleSave = async () => {
    if (!user) {
      alert("Faça login para salvar seus designs!");
      return;
    }
    if (!settings) return;

    const name = prompt("Dê um nome ao seu design:");
    if (!name) return;

    setIsSaving(true);
    try {
      await saveDesignPreset(name, settings, user.uid);
      alert("Design salvo com sucesso!");
    } catch (error) {
      console.error("Save Error:", error);
      alert("Erro ao salvar design. Verifique o console.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${textColor} transition-colors duration-500`}>
      {config.showPromo && (
        <div 
          style={accentBgStyle}
          className="py-2 text-center text-[10px] font-bold uppercase tracking-[3px] text-white animate-pulse"
        >
          {config.welcomeMessage}
        </div>
      )}
      <header className="px-6 lg:px-20 py-8 flex justify-between items-center bg-transparent backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link to="/" className={`text-2xl font-black tracking-tighter ${textColor} hover:opacity-80 transition-opacity`}>NeuStudio</Link>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-white/5">
            <Sparkles className="w-3 h-3" style={accentStyle} />
            <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">{config.aiModelName}</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`bg-transparent px-5 py-2.5 rounded-2xl font-bold text-[11px] uppercase tracking-[2px] border ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-slate-800/10 hover:bg-slate-800/5'} transition-all active:scale-95 cursor-pointer ${isSaving ? 'opacity-50' : ''}`}
          >
            {isSaving ? 'Saving...' : 'Save Design'}
          </button>
          <AuthStatus />
        </div>
      </header>

      <main className="flex-grow px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 max-w-[1600px] mx-auto w-full">
        {/* Left Side: Preview */}
        <section className="flex justify-center items-center min-h-[500px]">
          {preview}
        </section>

        {/* Right Side: Controls */}
        <section className={`p-10 rounded-[40px] flex flex-col gap-6 ${isDarkMode ? 'bg-white/5 backdrop-blur-md border border-white/10' : 'bg-white/40 backdrop-blur-md border border-white/60 shadow-2xl shadow-slate-200/50'}`}>
          {controls}
        </section>
      </main>

      {/* Bottom Section */}
      <footer className="px-6 lg:px-20 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-[1600px] mx-auto w-full border-t border-white/5 mt-10">
        <section className="max-w-xl">
          {explanation}
        </section>
        <section className="flex flex-col gap-8">
          <label className={`text-[11px] font-bold uppercase tracking-[3px] ${mutedTextColor}`}>Presets & Examples</label>
          {examples}
        </section>
      </footer>
    </div>
  );
};
