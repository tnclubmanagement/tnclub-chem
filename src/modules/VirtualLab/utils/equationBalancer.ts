import { parseFormula } from './formulaParser';

/**
 * Trả về chuỗi HTML phương trình đã cân bằng.
 * VD: ['NaOH', 'H2SO4'], ['Na2SO4', 'H2O'] -> '2NaOH + H₂SO₄ &rarr; Na₂SO₄ + 2H₂O'
 */
export const balanceEquation = (reactants: string[], products: string[]): string => {
  const parsedReactants = reactants.map(parseFormula);
  const parsedProducts = products.map(parseFormula);
  
  // Lấy tập hợp tất cả các nguyên tố có mặt
  const allElements = new Set<string>();
  parsedReactants.forEach(p => Object.keys(p).forEach(e => allElements.add(e)));
  
  const elements = Array.from(allElements);
  
  const maxCoef = 8; // Brute-force lên tới hệ số 8 (đủ cho hầu hết phản ứng cơ bản)
  const numReactants = reactants.length;
  const numProducts = products.length;
  
  // Hàm đệ quy sinh ra các tổ hợp hệ số
  const findCoefficients = (): number[] | null => {
    const totalMolecules = numReactants + numProducts;
    const coeffs = new Array(totalMolecules).fill(1);
    
    // Đếm số lượng cấu hình đã thử (giới hạn an toàn)
    let tries = 0;
    
    // Khởi tạo thuật toán sinh tổ hợp đếm cơ số maxCoef
    const checkBalanced = (c: number[]) => {
      for (const el of elements) {
        let leftSum = 0;
        let rightSum = 0;
        
        for (let i = 0; i < numReactants; i++) {
          leftSum += (parsedReactants[i][el] || 0) * c[i];
        }
        for (let i = 0; i < numProducts; i++) {
          rightSum += (parsedProducts[i][el] || 0) * c[numReactants + i];
        }
        
        if (leftSum !== rightSum) return false;
      }
      return true;
    };

    const advance = (c: number[]) => {
      let i = totalMolecules - 1;
      while (i >= 0) {
        c[i]++;
        if (c[i] <= maxCoef) return true;
        c[i] = 1;
        i--;
      }
      return false; // Đã thử hết
    };

    do {
      tries++;
      if (checkBalanced(coeffs)) {
        return [...coeffs];
      }
    } while (advance(coeffs) && tries < 100000); // Ngăn loop vô hạn
    
    return null;
  };
  
  const coeffs = findCoefficients();
  
  // Format thành chuỗi HTML
  const formatPart = (formulas: string[], startIdx: number) => {
    return formulas.map((f, i) => {
      const c = coeffs ? coeffs[startIdx + i] : 1;
      return (c > 1 ? c : '') + formatSubscripts(f);
    }).join(' + ');
  };
  
  const left = formatPart(reactants, 0);
  const right = formatPart(products, numReactants);
  
  // Tùy chọn: Thêm mũi tên kết tủa/bay hơi nếu cần
  return `${left} &rarr; ${right}`;
};

// Hàm phụ chuyển số thường thành chỉ số dưới (subscript)
const formatSubscripts = (formula: string) => {
  const subscriptMap: Record<string, string> = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
    '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉'
  };
  return formula.replace(/[0-9]/g, m => subscriptMap[m]);
};
