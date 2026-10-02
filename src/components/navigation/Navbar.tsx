import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { navLinks } from '../../data/navigation';
import { cn } from '../../utils/cn';

type ScrollState = 'transparent' | 'glass' | 'scrolled';

interface NavbarProps {
  onMenuToggle: (open: boolean) => void;
  isMenuOpen: boolean;
}

export function Navbar({ onMenuToggle, isMenuOpen }: NavbarProps) {
  const [scrollState, setScrollState] = useState<ScrollState>('transparent');
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y === 0) setScrollState('transparent');
      else if (y < 100) setScrollState('glass');
      else setScrollState('scrolled');

      // Update active section based on scroll position
      const sectionIds = navLinks
        .filter(l => l.href.startsWith('#'))
        .map(l => l.href.replace('#', ''));

      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith('/')) { navigate(href); return; }
    const id = href.replace('#', '');
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      scrollToId(id);
    }
  };

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (location.pathname === '/' && state?.scrollTo) {
      const id = state.scrollTo;
      const t = setTimeout(() => scrollToId(id), 100);
      navigate('/', { replace: true, state: {} });
      return () => clearTimeout(t);
    }
  }, [location, navigate]);

  const isScrolled = scrollState === 'scrolled';

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-brand-primary focus:text-white focus:rounded-lg focus:text-sm"
      >
        Skip to main content
      </a>

      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-bg-base/95 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.04)]'
            : scrollState === 'glass'
            ? 'bg-bg-base/50 backdrop-blur-lg border-b border-white/[0.04]'
            : 'bg-transparent'
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className={cn(
            'flex items-center justify-between transition-all duration-300',
            isScrolled ? 'h-14' : 'h-16'
          )}>

            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
              className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg p-1 group"
              aria-label="CodeRise — Home"
            >
              {/* Logo mark */}
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-primary via-brand-accent to-[#FFD93D] flex items-center justify-center shadow-glow group-hover:shadow-glow-strong transition-all duration-300 group-hover:scale-105 shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  {/* Rising bar chart — three bars growing left to right */}
                  <rect x="1"  y="10" width="3" height="5" rx="1" fill="white" opacity="0.7" />
                  <rect x="6"  y="6"  width="3" height="9" rx="1" fill="white" opacity="0.85" />
                  <rect x="11" y="2"  width="3" height="13" rx="1" fill="white" />
                  {/* Small upward arrow above tallest bar */}
                  <path d="M12.5 1.5 L12.5 0 M11.5 0.9 L12.5 0 L13.5 0.9" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
                </svg>
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
                  CodeRise
                </span>
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center">
              {/* Pill container */}
              <div className={cn(
                'flex items-center gap-0.5 rounded-full px-1.5 py-1 transition-all duration-300',
                isScrolled ? 'bg-white/[0.04] border border-white/[0.06]' : ''
              )}>
                {navLinks.map((link) => {
                  const isActive = location.pathname === '/'
                    && link.href.startsWith('#')
                    && activeSection === link.href.replace('#', '');
                  const isRoute = link.href.startsWith('/');
                  const isRouteActive = isRoute && location.pathname === link.href;

                  return (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className={cn(
                        'relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
                        (isActive || isRouteActive)
                          ? 'text-text-primary'
                          : 'text-text-muted hover:text-text-secondary'
                      )}
                    >
                      {(isActive || isRouteActive) && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.1]"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavClick('#contact')}
                className={cn(
                  'hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold',
                  'bg-gradient-to-r from-brand-primary to-brand-accent text-white',
                  'hover:shadow-glow hover:scale-[1.03] active:scale-[0.97]',
                  'transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base'
                )}
              >
                Start a Project
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Hamburger */}
              <button
                onClick={() => onMenuToggle(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full border border-border-subtle hover:border-border-default hover:bg-bg-elevated transition-all gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                <motion.span animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} className="w-4 h-0.5 bg-text-primary block" />
                <motion.span animate={isMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.2 }} className="w-4 h-0.5 bg-text-primary block" />
                <motion.span animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} className="w-4 h-0.5 bg-text-primary block" />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>
    </>
  );
}
