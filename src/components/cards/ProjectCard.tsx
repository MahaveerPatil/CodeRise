import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { scaleUp } from '../../utils/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../utils/cn';
import type { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();

  const handleCaseStudy = () => navigate(`/projects/${project.id}`);

  return (
    <motion.article
      variants={scaleUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: reducedMotion ? 0 : index * 0.1 }}
      className={cn(
        'group relative rounded-card overflow-hidden border border-border-subtle bg-bg-card',
        'hover:border-border-default transition-all duration-300',
        featured && 'col-span-full'
      )}
      aria-label={`Project: ${project.title}`}
    >
      {/* Image placeholder */}
      <div
        className={cn(
          'relative overflow-hidden',
          featured ? 'h-72 md:h-96' : 'h-48'
        )}
      >
        <motion.div
          className="absolute inset-0"
          style={{ background: project.imagePlaceholder }}
          whileHover={!reducedMotion ? { scale: 1.04 } : undefined}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-bg-base/0 group-hover:bg-bg-base/40 transition-colors duration-300" />

        {/* Industry badge */}
        <div className="absolute top-4 left-4">
          <Badge variant="outline">{project.industry}</Badge>
        </div>

        {/* Hover action buttons */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleCaseStudy}
            className="px-4 py-2 rounded-lg bg-brand-primary text-white text-sm font-medium hover:bg-brand-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            View Case Study
          </button>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg border border-white/50 text-white text-sm font-medium hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Live Demo ↗
            </a>
          ) : (
            <span
              className="px-4 py-2 rounded-lg border border-white/20 text-white/40 text-sm font-medium cursor-not-allowed"
              aria-disabled="true"
            >
              Live Demo
            </span>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3
          className={cn(
            'font-display font-semibold text-text-primary mb-1',
            featured ? 'text-2xl' : 'text-lg'
          )}
        >
          {project.title}
        </h3>
        <p className="text-text-secondary text-sm mb-3 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="default">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="outline">+{project.technologies.length - 4}</Badge>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleCaseStudy}
            className="text-sm font-medium text-brand-primary hover:text-brand-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
          >
            View Case Study →
          </button>
        </div>
      </div>
    </motion.article>
  );
}
