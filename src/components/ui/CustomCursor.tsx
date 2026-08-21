import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isOverInput, setIsOverInput] = useState(false);

  useEffect(() => {
    // Only on fine pointer
    if (!window.matchMedia('(pointer: fine)').matches) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"]') !== null;
      const isInput = target.closest('input, textarea, select') !== null;
      setIsHovering(isInteractive);
      setIsOverInput(isInput);
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot && ring) {
        // Dot follows exactly
        dot.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`;

        if (!reducedMotion) {
          // Ring lerps — 0.42 = very snappy, tracks cursor closely
          ringPosRef.current.x = lerp(ringPosRef.current.x, posRef.current.x, 0.42);
          ringPosRef.current.y = lerp(ringPosRef.current.y, posRef.current.y, 0.42);
        } else {
          ringPosRef.current = { ...posRef.current };
        }
        ring.style.transform = `translate(${ringPosRef.current.x - 16}px, ${ringPosRef.current.y - 16}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  if (!isVisible) return null;

  return (
    <>
      {/* Add global cursor:none via style tag */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full transition-all duration-150"
        style={{
          width: isHovering ? 4 : 8,
          height: isHovering ? 4 : 8,
          background: '#FF6B6B',
          opacity: isOverInput ? 0 : 1,
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full transition-all duration-200"
        style={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          border: '1.5px solid rgba(255, 107, 107, 0.5)',
          opacity: isOverInput ? 0 : 0.8,
          marginLeft: isHovering ? -8 : 0,
          marginTop: isHovering ? -8 : 0,
        }}
      />
    </>
  );
}
