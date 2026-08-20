import { SectionHeading } from '../components/ui/SectionHeading';
import { techRow1, techRow2 } from '../data/technologies';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { cn } from '../utils/cn';
import type { Technology } from '../data/technologies';

interface TechItemProps {
  tech: Technology;
}

function TechItem({ tech }: TechItemProps) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border-subtle bg-bg-card hover:border-brand-primary/30 transition-colors duration-200 select-none">
      <span className="text-xl font-mono font-bold text-brand-primary w-8 text-center">
        {tech.icon}
      </span>
      <span className="text-sm font-medium text-text-secondary whitespace-nowrap">
        {tech.name}
      </span>
    </div>
  );
}

interface MarqueeRowProps {
  items: Technology[];
  direction: 'left' | 'right';
  reducedMotion: boolean;
}

function MarqueeRow({ items, direction, reducedMotion }: MarqueeRowProps) {
  // Duplicate items for seamless loop
  const duplicated = [...items, ...items];

  if (reducedMotion) {
    return (
      <div className="flex flex-wrap gap-3 justify-center">
        {items.map((tech) => (
          <TechItem key={tech.name} tech={tech} />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden group">
      <div
        className={cn(
          'flex gap-4 w-max',
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right',
          'group-hover:[animation-play-state:paused]'
        )}
      >
        {duplicated.map((tech, i) => (
          <TechItem key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  );
}

export function TechEcosystemSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="tech"
      className="relative py-24 bg-bg-base overflow-hidden"
      aria-labelledby="tech-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <SectionHeading
          label="TECH STACK"
          title="Powered By [Modern Technology]"
          align="center"
        />
      </div>

      <div className="space-y-4">
        <MarqueeRow items={techRow1} direction="left" reducedMotion={reducedMotion} />
        <MarqueeRow items={techRow2} direction="right" reducedMotion={reducedMotion} />
      </div>
    </section>
  );
}
