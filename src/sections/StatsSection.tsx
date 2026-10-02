import { motion } from 'framer-motion';
import { stats } from '../data/stats';
import { useInView } from '../hooks/useInView';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
  index: number;
}

function StatItem({ value, suffix, label, inView, index }: StatItemProps) {
  const count = useAnimatedCounter({ end: value, duration: 2000, easing: 'easeOutQuart', inView });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center px-6 py-8 relative group"
    >
      {/* Divider between stats — hidden on first item */}
      {index > 0 && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-white/[0.07] hidden lg:block" aria-hidden="true" />
      )}

      {/* Number */}
      <div className="font-display font-black text-5xl md:text-6xl leading-none tracking-tight mb-3">
        <span
          className="bg-gradient-to-br from-white via-white/90 to-white/60 bg-clip-text text-transparent"
          aria-live="polite"
          aria-atomic="true"
        >
          {count}
        </span>
        <span
          className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent"
          aria-hidden="true"
        >
          {suffix}
        </span>
      </div>

      {/* Label */}
      <p className="text-white/50 text-xs font-mono uppercase tracking-[0.15em]">{label}</p>
    </motion.div>
  );
}

export function StatsSection() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section
      id="stats"
      ref={ref}
      className="relative py-16 bg-bg-base overflow-hidden"
      aria-label="Company statistics"
    >
      {/* Subtle top/bottom border lines */}
      <div className="absolute inset-x-0 top-0 h-px maroon-divider" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" aria-hidden="true" />

      {/* Ambient glow behind the panel */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(139,26,26,0.10) 0%, rgba(255,107,107,0.05) 40%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Glass panel */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <StatItem
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                inView={inView}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
