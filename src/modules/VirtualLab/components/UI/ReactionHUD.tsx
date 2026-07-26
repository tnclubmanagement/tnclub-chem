import React from 'react';
import { useVirtualLabStore } from '../../store/useVirtualLabStore';
import { playSciFiSound } from '../../../PeriodicTable/utils/audio';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../styles/VirtualLab.module.css';

export const ReactionHUD: React.FC = () => {
  const reactionLog = useVirtualLabStore((state) => state.reactionLog);
  const resetBeaker = useVirtualLabStore((state) => state.resetBeaker);
  const reactants = useVirtualLabStore((state) => state.reactants);
  const clearLog = useVirtualLabStore((state) => state.clearLog);
  const isReacting = useVirtualLabStore((state) => state.isReacting);

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
        >
          Xóa Nhật ký
        </button>
        <button
          onClick={() => { playSciFiSound('click'); resetBeaker(); }}
          onMouseEnter={() => playSciFiSound('hover')}
          disabled={isReacting || reactants.length === 0}
          className={`${styles.btn} ${styles.btnReset}`}
        >
          Rửa Cốc (Reset)
        </button>
      </div>
    </div>
  );
};
