import { useState, useEffect, useMemo, type CSSProperties, type FormEvent, type ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { 
  Play, Power, Heart, Plus, Search, Settings, User, 
  Sparkles, Moon, Sun, Loader2, Image as ImageIcon, 
  Upload, Trash2 
} from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../lib/firebase';
import { uploadUserBackground } from '../../services/storageService';
import type { NeumorphismSettings } from '../../hooks/useNeumorphism';
import { processDesignCommand } from '../../services/geminiService';
import { getPublicPresets, type DesignPreset } from '../../services/firestoreService';
import { useNavigate } from 'react-router-dom';

interface PreviewCardProps {
  styles: CSSProperties;
  settings: NeumorphismSettings;
}

export const PreviewCard = ({ styles, settings }: PreviewCardProps) => {
  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[500px] rounded-[60px] overflow-hidden">
      {/* Studio Background */}
      {settings.bgImage ? (
        <img 
          src={settings.bgImage} 
          alt="Studio Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 brightness-75 transition-opacity duration-700"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)]" />
      )}
      
      <motion.div 
        layout
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={styles}
        className="transition-all duration-300 relative z-10"
      />
    </div>
  );
};

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (val: number) => void;
  unit?: string;
}

const RealSlider = ({ label, value, min, max, onChange, unit = '' }: SliderProps) => (
  <div className="flex flex-col gap-3 group">
    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[2px] opacity-40 group-hover:opacity-70 transition-opacity">
      <span>{label}</span>
      <span className="font-mono">{value}{unit}</span>
    </div>
    <div className="relative h-1.5 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
      <input 
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full h-full appearance-none cursor-pointer bg-transparent accent-slate-800 dark:accent-white"
      />
    </div>
  </div>
);

interface ControlPanelProps {
  settings: NeumorphismSettings;
  updateSetting: (key: keyof NeumorphismSettings, value: any) => void;
  setBulkSettings: (newSettings: Partial<NeumorphismSettings>) => void;
  styles: CSSProperties;
}

