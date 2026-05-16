import React, { createContext, useContext } from 'react';
import { useRemoteConfig, type RemoteConfigValues } from '../hooks/useRemoteConfig';

const RemoteConfigContext = createContext<{ config: RemoteConfigValues; loading: boolean } | undefined>(undefined);

export const RemoteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const remoteConfigData = useRemoteConfig();

  return (
    <RemoteConfigContext.Provider value={remoteConfigData}>
      {children}
    </RemoteConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(RemoteConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a RemoteConfigProvider');
  }
  return context;
};
