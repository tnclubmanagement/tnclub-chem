import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useExplorerStore } from '../../store/useExplorerStore';
import { MOCK_MOLECULES } from '../../data/mockMolecules';
import styles from './ExplorerOverlay.module.css';

const CATEGORIES = [
  { id: 'all', name: 'Tất cả' },
  { id: 'inorganic', name: 'Vô cơ' },
  { id: 'organic', name: 'Hữu cơ' },
  { id: 'acid_base', name: 'Axit & Bazơ' },
  { id: 'bio', name: 'Sinh học & Y học' },
  { id: 'material', name: 'Tinh thể' },
];

export const ExplorerOverlay = () => {
  const {
    selectedMolecule,
    setSelectedMolecule,
    hoveredAtomId,
    setHoveredAtomId,
    isAutoRotate,
    toggleAutoRotate,
    explodeRadius,
    setExplodeRadius,
    renderMode,
    setRenderMode,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,

    // Academic controls
    showLonePairs,
    toggleShowLonePairs,
    showOrbitals,
    toggleShowOrbitals,
    showDipole,
    toggleShowDipole,
    isMeasureMode,
    toggleIsMeasureMode,
    toggleCompareMode,
  } = useExplorerStore();

  // Initialize with first molecule if none selected
  useEffect(() => {
    if (!selectedMolecule && MOCK_MOLECULES.length > 0) {
      setSelectedMolecule(MOCK_MOLECULES[0]);
    }
  }, [selectedMolecule, setSelectedMolecule]);

  // Filter molecules based on category & search query
  const filteredMolecules = useMemo(() => {
    return MOCK_MOLECULES.filter((mol) => {
      const matchCat =
        selectedCategory === 'all' || mol.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        mol.name.toLowerCase().includes(q) ||
        (mol.nameVi && mol.nameVi.toLowerCase().includes(q)) ||
        mol.formula.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className={styles.overlayContainer}>

      {/* =======================================================
          TOP BAR: BRAND + CATEGORY PILLS + SEARCH
         ======================================================= */}
      <motion.div
        className={styles.topBar}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <div className={styles.brand}>
          <div className={styles.brandBadge}>🔬</div>
          <div className={styles.brandTitle}>PHÒNG PHÂN TÍCH 3D</div>
          <span className={styles.brandSub}>Sandbox 3D Tương Tác</span>
        </div>

        {/* Category Pills */}
        <div className={styles.categoryPills}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.pillBtn} ${
                selectedCategory === cat.id ? styles.pillActive : ''
              }`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Tìm phân tử, công thức..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      {/* =======================================================
          LEFT CONTROL DECK: MOLECULE PICKER + RENDER MODES + SLIDERS
         ======================================================= */}
      <motion.div
        className={styles.controlDeck}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
      >
        <div>
          <h4 className={styles.sectionTitle}>🧪 Chọn Phân tử ({filteredMolecules.length})</h4>
          <select
            className={styles.selector}
            value={selectedMolecule?.id || ''}
            onChange={(e) => {
              const mol = MOCK_MOLECULES.find((m) => m.id === e.target.value);
              if (mol) setSelectedMolecule(mol);
            }}
          >
            {filteredMolecules.map((mol) => (
              <option key={mol.id} value={mol.id}>
                {mol.formula} - {mol.nameVi || mol.name}
              </option>
            ))}
          </select>

          <div className={styles.quickGrid}>
            {filteredMolecules.map((mol) => (
              <button
                key={mol.id}
                className={`${styles.quickMolBtn} ${
                  selectedMolecule?.id === mol.id ? styles.quickMolActive : ''
                }`}
                onClick={() => setSelectedMolecule(mol)}
                title={mol.nameVi || mol.name}
              >
                <span className={styles.molNameVi}>{mol.nameVi || mol.name}</span>
                <span className={styles.molFormula}>{mol.formula}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Academic Feature Deck */}
        <div>
          <h4 className={styles.sectionTitle}>🎓 Chuyên Sâu Hóa Học 3D</h4>
          <div className={styles.modeGroup} style={{ flexDirection: 'column', gap: '8px' }}>
            <button
              className={`${styles.btn} ${showLonePairs ? styles.btnActive : ''}`}
              onClick={toggleShowLonePairs}
            >
              👁️ Cặp Electron Tự Do (Lone Pairs)
            </button>
            <button
              className={`${styles.btn} ${showOrbitals ? styles.btnActive : ''}`}
              onClick={toggleShowOrbitals}
            >
              ☁️ Xen Phủ Orbital (σ &amp; π)
            </button>
            <button
              className={`${styles.btn} ${showDipole ? styles.btnActive : ''}`}
              onClick={toggleShowDipole}
            >
              ⚡ Vector Dipole Momen (μ)
            </button>
            <button
              className={`${styles.btn} ${isMeasureMode ? styles.btnActive : ''}`}
              onClick={toggleIsMeasureMode}
            >
              📐 Đo Góc &amp; Khoảng Cách 3D
            </button>
            <button
              className={styles.btn}
              style={{ background: 'rgba(168, 85, 247, 0.25)', borderColor: '#a855f7' }}
              onClick={toggleCompareMode}
            >
              ⚖️ So Sánh Phân Tử Song Song
            </button>
          </div>
        </div>

        {/* Render Mode Toggle */}
        <div>
          <h4 className={styles.sectionTitle}>👁️ Kiểu Render 3D</h4>
          <div className={styles.modeGroup}>
            <button
              className={`${styles.btn} ${
                renderMode === 'ball-and-stick' ? styles.btnActive : ''
              }`}
              onClick={() => setRenderMode('ball-and-stick')}
            >
              ⚛️ Ball &amp; Stick
            </button>
            <button
              className={`${styles.btn} ${
                renderMode === 'space-filling' ? styles.btnActive : ''
              }`}
              onClick={() => setRenderMode('space-filling')}
            >
              🔮 Space Filling
            </button>
          </div>
        </div>

        {/* Rotation & Explode Sliders */}
        <div>
          <h4 className={styles.sectionTitle}>🎛️ Điều khiển Mô hình</h4>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
            <button
              className={`${styles.btn} ${isAutoRotate ? styles.btnActive : ''}`}
              onClick={toggleAutoRotate}
            >
              {isAutoRotate ? '⏸️ Dừng Xoay' : '▶️ Tự Xoay'}
            </button>
          </div>

          <div className={styles.sliderBox}>
            <div className={styles.sliderHeader}>
              <span>Tách rời cấu trúc (Explode):</span>
              <span className={styles.sliderVal}>{explodeRadius.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={explodeRadius}
              onChange={(e) => setExplodeRadius(parseFloat(e.target.value))}
              className={styles.slider}
            />
          </div>
        </div>
      </motion.div>

      {/* =======================================================
          RIGHT INFO DRAWER: SPECS + DESCRIPTION + ATOMS
         ======================================================= */}
      {selectedMolecule && (
        <motion.div
          className={styles.infoDrawer}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          {/* Header Badge */}
          <div className={styles.molHeaderBadge}>
            <div className={styles.formulaBox}>{selectedMolecule.formula}</div>
            <div className={styles.molTitles}>
              <h2 className={styles.nameVi}>{selectedMolecule.nameVi || selectedMolecule.name}</h2>
              <span className={styles.nameEn}>{selectedMolecule.name}</span>
            </div>
          </div>

          {/* Key Specs */}
          <div className={styles.specGrid}>
            <div className={styles.specCard}>
              <span className={styles.specLabel}>Khối lượng phân tử:</span>
              <span className={styles.specValue}>
                {selectedMolecule.molarMass ? `${selectedMolecule.molarMass} g/mol` : '---'}
              </span>
            </div>
            <div className={styles.specCard}>
              <span className={styles.specLabel}>Tổng nguyên tử:</span>
              <span className={styles.specValue}>{selectedMolecule.atoms.length} hạt</span>
            </div>
            <div className={styles.specCard}>
              <span className={styles.specLabel}>Số liên kết:</span>
              <span className={styles.specValue}>{selectedMolecule.bonds.length} liên kết</span>
            </div>
            <div className={styles.specCard}>
              <span className={styles.specLabel}>Cấu trúc hình học:</span>
              <span className={styles.specValue}>{selectedMolecule.geometry || 'Tiêu chuẩn'}</span>
            </div>
          </div>

          {/* Description */}
          {selectedMolecule.description && (
            <div>
              <h4 className={styles.sectionTitle}>📖 Giới thiệu hóa học</h4>
              <div className={styles.descBox}>{selectedMolecule.description}</div>
            </div>
          )}

          {/* Real world Applications */}
          {selectedMolecule.applications && selectedMolecule.applications.length > 0 && (
            <div>
              <h4 className={styles.sectionTitle}>💡 Ứng dụng thực tế</h4>
              <div className={styles.appList}>
                {selectedMolecule.applications.map((app, idx) => (
                  <div key={idx} className={styles.appItem}>
                    <span className={styles.appBullet}>❖</span>
                    <span>{app}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Atom Chips */}
          <div>
            <h4 className={styles.sectionTitle}>
              ⚛️ Danh sách Nguyên tử trong phân tử ({selectedMolecule.atoms.length})
            </h4>
            <div className={styles.atomsChipList}>
              {selectedMolecule.atoms.map((atom) => (
                <button
                  key={atom.id}
                  className={`${styles.atomChip} ${
                    hoveredAtomId === atom.id ? styles.atomChipActive : ''
                  }`}
                  onMouseEnter={() => setHoveredAtomId(atom.id)}
                  onMouseLeave={() => setHoveredAtomId(null)}
                >
                  {atom.symbol} ({atom.id})
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
