import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ScreenView } from './types/route.types';
import { CoverScreen } from './components/cover/CoverScreen';
import { InteractiveMap } from './components/map/InteractiveMap';
import { OrientationGuard } from './components/ui/OrientationGuard';

export default function App() {
  const [currentView, setCurrentView] = useState<ScreenView>('cover');

  return (
    <OrientationGuard>
      <main className="w-screen h-dvh bg-[#cbe8f5] overflow-hidden font-sans select-none">
        <AnimatePresence mode="wait">
          {currentView === 'cover' ? (
            <motion.div
              key="cover-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="w-full h-full"
            >
              <CoverScreen onStart={() => setCurrentView('map')} />
            </motion.div>
          ) : (
            <motion.div
              key="map-view"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="w-full h-full"
            >
              <InteractiveMap onBackToCover={() => setCurrentView('cover')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </OrientationGuard>
  );
}
