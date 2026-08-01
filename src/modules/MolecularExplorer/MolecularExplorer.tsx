import { MoleculeCanvas } from './components/3D/MoleculeCanvas';
import { ExplorerOverlay } from './components/UI/ExplorerOverlay';
import { CompareDeck } from './components/UI/CompareDeck';
import { Suspense } from 'react';
import { useTranslation } from '../../i18n/useTranslation';
import styles from './MolecularExplorer.module.less';

const LoadingFallback = () => {
  const { language } = useTranslation();
  return (
    <div className={styles.loadingFallback}>
      <div className={styles.loadingSpinner} />
      <span>⬡ {language === 'en' ? 'Initializing 3D Engine...' : 'Khởi tạo Engine 3D...'}</span>
    </div>
  );
};

export const MolecularExplorer = () => {
  return (
    <div className={styles.explorerContainer}>
      {/* Ambient glow orbs */}
      <div className={styles.glowOrb1} />
      <div className={styles.glowOrb2} />

      <Suspense fallback={<LoadingFallback />}>
        <MoleculeCanvas />
      </Suspense>

      <ExplorerOverlay />
      <CompareDeck />
    </div>
  );
};

export default MolecularExplorer;
