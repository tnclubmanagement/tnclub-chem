import React from 'react';
import { useChemStore } from '../../modules/PeriodicTable';
import { LESSONS } from '../../modules/PeriodicTable/data/lessons';
import { useTranslation } from '../../i18n/useTranslation';
import styles from './Breadcrumb.module.css';

export const Breadcrumb: React.FC = () => {
  const { activeView, activeLessonId, selectedElement, setActiveLessonId, closePanel } = useChemStore();
  const { t, language } = useTranslation();

  const activeLesson = LESSONS.find(l => l.id === activeLessonId);

  return (
    <div className={styles.breadcrumbContainer}>
      {activeView === 'periodic-table' && (
        <>
          <span className={!selectedElement ? styles.itemActive : styles.item} onClick={() => closePanel()}>
            🔲 {t('nav', 'periodicTable')}
          </span>
          {selectedElement && (
            <>
              <span className={styles.separator}>/</span>
              <span className={styles.itemActive}>
                ⚛️ {selectedElement.name} ({selectedElement.symbol})
              </span>
            </>
          )}
        </>
      )}

      {activeView === 'lesson' && (
        <>
          <span className={!activeLesson ? styles.itemActive : styles.item} onClick={() => setActiveLessonId(null)}>
            📚 {t('nav', 'lessons')}
          </span>
          {activeLesson && (
            <>
              <span className={styles.separator}>/</span>
              <span className={styles.itemActive}>
                {language === 'en' ? (activeLesson.titleEn || activeLesson.title) : activeLesson.title}
              </span>
            </>
          )}
        </>
      )}

      {activeView === 'virtual-lab' && (
        <span className={styles.itemActive}>
          🧪 {t('nav', 'virtualLab')}
        </span>
      )}
    </div>
  );
};
