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
      <h1 className={styles.title}>📚 Bài Học &amp; Trắc Nghiệm Hóa Học</h1>
      <p className={styles.subtitle}>
        Học lý thuyết liên kết hóa học, cấu trúc góc 3D và ôn luyện bài tập trắc nghiệm tương tác
      </p>
      
      <div className={styles.grid}>
        {LESSONS.map(lesson => (
          <div 
            key={lesson.id} 
            className={styles.card}
            onClick={() => handleLessonSelect(lesson.id)}
          >
            <div className={styles.badge}>🎯 Bài học &amp; Quiz</div>
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
