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

  const podsData = useMemo(() => {
    // Dynamic X step based on viewport width, scaling up to 3.35 for full screen width
    const stepX = Math.min(3.35, Math.max(1.5, viewport.width / 4.65));

    const pods = [
      {
        view: 'periodic-table' as const,
        title: t('home', 'featurePeriodicTitle'),
        desc: t('home', 'featurePeriodicDesc'),
        color: '#00f7ff',
        glow: 'rgba(0, 247, 255, 0.4)',
        index: 0,
      },
      {
        view: 'explorer' as const,
        title: t('home', 'featureExplorerTitle'),
        desc: t('home', 'featureExplorerDesc'),
        color: '#ff1adb',
        glow: 'rgba(255, 26, 219, 0.4)',
        index: 1,
      },
      {
        view: 'virtual-lab' as const,
        title: t('home', 'featureLabTitle'),
        desc: t('home', 'featureLabDesc'),
        color: '#00ff80',
        glow: 'rgba(0, 255, 128, 0.4)',
        index: 2,
      },
      {
        view: 'lesson' as const,
        title: t('home', 'featureLessonsTitle'),
        desc: t('home', 'featureLessonsDesc'),
        color: '#a855f7',
        glow: 'rgba(168, 85, 247, 0.4)',
        index: 3,
      },
      {
        view: 'academy' as const,
        title: t('home', 'featureAcademyTitle'),
        desc: t('home', 'featureAcademyDesc'),
        color: '#eab308',
        glow: 'rgba(234, 179, 8, 0.4)',
        index: 4,
      },
    ];

    return pods.map((pod) => {
      // Map 5 pods (index 0..4) to horizontal positions -2, -1, 0, 1, 2
      const indexOffset = pod.index - 2;
      const posX = indexOffset * stepX;
      // Curved 3D parabolic depth: center pod comes slightly forward, outer pods curve back
      const posZ = Math.cos(indexOffset * 0.48) * 0.4 - 0.2;
      const posY = 0.08 + Math.sin(Math.abs(indexOffset) * 0.35) * 0.06;

      return {
        ...pod,
        pos: [posX, posY, posZ] as [number, number, number],
      };
    });
  }, [t, viewport.width]);

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
      <Canvas camera={{ position: [0, 0.25, 11.4], fov: 48 }}>
        <ResponsivePodsGroup />
      </Canvas>
    </div>
  );
};
