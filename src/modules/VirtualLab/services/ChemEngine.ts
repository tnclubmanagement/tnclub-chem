import { type Chemical } from '../data/chemicals';
import { type Reaction, type VisualEffectType } from '../data/reactions';
import { getIonsFromFormula } from '../utils/formulaParser';
import { SOLUBILITY_TABLE, METAL_REACTIVITY_SERIES } from '../data/ions';
import { balanceEquation } from '../utils/equationBalancer';

// Hàm tạo Chemical giả lập cho sản phẩm nếu chưa có trong DB
const createProduct = (formula: string, state: 'solid' | 'aqueous' | 'liquid' | 'gas'): Chemical => {
  return {
    id: formula.toLowerCase(),
    name: formula,
    formula: formula,
    state: state,
    colorTheme: state === 'solid' ? 'white' : 'colorless',
    colorHex: state === 'solid' ? '#ffffff' : '#e0f7fa',
    group: 'other',
    application: 'Sản phẩm của phản ứng hóa học.'
  };
};

// Hàm ghép Cation và Anion thành công thức phân tử đúng hóa trị
const combineIons = (cationSymbol: string, anionSymbol: string): string => {
  // Extract charge from symbol, e.g. "Cu2+" -> 2, "Cl-" -> 1
  let cCharge = 1;
  const cMatch = cationSymbol.match(/[0-9]+/);
  if (cMatch) cCharge = parseInt(cMatch[0]);

  let aCharge = 1;
  const aMatch = anionSymbol.match(/[0-9]+/);
  if (aMatch) aCharge = parseInt(aMatch[0]);

  // Simplify ratio
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(cCharge, aCharge);
  const cCount = aCharge / divisor;
  const aCount = cCharge / divisor;

  // Build string
  let cBase = cationSymbol.replace(/[0-9]*\+/, '');
  let aBase = anionSymbol.replace(/_[0-9]*-|-/, '');

  let res = cBase + (cCount > 1 ? cCount.toString() : '');
  
  if (aCount > 1) {
    // If anion is polyatomic (contains multiple caps or number), wrap in ()
    if (/[A-Z].*[A-Z]|[0-9]/.test(aBase)) {
      res += `(${aBase})${aCount}`;
    } else {
      res += `${aBase}${aCount}`;
    }
  } else {
    res += aBase;
  }

  return res;
};

