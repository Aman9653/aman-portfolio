import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { LuMenu, LuX, LuArrowRight } from 'react-icons/lu';
import { navLinks, profile } from '../../data/site';
import useActiveSection from '../../hooks/useActiveSection';
import useScrollLock from '../../hooks/useScrollLock';
import { EASE } from '../../lib/motion';
import cn from '../../lib/cn';
import Logo from '../ui/Logo';
import ThemeToggle from '../ui/ThemeToggle';
import SocialLinks from '../ui/SocialLinks';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduce = useReducedMotion();

  const sectionIds = useMemo(() => navLinks.map((link) => link.id), []);
  const activeSection = useActiveSection(sectionIds);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 16);
  });

  useScrollLock(menuOpen);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  // Close the menu if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const onChange = (event) => event.matches && setMenuOpen(false);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const handleNavClick = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <motion.header
        initial={shouldReduce ? { opacity: 0 } : { y: -80, opacity: 0 }}
        animate={shouldReduce ? { opacity: 1 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-nav"
      >
        <div
          className={cn(
            'transition-all duration-500 ease-premium',
            scrolled ? 'glass-strong border-b border-line/70 shadow-soft' : 'border-b border-transparent bg-transparent'
          )}
        >
          <nav
            aria-label="Primary"
            className={cn(
              'shell flex items-center justify-between transition-all duration-500 ease-premium',
              scrolled ? 'h-16' : 'h-[4.5rem] lg:h-20'
            )}
          >
            <Logo onClick={handleNavClick} />

            {/* ---------- Desktop links ---------- */}
            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'relative inline-flex items-center rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300',
                        isActive ? 'text-content-strong' : 'text-content-muted hover:text-content-strong'
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 rounded-full bg-primary/10 ring-1 ring-inset ring-primary/20"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-dot"
                          className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-gradient"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* ---------- Actions ---------- */}
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />

              <a href="#contact" className="btn btn-primary hidden h-10 px-5 text-[13px] lg:inline-flex">
                Hire Me
                <LuArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                className="icon-btn lg:hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={menuOpen ? 'close' : 'open'}
                    initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                    transition={{ duration: 0.22, ease: EASE }}
                    className="flex text-lg"
                  >
                    {menuOpen ? <LuX aria-hidden="true" /> : <LuMenu aria-hidden="true" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>

        {/* Scroll progress */}
        {!shouldReduce && (
          <motion.div
            aria-hidden="true"
            style={{ scaleX: progress }}
            className="h-[2px] origin-left bg-brand-gradient"
          />
        )}
      </motion.header>

      {/* ---------- Mobile menu ---------- */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-overlay cursor-default bg-canvas/70 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.42, ease: EASE }}
              className="fixed inset-y-0 right-0 z-overlay flex w-[86%] max-w-sm flex-col border-l border-line bg-card shadow-lifted lg:hidden"
            >
              <div className="flex h-[4.5rem] items-center justify-between border-b border-line px-5">
                <Logo onClick={handleNavClick} />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="icon-btn"
                >
                  <LuX aria-hidden="true" />
                </button>
              </div>

              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } } }}
                className="flex-1 overflow-y-auto px-5 py-6"
              >
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.id;
                  return (
                    <motion.li
                      key={link.id}
                      variants={{
                        hidden: { opacity: 0, x: 26 },
                        show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
                      }}
                    >
                      <a
                        href={link.href}
                        onClick={handleNavClick}
                        className={cn(
                          'group flex items-center justify-between rounded-2xl px-4 py-3.5 transition-colors duration-300',
                          isActive ? 'bg-primary/10 text-content-strong' : 'text-content-muted hover:bg-card-alt'
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={cn(
                              'font-mono text-xs',
                              isActive ? 'text-primary' : 'text-content-subtle'
                            )}
                          >
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="font-display text-base font-semibold">{link.label}</span>
                        </span>
                        <LuArrowRight
                          className="text-content-subtle transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary"
                          aria-hidden="true"
                        />
                      </a>
                    </motion.li>
                  );
                })}
              </motion.ul>

              <div className="space-y-4 border-t border-line px-5 py-6">
                <a href="#contact" onClick={handleNavClick} className="btn btn-primary w-full">
                  Hire Me
                  <LuArrowRight aria-hidden="true" />
                </a>
                <SocialLinks size="sm" animate={false} className="justify-center" />
                <p className="text-center text-xs text-content-subtle">{profile.availability}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
