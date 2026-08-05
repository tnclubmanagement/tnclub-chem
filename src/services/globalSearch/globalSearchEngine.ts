import type { SearchableItem, SearchCategory } from './types';
import { ELEMENTS } from '../../modules/PeriodicTable/data/elements';
import { MOCK_MOLECULES } from '../../modules/MolecularExplorer/data/mockMolecules';
import { CHEMICALS } from '../../modules/VirtualLab/data/chemicals';
import { REACTIONS } from '../../modules/VirtualLab/data/reactions';
import { MISSIONS } from '../../modules/VirtualLab/data/missions';
import { THEORY_DATA, type TheoryTopic } from '../../modules/VirtualLab/data/theory';
import { ACADEMY_UNITS } from '../../modules/Academy/data/academyData';
import { useChemStore } from '../../modules/PeriodicTable/store/useChemStore';
import { useExplorerStore } from '../../modules/MolecularExplorer/store/useExplorerStore';
import { useVirtualLabStore } from '../../modules/VirtualLab/store/useVirtualLabStore';

// Chuẩn hóa tiếng Việt không dấu để hỗ trợ tìm kiếm dễ dàng
export function normalizeText(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .trim();
}

export function getAllSearchableItems(): SearchableItem[] {
  const items: SearchableItem[] = [];

  // Helper getters to lazily execute store actions without caching stale store references
  const getChemStore = () => useChemStore.getState();
  const getExplorerStore = () => useExplorerStore.getState();
  const getVirtualLabStore = () => useVirtualLabStore.getState();

  // 1. Navigation / Trang ứng dụng
  const navItems: SearchableItem[] = [
    {
      id: 'nav-home',
      title: 'Trang Chủ & Vũ Trụ 3D',
      titleEn: 'Home & Spatial 3D Universe',
      subtitle: 'Khám phá không gian hóa học 3D tương tác',
      subtitleEn: 'Explore 3D interactive chemical space',
      category: 'nav',
      tags: ['home', 'trang chu', 'overview', 'dashboard', '3d', 'hologram'],
      icon: '🏠',
      badge: 'Trang',
      accentColor: '#00f7ff',
      onSelect: () => getChemStore().setActiveView('home'),
    },
    {
      id: 'nav-periodic-table',
      title: 'Bảng Tuần Hoàn 3D',
      titleEn: '3D Periodic Table',
      subtitle: '118 nguyên tố hóa học, cấu hình electron & nhiệt độ',
      subtitleEn: '118 chemical elements, electron configs & temperature heatmap',
      category: 'nav',
      tags: ['periodic table', 'bang tuan hoan', 'nguyen to', 'elements', 'z', 'electron'],
      icon: '⚛️',
      badge: 'Trang',
      accentColor: '#00f7ff',
      onSelect: () => getChemStore().setActiveView('periodic-table'),
    },
    {
      id: 'nav-explorer',
      title: 'Phòng Khám Phá Phân Tử 3D',
      titleEn: '3D Molecular Explorer',
      subtitle: 'Cấu trúc 3D VSEPR, góc liên kết & orbital phân tử',
      subtitleEn: '3D VSEPR structures, bond angles & molecular orbitals',
      category: 'nav',
      tags: ['explorer', 'phan tu', 'molecule', '3d', 'vsepr', 'bond angle', 'orbital'],
      icon: '🧬',
      badge: 'Trang',
      accentColor: '#ff1adb',
      onSelect: () => getChemStore().setActiveView('explorer'),
    },
    {
      id: 'nav-virtual-lab',
      title: 'Phòng Thí Nghiệm Ảo 3D',
      titleEn: '3D Virtual Lab',
      subtitle: 'Pha chế hóa chất, phản ứng nổ & cân bằng phương trình',
      subtitleEn: 'Mix chemicals, explosive reactions & balance equations',
      category: 'nav',
      tags: ['virtual lab', 'phong thi nghiem', 'hoa chat', 'phan ung', 'beaker', 'flask', 'reaction'],
      icon: '🧪',
      badge: 'Trang',
      accentColor: '#00ff80',
      onSelect: () => getChemStore().setActiveView('virtual-lab'),
    },
    {
      id: 'nav-academy',
      title: 'Học Viện Hóa Học (Academy)',
      titleEn: 'Chemistry Academy',
      subtitle: 'Chương trình lý thuyết chuyên sâu, bài tập & Quiz 3D',
      subtitleEn: 'In-depth theory curriculum, exercises & 3D Quizzes',
      category: 'nav',
      tags: ['academy', 'hoc vien', 'bai hoc', 'ly thuyet', 'quiz', 'chuong trinh'],
      icon: '🎓',
      badge: 'Trang',
      accentColor: '#eab308',
      onSelect: () => getChemStore().setActiveView('academy'),
    },
    {
      id: 'nav-settings',
      title: 'Cài Đặt Hệ Thống',
      titleEn: 'Application Settings',
      subtitle: 'Chủ đề Sci-Fi, phông chữ, âm thanh & đồ họa 3D',
      subtitleEn: 'Sci-Fi theme, typography, audio & 3D graphics',
      category: 'nav',
      tags: ['settings', 'cai dat', 'theme', 'audio', 'graphics', 'language', 'ngon ngu'],
      icon: '⚙️',
      badge: 'Trang',
      accentColor: '#a855f7',
      onSelect: () => getChemStore().setActiveView('settings'),
    },
  ];
  items.push(...navItems);

  // 2. Elements (Periodic Table)
  (ELEMENTS || []).forEach((el) => {
    if (!el) return;
    items.push({
      id: `element-${el.z}`,
      title: `${el.name || ''} (${el.symbol || ''})`,
      titleEn: `${el.symbol || ''} - Atomic Z=${el.z}`,
      subtitle: `Số hiệu Z=${el.z} | ${el.category || ''} | Cấu hình: ${el.electronConfig || ''}`,
      subtitleEn: `Atomic Z=${el.z} | ${el.category || ''} | Config: ${el.electronConfig || ''}`,
      category: 'element',
      tags: [el.symbol || '', el.name || '', `z${el.z}`, `z=${el.z}`, el.category || '', el.electronConfig || '', el.bondType || '', el.bondName || ''],
      icon: '⚛️',
      badge: `Z=${el.z}`,
      accentColor: '#00f7ff',
      onSelect: () => {
        getChemStore().setActiveView('periodic-table');
        getChemStore().setSelectedElement(el);
      },
    });
  });

  // 3. Molecules (Molecular Explorer)
  (MOCK_MOLECULES || []).forEach((mol) => {
    if (!mol) return;
    const appsVi = mol.applications ? mol.applications.join(' ') : '';
    const appsEn = mol.applicationsEn ? mol.applicationsEn.join(' ') : '';
    items.push({
      id: `molecule-${mol.id}`,
      title: `${mol.nameVi || mol.name || ''} (${mol.formula || ''})`,
      titleEn: `${mol.name || ''} (${mol.formula || ''})`,
      subtitle: `Hình học: ${mol.geometry || 'N/A'} | Khối lượng: ${mol.molarMass || 'N/A'} g/mol`,
      subtitleEn: `Geometry: ${mol.geometryEn || mol.geometry || 'N/A'} | Mass: ${mol.molarMass || 'N/A'} g/mol`,
      category: 'molecule',
      tags: [mol.formula || '', mol.name || '', mol.nameVi || '', mol.category || '', mol.geometry || '', appsVi, appsEn],
      icon: '🧬',
      badge: mol.formula || '',
      accentColor: '#ff1adb',
      onSelect: () => {
        getChemStore().setActiveView('explorer');
        getExplorerStore().setSelectedMolecule(mol);
      },
    });
  });

  // 4. Chemicals & Reactions (Virtual Lab)
  if (CHEMICALS) {
    Object.values(CHEMICALS).forEach((chem) => {
      if (!chem) return;
      items.push({
        id: `chemical-${chem.id}`,
        title: `${chem.name || ''} (${chem.formula || ''})`,
        titleEn: `${chem.nameEn || chem.name || ''} (${chem.formula || ''})`,
        subtitle: `Trạng thái: ${chem.state || ''} | Phân loại: ${(chem.group || '').toUpperCase()}`,
        subtitleEn: `State: ${chem.state || ''} | Group: ${(chem.group || '').toUpperCase()}`,
        category: 'lab',
        tags: [chem.formula || '', chem.name || '', chem.nameEn || '', chem.state || '', chem.group || '', chem.application || ''],
        icon: '🧪',
        badge: chem.formula || '',
        accentColor: '#00ff80',
        onSelect: () => {
          getChemStore().setActiveView('virtual-lab');
          void getVirtualLabStore().addReactant(chem);
        },
      });
    });
  }

  (REACTIONS || []).forEach((rxn) => {
    if (!rxn) return;
    const reactantTags = (rxn.reactants || []).filter(Boolean).map((r) => r.formula || r.name || '');
    const productTags = (rxn.products || []).filter(Boolean).map((p) => p.formula || p.name || '');
    const eqText = rxn.equationHTML ? rxn.equationHTML.replace(/&rarr;/g, '→').replace(/&uarr;/g, '↑').replace(/&darr;/g, '↓') : rxn.id;
    items.push({
      id: `reaction-${rxn.id}`,
      title: `Phản ứng: ${eqText}`,
      titleEn: `Reaction: ${rxn.id}`,
      subtitle: rxn.description || '',
      subtitleEn: rxn.descriptionEn || rxn.description || '',
      category: 'lab',
      tags: ['phan ung', 'reaction', rxn.description || '', rxn.id || '', ...reactantTags, ...productTags],
      icon: '⚡',
      badge: 'Phản ứng',
      accentColor: '#00ff80',
      onSelect: () => {
        getChemStore().setActiveView('virtual-lab');
      },
    });
  });

  (MISSIONS || []).forEach((mission) => {
    if (!mission) return;
    items.push({
      id: `mission-${mission.id}`,
      title: `Nhiệm vụ: ${mission.title || ''}`,
      titleEn: `Mission: ${mission.titleEn || mission.title || ''}`,
      subtitle: mission.description || '',
      subtitleEn: mission.descriptionEn || mission.description || '',
      category: 'lab',
      tags: ['nhiem vu', 'mission', mission.title || '', mission.description || ''],
      icon: '🎯',
      badge: 'Nhiệm vụ Lab',
      accentColor: '#eab308',
      onSelect: () => {
        getChemStore().setActiveView('virtual-lab');
      },
    });
  });

  (THEORY_DATA || []).forEach((article: TheoryTopic) => {
    if (!article) return;
    items.push({
      id: `theory-${article.id}`,
      title: `Lý thuyết Lab: ${article.title || ''}`,
      titleEn: `Lab Theory: ${article.titleEn || article.title || ''}`,
      subtitle: (article.content || '').slice(0, 90) + '...',
      subtitleEn: (article.contentEn || article.content || '').slice(0, 90) + '...',
      category: 'lab',
      tags: ['ly thuyet lab', 'lab theory', article.title || '', article.content || ''],
      icon: '📖',
      badge: 'Lý thuyết',
      accentColor: '#00ff80',
      onSelect: () => {
        getChemStore().setActiveView('virtual-lab');
      },
    });
  });

  // 5. Academy

  (ACADEMY_UNITS || []).forEach((unit) => {
    if (!unit || !unit.topics) return;
    unit.topics.forEach((topic) => {
      if (!topic) return;
      items.push({
        id: `academy-${topic.id}`,
        title: `Academy: ${topic.title || ''}`,
        titleEn: `Academy: ${topic.titleEn || ''}`,
        subtitle: topic.subtitle || '',
        subtitleEn: topic.subtitleEn || '',
        category: 'lesson',
        tags: ['academy', topic.title || '', topic.titleEn || '', topic.subtitle || '', unit.title || ''],
        icon: topic.icon || '🎓',
        badge: 'Academy',
        accentColor: unit.badgeColor || '#eab308',
        onSelect: () => {
          getChemStore().setActiveView('academy');
        },
      });
    });
  });

  return items;
}

