import { PeriodicTableModule as PeriodicTable, ElementPanel, Sidebar, useChemStore } from './modules/PeriodicTable';
import { LessonView } from './modules/BondModels';
import { MolecularExplorer } from './modules/MolecularExplorer/MolecularExplorer';
import { VirtualLab } from './modules/VirtualLab';
import { Breadcrumb } from './components/Breadcrumb/Breadcrumb';
import { useUrlSync } from './hooks/useUrlSync';
import './App.css'; // Vite default styles, we can clean it up later if needed

function App() {
  const { activeView } = useChemStore();
  useUrlSync();

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#050508' }}>
      {/* 3D Main Canvas will go here later */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        {activeView === 'explorer' && <MolecularExplorer />}
        {activeView === 'virtual-lab' && <VirtualLab />}
      </div>

      {/* UI Overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none' }}>
        <Sidebar />
        <Breadcrumb />
        {activeView === 'periodic-table' && <PeriodicTable />}
        {activeView === 'lesson' && <LessonView />}
        {activeView === 'periodic-table' && <ElementPanel />}
      </div>
    </div>
  );
}

export default App;
