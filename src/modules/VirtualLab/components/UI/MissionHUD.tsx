import React, { useEffect, useState } from 'react';
import styles from '../../styles/VirtualLab.module.less';
import { useVirtualLabStore } from '../../store/useVirtualLabStore';
import { MISSIONS } from '../../data/missions';
import { useTranslation } from '../../../../i18n/useTranslation';
import confetti from 'canvas-confetti';

export const MissionHUD: React.FC = () => {
  const activeMissionIndex = useVirtualLabStore(state => state.activeMissionIndex);
  const completedMissions = useVirtualLabStore(state => state.completedMissions);
  const { t, language } = useTranslation();
  
  const currentMission = MISSIONS[activeMissionIndex];
  const isCompleted = currentMission && completedMissions.includes(currentMission.id);
  
  const [showHint, setShowHint] = useState(false);

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

  const missionTitle = language === 'en' ? (currentMission.titleEn || currentMission.title) : currentMission.title;
  const missionDesc = language === 'en' ? (currentMission.descriptionEn || currentMission.description) : currentMission.description;
  const missionHint = language === 'en' ? (currentMission.hintEn || currentMission.hint) : currentMission.hint;

  return (
    <div className={styles.missionHUD}>
      <div className={styles.missionHeader} style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className={styles.missionIcon} aria-hidden="true">🎯</span>
          <h3>{t('virtualLab', 'missionTitle')} {activeMissionIndex + 1}{t('virtualLab', 'missionOf')}{MISSIONS.length}</h3>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className={styles.navBtn} 
            onClick={() => useVirtualLabStore.getState().goToPreviousMission()}
            disabled={activeMissionIndex === 0}
            title={t('virtualLab', 'prevMissionTitle')}
            aria-label={t('virtualLab', 'prevMissionAriaLabel')}
          >
            ◀
          </button>
          <button 
            className={styles.navBtn} 
            onClick={() => useVirtualLabStore.getState().skipToNextMission()}
            disabled={activeMissionIndex === MISSIONS.length - 1}
            title={t('virtualLab', 'nextMissionTitle')}
            aria-label={t('virtualLab', 'nextMissionAriaLabel')}
          >
            ▶
          </button>
        </div>
      </div>
      
      <div className={`${styles.missionContent} ${isCompleted ? styles.missionCompleted : ''}`}>
        <h4>{missionTitle}</h4>
        <p>{missionDesc}</p>
        
        {!isCompleted && (
          <div className={styles.hintSection}>
            <button 
              className={styles.hintBtn}
              onClick={() => setShowHint(!showHint)}
              aria-expanded={showHint}
              aria-controls="mission-hint-text"
              title={showHint ? t('virtualLab', 'hideHint') : t('virtualLab', 'showHint')}
            >
              {showHint ? t('virtualLab', 'hideHint') : t('virtualLab', 'showHint')}
            </button>
            {showHint && <p id="mission-hint-text" className={styles.hintText} aria-live="polite">{missionHint}</p>}
          </div>
        )}
        
        {isCompleted && (
          <div className={styles.successBadge}>
            <span className={styles.successIcon}>✓</span> {t('virtualLab', 'missionCompleted')}
          </div>
        )}
      </div>
    </div>
  );
};
