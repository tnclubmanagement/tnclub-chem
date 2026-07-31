import React, { useRef, useState, useEffect } from 'react';
import { useChemStore } from '../../store/useChemStore';
import { AtomVisualizer } from '../3D/AtomVisualizer';
import { BondVisualizer } from '../3D/BondVisualizer';
import { RealImageTab } from './RealImageTab';
import { getApplicationText } from '../../utils/applicationData';
import { useTranslation } from '../../../../i18n/useTranslation';
import {
  GROUPS_DATA,
  PERIODS_DATA,
  getElementsByGroup,
  getElementsByPeriod,
} from '../../utils/groupPeriodData';
import styles from './ElementPanel.module.css';

export const ElementPanel: React.FC = () => {
  const {
    selectedElement,
    setSelectedElement,
    activeGroup,
    activePeriod,
    isPanelOpen,
    closePanel,
    activeTab,
    setActiveTab,
  } = useChemStore();

  const { t, language } = useTranslation();

  const [width, setWidth] = useState(400);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [vizHeight, setVizHeight] = useState(280);
  const isResizing = useRef(false);
  const isVizResizing = useRef(false);

  // Restore saved width
  useEffect(() => {
    const savedWidth = localStorage.getItem('edu3d_panelWidth');
    if (savedWidth) setWidth(parseInt(savedWidth, 10));
    const savedVizH = localStorage.getItem('edu3d_vizHeight');
    if (savedVizH) setVizHeight(parseInt(savedVizH, 10));

    const handlePointerMove = (e: PointerEvent) => {
      if (isResizing.current) {
        let newWidth = window.innerWidth - e.clientX;
        if (newWidth < 320) newWidth = 320;
        if (newWidth > 700) newWidth = 700;
        setWidth(newWidth);
      }
      if (isVizResizing.current) {
        // Calculate new height relative to panel top
        const panel = document.getElementById('element-panel-content');
        if (!panel) return;
        const rect = panel.getBoundingClientRect();
        let newH = e.clientY - rect.top;
        if (newH < 140) newH = 140;
        if (newH > 520) newH = 520;
        setVizHeight(newH);
        localStorage.setItem('edu3d_vizHeight', String(newH));
      }
    };

    const handlePointerUp = () => {
      if (isResizing.current) {
        isResizing.current = false;
        document.body.style.cursor = '';
      }
      if (isVizResizing.current) {
        isVizResizing.current = false;
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

  // Update CSS variable --right-panel-width for 3D canvas resizing
  useEffect(() => {
    if (isPanelOpen) {
      const activeW = isCollapsed ? 52 : width;
      document.documentElement.style.setProperty('--right-panel-width', `${activeW}px`);
      setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
    } else {
      document.documentElement.style.setProperty('--right-panel-width', '0px');
      setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
    }
  }, [width, isPanelOpen, isCollapsed]);

  useEffect(() => {
    if (width !== 400) {
      localStorage.setItem('edu3d_panelWidth', width.toString());
    }
  }, [width]);

  // Hidden panel if closed or nothing selected
  const hasContent = selectedElement !== null || activeGroup !== null || activePeriod !== null;
  if (!isPanelOpen || !hasContent) {
    return <aside className={`${styles.rightPanel} ${styles.hidden}`} />;
  }

  // --- Collapsed State (Peek Bar) ---
  if (isCollapsed) {
    return (
      <aside className={`${styles.rightPanel} ${styles.collapsed}`}>
        <div
          className={styles.collapsedPeek}
          onClick={() => setIsCollapsed(false)}
          title={t('periodicTable', 'expandTooltip')}
        >
          <button className={styles.peekExpandBtn} aria-label="Mở rộng">
            ‹
          </button>
          <span className={styles.peekVerticalText}>
            {selectedElement
              ? selectedElement.name
              : activeGroup
              ? `Nhóm ${activeGroup}`
              : `Chu kỳ ${activePeriod}`}
          </span>
        </div>
      </aside>
    );
  }

  // Determine current view mode
  const groupData = activeGroup ? GROUPS_DATA[activeGroup] : null;
  const periodData = activePeriod ? PERIODS_DATA[activePeriod] : null;
  const groupElements = activeGroup ? getElementsByGroup(activeGroup) : [];
  const periodElements = activePeriod ? getElementsByPeriod(activePeriod) : [];

  return (
    <aside className={styles.rightPanel} style={{ width: `${width}px` }}>
      {/* Drag Resizer Handle */}
      <div
        className={styles.resizer}
        onPointerDown={(e) => {
          isResizing.current = true;
          document.body.style.cursor = 'ew-resize';
          e.preventDefault();
        }}
      />

      <div className={styles.panelContent} id="element-panel-content">
        {/* Panel Header */}
        <div className={styles.panelHeader}>
          <h3 className={styles.panelTitle}>
            {selectedElement
              ? `${t('periodicTable', 'elementPanelTitle')} ${selectedElement.symbol}`
              : activeGroup
              ? `${t('periodicTable', 'groupInfoTitle')} ${activeGroup}`
              : `${t('periodicTable', 'periodInfoTitle')} ${activePeriod}`}
          </h3>
          <div className={styles.headerActions}>
            <button
              className={styles.iconBtn}
              onClick={() => setIsCollapsed(true)}
              title={t('periodicTable', 'collapseBtn')}
            >
              {t('periodicTable', 'collapseBtn')}
            </button>
            <button
              className={`${styles.iconBtn} ${styles.closeBtn}`}
              onClick={closePanel}
              title="Đóng bảng thông tin"
            >
              ✕
            </button>
          </div>
        </div>

        {/* =======================================================
            SCENARIO 1: SELECTED ELEMENT DETAILS & 3D VISUALIZER
           ======================================================= */}
        {selectedElement && (
          <>
            {/* 3D Visualizer Section with Tabs */}
            <div className={styles.visualizerWrapper} style={{ height: `${vizHeight}px` }}>
              <div className={styles.tabSwitchContainer}>
                <div
                  className={styles.tabSwitch}
                  style={{
                    transform: `translateX(${
                      activeTab === 'atom'
                        ? '4px'
                        : activeTab === 'bond'
                        ? '100%'
                        : 'calc(200% - 4px)'
                    })`,
                  }}
                />
                <button
                  className={`${styles.tabBtn} ${activeTab === 'atom' ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab('atom')}
                >
                  {t('periodicTable', 'tabAtom')}
                </button>
                <button
                  className={`${styles.tabBtn} ${activeTab === 'bond' ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab('bond')}
                >
                  {t('periodicTable', 'tabBond')}
                </button>
                <button
                  className={`${styles.tabBtn} ${activeTab === 'real' ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab('real')}
                >
                  {t('periodicTable', 'tabReal')}
                </button>
              </div>

              {activeTab === 'atom' && <AtomVisualizer element={selectedElement} />}
              {activeTab === 'bond' && <BondVisualizer element={selectedElement} />}
              {activeTab === 'real' && <RealImageTab elementName={selectedElement.name} />}
            </div>

            {/* Vertical Resizer between 3D Visualizer and Panel Info */}
            <div
              className={styles.vizResizer}
              onPointerDown={(e) => {
                isVizResizing.current = true;
                document.body.style.cursor = 'ns-resize';
                e.preventDefault();
              }}
            >
              <div className={styles.vizResizerGrip} />
            </div>

            <div className={styles.panelInfo}>
              <div className={styles.elementBadge}>
                <h1 className={styles.modalSymbol}>{selectedElement.symbol}</h1>
                <div className={styles.elementHeaderText}>
                  <h2 className={styles.modalName}>
                    {language === 'en' ? selectedElement.name.split(' ')[0] : selectedElement.name}
                  </h2>
                  <span className={styles.modalCategory}>{selectedElement.category}</span>
                </div>
              </div>

              <div className={styles.modalDivider}></div>

              <div className={styles.modalDetails}>
                <h3>{t('periodicTable', 'discoveryInfo')}</h3>
                <p className={styles.modalDesc}>
                  {language === 'en' ? (
                    <>
                      Bohr atomic model of <b>{selectedElement.name.split(' ')[0]}</b>:<br />
                      <br />
                      Comprising a central nucleus surrounded by <b>{selectedElement.z} electron{selectedElement.z > 1 ? 's' : ''}</b> in quantum orbital shells.
                    </>
                  ) : (
                    <>
                      Mô hình cấu trúc Bohr của <b>{selectedElement.name}</b>:<br />
                      <br />
                      Gồm hạt nhân ở trung tâm và <b>{selectedElement.z} electron</b> xoay quanh trên các
                      phân lớp quỹ đạo lượng tử.
                    </>
                  )}
                </p>

                {selectedElement.electronConfig && (
                  <div className={styles.configSection}>
                    <h4 className={styles.configHeading}>{t('periodicTable', 'electronConfigLabel')}:</h4>
                    <code className={styles.configText}>{selectedElement.electronConfig}</code>
                  </div>
                )}

                <h3 className={styles.appHeading}>{t('periodicTable', 'applicationsLabel')}</h3>
                <p className={styles.modalDesc}>{getApplicationText(selectedElement, language)}</p>
              </div>
            </div>
          </>
        )}

        {/* =======================================================
            SCENARIO 2: GROUP / COLUMN INFORMATION
           ======================================================= */}
        {!selectedElement && activeGroup && groupData && (
          <div className={styles.panelInfo}>
            <div className={styles.groupCard}>
              <span
                className={styles.groupBadge}
                style={{ color: groupData.color, borderColor: groupData.color }}
              >
                Cột {activeGroup}
              </span>
              <h2 className={styles.groupTitle}>{groupData.name}</h2>

              <div className={styles.infoBlock}>
                <div className={styles.infoBlockTitle}>⚡ Electron hóa trị</div>
                <p className={styles.infoBlockText}>{groupData.valenceElectrons}</p>
              </div>

              <div className={styles.infoBlock}>
                <div className={styles.infoBlockTitle}>🧪 Đặc tính vật lý & hóa học</div>
                <p className={styles.infoBlockText}>{groupData.characteristics}</p>
              </div>

              <div className={styles.infoBlock}>
                <div className={styles.infoBlockTitle}>🔬 Phản ứng đặc trưng</div>
                <p className={styles.infoBlockText}>{groupData.chemicalBehavior}</p>
              </div>
            </div>

            {/* List of elements in this group */}
            <div className={styles.elementsGridSection}>
              <div className={styles.elementsGridTitle}>
                <span>Danh sách Nguyên tố trong Nhóm</span>
                <span className={styles.elementCountBadge}>{groupElements.length} nguyên tố</span>
              </div>

              <div className={styles.elementsChipsGrid}>
                {groupElements.map((el) => (
                  <button
                    key={el.z}
                    className={styles.elementChip}
                    onClick={() => setSelectedElement(el)}
                    title={`Xem 3D nguyên tố ${el.name}`}
                  >
                    <span className={styles.chipZ}>{el.z}</span>
                    <span className={styles.chipSymbol}>{el.symbol}</span>
                    <span className={styles.chipName}>{el.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =======================================================
            SCENARIO 3: PERIOD INFORMATION
           ======================================================= */}
        {!selectedElement && activePeriod && periodData && (
          <div className={styles.panelInfo}>
            <div className={styles.groupCard}>
              <span className={styles.groupBadge} style={{ color: '#00f7ff', borderColor: '#00f7ff' }}>
                Hàng {activePeriod}
              </span>
              <h2 className={styles.groupTitle}>{periodData.name}</h2>

              <div className={styles.infoBlock}>
                <div className={styles.infoBlockTitle}>🌐 Số lớp Electron</div>
                <p className={styles.infoBlockText}>
                  Tất cả nguyên tố thuộc Chu kỳ {activePeriod} đều có <b>{periodData.electronShells} lớp electron</b> xung quanh hạt nhân.
                </p>
              </div>

              <div className={styles.infoBlock}>
                <div className={styles.infoBlockTitle}>📋 Tổng quan chu kỳ</div>
                <p className={styles.infoBlockText}>{periodData.description}</p>
              </div>

              <div className={styles.infoBlock}>
                <div className={styles.infoBlockTitle}>📈 Quy luật biến đổi tính chất</div>
                <p className={styles.infoBlockText}>{periodData.trend}</p>
              </div>
            </div>

            {/* List of elements in this period */}
            <div className={styles.elementsGridSection}>
              <div className={styles.elementsGridTitle}>
                <span>Danh sách Nguyên tố trong Chu kỳ</span>
                <span className={styles.elementCountBadge}>{periodElements.length} nguyên tố</span>
              </div>

              <div className={styles.elementsChipsGrid}>
                {periodElements.map((el) => (
                  <button
                    key={el.z}
                    className={styles.elementChip}
                    onClick={() => setSelectedElement(el)}
                    title={`Xem 3D nguyên tố ${el.name}`}
                  >
                    <span className={styles.chipZ}>{el.z}</span>
                    <span className={styles.chipSymbol}>{el.symbol}</span>
                    <span className={styles.chipName}>{el.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
