import { MoleculeCanvas } from './components/3D/MoleculeCanvas';
import { ExplorerOverlay } from './components/UI/ExplorerOverlay';
import { CompareDeck } from './components/UI/CompareDeck';
import { Suspense } from 'react';
import styles from './MolecularExplorer.module.css';

export const MolecularExplorer = () => {
  return (
    <div className={styles.explorerContainer}>
      {/* Ambient glow orbs */}
      <div className={styles.glowOrb1} />
      <div className={styles.glowOrb2} />

      <Suspense
        fallback={
          <div className={styles.loadingFallback}>
            <div className={styles.loadingSpinner} />
            <span>⬡ Khởi tạo Engine 3D...</span>
          </div>
        }
      >
        <MoleculeCanvas />
      </Suspense>

      <ExplorerOverlay />
      <CompareDeck />
    </div>
  );
};

export default MolecularExplorer;
