import { GlowCard } from '../ui/GlowCard';
import type { Testimonial } from '../../data/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <GlowCard className="p-6 h-full flex flex-col" hoverable={false}>
      {/* Placeholder notice */}
      <div className="mb-4 text-xs font-mono text-brand-primary/60 border border-brand-primary/20 rounded px-2 py-1 w-fit">
        Placeholder testimonial
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4" aria-label={`Rating: ${testimonial.rating} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            width="16" height="16" viewBox="0 0 24 24"
            fill={i < testimonial.rating ? '#F59E0B' : 'none'}
            stroke="#F59E0B"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="flex-1 text-text-secondary text-sm leading-relaxed mb-6 italic">
        "{testimonial.text}"
      </blockquote>

      {/* Author */}
      <footer className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary/30 to-brand-accent/30 flex items-center justify-center text-sm font-semibold text-brand-primary border border-brand-primary/30">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <div className="text-sm font-semibold text-text-primary">{testimonial.name}</div>
          <div className="text-xs text-text-muted">{testimonial.role}, {testimonial.company}</div>
        </div>
      </footer>
    </GlowCard>
  );
}
