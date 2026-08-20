import { motion } from 'framer-motion';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SolutionCard } from '../components/cards/SolutionCard';
import { solutions } from '../data/solutions';
import { staggerContainer } from '../utils/animations';
import { useInView } from '../hooks/useInView';

export function SolutionsSection() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section
      id="solutions"
      ref={ref}
      className="relative py-24 bg-bg-elevated"
      aria-label="Solutions for every stage of growth"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border-default to-transparent" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <SectionHeading
            label="SOLUTIONS"
            title="Solutions For Every Stage of [Growth]"
            subtitle="Whether you're a startup building your first product or an enterprise scaling operations — we have the right solution."
            align="center"
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {solutions.map((solution, index) => (
            <SolutionCard key={solution.id} solution={solution} index={index} />
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border-default to-transparent" aria-hidden="true" />
    </section>
  );
}
