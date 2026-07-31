import { VirtualLabScene } from './components/3D/VirtualLabScene';
import { ChemicalInventory } from './components/UI/ChemicalInventory';
import { ReactionHUD } from './components/UI/ReactionHUD';
import styles from './styles/VirtualLab.module.css';
import { useVirtualLabStore } from './store/useVirtualLabStore';
import { CHEMICALS } from './data/chemicals';
import { playSciFiSound } from '../PeriodicTable/utils/audio';
import React from 'react';
import { TheoryPanel } from './components/UI/TheoryPanel';
import { MissionHUD } from './components/UI/MissionHUD';

export const VirtualLab: React.FC = () => {
  const addReactant = useVirtualLabStore((state) => state.addReactant);
  const theme = useVirtualLabStore((state) => state.theme);
  const setTheme = useVirtualLabStore((state) => state.setTheme);
  const resetBeaker = useVirtualLabStore((state) => state.resetBeaker);
  const reactants = useVirtualLabStore((state) => state.reactants);
  const isReacting = useVirtualLabStore((state) => state.isReacting);
  const isPouring = useVirtualLabStore((state) => state.isPouring);
  const isMuted = useVirtualLabStore((state) => state.isMuted);
  const setIsMuted = useVirtualLabStore((state) => state.setIsMuted);
  const ttsSpeed = useVirtualLabStore((state) => state.ttsSpeed);
  const setTtsSpeed = useVirtualLabStore((state) => state.setTtsSpeed);
  const ttsVoiceURI = useVirtualLabStore((state) => state.ttsVoiceURI);
  const setTtsVoiceURI = useVirtualLabStore((state) => state.setTtsVoiceURI);
  const isAutoPlayVoice = useVirtualLabStore((state) => state.isAutoPlayVoice);
  const setIsAutoPlayVoice = useVirtualLabStore((state) => state.setIsAutoPlayVoice);

  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isTheoryOpen, setIsTheoryOpen] = React.useState(false);
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([]);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        // Filter Vietnamese voices if available, else show all
        const viVoices = availableVoices.filter(v => v.lang.includes('vi') || v.lang.includes('VI'));
        if (viVoices.length > 0) {
          setVoices(viVoices);
        } else {
          setVoices(availableVoices);
        }
      };
      
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const chemId = e.dataTransfer.getData('text/plain');
    if (chemId && CHEMICALS[chemId]) {
      addReactant(CHEMICALS[chemId]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const currentReaction = useVirtualLabStore((state) => state.currentReaction);

  // Determine container classes based on theme
  let themeClass = styles.themeScifi;
  if (theme === 'classic') themeClass = styles.themeClassic;
  if (theme === 'realistic') themeClass = styles.themeRealistic;

  // Screen shake effect for explosions
  const shakeClass = (isReacting && currentReaction?.effect === 'explosion') ? styles.screenShake : '';

  return (
    <div 
      className={`${styles.container} ${themeClass} ${shakeClass}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <VirtualLabScene />
      
      {/* Overlay UI */}
      <div className={styles.uiLayer}>
        <div className={styles.topBar}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              Virtual Chemistry Lab
            </h1>
            <p className={styles.subtitle}>
              Mô phỏng Phản ứng Hóa học Ảo 3D
            </p>
          </div>
          
          {/* Top Actions */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }} role="toolbar" aria-label="Các công cụ chính">
            <button 
              className={`${styles.settingsBtn} ${useVirtualLabStore(s => s.isMissionModeActive) ? styles.active : ''}`}
              onClick={() => { playSciFiSound('click'); useVirtualLabStore.getState().toggleMissionMode(); }}
              title="Bật/Tắt Chế độ Thử thách Gamification"
              aria-label="Bật hoặc tắt chế độ thử thách"
              aria-pressed={useVirtualLabStore(s => s.isMissionModeActive)}
              style={useVirtualLabStore(s => s.isMissionModeActive) ? { backgroundColor: 'rgba(16, 185, 129, 0.2)', borderColor: '#10b981', color: '#10b981' } : {}}
            >
              🎮 Thử thách
            </button>
            <button 
              className={styles.settingsBtn}
              onClick={() => { playSciFiSound('click'); setIsTheoryOpen(true); }}
              title="Mở Thư viện Lý thuyết Hóa học"
              aria-label="Mở thư viện lý thuyết hóa học"
              aria-expanded={isTheoryOpen}
            >
              📚 Lý thuyết
            </button>
            <button 
              className={styles.settingsBtn}
              onClick={() => { playSciFiSound('click'); setIsSettingsOpen(true); }}
              title="Mở bảng Cài đặt Ứng dụng"
              aria-label="Mở cài đặt ứng dụng"
              aria-expanded={isSettingsOpen}
            >
              ⚙️ Cài đặt
            </button>
          </div>
        </div>

        {useVirtualLabStore(s => s.isMissionModeActive) && <MissionHUD />}

        {/* Theory Panel (Side Drawer) */}
        <TheoryPanel isOpen={isTheoryOpen} onClose={() => setIsTheoryOpen(false)} />

        <div className={styles.mainLayout}>
          <ChemicalInventory />
          
          {/* Floating Reset Button near the Glass */}
          <button
            className={styles.floatingResetBtn}
            onClick={() => { playSciFiSound('click'); resetBeaker(); }}
            onMouseEnter={() => playSciFiSound('hover')}
            disabled={isReacting || isPouring || reactants.length === 0}
            title="Đổ hóa chất đi và làm sạch cốc thí nghiệm"
            aria-label="Làm sạch cốc thí nghiệm"
          >
            <span style={{ fontSize: '1.2rem' }} aria-hidden="true">🔄</span> Làm Sạch Cốc
          </button>
          
          <ReactionHUD />
        </div>
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsSettingsOpen(false)}>
          <div className={styles.settingsModal} onClick={e => e.stopPropagation()}>
            <div className={styles.settingsHeader}>
              <h2 className={styles.glassTitle}>⚙️ Cài đặt Hệ thống</h2>
              <button className={styles.closeBtn} onClick={() => setIsSettingsOpen(false)} aria-label="Đóng cài đặt">×</button>
            </div>
            
            <div className={styles.settingsGrid}>
              {/* Cột trái */}
              <div className={styles.settingsCol}>
                <div className={styles.settingsSection}>
                  <h3>🎨 Giao diện (Theme)</h3>
                  <div className={styles.themeSwitcherModal}>
                    <button className={`${styles.themeBtn} ${theme === 'scifi' ? styles.active : ''}`} onClick={() => { playSciFiSound('click'); setTheme('scifi'); }}>🪐 Sci-Fi</button>
                    <button className={`${styles.themeBtn} ${theme === 'classic' ? styles.active : ''}`} onClick={() => { playSciFiSound('click'); setTheme('classic'); }}>📖 Classic</button>
                    <button className={`${styles.themeBtn} ${theme === 'realistic' ? styles.active : ''}`} onClick={() => { playSciFiSound('click'); setTheme('realistic'); }}>🔬 Real Lab</button>
                  </div>
                </div>

                <div className={styles.settingsSection}>
                  <h3>🔊 Âm thanh (Sound)</h3>
                  <div className={styles.settingsRow}>
                    <span>Tắt tất cả âm thanh:</span>
                    <label className={styles.switch}>
                      <input type="checkbox" checked={isMuted} onChange={(e) => { setIsMuted(e.target.checked); playSciFiSound('click'); }} />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Cột phải */}
              <div className={styles.settingsCol}>
                <div className={styles.settingsSection}>
                  <h3>🤖 Trợ lý giọng nói (AI TTS)</h3>
                  
                  <div className={styles.settingsRow} style={{ marginBottom: '20px' }}>
                    <span>Tự động đọc Nhật ký:</span>
                    <label className={styles.switch}>
                      <input type="checkbox" checked={isAutoPlayVoice} onChange={(e) => { setIsAutoPlayVoice(e.target.checked); playSciFiSound('click'); }} />
                      <span className={styles.slider}></span>
                    </label>
                  </div>

                  <div className={styles.settingsGroup}>
                    <span className={styles.groupLabel}>Tốc độ đọc:</span>
                    <div className={styles.themeSwitcherModal}>
                      <button className={`${styles.themeBtn} ${ttsSpeed === 0.75 ? styles.active : ''}`} onClick={() => { playSciFiSound('click'); setTtsSpeed(0.75); }}>0.75x</button>
                      <button className={`${styles.themeBtn} ${ttsSpeed === 1.0 ? styles.active : ''}`} onClick={() => { playSciFiSound('click'); setTtsSpeed(1.0); }}>1.0x</button>
                      <button className={`${styles.themeBtn} ${ttsSpeed === 1.5 ? styles.active : ''}`} onClick={() => { playSciFiSound('click'); setTtsSpeed(1.5); }}>1.5x</button>
                    </div>
                  </div>

                  <div className={styles.settingsGroup} style={{ marginTop: '20px' }}>
                    <span className={styles.groupLabel}>Giọng đọc (Voice):</span>
                    {/* Modern UI Custom Select instead of native select */}
                    <div className={styles.customSelectWrapper}>
                      <select 
                        className={styles.modernSelect}
                        value={ttsVoiceURI || ''} 
                        onChange={(e) => { setTtsVoiceURI(e.target.value); playSciFiSound('click'); }}
                      >
                        <option value="">-- Giọng Mặc định --</option>
                        {voices.map(v => (
                          <option key={v.voiceURI} value={v.voiceURI}>{v.name}</option>
                        ))}
                      </select>
                      <span className={styles.selectArrow}>▼</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