export const ControlPanel = ({ settings, updateSetting, setBulkSettings, styles }: ControlPanelProps) => {
  const [user] = useAuthState(auth);
  const [command, setCommand] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const cssCode = `border-radius: ${styles.borderRadius};
background: ${styles.background};
box-shadow: ${styles.boxShadow};`;

  const handleAICommand = async (e: FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;
    
    setIsProcessing(true);
    const result = await processDesignCommand(command, settings);
    setBulkSettings(result);
    setCommand('');
    setIsProcessing(false);
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Arquivo muito grande. O limite é 5MB.");
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadUserBackground(user.uid, file);
      updateSetting('bgImage', url);
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Erro ao fazer upload da imagem.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-8">
      {/* AI Assistant - Header section for functional minimalism */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold uppercase tracking-[2px] text-slate-400">AI Designer</label>
          <button 
            onClick={() => updateSetting('isDarkMode', !settings.isDarkMode)}
            className={`p-2 rounded-xl transition-all ${settings.isDarkMode ? 'bg-slate-700 text-yellow-400' : 'bg-slate-200 text-slate-600'}`}
          >
            {settings.isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
        <form onSubmit={handleAICommand} className="relative group">
          <input 
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            disabled={isProcessing}
            placeholder="Ex: 'Torne azul escuro com bordas suaves'..."
            className={`w-full bg-slate-800/5 py-4 pl-12 pr-4 rounded-2xl text-sm border border-slate-200/50 focus:outline-none focus:ring-2 focus:ring-slate-800/10 transition-all ${settings.isDarkMode ? 'text-white border-white/10' : 'text-slate-800'}`}
          />
          <Sparkles className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isProcessing ? 'animate-pulse text-yellow-500' : 'text-slate-400'}`} />
          {isProcessing && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-slate-400" />}
        </form>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <RealSlider 
          label="Tamanho" 
          value={settings.size} 
          min={50} 
          max={400} 
          unit="px"
          onChange={(v) => updateSetting('size', v)} 
        />
        <RealSlider 
          label="Raio" 
          value={settings.radius} 
          min={0} 
          max={Math.round(settings.size / 2)} 
          unit="px"
          onChange={(v) => updateSetting('radius', v)} 
        />
        <RealSlider 
          label="Distância" 
          value={settings.distance} 
          min={0} 
          max={50} 
          unit="px"
          onChange={(v) => updateSetting('distance', v)} 
        />
        <RealSlider 
          label="Intensidade" 
          value={Math.round(settings.intensity * 100)} 
          min={1} 
          max={30} 
          unit="%"
          onChange={(v) => updateSetting('intensity', v / 100)} 
        />
        <RealSlider 
          label="Blur" 
          value={settings.blur} 
          min={0} 
          max={100} 
          unit="px"
          onChange={(v) => updateSetting('blur', v)} 
        />
        
        <div className="flex flex-col gap-3">
          <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40">Base Color</label>
          <div className="flex gap-4 items-center">
            <div className="relative w-10 h-10 rounded-2xl overflow-hidden border border-white/20 shadow-xl shadow-black/5 active:scale-95 transition-transform">
              <input 
                type="color" 
                value={settings.color}
                onChange={(e) => updateSetting('color', e.target.value)}
                className="absolute inset-[-50%] w-[200%] h-[200%] cursor-pointer border-none bg-transparent"
              />
            </div>
            <span className="text-sm font-mono opacity-50">{settings.color.toUpperCase()}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40">Background Studio</label>
          <div className="flex gap-3">
            {!settings.bgImage ? (
              <label className="flex-grow flex items-center justify-center gap-3 h-12 rounded-2xl border-2 border-dashed border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-colors cursor-pointer group">
                {isUploading ? (
                  <Loader2 className="w-5 h-5 animate-spin opacity-50" />
                ) : (
                  <>
                    <Upload className="w-4 h-4 opacity-40 group-hover:opacity-70 transition-opacity" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Upload Context</span>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" disabled={isUploading || !user} />
              </label>
            ) : (
              <div className="flex-grow flex items-center gap-4 bg-black/5 dark:bg-white/5 p-2 rounded-2xl">
                <img src={settings.bgImage} className="w-10 h-10 rounded-lg object-cover" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 flex-grow truncate">Personal Image</span>
                <button 
                  onClick={() => updateSetting('bgImage', undefined)}
                  className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
            {!user && !settings.bgImage && (
              <div className="text-[9px] font-medium text-amber-600 flex items-center px-2">Faça login para upload</div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40">Surface Shape</label>
        <div className="grid grid-cols-4 gap-3">
          {(['flat', 'concave', 'convex', 'pressed'] as const).map((s) => (
            <button
              key={s}
              onClick={() => updateSetting('shape', s)}
              className={`py-3 px-1 rounded-xl text-[10px] font-bold uppercase transition-all border ${
                settings.shape === s 
                  ? 'bg-slate-800 text-white border-slate-800 shadow-lg scale-[1.02]' 
                  : `border-white/20 hover:border-slate-400 ${settings.isDarkMode ? 'bg-white/5 text-slate-300' : 'bg-base text-slate-500'}`
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-auto relative group">
        <label className="text-[10px] font-bold uppercase tracking-[2px] opacity-40 mb-3 block">CSS Code</label>
        <div className={`p-6 rounded-[32px] font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap select-all transition-all relative ${settings.isDarkMode ? 'bg-black/40 text-emerald-400 border border-white/5 shadow-inner' : 'bg-slate-800 text-emerald-400 shadow-2xl shadow-slate-900/40'}`}>
          {cssCode}
          <button 
            onClick={() => navigator.clipboard.writeText(cssCode)}
            className="absolute top-4 right-4 p-2 text-slate-500 hover:text-emerald-400 transition-colors"
            title="Copy to clipboard"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 012-2v-8a2 2 0 01-2-2h-8a2 2 0 01-2 2v8a2 2 0 012 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export const Explanation = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-sm font-bold uppercase tracking-[4px] opacity-80">Design Philosophy</h3>
      <div className="space-y-5 text-sm leading-relaxed opacity-60 font-light">
        <p>
          NeuStudio foca no <strong>minimalismo funcional</strong>. Neumorfismo não é apenas sobre sombras; é sobre criar uma linguagem tátil que respeita a usabilidade moderna.
        </p>
        <p>
          Nosso motor utiliza cálculos precisos de luminância para garantir que as sombras permaneçam suaves e realistas. Agora com suporte a <strong>Cloud Storage</strong>, você pode fazer upload de contextos reais para testar seus designs em cenários autênticos.
        </p>
      </div>
    </div>
  );
};

export const ExampleGrid = () => {
  const [publicPresets, setPublicPresets] = useState<DesignPreset[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getPublicPresets();
        setPublicPresets(data);
      } catch (e) {
        console.error("Public Presets Error:", e);
      }
    };
    fetch();
  }, []);

  const placeholders = [
    { name: 'Studio Player', icon: <Play className="w-5 h-5 ml-1 opacity-80" />, type: 'convex' },
    { name: 'Soft Toggle', icon: <div className="w-24 h-10 rounded-full neu-concave relative flex items-center px-1"><div className="w-8 h-8 rounded-full bg-slate-800 dark:bg-white shadow-xl" /></div>, type: 'concave' },
    { name: 'Heart React', icon: <Heart className="w-6 h-6 fill-rose-500" />, type: 'convex' },
    { name: 'Premium UX', icon: <div className="absolute inset-x-0 bottom-0 h-16 glass dark:glass-dark flex items-center justify-center text-[10px] font-bold uppercase tracking-widest">Minimal</div>, type: 'convex' }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {publicPresets.length > 0 ? (
        publicPresets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => navigate(`/?preset=${preset.id}`)}
            className="aspect-square rounded-[40px] neu-convex flex flex-col items-center justify-center gap-4 p-6 hover:scale-[1.02] transition-transform text-center"
            style={{ backgroundColor: preset.settings.color }}
          >
            <div 
              style={{
                width: '60px',
                height: '60px',
                borderRadius: `${(preset.settings.radius / preset.settings.size) * 60}px`,
                background: preset.settings.color,
                boxShadow: `8px 8px 16px rgba(0,0,0,0.1), -8px -8px 16px rgba(255,255,255,0.7)` 
              }}
            />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{preset.name}</span>
          </button>
        ))
      ) : (
        placeholders.map((p, i) => (
          <div key={i} className="aspect-square rounded-[40px] neu-convex flex flex-col items-center justify-center gap-6 p-4">
            {i === 0 && (
              <>
                <div className="w-14 h-14 rounded-full neu-convex flex items-center justify-center">{p.icon}</div>
                <div className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full relative">
                  <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-800 dark:bg-white neu-convex" />
                </div>
              </>
            )}
            {i === 1 && p.icon}
            {i === 2 && <div className="w-16 h-16 rounded-2xl neu-convex flex items-center justify-center">{p.icon}</div>}
            {i === 3 && (
              <div className="w-full h-full relative overflow-hidden flex flex-col gap-4 p-5">
                <div className="flex justify-between items-center opacity-70"><User className="w-4 h-4" /><Settings className="w-4 h-4" /></div>
                <div className="flex-grow flex flex-col justify-end gap-2">
                  <div className="h-1.5 w-full bg-black/5 dark:bg-white/5 rounded-full" />
                  <div className="h-1.5 w-2/3 bg-black/5 dark:bg-white/5 rounded-full" />
                </div>
                {p.icon}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};
