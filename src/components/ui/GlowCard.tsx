import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  glowColor?: string;
  as?: React.ElementType;
  role?: string;
  'aria-label'?: string;
  tabIndex?: number;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function GlowCard({
  children,
  className,
  hoverable = true,
  glowColor = 'rgba(255,107,107,0.12)',
  as: _Tag = 'div',
  role,
  'aria-label': ariaLabel,
  tabIndex,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onClick,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse-tracking spotlight glow
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverable || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--spotlight-x', `${x}%`);
    cardRef.current.style.setProperty('--spotlight-y', `${y}%`);
    cardRef.current.style.setProperty('--spotlight-opacity', '1');
  }, [hoverable]);

  const handleMouseLeaveInternal = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      cardRef.current.style.setProperty('--spotlight-opacity', '0');
    }
    onMouseLeave?.(e);
  }, [onMouseLeave]);

  return (
    <motion.div
      ref={cardRef}
      whileHover={hoverable ? { y: -4 } : undefined}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        'relative rounded-card overflow-hidden',
        'bg-bg-card border border-border-subtle',
        'backdrop-blur-md',
        // Top edge highlight line
        'before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-brand-primary/40 before:to-transparent',
        // Mouse spotlight layer (after pseudo)
        'after:absolute after:inset-0 after:rounded-card after:pointer-events-none after:transition-opacity after:duration-300',
        hoverable && 'hover:border-border-default hover:shadow-card-hover transition-all duration-300',
        className
      )}
      style={{
        '--spotlight-x': '50%',
        '--spotlight-y': '50%',
        '--spotlight-opacity': '0',
      } as React.CSSProperties}
      // Inline style for the spotlight (can't use CSS var in Tailwind after:)
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeaveInternal}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      role={role}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
    >
      {/* Spotlight overlay */}
      {hoverable && (
        <div
          className="absolute inset-0 pointer-events-none rounded-card z-[1] transition-opacity duration-300"
          style={{
            background: `radial-gradient(280px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${glowColor}, transparent 70%)`,
            opacity: 'var(--spotlight-opacity, 0)' as unknown as number,
          }}
          aria-hidden="true"
        />
      )}
      {/* Content sits above spotlight */}
      <div className="relative z-[2]">
        {children}
      </div>
    </motion.div>
  );
}
