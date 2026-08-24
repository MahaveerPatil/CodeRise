import { motion } from 'framer-motion';
import { SectionHeading } from '../components/ui/SectionHeading';
import { GlowCard } from '../components/ui/GlowCard';
import { fadeUp, staggerContainer } from '../utils/animations';
import { useInView } from '../hooks/useInView';

const differentiators = [
  {
    icon: '🔧',
    title: 'Custom-Built Solutions',
    description:
      'Every project is architected from the ground up to match your exact requirements — no templates, no shortcuts.',
  },
  {
    icon: '⚡',
    title: 'Modern Technology',
    description:
      'We use the most current, production-proven technologies and frameworks so your product is built to last.',
  },
  {
    icon: '📈',
    title: 'Scalable Architecture',
    description:
      'Systems designed to grow with you — from 10 users to 10 million, without rebuilding from scratch.',
  },
  {
    icon: '💬',
    title: 'Transparent Communication',
    description:
      'Clear timelines, regular updates, and honest conversations. You always know exactly where your project stands.',
  },
  {
    icon: '🔒',
    title: 'Security & Performance',
    description:
      'Security is built in from day one. Fast, hardened, optimized — not patched in at the end.',
  },
  {
    icon: '🤝',
    title: 'Long-Term Support',
    description:
      "We don't disappear after launch. Ongoing maintenance, optimization, and support are always available.",
  },
];

export function WhyChooseUsSection() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section
      id="why-us"
      ref={ref}
      className="relative py-24 bg-bg-surface"
      aria-labelledby="why-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <SectionHeading
            label="WHY CODERISE"
            title="Technology With [Purpose]."
            subtitle="We don't just build software. We build reliable, scalable technology that creates real business value."
            align="center"
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {differentiators.map((item, index) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              transition={{ delay: index * 0.1 }}
            >
              <GlowCard className="p-6 h-full" hoverable>
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {item.description}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
