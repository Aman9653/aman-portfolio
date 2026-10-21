import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

/**
 * Counts from 0 to `value` the first time it scrolls into view.
 * Driven by rAF (not a per-frame React state spring) so it stays cheap, and
 * skipped entirely for reduced-motion visitors.
 */
export default function Counter({ value = 0, duration = 1600, decimals = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;

    if (shouldReduce) {
      setDisplay(value);
      return undefined;
    }

    let frame;
    let start;

    const tick = (timestamp) => {
      if (start === undefined) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplay(value * easeOutCubic(progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, shouldReduce]);

  return (
    <span ref={ref} className={className}>
      {display.toFixed(decimals)}
    </span>
  );
}
