import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ThemeProvider from './theme/ThemeProvider';
import RouteSkeleton from './components/RouteSkeleton';
import CookieBanner, { CookieConsentProvider, useCookieConsent } from './components/CookieBanner';
import { initAnalytics, setDefaultAnalyticsConsent, trackEvent, trackPageView } from './lib/analytics';
import ANALYTICS_EVENTS from './lib/events';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));

function RouteTracker() {
  const location = useLocation();
  const { consent } = useCookieConsent();
  const trackedLocation = useRef(null);
  const readyLocation = useRef(null);
  const sentDepths = useRef(new Set());
  const path = `${location.pathname}${location.search}`;

  useEffect(() => {
    setDefaultAnalyticsConsent();
  }, []);

  useEffect(() => {
    if (trackedLocation.current !== path) {
      trackedLocation.current = path;
      readyLocation.current = null;
      sentDepths.current = new Set();
    }
    let routeReadyFrame = null;

    const trackScrollDepth = () => {
      if (!document.querySelector('main')) return;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollableHeight <= 0
        ? 100
        : Math.floor((window.scrollY / scrollableHeight) * 100);

      [25, 50, 75, 100].forEach((depth) => {
        if (percent >= depth && !sentDepths.current.has(depth)) {
          if (trackEvent(ANALYTICS_EVENTS.SCROLL_DEPTH, { depth_percent: depth })) {
            sentDepths.current.add(depth);
          }
        }
      });
    };

    const onRouteReady = (event) => {
      if (event.detail !== path) return;
      readyLocation.current = path;
      if (consent === 'accepted') {
        routeReadyFrame = window.requestAnimationFrame(() => {
          initAnalytics();
          trackPageView(path);
          trackScrollDepth();
        });
      }
    };

    window.addEventListener('portfolio-route-ready', onRouteReady);
    if (consent === 'accepted' && readyLocation.current === path) {
      initAnalytics();
      trackPageView(path);
      trackScrollDepth();
    }
    if (consent !== 'accepted') {
      return () => {
        window.removeEventListener('portfolio-route-ready', onRouteReady);
        if (routeReadyFrame !== null) window.cancelAnimationFrame(routeReadyFrame);
      };
    }

    window.addEventListener('scroll', trackScrollDepth, { passive: true });
    window.addEventListener('resize', trackScrollDepth);
    return () => {
      window.removeEventListener('portfolio-route-ready', onRouteReady);
      window.removeEventListener('scroll', trackScrollDepth);
      window.removeEventListener('resize', trackScrollDepth);
      if (routeReadyFrame !== null) window.cancelAnimationFrame(routeReadyFrame);
    };
  }, [consent, path]);

  return null;
}

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
    window.dispatchEvent(
      new CustomEvent('portfolio-route-ready', {
        detail: `${location.pathname}${location.search}`,
      })
    );
    window.clearTimeout(showTimer.current);
    if (!skeletonShownAt.current) return;

    const remaining = Math.max(0, 300 - (Date.now() - skeletonShownAt.current));
    hideTimer.current = window.setTimeout(() => {
      skeletonShownAt.current = 0;
      setShowSkeleton(false);
    }, remaining);
  }, [location.pathname, location.search]);

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
              <Route path="/privacy" element={<ReadyPage onReady={handlePageReady} visible={!showSkeleton}><PrivacyPage /></ReadyPage>} />
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
    <CookieConsentProvider>
      <ThemeProvider>
        <HelmetProvider>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <RouteTracker />
            <RouteContent />
            <CookieBanner />
          </BrowserRouter>
        </HelmetProvider>
      </ThemeProvider>
    </CookieConsentProvider>
  );
}
