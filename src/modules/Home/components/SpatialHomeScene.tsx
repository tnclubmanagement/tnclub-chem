import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Spatial3DCard } from './Spatial3DCard';
import { useChemStore } from '../../PeriodicTable/store/useChemStore';
import { useTranslation } from '../../../i18n/useTranslation';

export const SpatialHomeScene: React.FC = () => {
  const setActiveView = useChemStore((s) => s.setActiveView);
  const { t } = useTranslation();

  const cardsData: Array<{
    view: 'periodic-table' | 'explorer' | 'virtual-lab' | 'lesson';
    title: string;
    desc: string;
    color: string;
    glow: string;
    iconType: 'atomic' | 'molecule' | 'lab' | 'lesson';
    pos: [number, number, number];
  }> = [
    {
      view: 'periodic-table',
      title: t('home', 'featurePeriodicTitle'),
      desc: t('home', 'featurePeriodicDesc'),
      color: '#00f7ff',
      glow: 'rgba(0, 247, 255, 0.4)',
      iconType: 'atomic',
      pos: [-4.2, 1.4, 0],
    },
    {
      view: 'explorer',
      title: t('home', 'featureExplorerTitle'),
      desc: t('home', 'featureExplorerDesc'),
      color: '#ff1adb',
      glow: 'rgba(255, 26, 219, 0.4)',
      iconType: 'molecule',
      pos: [-1.4, 1.4, 0],
    },
    {
      view: 'virtual-lab',
      title: t('home', 'featureLabTitle'),
      desc: t('home', 'featureLabDesc'),
      color: '#00ff80',
      glow: 'rgba(0, 255, 128, 0.4)',
      iconType: 'lab',
      pos: [1.4, 1.4, 0],
    },
    {
      view: 'lesson',
      title: t('home', 'featureLessonsTitle'),
      desc: t('home', 'featureLessonsDesc'),
      color: '#a855f7',
      glow: 'rgba(168, 85, 247, 0.4)',
      iconType: 'lesson',
      pos: [4.2, 1.4, 0],
    },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 15, 10]} intensity={1.8} castShadow />
        <pointLight position={[-10, -5, -5]} color="#00f7ff" intensity={1.5} />
        <Environment preset="city" />

        {/* 4 Floating Spatial 3D Cards */}
        {cardsData.map((card, idx) => (
          <Spatial3DCard
            key={card.view}
            position={card.pos}
            title={card.title}
            desc={card.desc}
            color={card.color}
            glow={card.glow}
            iconType={card.iconType}
            onClick={() => setActiveView(card.view)}
            ctaText={t('home', 'cardCta')}
            delayIndex={idx}
          />
        ))}
      </Canvas>
    </div>
  );
};
