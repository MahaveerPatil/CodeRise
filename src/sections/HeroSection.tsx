import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { AnimatedGrid } from '../components/effects/AnimatedGrid';
import { GlowOrb } from '../components/effects/GlowOrb';
import { Button } from '../components/ui/Button';
import { fadeUp, fadeIn } from '../utils/animations';
import { useReducedMotion } from '../hooks/useReducedMotion';

const ParticleField = lazy(() => import('../components/effects/ParticleField'));

const smoothScroll = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 84;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

export function HeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-base"
      aria-label="Hero section"
    >
      {/* Backgrounds */}
      <AnimatedGrid opacity={0.15} className="z-0" />
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>
      <GlowOrb color="#6366F1" size={800} opacity={0.12} className="top-0 left-1/4 z-0" />
      <GlowOrb color="#8B5CF6" size={600} opacity={0.08} className="bottom-1/4 right-1/4 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Overline */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: reducedMotion ? 0 : 0 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-semibold tracking-widest uppercase border border-brand-primary/30 text-brand-primary bg-brand-primary/5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" aria-hidden="true" />
            Premium IT Solutions
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-text-primary leading-tight mb-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: reducedMotion ? 0 : 0.2 }}
        >
          We Build{' '}
          <span className="gradient-text">Digital Experiences</span>
          {' '}That Move Businesses Forward.
        </motion.h1>

        {/* Supporting text */}
        <motion.p
          className="text-text-secondary text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: reducedMotion ? 0 : 0.6 }}
        >
          From powerful websites and scalable software to cloud, AI and DevOps solutions — we turn ambitious ideas into technology that works.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: reducedMotion ? 0 : 0.9 }}
        >
          <Button
            variant="primary"
            size="lg"
            magnetic
            onClick={() => smoothScroll('contact')}
          >
            Start a Project
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => smoothScroll('projects')}
          >
            Explore Our Work
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: reducedMotion ? 0 : 1.2 }}
        aria-hidden="true"
      >
        <span className="text-text-muted text-xs tracking-widest uppercase font-mono">Scroll</span>
        <motion.div
          animate={reducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-5 h-5 text-text-muted"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
