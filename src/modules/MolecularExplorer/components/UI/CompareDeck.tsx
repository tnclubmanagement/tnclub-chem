import React from 'react';
import { useExplorerStore } from '../../store/useExplorerStore';
import { MOCK_MOLECULES } from '../../data/mockMolecules';
import { calculateLonePairs, calculateDipoleMoment } from '../../services/vseprEngine';
import styles from './CompareDeck.module.css';

export const CompareDeck: React.FC = () => {
  const {
    isCompareMode,
    toggleCompareMode,
    selectedMolecule,
    compareMolecule,
    setCompareMolecule,
  } = useExplorerStore();

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
          <span>⚖️ SO SÁNH ĐỐI CHIẾU PHÂN TỬ 3D</span>
        </div>
        <button className={styles.closeBtn} onClick={toggleCompareMode}>
          ✕ Đóng Chế Độ So Sánh
        </button>
      </div>

      <div className={styles.grid}>
        {/* Molecule 1 */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.formula}>{selectedMolecule.formula}</span>
            <span className={styles.name}>{selectedMolecule.nameVi || selectedMolecule.name}</span>
          </div>

          <div className={styles.specRow}>
            <span className={styles.specLabel}>Dạng Hình Học VSEPR:</span>
            <span className={styles.specVal}>{selectedMolecule.geometry || 'Tiêu chuẩn'}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specLabel}>Số Cặp Electron Tự Do (Lone Pairs):</span>
            <span className={styles.specVal}>{mol1LpCount} cặp</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specLabel}>Momen Lưỡng Cực (Dipole μ):</span>
            <span className={styles.specVal}>{mol1Dipole.magnitude} D ({mol1Dipole.isPolar ? 'Phân cực' : 'Không phân cực'})</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specLabel}>Số Hạt Nguyên Tử:</span>
            <span className={styles.specVal}>{selectedMolecule.atoms.length} hạt</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specLabel}>Số Liên Kết Hóa Học:</span>
            <span className={styles.specVal}>{selectedMolecule.bonds.length} liên kết</span>
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
                  {m.formula} - {m.nameVi || m.name}
                </option>
              ))}
            </select>
            <span className={styles.formula}>{compareMol.formula}</span>
          </div>

          <div className={styles.specRow}>
            <span className={styles.specLabel}>Dạng Hình Học VSEPR:</span>
            <span className={styles.specVal}>{compareMol.geometry || 'Tiêu chuẩn'}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specLabel}>Số Cặp Electron Tự Do (Lone Pairs):</span>
            <span className={styles.specVal}>{mol2LpCount} cặp</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specLabel}>Momen Lưỡng Cực (Dipole μ):</span>
            <span className={styles.specVal}>{mol2Dipole.magnitude} D ({mol2Dipole.isPolar ? 'Phân cực' : 'Không phân cực'})</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specLabel}>Số Hạt Nguyên Tử:</span>
            <span className={styles.specVal}>{compareMol.atoms.length} hạt</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specLabel}>Số Liên Kết Hóa Học:</span>
            <span className={styles.specVal}>{compareMol.bonds.length} liên kết</span>
          </div>
        </div>
      </div>
    </div>
  );
};
