import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/navigation/Navbar';
import { MobileMenu } from '../components/navigation/MobileMenu';
import { ScrollProgress } from '../components/effects/ScrollProgress';
import { CustomCursor } from '../components/ui/CustomCursor';
import { SEOHead } from '../components/seo/SEOHead';
import { LoadingScreen } from '../components/ui/LoadingScreen';
import { PageWrapper } from './PageWrapper';
import { EasterEgg } from '../components/effects/EasterEgg';
import { Footer } from './Footer';

export function RootLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '');
    // If not on home page, navigate home first then scroll
    if (location.pathname !== '/') {
      window.location.href = `/${href}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <LoadingScreen isVisible={loading} />
      <SEOHead />
      <CustomCursor />
      <ScrollProgress />
      <Navbar onMenuToggle={setIsMenuOpen} isMenuOpen={isMenuOpen} />
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavClick={handleNavClick}
      />
      <AnimatePresence mode="wait">
        <PageWrapper key={location.pathname}>
          <Outlet />
        </PageWrapper>
      </AnimatePresence>
      <EasterEgg />
      <Footer />
    </>
  );
}
