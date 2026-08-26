import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { GlowOrb } from '../components/effects/GlowOrb';
import { Button } from '../components/ui/Button';
import { fadeUp, staggerContainer } from '../utils/animations';
import { useInView } from '../hooks/useInView';

export function CTASection() {
  const [ref, inView] = useInView<HTMLElement>();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToContact = () => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: 'contact' } });
    } else {
      const el = document.getElementById('contact');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 84;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="cta"
      ref={ref}
      className="relative py-32 bg-bg-base overflow-hidden"
      aria-label="Call to action"
    >
      {/* Animated background orbs */}
      <GlowOrb color="#FF6B6B" size={700} opacity={0.12} className="top-1/2 left-1/4 z-0" />
      <GlowOrb color="#FFD93D" size={500} opacity={0.08} className="top-1/2 right-1/4 z-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-8"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-5xl md:text-6xl text-text-primary leading-tight"
          >
            Have an Idea?{' '}
            <span className="gradient-text">Let's Build It.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-text-secondary text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Tell us what you're imagining. We'll help you turn it into a scalable digital product.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              variant="primary"
              size="lg"
              magnetic
              onClick={scrollToContact}
            >
              Start a Project
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={scrollToContact}
            >
              Talk to Us
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
