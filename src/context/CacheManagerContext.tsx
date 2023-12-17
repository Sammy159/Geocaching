import { createContext, useContext, useEffect, useState } from "react";
import CacheManager from "../components/cacheManager";

// Definieren des Typs für den Context
const CacheManagerContext = createContext<CacheManager | null>(null);

export const CacheManagerProvider = ({ children }: any) => {
  // Definieren des Typs für useState
  const [cacheManager, setCacheManager] = useState<CacheManager | null>(null);

  useEffect(() => {
    // Initialisierung des CacheManagers
    const cm = new CacheManager();
    setCacheManager(cm);
  }, []);

  return (
    <CacheManagerContext.Provider value={cacheManager}>
      {children}
    </CacheManagerContext.Provider>
  );
};

// Hook zum Zugriff auf den CacheManager
export const useCacheManager = () => {
  return useContext(CacheManagerContext);
};
