import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useMagneticEffect } from '../../hooks/useMagneticEffect';

type ButtonVariant = 'primary' | 'ghost' | 'outline' | 'glow';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  loading?: boolean;
  magnetic?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary text-white shadow-glow hover:shadow-glow-strong hover:scale-[1.02] active:scale-[0.98]',
  ghost:
    'bg-transparent border border-border-default text-text-primary hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5',
  outline:
    'bg-transparent border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white',
  glow:
    'bg-brand-primary/10 border border-brand-primary/40 text-brand-primary hover:bg-brand-primary/20 hover:border-brand-primary shadow-glow',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm min-h-[44px]',
  md: 'px-6 py-3 text-base min-h-[44px]',
  lg: 'px-8 py-4 text-lg min-h-[44px]',
};

const Spinner = () => (
  <svg
    className="w-4 h-4 animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8H4z"
    />
  </svg>
);

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  loading = false,
  magnetic = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  target,
  rel,
  ...props
}: ButtonProps) {
  // Separate refs for button and anchor to avoid dual-type casting issues.
  const buttonRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);

  // Hook must always be called; pass strength=0 when magnetic is off so the
  // effect is inert. The hook itself already skips on coarse-pointer devices.
  const magneticStrength = magnetic ? 0.3 : 0;

  const { x: bx, y: by } = useMagneticEffect(
    buttonRef as React.RefObject<HTMLElement>,
    { strength: magneticStrength, max: 12 }
  );
  const { x: ax, y: ay } = useMagneticEffect(
    anchorRef as React.RefObject<HTMLElement>,
    { strength: magneticStrength, max: 12 }
  );

  const baseClasses = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
    'transition-all duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
    'select-none cursor-pointer',
    variantClasses[variant],
    sizeClasses[size],
    (disabled || loading) && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  );

  const content = (
    <>
      {loading ? <Spinner /> : leftIcon}
      <span>{children}</span>
      {!loading && rightIcon}
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={anchorRef}
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
        style={magnetic ? { x: ax, y: ay } : undefined}
        aria-disabled={disabled}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      className={baseClasses}
      style={magnetic ? { x: bx, y: by } : undefined}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {content}
    </motion.button>
  );
}
