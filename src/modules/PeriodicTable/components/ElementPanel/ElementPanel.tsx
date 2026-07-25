import React, { useRef, useState, useEffect } from 'react';
import { useChemStore } from '../../store/useChemStore';
import { AtomVisualizer } from '../3D/AtomVisualizer';
import { BondVisualizer } from '../3D/BondVisualizer';
import { RealImageTab } from './RealImageTab';
import { getApplicationText } from '../../utils/applicationData';
import styles from './ElementPanel.module.css';

export const ElementPanel: React.FC = () => {
  const { selectedElement, isPanelOpen, closePanel, activeTab, setActiveTab } = useChemStore();
  const [width, setWidth] = useState(400);
  const isResizing = useRef(false);

  useEffect(() => {
    const savedWidth = localStorage.getItem('edu3d_panelWidth');
    if (savedWidth) {
      setWidth(parseInt(savedWidth));
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (!isResizing.current) return;
      let newWidth = window.innerWidth - e.clientX;
      if (newWidth < 320) newWidth = 320;
      if (newWidth > 800) newWidth = 800;
      setWidth(newWidth);
    };

    const handlePointerUp = () => {
      if (isResizing.current) {
        isResizing.current = false;
        document.body.style.cursor = '';
        // The current width is in state, but to access it here without stale closure,
        // we can rely on another effect or just let the render cycle handle it.
        // Better yet, we can save it during pointer move or in an effect.
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  // Save width and manage CSS variable based on panel state
  useEffect(() => {
    if (isPanelOpen) {
      document.documentElement.style.setProperty('--right-panel-width', `${width}px`);
      // Simulate window resize to force 3D canvas recalculation
      setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
    } else {
      document.documentElement.style.setProperty('--right-panel-width', '0px');
      setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
    }
  }, [width, isPanelOpen]);

  useEffect(() => {
    if (width !== 400) {
      localStorage.setItem('edu3d_panelWidth', width.toString());
    }
  }, [width]);

  if (!isPanelOpen || !selectedElement) {
    return <aside className={`${styles.rightPanel} ${styles.hidden}`} />;
  }

  return (
    <aside className={styles.rightPanel} style={{ width: `${width}px` }}>
      <div 
        className={styles.resizer} 
        onPointerDown={(e) => {
          isResizing.current = true;
          document.body.style.cursor = 'ew-resize';
          e.preventDefault();
        }}
      />
      
      <div className={styles.panelContent}>
        <div className={styles.panelHeader}>
          <h3 className={styles.panelTitle}>Phân tích Nguyên tố 3D</h3>
          <button className={styles.closeBtn} onClick={closePanel}>✕</button>
        </div>

        {/* 3D Visualizer Section with Tabs */}
        <div className={styles.visualizerWrapper}>
          <div className={styles.tabSwitchContainer}>
            <div 
              className={styles.tabSwitch} 
              style={{ 
                transform: `translateX(${activeTab === 'atom' ? '4px' : activeTab === 'bond' ? '100%' : 'calc(200% - 4px)'})` 
              }} 
            />
            <button 
              className={`${styles.tabBtn} ${activeTab === 'atom' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('atom')}
            >
              ⚛ Nguyên Tử
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'bond' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('bond')}
            >
              🔗 Liên Kết
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'real' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('real')}
            >
              📸 Thực Tế
            </button>
          </div>

          {activeTab === 'atom' && <AtomVisualizer element={selectedElement} />}
          {activeTab === 'bond' && <BondVisualizer element={selectedElement} />}
          {activeTab === 'real' && <RealImageTab elementName={selectedElement.name} />}
        </div>

        <div className={styles.panelInfo}>
          <div className={styles.elementBadge}>
            <h1 className={styles.modalSymbol}>{selectedElement.symbol}</h1>
            <div className={styles.elementHeaderText}>
              <h2 className={styles.modalName}>{selectedElement.name}</h2>
              <span className={styles.modalCategory}>{selectedElement.category}</span>
            </div>
          </div>
          
          <div className={styles.modalDivider}></div>
          
          <div className={styles.modalDetails}>
            <h3>Thông tin khám phá</h3>
            <p className={styles.modalDesc}>
              Mô hình cấu trúc Bohr của <b>{selectedElement.name}</b>:<br /><br />
              Gồm hạt nhân ở trung tâm và <b>{selectedElement.z} electron</b> xoay quanh trên các phân lớp quỹ đạo lượng tử.
            </p>
            
            {selectedElement.electronConfig && (
              <div className={styles.configSection}>
                <h4 className={styles.configHeading}>Cấu hình Electron:</h4>
                <code className={styles.configText}>{selectedElement.electronConfig}</code>
              </div>
            )}
            
            <h3 className={styles.appHeading}>💡 Ứng dụng thực tế</h3>
            <p className={styles.modalDesc}>
              {getApplicationText(selectedElement)}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
