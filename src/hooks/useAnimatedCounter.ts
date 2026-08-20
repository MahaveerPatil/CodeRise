import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

type EasingFn = (t: number) => number;

const easings: Record<string, EasingFn> = {
  easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
  easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
  linear: (t) => t,
};

interface UseAnimatedCounterOptions {
  end: number;
  duration?: number;
  easing?: keyof typeof easings;
  inView?: boolean;
}

export function useAnimatedCounter({
  end,
  duration = 2000,
  easing = 'easeOutQuart',
  inView = false,
}: UseAnimatedCounterOptions): number {
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const easingFn = easings[easing] ?? easings.easeOutQuart;

  useEffect(() => {
    if (!inView) return;

    // Immediately return final value for reduced motion
    if (reducedMotion) {
      setValue(end);
      return;
    }

    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.round(easingFn(progress) * end));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, end, duration, reducedMotion, easingFn]);

  return value;
}
