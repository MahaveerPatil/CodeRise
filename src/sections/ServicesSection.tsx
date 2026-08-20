import { motion } from 'framer-motion';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ServiceCard } from '../components/cards/ServiceCard';
import { services } from '../data/services';
import { staggerContainer } from '../utils/animations';
import { useInView } from '../hooks/useInView';

export function ServicesSection() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-24 bg-bg-surface"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <SectionHeading
            label="WHAT WE BUILD"
            title="[Technology] Solutions Designed Around Your Business"
            subtitle="Technology solutions designed around your business, your customers, and your future."
            align="center"
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
