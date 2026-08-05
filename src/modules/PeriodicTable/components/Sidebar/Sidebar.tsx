import React from 'react';
import { useChemStore } from '../../store/useChemStore';

import { useTranslation } from '../../../../i18n/useTranslation';
import { LanguageSwitcher } from '../../../../components/LanguageSwitcher/LanguageSwitcher';
import { SearchTriggerButton } from '../../../../components/GlobalSearch';
import { useSettingsStore, getNavIcon } from '../../../Settings/store/useSettingsStore';
import { routeRegistry } from '../../../../routes';
import styles from './Sidebar.module.less';

type ViewType = 'home' | 'periodic-table' | 'lesson' | 'explorer' | 'virtual-lab' | 'academy' | 'settings';

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView } = useChemStore();
  const { t } = useTranslation();
  const { iconStyle } = useSettingsStore();

  const allNavItems: Array<{
    view: ViewType;
    label: string;
    accentColor: string;
  }> = [
      { view: 'home', label: t('nav', 'home'), accentColor: '#00f7ff' },
      { view: 'academy', label: t('nav', 'academy'), accentColor: '#eab308' },
      { view: 'periodic-table', label: t('nav', 'periodicTable'), accentColor: '#00f7ff' },
      { view: 'explorer', label: t('nav', 'explorer'), accentColor: '#ff1adb' },
      { view: 'virtual-lab', label: t('nav', 'virtualLab'), accentColor: '#00ff80' },
    ];

  // Single Source of Truth: Only show items that are registered in routeRegistry
  const mainNavItems = allNavItems.filter((item) => routeRegistry.isRegistered(item.view));

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

      {/* Global Search Trigger */}
      <SearchTriggerButton compact style={{ width: 48, height: 48, borderRadius: 14, padding: 0, justifyContent: 'center' }} />

      <div className={styles.divider} />

      <nav className={styles.navGroup}>
        {mainNavItems.map((item) => {
          const isActive = activeView === item.view;
          const icon = getNavIcon(item.view, iconStyle);
          return (
            <div
              key={item.view}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              style={{ '--item-color': item.accentColor } as React.CSSProperties}
              onClick={() => setActiveView(item.view)}
            >
              {/* Active indicator bar */}
              <div className={styles.activeBar} />

              <span className={styles.navIcon}>{icon}</span>

              {/* Tooltip */}
              <div className={styles.tooltip}>{item.label}</div>
            </div>
          );
        })}


      </nav>

      {/* Bottom Group: Settings & Language Switcher */}
      <div className={styles.bottomGroup}>
        <div
          className={`${styles.navItem} ${activeView === 'settings' ? styles.active : ''}`}
          style={{ '--item-color': '#00f7ff' } as React.CSSProperties}
          onClick={() => setActiveView('settings')}
        >
          <div className={styles.activeBar} />
          <span className={styles.navIcon}>{getNavIcon('settings', iconStyle)}</span>
          <div className={styles.tooltip}>{t('nav', 'settings')}</div>
        </div>

        <div className={styles.langWrapper}>
          <LanguageSwitcher />
        </div>
      </div>
    </aside>
  );
};
