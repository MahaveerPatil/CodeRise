import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { HomePage } from './pages/HomePage';
import './index.css';

const LoadingFallback = () => (
  <div className="min-h-screen bg-bg-base flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-brand-primary border-t-transparent animate-spin" />
  </div>
);

const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Admin — no navbar/footer */}
        <Route
          path="/admin"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <AdminPage />
            </Suspense>
          }
        />
        <Route
          path="/admin/reset-password"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <AdminPage resetMode />
            </Suspense>
          }
        />
        {/* Main site */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="projects/:id"
            element={<Suspense fallback={<LoadingFallback />}><CaseStudyPage /></Suspense>}
          />
          <Route
            path="blog"
            element={<Suspense fallback={<LoadingFallback />}><BlogPage /></Suspense>}
          />
          <Route
            path="blog/:slug"
            element={<Suspense fallback={<LoadingFallback />}><BlogPostPage /></Suspense>}
          />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
