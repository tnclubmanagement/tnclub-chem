export type SearchCategory = 'all' | 'element' | 'molecule' | 'lab' | 'lesson' | 'nav';

export interface SearchableItem {
  id: string;
  title: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  category: SearchCategory;
  tags: string[];
  icon?: string;
  badge?: string;
  accentColor?: string;
  onSelect: () => void;
}
