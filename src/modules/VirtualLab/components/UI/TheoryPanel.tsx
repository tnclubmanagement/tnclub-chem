import React, { useState } from 'react';
import styles from '../../styles/VirtualLab.module.less';
import { playSciFiSound } from '../../../PeriodicTable/utils/audio';
import { speakText, stopSpeaking } from '../../utils/speech';
import { THEORY_DATA } from '../../data/theory';
import { AVAILABLE_CHEMICALS } from '../../data/chemicals';
import { useTranslation } from '../../../../i18n/useTranslation';

interface TheoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TheoryPanel: React.FC<TheoryPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'principle' | 'chemical'>('principle');
  const { t, language } = useTranslation();

  const handleSpeak = (text: string) => {
    playSciFiSound('click');
    speakText(text);
  };

  const handleStop = () => {
    playSciFiSound('click');
    stopSpeaking();
  };

  return (
    <>
      <div 
        className={`${styles.theoryPanel} ${isOpen ? styles.open : ''}`}
        role="dialog"
        aria-label={t('virtualLab', 'theoryPanelAriaLabel')}
        aria-hidden={!isOpen}
      >
        <div className={styles.panelHeader}>
          <h2>{t('virtualLab', 'theoryPanelTitle')}</h2>
          <button 
            className={styles.closeBtn} 
            onClick={() => { playSciFiSound('click'); onClose(); }}
            title={t('virtualLab', 'theoryPanelCloseTitle')}
            aria-label={t('virtualLab', 'theoryPanelCloseAriaLabel')}
          >
            ×
          </button>
        </div>

        <div className={styles.tabs} role="tablist">
          <button 
            className={`${styles.tabBtn} ${activeTab === 'principle' ? styles.active : ''}`}
            onClick={() => { playSciFiSound('hover'); setActiveTab('principle'); }}
            role="tab"
            aria-selected={activeTab === 'principle'}
            title={t('virtualLab', 'theoryTabPrincipleTitle')}
          >
            {t('virtualLab', 'theoryTabPrinciple')}
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'chemical' ? styles.active : ''}`}
            onClick={() => { playSciFiSound('hover'); setActiveTab('chemical'); }}
            role="tab"
            aria-selected={activeTab === 'chemical'}
            title={t('virtualLab', 'theoryTabChemicalTitle')}
          >
            {t('virtualLab', 'theoryTabChemical')}
          </button>
        </div>

        <div className={styles.panelContent} role="tabpanel">
          {activeTab === 'principle' && (
            <div className={styles.theoryList}>
              {THEORY_DATA.map((item) => {
                const title = language === 'en' ? (item.titleEn || item.title) : item.title;
                const content = language === 'en' ? (item.contentEn || item.content) : item.content;
                return (
                  <div key={item.id} className={styles.theoryCard}>
                    <div className={styles.theoryCardHeader}>
                      <h3>{title}</h3>
                      <div className={styles.ttsControls}>
                        <button onClick={() => handleSpeak(content)} title={t('virtualLab', 'readContentTitle')} aria-label={t('virtualLab', 'readContentAriaLabel')}>🔊</button>
                        <button onClick={handleStop} title={t('virtualLab', 'stopReadTitle')} aria-label={t('virtualLab', 'stopReadAriaLabel')}>⏹</button>
                      </div>
                    </div>
                    <p>{content}</p>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'chemical' && (
            <div className={styles.theoryList}>
              {AVAILABLE_CHEMICALS.map((chem) => {
                const chemName = language === 'en' ? (chem.nameEn || chem.name) : chem.name;
                const chemApp = language === 'en' ? (chem.applicationEn || chem.application) : chem.application;
                return (
                  <div key={chem.id} className={styles.theoryCard}>
                    <div className={styles.theoryCardHeader}>
                      <h3>{chemName} ({chem.formula})</h3>
                      <div className={styles.ttsControls}>
                        <button onClick={() => handleSpeak(`${chemName}, ${chem.formula}. ${chemApp}`)} title={t('virtualLab', 'readChemTitle')} aria-label={t('virtualLab', 'readChemAriaLabel')}>🔊</button>
                        <button onClick={handleStop} title={t('virtualLab', 'stopReadTitle')} aria-label={t('virtualLab', 'stopReadAriaLabel')}>⏹</button>
                      </div>
                    </div>
                    <div className={styles.chemProps}>
                      <span className={styles.propBadge} style={{ backgroundColor: chem.colorHex, color: chem.colorTheme === 'white' || chem.colorTheme === 'colorless' ? '#000' : '#fff' }}>
                        {t('virtualLab', 'colorLabel')} {chem.colorTheme}
                      </span>
                      <span className={styles.propBadge}>
                        {t('virtualLab', 'stateLabel')} {
                          chem.state === 'solid' ? t('virtualLab', 'stateSolid') :
                          chem.state === 'aqueous' ? t('virtualLab', 'stateAqueous') :
                          chem.state === 'liquid' ? t('virtualLab', 'stateLiquid') :
                          t('virtualLab', 'stateGas')
                        }
                      </span>
                      <span className={styles.propBadge}>
                        {t('virtualLab', 'groupLabelChem')} {chem.group}
                      </span>
                    </div>
                    <p>{chemApp}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
