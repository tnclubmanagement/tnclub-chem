# Project: tnclub-chem

## Workspace Rules

### 1. Advanced JS/TS Coding Conventions (Strict)
This project enforces high-level programming techniques and strict quality standards:
- **Functional Programming:** Favor pure functions, immutability, and declarative code. Do not mutate state directly.
- **Strict Typing (TypeScript):** Use TypeScript exclusively. Ban the use of `any`. Define robust and strict interfaces/types for all chemical entities, props, and states.
- **Clean Code & SOLID Principles:**
  - **Single Responsibility Principle (SRP):** Each component or custom hook must have exactly one reason to change.
  - **DRY:** Extract reusable logic into pure utility functions or custom hooks.
  - **Early Returns:** Avoid deeply nested conditional logic. Use guard clauses to return early.
  - **Composition:** Prefer composition over inheritance.
- **Performance & Optimization:**
  - Extensively utilize `useMemo` and `useCallback` where appropriate to prevent unnecessary re-renders. This is absolutely critical when blending React with WebGL/Three.js.
  - Use lazy loading (`React.lazy`, `Suspense`) for heavy 3D models and routes.
- **Naming Conventions:**
  - Variables, functions, and hooks: `camelCase`.
  - React Components and Interfaces/Types: `PascalCase`.
  - Global Constants: `UPPER_SNAKE_CASE`.

### 2. Architecture Rules (UI vs 3D)
- **Separation of Concerns:** 3D Components (rendered within `<Canvas>` via React Three Fiber) MUST be completely decoupled from 2D DOM UI Components. 
- **State Management:** Use a modern global state manager (like Zustand) to bridge communication between the UI layer and the 3D layer cleanly.
- **Data Layer:** All data fetching, processing, and parsing (e.g., reading JSON for periodic table data or parsing PDB files) must be isolated in dedicated `/services` or `/utils` modules.

### 3. Design Aesthetics (Glassmorphism)
- All UI overlays must strictly follow the **Glassmorphism** aesthetic:
  - Semi-transparent backgrounds with background blur (`backdrop-filter: blur()`).
  - Subtle, translucent borders and soft inner shadows to create depth.
- The UI must float elegantly above the 3D canvas and feature micro-animations (e.g., via Framer Motion) for every interaction (hover, click, mount).
