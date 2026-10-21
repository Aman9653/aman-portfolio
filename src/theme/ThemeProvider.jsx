import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const STORAGE_KEY = 'ay-theme';
const TRANSITION_CLASS = 'theme-transition';
const TRANSITION_MS = 560;

const ThemeContext = createContext({
  theme: 'light',
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

/** Read whatever the pre-paint script in index.html already decided. */
function readInitialTheme() {
  if (typeof document === 'undefined') return 'light';
  if (document.documentElement.classList.contains('dark')) return 'dark';

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* storage blocked — fall through */
  }

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readInitialTheme);
  const hasChosenRef = useRef(false);
  const timerRef = useRef(null);

  /** Push the theme onto <html> and animate the swap. */
  const applyTheme = useCallback((next, { animate = true } = {}) => {
    const root = document.documentElement;

    if (animate) {
      root.classList.add(TRANSITION_CLASS);
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => root.classList.remove(TRANSITION_CLASS), TRANSITION_MS);
    }

    root.classList.toggle('dark', next === 'dark');
    root.style.colorScheme = next;
    root.setAttribute('data-theme', next);

    // Keep the mobile browser chrome in sync with the page background.
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next === 'dark' ? '#050816' : '#F8FAFC');
  }, []);

  // Sync on mount without animating (avoids a flash on first paint).
  useEffect(() => {
    applyTheme(theme, { animate: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = useCallback(
    (next) => {
      hasChosenRef.current = true;
      setThemeState(next);
      applyTheme(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage blocked — theme still applies for this session */
      }
    },
    [applyTheme]
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  // Follow the OS preference until the visitor makes an explicit choice.
  useEffect(() => {
    const query = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!query) return undefined;

    const handleChange = (event) => {
      let stored = null;
      try {
        stored = window.localStorage.getItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      if (hasChosenRef.current || stored) return;

      const next = event.matches ? 'dark' : 'light';
      setThemeState(next);
      applyTheme(next);
    };

    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, [applyTheme]);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const value = useMemo(
    () => ({ theme, isDark: theme === 'dark', toggleTheme, setTheme }),
    [theme, toggleTheme, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default ThemeProvider;