export function searchGlobal(
  query: string,
  category: SearchCategory = 'all',
  language: 'vi' | 'en' = 'vi'
): SearchableItem[] {
  const rawQuery = (query || '').trim();
  const normalizedQuery = normalizeText(rawQuery);

  const allItems = getAllSearchableItems();

  if (!rawQuery) {
    if (category === 'all') {
      return allItems.filter((item) => item.category === 'nav' || item.id.startsWith('element-1') || item.id === 'molecule-h2o').slice(0, 10);
    }
    return allItems.filter((item) => item.category === category).slice(0, 15);
  }

  let filteredItems = allItems;
  if (category !== 'all') {
    filteredItems = allItems.filter((item) => item.category === category);
  }

  interface ScoredItem {
    item: SearchableItem;
    score: number;
  }

  const scored: ScoredItem[] = [];

  for (const item of filteredItems) {
    const title = language === 'en' && item.titleEn ? item.titleEn : item.title;
    const subtitle = language === 'en' && item.subtitleEn ? item.subtitleEn : item.subtitle || '';
    
    const normTitle = normalizeText(title);
    const normSubtitle = normalizeText(subtitle);

    let score = 0;

    const symbolOrFormulaTag = item.tags && item.tags[0] ? normalizeText(item.tags[0]) : '';
    if (symbolOrFormulaTag && symbolOrFormulaTag === normalizedQuery) {
      score += 200;
    } else if (symbolOrFormulaTag && symbolOrFormulaTag.startsWith(normalizedQuery)) {
      score += 120;
    }

    if (normTitle === normalizedQuery) {
      score += 150;
    } else if (normTitle.startsWith(normalizedQuery)) {
      score += 100;
    } else if (normTitle.includes(normalizedQuery)) {
      score += 60;
    }

    if (normSubtitle.includes(normalizedQuery)) {
      score += 30;
    }

    if (item.tags) {
      for (const tag of item.tags) {
        if (!tag) continue;
        const normTag = normalizeText(tag);
        if (normTag === normalizedQuery) {
          score += 80;
        } else if (normTag.includes(normalizedQuery)) {
          score += 25;
        }
      }
    }

    if (score > 0) {
      scored.push({ item, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);

  return scored.map((s) => s.item).slice(0, 20);
}
