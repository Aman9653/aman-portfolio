import { motion, useReducedMotion } from 'framer-motion';
import { LuArrowRight, LuDownload, LuBox, LuCalendar, LuGraduationCap, LuTrophy } from 'react-icons/lu';
import { profile, heroStats, heroBadges } from '../../data/site';
import { EASE } from '../../lib/motion';
import cn from '../../lib/cn';
import AmbientBackground from '../background/AmbientBackground';
import WaveDivider from '../ui/WaveDivider';
import SocialLinks from '../ui/SocialLinks';
import SmartImage from '../ui/SmartImage';
import TechIcon from '../ui/TechIcon';
import Counter from '../ui/Counter';

const STAT_ICONS = { box: LuBox, calendar: LuCalendar, graduation: LuGraduationCap, trophy: LuTrophy };

const STAT_TINTS = {
  box: 'from-brand-500/20 to-brand-500/5 text-brand-500',
  smile: 'from-emerald-500/20 to-emerald-500/5 text-emerald-500',
  calendar: 'from-sky-500/20 to-sky-500/5 text-sky-500',
  graduation: 'from-indigo-500/20 to-indigo-500/5 text-indigo-500',
  trophy: 'from-amber-500/20 to-amber-500/5 text-amber-500',
};

export default function Hero() {
  const shouldReduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
  };

  const item = shouldReduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      };

  return (
    <section id="home" className="relative isolate w-full overflow-hidden">
      <AmbientBackground />

      <div className="shell relative z-10 flex min-h-[100svh] flex-col justify-center pb-16 pt-28 sm:pt-32 lg:pb-20 lg:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10 xl:gap-16">
          {/* ------------------------------------------------ Copy ------ */}
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl">
            <motion.div variants={item}>
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-content-muted">
                <span className="text-base" aria-hidden="true">
                  👋
                </span>
                {profile.greeting}
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-5 font-display text-[2.75rem] font-bold leading-[1.04] tracking-tighter text-content-strong sm:text-6xl xl:text-[4.25rem]"
            >
              <span className="text-gradient">{profile.name}</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-3 font-display text-xl font-semibold text-content sm:text-2xl xl:text-[1.75rem]"
            >
              {profile.role}
            </motion.p>

            <motion.p
              variants={item}
              className="mt-5 max-w-lg text-[15px] leading-relaxed text-content-muted sm:text-base"
            >
              {profile.tagline} {profile.intro}
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a href="#projects" className="btn btn-primary group w-full sm:w-auto">
                View My Work
                <LuArrowRight
                  className="transition-transform duration-300 ease-premium group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a href={profile.resumeUrl} download="Aman-Yadav-Resume.pdf" className="btn btn-ghost group w-full sm:w-auto">
                Download Resume
                <LuDownload
                  className="transition-transform duration-300 ease-premium group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost group w-full sm:w-auto"
              >
                View Resume
              </a>
            </motion.div>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
              <span className="text-2xs font-semibold uppercase tracking-label text-content-subtle">Find me on</span>
              <span className="hidden h-px w-8 bg-line-strong sm:block" aria-hidden="true" />
              <SocialLinks size="sm" animate={false} />
            </motion.div>

            <motion.div variants={item} className="mt-7 flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-sm font-medium text-content-muted">{profile.availability}</span>
            </motion.div>
          </motion.div>

          {/* ---------------------------------------- Illustration ------ */}
          <HeroVisual shouldReduce={shouldReduce} />
        </div>

        {/* ------------------------------------------------- Stats ------ */}
        <motion.ul
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.85 } } }}
          className="glass mt-14 grid grid-cols-2 gap-x-4 gap-y-6 rounded-3xl p-5 shadow-soft sm:p-7 lg:mt-16 lg:grid-cols-4 lg:gap-6"
        >
          {heroStats.map((stat) => {
            const Icon = STAT_ICONS[stat.icon] ?? LuBox;
            return (
              <motion.li
                key={stat.id}
                variants={item}
                className="flex items-center gap-3 sm:gap-4 lg:justify-center lg:pl-0"
              >
                <span
                  className={cn(
                    'grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-lg sm:h-12 sm:w-12',
                    STAT_TINTS[stat.icon]
                  )}
                >
                  <Icon aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-baseline font-display text-xl font-bold text-content-strong sm:text-2xl">
                    <Counter value={stat.value} decimals={stat.decimals || 0} />
                    <span className={cn(stat.suffix === '★' && 'ml-1 text-amber-400')}>{stat.suffix}</span>
                  </span>
                  <span className="block truncate text-xs text-content-muted sm:text-[13px]">{stat.label}</span>
                </span>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* --------------------------------------- Scroll indicator ----- */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          aria-label="Scroll to About"
          className="mx-auto mt-10 hidden w-fit flex-col items-center gap-2 text-content-subtle transition-colors hover:text-primary lg:flex"
        >
          <span className="text-2xs font-semibold uppercase tracking-label">Scroll Down</span>
          <span className="relative grid h-9 w-6 place-items-start justify-center rounded-full border border-line-strong pt-1.5">
            <span className="h-1.5 w-1 animate-scroll-hint rounded-full bg-brand-gradient" />
          </span>
        </motion.a>
      </div>

      <WaveDivider className="relative z-10" />
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function HeroVisual({ shouldReduce }) {
  return (
    <motion.div
      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
      animate={shouldReduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.95, ease: EASE, delay: 0.25 }}
      className="relative mx-auto w-full max-w-[34rem] lg:max-w-none"
    >
      {/* Glow behind the composition */}
      <div
        aria-hidden="true"
        className={cn(
          'glow-blob left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 bg-brand-500/55 dark:bg-brand-500/75',
          !shouldReduce && 'animate-pulse-glow'
        )}
      />
      <div
        aria-hidden="true"
        className="glow-blob left-[68%] top-[54%] h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 bg-cyan-400/20 dark:bg-cyan-400/35"
      />

      {/* Main frame */}
      <div className="relative mx-0 sm:mx-[-3%] lg:mx-[-5%]">
        <motion.div
          animate={shouldReduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="gradient-ring gradient-ring-always relative overflow-hidden rounded-[2rem] border border-primary/25 bg-card/35 shadow-lifted backdrop-blur-sm dark:border-cyan-300/20 dark:bg-card/45"
        >
          <SmartImage
            src={profile.heroImage}
            alt="Aman Yadav working at a laptop"
            ratio="1365 / 768"
            priority
            fallbackLabel="Developer illustration"
            className="block rounded-[2rem]"
            imgClassName="scale-100"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas/10 via-transparent to-transparent dark:from-canvas/20"
          />
        </motion.div>

        {/* Floating code chip */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease: EASE }}
          className={cn(
            'glass absolute -bottom-5 left-[-6%] hidden rounded-2xl px-4 py-3 shadow-card sm:block',
            !shouldReduce && 'animate-float-soft'
          )}
        >
          <p className="font-mono text-[11px] leading-relaxed text-content-muted">
            <span className="text-brand-500">const</span> dev <span className="text-sky-500">=</span>{' '}
            <span className="text-cyan-500">"Aman"</span>
            <span className="ml-0.5 inline-block h-3 w-[2px] translate-y-0.5 animate-caret-blink bg-primary align-middle" />
          </p>
        </motion.div>

        {/* Floating status chip */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6, ease: EASE }}
          className={cn(
            'glass absolute -top-4 right-[-4%] hidden items-center gap-2 rounded-2xl px-4 py-2.5 shadow-card sm:flex',
            !shouldReduce && 'animate-float-slow'
          )}
        >
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-500/15 text-emerald-500">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-xs">
            <span className="block font-semibold text-content-strong">Web &amp; mobile</span>
            <span className="block text-content-subtle">Product development</span>
          </span>
        </motion.div>
      </div>

      {/* Floating technology badges */}
      <ul className="pointer-events-none absolute inset-0">
        {heroBadges.map((badge) => (
          <motion.li
            key={badge.id}
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
            animate={shouldReduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            transition={{ delay: 0.75 + badge.delay * 0.35, duration: 0.5, ease: EASE }}
            style={{ top: badge.top, left: badge.left, animationDelay: `${badge.delay}s` }}
            className={cn(
              'absolute',
              !shouldReduce && (badge.delay % 0.7 > 0.35 ? 'animate-float-soft' : 'animate-float-slow')
            )}
          >
            <span className="glass pointer-events-auto flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-[11px] font-semibold text-content shadow-soft transition-transform duration-300 hover:scale-105 sm:px-3 sm:text-xs">
              <TechIcon name={badge.icon} className="text-sm text-primary sm:text-base" />
              <span className="hidden xs:inline">{badge.label}</span>
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
