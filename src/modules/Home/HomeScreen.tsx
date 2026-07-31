import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useChemStore } from '../PeriodicTable/store/useChemStore';
import styles from './HomeScreen.module.css';

// Floating atom particles config
const PARTICLES = [
  { symbol: 'H',  color: '#ffffff',  size: 24, x: 12, y: 18, delay: 0,    dur: 7 },
  { symbol: 'He', color: '#00f7ff',  size: 20, x: 88, y: 12, delay: 1.5,  dur: 9 },
  { symbol: 'Au', color: '#ffaf00',  size: 28, x: 5,  y: 72, delay: 0.7,  dur: 8 },
  { symbol: 'Fe', color: '#ff6b35',  size: 22, x: 92, y: 60, delay: 2,    dur: 11 },
  { symbol: 'Na', color: '#ff1adb',  size: 18, x: 75, y: 88, delay: 0.3,  dur: 6 },
  { symbol: 'O',  color: '#00ff80',  size: 20, x: 22, y: 90, delay: 1.8,  dur: 10 },
  { symbol: 'C',  color: '#8f00ff',  size: 26, x: 50, y: 5,  delay: 0.9,  dur: 12 },
  { symbol: 'Cu', color: '#ff8c42',  size: 16, x: 35, y: 82, delay: 2.5,  dur: 7.5 },
  { symbol: 'Ag', color: '#c0c0c0',  size: 18, x: 65, y: 15, delay: 1.2,  dur: 9.5 },
  { symbol: 'N',  color: '#00d4ff',  size: 14, x: 80, y: 40, delay: 3,    dur: 8 },
  { symbol: 'Cl', color: '#80ff00',  size: 16, x: 10, y: 45, delay: 2.2,  dur: 11 },
  { symbol: 'U',  color: '#00ff80',  size: 14, x: 44, y: 95, delay: 0.5,  dur: 13 },
] as const;

const FEATURES = [
  {
    icon: '⚛️',
    title: 'Bảng Tuần Hoàn 3D',
    desc: '118 nguyên tố với hiệu ứng tương tác. Lọc theo nhóm, chu kỳ, trạng thái.',
    color: '#00f7ff',
    glow: 'rgba(0, 247, 255, 0.25)',
    view: 'periodic-table' as const,
  },
  {
    icon: '🧬',
    title: 'Phòng Phân Tích 3D',
    desc: 'Sandbox 3D tương tác: Đổi kiểu render, nổ bóc tách hạt, tra thông số & tọa độ.',
    color: '#ff1adb',
    glow: 'rgba(255, 26, 219, 0.25)',
    view: 'explorer' as const,
  },
  {
    icon: '⚗️',
    title: 'Phòng Thí Nghiệm',
    desc: 'Mô phỏng phản ứng hóa học ảo 3D. Kết hợp hóa chất và quan sát kết quả.',
    color: '#00ff80',
    glow: 'rgba(0, 255, 128, 0.25)',
    view: 'virtual-lab' as const,
  },
  {
    icon: '📚',
    title: 'Bài Học & Trắc Nghiệm',
    desc: 'Học lý thuyết góc liên kết hóa học & ôn luyện câu hỏi trắc nghiệm tương tác.',
    color: '#8f00ff',
    glow: 'rgba(143, 0, 255, 0.25)',
    view: 'lesson' as const,
  },
] as const;

const STATS = [
  { value: '118', label: 'Nguyên tố' },
  { value: '30+', label: 'Phân tử 3D' },
  { value: '20+', label: 'Phản ứng' },
  { value: '3D', label: 'Đồ họa thực' },
];

export const HomeScreen: React.FC = () => {
  const setActiveView = useChemStore((s) => s.setActiveView);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  // Starfield canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.2,
      alpha: Math.random() * 0.6 + 0.1,
      speed: Math.random() * 0.3 + 0.05,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;
      stars.forEach((s) => {
        const twinkle = 0.5 + 0.5 * Math.sin(t * s.speed * 5 + s.twinkleOffset);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${s.alpha * twinkle})`;
        ctx.fill();
      });
      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', setSize);
    };
  }, []);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
    exit: { opacity: 0, scale: 0.96, transition: { duration: 0.3 } },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
  }), []);

  return (
    <motion.div
      className={styles.home}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Starfield background */}
      <canvas ref={canvasRef} className={styles.starfield} />

      {/* Ambient glow orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      {/* Floating element particles */}
      {PARTICLES.map((p) => (
        <div
          key={p.symbol}
          className={styles.particle}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            color: p.color,
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            textShadow: `0 0 12px ${p.color}, 0 0 30px ${p.color}60`,
          }}
        >
          {p.symbol}
        </div>
      ))}

      {/* Cyberpunk scan line */}
      <div className={styles.scanLine} />

      {/* Main content area — two-column on wide, stacked on narrow */}
      <div className={styles.contentArea}>

        {/* ── Left: Hero ── */}
        <motion.div className={styles.heroSection}>
          <motion.div variants={itemVariants} className={styles.badge}>
            <span className={styles.badgeDot} />
            ⚗️ Nền tảng Hoá học Tương tác
          </motion.div>

          <motion.h1 variants={itemVariants} className={styles.heroTitle}>
            <span className={styles.titleLine1}>CHEM</span>
            <span className={styles.titleLine2}>EDU</span>
            <span className={styles.titleAccent}>3D</span>
          </motion.h1>

          <motion.p variants={itemVariants} className={styles.heroDesc}>
            Khám phá thế giới hoá học qua đồ hoạ 3D sống động.<br />
            Từ nguyên tử đến phản ứng — tất cả trước mắt bạn.
          </motion.p>

          <motion.div variants={itemVariants} className={styles.heroCtas}>
            <button
              className={styles.ctaPrimary}
              onClick={() => setActiveView('periodic-table')}
            >
              <span>Bắt đầu Khám phá</span>
              <span className={styles.ctaArrow}>→</span>
            </button>
            <button
              className={styles.ctaSecondary}
              onClick={() => setActiveView('virtual-lab')}
            >
              🧪 Vào Lab ngay
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className={styles.statsRow}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.statItem}>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: Feature Grid ── */}
        <motion.div variants={itemVariants} className={styles.featureGrid}>
          {FEATURES.map((f, i) => (
            <motion.button
              key={f.view}
              className={styles.featureCard}
              style={{ '--card-color': f.color, '--card-glow': f.glow } as React.CSSProperties}
              onClick={() => setActiveView(f.view)}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 + i * 0.09, ease: [0.16, 1, 0.3, 1] as const }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className={styles.cardShimmer} />
              <div className={styles.cardIcon}>{f.icon}</div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
              <div className={styles.cardCta}>
                Mở ngay <span>→</span>
              </div>
              <div className={styles.cardCorner} />
            </motion.button>
          ))}
        </motion.div>

      </div>
    </motion.div>
  );
};
