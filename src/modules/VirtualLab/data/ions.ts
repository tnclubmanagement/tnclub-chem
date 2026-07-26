// Danh sách các Cation phổ biến
export const CATIONS = {
  H: { symbol: 'H+', charge: 1, name: 'Hydrogen' },
  Na: { symbol: 'Na+', charge: 1, name: 'Sodium' },
  K: { symbol: 'K+', charge: 1, name: 'Potassium' },
  Ag: { symbol: 'Ag+', charge: 1, name: 'Silver' },
  Cu: { symbol: 'Cu2+', charge: 2, name: 'Copper(II)' },
  Ca: { symbol: 'Ca2+', charge: 2, name: 'Calcium' },
  Ba: { symbol: 'Ba2+', charge: 2, name: 'Barium' },
  Mg: { symbol: 'Mg2+', charge: 2, name: 'Magnesium' },
  Zn: { symbol: 'Zn2+', charge: 2, name: 'Zinc' },
  Fe2: { symbol: 'Fe2+', charge: 2, name: 'Iron(II)' },
  Fe3: { symbol: 'Fe3+', charge: 3, name: 'Iron(III)' },
  Al: { symbol: 'Al3+', charge: 3, name: 'Aluminum' },
  NH4: { symbol: 'NH4+', charge: 1, name: 'Ammonium' }
};

// Danh sách các Anion phổ biến
export const ANIONS = {
  OH: { symbol: 'OH-', charge: -1, name: 'Hydroxide' },
  Cl: { symbol: 'Cl-', charge: -1, name: 'Chloride' },
  Br: { symbol: 'Br-', charge: -1, name: 'Bromide' },
  I: { symbol: 'I-', charge: -1, name: 'Iodide' },
  NO3: { symbol: 'NO3-', charge: -1, name: 'Nitrate' },
  SO4: { symbol: 'SO4_2-', charge: -2, name: 'Sulfate' },
  CO3: { symbol: 'CO3_2-', charge: -2, name: 'Carbonate' },
  PO4: { symbol: 'PO4_3-', charge: -3, name: 'Phosphate' },
  S: { symbol: 'S2-', charge: -2, name: 'Sulfide' }
};

export type SolubilityStatus = 'S' | 'I' | 'SS' | 'D'; // S: Soluble, I: Insoluble (Precipitate), SS: Slightly Soluble, D: Decomposes

// Bảng tính tan dạng Ma trận
// Mảng Cation -> Anion
export const SOLUBILITY_TABLE: Record<string, Record<string, SolubilityStatus>> = {
  'H+': { 'OH-': 'S', 'Cl-': 'S', 'NO3-': 'S', 'SO4_2-': 'S', 'CO3_2-': 'S', 'PO4_3-': 'S', 'S2-': 'S' }, // H2O is soluble/liquid. Acids are soluble.
  'Na+': { 'OH-': 'S', 'Cl-': 'S', 'NO3-': 'S', 'SO4_2-': 'S', 'CO3_2-': 'S', 'PO4_3-': 'S', 'S2-': 'S' },
  'K+': { 'OH-': 'S', 'Cl-': 'S', 'NO3-': 'S', 'SO4_2-': 'S', 'CO3_2-': 'S', 'PO4_3-': 'S', 'S2-': 'S' },
  'NH4+': { 'OH-': 'S', 'Cl-': 'S', 'NO3-': 'S', 'SO4_2-': 'S', 'CO3_2-': 'S', 'PO4_3-': 'S', 'S2-': 'S' },
  'Ag+': { 'OH-': 'I', 'Cl-': 'I', 'NO3-': 'S', 'SO4_2-': 'SS', 'CO3_2-': 'I', 'PO4_3-': 'I', 'S2-': 'I' }, // AgOH phân hủy thành Ag2O kết tủa
  'Cu2+': { 'OH-': 'I', 'Cl-': 'S', 'NO3-': 'S', 'SO4_2-': 'S', 'CO3_2-': 'I', 'PO4_3-': 'I', 'S2-': 'I' },
  'Ca2+': { 'OH-': 'SS', 'Cl-': 'S', 'NO3-': 'S', 'SO4_2-': 'SS', 'CO3_2-': 'I', 'PO4_3-': 'I', 'S2-': 'I' },
  'Ba2+': { 'OH-': 'S', 'Cl-': 'S', 'NO3-': 'S', 'SO4_2-': 'I', 'CO3_2-': 'I', 'PO4_3-': 'I', 'S2-': 'S' },
  'Mg2+': { 'OH-': 'I', 'Cl-': 'S', 'NO3-': 'S', 'SO4_2-': 'S', 'CO3_2-': 'I', 'PO4_3-': 'I', 'S2-': 'D' },
  'Zn2+': { 'OH-': 'I', 'Cl-': 'S', 'NO3-': 'S', 'SO4_2-': 'S', 'CO3_2-': 'I', 'PO4_3-': 'I', 'S2-': 'I' },
  'Fe2+': { 'OH-': 'I', 'Cl-': 'S', 'NO3-': 'S', 'SO4_2-': 'S', 'CO3_2-': 'I', 'PO4_3-': 'I', 'S2-': 'I' },
  'Fe3+': { 'OH-': 'I', 'Cl-': 'S', 'NO3-': 'S', 'SO4_2-': 'S', 'CO3_2-': 'D', 'PO4_3-': 'I', 'S2-': 'D' },
  'Al3+': { 'OH-': 'I', 'Cl-': 'S', 'NO3-': 'S', 'SO4_2-': 'S', 'CO3_2-': 'D', 'PO4_3-': 'I', 'S2-': 'D' },
};

// Dãy hoạt động hóa học của kim loại
// K, Na, Ca, Mg, Al, Zn, Fe, Ni, Sn, Pb, H, Cu, Hg, Ag, Pt, Au
export const METAL_REACTIVITY_SERIES = [
  'K', 'Na', 'Ca', 'Mg', 'Al', 'Zn', 'Fe', 'Ni', 'Sn', 'Pb', 'H', 'Cu', 'Hg', 'Ag', 'Pt', 'Au'
];

export const isMoreReactive = (metalA: string, metalB: string) => {
  const indexA = METAL_REACTIVITY_SERIES.indexOf(metalA);
  const indexB = METAL_REACTIVITY_SERIES.indexOf(metalB);
  if (indexA === -1 || indexB === -1) return false;
  return indexA < indexB;
};
