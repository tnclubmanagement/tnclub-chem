import React from 'react';
import { useSettingsStore } from '../../modules/Settings/store/useSettingsStore';
import styles from './CanvasPlayPauseButton.module.less';

// Lucide SVG Play Icon
const LucidePlayIcon: React.FC = () => (
  <svg
    className={styles.svgIcon}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);

// Lucide SVG Pause Icon
const LucidePauseIcon: React.FC = () => (
  <svg
    className={styles.svgIcon}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
  </svg>
);

interface CanvasPlayPauseButtonProps {
  isPaused?: boolean;
  onToggle?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const CanvasPlayPauseButton: React.FC<CanvasPlayPauseButtonProps> = ({
  isPaused: customIsPaused,
  onToggle: customOnToggle,
  className = '',
  style = {},
}) => {
  const { autoRotate3D, setAutoRotate3D } = useSettingsStore();

  const isPaused = customIsPaused !== undefined ? customIsPaused : !autoRotate3D;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (customOnToggle) {
      customOnToggle();
    } else {
      setAutoRotate3D(!autoRotate3D);
    }
  };

  return (
    <div className={`${styles.playPauseContainer} ${className}`} style={style}>
      <button
        className={`${styles.playPauseIconBtn} ${isPaused ? styles.paused : ''}`}
        onClick={handleToggle}
        title={isPaused ? 'Xoay 3D (Play)' : 'Tạm dừng 3D (Pause)'}
      >
        {isPaused ? <LucidePlayIcon /> : <LucidePauseIcon />}
      </button>
    </div>
  );
};
