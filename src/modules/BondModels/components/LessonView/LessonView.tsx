import React from 'react';
import { useChemStore } from '../../../PeriodicTable';
import { LessonDashboard } from './LessonDashboard';
import { LessonDetail } from './LessonDetail';

export const LessonView: React.FC = () => {
  const { activeLessonId } = useChemStore();

  if (activeLessonId) {
    return <LessonDetail />;
  }
  
  return <LessonDashboard />;
};
