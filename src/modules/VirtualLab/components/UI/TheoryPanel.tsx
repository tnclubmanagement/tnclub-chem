import React, { useState } from 'react';
import styles from '../../styles/VirtualLab.module.css';
import { playSciFiSound } from '../../../PeriodicTable/utils/audio';
import { speakText, stopSpeaking } from '../../utils/speech';
import { THEORY_DATA } from '../../data/theory';
import { AVAILABLE_CHEMICALS } from '../../data/chemicals';

interface TheoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TheoryPanel: React.FC<TheoryPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'principle' | 'chemical'>('principle');

  const handleSpeak = (text: string) => {
    playSciFiSound('click');
    speakText(text);
  };

  const handleStop = () => {
    playSciFiSound('click');
    stopSpeaking();
  };

  return (
    <>
      {/* Optional: Add a subtle overlay that only covers the right side, or no overlay at all to allow interacting with the left side */}
      <div 
        className={`${styles.theoryPanel} ${isOpen ? styles.open : ''}`}
        role="dialog"
        aria-label="Thư viện Lý thuyết"
        aria-hidden={!isOpen}
      >
        <div className={styles.panelHeader}>
          <h2>📚 Thư viện Lý thuyết</h2>
          <button 
            className={styles.closeBtn} 
            onClick={() => { playSciFiSound('click'); onClose(); }}
            title="Đóng Thư viện Lý thuyết"
            aria-label="Đóng thư viện lý thuyết"
          >
            ×
          </button>
        </div>

        <div className={styles.tabs} role="tablist">
          <button 
            className={`${styles.tabBtn} ${activeTab === 'principle' ? styles.active : ''}`}
            onClick={() => { playSciFiSound('hover'); setActiveTab('principle'); }}
            role="tab"
            aria-selected={activeTab === 'principle'}
            title="Xem tab Nguyên lý Phản ứng"
          >
            Nguyên lý Phản ứng
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'chemical' ? styles.active : ''}`}
            onClick={() => { playSciFiSound('hover'); setActiveTab('chemical'); }}
            role="tab"
            aria-selected={activeTab === 'chemical'}
            title="Xem tab Từ điển Hóa chất"
          >
            Từ điển Hóa chất
          </button>
        </div>

        <div className={styles.panelContent} role="tabpanel">
          {activeTab === 'principle' && (
            <div className={styles.theoryList}>
              {THEORY_DATA.map((item) => (
                <div key={item.id} className={styles.theoryCard}>
                  <div className={styles.theoryCardHeader}>
                    <h3>{item.title}</h3>
                    <div className={styles.ttsControls}>
                      <button onClick={() => handleSpeak(item.content)} title="Đọc nội dung" aria-label="Đọc nội dung bằng AI">🔊</button>
                      <button onClick={handleStop} title="Dừng đọc" aria-label="Dừng đọc AI">⏹</button>
                    </div>
                  </div>
                  <p>{item.content}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'chemical' && (
            <div className={styles.theoryList}>
              {AVAILABLE_CHEMICALS.map((chem) => (
                <div key={chem.id} className={styles.theoryCard}>
                  <div className={styles.theoryCardHeader}>
                    <h3>{chem.name} ({chem.formula})</h3>
                    <div className={styles.ttsControls}>
                      <button onClick={() => handleSpeak(`${chem.name}, công thức ${chem.formula}. ${chem.application}`)} title="Đọc thông tin hóa chất" aria-label="Đọc thông tin hóa chất bằng AI">🔊</button>
                      <button onClick={handleStop} title="Dừng đọc" aria-label="Dừng đọc AI">⏹</button>
                    </div>
                  </div>
                  <div className={styles.chemProps}>
                    <span className={styles.propBadge} style={{ backgroundColor: chem.colorHex, color: chem.colorTheme === 'white' || chem.colorTheme === 'colorless' ? '#000' : '#fff' }}>
                      Màu: {chem.colorTheme}
                    </span>
                    <span className={styles.propBadge}>
                      Trạng thái: {chem.state === 'solid' ? 'Rắn' : chem.state === 'aqueous' ? 'Dung dịch' : chem.state === 'liquid' ? 'Lỏng' : 'Khí'}
                    </span>
                    <span className={styles.propBadge}>
                      Nhóm: {chem.group}
                    </span>
                  </div>
                  <p>{chem.application}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
