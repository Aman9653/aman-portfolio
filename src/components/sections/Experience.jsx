import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useInView } from 'framer-motion';
import { LuBriefcase, LuGraduationCap, LuCheck, LuArrowRight, LuExternalLink } from 'react-icons/lu';
import { experience, education, profile } from '../../data/site';
import { EASE } from '../../lib/motion';
import cn from '../../lib/cn';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import Reveal, { RevealGroup, RevealItem } from '../ui/Reveal';
import { trackEvent } from '../../lib/analytics';
import ANALYTICS_EVENTS from '../../lib/events';

export default function Experience() {
  const timelineRef = useRef(null);
  const shouldReduce = useReducedMotion();

  // Draw the spine as the timeline scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 60%'],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <Section id="experience" tinted glow="left">
      <SectionHeading
        eyebrow="Experience"
        title="My professional"
        highlight="journey"
        description="Roles, responsibilities and the work I'm most proud of shipping along the way."
      />

      <div ref={timelineRef} className="relative mt-14 lg:mt-16">
        {/* Spine — sits at the far left on mobile, centred from lg up */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-[15px] top-2 w-px bg-line lg:left-1/2 lg:-translate-x-1/2"
        />
        <motion.div
          aria-hidden="true"
          style={{ scaleY: shouldReduce ? 1 : lineProgress }}
          className="absolute bottom-0 left-[15px] top-2 w-px origin-top bg-gradient-to-b from-brand-500 via-sky-500 to-cyan-400 lg:left-1/2 lg:-translate-x-1/2"
        />

        <ol className="space-y-8 lg:space-y-2">
          {experience.map((role, index) => (
            <TimelineItem key={role.id} role={role} index={index} />
          ))}
        </ol>
      </div>

      {/* ----------------------------------------------------- Education -- */}
      <div className="mt-16 lg:mt-20">
        <Reveal className="mb-8 flex flex-col items-center gap-2 text-center">
          <span className="eyebrow">Education</span>
          <h3 className="font-display text-2xl font-bold text-content-strong sm:text-3xl">
            Academic <span className="text-gradient">background</span>
          </h3>
        </Reveal>

        <RevealGroup className="grid gap-4 sm:grid-cols-2" stagger={0.1}>
          {education.map((entry) => (
            <RevealItem key={entry.id} className="gradient-ring group surface-card surface-card-hover p-6">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-gradient-soft text-primary">
                  <LuGraduationCap aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <span className="chip mb-2 !px-2.5 !py-0.5 !text-[11px]">{entry.period}</span>
                  <h4 className="font-display text-base font-bold text-content-strong">{entry.title}</h4>
                  <p className="mt-0.5 text-sm font-medium text-primary">{entry.org}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-content-muted">{entry.description}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {/* ----------------------------------------------------------- CTA -- */}
      <Reveal delay={0.1} className="mt-14 flex flex-col items-center gap-4 text-center">
        <p className="max-w-md text-sm text-content-muted">
          Want the full history, including tooling and references?
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={profile.resumeUrl}
            download="Aman-Yadav-Resume.pdf"
            onClick={() => trackEvent(ANALYTICS_EVENTS.DOWNLOAD_RESUME)}
            className="btn btn-primary group"
          >
            Download Resume
            <LuArrowRight className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </a>
          <a href="#projects" className="btn btn-ghost">
            See the work
          </a>
        </div>
      </Reveal>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function TimelineItem({ role, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35, margin: '0px 0px -60px 0px' });
  const shouldReduce = useReducedMotion();
  const isLeft = index % 2 === 0;

  const slide = shouldReduce ? 0 : isLeft ? -40 : 40;

  return (
    <li ref={ref} className="relative pl-11 lg:grid lg:grid-cols-2 lg:gap-x-14 lg:pl-0">
      {/* Dot */}
      <motion.span
        aria-hidden="true"
        initial={shouldReduce ? { opacity: 0 } : { scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.45, ease: EASE, delay: 0.1 }}
        className="absolute left-0 top-6 grid h-8 w-8 place-items-center rounded-full border border-line bg-card shadow-soft lg:left-1/2 lg:-translate-x-1/2"
      >
        <span
          className={cn(
            'grid h-4 w-4 place-items-center rounded-full',
            role.current ? 'bg-brand-gradient' : 'bg-line-strong'
          )}
        >
          {role.current && !shouldReduce && (
            <span className="absolute h-8 w-8 animate-ping rounded-full bg-primary/25" />
          )}
        </span>
      </motion.span>

      {/* Card */}
      <motion.article
        initial={{ opacity: 0, x: slide, y: shouldReduce ? 0 : 20 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : undefined}
        transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
        className={cn(
          'gradient-ring group surface-card surface-card-hover p-5 sm:p-6 lg:my-4',
          isLeft ? 'lg:col-start-1 lg:mr-2' : 'lg:col-start-2 lg:ml-2'
        )}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide',
              role.current ? 'bg-brand-gradient text-white shadow-glow-sm' : 'border border-line bg-card-alt text-content-muted'
            )}
          >
            {role.period}
          </span>
          {role.current && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Current
            </span>
          )}
        </div>

        <h3 className="mt-3 font-display text-lg font-bold text-content-strong sm:text-xl">{role.role}</h3>
        <p className="mt-0.5 flex flex-wrap items-center gap-2 text-sm font-semibold text-primary">
          <LuBriefcase className="text-[13px]" aria-hidden="true" />
          {role.company}
          <span className="text-xs font-normal text-content-subtle">· {role.type}</span>
        </p>

        <p className="mt-3 text-[15px] leading-relaxed text-content-muted">{role.description}</p>

        {role.projects?.length > 0 ? (
          <div className="mt-5 divide-y divide-line">
            {role.projects.map((project) => (
              <section key={project.id} className="py-5 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="min-w-0 flex-1 font-display text-base font-bold leading-snug text-content-strong">
                    {project.title}
                  </h4>
                  {project.links.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-full border border-line bg-card-alt px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:border-primary/40 hover:bg-primary/5"
                        >
                          {link.label}
                          <LuExternalLink className="text-[11px]" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <ul className="mt-3 space-y-2">
                  {project.achievements.map((achievement) => (
                    <li key={achievement} className="flex items-start gap-2.5 text-sm leading-relaxed text-content-muted">
                      <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
                        <LuCheck className="text-[9px]" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">{achievement}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : null}
      </motion.article>
    </li>
  );
}
