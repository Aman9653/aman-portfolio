import { motion, useReducedMotion } from 'framer-motion';
import { EASE, viewportOnce } from '../../lib/motion';

const OFFSETS = {
  up: { x: 0, y: 30 },
  down: { x: 0, y: -30 },
  left: { x: 34, y: 0 },
  right: { x: -34, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * The site-wide scroll reveal: opacity 0 → 1 with a short travel, fired once
 * when the element enters the viewport. Movement is dropped automatically for
 * visitors who prefer reduced motion.
 */
export default function Reveal({
  children,
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.55,
  distance,
  scale,
  className = '',
  viewport = viewportOnce,
  ...rest
}) {
  const shouldReduce = useReducedMotion();
  const Component = motion[as] ?? motion.div;

  const base = OFFSETS[direction] ?? OFFSETS.up;
  const offset = distance
    ? { x: base.x === 0 ? 0 : Math.sign(base.x) * distance, y: base.y === 0 ? 0 : Math.sign(base.y) * distance }
    : base;

  const hidden = shouldReduce
    ? { opacity: 0 }
    : { opacity: 0, ...offset, ...(scale ? { scale } : null) };

  const show = shouldReduce
    ? { opacity: 1, transition: { duration: 0.25 } }
    : { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration, delay, ease: EASE } };

  return (
    <Component
      className={className}
      initial={hidden}
      whileInView={show}
      viewport={viewport}
      {...rest}
    >
      {children}
    </Component>
  );
}

/**
 * Reveal a list of children one after another. Children must be wrapped in
 * <RevealItem/> (or use the `item` variants directly).
 */
export function RevealGroup({
  children,
  className = '',
  stagger = 0.09,
  delayChildren = 0,
  viewport = viewportOnce,
  as = 'div',
  ...rest
}) {
  const Component = motion[as] ?? motion.div;
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren } } }}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function RevealItem({ children, className = '', direction = 'up', as = 'div', ...rest }) {
  const shouldReduce = useReducedMotion();
  const Component = motion[as] ?? motion.div;
  const offset = OFFSETS[direction] ?? OFFSETS.up;

  const variants = shouldReduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.25 } } }
    : {
        hidden: { opacity: 0, ...offset },
        show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.55, ease: EASE } },
      };

  return (
    <Component className={className} variants={variants} {...rest}>
      {children}
    </Component>
  );
}
