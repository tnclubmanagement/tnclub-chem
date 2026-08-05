import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalSearchStore } from './store/useGlobalSearchStore';
import { searchGlobal } from '../../services/globalSearch/globalSearchEngine';
import type { SearchCategory, SearchableItem } from '../../services/globalSearch/types';
import { useTranslation } from '../../i18n/useTranslation';
import styles from './GlobalSearchModal.module.less';

export const GlobalSearchModal: React.FC = () => {
  const {
    isOpen,
    query,
    selectedCategory,
    selectedIndex,
    recentSearches,
    openSearch,
    closeSearch,
    setQuery,
    setSelectedCategory,
    setSelectedIndex,
    addRecentSearch,
    clearRecentSearches,
  } = useGlobalSearchStore();

  const { language } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Global Keyboard Shortcut (Cmd + K / Ctrl + K) & ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          closeSearch();
        } else {
          openSearch();
        }
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        closeSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, openSearch, closeSearch]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Lọc danh sách kết quả
  const results: SearchableItem[] = useMemo(() => {
    return searchGlobal(query, selectedCategory, language as 'vi' | 'en');
  }, [query, selectedCategory, language]);

  // Đảm bảo selectedIndex hợp lệ
  useEffect(() => {
    if (selectedIndex >= results.length && results.length > 0) {
      setSelectedIndex(results.length - 1);
    }
  }, [results.length, selectedIndex, setSelectedIndex]);

  // Xử lý chọn item
  const handleSelectItem = useCallback((item: SearchableItem) => {
    addRecentSearch(item.title);
    item.onSelect();
    closeSearch();
  }, [addRecentSearch, closeSearch]);

  // Xử lý bàn phím Arrow Up/Down & Enter
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(Math.min(selectedIndex + 1, Math.max(0, results.length - 1)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(Math.max(selectedIndex - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelectItem(results[selectedIndex]);
      }
    }
  };

  // Cuộn tự động tới item đang được chọn bằng phím
  useEffect(() => {
    if (resultsContainerRef.current) {
      const selectedEl = resultsContainerRef.current.children[selectedIndex] as HTMLElement;
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  const categories: Array<{ id: SearchCategory; labelVi: string; labelEn: string; icon: string }> = [
    { id: 'all', labelVi: 'Tất cả', labelEn: 'All Results', icon: '🔍' },
    { id: 'element', labelVi: 'Nguyên tố', labelEn: 'Elements', icon: '⚛️' },
    { id: 'molecule', labelVi: 'Phân tử 3D', labelEn: 'Molecules', icon: '🧬' },
    { id: 'lab', labelVi: 'Hóa chất & Phản ứng', labelEn: 'Virtual Lab', icon: '🧪' },
    { id: 'lesson', labelVi: 'Bài học & Lý thuyết', labelEn: 'Lessons', icon: '🎓' },
    { id: 'nav', labelVi: 'Chuyển trang', labelEn: 'Pages', icon: '🚀' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
          onClick={closeSearch}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Search Input */}
            <div className={styles.header}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                ref={inputRef}
                type="text"
                className={styles.searchInput}
                placeholder={
                  language === 'en'
                    ? 'Search elements (Fe), molecules (H2O), lab reactions, academy topics...'
                    : 'Tra cứu nguyên tố (Fe), phân tử (H2O), phản ứng hóa học, học viện...'
                }
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
              />
              {query ? (
                <button className={styles.clearButton} onClick={() => setQuery('')} title="Clear query">
                  ✕
                </button>
              ) : (
                <span className={styles.shortcutBadge}>ESC</span>
              )}
            </div>

            {/* Filter Category Tabs */}
            <div className={styles.categoriesBar}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`${styles.categoryTab} ${selectedCategory === cat.id ? styles.activeTab : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span>{cat.icon}</span>
                  <span>{language === 'en' ? cat.labelEn : cat.labelVi}</span>
                </button>
              ))}
            </div>

            {/* Main Results / Empty / Recent Search */}
            <div className={styles.resultsList} ref={resultsContainerRef}>
              {!query && recentSearches.length > 0 && selectedCategory === 'all' && (
                <div className={styles.recentSection}>
                  <div className={styles.recentHeader}>
                    <h4>{language === 'en' ? 'Recent Searches' : 'Tìm kiếm gần đây'}</h4>
                    <button onClick={clearRecentSearches}>
                      {language === 'en' ? 'Clear All' : 'Xóa lịch sử'}
                    </button>
                  </div>
                  <div className={styles.recentChips}>
                    {recentSearches.map((chip, idx) => (
                      <button
                        key={idx}
                        className={styles.recentChip}
                        onClick={() => setQuery(chip)}
                      >
                        🕒 {chip}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.length > 0 ? (
                results.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      className={`${styles.resultItem} ${isSelected ? styles.selectedItem : ''}`}
                      onClick={() => handleSelectItem(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div className={styles.itemMain}>
                        <div
                          className={styles.itemIcon}
                          style={item.accentColor ? { borderColor: `${item.accentColor}40`, color: item.accentColor } : {}}
                        >
                          {item.icon || '📌'}
                        </div>
                        <div className={styles.itemInfo}>
                          <div className={styles.itemTitleRow}>
                            <span className={styles.itemTitle}>
                              {language === 'en' && item.titleEn ? item.titleEn : item.title}
                            </span>
                          </div>
                          {item.subtitle && (
                            <span className={styles.itemSubtitle}>
                              {language === 'en' && item.subtitleEn ? item.subtitleEn : item.subtitle}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className={styles.itemTitleRow}>
                        {item.badge && <span className={styles.itemBadge}>{item.badge}</span>}
                        <span className={styles.enterHint}>↵ Enter</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className={styles.emptyState}>
                  <span className={styles.emptyIcon}>🧬</span>
                  <span className={styles.emptyText}>
                    {language === 'en'
                      ? `No chemical results found for "${query}"`
                      : `Không tìm thấy kết quả nào phù hợp với từ khóa "${query}"`}
                  </span>
                </div>
              )}
            </div>

            {/* Footer hints */}
            <div className={styles.footer}>
              <div className={styles.footerShortcuts}>
                <span><kbd>↑</kbd> <kbd>↓</kbd> {language === 'en' ? 'Navigate' : 'Di chuyển'}</span>
                <span><kbd>↵</kbd> {language === 'en' ? 'Select' : 'Chọn'}</span>
                <span><kbd>ESC</kbd> {language === 'en' ? 'Close' : 'Đóng'}</span>
              </div>
              <div>ChemEdu 3D Global Search Engine</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
