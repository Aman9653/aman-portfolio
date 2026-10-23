const GA_ID = import.meta.env.VITE_GA_ID?.trim() ?? '';
const SCRIPT_ID = 'google-analytics-script';

let initialized = false;
let defaultConsentSet = false;
let lastPageView = null;
const SAFE_EVENT_PARAMS = new Set(['project_slug', 'new_theme', 'depth_percent']);

function isAnalyticsAvailable() {
  return import.meta.env.PROD && Boolean(GA_ID);
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || ((...args) => window.dataLayer.push(args));
}

export function setDefaultAnalyticsConsent() {
  if (!isAnalyticsAvailable() || defaultConsentSet) return;

  ensureGtag();
  window.gtag('consent', 'default', { analytics_storage: 'denied' });
  defaultConsentSet = true;
}

export function updateAnalyticsConsent(consent) {
  if (!isAnalyticsAvailable()) return;

  setDefaultAnalyticsConsent();
  if (consent === 'granted' && !initialized) {
    initAnalytics();
    return;
  }

  ensureGtag();
  window.gtag('consent', 'update', { analytics_storage: consent });
}

export function initAnalytics() {
  if (!isAnalyticsAvailable() || initialized) return;

  setDefaultAnalyticsConsent();
  ensureGtag();
  window.gtag('consent', 'update', { analytics_storage: 'granted' });
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {
    anonymize_ip: true,
    send_page_view: false,
  });

  initialized = true;
  if (!document.getElementById(SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
    script.onerror = () => console.error('Unable to load Google Analytics.');
    document.head.appendChild(script);
  }
}

export function trackPageView(path) {
  if (!initialized || lastPageView === path) return;

  lastPageView = path;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: document.title,
  });
}

export function trackEvent(name, params = {}) {
  if (!initialized) return false;

  const safeParams = Object.fromEntries(
    Object.entries(params).filter(([key]) => SAFE_EVENT_PARAMS.has(key))
  );
  window.gtag('event', name, safeParams);
  return true;
}
