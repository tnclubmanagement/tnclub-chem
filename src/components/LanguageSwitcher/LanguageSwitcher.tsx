import React from 'react';
import { useTranslation } from '../../i18n/useTranslation';
import styles from './LanguageSwitcher.module.less';

interface LanguageSwitcherProps {
  horizontal?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ horizontal = false }) => {
  const { language, setLanguage, supportedLanguages } = useTranslation();

  return (
    <div className={`${styles.switcherContainer} ${horizontal ? styles.horizontal : ''}`}>
      {supportedLanguages.map((langMeta) => (
        <button
          key={langMeta.code}
          className={`${styles.langBtn} ${language === langMeta.code ? styles.active : ''}`}
          onClick={() => setLanguage(langMeta.code)}
          title={langMeta.nativeName}
        >
          <span className={styles.langFlag}>{langMeta.flag}</span>
          <span className={styles.langText}>{langMeta.code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
};
