import type { Molecule } from '../services/moleculeParser';

export const MOCK_MOLECULES: Molecule[] = [
  {
    id: 'h2o',
    name: 'Water',
    formula: 'H₂O',
    atoms: [
      { id: 'O1', symbol: 'O', position: [0, 0, 0] },
      { id: 'H1', symbol: 'H', position: [-0.75, -0.5, 0] },
      { id: 'H2', symbol: 'H', position: [0.75, -0.5, 0] },
    ],
    bonds: [
      { source: 'O1', target: 'H1', type: 1 },
      { source: 'O1', target: 'H2', type: 1 },
    ],
  },
  {
    id: 'co2',
    name: 'Carbon Dioxide',
    formula: 'CO₂',
    atoms: [
      { id: 'C1', symbol: 'C', position: [0, 0, 0] },
      { id: 'O1', symbol: 'O', position: [-1.16, 0, 0] },
      { id: 'O2', symbol: 'O', position: [1.16, 0, 0] },
    ],
    bonds: [
      { source: 'C1', target: 'O1', type: 2 },
      { source: 'C1', target: 'O2', type: 2 },
    ],
  },
  {
    id: 'ch4',
    name: 'Methane',
    formula: 'CH₄',
    atoms: [
      { id: 'C1', symbol: 'C', position: [0, 0, 0] },
      { id: 'H1', symbol: 'H', position: [0.63, 0.63, 0.63] },
      { id: 'H2', symbol: 'H', position: [-0.63, -0.63, 0.63] },
      { id: 'H3', symbol: 'H', position: [-0.63, 0.63, -0.63] },
      { id: 'H4', symbol: 'H', position: [0.63, -0.63, -0.63] },
    ],
    bonds: [
      { source: 'C1', target: 'H1', type: 1 },
      { source: 'C1', target: 'H2', type: 1 },
      { source: 'C1', target: 'H3', type: 1 },
      { source: 'C1', target: 'H4', type: 1 },
    ],
  },
  {
    id: 'benzene',
    name: 'Benzene',
    formula: 'C₆H₆',
    atoms: [
      { id: 'C1', symbol: 'C', position: [1.4, 0, 0] },
      { id: 'C2', symbol: 'C', position: [0.7, 1.21, 0] },
      { id: 'C3', symbol: 'C', position: [-0.7, 1.21, 0] },
      { id: 'C4', symbol: 'C', position: [-1.4, 0, 0] },
      { id: 'C5', symbol: 'C', position: [-0.7, -1.21, 0] },
      { id: 'C6', symbol: 'C', position: [0.7, -1.21, 0] },
      { id: 'H1', symbol: 'H', position: [2.48, 0, 0] },
      { id: 'H2', symbol: 'H', position: [1.24, 2.15, 0] },
      { id: 'H3', symbol: 'H', position: [-1.24, 2.15, 0] },
      { id: 'H4', symbol: 'H', position: [-2.48, 0, 0] },
      { id: 'H5', symbol: 'H', position: [-1.24, -2.15, 0] },
      { id: 'H6', symbol: 'H', position: [1.24, -2.15, 0] },
    ],
    bonds: [
      { source: 'C1', target: 'C2', type: 2 },
      { source: 'C2', target: 'C3', type: 1 },
      { source: 'C3', target: 'C4', type: 2 },
      { source: 'C4', target: 'C5', type: 1 },
      { source: 'C5', target: 'C6', type: 2 },
      { source: 'C6', target: 'C1', type: 1 },
      { source: 'C1', target: 'H1', type: 1 },
      { source: 'C2', target: 'H2', type: 1 },
      { source: 'C3', target: 'H3', type: 1 },
      { source: 'C4', target: 'H4', type: 1 },
      { source: 'C5', target: 'H5', type: 1 },
      { source: 'C6', target: 'H6', type: 1 },
    ],
  }
];
