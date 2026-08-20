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

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: reducedMotion ? 0 : index * 0.1 }}
    >
      <GlowCard
        className="h-full p-6 cursor-pointer group"
        hoverable
        role="article"
        aria-label={`Service: ${service.title}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onFocus={() => setIsExpanded(true)}
        onBlur={() => setIsExpanded(false)}
        tabIndex={0}
      >
        {/* Icon */}
        <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
          {service.icon}
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
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

        {/* Expanded content — animated when motion is allowed, instant when reduced */}
        <AnimatePresence>
          {isExpanded && !reducedMotion && (
            <motion.div
              key="expanded-animated"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <p className="text-text-secondary text-xs leading-relaxed pt-2 border-t border-border-subtle">
                {service.expandedContent}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {isExpanded && reducedMotion && (
          <div className="pt-2 border-t border-border-subtle">
            <p className="text-text-secondary text-xs leading-relaxed">
              {service.expandedContent}
            </p>
          </div>
        )}

        {/* Arrow — rotates 45° on expand */}
        <div className="flex justify-end mt-4">
          <motion.span
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            className="text-brand-primary text-lg"
            aria-hidden="true"
          >
            →
          </motion.span>
        </div>
      </GlowCard>
    </motion.div>
  );
}
