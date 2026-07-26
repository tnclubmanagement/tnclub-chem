import { VirtualLabScene } from './components/3D/VirtualLabScene';
import { ChemicalInventory } from './components/UI/ChemicalInventory';
import { ReactionHUD } from './components/UI/ReactionHUD';
import styles from './styles/VirtualLab.module.css';
import { useVirtualLabStore } from './store/useVirtualLabStore';
import { CHEMICALS } from './data/chemicals';
import React from 'react';

export const VirtualLab = () => {
  const addReactant = useVirtualLabStore((state) => state.addReactant);
  const theme = useVirtualLabStore((state) => state.theme);
  const setTheme = useVirtualLabStore((state) => state.setTheme);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const chemId = e.dataTransfer.getData('text/plain');
    if (chemId && CHEMICALS[chemId]) {
      addReactant(CHEMICALS[chemId]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Determine container classes based on theme
  let themeClass = styles.themeScifi;
  if (theme === 'classic') themeClass = styles.themeClassic;
  if (theme === 'realistic') themeClass = styles.themeRealistic;

  return (
    <div 
      className={`${styles.container} ${themeClass}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <VirtualLabScene />
      
      {/* Overlay UI */}
      <div className={styles.uiLayer}>
        <div className={styles.topBar}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              Virtual Chemistry Lab
            </h1>
            <p className={styles.subtitle}>
              Mô phỏng Phản ứng Hóa học Ảo 3D
            </p>
          </div>
          
          {/* Theme Switcher */}
          <div className={styles.themeSwitcher}>
            <button className={`${styles.themeBtn} ${theme === 'scifi' ? styles.active : ''}`} onClick={() => setTheme('scifi')}>🪐 Sci-Fi</button>
            <button className={`${styles.themeBtn} ${theme === 'classic' ? styles.active : ''}`} onClick={() => setTheme('classic')}>📖 Classic</button>
            <button className={`${styles.themeBtn} ${theme === 'realistic' ? styles.active : ''}`} onClick={() => setTheme('realistic')}>🔬 Real Lab</button>
          </div>
        </div>

        <div className={styles.mainLayout}>
          <ChemicalInventory />
          <ReactionHUD />
        </div>
      </div>
    </div>
  );
};
