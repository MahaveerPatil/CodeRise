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
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y === 0) setScrollState('transparent');
      else if (y < 100) setScrollState('glass');
      else setScrollState('scrolled');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // set initial state
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
    const id = href.replace('#', '');
    if (location.pathname !== '/') {
      // Navigate home first, then scroll after the page renders
      navigate('/', { state: { scrollTo: id } });
    } else {
      scrollToId(id);
    }
  };

  // After navigating to home, perform the deferred scroll
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (location.pathname === '/' && state?.scrollTo) {
      const id = state.scrollTo;
      // Small delay to let the page render
      const t = setTimeout(() => scrollToId(id), 100);
      // Clear the state so it doesn't re-fire
      navigate('/', { replace: true, state: {} });
      return () => clearTimeout(t);
    }
  }, [location, navigate]);

  const bgClass = {
    transparent: 'bg-transparent',
    glass: 'bg-bg-base/60 backdrop-blur-md border-b border-border-subtle',
    scrolled: 'bg-bg-base/90 backdrop-blur-xl border-b border-border-subtle shadow-elevated',
  }[scrollState];

  return (
    <>
      {/* Skip to main content — first focusable element */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-brand-primary focus:text-white focus:rounded-lg focus:text-sm"
      >
        Skip to main content
      </a>

      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          bgClass
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div
            className={cn(
              'flex items-center justify-between transition-all duration-300',
              scrollState === 'scrolled' ? 'h-14' : 'h-16'
            )}
          >
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg p-1"
              aria-label="CodeRise — Home"
            >
              <span className="font-display font-bold text-xl tracking-tight">
                <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
                  CodeRise
                </span>
              </span>
            </a>

            {/* Desktop nav links — hidden below md */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary rounded-lg hover:bg-bg-elevated transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA button + hamburger */}
            <div className="flex items-center gap-3">
              {/* "Start a Project" CTA — desktop only */}
              <button
                onClick={() => handleNavClick('#contact')}
                className="hidden md:inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-brand-primary to-brand-accent text-white hover:shadow-glow transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
              >
                Start a Project →
              </button>

              {/* Hamburger — mobile only, min 44×44px tap target */}
              <button
                onClick={() => onMenuToggle(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="md:hidden flex flex-col justify-center items-center w-11 h-11 rounded-lg hover:bg-bg-elevated transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary gap-1.5"
              >
                {/* Top bar */}
                <motion.span
                  animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-0.5 bg-text-primary block"
                />
                {/* Middle bar */}
                <motion.span
                  animate={isMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-0.5 bg-text-primary block"
                />
                {/* Bottom bar */}
                <motion.span
                  animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-0.5 bg-text-primary block"
                />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>
    </>
  );
}
