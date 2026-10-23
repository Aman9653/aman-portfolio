import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LuArrowLeft,
  LuArrowRight,
  LuBriefcase,
  LuCalendarDays,
  LuDatabase,
  LuExternalLink,
  LuGithub,
  LuLayers,
  LuLayoutDashboard,
  LuMapPin,
  LuSearch,
  LuServer,
  LuTimer,
  LuTrophy,
  LuUsers,
  LuX,
  LuWrench,
} from 'react-icons/lu';
import { getProjectBySlug, projects } from '../data/projects';
import { defaultTitle, siteUrl, socialPreview } from '../config/site';
import PhoneShowcase from '../components/ui/PhoneShowcase';
import LazyImage from '../components/LazyImage';
import useScrollLock from '../hooks/useScrollLock';
import { trackEvent } from '../lib/analytics';
import ANALYTICS_EVENTS from '../lib/events';

const FEATURE_ICONS = {
  map: LuMapPin,
  timer: LuTimer,
  trophy: LuTrophy,
  search: LuSearch,
  users: LuUsers,
  calendar: LuCalendarDays,
  briefcase: LuBriefcase,
  layers: LuLayers,
  layout: LuLayoutDashboard,
  server: LuServer,
  database: LuDatabase,
  wrench: LuWrench,
};

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const [activeScreenshot, setActiveScreenshot] = useState(-1);
  const closeButtonRef = useRef(null);
  const galleryTriggerRef = useRef(null);
  useScrollLock(activeScreenshot >= 0);

  useEffect(() => {
    if (activeScreenshot < 0) {
      galleryTriggerRef.current?.focus();
      return undefined;
    }
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActiveScreenshot(-1);
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setActiveScreenshot((index) => (index + 1) % project.screenshots.length);
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setActiveScreenshot((index) => (index - 1 + project.screenshots.length) % project.screenshots.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeScreenshot, project]);

  if (!project) return <ProjectNotFound />;

  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const description = `${project.title}: ${project.tagline}`;

  return (
    <>
      <Helmet>
        <title>{`${project.title} | Aman Yadav`}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="#F8FAFC" />
        <link rel="canonical" href={`${siteUrl}/projects/${project.slug}`} />
        <meta property="og:title" content={`${project.title} | Aman Yadav`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${siteUrl}/projects/${project.slug}`} />
        <meta property="og:image" content={socialPreview} />
        <meta name="twitter:title" content={`${project.title} | Aman Yadav`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={socialPreview} />
      </Helmet>

      <main className="shell min-h-screen max-w-5xl pb-20 pt-24 sm:pt-32">
        <Link to="/#projects" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
          <LuArrowLeft aria-hidden="true" />
          Back to Projects
        </Link>

        <header className="mt-8">
          <h1 className="max-w-4xl font-display text-4xl font-bold tracking-tight text-content-strong sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-content-muted sm:text-lg">{project.tagline}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
            {project.techStack.map((technology) => (
              <li key={technology} className="tech-pill">{technology}</li>
            ))}
          </ul>
        </header>

        <dl className="mt-8 grid gap-4 rounded-3xl border border-line bg-card p-5 sm:grid-cols-2 lg:grid-cols-4">
          <Meta label="My Role" value={project.role} />
          <Meta label="Company" value={project.company} />
          <Meta label="Duration" value={project.duration} />
          <Meta label="Platform" value={project.platform} />
        </dl>

        <figure className="mt-8 overflow-hidden rounded-3xl border border-line bg-card shadow-card">
          <LazyImage
            src={project.coverImage}
            alt={project.coverAlt}
            width={project.coverWidth}
            height={project.coverHeight}
            priority
            wrapperClassName="w-full"
            className={
              project.slug === 'djobzy'
                ? 'mx-auto block max-h-[38rem] max-w-full object-contain'
                : 'block max-h-[38rem] w-full object-cover'
            }
          />
          <figcaption className="border-t border-line px-4 py-3 text-xs text-content-subtle">{project.coverAlt}</figcaption>
        </figure>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <section aria-labelledby="problem-heading">
            <h2 id="problem-heading" className="font-display text-2xl font-bold">The Problem</h2>
            <p className="mt-3 leading-relaxed text-content-muted">{project.problem}</p>
          </section>
          <section aria-labelledby="solution-heading">
            <h2 id="solution-heading" className="font-display text-2xl font-bold">My Solution</h2>
            <p className="mt-3 leading-relaxed text-content-muted">{project.solution}</p>
          </section>
        </div>

        {project.phoneScreenshots.length > 0 && (
          <section className="mt-14 rounded-3xl border border-line bg-card-alt/60 py-7 sm:py-9" aria-labelledby="mobile-app-heading">
            <div className="px-5 text-center sm:px-8">
              <h2 id="mobile-app-heading" className="font-display text-2xl font-bold">
                {project.title.split(' - ')[0]} Mobile App
              </h2>
              <p className="mt-2 text-sm text-content-muted">A look at the {project.title.split(' - ')[0]} mobile app.</p>
            </div>
            <div className="mt-5">
              <PhoneShowcase
                screenshots={project.phoneScreenshots}
                compact={project.phoneScreenshots.length > 3}
                label={`${project.title.split(' - ')[0]} mobile app screenshots`}
              />
            </div>
            {(project.appStoreUrl || project.googlePlayUrl || project.liveUrl) && (
              <div className="mt-5 flex flex-wrap justify-center gap-3 px-5">
                {project.appStoreUrl && <ExternalLink href={project.appStoreUrl}>Download on the App Store</ExternalLink>}
                {project.googlePlayUrl && <ExternalLink href={project.googlePlayUrl}>Get it on Google Play</ExternalLink>}
                {project.liveUrl && (
                  <ExternalLink
                    href={project.liveUrl}
                    eventName={ANALYTICS_EVENTS.CLICK_LIVE_DEMO}
                    projectSlug={project.slug}
                  >
                    Visit Website
                  </ExternalLink>
                )}
              </div>
            )}
          </section>
        )}

        <section className="mt-14" aria-labelledby="features-heading">
          <h2 id="features-heading" className="font-display text-2xl font-bold">Key Features</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.features.map((feature, index) => {
              const Icon = FEATURE_ICONS[feature.icon];
              return (
                <li key={feature.title} className="rounded-2xl border border-line bg-card p-5">
                  <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient-soft text-primary">
                    {Icon ? <Icon /> : <span className="text-xs font-bold">{String(index + 1).padStart(2, '0')}</span>}
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold">{feature.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-content-muted">{feature.description}</p>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="built-heading">
          <h2 id="built-heading" className="font-display text-2xl font-bold">What I Built</h2>
          <ul className="mt-5 space-y-3">
            {project.responsibilities.map((responsibility) => (
              <li key={responsibility} className="flex gap-3 text-content-muted">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {responsibility}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="results-heading">
          <h2 id="results-heading" className="font-display text-2xl font-bold">Results</h2>
          <ul className="mt-5 space-y-3">
            {project.results.map((result) => (
              <li key={result} className="flex gap-3 text-content-muted">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {result}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="stack-heading">
          <h2 id="stack-heading" className="font-display text-2xl font-bold">Tech Stack</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((technology) => <li key={technology} className="tech-pill">{technology}</li>)}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="screenshots-heading">
          <h2 id="screenshots-heading" className="font-display text-2xl font-bold">Screenshots</h2>
          {project.screenshots.length > 0 ? (
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {project.screenshots.map((screenshot, index) => (
                <li key={screenshot.src}>
                  <button
                    type="button"
                    onClick={(event) => {
                      galleryTriggerRef.current = event.currentTarget;
                      setActiveScreenshot(index);
                    }}
                    className="group block w-full overflow-hidden rounded-2xl border border-line bg-card text-left"
                    aria-label={`Enlarge ${screenshot.alt}`}
                  >
                    <LazyImage
                      src={screenshot.src}
                      alt={screenshot.alt}
                      width={screenshot.width || 1200}
                      height={screenshot.height || 800}
                      wrapperClassName="aspect-video w-full"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <span className="block p-3 text-xs text-content-muted">{screenshot.caption}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 rounded-2xl border border-dashed border-line-strong p-5 text-sm text-content-muted">
              {project.screenshotsTodo || 'TODO: add real project screenshots'} in <code>src/data/projects.js</code>.
            </p>
          )}
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          {project.liveUrl ? (
            <ExternalLink
              href={project.liveUrl}
              eventName={ANALYTICS_EVENTS.CLICK_LIVE_DEMO}
              projectSlug={project.slug}
            >
              Live Demo
            </ExternalLink>
          ) : (
            <span className="btn btn-ghost cursor-not-allowed opacity-70" aria-label="Live demo URL not yet provided">Live Demo — TODO</span>
          )}
          {project.githubUrl ? (
            <ExternalLink
              href={project.githubUrl}
              eventName={ANALYTICS_EVENTS.CLICK_GITHUB}
              projectSlug={project.slug}
            >
              <LuGithub aria-hidden="true" /> GitHub
            </ExternalLink>
          ) : (
            <span className="btn btn-ghost cursor-not-allowed opacity-70" aria-label="GitHub URL not yet provided"><LuGithub aria-hidden="true" /> GitHub — TODO</span>
          )}
        </div>

        <Link
          to={`/projects/${nextProject.slug}`}
          className="mt-14 flex items-center justify-between gap-4 rounded-3xl border border-line bg-card p-5 transition-colors hover:border-primary/40 sm:p-7"
        >
          <span>
            <span className="block text-xs font-semibold uppercase tracking-wide text-content-subtle">Next Project</span>
            <span className="mt-1 block font-display text-lg font-bold text-content-strong">{nextProject.title}</span>
          </span>
          <LuArrowRight className="shrink-0 text-xl text-primary" aria-hidden="true" />
        </Link>
      </main>

      <AnimatePresence>
        {activeScreenshot >= 0 && (
          <motion.div
            className="fixed inset-0 z-toast grid place-items-center bg-[#050816]/90 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Screenshot viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(event) => event.target === event.currentTarget && setActiveScreenshot(-1)}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setActiveScreenshot(-1)}
              aria-label="Close screenshot viewer"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <LuX aria-hidden="true" />
            </button>
            <figure className="max-h-full max-w-6xl">
              <LazyImage
                src={project.screenshots[activeScreenshot].src}
                alt={project.screenshots[activeScreenshot].alt}
                width={project.screenshots[activeScreenshot].width || 1200}
                height={project.screenshots[activeScreenshot].height || 800}
                wrapperClassName="mx-auto max-h-[80vh] w-fit rounded-xl"
                className="block max-h-[80vh] max-w-full w-auto rounded-xl object-contain"
                loading="eager"
              />
              <figcaption className="mt-3 text-center text-sm text-white/80">
                {project.screenshots[activeScreenshot].caption}
              </figcaption>
            </figure>
            {project.screenshots.length > 1 && (
              <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between">
                <button
                  type="button"
                  onClick={() => setActiveScreenshot((index) => (index - 1 + project.screenshots.length) % project.screenshots.length)}
                  aria-label="Previous screenshot"
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white"
                >
                  <LuArrowLeft aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveScreenshot((index) => (index + 1) % project.screenshots.length)}
                  aria-label="Next screenshot"
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white"
                >
                  <LuArrowRight aria-hidden="true" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-content-subtle">{label}</dt>
      <dd className="mt-1 text-sm leading-relaxed text-content-strong">{value}</dd>
    </div>
  );
}

function ExternalLink({ href, children, eventName, projectSlug }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => eventName && trackEvent(eventName, { project_slug: projectSlug })}
      className="btn btn-primary"
    >
      {children}
      <LuExternalLink aria-hidden="true" />
    </a>
  );
}

function ProjectNotFound() {
  return (
    <>
      <Helmet>
        <title>{`Project not found | ${defaultTitle}`}</title>
        <meta name="description" content="The project you requested could not be found." />
        <meta name="theme-color" content="#F8FAFC" />
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href={siteUrl} />
      </Helmet>
      <main className="shell grid min-h-screen max-w-4xl content-center py-24">
        <h1 className="font-display text-4xl font-bold">Project not found</h1>
        <p className="mt-3 text-content-muted">This project may have moved or its address may be incorrect.</p>
        <Link to="/#projects" className="btn btn-primary mt-6 w-fit">Back to Projects</Link>
      </main>
    </>
  );
}
