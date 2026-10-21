import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../../data/site';
import cn from '../../lib/cn';

/**
 * Monogram mark — a gradient-stroked "A" inside a soft glass tile.
 * Used in the navbar, footer and mobile menu.
 */
export function LogoMark({ className = '', size = 'md' }) {
  const dims = {
    sm: 'h-8 w-8 rounded-lg',
    md: 'h-9 w-9 rounded-xl',
    lg: 'h-11 w-11 rounded-2xl',
  }[size];

  return (
    <span
      className={cn(
        'relative grid shrink-0 place-items-center overflow-hidden border border-primary/25 bg-card',
        dims,
        className
      )}
    >
      <span className="absolute inset-0 bg-brand-gradient-soft" aria-hidden="true" />
      <svg viewBox="0 0 24 24" className="relative h-[58%] w-[58%]" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="ay-logo-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="55%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
        <path
          d="M3.5 20.5 12 3.5l8.5 17"
          stroke="url(#ay-logo-gradient)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M7.6 14.4h8.8" stroke="url(#ay-logo-gradient)" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export default function Logo({ href = '#home', className = '', showName = true, onClick }) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.a
      href={href}
      onClick={onClick}
      aria-label={`${profile.name} — back to top`}
      className={cn('group inline-flex items-center gap-2.5', className)}
      whileHover={shouldReduce ? undefined : { scale: 1.02 }}
      whileTap={shouldReduce ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
    >
      <span className="relative">
        <LogoMark className="transition-shadow duration-300 group-hover:shadow-glow-sm" />
      </span>
      {showName && (
        <span className="font-display text-[15px] font-bold tracking-tight text-content-strong sm:text-base">
          {profile.firstName} <span className="text-gradient-static">{profile.lastName}</span>
        </span>
      )}
    </motion.a>
  );
}
