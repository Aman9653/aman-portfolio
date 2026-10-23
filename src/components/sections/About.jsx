import { motion, useReducedMotion } from 'framer-motion';
import {
  LuDownload,
  LuPuzzle,
  LuTarget,
  LuSparkles,
  LuUser,
  LuMail,
  LuMapPin,
  LuClock,
  LuSmartphone,
  LuServer,
  LuPalette,
  LuGauge,
  LuArrowRight,
} from 'react-icons/lu';
import { about, profile } from '../../data/site';
import { EASE } from '../../lib/motion';
import cn from '../../lib/cn';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import Reveal, { RevealGroup, RevealItem } from '../ui/Reveal';
import { trackEvent } from '../../lib/analytics';
import ANALYTICS_EVENTS from '../../lib/events';
import SmartImage from '../ui/SmartImage';

const FACT_ICONS = { user: LuUser, mail: LuMail, pin: LuMapPin, clock: LuClock };
const STRENGTH_ICONS = { puzzle: LuPuzzle, target: LuTarget, sparkles: LuSparkles };
const SERVICE_ICONS = { phone: LuSmartphone, server: LuServer, palette: LuPalette, gauge: LuGauge };

const ACCENT_STYLES = {
  purple: 'from-brand-500/20 to-brand-500/5 text-brand-500 group-hover:shadow-glow-sm',
  blue: 'from-sky-500/20 to-sky-500/5 text-sky-500',
  cyan: 'from-cyan-400/20 to-cyan-400/5 text-cyan-500',
};

export default function About() {
  const shouldReduce = useReducedMotion();

  return (
    <Section id="about" tinted glow="left">
      <SectionHeading
        eyebrow={about.eyebrow}
        title="The developer"
        highlight="behind the work"
        description="A short introduction to how I work, what I care about, and the kind of problems I like to solve."
      />

      <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        {/* ------------------------------------------------ Profile card -- */}
        <Reveal direction="right" className="relative mx-auto w-full max-w-md lg:mx-0">
          <div className="relative">
            {/* Offset gradient frame */}
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2.25rem] bg-brand-gradient opacity-20 blur-2xl"
            />

            <motion.div
              animate={shouldReduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="gradient-ring gradient-ring-always relative overflow-hidden rounded-[2rem] border border-line bg-card shadow-lifted"
            >
              <SmartImage
                src={profile.photo}
                alt={`${profile.name}, ${profile.role}`}
                ratio="520 / 620"
                fallbackLabel="Add your portrait at public/assets/images/about-portrait.png"
                className="rounded-[2rem]"
                imgClassName="object-top"
              />

              {/* Bottom info bar */}
              <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/10 bg-[#0B1226]/80 p-4 backdrop-blur-md">
                <p className="font-display text-base font-bold text-white">{profile.name}</p>
                <p className="mt-0.5 text-xs text-slate-300">{profile.role}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {['React.js', 'TypeScript', 'MySQL'].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Experience badge */}
            <motion.div
              initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, rotate: -8 }}
              whileInView={shouldReduce ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
              className="glass-strong absolute -right-4 top-8 rounded-2xl px-4 py-3 text-center shadow-card sm:-right-6"
            >
              <span className="block font-display text-2xl font-bold text-gradient-static">
                {about.experienceBadge.value}
              </span>
              <span className="mt-0.5 block max-w-[5.5rem] text-[10px] font-semibold uppercase leading-tight tracking-wide text-content-muted">
                {about.experienceBadge.label}
              </span>
            </motion.div>
          </div>
        </Reveal>

        {/* --------------------------------------------------- Narrative -- */}
        <div>
          <Reveal direction="left">
            <h3 className="font-display text-2xl font-bold text-content-strong sm:text-3xl">{about.title}</h3>
          </Reveal>

          <RevealGroup className="mt-5 space-y-4" stagger={0.1}>
            {about.paragraphs.map((paragraph, index) => (
              <RevealItem key={index} as="p" className="text-[15px] leading-relaxed text-content-muted sm:text-base">
                {paragraph}
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Quick facts */}
          <RevealGroup className="mt-8 grid gap-3 sm:grid-cols-2" stagger={0.07}>
            {about.quickFacts.map((fact) => {
              const Icon = FACT_ICONS[fact.icon] ?? LuUser;
              return (
                <RevealItem
                  key={fact.id}
                  className="flex items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3 transition-colors duration-300 hover:border-primary/35"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="text-[15px]" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-semibold uppercase tracking-wide text-content-subtle">
                      {fact.label}
                    </span>
                    <span className="block truncate text-sm font-medium text-content-strong">{fact.value}</span>
                  </span>
                </RevealItem>
              );
            })}
          </RevealGroup>

          {/* Strengths */}
          <RevealGroup className="mt-8 grid gap-3 sm:grid-cols-3" stagger={0.08}>
            {about.strengths.map((strength) => {
              const Icon = STRENGTH_ICONS[strength.icon] ?? LuSparkles;
              return (
                <RevealItem
                  key={strength.id}
                  className="gradient-ring group surface-card surface-card-hover rounded-2xl p-4"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gradient-soft text-primary">
                    <Icon aria-hidden="true" />
                  </span>
                  <h4 className="mt-3 font-display text-[15px] font-bold text-content-strong">{strength.title}</h4>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-content-muted">{strength.description}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>

          <Reveal delay={0.15} className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={profile.resumeUrl}
              download="Aman-Yadav-Resume.pdf"
              onClick={() => trackEvent(ANALYTICS_EVENTS.DOWNLOAD_RESUME)}
              className="btn btn-primary group w-full sm:w-auto"
            >
              Download Resume
              <LuDownload
                className="transition-transform duration-300 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href={profile.resumeUrl}
              onClick={() => trackEvent(ANALYTICS_EVENTS.VIEW_RESUME)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost w-full sm:w-auto"
            >
              View Resume
            </a>
            <a href="#contact" className="btn btn-ghost group w-full sm:w-auto">
              Let's talk
              <LuArrowRight className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>

      {/* ------------------------------------------------------ Services -- */}
      <div className="mt-16 lg:mt-20">
        <Reveal className="mb-8 flex flex-col items-center gap-2 text-center">
          <span className="eyebrow">What I Do</span>
          <h3 className="font-display text-2xl font-bold text-content-strong sm:text-3xl">
            Services I <span className="text-gradient">specialise in</span>
          </h3>
        </Reveal>

        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.09}>
          {about.services.map((service) => {
            const Icon = SERVICE_ICONS[service.icon] ?? LuSmartphone;
            return (
              <RevealItem
                key={service.id}
                className="gradient-ring group surface-card surface-card-hover relative overflow-hidden p-6"
              >
                <span
                  aria-hidden="true"
                  className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-gradient opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
                />
                <span
                  className={cn(
                    'relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br text-xl transition-shadow duration-300',
                    ACCENT_STYLES[service.accent] ?? ACCENT_STYLES.purple
                  )}
                >
                  <Icon aria-hidden="true" />
                </span>
                <h4 className="relative mt-4 font-display text-base font-bold text-content-strong">{service.title}</h4>
                <p className="relative mt-2 text-[13px] leading-relaxed text-content-muted">{service.description}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
