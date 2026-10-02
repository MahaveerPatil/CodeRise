import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlowCard } from '../ui/GlowCard';
import { Badge } from '../ui/Badge';
import { fadeUp } from '../../utils/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { Service } from '../../data/services';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const reducedMotion = useReducedMotion();

  // Zero-pad the service number e.g. 01, 02 …
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: reducedMotion ? 0 : index * 0.08 }}
    >
      <GlowCard
        className="h-full p-6 cursor-pointer group"
        hoverable
        glowColor="rgba(255,107,107,0.15)"
        role="article"
        aria-label={`Service: ${service.title}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onFocus={() => setIsExpanded(true)}
        onBlur={() => setIsExpanded(false)}
        tabIndex={0}
      >
        {/* Number + icon row */}
        <div className="flex items-start justify-between mb-5">
          {/* Icon */}
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary/20 to-brand-accent/10 border border-brand-primary/20 flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:border-brand-primary/40">
              {service.icon}
            </div>
          </div>
          {/* Service number */}
          <span className="font-mono font-bold text-3xl leading-none text-border-default group-hover:text-brand-primary/30 transition-colors duration-300 select-none">
            {num}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-lg text-text-primary mb-2 group-hover:text-white transition-colors duration-200">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {service.tags.map((tag) => (
            <Badge key={tag} variant="default">{tag}</Badge>
          ))}
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && !reducedMotion && (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <p className="text-text-secondary text-xs leading-relaxed pt-3 border-t border-border-subtle">
                {service.expandedContent}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        {isExpanded && reducedMotion && (
          <div className="pt-3 border-t border-border-subtle">
            <p className="text-text-secondary text-xs leading-relaxed">{service.expandedContent}</p>
          </div>
        )}

        {/* Bottom arrow */}
        <div className="flex justify-between items-center mt-5 pt-4 border-t border-border-subtle/50">
          <span className="text-xs font-mono text-text-muted group-hover:text-brand-primary transition-colors duration-200">
            Learn more
          </span>
          <motion.span
            animate={{ rotate: isExpanded ? 45 : 0, x: isExpanded ? 2 : 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            className="text-brand-primary text-base leading-none"
            aria-hidden="true"
          >
            →
          </motion.span>
        </div>
      </GlowCard>
    </motion.div>
  );
}
