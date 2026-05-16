import React, { useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { 
  PreviewCard, 
  ControlPanel, 
  Explanation, 
  ExampleGrid 
} from '../components/neumorphism/Components';
import { AdminPanel } from '../components/auth/AuthComponents';
import { useNeumorphism } from '../hooks/useNeumorphism';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { saveUserToFirestore, getUserPresets } from '../services/firestoreService';
import { useSearchParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function HomePage() {
  const { settings, updateSetting, setBulkSettings, styles } = useNeumorphism();
  const [user] = useAuthState(auth);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (user) {
      saveUserToFirestore(user);
    }
  }, [user]);

  // Load preset from URL
  useEffect(() => {
    const presetId = searchParams.get('preset');
    if (presetId) {
      const loadPreset = async () => {
        try {
          const docRef = doc(db, 'presets', presetId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setBulkSettings(data.settings);
          }
        } catch (error) {
          console.error("Error loading preset:", error);
        }
      };
      loadPreset();
    }
  }, [searchParams, setBulkSettings]);

  return (
    <div style={{ backgroundColor: settings.color }} className="min-h-screen transition-colors duration-500">
      <MainLayout
        isDarkMode={settings.isDarkMode}
        settings={settings}
        preview={<PreviewCard styles={styles} settings={settings} />}
        controls={<ControlPanel settings={settings} updateSetting={updateSetting} setBulkSettings={setBulkSettings} styles={styles} />}
        explanation={
          <div className="space-y-12">
            <Explanation />
            {user && <AdminPanel />}
          </div>
        }
        examples={<ExampleGrid />}
      />
    </div>
  );
}
