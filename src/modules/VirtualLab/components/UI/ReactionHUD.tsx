import React from 'react';
import { useVirtualLabStore } from '../../store/useVirtualLabStore';
import { playSciFiSound } from '../../../PeriodicTable/utils/audio';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../styles/VirtualLab.module.css';

import { speakText, stopSpeaking } from '../../utils/speech';

export const ReactionHUD: React.FC = () => {
  const reactionLog = useVirtualLabStore((state) => state.reactionLog);
  const clearLog = useVirtualLabStore((state) => state.clearLog);

  // Stop speaking when component unmounts
  React.useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  return (
    <div className={styles.hudContainer}>
      <div className={styles.hudHeader}>
        <h2 className={styles.glassTitle}>Nhật ký Phản ứng</h2>
      </div>
      
      <div className={styles.scrollArea}>
        <AnimatePresence>
          {reactionLog.map((log) => {
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
                  {log.description}
                  
                  {/* TTS Button */}
                  <button 
                    className={styles.ttsBtn}
                    onClick={() => {
                      playSciFiSound('click');
                      let readText = log.description;
                      if (log.type === 'reaction' && log.equationHTML) {
                        // Attempt to extract text from equation html if wanted, or just read desc
                        // "Phương trình: " + log.equationHTML.replace(/<[^>]*>?/gm, '') + ". " + log.description
                      }
                      speakText(readText);
                    }}
                    title="Đọc nội dung nhật ký"
                    aria-label="Đọc nội dung nhật ký bằng AI"
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
          title="Xóa toàn bộ nhật ký phản ứng"
          aria-label="Xóa nhật ký phản ứng"
        >
          Xóa Nhật ký
        </button>
      </div>
    </div>
  );
};
