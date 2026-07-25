import React from 'react';
import { useChemStore } from '../../store/useChemStore';
import { playSciFiSound } from '../../utils/audio';
import styles from './Controls.module.css';

export const Controls: React.FC = () => {
  const { temperature, setTemperature, heatmapEnabled, setHeatmapEnabled, soundEnabled, setSoundEnabled, quizModeActive, setQuizModeActive } = useChemStore();

  const handleStartQuiz = () => {
    playSciFiSound('click', soundEnabled);
    setQuizModeActive(true);
    // Logic for starting a quiz will be handled in PeriodicTable.tsx
  };

  return (
    <div className={styles.controls}>
      <div className={styles.controlsTop}>
        <div className={styles.controlGroup}>
          <label>🌡️ Nhiệt độ: <span>{temperature}K {temperature === 298 ? '(Phòng)' : ''}</span></label>
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
            🔥 Độ âm điện
          </button>
          <button 
            className={`${styles.ptBtn} ${!heatmapEnabled ? styles.active : ''}`}
            onClick={() => { playSciFiSound('click', soundEnabled); setHeatmapEnabled(false); }}
          >
            Mặc định
          </button>
          <button 
            className={`${styles.ptBtn}`}
            onClick={() => { playSciFiSound('click', soundEnabled); setSoundEnabled(!soundEnabled); }}
          >
            {soundEnabled ? '🔊 Âm thanh: Bật' : '🔇 Âm thanh: Tắt'}
          </button>
          <button 
            className={`${styles.ptBtn} ${quizModeActive ? styles.active : ''}`}
            onClick={handleStartQuiz}
          >
            🎮 Thử Thách
          </button>
        </div>
      </div>
      
      <div className={styles.controlsLegend}>
        <div className={`${styles.legendSection} ${heatmapEnabled ? styles.hidden : ''}`}>
          <span className={styles.legendTitle}>Trạng thái vật lý:</span>
          <span className={styles.legendItem}><div className={`${styles.lBox} ${styles.lSolid}`}></div> Rắn</span>
          <span className={styles.legendItem}><div className={`${styles.lBox} ${styles.lLiquid}`}></div> Lỏng</span>
          <span className={styles.legendItem}><div className={`${styles.lBox} ${styles.lGas}`}></div> Khí</span>
        </div>
        
        <div className={`${styles.legendSection} ${!heatmapEnabled ? styles.hidden : ''}`}>
          <span className={styles.legendTitle}>Thang đo Độ âm điện:</span>
          <div className={styles.lGradient}></div>
          <div className={styles.lLabels}><span>0.7 (Yếu)</span><span>4.0 (Mạnh)</span></div>
        </div>
      </div>
    </div>
  );
};
