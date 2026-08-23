import { SEOHead } from '../components/seo/SEOHead';
import { organizationSchema, faqSchema } from '../utils/seo';
import { HeroSection } from '../sections/HeroSection';
import { ServicesSection } from '../sections/ServicesSection';
import { TechEcosystemSection } from '../sections/TechEcosystemSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { WhyChooseUsSection } from '../sections/WhyChooseUsSection';
import { ProcessSection } from '../sections/ProcessSection';
import { SolutionsSection } from '../sections/SolutionsSection';
import { StatsSection } from '../sections/StatsSection';
import { AboutSection } from '../sections/AboutSection';
import { TestimonialsSection } from '../sections/TestimonialsSection';
import { CTASection } from '../sections/CTASection';
import { ContactSection } from '../sections/ContactSection';

export function HomePage() {
  return (
    <main id="main">
      <SEOHead schema={organizationSchema} schemas={[faqSchema]} />
      <HeroSection />
      <ServicesSection />
      <TechEcosystemSection />
      <ProjectsSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <SolutionsSection />
      <StatsSection />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
      <ContactSection />
    </main>
  );
}
