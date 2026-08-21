import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  isVisible: boolean;
}

export function LoadingScreen({ isVisible }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9000] flex flex-col items-center justify-center bg-bg-base"
          aria-label="Loading VELTRICKS"
          role="status"
          aria-live="polite"
        >
          {/* VELTRICKS wordmark with draw-in animation */}
          <div className="mb-8">
            <svg width="280" height="56" viewBox="0 0 280 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <motion.text
                x="140"
                y="42"
                textAnchor="middle"
                fontFamily="Syne, system-ui, sans-serif"
                fontWeight="700"
                fontSize="36"
                fill="url(#loadGrad)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                VELTRICKS
              </motion.text>
              <defs>
                <linearGradient id="loadGrad" x1="0" y1="0" x2="280" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FF6B6B" />
                  <stop offset="50%" stopColor="#FF8E53" />
                  <stop offset="100%" stopColor="#FFD93D" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Progress bar */}
          <div className="w-48 h-0.5 bg-border-subtle rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #FF6B6B, #FFD93D)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </div>

          {/* Tagline */}
          <motion.p
            className="mt-6 text-xs font-mono text-text-muted tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Premium IT Solutions
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
