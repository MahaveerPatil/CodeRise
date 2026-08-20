import { motion } from 'framer-motion';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ProjectCard } from '../components/cards/ProjectCard';
import { projects } from '../data/projects';
import { staggerContainer } from '../utils/animations';
import { useInView } from '../hooks/useInView';

export function ProjectsSection() {
  const [ref, inView] = useInView<HTMLElement>();

  const [featuredProject, ...remainingProjects] = projects;

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-24 bg-bg-base"
      aria-label="Our Work — Projects"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <SectionHeading
            label="OUR WORK"
            title="Ideas We've Turned Into [Reality]"
            subtitle="From intelligent systems to elegant interfaces — real products built for real businesses."
            align="center"
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Featured project — spans full grid width */}
          <ProjectCard
            key={featuredProject.id}
            project={featuredProject}
            index={0}
            featured={true}
          />

          {/* Remaining projects */}
          {remainingProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index + 1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
