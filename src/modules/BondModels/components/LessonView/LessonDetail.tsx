import React, { useState, useEffect } from 'react';
import { useChemStore } from '../../../PeriodicTable';
import { LESSONS } from '../../../PeriodicTable/data/lessons';
import { BondModelVisualizer } from '../3D/BondModelVisualizer';
import { playSciFiSound } from '../../../PeriodicTable/utils/audio';
import { useTranslation } from '../../../../i18n/useTranslation';
import styles from './LessonDetail.module.css';

export const LessonDetail: React.FC = () => {
  const { activeLessonId, setActiveLessonId, soundEnabled } = useChemStore();
  const { t, language } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  const lessonData = LESSONS.find(l => l.id === activeLessonId) || LESSONS[0];

  // Reset quiz state when lesson changes
  useEffect(() => {
    setSelectedOption(null);
  }, [activeLessonId]);

  const handleBack = () => {
    playSciFiSound('click', soundEnabled);
    setActiveLessonId(null);
  };

  const handleOptionClick = (idx: number) => {
    if (selectedOption !== null) return; // Prevent changing after answered
    playSciFiSound('click', soundEnabled);
    setSelectedOption(idx);
  };

  if (!lessonData) return null;

  const title = language === 'en' ? (lessonData.titleEn || lessonData.title) : lessonData.title;
  const theoryDesc = language === 'en' ? (lessonData.theoryEn?.description || lessonData.theory.description) : lessonData.theory.description;
  const theoryProps = language === 'en' ? (lessonData.theoryEn?.properties || lessonData.theory.properties) : lessonData.theory.properties;
  
  const quizText = language === 'en' ? (lessonData.quizEn?.text || lessonData.quiz.text) : lessonData.quiz.text;
  const quizOptions = language === 'en' ? (lessonData.quizEn?.options || lessonData.quiz.options) : lessonData.quiz.options;
  const quizExplanation = language === 'en' ? (lessonData.quizEn?.explanation || lessonData.quiz.explanation) : lessonData.quiz.explanation;

  return (
    <div className={styles.lessonContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <button className={styles.backBtn} onClick={handleBack}>
          {t('lessons', 'backBtn')}
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.visualizerArea}>
          <BondModelVisualizer modelType={lessonData.id} />
        </div>

        <div className={styles.infoArea}>
          <div className={styles.card}>
            <h3>{t('lessons', 'theoryHeader')}</h3>
            <p className={styles.desc}>{theoryDesc}</p>
            <ul className={styles.propList}>
              {theoryProps.map((prop, idx) => (
                <li key={idx}>{prop}</li>
              ))}
            </ul>
          </div>

          <div className={styles.card}>
            <h3>{t('lessons', 'quizHeader')}</h3>
            <p className={styles.desc} style={{ color: '#fff', fontWeight: 600 }}>
              {quizText}
            </p>
            
            <div className={styles.options}>
              {quizOptions.map((opt, idx) => {
                let btnClass = styles.quizOption;
                if (selectedOption !== null) {
                  if (idx === lessonData.quiz.correctIndex) {
                    btnClass += ` ${styles.correct}`;
                  } else if (idx === selectedOption) {
                    btnClass += ` ${styles.wrong}`;
                  }
                }

                return (
                  <button 
                    key={idx} 
                    className={btnClass}
                    onClick={() => handleOptionClick(idx)}
                    disabled={selectedOption !== null}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <div className={styles.explanation}>
                <strong>{t('lessons', 'explanationHeader')} </strong> {quizExplanation}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
