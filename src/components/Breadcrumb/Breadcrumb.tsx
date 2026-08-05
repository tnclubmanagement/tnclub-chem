import React from 'react';
import { useChemStore } from '../../modules/PeriodicTable';

import { useTranslation } from '../../i18n/useTranslation';
import styles from './Breadcrumb.module.less';

export const Breadcrumb: React.FC = () => {
  const { activeView, selectedElement, closePanel } = useChemStore();
  const { t } = useTranslation();

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



      {activeView === 'explorer' && (
        <span className={styles.itemActive}>
          ⬡ {t('nav', 'explorer')}
        </span>
      )}

      {activeView === 'virtual-lab' && (
        <span className={styles.itemActive}>
          🧪 {t('nav', 'virtualLab')}
        </span>
      )}

      {activeView === 'settings' && (
        <span className={styles.itemActive}>
          ⚙️ {t('nav', 'settings')}
        </span>
      )}
    </div>
  );
};
