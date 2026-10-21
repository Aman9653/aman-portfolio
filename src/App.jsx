import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ThemeProvider from './theme/ThemeProvider';
import RouteSkeleton from './components/RouteSkeleton';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function RouteContent() {
  const location = useLocation();
  const shouldReduce = useReducedMotion();
  const [showSkeleton, setShowSkeleton] = useState(false);
  const skeletonShownAt = useRef(0);
  const readyPath = useRef(null);
  const showTimer = useRef(null);
  const hideTimer = useRef(null);

  useEffect(() => {
    if (window.scrollX !== 0 || window.scrollY !== 0) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
    if (location.hash) {
      window.requestAnimationFrame(() => {
        document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: 'auto' });
      });
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    setShowSkeleton(false);
    skeletonShownAt.current = 0;
    window.clearTimeout(showTimer.current);
    window.clearTimeout(hideTimer.current);
    showTimer.current = window.setTimeout(() => {
      if (readyPath.current === location.pathname) return;
      skeletonShownAt.current = Date.now();
      setShowSkeleton(true);
    }, 150);

    return () => {
      window.clearTimeout(showTimer.current);
      window.clearTimeout(hideTimer.current);
    };
  }, [location.pathname]);

  const handlePageReady = useCallback(() => {
    readyPath.current = location.pathname;
    window.clearTimeout(showTimer.current);
    if (!skeletonShownAt.current) return;

    const remaining = Math.max(0, 300 - (Date.now() - skeletonShownAt.current));
    hideTimer.current = window.setTimeout(() => {
      skeletonShownAt.current = 0;
      setShowSkeleton(false);
    }, remaining);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div inert={showSkeleton}>
          <Suspense fallback={null}>
            <Routes location={location}>
              <Route path="/" element={<ReadyPage onReady={handlePageReady} visible={!showSkeleton}><HomePage /></ReadyPage>} />
              <Route path="/projects/:slug" element={<ReadyPage onReady={handlePageReady} visible={!showSkeleton}><ProjectDetailPage /></ReadyPage>} />
              <Route path="*" element={<ReadyPage onReady={handlePageReady} visible={!showSkeleton}><NotFoundPage /></ReadyPage>} />
            </Routes>
          </Suspense>
        </div>
        <AnimatePresence>
          {showSkeleton && <RouteSkeleton key={location.pathname} pathname={location.pathname} />}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

function ReadyPage({ children, onReady, visible }) {
  useEffect(() => {
    onReady();
  }, [onReady]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: visible ? 1 : 0 }} transition={{ duration: 0.4 }}>
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <HelmetProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <RouteContent />
        </BrowserRouter>
      </HelmetProvider>
    </ThemeProvider>
  );
}
