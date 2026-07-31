import React from 'react';
import { useChemStore } from '../../store/useChemStore';
import { LESSONS } from '../../data/lessons';
import styles from './Sidebar.module.css';

type ViewType = 'home' | 'periodic-table' | 'lesson' | 'explorer' | 'virtual-lab';

const NAV_ITEMS: Array<{
  view: ViewType;
  icon: string;
  label: string;
  accentColor: string;
}> = [
  { view: 'home',           icon: '⌂',  label: 'Trang Chủ',       accentColor: '#00f7ff' },
  { view: 'periodic-table', icon: '⚛',  label: 'Bảng Tuần Hoàn',  accentColor: '#00f7ff' },
  { view: 'explorer',       icon: '⬡',  label: 'Phòng Phân Tích 3D', accentColor: '#ff1adb' },
  { view: 'virtual-lab',    icon: '⚗',  label: 'Phòng Thí Nghiệm', accentColor: '#00ff80' },
];

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView, activeLessonId, setActiveLessonId } = useChemStore();

  return (
    <aside className={styles.sidebar}>
      {/* Logo / Brand */}
      <button
        className={styles.logo}
        onClick={() => setActiveView('home')}
        title="ChemEdu 3D — Trang chủ"
      >
        <span className={styles.logoIcon}>⚗️</span>
        <div className={styles.logoRing} />
      </button>

      <div className={styles.divider} />

      <nav className={styles.navGroup}>
        {NAV_ITEMS.map((item) => {
          const isActive = activeView === item.view;
          return (
            <div
              key={item.view}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              style={{ '--item-color': item.accentColor } as React.CSSProperties}
              onClick={() => setActiveView(item.view)}
            >
              {/* Active indicator bar */}
              <div className={styles.activeBar} />

              <span className={styles.navIcon}>{item.icon}</span>

              {/* Tooltip */}
              <div className={styles.tooltip}>{item.label}</div>
            </div>
          );
        })}

        {/* Lessons flyout stays separate */}
        <div
          className={`${styles.navItem} ${styles.hasFlyout} ${activeView === 'lesson' ? styles.active : ''}`}
          style={{ '--item-color': '#8f00ff' } as React.CSSProperties}
          onClick={() => {
            setActiveView('lesson');
            if (activeView !== 'lesson') setActiveLessonId(null);
          }}
        >
          <div className={styles.activeBar} />
          <span className={styles.navIcon}>📚</span>
          <div className={styles.tooltip}>Bài Học &amp; Trắc Nghiệm</div>

          <div className={styles.submenuFlyout}>
            <h4>Bài Học &amp; Trắc Nghiệm</h4>
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
      </nav>
    </aside>
  );
};
