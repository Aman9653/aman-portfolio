import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { LuSun, LuMoon } from 'react-icons/lu';
import { useTheme } from '../../theme/ThemeProvider';
import { EASE } from '../../lib/motion';
import cn from '../../lib/cn';

/* Fixed star field so the night side doesn't reshuffle on every render. */
const STARS = [
  { top: '22%', left: '18%', size: 2.5, delay: 0 },
  { top: '58%', left: '30%', size: 1.8, delay: 0.4 },
  { top: '34%', left: '46%', size: 2, delay: 0.8 },
  { top: '68%', left: '58%', size: 1.5, delay: 1.2 },
];

/**
 * Premium day / night switch.
 *
 * The knob springs between ends while the track cross-fades from a daytime
 * sky to a starlit night — matching the 520ms theme transition on the page.
 */
export default function ThemeToggle({ className = '', size = 'md' }) {
  const { isDark, toggleTheme } = useTheme();
  const shouldReduce = useReducedMotion();

  const dims = {
    sm: { track: 'h-8 w-14', knob: 'h-6 w-6', travel: 24, icon: 'text-[11px]' },
    md: { track: 'h-9 w-16', knob: 'h-7 w-7', travel: 28, icon: 'text-xs' },
  }[size];

  const spring = shouldReduce
    ? { duration: 0.001 }
    : { type: 'spring', stiffness: 420, damping: 30, mass: 0.7 };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'group relative shrink-0 overflow-hidden rounded-full border p-1 transition-colors duration-500',
        dims.track,
        isDark
          ? 'border-white/15 bg-[#0B1226] shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]'
          : 'border-sky-200/80 bg-gradient-to-b from-sky-100 to-sky-200/70',
        className
      )}
    >
      {/* Night sky */}
      <span
        className={cn(
          'pointer-events-none absolute inset-0 transition-opacity duration-500',
          isDark ? 'opacity-100' : 'opacity-0'
        )}
      >
        {STARS.map((star) => (
          <motion.span
            key={`${star.top}-${star.left}`}
            className="absolute rounded-full bg-white"
            style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
            animate={shouldReduce ? undefined : { opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: star.delay, ease: 'easeInOut' }}
          />
        ))}
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgb(139_92_246/0.35),transparent_65%)]" />
      </span>

      {/* Daytime clouds */}
      <span
        className={cn(
          'pointer-events-none absolute inset-0 transition-opacity duration-500',
          isDark ? 'opacity-0' : 'opacity-100'
        )}
      >
        <span className="absolute bottom-1 right-2 h-2 w-5 rounded-full bg-white/85" />
        <span className="absolute bottom-2.5 right-4 h-1.5 w-3 rounded-full bg-white/70" />
      </span>

      {/* Knob */}
      <motion.span
        className={cn(
          'relative z-10 flex items-center justify-center rounded-full',
          dims.knob,
          isDark
            ? 'bg-gradient-to-br from-brand-400 to-sky-500 text-white shadow-[0_2px_12px_rgb(139_92_246/0.75)]'
            : 'bg-gradient-to-br from-amber-300 to-orange-400 text-white shadow-[0_2px_10px_rgb(251_146_60/0.65)]'
        )}
        animate={{ x: isDark ? dims.travel : 0 }}
        transition={spring}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? 'moon' : 'sun'}
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, rotate: -70, scale: 0.5 }}
            animate={shouldReduce ? { opacity: 1 } : { opacity: 1, rotate: 0, scale: 1 }}
            exit={shouldReduce ? { opacity: 0 } : { opacity: 0, rotate: 70, scale: 0.5 }}
            transition={{ duration: 0.28, ease: EASE }}
            className={cn('flex', dims.icon)}
          >
            {isDark ? <LuMoon aria-hidden="true" /> : <LuSun aria-hidden="true" />}
          </motion.span>
        </AnimatePresence>
      </motion.span>

      {/* Hover glow */}
      <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 shadow-glow-sm transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  );
}
