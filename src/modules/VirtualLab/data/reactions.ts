import { CHEMICALS, type Chemical } from './chemicals';

export type VisualEffectType = 'explosion' | 'gas_bubbles' | 'precipitation_white' | 'precipitation_blue' | 'color_change_blue' | 'color_change_pink' | 'none';

export interface Reaction {
  id: string;
  reactants: Chemical[];
  products: Chemical[];
  equationHTML: string;
  effect: VisualEffectType;
  description: string;
}

export const REACTIONS: Reaction[] = [
  {
    id: 'na_h2o',
    reactants: [CHEMICALS.na, CHEMICALS.h2o],
    products: [CHEMICALS.naoh, CHEMICALS.h2],
    equationHTML: '2Na + 2H₂O &rarr; 2NaOH + H₂&uarr;',
    effect: 'explosion',
    description: 'Natri phản ứng mãnh liệt với nước tạo ra dung dịch bazơ và giải phóng khí hiđro. Phản ứng tỏa nhiều nhiệt, có thể gây nổ.'
  },
  {
    id: 'cuso4_naoh',
    reactants: [CHEMICALS.cuso4, CHEMICALS.naoh],
    products: [CHEMICALS.cu_oh_2, CHEMICALS.na2so4], // Note: we need to handle na2so4 if we want, or just return the main precipitate.
    equationHTML: 'CuSO₄ + 2NaOH &rarr; Cu(OH)₂&darr; + Na₂SO₄',
    effect: 'precipitation_blue',
    description: 'Tạo thành kết tủa màu xanh lam đặc trưng của Đồng(II) hiđroxit.'
  },
  {
    id: 'agno3_nacl',
    reactants: [CHEMICALS.agno3, CHEMICALS.nacl],
    products: [CHEMICALS.agcl, CHEMICALS.nano3],
    equationHTML: 'AgNO₃ + NaCl &rarr; AgCl&darr; + NaNO₃',
    effect: 'precipitation_white',
    description: 'Tạo thành kết tủa trắng Bạc clorua ngay lập tức.'
  },
  {
    id: 'naoh_hcl',
    reactants: [CHEMICALS.naoh, CHEMICALS.hcl],
    products: [CHEMICALS.nacl, CHEMICALS.h2o],
    equationHTML: 'NaOH + HCl &rarr; NaCl + H₂O',
    effect: 'color_change_pink', // We can pretend phenolphthalein was there and it goes colorless, or just a simple mix.
    description: 'Phản ứng trung hòa tạo muối và nước.'
  }
];

// Helper to find reaction based on 2 inputs
export const findReaction = (c1: string, c2: string): Reaction | null => {
  return REACTIONS.find(
    r => (r.reactants[0].id === c1 && r.reactants[1].id === c2) || 
         (r.reactants[0].id === c2 && r.reactants[1].id === c1)
  ) || null;
};
