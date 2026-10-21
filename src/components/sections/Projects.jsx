import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LuArrowUpRight, LuArrowRight } from 'react-icons/lu';
import { FaApple, FaGooglePlay, FaGlobe } from 'react-icons/fa6';
import { projects, projectFilters, projectsCta } from '../../data/site';
import { getProjectBySlug } from '../../data/projects';
import { EASE } from '../../lib/motion';
import cn from '../../lib/cn';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import SmartImage from '../ui/SmartImage';
import PhoneShowcase from '../ui/PhoneShowcase';

const ACCENT_RING = {
  purple: 'shadow-[0_28px_60px_-32px_rgb(139_92_246/0.75)]',
  blue: 'shadow-[0_28px_60px_-32px_rgb(59_130_246/0.7)]',
  cyan: 'shadow-[0_28px_60px_-32px_rgb(34_211_238/0.7)]',
};

const PROJECT_LINKS = {
  Website: { icon: FaGlobe, primary: true },
  'App Store': { icon: FaApple, primary: false },
  'Play Store': { icon: FaGooglePlay, primary: false },
};

export default function Projects() {
  const [filter, setFilter] = useState('all');

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((project) => project.categories.includes(filter))),
    [filter]
  );

  return (
    <Section id="projects" glow="both">
      <SectionHeading
        eyebrow="Projects"
        title="Featured"
        highlight="work"
        description="A selection of products I've designed, built and shipped — from real-time mobile apps to full stack platforms."
      />

      {/* -------------------------------------------------------- Filters -- */}
      <Reveal delay={0.1} className="mt-10 flex flex-wrap justify-center gap-2">
        {projectFilters.map((tab) => {
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              aria-pressed={isActive}
              className={cn(
                'relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
                isActive ? 'text-white' : 'text-content-muted hover:text-content-strong'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="projects-tab"
                  className="absolute inset-0 rounded-full bg-brand-gradient shadow-glow-sm"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </Reveal>

      {/* ---------------------------------------------------------- Grid -- */}
      <motion.ul layout className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </AnimatePresence>
      </motion.ul>

      <Reveal delay={0.1} className="mt-14">
        <div className="mx-auto max-w-5xl rounded-3xl border border-line bg-card-alt/60 py-7 sm:py-9">
          <div className="px-5 text-center sm:px-8">
            <h3 className="font-display text-xl font-bold text-content-strong sm:text-2xl">Livio Live on mobile</h3>
            <p className="mt-2 text-sm text-content-muted">
              A look at the Livio Live mobile app.
            </p>
          </div>
          <div className="mt-4">
            <PhoneShowcase screenshots={getProjectBySlug('livio-live').phoneScreenshots} compact />
          </div>
          <div className="mt-4 flex justify-center">
            <Link to="/projects/livio-live" className="btn btn-ghost">
              Explore the mobile app
              <LuArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Reveal>

      {/* ----------------------------------------------------------- CTA -- */}
      <Reveal delay={0.1} className="mt-12 flex justify-center">
        <a href={projectsCta.href} target="_blank" rel="noreferrer noopener" className="btn btn-primary group px-7">
          {projectsCta.label}
          <LuArrowRight className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </a>
      </Reveal>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function ProjectCard({ project, index }) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.li
      layout
      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: EASE, delay: Math.min(index * 0.08, 0.4) }}
      className={cn(
        'gradient-ring group surface-card surface-card-hover relative flex flex-col overflow-hidden',
        ACCENT_RING[project.accent]
      )}
    >
      <div className="relative overflow-hidden">
        <SmartImage
          src={project.image}
          alt={`${project.title} preview`}
          ratio={project.id === 'livio-live' ? '1365 / 768' : '732 / 520'}
          fallbackLabel={project.title}
          className={project.id === 'djobzy' ? 'bg-[#c5685a]' : ''}
          imgClassName={cn(
            'transition-transform duration-700 ease-premium group-hover:scale-[1.04]',
            project.id === 'djobzy' && 'object-contain group-hover:scale-100'
          )}
        />

        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0',
            !['djobzy', 'livio-live'].includes(project.id) &&
              'bg-gradient-to-t from-[#050816]/85 via-[#050816]/10 to-transparent'
          )}
        />

        <div className="absolute left-4 top-4 flex gap-2">
          {project.featured && (
            <span className="rounded-full bg-brand-gradient px-2.5 py-1 text-[11px] font-semibold text-white shadow-glow-sm">
              Featured
            </span>
          )}
        </div>

        <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-all duration-400 ease-premium group-hover:opacity-100 group-focus-within:opacity-100">
          {project.links.map((link) => {
            const { icon: Icon } = PROJECT_LINKS[link.label] ?? PROJECT_LINKS.Website;
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                title={link.label}
                className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-black/45 text-white backdrop-blur-md transition-transform duration-300 hover:scale-110 hover:bg-black/65"
              >
                <Icon className="text-sm" aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-content-strong transition-colors duration-300 group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-content-muted">{project.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <li key={tech} className="tech-pill">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <Link to={`/projects/${project.id}`} className="group/btn inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            View Details
            <LuArrowUpRight
              className="transition-transform duration-300 ease-premium group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>

          <div className="flex gap-1.5">
            {project.links.map((link) => {
              const { icon: Icon } = PROJECT_LINKS[link.label] ?? PROJECT_LINKS.Website;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  title={link.label}
                  className="icon-btn h-9 w-9 text-[15px]"
                >
                  <Icon aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </motion.li>
  );
}
