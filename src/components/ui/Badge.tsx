import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'glow';
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono font-medium',
        variant === 'default' && 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20',
        variant === 'outline' && 'bg-transparent text-text-secondary border border-border-subtle',
        variant === 'glow' && 'bg-brand-primary/15 text-brand-primary border border-brand-primary/30 shadow-glow',
        className
      )}
    >
      {children}
    </span>
  );
}
