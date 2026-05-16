import React from 'react';
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

export default function HomePage() {
  const { settings, updateSetting, styles } = useNeumorphism();
  const [user] = useAuthState(auth);

  return (
    <div style={{ backgroundColor: settings.color }} className="min-h-screen transition-colors duration-200">
      <MainLayout
        preview={<PreviewCard styles={styles} />}
        controls={<ControlPanel settings={settings} updateSetting={updateSetting} styles={styles} />}
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
