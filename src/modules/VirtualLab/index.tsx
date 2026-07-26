import { VirtualLabScene } from './components/3D/VirtualLabScene';
import { ChemicalInventory } from './components/UI/ChemicalInventory';
import { ReactionHUD } from './components/UI/ReactionHUD';
import styles from './styles/VirtualLab.module.css';
import { useVirtualLabStore } from './store/useVirtualLabStore';
import { CHEMICALS } from './data/chemicals';
import { playSciFiSound } from '../PeriodicTable/utils/audio';
import React from 'react';

export const VirtualLab = () => {
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

  // Determine container classes based on theme
  let themeClass = styles.themeScifi;
  if (theme === 'classic') themeClass = styles.themeClassic;
  if (theme === 'realistic') themeClass = styles.themeRealistic;

  return (
    <div 
      className={`${styles.container} ${themeClass}`}
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
          
          {/* Settings Button */}
          <button 
            className={styles.settingsBtn} 
            onClick={() => { playSciFiSound('click'); setIsSettingsOpen(true); }}
            title="Cài đặt"
          >
            ⚙️ Cài đặt
          </button>
        </div>

        <div className={styles.mainLayout}>
          <ChemicalInventory />
          
          {/* Floating Reset Button near the Glass */}
          <button
            className={styles.floatingResetBtn}
            onClick={() => { playSciFiSound('click'); resetBeaker(); }}
            onMouseEnter={() => playSciFiSound('hover')}
            disabled={isReacting || isPouring || reactants.length === 0}
          >
            <span style={{ fontSize: '1.2rem' }}>🔄</span> Làm Sạch Cốc
          </button>
          
          <ReactionHUD />
        </div>
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsSettingsOpen(false)}>
          <div className={styles.settingsModal} onClick={e => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setIsSettingsOpen(false)}>×</button>
            <h2 className={styles.glassTitle}>⚙️ Cài đặt</h2>
            
            <div className={styles.settingsSection}>
              <h3>Giao diện (Theme)</h3>
              <div className={styles.themeSwitcherModal}>
                <button className={`${styles.themeBtn} ${theme === 'scifi' ? styles.active : ''}`} onClick={() => { playSciFiSound('click'); setTheme('scifi'); }}>🪐 Sci-Fi</button>
                <button className={`${styles.themeBtn} ${theme === 'classic' ? styles.active : ''}`} onClick={() => { playSciFiSound('click'); setTheme('classic'); }}>📖 Classic</button>
                <button className={`${styles.themeBtn} ${theme === 'realistic' ? styles.active : ''}`} onClick={() => { playSciFiSound('click'); setTheme('realistic'); }}>🔬 Real Lab</button>
              </div>
            </div>

            <div className={styles.settingsSection}>
              <h3>Âm thanh (Sound)</h3>
              <div className={styles.settingsRow}>
                <span>Tắt tất cả âm thanh:</span>
                <label className={styles.switch}>
                  <input type="checkbox" checked={isMuted} onChange={(e) => { setIsMuted(e.target.checked); playSciFiSound('click'); }} />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>

            <div className={styles.settingsSection}>
              <h3>Trợ lý giọng nói (TTS)</h3>
              <div className={styles.settingsRow} style={{ marginBottom: '12px' }}>
                <span>Tự động đọc Nhật ký:</span>
                <label className={styles.switch}>
                  <input type="checkbox" checked={isAutoPlayVoice} onChange={(e) => { setIsAutoPlayVoice(e.target.checked); playSciFiSound('click'); }} />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.settingsRow} style={{ marginBottom: '12px' }}>
                <span>Giọng đọc:</span>
                <select 
                  className={styles.selectInput}
                  value={ttsVoiceURI || ''} 
                  onChange={(e) => { setTtsVoiceURI(e.target.value); playSciFiSound('click'); }}
                  style={{ maxWidth: '200px' }}
                >
                  <option value="">-- Mặc định --</option>
                  {voices.map(v => (
                    <option key={v.voiceURI} value={v.voiceURI}>{v.name}</option>
                  ))}
                </select>
              </div>
              <div className={styles.settingsRow}>
                <span>Tốc độ đọc:</span>
                <select 
                  className={styles.selectInput}
                  value={ttsSpeed} 
                  onChange={(e) => { setTtsSpeed(parseFloat(e.target.value)); playSciFiSound('click'); }}
                >
                  <option value={0.75}>Chậm</option>
                  <option value={1.0}>Bình thường</option>
                  <option value={1.5}>Nhanh</option>
                </select>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
