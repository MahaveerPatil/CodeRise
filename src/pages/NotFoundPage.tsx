import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEOHead } from '../components/seo/SEOHead';
import { GlowOrb } from '../components/effects/GlowOrb';
import { fadeUp } from '../utils/animations';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead title="404 — Page Not Found | CodeRise" noIndex />
      <div className="relative min-h-screen bg-bg-base flex items-center justify-center overflow-hidden px-4">
        <GlowOrb color="#FF6B6B" size={600} opacity={0.1} className="top-1/4 left-1/4 z-0" />
        <GlowOrb color="#FF8E53" size={400} opacity={0.07} className="bottom-1/4 right-1/4 z-0" />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center max-w-lg"
        >
          {/* Big 404 */}
          <p className="font-display font-bold text-[120px] md:text-[160px] leading-none bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent select-none">
            404
          </p>

          <h1 className="font-display font-bold text-2xl md:text-3xl text-text-primary mt-2 mb-4">
            Page Not Found
          </h1>
          <p className="text-text-secondary text-base leading-relaxed mb-10">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-brand-primary to-brand-accent text-white hover:shadow-glow transition-all text-sm"
            >
              Back to Home
            </button>
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              className="px-6 py-3 rounded-xl font-semibold border border-border-default text-text-secondary hover:border-brand-primary hover:text-brand-primary transition-all text-sm"
            >
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
