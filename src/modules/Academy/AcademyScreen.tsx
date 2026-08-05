import React, { useState, useEffect } from 'react';
import styles from './AcademyScreen.module.less';
import { ACADEMY_UNITS } from './data/academyData';
import type { AcademyTopic } from './data/academyData';
import { AtomicOrbitalViewer } from './components/AtomicOrbitalViewer';
import { PhScaleInteractive } from './components/PhScaleInteractive';
import { AcademyMoleculeViewer } from './components/AcademyMoleculeViewer';
import { useTranslation } from '../../i18n/useTranslation';
import { playSciFiSound } from '../PeriodicTable/utils/audio';
import { speakText, stopSpeaking } from '../VirtualLab/utils/speech';

export const AcademyScreen: React.FC = () => {
  const { language } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<'all' | 'foundation' | 'lesson' | 'lifehack' | 'patent'>('all');
  const [selectedTopic, setSelectedTopic] = useState<AcademyTopic>(ACADEMY_UNITS[0].topics[0]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isReading, setIsReading] = useState(false);

  const isEn = language === 'en';

  // Stop speaking when topic changes or unmounts
  useEffect(() => {
    stopSpeaking();
    setIsReading(false);
    return () => {
      stopSpeaking();
    };
  }, [selectedTopic.id, language]);

  const handleToggleReadArticle = async () => {
    playSciFiSound('click');
    if (isReading) {
      stopSpeaking();
      setIsReading(false);
    } else {
      setIsReading(true);
      const title = isEn ? selectedTopic.titleEn : selectedTopic.title;
      const summary = isEn ? selectedTopic.summaryEn : selectedTopic.summary;
      const sectionsText = selectedTopic.contentSections
        .map((sec) => {
          const heading = isEn ? sec.headingEn : sec.heading;
          const body = isEn ? sec.bodyEn : sec.body;
          const takeaway = sec.keyTakeaway ? (isEn ? sec.keyTakeawayEn : sec.keyTakeaway) : '';
          return `${heading}. ${body}. ${takeaway ? `Ghi nhớ: ${takeaway}` : ''}`;
        })
        .join('. ');

      const fullText = `${title}. ${summary}. ${sectionsText}`;

      await speakText(fullText);
      setIsReading(false);
    }
  };

  const handleOptionSelect = (qIdx: number, optIdx: number) => {
    playSciFiSound('click');
    setUserAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const filteredUnits = ACADEMY_UNITS.map(unit => {
    if (activeCategory === 'all') return unit;
    const topics = unit.topics.filter(t => {
      if (activeCategory === 'foundation') return !t.category || t.category === 'foundation';
      return t.category === activeCategory;
    });
    return { ...unit, topics };
  }).filter(unit => unit.topics.length > 0);

  return (
    <div className={styles.academyScreen}>
      {/* Module Title Header */}
      <div className={styles.header}>
        <span className={styles.badge}>🎓 CHEMISTRY ACADEMY</span>
        <h1>{isEn ? 'Chemistry Academy' : 'Học Viện Hóa Học'}</h1>
        <p>
          {isEn
            ? 'Master chemistry fundamentals, life hacks, and world-changing patent inventions with interactive 3D simulations.'
            : 'Hệ thống lý thuyết cốt lõi, tuyệt chiêu mẹo vặt cuộc sống và bằng sáng chế phát minh qua mô phỏng 3D sinh động.'}
        </p>
      </div>

      <div className={styles.contentLayout}>
        {/* Sidebar Topics Navigation */}
        <aside className={styles.sidebarTree}>
          {/* Category Filter Tabs */}
          <div className={styles.categoryFilterBar}>
            <button
              className={`${styles.categoryTabBtn} ${activeCategory === 'all' ? styles.activeCategory : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              <span>🌐</span> {isEn ? 'All' : 'Tất Cả'}
            </button>
            <button
              className={`${styles.categoryTabBtn} ${activeCategory === 'foundation' ? styles.activeCategory : ''}`}
              onClick={() => setActiveCategory('foundation')}
            >
              <span>🎓</span> {isEn ? 'Theory' : 'Nền Tảng'}
            </button>
            <button
              className={`${styles.categoryTabBtn} ${activeCategory === 'lesson' ? styles.activeCategory : ''}`}
              onClick={() => setActiveCategory('lesson')}
            >
              <span>📚</span> {isEn ? 'Lessons' : 'Bài Học'}
            </button>
            <button
              className={`${styles.categoryTabBtn} ${activeCategory === 'lifehack' ? styles.activeCategory : ''}`}
              onClick={() => setActiveCategory('lifehack')}
            >
              <span>💡</span> {isEn ? 'Life Hacks' : 'Mẹo Vặt'}
            </button>
            <button
              className={`${styles.categoryTabBtn} ${activeCategory === 'patent' ? styles.activeCategory : ''}`}
              onClick={() => setActiveCategory('patent')}
            >
              <span>⚡</span> {isEn ? 'Patents' : 'Bằng Sáng Chế'}
            </button>
          </div>

          {filteredUnits.map(unit => (
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
              {selectedTopic.author && (
                <span className={styles.authorBadge}>
                  ✍️ {isEn ? (selectedTopic.authorEn || selectedTopic.author) : selectedTopic.author}
                </span>
              )}
              {selectedTopic.releaseDate && (
                <span className={styles.dateBadge}>
                  📅 {selectedTopic.releaseDate}
                </span>
              )}

              {/* Text-To-Speech Audio Reader Button */}
              <button
                className={`${styles.audioReaderBtn} ${isReading ? styles.reading : ''}`}
                onClick={handleToggleReadArticle}
                title={isReading ? (isEn ? 'Stop Reading' : 'Dừng đọc bài') : (isEn ? 'Listen to Article' : 'Đọc bài phát âm')}
              >
                {isReading ? (
                  <>
                    <span className={styles.pulseDot} />
                    <span>⏸️ {isEn ? 'Stop' : 'Dừng đọc'}</span>
                  </>
                ) : (
                  <>
                    <span>🔊 {isEn ? 'Listen' : 'Đọc bài'}</span>
                  </>
                )}
              </button>
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
          {selectedTopic.interactiveWidget === 'molecule-3d' && <AcademyMoleculeViewer moleculeId={selectedTopic.id} />}

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
