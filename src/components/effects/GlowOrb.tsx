import { cn } from '../../utils/cn';

interface GlowOrbProps {
  color?: string;
  size?: number;    // px
  opacity?: number; // 0-1
  className?: string;
}

export function GlowOrb({
  color = '#6366F1',
  size = 600,
  opacity = 0.15,
  className,
}: GlowOrbProps) {
  return (
    <div
      className={cn('absolute rounded-full pointer-events-none', className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
        opacity,
        filter: 'blur(80px)',
        transform: 'translate(-50%, -50%)',
      }}
      aria-hidden="true"
    />
  );
}
