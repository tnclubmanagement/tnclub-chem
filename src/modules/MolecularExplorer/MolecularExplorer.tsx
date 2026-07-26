import { MoleculeCanvas } from './components/3D/MoleculeCanvas';
import { ExplorerOverlay } from './components/UI/ExplorerOverlay';
import { Suspense } from 'react';

export const MolecularExplorer = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#050505', overflow: 'hidden' }}>
      <Suspense fallback={<div style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>Loading 3D Engine...</div>}>
        <MoleculeCanvas />
      </Suspense>
      <ExplorerOverlay />
    </div>
  );
};

export default MolecularExplorer;
