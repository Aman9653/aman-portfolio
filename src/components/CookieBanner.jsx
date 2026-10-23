import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { updateAnalyticsConsent } from '../lib/analytics';

const CONSENT_KEY = 'cookie-consent';
const INTRO_STORAGE_KEY = 'aman-portfolio-intro';
const CookieConsentContext = createContext(null);

function readConsent() {
  try {
    const choice = window.localStorage.getItem(CONSENT_KEY);
    return choice === 'accepted' || choice === 'declined' ? choice : null;
  } catch (error) {
    console.error('Unable to read cookie consent.', error);
    return null;
  }
}

function readIntroState() {
  if (typeof window === 'undefined' || window.location.pathname !== '/') return false;
  try {
    return window.sessionStorage.getItem(INTRO_STORAGE_KEY) !== 'seen';
  } catch {
    return true;
  }
}

export function CookieConsentProvider({ children }) {
  const [consent, setConsent] = useState(readConsent);
  const [introActive, setIntroActive] = useState(readIntroState);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const chooseConsent = useCallback((choice) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, choice);
    } catch (error) {
      console.error('Unable to save cookie consent.', error);
    }

    setConsent(choice);
    setSettingsOpen(false);
    updateAnalyticsConsent(choice === 'accepted' ? 'granted' : 'denied');
  }, []);

  const openSettings = useCallback(() => setSettingsOpen(true), []);
  const value = useMemo(
    () => ({ consent, chooseConsent, introActive, setIntroActive, settingsOpen, openSettings }),
    [consent, chooseConsent, introActive, settingsOpen, openSettings]
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) throw new Error('useCookieConsent must be used inside CookieConsentProvider.');
  return context;
}

export default function CookieBanner() {
  const { consent, chooseConsent, introActive, settingsOpen } = useCookieConsent();
  const shouldReduceMotion = useReducedMotion();
  const visible = !introActive && (!consent || settingsOpen);

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          role="dialog"
          aria-label="Cookie consent"
          aria-modal="false"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.24, ease: 'easeOut' }}
          className="fixed inset-x-0 bottom-0 z-toast px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] sm:px-6 sm:pb-[calc(env(safe-area-inset-bottom)+1.25rem)]"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-2xl border border-line bg-card p-4 shadow-card sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-5">
            <p className="max-w-2xl text-sm leading-relaxed text-content-muted">
              I use cookies to count visits and understand how this site is used. No personal data is collected.
            </p>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <Link
                to="/privacy"
                className="rounded-lg px-3 py-2 text-sm font-medium text-content-muted underline-offset-4 hover:text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              >
                Privacy
              </Link>
              <button
                type="button"
                onClick={() => chooseConsent('declined')}
                className="rounded-xl border border-line px-4 py-2 text-sm font-semibold text-content-strong transition-colors hover:bg-card-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => {
                  chooseConsent('accepted');
                }}
                className="rounded-xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-glow-sm transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
