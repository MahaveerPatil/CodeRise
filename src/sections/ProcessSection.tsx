import { motion } from 'framer-motion';
import { SectionHeading } from '../components/ui/SectionHeading';
import { processSteps } from '../data/process';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { cn } from '../utils/cn';

export function ProcessSection() {
  const [ref, inView] = useInView<HTMLElement>();
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="process"
      ref={ref}
      className="relative py-24 bg-bg-base overflow-hidden"
      aria-label="Our process"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <SectionHeading
            label="HOW WE WORK"
            title="From Idea to [Impact]"
            subtitle="A clear, collaborative process from first conversation to successful launch and beyond."
            align="center"
          />
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* Background line */}
          <div className="absolute top-8 left-0 right-0 h-px bg-border-subtle" aria-hidden="true">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary origin-left"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
            />
          </div>

          <div className="grid grid-cols-7 gap-2">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  delay: reducedMotion ? 0 : 0.3 + index * 0.15,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="flex flex-col items-center text-center"
              >
                <div className={cn(
                  'relative z-10 w-16 h-16 rounded-full border-2 flex items-center justify-center mb-4',
                  'bg-bg-card transition-all duration-300',
                  inView ? 'border-brand-primary shadow-glow' : 'border-border-subtle'
                )}>
                  <span className={cn(
                    'font-mono font-bold text-lg transition-all duration-300',
                    inView ? 'gradient-text' : 'text-text-muted'
                  )}>
                    {step.number}
                  </span>
                </div>
                <h3 className={cn(
                  'font-display font-semibold text-sm mb-2 transition-colors duration-300',
                  inView ? 'text-text-primary' : 'text-text-muted'
                )}>
                  {step.title}
                </h3>
                <p className="text-text-muted text-xs leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border-subtle" aria-hidden="true">
            <motion.div
              className="w-full bg-gradient-to-b from-brand-primary to-brand-secondary origin-top"
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.2 }}
            />
          </div>

          <div className="space-y-8 pl-16">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{
                  delay: reducedMotion ? 0 : 0.2 + index * 0.12,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="relative"
              >
                <div className={cn(
                  'absolute -left-[2.75rem] top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center',
                  'bg-bg-card transition-all duration-300',
                  inView ? 'border-brand-primary' : 'border-border-subtle'
                )} aria-hidden="true">
                  <span className="w-2 h-2 rounded-full bg-brand-primary" />
                </div>
                <div>
                  <span className={cn(
                    'font-mono text-xs font-bold tracking-widest mb-1 block transition-colors duration-300',
                    inView ? 'text-brand-primary' : 'text-text-muted'
                  )}>
                    {step.number}
                  </span>
                  <h3 className="font-display font-semibold text-text-primary mb-1">{step.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
