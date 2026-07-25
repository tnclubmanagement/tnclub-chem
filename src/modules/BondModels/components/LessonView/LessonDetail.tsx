import React, { useState, useEffect } from 'react';
import { useChemStore } from '../../../PeriodicTable';
import { LESSONS } from '../../../PeriodicTable/data/lessons';
import { BondModelVisualizer } from '../3D/BondModelVisualizer';
import { playSciFiSound } from '../../../PeriodicTable/utils/audio';
import styles from './LessonDetail.module.css';

export const LessonDetail: React.FC = () => {
  const { activeLessonId, setActiveLessonId, soundEnabled } = useChemStore();
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

  return (
    <div className={styles.lessonContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>{lessonData.title}</h2>
        <button className={styles.backBtn} onClick={handleBack}>
          ← Quay lại Thư viện
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.visualizerArea}>
          <BondModelVisualizer modelType={lessonData.id} />
        </div>

        <div className={styles.infoArea}>
          <div className={styles.card}>
            <h3>📖 Lý thuyết</h3>
            <p className={styles.desc}>{lessonData.theory.description}</p>
            <ul className={styles.propList}>
              {lessonData.theory.properties.map((prop, idx) => (
                <li key={idx}>{prop}</li>
              ))}
            </ul>
          </div>

          <div className={styles.card}>
            <h3>🎯 Trắc nghiệm nhanh</h3>
            <p className={styles.desc} style={{ color: '#fff', fontWeight: 600 }}>
              {lessonData.quiz.text}
            </p>
            
            <div className={styles.options}>
              {lessonData.quiz.options.map((opt, idx) => {
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
                <strong>Giải thích: </strong> {lessonData.quiz.explanation}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
