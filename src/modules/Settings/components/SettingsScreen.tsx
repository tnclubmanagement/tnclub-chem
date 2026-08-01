import React from 'react';
import { useSettingsStore } from '../store/useSettingsStore';
import type { FontSizeOption, FontFamilyOption, ThemeMode, GraphicsQuality } from '../store/useSettingsStore';
import { useTranslation } from '../../../i18n/useTranslation';
import { playSciFiSound } from '../../PeriodicTable/utils/audio';
import { useChemStore } from '../../PeriodicTable/store/useChemStore';
import styles from './SettingsScreen.module.css';

export const SettingsScreen: React.FC = () => {
  const { language, setLanguage } = useTranslation();
  const { soundEnabled } = useChemStore();

  const {
    fontSize,
    fontFamily,
    theme,
    soundEnabled: soundOn,
    soundVolume,
    autoRotate3D,
    graphicsQuality,
    setFontSize,
    setFontFamily,
    setTheme,
    setSoundEnabled,
    setSoundVolume,
    setAutoRotate3D,
    setGraphicsQuality,
    resetDefaults,
  } = useSettingsStore();

  const triggerSound = () => playSciFiSound('click', soundEnabled);

  const themeOptions: Array<{ mode: ThemeMode; label: string; desc: string; colors: string[] }> = [
    {
      mode: 'cyber',
      label: language === 'en' ? 'Cyber Space' : 'Vũ trụ Cyber',
      desc: language === 'en' ? 'Deep Cyan & Neon Cyberpunk' : 'Vũ trụ Cyberpunk xanh Neon',
      colors: ['#03040d', '#00f7ff', '#00ff80'],
    },
    {
      mode: 'neon',
      label: language === 'en' ? 'Bioluminescence' : 'Hóa Quang Emerald',
      desc: language === 'en' ? 'Deep Emerald & Neon Green' : 'Hóa quang sinh học xanh lá',
      colors: ['#02140e', '#00ff9d', '#10b981'],
    },
    {
      mode: 'nebula',
      label: language === 'en' ? 'Cosmic Nebula' : 'Tinh Vân Tím',
      desc: language === 'en' ? 'Mystic Purple & Deep Magenta' : 'Không gian tím huyền bí',
      colors: ['#0f051d', '#d946ef', '#8b5cf6'],
    },
    {
      mode: 'light',
      label: language === 'en' ? 'Clean Lab' : 'Phòng Thí Nghiệm Sáng',
      desc: language === 'en' ? 'Modern Glassy Light Mode' : 'Giao diện phòng lab sáng',
      colors: ['#f8fafc', '#0284c7', '#059669'],
    },
  ];

  const fontFamilyOptions: Array<{ id: FontFamilyOption; label: string; preview: string }> = [
    { id: 'sans', label: 'Inter Sans', preview: 'Inter / System UI' },
    { id: 'scifi', label: 'Sci-Fi Future', preview: 'Space Grotesk' },
    { id: 'serif', label: 'Academic Serif', preview: 'Cinzel Academic' },
    { id: 'mono', label: 'Code Monospace', preview: 'Fira / JetBrains Mono' },
  ];

  const fontSizeOptions: Array<{ id: FontSizeOption; label: string; px: string }> = [
    { id: 'small', label: language === 'en' ? 'Small' : 'Nhỏ', px: '14px' },
    { id: 'medium', label: language === 'en' ? 'Standard' : 'Tiêu chuẩn', px: '16px' },
    { id: 'large', label: language === 'en' ? 'Large' : 'Lớn', px: '18px' },
    { id: 'xlarge', label: language === 'en' ? 'Extra Large' : 'Rất lớn', px: '20px' },
  ];

  const graphicsQualityOptions: Array<{ id: GraphicsQuality; label: string }> = [
    { id: 'high', label: language === 'en' ? 'High (Ultra 3D)' : 'Cao (Ultra 3D)' },
    { id: 'medium', label: language === 'en' ? 'Medium (Balanced)' : 'Trung bình' },
    { id: 'low', label: language === 'en' ? 'Low (Performance)' : 'Tiết kiệm pin' },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <div className={styles.icon}>⚙️</div>
          <div>
            <h1 className={styles.title}>
              {language === 'en' ? 'Application Settings' : 'Cài Đặt Ứng Dụng'}
            </h1>
            <p className={styles.subtitle}>
              {language === 'en'
                ? 'Customize themes, font styles, audio effects, and 3D graphics parameters'
                : 'Tùy chỉnh giao diện, phông chữ, âm thanh và hiệu ứng 3D'}
            </p>
          </div>
        </div>

        <button
          className={styles.resetBtn}
          onClick={() => {
            triggerSound();
            resetDefaults();
          }}
        >
          🔄 {language === 'en' ? 'Reset Defaults' : 'Đặt lại mặc định'}
        </button>
      </div>

      {/* Grid Content */}
      <div className={styles.grid}>
        {/* Section 1: Themes & Aesthetics */}
        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>
            🎨 {language === 'en' ? 'Theme & Aesthetic Mode' : 'Chủ Đề & Giao Diện'}
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

        {/* Section 2: Typography & Fonts */}
        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>
            🔤 {language === 'en' ? 'Typography & Fonts' : 'Phông Chữ & Kích Thước'}
          </h2>
          <div className={styles.settingLabel}>
            <span className={styles.labelTitle}>
              {language === 'en' ? 'Font Family' : 'Kiểu phông chữ'}
            </span>
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
            <span className={styles.labelTitle}>
              {language === 'en' ? 'Base Font Size' : 'Kích thước chữ'}
            </span>
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

        {/* Section 3: Audio & Sound */}
        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>
            🔊 {language === 'en' ? 'Sound & Audio Effects' : 'Âm Thanh & Hiệu Ứng'}
          </h2>
          
          <div className={styles.settingRow}>
            <div className={styles.settingLabel}>
              <span className={styles.labelTitle}>
                {language === 'en' ? 'Sci-Fi Sound FX' : 'Hiệu ứng âm thanh Sci-Fi'}
              </span>
              <span className={styles.labelSub}>
                {language === 'en'
                  ? 'Interactive clicks, hover, and lab reaction sound effects'
                  : 'Âm thanh khi tương tác click, rê chuột và phản ứng hóa học'}
              </span>
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
            <div className={styles.settingRow}>
              <div className={styles.settingLabel} style={{ width: '100%' }}>
                <span className={styles.labelTitle}>
                  {language === 'en' ? 'Master Volume' : 'Âm lượng tổng'}
                </span>
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
          )}
        </div>

        {/* Section 4: Graphics & Language */}
        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>
            🎮 {language === 'en' ? '3D Graphics & Language' : 'Đồ Họa 3D & Ngôn Ngữ'}
          </h2>

          <div className={styles.settingRow}>
            <div className={styles.settingLabel}>
              <span className={styles.labelTitle}>
                {language === 'en' ? 'Language / Ngôn ngữ' : 'Ngôn ngữ ứng dụng'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                className={`${styles.cardOption} ${language === 'vi' ? styles.active : ''}`}
                style={{ padding: '8px 16px', flexDirection: 'row', alignItems: 'center' }}
                onClick={() => {
                  triggerSound();
                  setLanguage('vi');
                }}
              >
                🇻🇳 Tiếng Việt
              </button>
              <button
                className={`${styles.cardOption} ${language === 'en' ? styles.active : ''}`}
                style={{ padding: '8px 16px', flexDirection: 'row', alignItems: 'center' }}
                onClick={() => {
                  triggerSound();
                  setLanguage('en');
                }}
              >
                🇬🇧 English
              </button>
            </div>
          </div>

          <div className={styles.settingRow}>
            <div className={styles.settingLabel}>
              <span className={styles.labelTitle}>
                {language === 'en' ? 'Auto-rotate 3D Models' : 'Tự động xoay mô hình 3D'}
              </span>
              <span className={styles.labelSub}>
                {language === 'en'
                  ? 'Continuous smooth rotation for chemical structures'
                  : 'Xoay tròn mượt mà cho nguyên tử & phân tử'}
              </span>
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
            <span className={styles.labelTitle}>
              {language === 'en' ? 'Graphics Quality' : 'Chất lượng đồ họa 3D'}
            </span>
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

        {/* Section 5: Live Interactive Preview */}
        <div className={styles.previewCard}>
          <div className={styles.previewHeader}>
            👁️ {language === 'en' ? 'Live Interactive Preview' : 'Xem Trước Trực Tiếp'}
          </div>
          <div className={styles.previewBox}>
            <div className={styles.previewBadge}>⚛️ H2O - Water Molecule</div>
            <p className={styles.previewText}>
              {language === 'en'
                ? 'This live text reflects your selected theme, font family, and base font size in real time across the entire ChemApp platform.'
                : 'Đoạn văn bản này thể hiện trực tiếp chủ đề, kiểu chữ và kích thước phông bạn chọn trên toàn bộ nền tảng ChemApp.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
