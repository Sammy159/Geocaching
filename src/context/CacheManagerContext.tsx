import { createContext, useContext, useEffect, useState } from "react";
import CacheManager from "../components/CacheManager";

/**
 * Ein Kontext, der die CacheManager-Instanz bereitstellt.
 */
const CacheManagerContext = createContext<CacheManager | null>(null);

/**
 * Ein Provider, der die CacheManager-Instanz initialisiert und im Kontext bereitstellt.
 *
 * @param children - Die untergeordneten Komponenten, die Zugriff auf den CacheManager benötigen.
 */
export const CacheManagerProvider = ({ children }: any) => {
  const [cacheManager, setCacheManager] = useState<CacheManager | null>(null);

  useEffect(() => {
    // Initialisiere die CacheManager-Instanz
    const cm = new CacheManager();
    setCacheManager(cm);
  }, []);

  // Überprüfe, ob der cacheManager initialisiert ist, bevor die Kinder gerendert werden
  if (cacheManager === null) {
    // Hier könnte eine Ladeanzeige oder ein anderer Warteindikator angezeigt werden
    return <div>Loading...</div>;
  }

  return (
    <CacheManagerContext.Provider value={cacheManager}>
      {children}
    </CacheManagerContext.Provider>
  );
};

/**
 * Ein Hook, um auf die CacheManager-Instanz im CacheManagerContext zuzugreifen.
 *
 * @returns Die CacheManager-Instanz.
 */
export const useCacheManager = () => {
  return useContext(CacheManagerContext);
};
