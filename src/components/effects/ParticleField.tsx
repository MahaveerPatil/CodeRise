import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

const COLORS = ['#FF6B6B', '#FF8E53', '#FFD93D'];
const CONNECTION_DISTANCE = 120;
const REPULSION_DISTANCE = 150;

function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function createParticles(count: number, w: number, h: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: rand(0.2, 0.8) * (Math.random() > 0.5 ? 1 : -1),
    vy: rand(0.2, 0.8) * (Math.random() > 0.5 ? 1 : -1),
    size: rand(1, 3),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const mouseRef = useRef({ x: -999, y: -999 });
  const isCoarsePointer =
    typeof window !== 'undefined'
      ? window.matchMedia('(pointer: coarse)').matches
      : true;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const isMobile = canvas.width < 640;
      particles = createParticles(isMobile ? 40 : 80, canvas.width, canvas.height);
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Update positions and draw particles
      particles.forEach((p) => {
        if (!reducedMotion) {
          // Mouse repulsion (fine pointer only)
          if (!isCoarsePointer) {
            const dx = p.x - mouseRef.current.x;
            const dy = p.y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < REPULSION_DISTANCE && dist > 0) {
              const force = (REPULSION_DISTANCE - dist) / REPULSION_DISTANCE;
              p.vx += (dx / dist) * force * 0.5;
              p.vy += (dy / dist) * force * 0.5;
              // Speed cap
              const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
              if (speed > 2) {
                p.vx = (p.vx / speed) * 2;
                p.vy = (p.vy / speed) * 2;
              }
            }
          }
          p.x += p.vx;
          p.y += p.vy;
          // Wrap edges
          if (p.x < 0) p.x += w;
          if (p.x > w) p.x -= w;
          if (p.y < 0) p.y += h;
          if (p.y > h) p.y -= h;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist <= CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.4;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 107, 107, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      draw();
      if (!reducedMotion) animId = requestAnimationFrame(loop);
    };

    // Mouse tracking (fine pointer only)
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    resize();
    window.addEventListener('resize', resize);
    if (!isCoarsePointer) canvas.addEventListener('mousemove', handleMouseMove);
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      if (!isCoarsePointer) canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [reducedMotion, isCoarsePointer]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    />
  );
}

// Default export for React.lazy
export default ParticleField;
