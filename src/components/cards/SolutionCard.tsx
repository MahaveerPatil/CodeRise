import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../utils/cn';
import type { Solution } from '../../data/solutions';

interface SolutionCardProps {
  solution: Solution;
  index: number;
}

export function SolutionCard({ solution, index }: SolutionCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: reducedMotion ? 0 : index * 0.1 }}
      className={cn(
        'relative p-6 rounded-2xl border-2 border-transparent',
        'bg-gradient-to-b from-bg-elevated to-bg-card',
        'hover:border-brand-secondary/40 transition-all duration-300 group',
        // Gradient border trick
        'before:absolute before:inset-0 before:rounded-2xl before:p-[2px]',
        'before:bg-gradient-to-b before:from-brand-primary/20 before:to-brand-secondary/10',
        'before:-z-10 before:content-[""]'
      )}
    >
      {/* Icon */}
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {solution.icon}
      </div>

      {/* Name */}
      <h3 className="font-display font-bold text-xl text-text-primary mb-2">
        {solution.name}
      </h3>

      {/* Description */}
      <p className="text-text-secondary text-sm mb-4 leading-relaxed">
        {solution.description}
      </p>

      {/* Services list */}
      <ul className="space-y-1.5">
        {solution.services.map((service) => (
          <li key={service} className="flex items-center gap-2 text-xs text-text-muted">
            <span className="w-1 h-1 rounded-full bg-brand-secondary" aria-hidden="true" />
            {service}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
