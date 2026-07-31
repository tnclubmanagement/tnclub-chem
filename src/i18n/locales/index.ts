import homeVi from '../../modules/Home/i18n/vi.json';
import homeEn from '../../modules/Home/i18n/en.json';

import periodicVi from '../../modules/PeriodicTable/i18n/vi.json';
import periodicEn from '../../modules/PeriodicTable/i18n/en.json';

import explorerVi from '../../modules/MolecularExplorer/i18n/vi.json';
import explorerEn from '../../modules/MolecularExplorer/i18n/en.json';

import bondVi from '../../modules/BondModels/i18n/vi.json';
import bondEn from '../../modules/BondModels/i18n/en.json';

import type { TranslationDictionary } from '../types';

export const vi: TranslationDictionary = {
  home: homeVi,
  ...periodicVi,
  ...explorerVi,
  ...bondVi,
};

export const en: TranslationDictionary = {
  home: homeEn,
  ...periodicEn,
  ...explorerEn,
  ...bondEn,
};
