import React from 'react';
import { ELEMENTS } from '../../data/elements';
import { ElementBox } from './ElementBox';
import { Controls } from './Controls';
import { useChemStore } from '../../store/useChemStore';
import { playSciFiSound } from '../../utils/audio';
import { useTranslation } from '../../../../i18n/useTranslation';
import styles from './PeriodicTable.module.css';

export const PeriodicTable: React.FC = () => {
  const { setActiveGroup, setActivePeriod, activeGroup, activePeriod, quizModeActive, setQuizModeActive, setQuizTargetZ, soundEnabled } = useChemStore();
  const { t } = useTranslation();

  const [currentQuiz, setCurrentQuiz] = React.useState<{q: string, a: number} | null>(null);
  const [quizStatus, setQuizStatus] = React.useState<'idle' | 'correct' | 'wrong'>('idle');

  React.useEffect(() => {
    if (quizModeActive) {
      const quizQuestions = [
        { q: "Tìm Kim loại kiềm nhẹ nhất?", a: 3 },
        { q: "Nguyên tố nào là khối lõi của ngành công nghiệp bán dẫn?", a: 14 },
        { q: "Khí hiếm nào được bơm vào khinh khí cầu an toàn?", a: 2 },
        { q: "Kim loại lỏng duy nhất ở nhiệt độ phòng?", a: 80 },
        { q: "Nguyên tố có độ âm điện lớn nhất?", a: 9 },
        { q: "Thành phần cốt lõi của xương và răng?", a: 20 },
        { q: "Khí duy trì sự cháy và hô hấp?", a: 8 },
        { q: "Kim loại có điểm nóng chảy cao nhất (dùng làm dây tóc bóng đèn)?", a: 74 }
      ];
      const q = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
      setCurrentQuiz(q);
      setQuizTargetZ(q.a);
      setQuizStatus('idle');
    } else {
      setCurrentQuiz(null);
      setQuizTargetZ(null);
    }
  }, [quizModeActive, setQuizTargetZ]);

  const renderGroupHeaders = () => {
    const headers = [];
    for (let i = 1; i <= 18; i++) {
      headers.push(
        <div
          key={`g-${i}`}
          className={`${styles.header} ${styles.groupHeader} ${activeGroup === i ? styles.active : ''}`}
          style={{ gridColumn: i + 1, gridRow: 1 }}
          onClick={() => setActiveGroup(i)}
        >
          {i}
        </div>
      );
    }
    return headers;
  };

  const renderPeriodHeaders = () => {
    const headers = [];
    for (let i = 1; i <= 7; i++) {
      headers.push(
        <div
          key={`p-${i}`}
          className={`${styles.header} ${styles.periodHeader} ${activePeriod === i ? styles.active : ''}`}
          style={{ gridColumn: 1, gridRow: i + 1 }}
          onClick={() => setActivePeriod(i)}
        >
          {i}
        </div>
      );
    }
    return headers;
  };

  return (
    <section className={styles.overlay}>
      <div className={styles.topbar}>
        <h2>{t('periodicTable', 'title')}</h2>
        <div className={styles.subtitle}>{t('periodicTable', 'subtitle')}</div>
      </div>

      <Controls />

      <div className={styles.gridWrapper}>
        <div className={styles.grid}>
          {renderGroupHeaders()}
          {renderPeriodHeaders()}
          {ELEMENTS.map((el) => (
            <ElementBox
              key={el.z}
              element={el}
              onQuizFeedback={(isCorrect) => setQuizStatus(isCorrect ? 'correct' : 'wrong')}
            />
          ))}
        </div>
      </div>

      {quizModeActive && currentQuiz && (
        <div className={styles.ptQuizFloat} style={{ borderColor: quizStatus === 'correct' ? '#10b981' : quizStatus === 'wrong' ? '#ef4444' : '#0ea5e9' }}>
          {quizStatus === 'idle' && (
            <>
              <h3 style={{ marginBottom: '0.5rem', color: '#0ea5e9', fontSize: '1.4rem' }}>{t('periodicTable', 'quizTitle')}</h3>
              <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{currentQuiz.q}</p>
              <p style={{ fontSize: '0.95rem', color: '#94a3b8' }}>{t('periodicTable', 'quizPrompt')}</p>
            </>
          )}
          {quizStatus === 'correct' && (
            <>
              <h3 style={{ marginBottom: '0.5rem', color: '#10b981' }}>{t('periodicTable', 'quizCorrectTitle')}</h3>
              <p style={{ fontSize: '1.1rem' }}>{t('periodicTable', 'quizCorrectDesc')}</p>
              <button
                className={styles.quizNextBtn}
                onClick={() => {
                  playSciFiSound('click', soundEnabled);
                  setQuizModeActive(false);
                  setTimeout(() => setQuizModeActive(true), 100);
                }}
              >
                {t('periodicTable', 'quizNextBtn')}
              </button>
            </>
          )}
          {quizStatus === 'wrong' && (
            <>
              <h3 style={{ marginBottom: '0.5rem', color: '#ef4444' }}>{t('periodicTable', 'quizWrongTitle')}</h3>
              <p style={{ fontSize: '1.1rem' }}>{t('periodicTable', 'quizWrongDesc')}</p>
              <button
                className={styles.quizNextBtn}
                onClick={() => { playSciFiSound('click', soundEnabled); setQuizStatus('idle'); }}
              >
                {t('periodicTable', 'quizRetryBtn')}
              </button>
            </>
          )}
          <button
            className={styles.quizCloseBtn}
            onClick={() => { playSciFiSound('click', soundEnabled); setQuizModeActive(false); }}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
};
