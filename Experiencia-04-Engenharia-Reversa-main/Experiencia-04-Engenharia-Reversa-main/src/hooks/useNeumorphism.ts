import { useState, useMemo } from 'react';

export interface NeumorphismSettings {
  size: number;
  radius: number;
  distance: number;
  intensity: number;
  blur: number;
  color: string;
  shape: 'flat' | 'concave' | 'convex' | 'pressed';
  lightSource: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export function useNeumorphism() {
  const [settings, setSettings] = useState<NeumorphismSettings>({
    size: 280,
    radius: 50,
    distance: 20,
    intensity: 0.15,
    blur: 60,
    color: '#e0e0e0',
    shape: 'flat',
    lightSource: 'top-left',
  });

  const updateSetting = (key: keyof NeumorphismSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const colors = useMemo(() => {
    const color = settings.color;
    
    // Simple helper to adjust color brightness
    const adjust = (color: string, amount: number) => {
      const hex = color.replace('#', '');
      const num = parseInt(hex, 16);
      let r = (num >> 16) + amount;
      let g = ((num >> 8) & 0x00ff) + amount;
      let b = (num & 0x0000ff) + amount;

      r = Math.min(255, Math.max(0, r));
      g = Math.min(255, Math.max(0, g));
      b = Math.min(255, Math.max(0, b));

      return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
    };

    // Calculate light and dark colors based on intensity (0 to 1)
    // 0 intensity means shadows are same as bg
    // 1 intensity means maximum contrast (white/black)
    const light = adjust(color, Math.round(settings.intensity * 255));
    const dark = adjust(color, Math.round(-settings.intensity * 255));

    return { light, dark };
  }, [settings.color, settings.intensity]);

  const styles = useMemo(() => {
    const { distance, blur, shape, lightSource, radius, color } = settings;
    const { light, dark } = colors;

    let shadowX = distance;
    let shadowY = distance;

    if (lightSource === 'top-right') {
      shadowX = -distance;
      shadowY = distance;
    } else if (lightSource === 'bottom-left') {
      shadowX = distance;
      shadowY = -distance;
    } else if (lightSource === 'bottom-right') {
      shadowX = -distance;
      shadowY = -distance;
    }

    const shadow1 = `${shadowX}px ${shadowY}px ${blur}px ${dark}`;
    const shadow2 = `-${shadowX}px -${shadowY}px ${blur}px ${light}`;
    
    let background = color;
    let boxShadow = `${shadow1}, ${shadow2}`;

    if (shape === 'concave') {
      background = `linear-gradient(145deg, ${dark}, ${light})`;
    } else if (shape === 'convex') {
      background = `linear-gradient(145deg, ${light}, ${dark})`;
    } else if (shape === 'pressed') {
      boxShadow = `inset ${shadow1}, inset ${shadow2}`;
    }

    return {
      borderRadius: `${radius}px`,
      background,
      boxShadow,
      width: `${settings.size}px`,
      height: `${settings.size}px`,
    };
  }, [settings, colors]);

  return {
    settings,
    updateSetting,
    styles,
    colors
  };
}
