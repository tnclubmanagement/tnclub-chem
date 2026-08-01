import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useExplorerStore } from '../../store/useExplorerStore';
import { MOCK_MOLECULES } from '../../data/mockMolecules';
import { useTranslation } from '../../../../i18n/useTranslation';
import { LanguageSwitcher } from '../../../../components/LanguageSwitcher/LanguageSwitcher';
import styles from './ExplorerOverlay.module.css';


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

  const { t, language } = useTranslation();
  const [drawerWidth, setDrawerWidth] = useState(380);
  const [drawerHeight, setDrawerHeight] = useState(260);
  const isResizingRef = React.useRef(false);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isResizingRef.current) return;
      if (window.innerWidth > 1100) {
        let newW = window.innerWidth - e.clientX;
        if (newW < 280) newW = 280;
        if (newW > 650) newW = 650;
        setDrawerWidth(newW);
      } else {
        let newH = window.innerHeight - e.clientY;
        if (newH < 140) newH = 140;
        if (newH > 520) newH = 520;
        setDrawerHeight(newH);
      }
    };

    const handlePointerUp = () => {
      if (isResizingRef.current) {
        isResizingRef.current = false;
        document.body.style.cursor = '';
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

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

  const categories = useMemo(() => [
    { id: 'all',       name: t('explorer', 'catAll') },
    { id: 'inorganic', name: t('explorer', 'catInorganic') },
    { id: 'organic',   name: t('explorer', 'catOrganic') },
    { id: 'acid_base', name: t('explorer', 'catAcidBase') },
    { id: 'bio',       name: t('explorer', 'catBio') },
    { id: 'material',  name: t('explorer', 'catMaterial') },
  ], [t]);

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
          <div className={styles.brandTitle}>{t('explorer', 'brandTitle')}</div>
          <span className={styles.brandSub}>{t('explorer', 'brandSub')}</span>
        </div>

        {/* Category Pills */}
        <div className={styles.categoryPills}>
          {categories.map((cat) => (
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
            placeholder={t('explorer', 'searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Language Switcher */}
        <div className={styles.topBarLangSwitch}>
          <LanguageSwitcher horizontal />
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
          <h4 className={styles.sectionTitle}>🧪 {t('explorer', 'selectMolecule')} ({filteredMolecules.length})</h4>
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
                {mol.formula} - {language === 'en' ? mol.name : mol.nameVi || mol.name}
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
                title={language === 'en' ? mol.name : mol.nameVi || mol.name}
              >
                <span className={styles.molNameVi}>{language === 'en' ? mol.name : mol.nameVi || mol.name}</span>
                <span className={styles.molFormula}>{mol.formula}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Academic Feature Deck */}
        <div>
          <h4 className={styles.sectionTitle}>🎓 {t('explorer', 'academicTitle')}</h4>
          <div className={styles.modeGroup} style={{ flexDirection: 'column', gap: '8px' }}>
            <button
              className={`${styles.btn} ${showLonePairs ? styles.btnActive : ''}`}
              onClick={toggleShowLonePairs}
            >
              {t('explorer', 'lonePairsBtn')}
            </button>
            <button
              className={`${styles.btn} ${showOrbitals ? styles.btnActive : ''}`}
              onClick={toggleShowOrbitals}
            >
              {t('explorer', 'orbitalsBtn')}
            </button>
            <button
              className={`${styles.btn} ${showDipole ? styles.btnActive : ''}`}
              onClick={toggleShowDipole}
            >
              {t('explorer', 'dipoleBtn')}
            </button>
            <button
              className={`${styles.btn} ${isMeasureMode ? styles.btnActive : ''}`}
              onClick={toggleIsMeasureMode}
            >
              {t('explorer', 'measureBtn')}
            </button>
            <button
              className={styles.btn}
              style={{ background: 'rgba(168, 85, 247, 0.25)', borderColor: '#a855f7' }}
              onClick={toggleCompareMode}
            >
              {t('explorer', 'compareBtn')}
            </button>
          </div>
        </div>

        {/* Render Mode Toggle */}
        <div>
          <h4 className={styles.sectionTitle}>👁️ {t('explorer', 'renderTitle')}</h4>
          <div className={styles.modeGroup}>
            <button
              className={`${styles.btn} ${
                renderMode === 'ball-and-stick' ? styles.btnActive : ''
              }`}
              onClick={() => setRenderMode('ball-and-stick')}
            >
              {t('explorer', 'ballAndStick')}
            </button>
            <button
              className={`${styles.btn} ${
                renderMode === 'space-filling' ? styles.btnActive : ''
              }`}
              onClick={() => setRenderMode('space-filling')}
            >
              {t('explorer', 'spaceFilling')}
            </button>
          </div>
        </div>

        {/* Rotation & Explode Sliders */}
        <div>
          <h4 className={styles.sectionTitle}>🎛️ {t('explorer', 'controlsTitle')}</h4>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
            <button
              className={`${styles.btn} ${isAutoRotate ? styles.btnActive : ''}`}
              onClick={toggleAutoRotate}
            >
              {isAutoRotate ? t('explorer', 'stopRotate') : t('explorer', 'startRotate')}
            </button>
          </div>

          <div className={styles.sliderBox}>
            <div className={styles.sliderHeader}>
              <span>{t('explorer', 'explodeLabel')}</span>
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
          style={
            {
              '--drawer-width': `${drawerWidth}px`,
              '--drawer-height': `${drawerHeight}px`,
            } as React.CSSProperties
          }
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          {/* Draggable Resizer Bar */}
          <div
            className={styles.resizerHandle}
            onPointerDown={(e) => {
              isResizingRef.current = true;
              document.body.style.cursor =
                window.innerWidth > 1100 ? 'ew-resize' : 'ns-resize';
              e.preventDefault();
            }}
            title={language === 'en' ? 'Drag to resize info panel' : 'Kéo rê để thay đổi kích thước bảng mô tả'}
          >
            <div className={styles.resizerGrip} />
          </div>
          {/* Header Badge */}
          <div className={styles.molHeaderBadge}>
            <div className={styles.formulaBox}>{selectedMolecule.formula}</div>
            <div className={styles.molTitles}>
              <h2 className={styles.nameVi}>
                {language === 'en' ? selectedMolecule.name : selectedMolecule.nameVi || selectedMolecule.name}
              </h2>
              {language !== 'en' && (
                <span className={styles.nameEn}>{selectedMolecule.name}</span>
              )}
            </div>
          </div>

          {/* Key Specs */}
          <div className={styles.specGrid}>
            <div className={styles.specCard}>
              <span className={styles.specLabel}>{t('explorer', 'molarMass')}</span>
              <span className={styles.specValue}>
                {selectedMolecule.molarMass ? `${selectedMolecule.molarMass} g/mol` : '---'}
              </span>
            </div>
            <div className={styles.specCard}>
              <span className={styles.specLabel}>{t('explorer', 'totalAtoms')}</span>
              <span className={styles.specValue}>{selectedMolecule.atoms.length}</span>
            </div>
            <div className={styles.specCard}>
              <span className={styles.specLabel}>{t('explorer', 'bondsCount')}</span>
              <span className={styles.specValue}>{selectedMolecule.bonds.length}</span>
            </div>
            <div className={styles.specCard}>
              <span className={styles.specLabel}>{t('explorer', 'geometry')}</span>
              <span className={styles.specValue}>
                {language === 'en'
                  ? selectedMolecule.geometryEn || selectedMolecule.geometry || '---'
                  : selectedMolecule.geometry || '---'}
              </span>
            </div>
          </div>

          {/* Description */}
          {(selectedMolecule.description || selectedMolecule.descriptionEn) && (
            <div>
              <h4 className={styles.sectionTitle}>{t('explorer', 'chemistryIntro')}</h4>
              <div className={styles.descBox}>
                {language === 'en'
                  ? selectedMolecule.descriptionEn || selectedMolecule.description
                  : selectedMolecule.description}
              </div>
            </div>
          )}

          {/* Real world Applications */}
          {((language === 'en' && selectedMolecule.applicationsEn?.length) ||
            selectedMolecule.applications?.length) && (
            <div>
              <h4 className={styles.sectionTitle}>{t('explorer', 'realWorldApps')}</h4>
              <div className={styles.appList}>
                {(language === 'en'
                  ? selectedMolecule.applicationsEn || selectedMolecule.applications || []
                  : selectedMolecule.applications || []
                ).map((app, idx) => (
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
              ⚛️ {t('explorer', 'atomList')} ({selectedMolecule.atoms.length})
            </h4>
            {isMeasureMode && (
              <p className={styles.measureHelpText}>
                {t('explorer', 'measureHelp')}
              </p>
            )}
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
