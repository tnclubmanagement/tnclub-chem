import { AnimatePresence, motion } from 'framer-motion';
import { PeriodicTableModule as PeriodicTable, ElementPanel, Sidebar, useChemStore } from './modules/PeriodicTable';
import { LessonView } from './modules/BondModels';
import { MolecularExplorer } from './modules/MolecularExplorer/MolecularExplorer';
import { VirtualLab } from './modules/VirtualLab';
import { Breadcrumb } from './components/Breadcrumb/Breadcrumb';
import { HomeScreen } from './modules/Home/HomeScreen';
import { LanguageSwitcher } from './components/LanguageSwitcher/LanguageSwitcher';
import { useUrlSync } from './hooks/useUrlSync';
import './App.css';

const PAGE_TRANSITION = {
  initial: { opacity: 0, scale: 0.97, filter: 'blur(6px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
  exit:    { opacity: 0, scale: 1.02, filter: 'blur(4px)', transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as const } },
};

function App() {
  const { activeView } = useChemStore();
  useUrlSync();

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#03040d' }}>
      {/* Global Top-Right Language Switcher Header */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '24px',
        zIndex: 100,
        pointerEvents: 'auto',
      }}>
        <LanguageSwitcher />
      </div>

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
      </AnimatePresence>

      {/* UI Overlay — Sidebar + Breadcrumb always on top */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none' }}>
        <Sidebar />
        {activeView !== 'home' && <Breadcrumb />}
        {activeView === 'periodic-table' && <PeriodicTable />}
        {activeView === 'lesson'         && <LessonView />}
        {activeView === 'periodic-table' && <ElementPanel />}
      </div>
    </div>
  );
}

export default App;
