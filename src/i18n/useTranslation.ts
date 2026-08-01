import { create } from 'zustand';
import type { Language, TranslationDictionary } from './types';
import { SUPPORTED_LANGUAGES } from './types';
import { LOCALES, vi } from './locales';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LOCAL_STORAGE_KEY = 'chemedu3d_language';

const getInitialLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY) as Language;
    if (saved === 'vi' || saved === 'en') return saved;
  }
  return 'vi';
};

export const useLanguageStore = create<LanguageState>((set) => ({
  language: getInitialLanguage(),
  setLanguage: (lang) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, lang);
    }
    set({ language: lang });
  },
}));

export const useTranslation = () => {
  const { language, setLanguage } = useLanguageStore();
  const dict = LOCALES[language] || LOCALES.vi;

  const t = <
    K1 extends keyof TranslationDictionary,
    K2 extends keyof TranslationDictionary[K1]
  >(
    section: K1,
    key: K2
  ): string => {
    return (
      (dict[section] && (dict[section][key] as unknown as string)) ||
      (vi[section] && (vi[section][key] as unknown as string)) ||
      ''
    );
  };

  return {
    t,
    language,
    setLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
  };
};
