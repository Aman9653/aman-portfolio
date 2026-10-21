import { useEffect, useState } from 'react';

/**
 * Scroll spy: returns the id of the section currently occupying the viewport.
 *
 * Uses a single IntersectionObserver with a band just under the sticky navbar,
 * then picks the most-visible entry — this stays accurate for both very tall
 * and very short sections, unlike a plain "first intersecting" approach.
 */
export default function useActiveSection(ids = [], { offset = 96 } = {}) {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    if (!ids.length || typeof IntersectionObserver === 'undefined') return undefined;

    const visibility = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let best = '';
        let bestRatio = 0;
        visibility.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });

        if (best && bestRatio > 0) setActive(best);
      },
      {
        rootMargin: `-${offset}px 0px -45% 0px`,
        threshold: [0, 0.15, 0.3, 0.5, 0.75, 1],
      }
    );

    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    elements.forEach((el) => observer.observe(el));

    // Landing at the very top should always highlight the first link.
    const handleScroll = () => {
      if (window.scrollY < 80) setActive(ids[0]);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ids, offset]);

  return active;
}
