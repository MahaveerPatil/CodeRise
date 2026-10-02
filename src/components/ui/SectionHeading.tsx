import { useEffect, useRef } from 'react';
import { cn } from '../../utils/cn';

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function parseTitle(title: string, addUnderline: boolean): React.ReactNode[] {
  const parts = title.split(/(\[.*?\])/g);
  return parts.map((part, i) => {
    if (part.startsWith('[') && part.endsWith(']')) {
      const text = part.slice(1, -1);
      return (
        <span
          key={i}
          className={cn('gradient-text', addUnderline && 'gradient-underline in-view')}
        >
          {text}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  size = 'md',
  className,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasGradient = /\[.*?\]/.test(title);

  // Trigger gradient underline when heading scrolls into view
  useEffect(() => {
    if (!hasGradient || !ref.current) return;
    const spans = ref.current.querySelectorAll<HTMLSpanElement>('.gradient-underline');
    if (!spans.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            spans.forEach((s) => s.classList.add('in-view'));
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasGradient]);

  const alignClass = {
    left:   'text-left  items-start',
    center: 'text-center items-center',
    right:  'text-right  items-end',
  }[align];

  const titleSize = {
    sm: 'text-3xl md:text-4xl',
    md: 'text-4xl md:text-5xl',
    lg: 'text-5xl md:text-6xl',
  }[size];

  return (
    <div ref={ref} className={cn('flex flex-col gap-4', alignClass, className)}>
      {label && (
        <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-widest uppercase text-brand-primary">
          <span className="w-6 h-px bg-brand-primary" aria-hidden="true" />
          {label}
          <span className="w-6 h-px bg-brand-primary" aria-hidden="true" />
        </span>
      )}
      <h2 className={cn('font-display font-bold text-text-primary leading-tight', titleSize)}>
        {parseTitle(title, hasGradient)}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
