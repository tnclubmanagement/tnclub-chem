import React from 'react';
import { useChemStore } from '../../store/useChemStore';
import { LESSONS } from '../../data/lessons';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView, activeLessonId, setActiveLessonId } = useChemStore();

  return (
    <aside className={styles.sidebarMini}>
      <div className={styles.logoMini} title="ChemEdu 3D">
        🔬
      </div>
      
      <div className={styles.navGroup}>
        {/* Category 1: Periodic Table */}
        <div 
          className={`${styles.navItem} ${activeView === 'periodic-table' ? styles.active : ''}`}
          onClick={() => setActiveView('periodic-table')}
        >
          <span className={styles.navIcon}>🔲</span>
          <div className={styles.tooltip}>Bảng Tuần Hoàn</div>
        </div>

        {/* Category 2: Lessons / Compounds */}
        <div 
          className={`${styles.navItem} ${styles.hasFlyout} ${activeView === 'lesson' ? styles.active : ''}`}
          onClick={() => {
            setActiveView('lesson');
            if (activeView !== 'lesson') setActiveLessonId(null);
          }}
        >
          <span className={styles.navIcon}>📚</span>
          <div className={styles.tooltip}>Bài Học & Hợp Chất</div>
          
          {/* Flyout Sub-menu (appears on hover) */}
          <div className={styles.submenuFlyout}>
            <h4>Mô Hình Liên Kết</h4>
            <nav className={styles.lessonsSubmenu}>
              {LESSONS.map((lesson) => (
                <button
                  key={lesson.id}
                  className={`${styles.lessonLink} ${activeLessonId === lesson.id ? styles.activeLesson : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveLessonId(lesson.id);
                    setActiveView('lesson');
                  }}
                >
                  {lesson.title}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </aside>
  );
};
