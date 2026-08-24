import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { Badge } from '../components/ui/Badge';
import { SEOHead } from '../components/seo/SEOHead';
import { fadeUp } from '../utils/animations';
import { useInView } from '../hooks/useInView';

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CaseStudyPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    if (!project) navigate('/');
  }, [project, navigate]);

  if (!project) return null;

  return (
    <>
      <SEOHead
        title={`${project.title} — CodeRise Case Study`}
        description={project.description}
        canonical={`https://coderise.dev/projects/${project.id}`}
      />

      <main id="main" className="min-h-screen bg-bg-base pt-24 pb-32">
        {/* Hero banner */}
        <div
          className="relative h-64 md:h-96 overflow-hidden"
          style={{ background: project.imagePlaceholder }}
        >
          <div className="absolute inset-0 bg-bg-base/60" />
          <div className="absolute inset-0 flex items-end max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <div>
              <Badge variant="outline" className="mb-3">{project.industry}</Badge>
              <h1 className="font-display font-bold text-4xl md:text-6xl text-white leading-tight">
                {project.title}
              </h1>
              <p className="text-white/70 text-lg mt-2">{project.tagline}</p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
          {/* Back button */}
          <button
            onClick={() => navigate('/#projects')}
            className="flex items-center gap-2 text-text-secondary hover:text-brand-primary transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Projects
          </button>

          {/* Meta info */}
          <Section className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl border border-border-subtle bg-bg-card">
            {[
              { label: 'Industry', value: project.industry },
              { label: 'Timeline', value: project.timeline },
              { label: 'Team Size', value: project.teamSize },
              { label: 'Technologies', value: `${project.technologies.length} used` },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-xs font-mono text-text-muted uppercase tracking-widest mb-1">{item.label}</div>
                <div className="text-text-primary font-semibold">{item.value}</div>
              </div>
            ))}
          </Section>

          {/* Problem */}
          <Section>
            <h2 className="font-display font-bold text-2xl text-text-primary mb-4">The Problem</h2>
            <p className="text-text-secondary leading-relaxed">{project.problem}</p>
          </Section>

          {/* Solution */}
          <Section>
            <h2 className="font-display font-bold text-2xl text-text-primary mb-4">Our Solution</h2>
            <p className="text-text-secondary leading-relaxed">{project.solution}</p>
          </Section>

          {/* Architecture */}
          <Section>
            <h2 className="font-display font-bold text-2xl text-text-primary mb-4">Architecture</h2>
            <div className="p-6 rounded-xl bg-bg-elevated border border-border-subtle font-mono text-sm text-text-secondary leading-relaxed">
              {project.architecture}
            </div>
          </Section>

          {/* Technologies */}
          <Section>
            <h2 className="font-display font-bold text-2xl text-text-primary mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="default">{tech}</Badge>
              ))}
            </div>
          </Section>

          {/* Results */}
          <Section>
            <h2 className="font-display font-bold text-2xl text-text-primary mb-4">Results</h2>
            <ul className="space-y-3">
              {project.results.map((result, i) => (
                <li key={i} className="flex items-start gap-3 text-text-secondary">
                  <span className="mt-1 w-2 h-2 rounded-full bg-brand-primary flex-shrink-0" aria-hidden="true" />
                  {result}
                </li>
              ))}
            </ul>
          </Section>

          {/* Challenges */}
          <Section>
            <h2 className="font-display font-bold text-2xl text-text-primary mb-4">Challenges</h2>
            <ul className="space-y-3">
              {project.challenges.map((challenge, i) => (
                <li key={i} className="flex items-start gap-3 text-text-secondary">
                  <span className="mt-1 w-2 h-2 rounded-full bg-brand-accent flex-shrink-0" aria-hidden="true" />
                  {challenge}
                </li>
              ))}
            </ul>
          </Section>

          {/* Outcome */}
          <Section className="p-8 rounded-2xl border border-brand-primary/30 bg-brand-primary/5">
            <h2 className="font-display font-bold text-2xl text-text-primary mb-4">Final Outcome</h2>
            <p className="text-text-secondary leading-relaxed">{project.outcome}</p>
          </Section>

          {/* CTA */}
          <Section className="text-center py-8">
            <p className="text-text-secondary mb-6">Have a similar project in mind?</p>
            <button
              onClick={() => navigate('/#contact')}
              className="px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-brand-primary to-brand-accent text-white hover:shadow-glow transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              Let's Build It Together →
            </button>
          </Section>
        </div>
      </main>
    </>
  );
}

export default CaseStudyPage;
