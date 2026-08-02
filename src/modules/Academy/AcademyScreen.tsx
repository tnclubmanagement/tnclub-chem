import React, { useState } from 'react';
import styles from './AcademyScreen.module.less';
import { ACADEMY_UNITS } from './data/academyData';
import type { AcademyTopic } from './data/academyData';
import { AtomicOrbitalViewer } from './components/AtomicOrbitalViewer';
import { PhScaleInteractive } from './components/PhScaleInteractive';
import { useTranslation } from '../../i18n/useTranslation';
import { playSciFiSound } from '../PeriodicTable/utils/audio';

export const AcademyScreen: React.FC = () => {
  const { language } = useTranslation();
  const [selectedTopic, setSelectedTopic] = useState<AcademyTopic>(ACADEMY_UNITS[0].topics[0]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});

  const isEn = language === 'en';

  const handleOptionSelect = (qIdx: number, optIdx: number) => {
    playSciFiSound('click');
    setUserAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  return (
    <div className={styles.academyScreen}>
      {/* Module Title Header */}
      <div className={styles.header}>
        <span className={styles.badge}>🎓 CHEMISTRY ACADEMY</span>
        <h1>{isEn ? 'Foundational Chemistry Academy' : 'Học Viện Kiến Thức Hóa Học Nền Tảng'}</h1>
        <p>
          {isEn
            ? 'Master fundamental chemistry concepts through interactive 3D visualizers and instant quizzes.'
            : 'Hệ thống lý thuyết cốt lõi qua mô phỏng 3D sinh động và bài tập củng cố kiến thức.'}
        </p>
      </div>

      <div className={styles.contentLayout}>
        {/* Sidebar Topics Navigation */}
        <aside className={styles.sidebarTree}>
          {ACADEMY_UNITS.map(unit => (
            <div key={unit.id} className={styles.unitGroup}>
              <div className={styles.unitTitle}>{isEn ? unit.titleEn : unit.title}</div>
              <div className={styles.topicList}>
                {unit.topics.map(topic => {
                  const isActive = selectedTopic.id === topic.id;
                  return (
                    <button
                      key={topic.id}
                      className={`${styles.topicNavBtn} ${isActive ? styles.active : ''}`}
                      onClick={() => {
                        playSciFiSound('hover');
                        setSelectedTopic(topic);
                        setUserAnswers({});
                      }}
                    >
                      <span className={styles.topicIcon}>{topic.icon}</span>
                      <div className={styles.topicNavMeta}>
                        <span className={styles.topicNavTitle}>{isEn ? topic.titleEn : topic.title}</span>
                        <span className={styles.topicNavSub}>{topic.readTime}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </aside>

        {/* Main Learning Article View */}
        <main className={styles.mainArticle}>
          <div className={styles.articleHeader}>
            <div className={styles.articleMeta}>
              <span className={styles.levelBadge}>{selectedTopic.level}</span>
              <span className={styles.timeBadge}>⏱️ {selectedTopic.readTime}</span>
            </div>
            <h2>{isEn ? selectedTopic.titleEn : selectedTopic.title}</h2>
            <p className={styles.subtitle}>{isEn ? selectedTopic.subtitleEn : selectedTopic.subtitle}</p>
          </div>

          {/* Key Summary */}
          <div className={styles.summaryBox}>
            💡 <strong>{isEn ? 'Summary:' : 'Tóm tắt:'}</strong> {isEn ? selectedTopic.summaryEn : selectedTopic.summary}
          </div>

          {/* Interactive Widget Injection */}
          {selectedTopic.interactiveWidget === 'orbital-3d' && <AtomicOrbitalViewer />}
          {selectedTopic.interactiveWidget === 'ph-meter' && <PhScaleInteractive />}

          {/* Content Sections */}
          {selectedTopic.contentSections.map((sec, idx) => (
            <div key={idx} className={styles.section}>
              <h3>{isEn ? sec.headingEn : sec.heading}</h3>
              <p>{isEn ? sec.bodyEn : sec.body}</p>
              {sec.keyTakeaway && (
                <div className={styles.takeaway}>
                  📌 <strong>{isEn ? 'Key Point:' : 'Ghi nhớ:'}</strong> {isEn ? sec.keyTakeawayEn : sec.keyTakeaway}
                </div>
              )}
            </div>
          ))}

          {/* Practice Quiz */}
          {selectedTopic.quiz && selectedTopic.quiz.length > 0 && (
            <div className={styles.quizSection}>
              <h3>📝 {isEn ? 'Quick Knowledge Check' : 'Củng Cố Kiến Thức Nhanh'}</h3>
              {selectedTopic.quiz.map((q, qIdx) => {
                const selectedOpt = userAnswers[qIdx];
                const isAnswered = selectedOpt !== undefined;
                const opts = isEn ? q.optionsEn : q.options;
                return (
                  <div key={qIdx} className={styles.quizCard}>
                    <div className={styles.question}>
                      {qIdx + 1}. {isEn ? q.questionEn : q.question}
                    </div>
                    <div className={styles.optionsGrid}>
                      {opts.map((opt, optIdx) => {
                        let btnClass = styles.optBtn;
                        if (isAnswered) {
                          if (optIdx === q.correctIndex) btnClass += ` ${styles.correct}`;
                          else if (selectedOpt === optIdx) btnClass += ` ${styles.wrong}`;
                        }
                        return (
                          <button
                            key={optIdx}
                            className={btnClass}
                            onClick={() => handleOptionSelect(qIdx, optIdx)}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {isAnswered && (
                      <div className={styles.explanation}>
                        {selectedOpt === q.correctIndex ? '🎉 Chính xác! ' : '❌ Chưa đúng. '}
                        {isEn ? q.explanationEn : q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
