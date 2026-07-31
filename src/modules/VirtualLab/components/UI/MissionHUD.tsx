import React, { useEffect, useState } from 'react';
import styles from '../../styles/VirtualLab.module.css';
import { useVirtualLabStore } from '../../store/useVirtualLabStore';
import { MISSIONS } from '../../data/missions';
import confetti from 'canvas-confetti';

export const MissionHUD: React.FC = () => {
  const activeMissionIndex = useVirtualLabStore(state => state.activeMissionIndex);
  const completedMissions = useVirtualLabStore(state => state.completedMissions);
  
  const currentMission = MISSIONS[activeMissionIndex];
  const isCompleted = currentMission && completedMissions.includes(currentMission.id);
  
  const [showHint, setShowHint] = useState(false);

  // Trigger confetti when a new mission is completed
  useEffect(() => {
    if (isCompleted) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
      });
      setShowHint(false);
    }
  }, [isCompleted]);

  if (!currentMission) return null;

  return (
    <div className={styles.missionHUD}>
      <div className={styles.missionHeader} style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className={styles.missionIcon} aria-hidden="true">🎯</span>
          <h3>Nhiệm vụ {activeMissionIndex + 1}/{MISSIONS.length}</h3>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className={styles.navBtn} 
            onClick={() => useVirtualLabStore.getState().goToPreviousMission()}
            disabled={activeMissionIndex === 0}
            title="Quay lại nhiệm vụ trước"
            aria-label="Quay lại nhiệm vụ trước"
          >
            ◀
          </button>
          <button 
            className={styles.navBtn} 
            onClick={() => useVirtualLabStore.getState().skipToNextMission()}
            disabled={activeMissionIndex === MISSIONS.length - 1}
            title="Bỏ qua / Tới nhiệm vụ tiếp theo"
            aria-label="Tới nhiệm vụ tiếp theo"
          >
            ▶
          </button>
        </div>
      </div>
      
      <div className={`${styles.missionContent} ${isCompleted ? styles.missionCompleted : ''}`}>
        <h4>{currentMission.title}</h4>
        <p>{currentMission.description}</p>
        
        {!isCompleted && (
          <div className={styles.hintSection}>
            <button 
              className={styles.hintBtn}
              onClick={() => setShowHint(!showHint)}
              aria-expanded={showHint}
              aria-controls="mission-hint-text"
              title="Xem gợi ý hoàn thành nhiệm vụ"
            >
              {showHint ? 'Ẩn gợi ý' : '💡 Xem gợi ý'}
            </button>
            {showHint && <p id="mission-hint-text" className={styles.hintText} aria-live="polite">{currentMission.hint}</p>}
          </div>
        )}
        
        {isCompleted && (
          <div className={styles.successBadge}>
            <span className={styles.successIcon}>✓</span> Hoàn thành
          </div>
        )}
      </div>
    </div>
  );
};
