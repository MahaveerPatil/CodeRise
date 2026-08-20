import { cn } from '../../utils/cn';

interface DividerProps {
  className?: string;
  label?: string;
}

export function Divider({ className, label }: DividerProps) {
  if (label) {
    return (
      <div className={cn('flex items-center gap-4 my-8', className)}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-border-subtle" />
        <span className="text-xs font-mono font-medium text-text-muted uppercase tracking-widest">{label}</span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-border-subtle" />
      </div>
    );
  }

  return (
    <div
      className={cn('my-8 h-px w-full bg-gradient-to-r from-transparent via-border-default to-transparent', className)}
      role="separator"
      aria-hidden="true"
    />
  );
}
