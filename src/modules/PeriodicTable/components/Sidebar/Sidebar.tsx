import React from 'react';
import { useChemStore } from '../../store/useChemStore';
import { LESSONS } from '../../data/lessons';
import { useTranslation } from '../../../../i18n/useTranslation';
import { LanguageSwitcher } from '../../../../components/LanguageSwitcher/LanguageSwitcher';
import styles from './Sidebar.module.css';

type ViewType = 'home' | 'periodic-table' | 'lesson' | 'explorer' | 'virtual-lab' | 'settings';

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView, activeLessonId, setActiveLessonId } = useChemStore();
  const { t, language } = useTranslation();

  const navItems: Array<{
    view: ViewType;
    icon: string;
    label: string;
    accentColor: string;
  }> = [
    { view: 'home',           icon: '⌂',  label: t('nav', 'home'),          accentColor: '#00f7ff' },
    { view: 'periodic-table', icon: '⚛',  label: t('nav', 'periodicTable'), accentColor: '#00f7ff' },
    { view: 'explorer',       icon: '⬡',  label: t('nav', 'explorer'),      accentColor: '#ff1adb' },
    { view: 'virtual-lab',    icon: '⚗',  label: t('nav', 'virtualLab'),    accentColor: '#00ff80' },
    { view: 'settings',       icon: '⚙',  label: t('nav', 'settings'),      accentColor: '#e11d48' },
  ];

  return (
    <aside className={styles.sidebar}>
      {/* Logo / Brand */}
      <button
        className={styles.logo}
        onClick={() => setActiveView('home')}
        title="ChemEdu 3D"
      >
        <span className={styles.logoIcon}>⚗️</span>
        <div className={styles.logoRing} />
      </button>

      <div className={styles.divider} />

      <nav className={styles.navGroup}>
        {navItems.map((item) => {
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
          <div className={styles.tooltip}>{t('nav', 'lessons')}</div>

          <div className={styles.submenuFlyout}>
            <h4>{t('nav', 'lessonsFlyoutTitle')}</h4>
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
                  {language === 'en' ? (lesson.titleEn || lesson.title) : lesson.title}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </nav>

      {/* Bottom Language Switcher */}
      <div style={{ marginTop: 'auto', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
        <LanguageSwitcher />
      </div>
    </aside>
  );
};
