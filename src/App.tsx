import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ScreenView } from './types/route.types';
import { CoverScreen } from './components/cover/CoverScreen';
import { InteractiveMap } from './components/map/InteractiveMap';
import { MetaScreen } from './components/meta/MetaScreen';
import { OrientationGuard } from './components/ui/OrientationGuard';

export default function App() {
  const [currentView, setCurrentView] = useState<ScreenView>('cover');

  // Sincronización con rutas #meta o /meta en el navegador
  useEffect(() => {
    const handleUrlChange = () => {
      const hash = window.location.hash.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();
      if (hash === '#meta' || pathname.endsWith('/meta')) {
        setCurrentView('meta');
      } else if (hash === '#mapa' || pathname.endsWith('/mapa')) {
        setCurrentView('map');
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const goToMap = useCallback(() => {
    window.location.hash = 'mapa';
    setCurrentView('map');
  }, []);

  const goToMeta = useCallback(() => {
    window.location.hash = 'meta';
    setCurrentView('meta');
  }, []);

  const goToCover = useCallback(() => {
    window.location.hash = '';
    setCurrentView('cover');
  }, []);

  return (
    <OrientationGuard enabled={currentView !== 'meta'}>
      <main className="w-screen h-dvh bg-[#cbe8f5] overflow-hidden font-sans select-none">
        <AnimatePresence mode="wait">
          {currentView === 'cover' && (
            <motion.div
              key="cover-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="w-full h-full"
            >
              <CoverScreen onStart={goToMap} />
            </motion.div>
          )}

          {currentView === 'map' && (
            <motion.div
              key="map-view"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="w-full h-full"
            >
              <InteractiveMap
                onBackToCover={goToCover}
                onGoToMeta={goToMeta}
              />
            </motion.div>
          )}

          {currentView === 'meta' && (
            <motion.div
              key="meta-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.35 }}
              className="w-full h-full"
            >
              <MetaScreen
                onBackToMap={goToMap}
                onRestart={goToCover}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </OrientationGuard>
  );
}
