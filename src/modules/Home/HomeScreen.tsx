import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useChemStore } from '../PeriodicTable/store/useChemStore';
import { useTranslation } from '../../i18n/useTranslation';
import { Home3DPodsCanvas } from './components/Home3DPodsCanvas';
import { FloatingElementsBackground } from './components/FloatingElementsBackground';
import styles from './HomeScreen.module.less';

export const HomeScreen: React.FC = () => {
  const setActiveView = useChemStore((s) => s.setActiveView);
  const { t } = useTranslation();

  const stats = useMemo(() => [
    { value: '118', label: t('home', 'statElements') },
    { value: '30+', label: t('home', 'statMolecules') },
    { value: '20+', label: t('home', 'statReactions') },
    { value: '3D', label: t('home', 'statGraphics') },
  ], [t]);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
    exit: { opacity: 0, scale: 0.97, transition: { duration: 0.25 } },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  }), []);

  return (
    <motion.div
      className={styles.home}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Ambient Sparkling Chemical Elements Background */}
      <FloatingElementsBackground />

      {/* Main content container */}
      <div className={styles.contentArea}>

        {/* ── Left Column: Clean Hero Branding ── */}
        <motion.div className={styles.heroSection}>
          <motion.div variants={itemVariants} className={styles.badge}>
            <span className={styles.badgeDot} />
            ⚗️ {t('home', 'badge')}
          </motion.div>

          <motion.h1 variants={itemVariants} className={styles.heroTitle}>
            <span className={styles.titleLine1}>{t('home', 'heroLine1')}</span>
            <span className={styles.titleLine2}>{t('home', 'heroLine2')}</span>
            <span className={styles.titleAccent}>{t('home', 'heroAccent')}</span>
          </motion.h1>

          <motion.p variants={itemVariants} className={styles.heroDesc}>
            {t('home', 'heroDesc')}
          </motion.p>

          <motion.div variants={itemVariants} className={styles.heroCtas}>
            <button
              className={styles.ctaPrimary}
              onClick={() => setActiveView('periodic-table')}
            >
              <span>{t('home', 'startBtn')}</span>
              <span className={styles.ctaArrow}>→</span>
            </button>
            <button
              className={styles.ctaSecondary}
              onClick={() => setActiveView('virtual-lab')}
            >
              🧪 {t('home', 'labBtn')}
            </button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={itemVariants} className={styles.statsRow}>
            {stats.map((s) => (
              <div key={s.label} className={styles.statItem}>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right Column: 4 Interactive 3D Geometric Exploration Pods ── */}
        <motion.div variants={itemVariants} className={styles.featureGrid3D}>
          <Home3DPodsCanvas />
        </motion.div>

      </div>
    </motion.div>
  );
};
