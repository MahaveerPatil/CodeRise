import { motion } from 'framer-motion';
import { stats } from '../data/stats';
import { useInView } from '../hooks/useInView';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';
import { fadeUp } from '../utils/animations';

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
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1 }}
      className="text-center"
    >
      <div className="font-display font-bold text-5xl md:text-6xl text-white mb-2">
        <span aria-live="polite" aria-atomic="true">{count}</span>
        <span aria-hidden="true">{suffix}</span>
      </div>
      <p className="text-white/70 text-sm font-medium uppercase tracking-widest">{label}</p>
    </motion.div>
  );
}

export function StatsSection() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section
      id="stats"
      ref={ref}
      className="relative py-20 overflow-hidden"
      aria-label="Company statistics"
    >
      {/* Brand gradient background */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #7c2020 0%, #FF6B6B 50%, #FFD93D 100%)' }}
        aria-hidden="true"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-bg-base/40" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-white/60 text-xs font-mono tracking-widest uppercase">
            ⚠ Placeholder values — update with real data before launch
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
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
    </section>
  );
}
