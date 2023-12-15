import React, { createContext, useContext, useEffect, useState } from "react";
import CacheManager from "../components/cacheManager";
import LMap from "../components/Map2";

// Erstellen des Contexts
const CacheManagerContext = createContext(null);

interface CacheProps {
    isHiding: boolean;
  }

export const CacheManagerProvider:<CacheProps> = ({ children, isHiding }) => {
  const [cacheManager, setCacheManager] = useState(null);

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

// Anwendung des Providers in Ihrer Hauptkomponente
function App() {
  return (
    <CacheManagerProvider isHiding={isHiding}>
      {<LMap isHiding={isHiding}></LMap>}
    </CacheManagerProvider>
  );
}
