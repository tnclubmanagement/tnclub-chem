import React from 'react';
import { useChemStore } from '../../store/useChemStore';
import { playSciFiSound } from '../../utils/audio';
import { useTranslation } from '../../../../i18n/useTranslation';
import styles from './Controls.module.less';

export const Controls: React.FC = () => {
  const { temperature, setTemperature, heatmapEnabled, setHeatmapEnabled, soundEnabled, setSoundEnabled, quizModeActive, setQuizModeActive } = useChemStore();
  const { t } = useTranslation();

  const handleStartQuiz = () => {
    playSciFiSound('click', soundEnabled);
    setQuizModeActive(true);
  };

  return (
    <div className={styles.controls}>
      <div className={styles.controlsTop}>
        <div className={styles.controlGroup}>
          <label>
            🌡️ {t('periodicTable', 'temperature')}{' '}
            <span>
              {temperature}K {temperature === 298 ? t('periodicTable', 'roomTemp') : ''}
            </span>
          </label>
          <input
            type="range"
            className={styles.glowSlider}
            min="0"
            max="6000"
            value={temperature}
            onChange={(e) => setTemperature(parseInt(e.target.value))}
          />
        </div>
        <div className={styles.controlGroup}>
          <button
            className={`${styles.ptBtn} ${heatmapEnabled ? styles.active : ''}`}
            onClick={() => { playSciFiSound('click', soundEnabled); setHeatmapEnabled(true); }}
          >
            {t('periodicTable', 'electronegativity')}
          </button>
          <button
            className={`${styles.ptBtn} ${!heatmapEnabled ? styles.active : ''}`}
            onClick={() => { playSciFiSound('click', soundEnabled); setHeatmapEnabled(false); }}
          >
            {t('periodicTable', 'defaultMode')}
          </button>
          <button
            className={`${styles.ptBtn}`}
            onClick={() => { playSciFiSound('click', soundEnabled); setSoundEnabled(!soundEnabled); }}
          >
            {soundEnabled ? t('periodicTable', 'soundOn') : t('periodicTable', 'soundOff')}
          </button>
          <button
            className={`${styles.ptBtn} ${quizModeActive ? styles.active : ''}`}
            onClick={handleStartQuiz}
          >
            {t('periodicTable', 'quizChallenge')}
          </button>
        </div>
      </div>

      <div className={styles.controlsLegend}>
        <div className={`${styles.legendSection} ${heatmapEnabled ? styles.hidden : ''}`}>
          <span className={styles.legendTitle}>{t('periodicTable', 'physicalState')}</span>
          <span className={styles.legendItem}><div className={`${styles.lBox} ${styles.lSolid}`}></div> {t('periodicTable', 'solid')}</span>
          <span className={styles.legendItem}><div className={`${styles.lBox} ${styles.lLiquid}`}></div> {t('periodicTable', 'liquid')}</span>
          <span className={styles.legendItem}><div className={`${styles.lBox} ${styles.lGas}`}></div> {t('periodicTable', 'gas')}</span>
        </div>

        <div className={`${styles.legendSection} ${!heatmapEnabled ? styles.hidden : ''}`}>
          <span className={styles.legendTitle}>{t('periodicTable', 'electronegativityScale')}</span>
          <div className={styles.lGradient}></div>
          <div className={styles.lLabels}>
            <span>{t('periodicTable', 'weak')}</span>
            <span>{t('periodicTable', 'strong')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
