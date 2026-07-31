import React, { useEffect, useRef } from 'react';
import styles from './FloatingElementsBackground.module.css';

interface ElementNode {
  number: number;
  symbol: string;
  name: string;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  pulse: number;
}

interface ShatterSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  decay: number;
}

const RAW_ELEMENTS = [
  { number: 1,  symbol: 'H',  name: 'Hydrogen',  color: '#ffffff' },
  { number: 2,  symbol: 'He', name: 'Helium',    color: '#00f7ff' },
  { number: 3,  symbol: 'Li', name: 'Lithium',   color: '#ff1adb' },
  { number: 6,  symbol: 'C',  name: 'Carbon',    color: '#8f00ff' },
  { number: 7,  symbol: 'N',  name: 'Nitrogen',  color: '#00d4ff' },
  { number: 8,  symbol: 'O',  name: 'Oxygen',    color: '#00ff80' },
  { number: 10, symbol: 'Ne', name: 'Neon',      color: '#ff0055' },
  { number: 11, symbol: 'Na', name: 'Sodium',    color: '#ffaf00' },
  { number: 26, symbol: 'Fe', name: 'Iron',      color: '#ff6b35' },
  { number: 29, symbol: 'Cu', name: 'Copper',    color: '#ff8c42' },
  { number: 47, symbol: 'Ag', name: 'Silver',    color: '#c0c0c0' },
  { number: 79, symbol: 'Au', name: 'Gold',      color: '#ffd700' },
];

export const FloatingElementsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize Element Nodes
    const nodes: ElementNode[] = RAW_ELEMENTS.map((el) => {
      const radius = 34 + Math.random() * 8;
      return {
        ...el,
        x: radius + Math.random() * (width - radius * 2),
        y: radius + Math.random() * (height - radius * 2),
        vx: (Math.random() - 0.5) * 1.8,
        vy: (Math.random() - 0.5) * 1.8,
        radius,
        mass: radius,
        pulse: 0,
      };
    });

    const sparks: ShatterSpark[] = [];

    // Spawn shatter explosion particles on collision
    const spawnShatterSparks = (x: number, y: number, color: string, count = 12) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 4.5;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          size: 2 + Math.random() * 4,
          alpha: 1.0,
          decay: 0.02 + Math.random() * 0.03,
        });
      }
    };

    // Elastic 2D Collision physics resolution
    const resolveCollision = (n1: ElementNode, n2: ElementNode) => {
      const dx = n2.x - n1.x;
      const dy = n2.y - n1.y;
      const dist = Math.hypot(dx, dy);
      const minDist = n1.radius + n2.radius;

      if (dist < minDist && dist > 0) {
        // Overlap correction
        const overlap = 0.5 * (minDist - dist);
        const nx = dx / dist;
        const ny = dy / dist;

        n1.x -= nx * overlap;
        n1.y -= ny * overlap;
        n2.x += nx * overlap;
        n2.y += ny * overlap;

        // Elastic momentum transfer
        const kx = n1.vx - n2.vx;
        const ky = n1.vy - n2.vy;
        const p = 2 * (nx * kx + ny * ky) / (n1.mass + n2.mass);

        n1.vx -= p * n2.mass * nx;
        n1.vy -= p * n2.mass * ny;
        n2.vx += p * n1.mass * nx;
        n2.vy += p * n1.mass * ny;

        // Visual bounce pulse & Shatter Sparks
        n1.pulse = 1.0;
        n2.pulse = 1.0;
        const collisionX = (n1.x + n2.x) / 2;
        const collisionY = (n1.y + n2.y) / 2;
        spawnShatterSparks(collisionX, collisionY, n1.color, 10);
        spawnShatterSparks(collisionX, collisionY, n2.color, 10);
      }
    };

    // Main 60fps Animation Loop
    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Update & Draw Shatter Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 2. Physics Update Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        // Wall collisions
        if (n.x - n.radius < 0) {
          n.x = n.radius;
          n.vx *= -1;
          spawnShatterSparks(n.x, n.y, n.color, 6);
        } else if (n.x + n.radius > width) {
          n.x = width - n.radius;
          n.vx *= -1;
          spawnShatterSparks(n.x, n.y, n.color, 6);
        }

        if (n.y - n.radius < 0) {
          n.y = n.radius;
          n.vy *= -1;
          spawnShatterSparks(n.x, n.y, n.color, 6);
        } else if (n.y + n.radius > height) {
          n.y = height - n.radius;
          n.vy *= -1;
          spawnShatterSparks(n.x, n.y, n.color, 6);
        }

        // Pulse decay
        if (n.pulse > 0) n.pulse -= 0.04;
        else n.pulse = 0;

        // Node-to-node collisions
        for (let j = i + 1; j < nodes.length; j++) {
          resolveCollision(n, nodes[j]);
        }
      }

      // 3. Draw Nodes (Crisp Element Badges)
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        ctx.save();
        ctx.translate(n.x, n.y);

        const pulseScale = 1 + n.pulse * 0.15;
        ctx.scale(pulseScale, pulseScale);

        // Glass Pill Container
        ctx.beginPath();
        ctx.arc(0, 0, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
        ctx.fill();

        ctx.lineWidth = n.pulse > 0 ? 2.5 : 1.2;
        ctx.strokeStyle = n.pulse > 0 ? '#ffffff' : `${n.color}60`;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = n.pulse > 0 ? 20 : 10;
        ctx.stroke();

        // Symbol Text
        ctx.font = 'bold 16px "JetBrains Mono", monospace';
        ctx.fillStyle = n.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(n.symbol, 0, -4);

        // Atomic number
        ctx.font = '500 10px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(200, 220, 255, 0.7)';
        ctx.fillText(`${n.number} • ${n.name}`, 0, 13);

        ctx.restore();
      }

      animFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.physicsCanvas} />;
};
