import { VirtualLabScene } from './components/3D/VirtualLabScene';
import { ChemicalInventory } from './components/UI/ChemicalInventory';
import { ReactionHUD } from './components/UI/ReactionHUD';
import styles from './styles/VirtualLab.module.less';
import { useVirtualLabStore } from './store/useVirtualLabStore';
import { CHEMICALS } from './data/chemicals';
import { playSciFiSound } from '../PeriodicTable/utils/audio';
import React from 'react';
import { TheoryPanel } from './components/UI/TheoryPanel';
import { MissionHUD } from './components/UI/MissionHUD';
import { useTranslation } from '../../i18n/useTranslation';

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

  const { t, language, setLanguage } = useTranslation();

  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isTheoryOpen, setIsTheoryOpen] = React.useState(false);
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([]);

  // Filter voices based on currently selected language (VI vs EN)
  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const available = window.speechSynthesis.getVoices();
        let filtered: SpeechSynthesisVoice[] = [];
        if (language === 'en') {
          filtered = available.filter(v => v.lang.startsWith('en') || v.lang.includes('EN'));
        } else {
          filtered = available.filter(v => v.lang.includes('vi') || v.lang.includes('VI'));
        }
        if (filtered.length === 0) {
          filtered = available;
        }
        setVoices(filtered);
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [language]);

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
              {t('virtualLab', 'title')}
            </h1>
            <p className={styles.subtitle}>
              {t('virtualLab', 'subtitle')}
            </p>
          </div>

          {/* Top Actions */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }} role="toolbar" aria-label={t('virtualLab', 'toolbarLabel')}>
            <button
              className={`${styles.settingsBtn} ${useVirtualLabStore(s => s.isMissionModeActive) ? styles.active : ''}`}
              onClick={() => { playSciFiSound('click'); useVirtualLabStore.getState().toggleMissionMode(); }}
              title={t('virtualLab', 'challengeTitle')}
              aria-label={t('virtualLab', 'challengeAriaLabel')}
              aria-pressed={useVirtualLabStore(s => s.isMissionModeActive)}
              style={useVirtualLabStore(s => s.isMissionModeActive) ? { backgroundColor: 'rgba(16, 185, 129, 0.2)', borderColor: '#10b981', color: '#10b981' } : {}}
            >
              {t('virtualLab', 'challengeBtn')}
            </button>
            <button
              className={styles.settingsBtn}
              onClick={() => { playSciFiSound('click'); setIsTheoryOpen(true); }}
              title={t('virtualLab', 'theoryTitle')}
              aria-label={t('virtualLab', 'theoryAriaLabel')}
              aria-expanded={isTheoryOpen}
            >
              {t('virtualLab', 'theoryBtn')}
            </button>
            <button
              className={styles.settingsBtn}
              onClick={() => { playSciFiSound('click'); setIsSettingsOpen(true); }}
              title={t('virtualLab', 'settingsTitle')}
              aria-label={t('virtualLab', 'settingsAriaLabel')}
              aria-expanded={isSettingsOpen}
            >
              {t('virtualLab', 'settingsBtn')}
            </button>
          </div>
        </div>

        {useVirtualLabStore(s => s.isMissionModeActive) && <MissionHUD />}

        {/* Theory Panel (Side Drawer) */}
        <TheoryPanel isOpen={isTheoryOpen} onClose={() => setIsTheoryOpen(false)} />

        <div className={styles.mainLayout}>
          <ChemicalInventory />
          <ReactionHUD />
        </div>

        {/* Floating Reset Button near the Glass - Placed under uiLayer for true 50vw center */}
        <button
          className={styles.floatingResetBtn}
          onClick={() => { playSciFiSound('click'); resetBeaker(); }}
          onMouseEnter={() => playSciFiSound('hover')}
          disabled={isReacting || isPouring || reactants.length === 0}
          title={t('virtualLab', 'cleanBeakerTitle')}
          aria-label={t('virtualLab', 'cleanBeakerAriaLabel')}
        >
          <span style={{ fontSize: '1.2rem' }} aria-hidden="true">🔄</span> {t('virtualLab', 'cleanBeakerBtn')}
        </button>
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsSettingsOpen(false)}>
          <div className={styles.settingsModal} onClick={e => e.stopPropagation()}>
            <div className={styles.settingsHeader}>
              <h2 className={styles.glassTitle}>{t('virtualLab', 'settingsModalTitle')}</h2>
              <button className={styles.closeBtn} onClick={() => setIsSettingsOpen(false)} aria-label={t('virtualLab', 'settingsCloseAriaLabel')}>×</button>
            </div>

            <div className={styles.settingsGrid}>
              {/* Left column */}
              <div className={styles.settingsCol}>
                {/* Language Selection */}
                <div className={styles.settingsSection}>
                  <h3>{t('virtualLab', 'langSection')}</h3>
                  <div className={styles.themeSwitcherModal}>
                    <button
                      className={`${styles.themeBtn} ${language === 'vi' ? styles.active : ''}`}
                      onClick={() => { playSciFiSound('click'); setLanguage('vi'); setTtsVoiceURI(null); }}
                    >
                      🇻🇳 Tiếng Việt
                    </button>
                    <button
                      className={`${styles.themeBtn} ${language === 'en' ? styles.active : ''}`}
                      onClick={() => { playSciFiSound('click'); setLanguage('en'); setTtsVoiceURI(null); }}
                    >
                      🇬🇧 English
                    </button>
                  </div>
                </div>

                {/* Theme Selection */}
                <div className={styles.settingsSection}>
                  <h3>{t('virtualLab', 'themeSection')}</h3>
                  <div className={styles.themeSwitcherModal}>
                    <button className={`${styles.themeBtn} ${theme === 'scifi' ? styles.active : ''}`} onClick={() => { playSciFiSound('click'); setTheme('scifi'); }}>{t('virtualLab', 'themeScifi')}</button>
                    <button className={`${styles.themeBtn} ${theme === 'classic' ? styles.active : ''}`} onClick={() => { playSciFiSound('click'); setTheme('classic'); }}>{t('virtualLab', 'themeClassic')}</button>
                    <button className={`${styles.themeBtn} ${theme === 'realistic' ? styles.active : ''}`} onClick={() => { playSciFiSound('click'); setTheme('realistic'); }}>{t('virtualLab', 'themeRealistic')}</button>
                  </div>
                </div>

                {/* Sound Settings */}
                <div className={styles.settingsSection}>
                  <h3>{t('virtualLab', 'soundSection')}</h3>
                  <div className={styles.settingsRow}>
                    <span>{t('virtualLab', 'muteAll')}</span>
                    <label className={styles.switch}>
                      <input type="checkbox" checked={isMuted} onChange={(e) => { setIsMuted(e.target.checked); playSciFiSound('click'); }} />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className={styles.settingsCol}>
                {/* AI Voice Assistant */}
                <div className={styles.settingsSection}>
                  <h3>{t('virtualLab', 'ttsSection')}</h3>

                  <div className={styles.settingsRow} style={{ marginBottom: '20px' }}>
                    <span>{t('virtualLab', 'autoReadLog')}</span>
                    <label className={styles.switch}>
                      <input type="checkbox" checked={isAutoPlayVoice} onChange={(e) => { setIsAutoPlayVoice(e.target.checked); playSciFiSound('click'); }} />
                      <span className={styles.slider}></span>
                    </label>
                  </div>

                  <div className={styles.settingsGroup}>
                    <span className={styles.groupLabel}>{t('virtualLab', 'readSpeed')}</span>
                    <div className={styles.themeSwitcherModal}>
                      <button className={`${styles.themeBtn} ${ttsSpeed === 0.75 ? styles.active : ''}`} onClick={() => { playSciFiSound('click'); setTtsSpeed(0.75); }}>0.75x</button>
                      <button className={`${styles.themeBtn} ${ttsSpeed === 1.0 ? styles.active : ''}`} onClick={() => { playSciFiSound('click'); setTtsSpeed(1.0); }}>1.0x</button>
                      <button className={`${styles.themeBtn} ${ttsSpeed === 1.5 ? styles.active : ''}`} onClick={() => { playSciFiSound('click'); setTtsSpeed(1.5); }}>1.5x</button>
                    </div>
                  </div>

                  <div className={styles.settingsGroup} style={{ marginTop: '20px' }}>
                    <span className={styles.groupLabel}>{t('virtualLab', 'voiceSelect')}</span>
                    <div className={styles.customSelectWrapper}>
                      <select
                        className={styles.modernSelect}
                        value={ttsVoiceURI || ''}
                        onChange={(e) => { setTtsVoiceURI(e.target.value); playSciFiSound('click'); }}
                      >
                        <option value="">{t('virtualLab', 'defaultVoice')}</option>
                        {voices.map(v => (
                          <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>
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
