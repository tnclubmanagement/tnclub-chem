export interface Atom {
  id: string;
  symbol: string;
  position: [number, number, number]; // [x, y, z]
}

export interface Bond {
  source: string; // atom id
  target: string; // atom id
  type: number; // 1: single, 2: double, 3: triple
}

export interface Molecule {
  id: string;
  name: string;
  nameVi?: string;
  formula: string;
  category?: string;
  molarMass?: number;
  geometry?: string;
  description?: string;
  applications?: string[];
  atoms: Atom[];
  bonds: Bond[];
}

// Pure function to get CPK color
export const getElementColor = (symbol: string): string => {
  const cpkColors: Record<string, string> = {
    H: '#FFFFFF', // White
    C: '#222222', // Dark Grey/Black
    N: '#3050F8', // Blue
    O: '#FF0D0D', // Red
    F: '#90E050', // Light Green
    Cl: '#1FF01F', // Green
    Br: '#A62929', // Dark Red
    I: '#940094', // Dark Violet
    P: '#FF8000', // Orange
    S: '#FFFF30', // Yellow
    // Default fallback
    DEFAULT: '#E06633'
  };

  return cpkColors[symbol] || cpkColors['DEFAULT'];
};

// Pure function to get element radius (in Angstroms, roughly scaled for visuals)
export const getElementRadius = (symbol: string): number => {
  const radii: Record<string, number> = {
    H: 0.3,
    C: 0.77,
    N: 0.75,
    O: 0.73,
    F: 0.71,
    Cl: 0.99,
    Br: 1.14,
    I: 1.33,
    P: 1.10,
    S: 1.02,
    DEFAULT: 0.8
  };
  
  return radii[symbol] || radii['DEFAULT'];
};
