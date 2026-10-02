import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { AnimatedGrid } from '../components/effects/AnimatedGrid';
import { GlowOrb } from '../components/effects/GlowOrb';
import { Button } from '../components/ui/Button';
import { fadeUp } from '../utils/animations';
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-base noise-overlay"
      aria-label="Hero section"
    >
      {/* Aurora orbs — slow drift */}
      <div
        className={`absolute top-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full pointer-events-none z-0 ${reducedMotion ? '' : 'animate-aurora'}`}
        style={{ background: 'radial-gradient(circle, rgba(255,107,107,0.13) 0%, transparent 65%)' }}
        aria-hidden="true"
      />
      <div
        className={`absolute bottom-[-15%] right-[-8%] w-[600px] h-[600px] rounded-full pointer-events-none z-0 ${reducedMotion ? '' : 'animate-aurora-delay'}`}
        style={{ background: 'radial-gradient(circle, rgba(100,200,255,0.09) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      {/* Grid + particles */}
      <AnimatedGrid opacity={0.12} className="z-0" />
      <Suspense fallback={null}><ParticleField /></Suspense>
      <GlowOrb color="#FF8E53" size={500} opacity={0.07} className="bottom-1/4 right-1/3 z-0" />
      {/* Maroon accent orb — bottom left */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse, rgba(139,26,26,0.12) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Headline */}
        <motion.h1
          className="font-display font-bold text-[42px] md:text-[62px] lg:text-[72px] text-text-primary leading-[1.05] tracking-tight mb-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: reducedMotion ? 0 : 0.2 }}
        >
          We Build{' '}
          <span className="gradient-text">Technology</span>
          <br className="hidden sm:block" />
          {' '}That Moves Businesses Forward.
        </motion.h1>

        {/* Supporting text */}
        <motion.p
          className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: reducedMotion ? 0 : 0.5 }}
        >
          From powerful websites and scalable software to AI and intelligent
          automation — we turn ambitious ideas into technology that works.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: reducedMotion ? 0 : 0.7 }}
        >
          <Button variant="primary" size="lg" magnetic onClick={() => smoothScroll('contact')}>
            Start a Project →
          </Button>
          <Button variant="ghost" size="lg" onClick={() => smoothScroll('projects')}>
            Explore Our Work
          </Button>
        </motion.div>

        {/* Trust line */}
        <motion.div
          className="flex items-center justify-center gap-3 mt-10 text-text-muted text-xs font-mono"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: reducedMotion ? 0 : 0.9 }}
          aria-hidden="true"
        >
          <span className="w-8 h-px bg-border-default" />
          <span>Based in Belagavi · Serving clients worldwide</span>
          <span className="w-8 h-px bg-border-default" />
        </motion.div>
      </div>

      {/* Scroll indicator — simple arrow */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: reducedMotion ? 0 : 1.1 }}
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
