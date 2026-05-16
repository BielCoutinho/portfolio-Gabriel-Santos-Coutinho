import React from 'react';
import { motion } from 'motion/react';
import { Play, Power, Heart, Plus, Search, Settings, User } from 'lucide-react';
import type { NeumorphismSettings } from '../../hooks/useNeumorphism';

interface PreviewCardProps {
  styles: React.CSSProperties;
}

export const PreviewCard = ({ styles }: PreviewCardProps) => {
  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[400px]">
      <motion.div 
        layout
        style={styles}
        className="transition-all duration-200"
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
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-500">
      <span>{label}</span>
      <span>{value}{unit}</span>
    </div>
    <input 
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-1.5 bg-slate-300/40 rounded-full appearance-none cursor-pointer accent-slate-800"
    />
  </div>
);

interface ControlPanelProps {
  settings: NeumorphismSettings;
  updateSetting: (key: keyof NeumorphismSettings, value: any) => void;
  styles: React.CSSProperties;
}

export const ControlPanel = ({ settings, updateSetting, styles }: ControlPanelProps) => {
  const cssCode = `border-radius: ${styles.borderRadius};
background: ${styles.background};
box-shadow: ${styles.boxShadow};`;

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="grid grid-cols-2 gap-4">
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
        
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Base Color</label>
          <div className="flex gap-2 items-center">
            <input 
              type="color" 
              value={settings.color}
              onChange={(e) => updateSetting('color', e.target.value)}
              className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer border-none bg-transparent"
            />
            <span className="text-xs font-mono text-slate-400">{settings.color.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Shape</label>
        <div className="grid grid-cols-4 gap-2">
          {(['flat', 'concave', 'convex', 'pressed'] as const).map((s) => (
            <button
              key={s}
              onClick={() => updateSetting('shape', s)}
              className={`py-2 px-1 rounded-lg text-[10px] font-bold uppercase transition-all border ${
                settings.shape === s 
                  ? 'bg-slate-800 text-white border-slate-800' 
                  : 'bg-base text-slate-500 border-white/20 neu-convex'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-auto relative group">
        <div className="absolute -top-3 left-4 bg-slate-800 text-[10px] font-bold text-white px-2 py-0.5 rounded-full z-10">CSS OUTPUT</div>
        <div className="bg-slate-800 text-emerald-400 p-5 pt-8 rounded-2xl font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap select-all shadow-xl">
          {cssCode}
        </div>
        <button 
          onClick={() => navigator.clipboard.writeText(cssCode)}
          className="absolute top-2 right-2 p-2 text-slate-500 hover:text-emerald-400 transition-colors"
          title="Copy to clipboard"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 012-2v-8a2 2 0 01-2-2h-8a2 2 0 01-2 2v8a2 2 0 012 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export const Explanation = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold uppercase tracking-[1px] text-slate-800">What is Neumorphism?</h3>
      <div className="space-y-3 text-sm leading-relaxed text-slate-500">
        <p>
          Neumorphism (ou Soft UI) é uma tendência visual que mescla cores de fundo e formas com sombras para criar elementos que parecem estar sendo "empurrados" através da superfície ou extrudados dela.
        </p>
        <p>
          É definida pelo contraste mínimo e sombras sutis, criando uma interface que parece tátil e plástica, quase como se fosse esculpida no próprio layout.
        </p>
      </div>
    </div>
  );
};

export const ExampleGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {/* Example 1: Music Controller */}
      <div className="aspect-square bg-base rounded-[40px] neu-convex flex flex-col items-center justify-center gap-4 transition-transform hover:scale-105">
        <div className="w-16 h-16 rounded-full neu-convex flex items-center justify-center text-slate-700">
          <Play className="w-6 h-6 ml-1 fill-current" />
        </div>
        <div className="w-32 h-1 bg-slate-300/50 rounded-full relative">
          <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-slate-700 neu-convex" />
        </div>
      </div>

      {/* Example 2: Toggle Switch */}
      <div className="aspect-square bg-base rounded-[40px] neu-convex flex items-center justify-center p-8 transition-transform hover:scale-105">
        <div className="w-24 h-12 rounded-full neu-concave relative flex items-center px-1">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white shadow-lg">
            <Power className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Example 3: Social Like */}
      <div className="aspect-square bg-base rounded-[40px] neu-convex flex items-center justify-center transition-transform hover:scale-105">
        <div className="w-20 h-20 rounded-2xl neu-convex flex items-center justify-center text-rose-500">
          <Heart className="w-8 h-8 fill-rose-500/20" />
        </div>
      </div>

      {/* Example 4: Glass & Soft UI Hybrid */}
      <div className="aspect-square bg-base rounded-[40px] neu-convex flex flex-col gap-4 p-6 transition-transform hover:scale-105">
        <div className="flex justify-between items-center">
          <div className="w-10 h-10 rounded-xl neu-convex flex items-center justify-center text-blue-500"><User className="w-5 h-5" /></div>
          <div className="w-10 h-10 rounded-xl neu-convex flex items-center justify-center text-slate-400"><Settings className="w-5 h-5" /></div>
        </div>
        <div className="flex-grow flex flex-col justify-end gap-2">
          <div className="h-2 w-full bg-slate-300/30 rounded-full neu-concave" />
          <div className="h-2 w-2/3 bg-slate-300/30 rounded-full neu-concave" />
        </div>
        <div className="w-full py-2 bg-blue-500 text-white text-center text-xs font-bold rounded-xl shadow-[4px_4px_10px_rgba(59,130,246,0.3)]">
          Connect
        </div>
      </div>
    </div>
  );
};
