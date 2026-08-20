import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  glowColor?: string;
  /** Renders the card as a different HTML element (ignored — always motion.div, use role for semantics) */
  as?: React.ElementType;
  // Accessibility & interaction props forwarded to the underlying motion.div
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
  glowColor = 'rgba(99,102,241,0.15)',
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
  return (
    <motion.div
      whileHover={hoverable ? { y: -4 } : undefined}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        'relative rounded-card overflow-hidden',
        'bg-bg-card border border-border-subtle',
        'backdrop-blur-md',
        // Top edge highlight
        'before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-brand-primary/40 before:to-transparent',
        hoverable && 'hover:border-border-default hover:shadow-card-hover transition-shadow duration-300',
        className
      )}
      style={{ '--glow-color': glowColor } as React.CSSProperties}
      role={role}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
