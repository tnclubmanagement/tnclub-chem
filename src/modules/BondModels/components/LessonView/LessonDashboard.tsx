import React from 'react';
import { useChemStore } from '../../../PeriodicTable';
import { LESSONS } from '../../../PeriodicTable/data/lessons';
import { playSciFiSound } from '../../../PeriodicTable/utils/audio';
import styles from './LessonDashboard.module.css';

export const LessonDashboard: React.FC = () => {
  const { setActiveLessonId, soundEnabled } = useChemStore();

  const handleLessonSelect = (id: string) => {
    playSciFiSound('click', soundEnabled);
    setActiveLessonId(id);
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Thư viện Mô hình Phân tử</h1>
      
      <div className={styles.grid}>
        {LESSONS.map(lesson => (
          <div 
            key={lesson.id} 
            className={styles.card}
            onClick={() => handleLessonSelect(lesson.id)}
          >
            <div className={styles.iconWrapper}>
              ⚛️
            </div>
            <h3 className={styles.cardTitle}>{lesson.title}</h3>
            <p className={styles.cardDesc}>{lesson.theory.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
