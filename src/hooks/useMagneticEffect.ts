import { useEffect, RefObject } from 'react';
import { useSpring, MotionValue } from 'framer-motion';

interface MagneticOptions {
  strength?: number; // default 0.3
  max?: number;      // default 12 (px)
}

interface MagneticResult {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

export function useMagneticEffect(
  ref: RefObject<HTMLElement | null>,
  options: MagneticOptions = {}
): MagneticResult {
  const { strength = 0.3, max = 12 } = options;

  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });

  useEffect(() => {
    // Disable on coarse pointer (touch) devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      // Clamp to max displacement
      const clampedX = Math.max(-max, Math.min(max, deltaX));
      const clampedY = Math.max(-max, Math.min(max, deltaY));

      x.set(clampedX);
      y.set(clampedY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, strength, max, x, y]);

  return { x, y };
}
