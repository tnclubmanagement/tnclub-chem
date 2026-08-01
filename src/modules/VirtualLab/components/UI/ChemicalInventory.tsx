import React, { useState } from 'react';
import { AVAILABLE_CHEMICALS, CHEMICALS, type Chemical, type ChemicalGroup } from '../../data/chemicals';
import { useVirtualLabStore } from '../../store/useVirtualLabStore';
import { playSciFiSound } from '../../../PeriodicTable/utils/audio';
import { FlaskIcon } from './FlaskIcon';
import styles from '../../styles/VirtualLab.module.less';
import { speakText, stopSpeaking } from '../../utils/speech';
import { useTranslation } from '../../../../i18n/useTranslation';

export const ChemicalInventory: React.FC = () => {
  const addReactant = useVirtualLabStore((state) => state.addReactant);
  const reactants = useVirtualLabStore((state) => state.reactants);
  const isReacting = useVirtualLabStore((state) => state.isReacting);
  const isPouring = useVirtualLabStore((state) => state.isPouring);
  const runExample = useVirtualLabStore((state) => state.runExample);
  const { t, language } = useTranslation();

  const [activeFilter, setActiveFilter] = useState<ChemicalGroup | 'all'>('all');
  const [selectedInfo, setSelectedInfo] = useState<Chemical | null>(null);
  const [activeMainTab, setActiveMainTab] = useState<'chemicals' | 'examples'>('chemicals');

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, chemId: string) => {
    e.dataTransfer.setData('text/plain', chemId);
    e.dataTransfer.effectAllowed = 'copy';
    playSciFiSound('click');
  };

  const filteredChemicals = AVAILABLE_CHEMICALS.filter(c => activeFilter === 'all' || c.group === activeFilter);

  const examples = [
    { label: '🔥 Na + H2O', r1: CHEMICALS.na, r2: CHEMICALS.h2o },
    { label: '🟦 Cu(OH)2', r1: CHEMICALS.cuso4, r2: CHEMICALS.naoh },
    { label: '⬜ BaSO4', r1: CHEMICALS.bacl2, r2: CHEMICALS.h2so4 },
    { label: '🫧 Mg + HCl', r1: CHEMICALS.mg, r2: CHEMICALS.hcl },
    { label: '⚪ AgCl', r1: CHEMICALS.agno3, r2: CHEMICALS.nacl },
    { label: '💧 Neutralize', r1: CHEMICALS.hcl, r2: CHEMICALS.naoh },
    { label: '🫧 Fe + HCl', r1: CHEMICALS.fe, r2: CHEMICALS.hcl },
    { label: '⬜ Ba(OH)2 + K2SO4', r1: CHEMICALS.k2so4, r2: CHEMICALS.ba_oh_2 },
    { label: '🫧 Na + HCl', r1: CHEMICALS.na, r2: CHEMICALS.hcl },
    { label: '🟣 KMnO4 (dissolve)', r1: CHEMICALS.kmno4, r2: CHEMICALS.h2o },
    { label: '💧 H2SO4 + NaOH', r1: CHEMICALS.h2so4, r2: CHEMICALS.naoh },
    { label: '⚪ AgNO3 + HCl', r1: CHEMICALS.agno3, r2: CHEMICALS.hcl },
    { label: '⬜ BaCl2 + Na2SO4', r1: CHEMICALS.bacl2, r2: CHEMICALS.na2so4 },
    { label: '🫧 Mg + H2SO4', r1: CHEMICALS.mg, r2: CHEMICALS.h2so4 },
    { label: '🫧 Fe + H2SO4', r1: CHEMICALS.fe, r2: CHEMICALS.h2so4 },
    { label: '🔥 Na + H2SO4', r1: CHEMICALS.na, r2: CHEMICALS.h2so4 },
    { label: '🧊 CuSO4 + Ba(OH)2', r1: CHEMICALS.cuso4, r2: CHEMICALS.ba_oh_2 },
    { label: '🧂 NaCl + H2O', r1: CHEMICALS.nacl, r2: CHEMICALS.h2o },
    { label: '🟦 CuSO4 + H2O', r1: CHEMICALS.cuso4, r2: CHEMICALS.h2o },
    { label: '💧 NaOH + H2O', r1: CHEMICALS.naoh, r2: CHEMICALS.h2o },
    { label: '⬜ H2SO4 + Ba(OH)2', r1: CHEMICALS.h2so4, r2: CHEMICALS.ba_oh_2 },
    { label: '⚪ AgNO3 + BaCl2', r1: CHEMICALS.agno3, r2: CHEMICALS.bacl2 },
    { label: '💧 AgNO3 + H2O', r1: CHEMICALS.agno3, r2: CHEMICALS.h2o },
    { label: '💧 BaCl2 + H2O', r1: CHEMICALS.bacl2, r2: CHEMICALS.h2o },
    { label: '💧 K2SO4 + H2O', r1: CHEMICALS.k2so4, r2: CHEMICALS.h2o },
    { label: '💧 Na2SO4 + H2O', r1: CHEMICALS.na2so4, r2: CHEMICALS.h2o },
    { label: '💧 HCl + Ba(OH)2', r1: CHEMICALS.hcl, r2: CHEMICALS.ba_oh_2 },
    { label: '🧱 Fe + H2O (No rxn)', r1: CHEMICALS.fe, r2: CHEMICALS.h2o },
    { label: '⬜ K2SO4 + BaCl2', r1: CHEMICALS.k2so4, r2: CHEMICALS.bacl2 },
    { label: '⬜ Ba(OH)2 + Na2SO4', r1: CHEMICALS.ba_oh_2, r2: CHEMICALS.na2so4 }
  ];

  const getStateLabel = (state: string) => {
    switch (state) {
      case 'solid': return t('virtualLab', 'stateSolid');
      case 'aqueous': return t('virtualLab', 'stateAqueous');
      case 'liquid': return t('virtualLab', 'stateLiquid');
      default: return t('virtualLab', 'stateGas');
    }
  };

  return (
    <>
      <div className={styles.inventoryContainer}>
        
        <div className={styles.mainTabs}>
          <button 
            className={`${styles.mainTabBtn} ${activeMainTab === 'chemicals' ? styles.active : ''}`}
            onClick={() => { playSciFiSound('click'); setActiveMainTab('chemicals'); }}
          >
            {t('virtualLab', 'chemicalInventoryTab')}
          </button>
          <button 
            className={`${styles.mainTabBtn} ${activeMainTab === 'examples' ? styles.active : ''}`}
            onClick={() => { playSciFiSound('click'); setActiveMainTab('examples'); }}
          >
            {t('virtualLab', 'examplesTab')}
          </button>
        </div>

        {activeMainTab === 'chemicals' && (
          <>
            {/* Filters */}
            <div className={styles.toolbar}>
              <div className={styles.filterBar}>
                {(['all', 'acid', 'base', 'salt', 'metal', 'oxide'] as const).map((filter) => (
                  <button 
                    key={filter}
                    className={`${styles.filterBtn} ${activeFilter === filter ? styles.active : ''}`}
                    onClick={() => { playSciFiSound('click'); setActiveFilter(filter as ChemicalGroup | 'all'); }}
                  >
                    {filter === 'all' ? t('virtualLab', 'filterAll') : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.scrollArea}>
              {filteredChemicals.map((chem) => {
                const isSelected = reactants.some((r) => r.id === chem.id);
                const isDisabled = isReacting || isPouring || reactants.length >= 2 || isSelected;
                const chemName = language === 'en' ? (chem.nameEn || chem.name) : chem.name;

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
                    title={t('virtualLab', 'chemCardTitle')}
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
                        <div className={styles.chemName}>{chemName} <span style={{ color: 'var(--neon-border)', fontSize: '0.9rem' }}>{chem.formula}</span></div>
                        <div className={styles.chemState}>
                          {getStateLabel(chem.state)}
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
          </>
        )}

        {activeMainTab === 'examples' && (
          <div className={styles.scrollArea}>
             <div className={styles.examplesGrid}>
                {examples.map((ex, idx) => (
                  <button 
                    key={idx}
                    className={styles.exampleCardBtn} 
                    onClick={() => { playSciFiSound('click'); runExample(ex.r1, ex.r2); }}
                    disabled={isReacting || isPouring}
                  >
                    {ex.label}
                  </button>
                ))}
             </div>
          </div>
        )}
      </div>

      {/* Info Modal */}
      {selectedInfo && (
        <div className={styles.modalOverlay} onClick={() => { setSelectedInfo(null); stopSpeaking(); }}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => { setSelectedInfo(null); stopSpeaking(); }}>×</button>
            <div className={styles.modalHeader}>
              <FlaskIcon chemical={selectedInfo} size={64} />
              <div>
                <h2>
                  {language === 'en' ? (selectedInfo.nameEn || selectedInfo.name) : selectedInfo.name} ({selectedInfo.formula})
                  <button 
                    className={styles.ttsBtn}
                    style={{ marginLeft: '12px', fontSize: '1.2rem', padding: '4px 8px' }}
                    onClick={() => {
                      playSciFiSound('click');
                      const name = language === 'en' ? (selectedInfo.nameEn || selectedInfo.name) : selectedInfo.name;
                      const app = language === 'en' ? (selectedInfo.applicationEn || selectedInfo.application) : selectedInfo.application;
                      const textToRead = `${name}. ${t('virtualLab', 'applicationLabel')} ${app}`;
                      speakText(textToRead);
                    }}
                    title={t('virtualLab', 'readInfoBtn')}
                  >
                    🔊
                  </button>
                </h2>
                <p style={{ color: 'var(--text-sub)' }}>{t('virtualLab', 'groupLabel')} {selectedInfo.group.toUpperCase()}</p>
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
              <strong>{t('virtualLab', 'applicationLabel')} </strong>
              <p>{language === 'en' ? (selectedInfo.applicationEn || selectedInfo.application) : selectedInfo.application}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
