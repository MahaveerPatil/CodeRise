import React from 'react';
import { motion } from 'framer-motion';
import { wordReveal, staggerContainer } from '../../utils/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../utils/cn';

interface AnimatedTextProps {
  children: string;
  className?: string;
  as?: React.ElementType;
  delay?: number;
}

export function AnimatedText({
  children,
  className,
  as: Tag = 'p',
  delay = 0,
}: AnimatedTextProps) {
  const reducedMotion = useReducedMotion();
  const words = children.split(' ');

  if (reducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <motion.div
      variants={{
        ...staggerContainer,
        visible: {
          ...staggerContainer.visible,
          transition: {
            staggerChildren: 0.08,
            delayChildren: delay,
          },
        },
      }}
      initial="hidden"
      animate="visible"
      className={cn('flex flex-wrap gap-x-[0.25em]', className)}
      aria-label={children}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordReveal}
          className="inline-block"
          aria-hidden="true"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
