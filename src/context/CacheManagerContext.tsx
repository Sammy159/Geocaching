import { createContext, useContext, useEffect, useState } from "react";
import CacheManager from "../components/CacheManager";

const CacheManagerContext = createContext<CacheManager | null>(null);

export const CacheManagerProvider = ({ children }: any) => {
  const [cacheManager, setCacheManager] = useState<CacheManager | null>(null);

  useEffect(() => {
    const cm = new CacheManager();
    setCacheManager(cm);
  }, []);

  // Hier wird überprüft, ob der cacheManager initialisiert ist, bevor er children rendert
  if (cacheManager === null) {
    // Hier könnten Sie eine Ladeanzeige oder eine andere Art von Warteindikator anzeigen
    return <div>Loading...</div>;
  }

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
