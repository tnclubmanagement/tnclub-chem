import React, { useState, useEffect } from 'react';
import { useSettingsStore, getNavIcon } from '../store/useSettingsStore';
import type { FontSizeOption, FontFamilyOption, ThemeMode, GraphicsQuality, IconStyleOption } from '../store/useSettingsStore';
import { useTranslation } from '../../../i18n/useTranslation';
import { playSciFiSound } from '../../PeriodicTable/utils/audio';
import { useChemStore } from '../../PeriodicTable/store/useChemStore';
import { speakText, stopSpeaking } from '../../VirtualLab/utils/speech';
import styles from './SettingsScreen.module.less';

export const SettingsScreen: React.FC = () => {
  const { t, language, setLanguage, supportedLanguages } = useTranslation();
  const { soundEnabled } = useChemStore();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isTestingVoice, setIsTestingVoice] = useState(false);

  const {
    fontSize,
    fontFamily,
    theme,
    iconStyle,
    soundEnabled: soundOn,
    soundVolume,
    autoRotate3D,
    graphicsQuality,
    ttsVoiceURI,
    ttsSpeed,
    setFontSize,
    setFontFamily,
    setTheme,
    setIconStyle,
    setSoundEnabled,
    setSoundVolume,
    setAutoRotate3D,
    setGraphicsQuality,
    setTtsVoiceURI,
    setTtsSpeed,
    resetDefaults,
  } = useSettingsStore();

  const isEn = language === 'en';

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoices = () => {
        const available = window.speechSynthesis.getVoices();
        setVoices(available);
      };
      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // Smart voice filtering: Keep only Vietnamese and English voices
  const viVoices = React.useMemo(() => {
    return voices.filter(
      (v) => v.lang.toLowerCase().includes('vi') || v.name.toLowerCase().includes('vietnamese')
    );
  }, [voices]);

  const enVoices = React.useMemo(() => {
    return voices.filter(
      (v) => v.lang.toLowerCase().includes('en') || v.name.toLowerCase().includes('english')
    );
  }, [voices]);

  const allVoiceOptions = React.useMemo(() => {
    const list: Array<{ voiceURI: string; name: string }> = [
      { voiceURI: '', name: isEn ? '🌐 System Default Voice' : '🌐 Mặc định theo hệ thống' },
    ];
    viVoices.forEach((v) => list.push({ voiceURI: v.voiceURI, name: `🇻🇳 ${v.name}` }));
    enVoices.forEach((v) => list.push({ voiceURI: v.voiceURI, name: `🇺🇸 ${v.name}` }));
    return list;
  }, [viVoices, enVoices, isEn]);

  const currentIndex = React.useMemo(() => {
    if (!ttsVoiceURI) return 0;
    const idx = allVoiceOptions.findIndex((v) => v.voiceURI === ttsVoiceURI);
    return idx >= 0 ? idx : 0;
  }, [allVoiceOptions, ttsVoiceURI]);

  const triggerVoiceSample = async () => {
    stopSpeaking();
    setIsTestingVoice(true);
    const sampleMsg = isEn ? 'Testing voice sample.' : 'Thử giọng đọc phát âm.';
    await speakText(sampleMsg);
    setIsTestingVoice(false);
  };

  const handlePrevVoice = () => {
    playSciFiSound('click', soundEnabled);
    const nextIdx = (currentIndex - 1 + allVoiceOptions.length) % allVoiceOptions.length;
    const target = allVoiceOptions[nextIdx];
    setTtsVoiceURI(target.voiceURI || null);
    triggerVoiceSample();
  };

  const handleNextVoice = () => {
    playSciFiSound('click', soundEnabled);
    const nextIdx = (currentIndex + 1) % allVoiceOptions.length;
    const target = allVoiceOptions[nextIdx];
    setTtsVoiceURI(target.voiceURI || null);
    triggerVoiceSample();
  };

  const handleTestVoice = async () => {
    playSciFiSound('click', soundEnabled);
    if (isTestingVoice) {
      stopSpeaking();
      setIsTestingVoice(false);
    } else {
      triggerVoiceSample();
    }
  };

  const triggerSound = () => playSciFiSound('click', soundEnabled);

  const themeOptions: Array<{ mode: ThemeMode; label: string; desc: string; colors: string[] }> = [
    {
      mode: 'cyber',
      label: t('settings', 'themeCyberLabel'),
      desc: t('settings', 'themeCyberDesc'),
      colors: ['#03040d', '#00f7ff', '#00ff80'],
    },
    {
      mode: 'neon',
      label: t('settings', 'themeNeonLabel'),
      desc: t('settings', 'themeNeonDesc'),
      colors: ['#02140e', '#00ff9d', '#10b981'],
    },
    {
      mode: 'nebula',
      label: t('settings', 'themeNebulaLabel'),
      desc: t('settings', 'themeNebulaDesc'),
      colors: ['#0f051d', '#d946ef', '#8b5cf6'],
    },
    {
      mode: 'light',
      label: t('settings', 'themeLightLabel'),
      desc: t('settings', 'themeLightDesc'),
      colors: ['#f8fafc', '#0284c7', '#059669'],
    },
  ];

  const fontFamilyOptions: Array<{ id: FontFamilyOption; label: string; preview: string }> = [
    { id: 'sans', label: t('settings', 'fontSansLabel'), preview: 'Inter / System UI' },
    { id: 'scifi', label: t('settings', 'fontScifiLabel'), preview: 'Space Grotesk' },
    { id: 'serif', label: t('settings', 'fontSerifLabel'), preview: 'Cinzel Academic' },
    { id: 'mono', label: t('settings', 'fontMonoLabel'), preview: 'Fira / JetBrains Mono' },
  ];

  const iconStyleOptions: Array<{ id: IconStyleOption; label: string; preview: string }> = [
    {
      id: 'cyber',
      label: t('settings', 'iconCyberLabel'),
      preview: '⌂  ⚛  ⬡  ⚗  📚  ⚙',
    },
    {
      id: 'minimal',
      label: t('settings', 'iconMinimalLabel'),
      preview: '🏠  📊  🔬  🧪  📖  🛠',
    },
    {
      id: 'scifi',
      label: t('settings', 'iconScifiLabel'),
      preview: '🌌  ⚛️  💎  🥽  📜  ⚙️',
    },
    {
      id: 'tech',
      label: t('settings', 'iconTechLabel'),
      preview: '[H] [P] [X] [V] [L] [S]',
    },
  ];

  const fontSizeOptions: Array<{ id: FontSizeOption; label: string; px: string }> = [
    { id: 'small', label: t('settings', 'fontSizeSmall'), px: '14px' },
    { id: 'medium', label: t('settings', 'fontSizeMedium'), px: '16px' },
    { id: 'large', label: t('settings', 'fontSizeLarge'), px: '18px' },
    { id: 'xlarge', label: t('settings', 'fontSizeXlarge'), px: '20px' },
  ];

  const graphicsQualityOptions: Array<{ id: GraphicsQuality; label: string }> = [
    { id: 'high', label: t('settings', 'graphicsHigh') },
    { id: 'medium', label: t('settings', 'graphicsMedium') },
    { id: 'low', label: t('settings', 'graphicsLow') },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <div className={styles.icon}>⚙️</div>
          <div>
            <h1 className={styles.title}>{t('settings', 'title')}</h1>
            <p className={styles.subtitle}>{t('settings', 'subtitle')}</p>
          </div>
        </div>

        <button
          className={styles.resetBtn}
          onClick={() => {
            triggerSound();
            resetDefaults();
          }}
        >
          🔄 {t('settings', 'resetDefaults')}
        </button>
      </div>

      {/* Grid Content */}
      <div className={styles.grid}>
        {/* Section 1: Themes & Aesthetics */}
        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>
            🎨 {t('settings', 'themeSection')}
          </h2>
          <div className={styles.optionGrid}>
            {themeOptions.map((opt) => (
              <div
                key={opt.mode}
                className={`${styles.cardOption} ${theme === opt.mode ? styles.active : ''}`}
                onClick={() => {
                  triggerSound();
                  setTheme(opt.mode);
                }}
              >
                <div className={styles.cardOptionTitle}>
                  <span>{opt.label}</span>
                  {theme === opt.mode && <span>✓</span>}
                </div>
                <div className={styles.cardOptionDesc}>{opt.desc}</div>
                <div className={styles.themePalette}>
                  {opt.colors.map((c, i) => (
                    <div key={i} className={styles.dot} style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Icon Set Selection */}
        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>
            🧩 {t('settings', 'iconStyleLabel')}
          </h2>
          <div className={styles.optionGrid}>
            {iconStyleOptions.map((opt) => (
              <div
                key={opt.id}
                className={`${styles.cardOption} ${iconStyle === opt.id ? styles.active : ''}`}
                onClick={() => {
                  triggerSound();
                  setIconStyle(opt.id);
                }}
              >
                <div className={styles.cardOptionTitle}>
                  <span>{opt.label}</span>
                  {iconStyle === opt.id && <span>✓</span>}
                </div>
                <div
                  className={styles.cardOptionDesc}
                  style={{
                    fontSize: '1.1rem',
                    letterSpacing: 2,
                    fontWeight: 700,
                    marginTop: 6,
                    color: 'var(--neon-cyan)',
                  }}
                >
                  {opt.preview}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Typography & Fonts */}
        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>
            🔤 {t('settings', 'typographySection')}
          </h2>

          <div className={styles.settingLabel}>
            <span className={styles.labelTitle}>{t('settings', 'fontFamilyLabel')}</span>
          </div>
          <div className={styles.optionGrid}>
            {fontFamilyOptions.map((opt) => (
              <div
                key={opt.id}
                className={`${styles.cardOption} ${fontFamily === opt.id ? styles.active : ''}`}
                onClick={() => {
                  triggerSound();
                  setFontFamily(opt.id);
                }}
              >
                <div className={styles.cardOptionTitle}>
                  <span>{opt.label}</span>
                  {fontFamily === opt.id && <span>✓</span>}
                </div>
                <div className={styles.cardOptionDesc}>{opt.preview}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 12 }} className={styles.settingLabel}>
            <span className={styles.labelTitle}>{t('settings', 'fontSizeLabel')}</span>
          </div>
          <div className={styles.optionGrid}>
            {fontSizeOptions.map((opt) => (
              <div
                key={opt.id}
                className={`${styles.cardOption} ${fontSize === opt.id ? styles.active : ''}`}
                onClick={() => {
                  triggerSound();
                  setFontSize(opt.id);
                }}
              >
                <div className={styles.cardOptionTitle}>
                  <span>{opt.label}</span>
                  <span className={styles.cardOptionDesc}>{opt.px}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Audio & Sound */}
        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>
            🔊 {t('settings', 'audioSection')}
          </h2>
          
          <div className={styles.settingRow}>
            <div className={styles.settingLabel}>
              <span className={styles.labelTitle}>{t('settings', 'soundFxLabel')}</span>
              <span className={styles.labelSub}>{t('settings', 'soundFxSub')}</span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={soundOn}
                onChange={(e) => {
                  triggerSound();
                  setSoundEnabled(e.target.checked);
                }}
              />
              <span className={styles.slider} />
            </label>
          </div>

          {soundOn && (
            <>
              <div className={styles.settingRow}>
                <div className={styles.settingLabel} style={{ width: '100%' }}>
                  <span className={styles.labelTitle}>{t('settings', 'masterVolumeLabel')}</span>
                  <div className={styles.rangeWrapper} style={{ marginTop: 8 }}>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={soundVolume}
                      className={styles.rangeInput}
                      onChange={(e) => setSoundVolume(Number(e.target.value))}
                    />
                    <span className={styles.rangeValue}>{soundVolume}%</span>
                  </div>
                </div>
              </div>

              {/* TTS Voice Selection & Reading Speed */}
              <div className={styles.settingRow} style={{ flexDirection: 'column', alignItems: 'stretch', marginTop: 12, borderTop: '1px dashed rgba(255, 255, 255, 0.1)', paddingTop: 12 }}>
                <div className={styles.settingLabel} style={{ marginBottom: 6 }}>
                  <span className={styles.labelTitle}>🗣️ {isEn ? 'Speech Synthesis Voice (TTS)' : 'Giọng đọc phát âm (Text-To-Speech)'}</span>
                  <span className={styles.labelSub}>
                    {isEn ? 'Smart filtered voices with quick-cycle arrow buttons' : 'Đã lọc giọng đọc Việt/Anh chuẩn & nút mũi tên ◀ ▶ chuyển giọng đọc thử nhanh'}
                  </span>
                </div>

                <div className={styles.voiceControlRow}>
                  {/* Previous Voice Arrow */}
                  <button
                    className={styles.navArrowBtn}
                    onClick={handlePrevVoice}
                    title={isEn ? 'Previous Voice & Test' : 'Giọng đọc trước & Thử giọng'}
                  >
                    ◀
                  </button>

                  {/* Smart Dropdown */}
                  <select
                    className={styles.voiceSelect}
                    value={ttsVoiceURI || ''}
                    onChange={(e) => {
                      setTtsVoiceURI(e.target.value || null);
                      triggerVoiceSample();
                    }}
                  >
                    <option value="">{isEn ? '🌐 System Default Voice' : '🌐 Mặc định theo hệ thống'}</option>

                    {viVoices.length > 0 && (
                      <optgroup label={isEn ? '🇻🇳 Vietnamese Voices' : '🇻🇳 Giọng Tiếng Việt'}>
                        {viVoices.map((v) => (
                          <option key={v.voiceURI} value={v.voiceURI}>
                            🇻🇳 {v.name} ({v.lang})
                          </option>
                        ))}
                      </optgroup>
                    )}

                    {enVoices.length > 0 && (
                      <optgroup label={isEn ? '🇺🇸 English Voices' : '🇺🇸 Giọng Tiếng Anh'}>
                        {enVoices.map((v) => (
                          <option key={v.voiceURI} value={v.voiceURI}>
                            🇺🇸 {v.name} ({v.lang})
                          </option>
                        ))}
                      </optgroup>
                    )}
                  </select>

                  {/* Next Voice Arrow */}
                  <button
                    className={styles.navArrowBtn}
                    onClick={handleNextVoice}
                    title={isEn ? 'Next Voice & Test' : 'Giọng đọc kế tiếp & Thử giọng'}
                  >
                    ▶
                  </button>

                  {/* Test Voice Button */}
                  <button
                    className={`${styles.testVoiceBtn} ${isTestingVoice ? styles.testing : ''}`}
                    onClick={handleTestVoice}
                  >
                    {isTestingVoice ? '⏹️ Dừng' : '▶️ Thử'}
                  </button>
                </div>
              </div>

              <div className={styles.settingRow} style={{ marginTop: 12 }}>
                <div className={styles.settingLabel} style={{ width: '100%' }}>
                  <span className={styles.labelTitle}>⏩ {isEn ? 'Reading Speed' : 'Tốc độ đọc phát âm'}</span>
                  <div className={styles.rangeWrapper} style={{ marginTop: 8 }}>
                    <input
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.1"
                      value={ttsSpeed}
                      className={styles.rangeInput}
                      onChange={(e) => setTtsSpeed(Number(e.target.value))}
                    />
                    <span className={styles.rangeValue}>{ttsSpeed.toFixed(1)}x</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Section 5: Graphics & Language */}
        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>
            🎮 {t('settings', 'graphicsSection')}
          </h2>

          <div className={styles.settingRow}>
            <div className={styles.settingLabel}>
              <span className={styles.labelTitle}>{t('settings', 'languageLabel')}</span>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {supportedLanguages.map((langMeta) => (
                <button
                  key={langMeta.code}
                  className={`${styles.cardOption} ${language === langMeta.code ? styles.active : ''}`}
                  style={{ padding: '8px 12px', flexDirection: 'row', alignItems: 'center', gap: 6 }}
                  onClick={() => {
                    triggerSound();
                    setLanguage(langMeta.code);
                  }}
                >
                  <span>{langMeta.flag}</span>
                  <span>{langMeta.nativeName}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.settingRow}>
            <div className={styles.settingLabel}>
              <span className={styles.labelTitle}>{t('settings', 'autoRotateLabel')}</span>
              <span className={styles.labelSub}>{t('settings', 'autoRotateSub')}</span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={autoRotate3D}
                onChange={(e) => {
                  triggerSound();
                  setAutoRotate3D(e.target.checked);
                }}
              />
              <span className={styles.slider} />
            </label>
          </div>

          <div className={styles.settingLabel} style={{ marginTop: 8 }}>
            <span className={styles.labelTitle}>{t('settings', 'graphicsQualityLabel')}</span>
          </div>
          <div className={styles.optionGrid}>
            {graphicsQualityOptions.map((opt) => (
              <div
                key={opt.id}
                className={`${styles.cardOption} ${graphicsQuality === opt.id ? styles.active : ''}`}
                onClick={() => {
                  triggerSound();
                  setGraphicsQuality(opt.id);
                }}
              >
                <div className={styles.cardOptionTitle}>
                  <span>{opt.label}</span>
                  {graphicsQuality === opt.id && <span>✓</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Live Interactive Preview */}
        <div className={styles.previewCard}>
          <div className={styles.previewHeader}>
            👁️ {t('settings', 'previewSection')}
          </div>
          <div className={styles.previewBox}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <div className={styles.previewBadge}>
                {getNavIcon('home', iconStyle)} {getNavIcon('periodic-table', iconStyle)} {getNavIcon('explorer', iconStyle)} {getNavIcon('virtual-lab', iconStyle)} {getNavIcon('lesson', iconStyle)} {getNavIcon('settings', iconStyle)}
              </div>
              <div className={styles.previewBadge}>⚛️ H2O - Water Molecule</div>
            </div>
            <p className={styles.previewText}>
              {t('settings', 'previewText')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
