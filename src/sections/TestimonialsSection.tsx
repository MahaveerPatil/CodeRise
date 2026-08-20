import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../components/ui/SectionHeading';
import { TestimonialCard } from '../components/cards/TestimonialCard';
import { testimonials } from '../data/testimonials';
import { useInView } from '../hooks/useInView';

export function TestimonialsSection() {
  const [ref, inView] = useInView<HTMLElement>();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  // Suppress unused warning — inView can be used for future entrance gating
  void inView;

  const goTo = (index: number, dir: number) => {
    setDirection(dir);
    setCurrent(index);
    resetTimer();
  };

  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length, -1);
  const next = () => goTo((current + 1) % testimonials.length, 1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'ArrowRight') next();
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-24 bg-bg-elevated"
      aria-label="Client testimonials"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <SectionHeading
            label="CLIENT STORIES"
            title="What [Clients] Say"
            subtitle="Placeholder testimonials — replace with real client feedback before launch."
            align="center"
          />
        </div>

        <div
          ref={containerRef}
          className="relative overflow-hidden"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Testimonial carousel"
          aria-live="polite"
        >
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <TestimonialCard testimonial={testimonials[current]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-border-default flex items-center justify-center text-text-secondary hover:border-brand-primary hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            aria-label="Previous testimonial"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Dots */}
          <div className="flex gap-2" role="tablist" aria-label="Testimonial indicators">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                  i === current ? 'bg-brand-primary w-6' : 'bg-border-default hover:bg-brand-primary/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-border-default flex items-center justify-center text-text-secondary hover:border-brand-primary hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            aria-label="Next testimonial"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
