import React from 'react';
import { useChemStore } from '../../modules/PeriodicTable';
import { LESSONS } from '../../modules/PeriodicTable/data/lessons';
import styles from './Breadcrumb.module.css';

export const Breadcrumb: React.FC = () => {
  const { activeView, activeLessonId, selectedElement, setActiveLessonId, closePanel } = useChemStore();

  const activeLesson = LESSONS.find(l => l.id === activeLessonId);

  return (
    <div className={styles.breadcrumbContainer}>
      {activeView === 'periodic-table' && (
        <>
          <span className={!selectedElement ? styles.itemActive : styles.item} onClick={() => closePanel()}>
            🔲 Bảng Tuần Hoàn
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
            📚 Thư viện Mô hình
          </span>
          {activeLesson && (
            <>
              <span className={styles.separator}>/</span>
              <span className={styles.itemActive}>
                {activeLesson.title}
              </span>
            </>
          )}
        </>
      )}
    </div>
  );
};
