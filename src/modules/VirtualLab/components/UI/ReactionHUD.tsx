import React from 'react';
import { useVirtualLabStore } from '../../store/useVirtualLabStore';
import { playSciFiSound } from '../../../PeriodicTable/utils/audio';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../styles/VirtualLab.module.less';
import { useTranslation } from '../../../../i18n/useTranslation';
import { speakText, stopSpeaking } from '../../utils/speech';

export const ReactionHUD: React.FC = () => {
  const reactionLog = useVirtualLabStore((state) => state.reactionLog);
  const clearLog = useVirtualLabStore((state) => state.clearLog);
  const { t, language } = useTranslation();

  // Stop speaking when component unmounts
  React.useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  return (
    <div className={styles.hudContainer}>
      <div className={styles.hudHeader}>
        <h2 className={styles.glassTitle}>{t('virtualLab', 'reactionLogTitle')}</h2>
      </div>
      
      <div className={styles.scrollArea}>
        <AnimatePresence>
          {reactionLog.map((log) => {
            const displayDesc = language === 'en' ? (log.descriptionEn || log.description) : log.description;
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: 50, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                className={styles.logItem}
              >
                {log.type === 'reaction' && log.equationHTML && (
                  <div 
                    className={styles.logEquation} 
                    dangerouslySetInnerHTML={{ __html: log.equationHTML }} 
                  />
                )}
                <div className={`${styles.logDesc} ${log.type === 'warning' ? styles.warning : log.type === 'info' ? styles.info : ''}`}>
                  {displayDesc}
                  
                  {/* TTS Button */}
                  <button 
                    className={styles.ttsBtn}
                    onClick={() => {
                      playSciFiSound('click');
                      speakText(displayDesc);
                    }}
                    title={t('virtualLab', 'readLogTitle')}
                    aria-label={t('virtualLab', 'readLogAriaLabel')}
                  >
                    🔊
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className={styles.hudActions}>
        <button
          onClick={() => { playSciFiSound('click'); clearLog(); }}
          onMouseEnter={() => playSciFiSound('hover')}
          className={`${styles.btn} ${styles.btnClear}`}
          style={{ width: '100%' }}
          title={t('virtualLab', 'clearLogTitle')}
          aria-label={t('virtualLab', 'clearLogAriaLabel')}
        >
          {t('virtualLab', 'clearLogBtn')}
        </button>
      </div>
    </div>
  );
};
