

export type ParsedFormula = Record<string, number>;

/**
 * Phân tích công thức hóa học thành số lượng nguyên tử.
 * VD: "Cu(OH)2" -> { Cu: 1, O: 2, H: 2 }
 */
export const parseFormula = (formula: string): ParsedFormula => {
  const stack: ParsedFormula[] = [{}];
  
  let i = 0;
  while (i < formula.length) {
    const char = formula[i];
    
    if (char === '(') {
      stack.push({});
      i++;
    } else if (char === ')') {
      i++;
      let countStr = '';
      while (i < formula.length && /[0-9]/.test(formula[i])) {
        countStr += formula[i];
        i++;
      }
      const count = countStr ? parseInt(countStr) : 1;
      const top = stack.pop()!;
      const current = stack[stack.length - 1];
      
      for (const [elem, q] of Object.entries(top)) {
        current[elem] = (current[elem] || 0) + q * count;
      }
    } else if (/[A-Z]/.test(char)) {
      let elem = char;
      i++;
      while (i < formula.length && /[a-z]/.test(formula[i])) {
        elem += formula[i];
        i++;
      }
      
      let countStr = '';
      // Support subscripts in normal numbers
      while (i < formula.length && /[0-9]/.test(formula[i])) {
        countStr += formula[i];
        i++;
      }
      // Support unicode subscripts like ₂ (used in our data like H₂O)
      const subscriptMap: Record<string, string> = {
        '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
        '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9'
      };
      while (i < formula.length && Object.keys(subscriptMap).includes(formula[i])) {
        countStr += subscriptMap[formula[i]];
        i++;
      }
      
      const count = countStr ? parseInt(countStr) : 1;
      const current = stack[stack.length - 1];
      current[elem] = (current[elem] || 0) + count;
    } else {
      // Ignore spaces or other unknown chars
      i++;
    }
  }
  
  return stack[0];
};

/**
 * Tách một hợp chất thành cation và anion dựa trên danh sách biết trước.
 * Hàm này dùng heuristics cơ bản dựa trên tên các gốc.
 * VD: "CuSO₄" -> { cation: 'Cu2+', anion: 'SO4_2-' }
 */
export const getIonsFromFormula = (formula: string): { cation: string, anion: string } | null => {
  // Normalize formula (convert subscripts to normal numbers for easier matching)
  const subscriptMap: Record<string, string> = {
    '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
    '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9'
  };
  let norm = '';
  for (const c of formula) {
    norm += subscriptMap[c] || c;
  }
  
  // Find anion from the end
  // Sort by length descending to match longest first (e.g. SO4_2- before S2-)
  // We actually need to match the text representation without charge.
  // Let's create a map of neutral text -> symbol
  const textToAnion: Record<string, string> = {
    'OH': 'OH-', 'Cl': 'Cl-', 'Br': 'Br-', 'I': 'I-',
    'NO3': 'NO3-', 'SO4': 'SO4_2-', 'CO3': 'CO3_2-', 'PO4': 'PO4_3-', 'S': 'S2-'
  };
  
  const textToCation: Record<string, string> = {
    'H': 'H+', 'Na': 'Na+', 'K': 'K+', 'Ag': 'Ag+', 'Cu': 'Cu2+',
    'Ca': 'Ca2+', 'Ba': 'Ba2+', 'Mg': 'Mg2+', 'Zn': 'Zn2+',
    'Fe': 'Fe3+', // simplified
    'Al': 'Al3+', 'NH4': 'NH4+'
  };

  const sortedCations = Object.keys(textToCation).sort((a, b) => b.length - a.length);
  const sortedAnions = Object.keys(textToAnion).sort((a, b) => b.length - a.length);

  let foundCationSymbol = '';
  for (const text of sortedCations) {
    if (norm.startsWith(text)) {
      foundCationSymbol = textToCation[text];
      break;
    }
  }

  if (!foundCationSymbol) return null;

  let foundAnionSymbol = '';
  for (const text of sortedAnions) {
    // Check if the remaining part contains the anion
    if (norm.includes(text)) {
      foundAnionSymbol = textToAnion[text];
      break;
    }
  }

  if (foundCationSymbol && foundAnionSymbol) {
    return { cation: foundCationSymbol, anion: foundAnionSymbol };
  }
  
  return null;
};
