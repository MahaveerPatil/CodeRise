import { cn } from '../../utils/cn';

interface SectionHeadingProps {
  label?: string;        // Small overline label e.g. "WHAT WE BUILD"
  title: string;         // Main heading — wrap words in [...] for gradient
  subtitle?: string;     // Optional subtitle paragraph
  align?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Parses title string for [bracketed] text and renders it with gradient styling.
 * Example: "We Build [Technology] That Works" → "Technology" gets gradient class
 */
function parseTitle(title: string): React.ReactNode[] {
  const parts = title.split(/(\[.*?\])/g);
  return parts.map((part, i) => {
    if (part.startsWith('[') && part.endsWith(']')) {
      return (
        <span key={i} className="gradient-text">
          {part.slice(1, -1)}
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
  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[align];

  const titleSize = {
    sm: 'text-3xl md:text-4xl',
    md: 'text-4xl md:text-5xl',
    lg: 'text-5xl md:text-6xl',
  }[size];

  return (
    <div className={cn('flex flex-col gap-4', alignClass, className)}>
      {label && (
        <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-widest uppercase text-brand-primary">
          <span className="w-6 h-px bg-brand-primary" aria-hidden="true" />
          {label}
          <span className="w-6 h-px bg-brand-primary" aria-hidden="true" />
        </span>
      )}
      <h2
        className={cn(
          'font-display font-bold text-text-primary leading-tight',
          titleSize
        )}
      >
        {parseTitle(title)}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
