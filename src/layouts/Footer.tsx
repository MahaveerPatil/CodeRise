import { Link } from 'react-router-dom';
import { navLinks } from '../data/navigation';
import { services } from '../data/services';

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/CodeRise',
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/CodeRise',
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/CodeRise',
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/CodeRise',
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
];

const smoothScroll = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 84;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-bg-base overflow-hidden">
      {/* Top separator */}
      <div className="absolute top-0 inset-x-0 h-px maroon-divider" aria-hidden="true" />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,107,107,0.06) 0%, transparent 60%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main footer grid */}
        <div className="pt-16 pb-12 grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Brand — wider column */}
          <div className="md:col-span-4">
            {/* Logo mark + wordmark */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-primary via-brand-accent to-[#FFD93D] flex items-center justify-center shadow-glow shrink-0">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="1"  y="10" width="3" height="5" rx="1" fill="white" opacity="0.7" />
                  <rect x="6"  y="6"  width="3" height="9" rx="1" fill="white" opacity="0.85" />
                  <rect x="11" y="2"  width="3" height="13" rx="1" fill="white" />
                  <path d="M12.5 1.5 L12.5 0 M11.5 0.9 L12.5 0 L13.5 0.9" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
                </svg>
              </div>
              <span className="font-display font-bold text-xl bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
                CodeRise
              </span>
            </div>

            <p className="text-text-muted text-sm leading-relaxed mb-6 max-w-xs">
              Premium software development from Belagavi, Karnataka. We turn ambitious ideas into technology that works.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 rounded-lg border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-text-muted hover:text-brand-primary hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div className="md:col-span-2 md:col-start-6">
            <h3 className="text-text-primary text-xs font-semibold uppercase tracking-[0.12em] mb-4">Company</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => link.href.startsWith('/') ? null : smoothScroll(link.href.replace('#', ''))}
                    className="text-text-muted text-sm hover:text-text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h3 className="text-text-primary text-xs font-semibold uppercase tracking-[0.12em] mb-4">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => smoothScroll('services')}
                    className="text-text-muted text-sm hover:text-text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h3 className="text-text-primary text-xs font-semibold uppercase tracking-[0.12em] mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@coderise.com" className="text-text-muted text-sm hover:text-text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded block">
                  hello@coderise.com
                </a>
              </li>
              <li>
                <a href="tel:+918310659343" className="text-text-muted text-sm hover:text-text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded block">
                  +91 8310659343
                </a>
              </li>
              <li>
                <span className="text-text-muted text-sm block leading-relaxed">
                  Devaki Lodge, Kakatiyas<br />
                  Belagavi 590001, KA
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-xs">
            © {year} CodeRise. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="text-text-muted text-xs hover:text-text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary rounded">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-text-muted text-xs hover:text-text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary rounded">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
