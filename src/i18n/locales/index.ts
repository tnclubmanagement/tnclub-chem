import homeVi from '../../modules/Home/i18n/vi.json';
import homeEn from '../../modules/Home/i18n/en.json';

import periodicVi from '../../modules/PeriodicTable/i18n/vi.json';
import periodicEn from '../../modules/PeriodicTable/i18n/en.json';

import explorerVi from '../../modules/MolecularExplorer/i18n/vi.json';
import explorerEn from '../../modules/MolecularExplorer/i18n/en.json';



import virtualLabVi from '../../modules/VirtualLab/i18n/vi.json';
import virtualLabEn from '../../modules/VirtualLab/i18n/en.json';

import type { TranslationDictionary, Language } from '../types';

const settingsVi = {
  title: "Cài Đặt Ứng Dụng",
  subtitle: "Tùy chỉnh giao diện, phông chữ, bộ icon, âm thanh và hiệu ứng 3D",
  resetDefaults: "Đặt lại mặc định",
  themeSection: "Chủ Đề & Giao Diện",
  typographySection: "Phông Chữ & Bộ Icon",
  audioSection: "Âm Thanh & Hiệu Ứng",
  graphicsSection: "Đồ Họa 3D & Ngôn Ngữ",
  previewSection: "Xem Trước Trực Tiếp",
  iconStyleLabel: "Phong cách bộ Icon",
  fontFamilyLabel: "Kiểu phông chữ",
  fontSizeLabel: "Kích thước chữ",
  soundFxLabel: "Hiệu ứng âm thanh Sci-Fi",
  soundFxSub: "Âm thanh khi tương tác click, rê chuột và phản ứng hóa học",
  masterVolumeLabel: "Âm lượng tổng",
  languageLabel: "Ngôn ngữ ứng dụng",
  autoRotateLabel: "Tự động xoay mô hình 3D",
  autoRotateSub: "Xoay tròn mượt mà cho nguyên tử & phân tử",
  graphicsQualityLabel: "Chất lượng đồ họa 3D",
  previewBadge: "⚛️ H2O - Water Molecule",
  previewText: "Đoạn văn bản này thể hiện trực tiếp chủ đề, kiểu chữ, bộ icon và kích thước phông bạn chọn trên toàn bộ nền tảng ChemApp.",

  themeCyberLabel: "Vũ trụ Cyber",
  themeCyberDesc: "Vũ trụ Cyberpunk xanh Neon",
  themeNeonLabel: "Hóa Quang Emerald",
  themeNeonDesc: "Hóa quang sinh học xanh lá",
  themeNebulaLabel: "Tinh Vân Tím",
  themeNebulaDesc: "Không gian tím huyền bí",
  themeLightLabel: "Phòng Thí Nghiệm Sáng",
  themeLightDesc: "Giao diện phòng lab sáng",

  fontSansLabel: "Inter Sans",
  fontScifiLabel: "Sci-Fi Future",
  fontSerifLabel: "Academic Serif",
  fontMonoLabel: "Code Monospace",

  iconCyberLabel: "Cyber Neon",
  iconMinimalLabel: "Hóa Học Đơn Giản",
  iconScifiLabel: "Vũ Trụ Viễn Tưởng",
  iconTechLabel: "Kỹ Thuật Code",

  fontSizeSmall: "Nhỏ",
  fontSizeMedium: "Tiêu chuẩn",
  fontSizeLarge: "Lớn",
  fontSizeXlarge: "Rất lớn",

  graphicsHigh: "Cao (Ultra 3D)",
  graphicsMedium: "Trung bình (Balanced)",
  graphicsLow: "Tiết kiệm pin (Performance)"
};

const settingsEn = {
  title: "Application Settings",
  subtitle: "Customize themes, font styles, icon sets, audio effects, and 3D graphics parameters",
  resetDefaults: "Reset Defaults",
  themeSection: "Theme & Aesthetic Mode",
  typographySection: "Typography & Icon Style",
  audioSection: "Sound & Audio Effects",
  graphicsSection: "3D Graphics & Language",
  previewSection: "Live Interactive Preview",
  iconStyleLabel: "Icon Set Style",
  fontFamilyLabel: "Font Family",
  fontSizeLabel: "Base Font Size",
  soundFxLabel: "Sci-Fi Sound FX",
  soundFxSub: "Interactive clicks, hover, and lab reaction sound effects",
  masterVolumeLabel: "Master Volume",
  languageLabel: "Application Language",
  autoRotateLabel: "Auto-rotate 3D Models",
  autoRotateSub: "Continuous smooth rotation for chemical structures",
  graphicsQualityLabel: "3D Graphics Quality",
  previewBadge: "⚛️ H2O - Water Molecule",
  previewText: "This live text reflects your selected theme, font family, icon set, and base font size in real time across the entire ChemApp platform.",

  themeCyberLabel: "Cyber Space",
  themeCyberDesc: "Deep Cyan & Neon Cyberpunk",
  themeNeonLabel: "Bioluminescence",
  themeNeonDesc: "Deep Emerald & Neon Green",
  themeNebulaLabel: "Cosmic Nebula",
  themeNebulaDesc: "Mystic Purple & Deep Magenta",
  themeLightLabel: "Clean Lab",
  themeLightDesc: "Modern Glassy Light Mode",

  fontSansLabel: "Inter Sans",
  fontScifiLabel: "Sci-Fi Future",
  fontSerifLabel: "Academic Serif",
  fontMonoLabel: "Code Monospace",

  iconCyberLabel: "Cyber Neon",
  iconMinimalLabel: "Minimal Lab",
  iconScifiLabel: "Sci-Fi Hologram",
  iconTechLabel: "Tech Monospace",

  fontSizeSmall: "Small",
  fontSizeMedium: "Standard",
  fontSizeLarge: "Large",
  fontSizeXlarge: "Extra Large",

  graphicsHigh: "High (Ultra 3D)",
  graphicsMedium: "Medium (Balanced)",
  graphicsLow: "Low (Performance)"
};

export const vi: TranslationDictionary = {
  home: homeVi,
  settings: settingsVi,
  ...periodicVi,
  ...explorerVi,

  ...virtualLabVi,
};

export const en: TranslationDictionary = {
  home: homeEn,
  settings: settingsEn,
  ...periodicEn,
  ...explorerEn,

  ...virtualLabEn,
};

export const LOCALES: Record<Language, TranslationDictionary> = {
  vi,
  en,
};
