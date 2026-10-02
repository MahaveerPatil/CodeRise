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
import { WhatsAppWidget } from '../components/ui/WhatsAppWidget';

export function RootLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Hide loading screen once the page is fully loaded, with a minimum of 600ms
    // so it doesn't flash on fast connections
    const minDelay = new Promise<void>(res => setTimeout(res, 600));
    const onLoad = new Promise<void>(res => {
      if (document.readyState === 'complete') res();
      else window.addEventListener('load', () => res(), { once: true });
    });
    Promise.all([minDelay, onLoad]).then(() => setLoading(false));
  }, []);

  const handleNavClick = (href: string) => {
    // Real route (e.g. /blog)
    if (href.startsWith('/')) {
      window.location.href = href;
      return;
    }
    const id = href.replace('#', '');
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
      <WhatsAppWidget />
      <Footer />
    </>
  );
}
