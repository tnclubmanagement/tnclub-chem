import React from 'react';
import { useChemStore } from '../../../PeriodicTable';
import { LESSONS } from '../../../PeriodicTable/data/lessons';
import { playSciFiSound } from '../../../PeriodicTable/utils/audio';
import { useTranslation } from '../../../../i18n/useTranslation';
import styles from './LessonDashboard.module.css';

export const LessonDashboard: React.FC = () => {
  const { setActiveLessonId, soundEnabled } = useChemStore();
  const { t, language } = useTranslation();

  const handleLessonSelect = (id: string) => {
    playSciFiSound('click', soundEnabled);
    setActiveLessonId(id);
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>📚 {t('lessons', 'title')}</h1>
      <p className={styles.subtitle}>
        {t('lessons', 'subtitle')}
      </p>

      <div className={styles.grid}>
        {LESSONS.map((lesson) => {
          const title = language === 'en' ? (lesson.titleEn || lesson.title) : lesson.title;
          const description = language === 'en' ? (lesson.theoryEn?.description || lesson.theory.description) : lesson.theory.description;

          return (
            <div
              key={lesson.id}
              className={styles.card}
              onClick={() => handleLessonSelect(lesson.id)}
            >
              <div className={styles.badge}>{t('lessons', 'badge')}</div>
              <div className={styles.iconWrapper}>
                ⚛️
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDesc}>{description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