export const ChemEngine = {
  predictReaction: (reactants: Chemical[]): Reaction | null => {
    if (reactants.length !== 2) return null; // Hiện tại hỗ trợ phản ứng 2 chất

    const [c1, c2] = reactants;
    
    // 1. Kiểm tra Kim loại + Nước (vd: Na + H2O)
    const isWater = (c: Chemical) => c.formula === 'H₂O' || c.formula === 'H2O';
    const isAlkaliMetal = (c: Chemical) => METAL_REACTIVITY_SERIES.slice(0, 3).includes(c.formula); // K, Na, Ca
    
    // Chuẩn hóa formula cho balancer (tránh Unicode subscripts)
    const cleanF = (f: string) => f.replace(/[₂₃₄]/g, m => ({'₂':'2', '₃':'3', '₄':'4'}[m]!));

    if ((isAlkaliMetal(c1) && isWater(c2)) || (isAlkaliMetal(c2) && isWater(c1))) {
      const metal = isAlkaliMetal(c1) ? c1 : c2;
      const baseFormula = combineIons(metal.formula + (metal.formula === 'Ca' ? '2+' : '+'), 'OH-');
      const base = createProduct(baseFormula, 'aqueous');
      const h2 = createProduct('H2', 'gas');
      
      return {
        id: `react_${c1.id}_${c2.id}`,
        reactants: [c1, c2],
        products: [base, h2],
        equationHTML: balanceEquation([metal.formula, 'H2O'], [baseFormula, 'H2']),
        effect: 'explosion',
        description: `${metal.name} phản ứng mãnh liệt với nước tạo ra dung dịch bazơ và giải phóng khí hiđro.`
      };
    }

    // 1.2. Mixing with Water (Dissolution / Dilution)
    // Na and K react with water, which is handled above. Other things just dissolve or dilute (simplified).
    if (isWater(c1) || isWater(c2)) {
      const substance = isWater(c1) ? c2 : c1;

      // Ignore metals that don't react with water for now (like Fe, Cu, Ag)
      if (['salt', 'acid', 'base'].includes(substance.group)) {
        const action = substance.state === 'solid' ? 'Hòa tan' : 'Pha loãng';
        const newProduct: Chemical = {
          ...substance,
          id: `${substance.id}_aq`,
          state: 'aqueous',
          colorTheme: substance.colorTheme === 'white' ? 'colorless' : substance.colorTheme,
          colorHex: substance.colorHex === '#ffffff' ? '#e0f7fa' : substance.colorHex,
        };
        
        return {
          id: `dilute_${c1.id}_${c2.id}`,
          reactants: [c1, c2],
          products: [newProduct],
          equationHTML: `${substance.formula} + H₂O &rarr; Dung dịch ${substance.formula}`,
          effect: 'none',
          description: `${action} ${substance.name} bằng nước cất.`
        };
      } else if (substance.group === 'metal') {
        // Unreactive metals with water
        return null;
      }
    }

    // 1.5. Kim loại + Axit (vd: Mg + HCl)
    const isAcid = (c: Chemical) => c.formula.startsWith('H') && !isWater(c) && c.formula !== 'H₂';
    const isMetal = (c: Chemical) => METAL_REACTIVITY_SERIES.includes(c.formula);
    const isReactiveMetal = (c: Chemical) => {
      const idx = METAL_REACTIVITY_SERIES.indexOf(c.formula);
      const hIdx = METAL_REACTIVITY_SERIES.indexOf('H');
      return idx !== -1 && idx < hIdx;
    };

    if ((isMetal(c1) && isAcid(c2)) || (isMetal(c2) && isAcid(c1))) {
      const metal = isMetal(c1) ? c1 : c2;
      const acid = isMetal(c1) ? c2 : c1;
      
      if (isReactiveMetal(metal)) {
        const ionAcid = getIonsFromFormula(acid.formula);
        if (ionAcid && ionAcid.anion) {
          let mCharge = '2+'; // Mg, Zn, Fe, Ca, Ba
          if (['K', 'Na', 'Ag'].includes(metal.formula)) mCharge = '+';
          if (metal.formula === 'Al') mCharge = '3+';
          
          const saltFormula = combineIons(metal.formula + mCharge, ionAcid.anion);
          const salt = createProduct(saltFormula, 'aqueous');
          const h2 = createProduct('H2', 'gas');
          
          return {
            id: `react_${c1.id}_${c2.id}`,
            reactants: [c1, c2],
            products: [salt, h2],
            equationHTML: balanceEquation([metal.formula, cleanF(acid.formula)], [saltFormula, 'H2']),
            effect: 'explosion', // Sủi bọt khí mạnh mẽ
            description: `${metal.name} tan trong axit giải phóng khí hiđro.`
          };
        }
      }
    }

    const ion1 = getIonsFromFormula(c1.formula);
    const ion2 = getIonsFromFormula(c2.formula);

    if (!ion1 || !ion2) return null; // Không phân tích được ion

    // 2. Phản ứng trao đổi: Cation 1 ghép Anion 2 và ngược lại
    const newProduct1 = { cation: ion1.cation, anion: ion2.anion };
    const newProduct2 = { cation: ion2.cation, anion: ion1.anion };

    const sol1 = SOLUBILITY_TABLE[newProduct1.cation]?.[newProduct1.anion] || 'S';
    const sol2 = SOLUBILITY_TABLE[newProduct2.cation]?.[newProduct2.anion] || 'S';

    // Điều kiện phản ứng trao đổi: Tạo ra chất kết tủa (I) hoặc chất khí/nước (như H+ và OH- tạo S)
    const isAcidBase = (newProduct1.cation === 'H+' && newProduct1.anion === 'OH-') || 
                       (newProduct2.cation === 'H+' && newProduct2.anion === 'OH-');
                       
    const hasPrecipitate = sol1 === 'I' || sol2 === 'I';
    
    if (isAcidBase || hasPrecipitate) {
      const p1Formula = newProduct1.cation === 'H+' && newProduct1.anion === 'OH-' ? 'H2O' : combineIons(newProduct1.cation, newProduct1.anion);
      const p2Formula = newProduct2.cation === 'H+' && newProduct2.anion === 'OH-' ? 'H2O' : combineIons(newProduct2.cation, newProduct2.anion);
      
      const state1 = newProduct1.cation === 'H+' && newProduct1.anion === 'OH-' ? 'liquid' : (sol1 === 'I' ? 'solid' : 'aqueous');
      const state2 = newProduct2.cation === 'H+' && newProduct2.anion === 'OH-' ? 'liquid' : (sol2 === 'I' ? 'solid' : 'aqueous');
      
      const p1 = createProduct(p1Formula, state1);
      const p2 = createProduct(p2Formula, state2);

      // Setup effect
      let effect: VisualEffectType = isAcidBase ? 'color_change_pink' : 'precipitation_white';
      
      // Heuristic color for precipitate
      if (hasPrecipitate) {
        if (newProduct1.cation === 'Cu2+' || newProduct2.cation === 'Cu2+') {
          effect = 'precipitation_blue';
          if (p1.state === 'solid') p1.colorHex = '#2563eb';
          if (p2.state === 'solid') p2.colorHex = '#2563eb';
        }
      }

      // Chuẩn hóa formula cho balancer (tránh Unicode subscripts)
      const cleanF = (f: string) => f.replace(/[₂₃₄]/g, m => ({'₂':'2', '₃':'3', '₄':'4'}[m]!));

      return {
        id: `react_${c1.id}_${c2.id}`,
        reactants: [c1, c2],
        products: [p1, p2],
        equationHTML: balanceEquation([cleanF(c1.formula), cleanF(c2.formula)], [p1Formula, p2Formula]),
        effect,
        description: isAcidBase ? 'Phản ứng trung hòa tạo muối và nước.' : 'Phản ứng tạo kết tủa.'
      };
    }

    return null;
  }
};
