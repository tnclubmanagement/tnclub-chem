import React from 'react';
import { useTranslation } from '../../i18n/useTranslation';
import styles from './LanguageSwitcher.module.css';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <div className={styles.switcherContainer}>
      <button
        className={`${styles.langBtn} ${language === 'vi' ? styles.active : ''}`}
        onClick={() => setLanguage('vi')}
        title="Tiếng Việt"
      >
        <span>🇻🇳</span> VI
      </button>
      <button
        className={`${styles.langBtn} ${language === 'en' ? styles.active : ''}`}
        onClick={() => setLanguage('en')}
        title="English"
      >
        <span>🇬🇧</span> EN
      </button>
    </div>
  );
};
