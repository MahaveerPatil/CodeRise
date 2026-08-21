import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: -100, y: -100 });
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isOverInput, setIsOverInput] = useState(false);

  useEffect(() => {
    // Only on fine pointer (desktop)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      const target = e.target as HTMLElement;
      setIsHovering(target.closest('a, button, [role="button"]') !== null);
      setIsOverInput(target.closest('input, textarea, select') !== null);
    };

    const animate = () => {
      const el = cursorRef.current;
      if (el) {
        el.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
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
      <style>{`* { cursor: none !important; }`}</style>

      {/* Single sharp crosshair cursor */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          opacity: isOverInput ? 0 : 1,
          willChange: 'transform',
        }}
      >
        {/* Outer diamond shape */}
        <div
          style={{
            position: 'absolute',
            width: isHovering ? 28 : 20,
            height: isHovering ? 28 : 20,
            transform: `translate(-50%, -50%) rotate(45deg)`,
            border: `2px solid #FF6B6B`,
            borderRadius: '3px',
            opacity: isHovering ? 1 : 0.75,
            transition: 'width 0.12s ease, height 0.12s ease, opacity 0.12s ease',
          }}
        />
        {/* Inner dot */}
        <div
          style={{
            position: 'absolute',
            width: isHovering ? 5 : 4,
            height: isHovering ? 5 : 4,
            transform: 'translate(-50%, -50%)',
            background: '#FFD93D',
            borderRadius: '50%',
            transition: 'width 0.12s ease, height 0.12s ease',
          }}
        />
      </div>
    </>
  );
}
