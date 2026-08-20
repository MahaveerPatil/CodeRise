import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function Modal({ isOpen, onClose, children, className, title }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Focus close button when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => closeBtnRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-bg-base/80 backdrop-blur-sm" aria-hidden="true" />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto',
              'glass-strong rounded-2xl p-6',
              className
            )}
          >
            <button
              ref={closeBtnRef}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:outline-none"
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
