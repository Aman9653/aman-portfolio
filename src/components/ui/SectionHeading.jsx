import { motion, useReducedMotion } from 'framer-motion';
import { EASE, viewportOnce } from '../../lib/motion';
import cn from '../../lib/cn';

/**
 * The shared section header: eyebrow label, display title and optional
 * supporting line — always animated with the same rhythm so every section
 * opens the same way.
 */
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  className = '',
  titleClassName = '',
}) {
  const shouldReduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const item = shouldReduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.25 } } }
    : {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      };

  const isCenter = align === 'center';

  return (
    <motion.header
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={container}
      className={cn('flex flex-col gap-4', isCenter ? 'items-center text-center' : 'items-start text-left', className)}
    >
      {eyebrow && (
        <motion.div variants={item} className="flex items-center gap-3">
          <span className="h-px w-6 bg-gradient-to-r from-transparent to-primary/70" aria-hidden="true" />
          <span className="eyebrow">{eyebrow}</span>
          <span className="h-px w-6 bg-gradient-to-l from-transparent to-accent/70" aria-hidden="true" />
        </motion.div>
      )}

      <motion.h2
        variants={item}
        className={cn(
          'balance font-display text-3xl font-bold leading-[1.12] tracking-tighter text-content-strong sm:text-4xl lg:text-[2.75rem]',
          isCenter ? 'max-w-3xl' : 'max-w-2xl',
          titleClassName
        )}
      >
        {title}{' '}
        {highlight && <span className="text-gradient">{highlight}</span>}
      </motion.h2>

      {description && (
        <motion.p
          variants={item}
          className={cn(
            'balance text-base leading-relaxed text-content-muted sm:text-[17px]',
            isCenter ? 'max-w-2xl' : 'max-w-xl'
          )}
        >
          {description}
        </motion.p>
      )}

      <motion.div
        variants={item}
        aria-hidden="true"
        className={cn('h-1 w-16 rounded-full bg-brand-gradient', isCenter && 'mx-auto')}
      />
    </motion.header>
  );
}
