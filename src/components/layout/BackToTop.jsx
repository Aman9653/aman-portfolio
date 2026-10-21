import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { LuArrowUp } from 'react-icons/lu';
import { EASE } from '../../lib/motion';

/**
 * Floating scroll-to-top control with a circular progress ring showing how far
 * through the page the visitor is. Appears once past the hero.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const shouldReduce = useReducedMotion();

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 26, restDelta: 0.001 });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > 700);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: shouldReduce ? 'auto' : 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ duration: 0.32, ease: EASE }}
          whileHover={shouldReduce ? undefined : { y: -3 }}
          className="glass-strong fixed bottom-5 right-5 z-nav grid h-12 w-12 place-items-center rounded-full text-content-strong shadow-card transition-shadow duration-300 hover:shadow-glow sm:bottom-7 sm:right-7"
        >
          <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="24" cy="24" r="21" fill="none" stroke="rgb(var(--color-border))" strokeWidth="2" />
            <motion.circle
              cx="24"
              cy="24"
              r="21"
              fill="none"
              stroke="url(#back-to-top-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength="1"
              style={{ pathLength: progress }}
            />
            <defs>
              <linearGradient id="back-to-top-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#22D3EE" />
              </linearGradient>
            </defs>
          </svg>
          <LuArrowUp className="relative text-lg" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
