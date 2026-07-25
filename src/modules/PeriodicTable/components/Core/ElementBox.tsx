import React from 'react';
import type { ElementData } from '../../data/elements';
import { useChemStore } from '../../store/useChemStore';
import { playSciFiSound } from '../../utils/audio';
import styles from './ElementBox.module.css';

interface ElementBoxProps {
  element: ElementData;
  onQuizFeedback?: (isCorrect: boolean) => void;
}

export const ElementBox: React.FC<ElementBoxProps> = ({ element, onQuizFeedback }) => {
  const { 
    selectedElement, 
    setSelectedElement, 
    temperature, 
    heatmapEnabled,
    activeGroup,
    activePeriod,
    quizModeActive,
    quizTargetZ,
    soundEnabled
  } = useChemStore();

  const isSelected = selectedElement?.z === element.z;
  
  // Calculate state based on temperature
  let stateClass = '';
  if (element.melt && element.boil) {
    if (temperature < element.melt) {
      stateClass = styles.stateSolid;
    } else if (temperature >= element.melt && temperature < element.boil) {
      stateClass = styles.stateLiquid;
    } else {
      stateClass = styles.stateGas;
    }
  } else {
    stateClass = styles.stateUnknown;
  }

  // Calculate heatmap color
  let customStyle: React.CSSProperties = {
    gridColumn: element.col + 1,
    gridRow: element.row === 9 ? 10 : element.row === 10 ? 11 : element.row + 1,
  };

  if (heatmapEnabled) {
    if (element.electronegativity) {
      const val = Math.max(0, Math.min(1, (element.electronegativity - 0.7) / 3.3));
      const hue = (1 - val) * 240;
      customStyle.backgroundColor = `hsla(${hue}, 100%, 50%, 0.7)`;
    } else {
      customStyle.backgroundColor = 'rgba(255,255,255,0.02)';
    }
  }

  // Handle dimming for group/period selection
  let isDimmed = false;
  if (activeGroup !== null && activeGroup !== element.col) {
    isDimmed = true;
  } else if (activePeriod !== null) {
    const p = activePeriod;
    const row = element.row;
    if (!(row === p || (p === 6 && row === 9) || (p === 7 && row === 10))) {
      isDimmed = true;
    }
  }

  // Category class for color borders
  const categoryClass = styles[`cat-${element.category.replace(/ /g, '-')}`] || styles.catUnknown;

  return (
    <div 
      className={`${styles.elementBox} ${categoryClass} ${stateClass} ${isSelected ? styles.selected : ''} ${isDimmed ? styles.dimmed : ''}`}
      style={customStyle}
      onMouseEnter={() => playSciFiSound('hover', soundEnabled)}
      onClick={() => {
        playSciFiSound('click', soundEnabled);
        if (quizModeActive) {
          if (onQuizFeedback) {
            onQuizFeedback(quizTargetZ === element.z);
          }
        } else {
          setSelectedElement(element);
        }
      }}
    >
      <span className={styles.elZ}>{element.z}</span>
      <span className={styles.elSymbol}>{element.symbol}</span>
      <span className={styles.elName}>{element.name.split(' ')[0]}</span>
    </div>
  );
};
