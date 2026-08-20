import { motion, useSpring } from 'framer-motion';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export function ScrollProgress() {
  const progress = useScrollProgress();
  const scaleX = useSpring(progress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-0.5 origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #991B1B, #DC2626, #F97316)',
      }}
      aria-hidden="true"
    />
  );
}
