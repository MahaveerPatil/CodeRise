import { cn } from '../../utils/cn';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AnimatedGridProps {
  className?: string;
  opacity?: number;
}

export function AnimatedGrid({ className, opacity = 0.15 }: AnimatedGridProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
      aria-hidden="true"
    >
      <svg
        className={cn('w-full h-full', !reducedMotion && 'animate-grid-drift')}
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
      >
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#DC2626" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}
