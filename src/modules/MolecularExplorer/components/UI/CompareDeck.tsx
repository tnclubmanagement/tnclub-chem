import React from 'react';
import { useExplorerStore } from '../../store/useExplorerStore';
import { MOCK_MOLECULES } from '../../data/mockMolecules';
import { calculateLonePairs, calculateDipoleMoment } from '../../services/vseprEngine';
import { useTranslation } from '../../../../i18n/useTranslation';
import styles from './CompareDeck.module.css';

export const CompareDeck: React.FC = () => {
  const {
    isCompareMode,
    toggleCompareMode,
    selectedMolecule,
    compareMolecule,
    setCompareMolecule,
  } = useExplorerStore();
  const { t, language } = useTranslation();

  if (!isCompareMode || !selectedMolecule) return null;

  const compareMol = compareMolecule || MOCK_MOLECULES.find((m) => m.id !== selectedMolecule.id) || MOCK_MOLECULES[0];

  const mol1LpCount = calculateLonePairs(selectedMolecule).length;
  const mol2LpCount = calculateLonePairs(compareMol).length;

  const mol1Dipole = calculateDipoleMoment(selectedMolecule);
  const mol2Dipole = calculateDipoleMoment(compareMol);

  return (
    <div className={styles.compareModal}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span>⚖️ {t('compare', 'title')}</span>
        </div>
        <button className={styles.closeBtn} onClick={toggleCompareMode}>
          {t('compare', 'closeBtn')}
        </button>
      </div>

      <div className={styles.grid}>
        {/* Molecule 1 */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.formula}>{selectedMolecule.formula}</span>
            <span className={styles.name}>
              {language === 'en' ? selectedMolecule.name : selectedMolecule.nameVi || selectedMolecule.name}
            </span>
          </div>

          <div className={styles.specRow}>
            <span className={styles.specLabel}>{t('compare', 'vseprGeometry')}</span>
            <span className={styles.specVal}>{selectedMolecule.geometry || '---'}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specLabel}>{t('compare', 'lonePairCount')}</span>
            <span className={styles.specVal}>{mol1LpCount} {t('compare', 'pairsUnit')}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specLabel}>{t('compare', 'dipoleMoment')}</span>
            <span className={styles.specVal}>
              {mol1Dipole.magnitude} D ({mol1Dipole.isPolar ? t('compare', 'polar') : t('compare', 'nonPolar')})
            </span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specLabel}>{t('compare', 'totalAtoms')}</span>
            <span className={styles.specVal}>{selectedMolecule.atoms.length} {t('compare', 'atomsUnit')}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specLabel}>{t('compare', 'bondsCount')}</span>
            <span className={styles.specVal}>{selectedMolecule.bonds.length} {t('compare', 'bondsUnit')}</span>
          </div>
        </div>

        {/* Molecule 2 Picker & Stats */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <select
              className={styles.selectMol}
              value={compareMol.id}
              onChange={(e) => {
                const found = MOCK_MOLECULES.find((m) => m.id === e.target.value);
                if (found) setCompareMolecule(found);
              }}
            >
              {MOCK_MOLECULES.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.formula} - {language === 'en' ? m.name : m.nameVi || m.name}
                </option>
              ))}
            </select>
            <span className={styles.formula}>{compareMol.formula}</span>
          </div>

          <div className={styles.specRow}>
            <span className={styles.specLabel}>{t('compare', 'vseprGeometry')}</span>
            <span className={styles.specVal}>{compareMol.geometry || '---'}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specLabel}>{t('compare', 'lonePairCount')}</span>
            <span className={styles.specVal}>{mol2LpCount} {t('compare', 'pairsUnit')}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specLabel}>{t('compare', 'dipoleMoment')}</span>
            <span className={styles.specVal}>
              {mol2Dipole.magnitude} D ({mol2Dipole.isPolar ? t('compare', 'polar') : t('compare', 'nonPolar')})
            </span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specLabel}>{t('compare', 'totalAtoms')}</span>
            <span className={styles.specVal}>{compareMol.atoms.length} {t('compare', 'atomsUnit')}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specLabel}>{t('compare', 'bondsCount')}</span>
            <span className={styles.specVal}>{compareMol.bonds.length} {t('compare', 'bondsUnit')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
