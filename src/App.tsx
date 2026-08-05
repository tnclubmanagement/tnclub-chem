import { AnimatePresence, motion } from 'framer-motion';
import { PeriodicTableModule as PeriodicTable, ElementPanel, Sidebar, useChemStore } from './modules/PeriodicTable';

import { MolecularExplorer } from './modules/MolecularExplorer/MolecularExplorer';
import { VirtualLab } from './modules/VirtualLab';
import { AcademyScreen } from './modules/Academy/AcademyScreen';
import { SettingsScreen } from './modules/Settings';
import { Breadcrumb } from './components/Breadcrumb/Breadcrumb';
import { GlobalSearchModal } from './components/GlobalSearch';
import { HomeScreen } from './modules/Home/HomeScreen';
import { useUrlSync } from './hooks/useUrlSync';
import './App.css';

const PAGE_TRANSITION = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const } },
  exit:    { opacity: 0, scale: 1.01, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] as const } },
};

function App() {
  const { activeView } = useChemStore();
  useUrlSync();

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'var(--bg-deep)' }}>
      {/* Global Search Modal Command Palette */}
      <GlobalSearchModal />

      {/* Animated view transitions */}
      <AnimatePresence mode="wait">
        {activeView === 'home' && (
          <motion.div key="home" style={{ position: 'absolute', inset: 0, zIndex: 1 }} {...PAGE_TRANSITION}>
            <HomeScreen />
          </motion.div>
        )}
        {activeView === 'explorer' && (
          <motion.div key="explorer" style={{ position: 'absolute', inset: 0, zIndex: 1 }} {...PAGE_TRANSITION}>
            <MolecularExplorer />
          </motion.div>
        )}
        {activeView === 'virtual-lab' && (
          <motion.div key="virtual-lab" style={{ position: 'absolute', inset: 0, zIndex: 1 }} {...PAGE_TRANSITION}>
            <VirtualLab />
          </motion.div>
        )}
        {activeView === 'academy' && (
          <motion.div key="academy" style={{ position: 'absolute', inset: 0, zIndex: 1 }} {...PAGE_TRANSITION}>
            <AcademyScreen />
          </motion.div>
        )}
        {activeView === 'settings' && (
          <motion.div key="settings" style={{ position: 'absolute', inset: 0, zIndex: 1 }} {...PAGE_TRANSITION}>
            <SettingsScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* UI Overlay — Sidebar + Breadcrumb always on top */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none' }}>
        <Sidebar />
        {activeView !== 'home' && <Breadcrumb />}
        {activeView === 'periodic-table' && <PeriodicTable />}

        {activeView === 'periodic-table' && <ElementPanel />}
      </div>
    </div>
  );
}

export default App;
