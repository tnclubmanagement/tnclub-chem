import React from 'react';
import { useGlobalSearchStore } from './store/useGlobalSearchStore';
import { useTranslation } from '../../i18n/useTranslation';
import styles from './SearchTriggerButton.module.less';

interface SearchTriggerButtonProps {
  compact?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const SearchTriggerButton: React.FC<SearchTriggerButtonProps> = ({
  compact = false,
  className = '',
  style = {},
}) => {
  const { openSearch } = useGlobalSearchStore();
  const { language } = useTranslation();

  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
  const shortcutText = isMac ? '⌘K' : 'Ctrl+K';

  return (
    <button
      className={`${styles.triggerBtn} ${className}`}
      style={style}
      onClick={openSearch}
      title={`Global Search (${shortcutText})`}
    >
      <span className={styles.searchIcon}>🔍</span>
      {!compact && (
        <>
          <span className={styles.label}>
            {language === 'en' ? 'Search...' : 'Tìm kiếm...'}
          </span>
          <span className={styles.shortcut}>{shortcutText}</span>
        </>
      )}
    </button>
  );
};
