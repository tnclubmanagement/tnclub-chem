import React, { useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Feature3DPod } from './Feature3DPod';
import { useChemStore } from '../../PeriodicTable/store/useChemStore';
import { useTranslation } from '../../../i18n/useTranslation';

const ResponsivePodsGroup: React.FC = () => {
  const setActiveView = useChemStore((s) => s.setActiveView);
  const { t } = useTranslation();
  const { viewport } = useThree();

  // Responsive spatial positions based on screen aspect/viewport width
  const isNarrow = viewport.width < 6.8;
  const isMobile = viewport.width < 5.0;

  const podsData = useMemo(() => {
    const spreadX = isMobile ? 1.4 : isNarrow ? 1.7 : 2.0;
    const spreadY = isMobile ? 1.5 : isNarrow ? 1.4 : 1.3;

    return [
      {
        view: 'periodic-table' as const,
        title: t('home', 'featurePeriodicTitle'),
        desc: t('home', 'featurePeriodicDesc'),
        color: '#00f7ff',
        glow: 'rgba(0, 247, 255, 0.4)',
        pos: [-spreadX, spreadY, 0] as [number, number, number],
      },
      {
        view: 'explorer' as const,
        title: t('home', 'featureExplorerTitle'),
        desc: t('home', 'featureExplorerDesc'),
        color: '#ff1adb',
        glow: 'rgba(255, 26, 219, 0.4)',
        pos: [spreadX, spreadY, 0] as [number, number, number],
      },
      {
        view: 'virtual-lab' as const,
        title: t('home', 'featureLabTitle'),
        desc: t('home', 'featureLabDesc'),
        color: '#00ff80',
        glow: 'rgba(0, 255, 128, 0.4)',
        pos: [-spreadX, -spreadY, 0] as [number, number, number],
      },
      {
        view: 'lesson' as const,
        title: t('home', 'featureLessonsTitle'),
        desc: t('home', 'featureLessonsDesc'),
        color: '#a855f7',
        glow: 'rgba(168, 85, 247, 0.4)',
        pos: [spreadX, -spreadY, 0] as [number, number, number],
      },
    ];
  }, [t, isNarrow, isMobile]);

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[10, 15, 10]} intensity={1.8} castShadow />
      <pointLight position={[-10, -5, -5]} color="#00f7ff" intensity={1.5} />
      <Environment preset="city" />

      {podsData.map((pod, idx) => (
        <Feature3DPod
          key={pod.view}
          position={pod.pos}
          title={pod.title}
          desc={pod.desc}
          color={pod.color}
          glow={pod.glow}
          podType={pod.view}
          onClick={() => setActiveView(pod.view)}
          ctaText={t('home', 'cardCta')}
          delayIndex={idx}
        />
      ))}
    </>
  );
};

export const Home3DPodsCanvas: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'visible' }}>
      <Canvas camera={{ position: [0, 0, 8.2], fov: 46 }}>
        <ResponsivePodsGroup />
      </Canvas>
    </div>
  );
};
