import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../../data/navigation';
import { cn } from '../../utils/cn';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavClick: (href: string) => void;
}

export function MobileMenu({ isOpen, onClose, onNavClick }: MobileMenuProps) {
  const firstItemRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Focus first item when opened
  useEffect(() => {
    if (isOpen) setTimeout(() => firstItemRef.current?.focus(), 50);
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    onNavClick(href);
    onClose();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.1 },
    },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
    exit: {
      opacity: 0,
      x: -24,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-bg-base/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-in panel */}
          <motion.div
            className={cn(
              'absolute inset-y-0 left-0 w-4/5 max-w-sm flex flex-col',
              'bg-bg-base/95 backdrop-blur-xl border-r border-border-subtle shadow-elevated'
            )}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border-subtle">
              <span className="font-display font-bold text-lg bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
                VELTRIX
              </span>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-bg-elevated text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                aria-label="Close menu"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <motion.nav
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-1 px-4 py-6 space-y-1 overflow-y-auto"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link, i) => (
                <motion.div key={link.href} variants={itemVariants}>
                  <button
                    ref={i === 0 ? firstItemRef : undefined}
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left px-4 py-3 rounded-lg text-lg font-medium text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                  >
                    {link.label}
                  </button>
                </motion.div>
              ))}
            </motion.nav>

            {/* CTA */}
            <div className="px-6 py-6 border-t border-border-subtle">
              <button
                onClick={() => handleNavClick('#contact')}
                className="w-full py-3 px-6 rounded-lg font-medium bg-gradient-to-r from-brand-primary to-brand-accent text-white hover:shadow-glow transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                Start a Project →
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
