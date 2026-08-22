import { motion } from 'framer-motion';
import { SectionHeading } from '../components/ui/SectionHeading';
import { GlowCard } from '../components/ui/GlowCard';
import { fadeUp, slideInLeft } from '../utils/animations';
import { useInView } from '../hooks/useInView';

const missionData = [
  {
    label: 'Our Mission',
    icon: '🎯',
    text: 'To transform ambitious business ideas into powerful digital products — delivering technology that is reliable, scalable, and genuinely useful.',
  },
  {
    label: 'Our Vision',
    icon: '🔭',
    text: 'To be the most trusted technology partner for businesses building the future — known for technical excellence, honest relationships, and long-term impact.',
  },
  {
    label: 'Our Values',
    icon: '💎',
    text: 'Quality over quantity. Transparency in every conversation. Long-term thinking over short-term shortcuts. Technology in service of people.',
  },
];

export function AboutSection() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 bg-bg-surface blue-accent-bg"
      aria-label="About VELTRICKS"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <SectionHeading
            label="ABOUT US"
            title="We're Building More Than [Software]."
            subtitle="VELTRICKS is a premium software development company focused on turning business ideas into digital products that work — beautifully, reliably, and at scale."
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Mission/Vision/Values */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-5"
          >
            {missionData.map((item) => (
              <GlowCard key={item.label} className="p-6" hoverable={false}>
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-0.5">{item.icon}</span>
                  <div>
                    <h3 className="font-display font-semibold text-text-primary mb-2">{item.label}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </GlowCard>
            ))}
          </motion.div>

          {/* Right: Founder card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ delay: 0.2 }}
          >
            <GlowCard className="p-8" hoverable={false}>
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center mb-5 shadow-glow">
                  <span className="font-display font-bold text-3xl text-white">V</span>
                </div>

                {/* Name placeholder */}
                <h3 className="font-display font-bold text-xl text-text-primary mb-1">
                  [Varadaraj Patil]
                </h3>
                <p className="text-brand-primary text-sm font-medium mb-1">Founder &amp; CEO, VELTRICKS</p>
                <p className="text-text-muted text-xs font-mono mb-6">Replace with actual founder details</p>

                {/* Bio */}
                <p className="text-text-secondary text-sm leading-relaxed">
                  A passionate technologist and entrepreneur with a vision to make world-class software
                  development accessible to businesses of all sizes. Founded VELTRICKS to bridge the gap
                  between ambitious business ideas and the technology needed to bring them to life.
                </p>

                {/* Divider */}
                <div className="w-full h-px bg-border-subtle my-6" />

                {/* Company tagline */}
                <p className="text-text-muted text-xs font-mono italic">
                  "Built with ambition. Powered by technology."
                </p>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
