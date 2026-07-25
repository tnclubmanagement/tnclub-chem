export function getElectronShells(z: number): number[] {
  const shells: number[] = [0, 0, 0, 0, 0, 0, 0];
  
  // Madelung rule (Aufbau principle) order of orbital filling
  const orbitals = [
    { shell: 0, cap: 2 },   // 1s
    { shell: 1, cap: 2 },   // 2s
    { shell: 1, cap: 6 },   // 2p
    { shell: 2, cap: 2 },   // 3s
    { shell: 2, cap: 6 },   // 3p
    { shell: 3, cap: 2 },   // 4s
    { shell: 2, cap: 10 },  // 3d
    { shell: 3, cap: 6 },   // 4p
    { shell: 4, cap: 2 },   // 5s
    { shell: 3, cap: 10 },  // 4d
    { shell: 4, cap: 6 },   // 5p
    { shell: 5, cap: 2 },   // 6s
    { shell: 3, cap: 14 },  // 4f
    { shell: 4, cap: 10 },  // 5d
    { shell: 5, cap: 6 },   // 6p
    { shell: 6, cap: 2 },   // 7s
    { shell: 4, cap: 14 },  // 5f
    { shell: 5, cap: 10 },  // 6d
    { shell: 6, cap: 6 }    // 7p
  ];

  let remaining = z;
  for (const orb of orbitals) {
    if (remaining <= 0) break;
    const add = Math.min(remaining, orb.cap);
    shells[orb.shell] += add;
    remaining -= add;
  }
  
  // Return only shells that have electrons
  return shells.filter(count => count > 0);
}
