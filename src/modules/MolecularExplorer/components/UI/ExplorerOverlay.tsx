import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useExplorerStore } from '../../store/useExplorerStore';
import { MOCK_MOLECULES } from '../../data/mockMolecules';
import styles from './ExplorerOverlay.module.css';

export const ExplorerOverlay = () => {
  const { 
    selectedMolecule, 
    setSelectedMolecule, 
    hoveredAtomId, 
    isAutoRotate, 
    toggleAutoRotate,
    explodeRadius,
    setExplodeRadius,
    renderMode,
    setRenderMode
  } = useExplorerStore();

  // Initialize with the first molecule if none selected
  useEffect(() => {
    if (!selectedMolecule && MOCK_MOLECULES.length > 0) {
      setSelectedMolecule(MOCK_MOLECULES[0]);
    }
  }, [selectedMolecule, setSelectedMolecule]);

  return (
    <div className={styles.overlayContainer}>
      <motion.div 
        className={styles.headerCard}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <h1 className={styles.title}>3D Molecule Explorer</h1>
        
        <select 
          className={styles.selector}
          value={selectedMolecule?.id || ''}
          onChange={(e) => {
            const mol = MOCK_MOLECULES.find(m => m.id === e.target.value);
            if (mol) setSelectedMolecule(mol);
          }}
        >
          {MOCK_MOLECULES.map(mol => (
            <option key={mol.id} value={mol.id}>
              {mol.name} ({mol.formula})
            </option>
          ))}
        </select>

        <div className={styles.controls}>
          <button 
            className={`${styles.btn} ${isAutoRotate ? styles.btnActive : ''}`}
            onClick={toggleAutoRotate}
          >
            Auto Rotate
          </button>
          
          <button 
            className={`${styles.btn} ${renderMode === 'space-filling' ? styles.btnActive : ''}`}
            onClick={() => setRenderMode(renderMode === 'ball-and-stick' ? 'space-filling' : 'ball-and-stick')}
          >
            {renderMode === 'space-filling' ? 'Space Filling' : 'Ball & Stick'}
          </button>
        </div>

        <div className={styles.sliderContainer}>
          <label className={styles.sliderLabel}>Explode View: {explodeRadius.toFixed(1)}</label>
          <input 
            type="range" 
            min="0" max="4" step="0.1" 
            value={explodeRadius} 
            onChange={(e) => setExplodeRadius(parseFloat(e.target.value))}
            className={styles.slider}
          />
        </div>
      </motion.div>

      {selectedMolecule && (
        <motion.div 
          className={styles.infoCard}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
        >
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Molecule:</span>
            <span className={styles.infoValue}>{selectedMolecule.name}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Formula:</span>
            <span className={styles.infoValue}>{selectedMolecule.formula}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Total Atoms:</span>
            <span className={styles.infoValue}>{selectedMolecule.atoms.length}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Hovered Atom:</span>
            <span className={styles.infoValue}>{hoveredAtomId || 'None'}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};
