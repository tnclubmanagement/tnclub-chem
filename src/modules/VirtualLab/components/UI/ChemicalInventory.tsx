import React, { useState } from 'react';
import { AVAILABLE_CHEMICALS, CHEMICALS, type Chemical, type ChemicalGroup } from '../../data/chemicals';
import { useVirtualLabStore } from '../../store/useVirtualLabStore';
import { playSciFiSound } from '../../../PeriodicTable/utils/audio';
import { FlaskIcon } from './FlaskIcon';
import styles from '../../styles/VirtualLab.module.css';

export const ChemicalInventory: React.FC = () => {
  const addReactant = useVirtualLabStore((state) => state.addReactant);
  const reactants = useVirtualLabStore((state) => state.reactants);
  const isReacting = useVirtualLabStore((state) => state.isReacting);
  const isPouring = useVirtualLabStore((state) => state.isPouring);
  const runExample = useVirtualLabStore((state) => state.runExample);

  const [activeFilter, setActiveFilter] = useState<ChemicalGroup | 'all'>('all');
  const [selectedInfo, setSelectedInfo] = useState<Chemical | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, chemId: string) => {
    e.dataTransfer.setData('text/plain', chemId);
    e.dataTransfer.effectAllowed = 'copy';
    playSciFiSound('click');
  };

  const filteredChemicals = AVAILABLE_CHEMICALS.filter(c => activeFilter === 'all' || c.group === activeFilter);

  return (
    <>
      <div className={styles.inventoryContainer}>
        <h2 className={styles.glassTitle}>Kho Hóa chất</h2>
        
        {/* Filters */}
        <div className={styles.toolbar}>
          <div className={styles.filterBar}>
            {['all', 'acid', 'base', 'salt', 'metal', 'oxide'].map((filter) => (
              <button 
                key={filter}
                className={`${styles.filterBtn} ${activeFilter === filter ? styles.active : ''}`}
                onClick={() => { playSciFiSound('click'); setActiveFilter(filter as any); }}
              >
                {filter === 'all' ? 'Tất cả' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Examples */}
          <div className={styles.examplesBar}>
            <button 
              className={styles.exampleBtn} 
              onClick={() => { playSciFiSound('click'); runExample(CHEMICALS.na, CHEMICALS.h2o); }}
              disabled={isReacting || isPouring}
            >
              🔥 Na + H2O
            </button>
            <button 
              className={styles.exampleBtn} 
              onClick={() => { playSciFiSound('click'); runExample(CHEMICALS.cuso4, CHEMICALS.naoh); }}
              disabled={isReacting || isPouring}
            >
              🟦 Cu(OH)2
            </button>
            <button 
              className={styles.exampleBtn} 
              onClick={() => { playSciFiSound('click'); runExample(CHEMICALS.bacl2, CHEMICALS.h2so4); }}
              disabled={isReacting || isPouring}
            >
              ⬜ BaSO4
            </button>
            <button 
              className={styles.exampleBtn} 
              onClick={() => { playSciFiSound('click'); runExample(CHEMICALS.mg, CHEMICALS.hcl); }}
              disabled={isReacting || isPouring}
            >
              🫧 Mg + HCl
            </button>
            <button 
              className={styles.exampleBtn} 
              onClick={() => { playSciFiSound('click'); runExample(CHEMICALS.agno3, CHEMICALS.nacl); }}
              disabled={isReacting || isPouring}
            >
              ⚪ AgCl
            </button>
          </div>
        </div>

        <div className={styles.scrollArea}>
          {filteredChemicals.map((chem) => {
            const isSelected = reactants.some((r) => r.id === chem.id);
            const isDisabled = isReacting || isPouring || reactants.length >= 2 || isSelected;

            return (
              <div
                key={chem.id}
                onClick={() => {
                  if (!isDisabled) {
                    playSciFiSound('click');
                    addReactant(chem);
                  }
                }}
                onMouseEnter={() => {
                  if (!isDisabled) playSciFiSound('hover');
                }}
                className={`${styles.chemCard} ${isSelected ? styles.selected : ''} ${isDisabled && !isSelected ? styles.disabled : ''}`}
                title="Click hoặc Kéo thả vào Cốc"
              >
                <div className={styles.cardContent}>
                  <div 
                    className={styles.iconWrapper}
                    draggable={!isDisabled}
                    onDragStart={(e) => {
                      e.stopPropagation();
                      handleDragStart(e, chem.id);
                    }}
                    style={{ cursor: isDisabled ? 'not-allowed' : 'grab' }}
                  >
                    <FlaskIcon chemical={chem} size={48} />
                  </div>
                  <div className={styles.chemDetails}>
                    <div className={styles.chemName}>{chem.name} <span style={{ color: 'var(--neon-border)', fontSize: '0.9rem' }}>{chem.formula}</span></div>
                    <div className={styles.chemState}>
                      {chem.state === 'solid' ? 'Rắn' : chem.state === 'aqueous' ? 'Dung dịch' : chem.state === 'liquid' ? 'Lỏng' : 'Khí'}
                    </div>
                  </div>
                  
                  {/* Info Button */}
                  <button 
                    className={styles.infoBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      playSciFiSound('click');
                      setSelectedInfo(chem);
                    }}
                  >
                    i
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Modal */}
      {selectedInfo && (
        <div className={styles.modalOverlay} onClick={() => setSelectedInfo(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedInfo(null)}>×</button>
            <div className={styles.modalHeader}>
              <FlaskIcon chemical={selectedInfo} size={64} />
              <div>
                <h2>{selectedInfo.name} ({selectedInfo.formula})</h2>
                <p style={{ color: 'var(--text-sub)' }}>Nhóm: {selectedInfo.group.toUpperCase()}</p>
              </div>
            </div>
            
            {selectedInfo.videoUrl && (
              <iframe 
                className={styles.modalVideo}
                src={selectedInfo.videoUrl} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            )}
            
            <div className={styles.modalApp}>
              <strong>Ứng dụng thực tiễn: </strong>
              <p>{selectedInfo.application}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
