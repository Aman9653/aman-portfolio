/**
 * Shared motion language.
 *
 * One easing curve, one set of durations, one stagger rhythm — used by every
 * section so the whole site animates like a single product.
 */

export const EASE = [0.22, 1, 0.36, 1];
export const EASE_SOFT = [0.65, 0, 0.35, 1];

export const DURATION = {
  fast: 0.32,
  base: 0.55,
  slow: 0.8,
  lazy: 1.1,
};

/** Standard viewport config for scroll reveals — fires once, slightly early. */
export const viewportOnce = { once: true, amount: 0.2, margin: '0px 0px -80px 0px' };
export const viewportEarly = { once: true, amount: 0.12, margin: '0px 0px -40px 0px' };

/* -------------------------------------------------------------- variants -- */

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE } },
};

export const fadeUpLarge = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE } },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -34 },
  show: { opacity: 1, x: 0, transition: { duration: DURATION.base, ease: EASE } },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 34 },
  show: { opacity: 1, x: 0, transition: { duration: DURATION.base, ease: EASE } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: DURATION.slow, ease: EASE } },
};

/** Parent container that staggers its children. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Word-by-word / line-by-line entrance used in the hero headline. */
export const textReveal = {
  hidden: { opacity: 0, y: '55%' },
  show: { opacity: 1, y: '0%', transition: { duration: 0.75, ease: EASE } },
};

/* --------------------------------------------------------------- helpers -- */

/**
 * Strip movement out of a variant set when the visitor prefers reduced motion.
 * Elements still fade in, so nothing appears broken — they just don't travel.
 */
export function reduceVariants(variants, shouldReduce) {
  if (!shouldReduce) return variants;
  return {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.25, ease: 'linear' } },
  };
}

export const hoverLift = {
  rest: { y: 0 },
  hover: { y: -6, transition: { duration: DURATION.fast, ease: EASE } },
};

export const springSoft = { type: 'spring', stiffness: 240, damping: 26, mass: 0.9 };
export const springSnappy = { type: 'spring', stiffness: 420, damping: 32, mass: 0.7 };
