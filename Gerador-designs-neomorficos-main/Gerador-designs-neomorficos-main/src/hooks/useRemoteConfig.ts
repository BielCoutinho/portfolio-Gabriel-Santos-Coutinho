import { useState, useEffect } from 'react';
import { fetchAndActivate, getValue } from 'firebase/remote-config';
import { remoteConfig } from '../lib/firebase';

export interface RemoteConfigValues {
  welcomeMessage: string;
  accentColor: string;
  showPromo: boolean;
  aiModelName: string;
}

const DEFAULT_VALUES: RemoteConfigValues = {
  welcomeMessage: 'Bem-vindo ao NeuStudio',
  accentColor: '#3b82f6',
  showPromo: false,
  aiModelName: 'Gemini 1.5 Flash',
};

export function useRemoteConfig() {
  const [config, setConfig] = useState<RemoteConfigValues>(DEFAULT_VALUES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!remoteConfig) {
      setLoading(false);
      return;
    }

    // Set settings (optional, but good for local dev)
    remoteConfig.settings.minimumFetchIntervalMillis = 3600000; // 1 hour
    if (process.env.NODE_ENV !== 'production') {
      remoteConfig.settings.minimumFetchIntervalMillis = 0; // Fetch immediately in dev
    }

    const initConfig = async () => {
      try {
        await fetchAndActivate(remoteConfig);
        
        setConfig({
          welcomeMessage: getValue(remoteConfig, 'welcome_message').asString() || DEFAULT_VALUES.welcomeMessage,
          accentColor: getValue(remoteConfig, 'accent_color').asString() || DEFAULT_VALUES.accentColor,
          showPromo: getValue(remoteConfig, 'show_promo').asBoolean(),
          aiModelName: getValue(remoteConfig, 'ai_model_name').asString() || DEFAULT_VALUES.aiModelName,
        });
      } catch (error) {
        console.error("Remote Config Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    initConfig();
  }, []);

  return { config, loading };
}
