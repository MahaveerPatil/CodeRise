import { motion } from 'framer-motion';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ContactForm } from '../components/forms/ContactForm';
import { GlowCard } from '../components/ui/GlowCard';
import { slideInLeft, fadeUp } from '../utils/animations';
import { useInView } from '../hooks/useInView';

const contactInfo = [
  { icon: '📧', label: 'Email', value: 'hello@coderise.com', href: 'mailto:hello@coderise.com' },
  { icon: '📞', label: 'Phone', value: '+91 8310659343', href: 'tel:+918310659343' },
  { icon: '📍', label: 'Location', value: 'India · Remote Worldwide', href: undefined },
];

const socialLinks = [
  {
    label: 'Follow CodeRise on LinkedIn',
    href: 'https://linkedin.com/company/CodeRise',
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Follow CodeRise on GitHub',
    href: 'https://github.com/CodeRise',
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
  {
    label: 'Follow CodeRise on Twitter/X',
    href: 'https://twitter.com/CodeRise',
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'Follow CodeRise on Instagram',
    href: 'https://instagram.com/CodeRise',
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
];

export function ContactSection() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 bg-bg-base blue-accent-bg"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left column */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            <SectionHeading
              label="CONTACT"
              title="Let's Build Something [Great]."
              subtitle="Tell us about your project. We respond within 24 hours."
              align="left"
            />

            {/* Contact info cards */}
            <div className="space-y-3">
              {contactInfo.map((item) => (
                <GlowCard key={item.label} className="p-4 flex items-center gap-4" hoverable={false}>
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-xs font-mono text-text-muted uppercase tracking-widest">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-text-primary hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-text-primary">{item.value}</p>
                    )}
                  </div>
                </GlowCard>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-4">Follow Us</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg border border-border-subtle flex items-center justify-center text-text-secondary hover:border-brand-primary hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column: Contact form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ delay: 0.2 }}
          >
            <GlowCard className="p-8" hoverable={false}>
              <ContactForm />
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
