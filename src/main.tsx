import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { HomePage } from './pages/HomePage';
import './index.css';

const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="projects/:id"
            element={
              <Suspense fallback={
                <div className="min-h-screen bg-bg-base flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-brand-primary border-t-transparent animate-spin" />
                </div>
              }>
                <CaseStudyPage />
              </Suspense>
            }
          />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
