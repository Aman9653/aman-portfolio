import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { LuQuote, LuStar, LuLinkedin, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { testimonials } from '../../data/site';
import { EASE } from '../../lib/motion';
import cn from '../../lib/cn';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import SmartImage from '../ui/SmartImage';

const PER_PAGE = 3;
const PAGES = Math.ceil(testimonials.length / PER_PAGE);

export default function Testimonials() {
  const shouldReduce = useReducedMotion();

  /* Desktop pages through 3 at a time; mobile moves one card at a time. */
  const [page, setPage] = useState(0);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const goToPage = useCallback((next) => {
    setDirection(next > page ? 1 : -1);
    setPage((next + PAGES) % PAGES);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const goToIndex = useCallback((next, dir = 1) => {
    setDirection(dir);
    setIndex((next + testimonials.length) % testimonials.length);
  }, []);

  // Gentle autoplay, paused on hover/focus and for reduced-motion visitors.
  useEffect(() => {
    if (paused || shouldReduce) return undefined;
    const timer = window.setInterval(() => {
      setDirection(1);
      setPage((current) => (current + 1) % PAGES);
      setIndex((current) => (current + 1) % testimonials.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused, shouldReduce]);

  const pageItems = testimonials.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <Section id="testimonials" tinted glow="right">
      <SectionHeading
        eyebrow="Testimonials"
        title="What people"
        highlight="say"
        description="Feedback from founders, product managers and engineering leads I've worked with."
      />

      <div
        className="mt-14 lg:mt-16"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* ------------------------------------------------------ Desktop -- */}
        <div className="hidden lg:block">
          <div className="relative min-h-[22rem]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.ul
                key={page}
                custom={direction}
                initial={shouldReduce ? { opacity: 0 } : { opacity: 0, x: direction * 60 }}
                animate={shouldReduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
                exit={shouldReduce ? { opacity: 0 } : { opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="grid gap-6 lg:grid-cols-3"
              >
                {pageItems.map((testimonial, cardIndex) => (
                  <motion.li
                    key={testimonial.id}
                    initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: EASE, delay: cardIndex * 0.09 }}
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <CarouselButton label="Previous testimonials" onClick={() => goToPage(page - 1)} direction="prev" />
            <Dots count={PAGES} active={page} onSelect={goToPage} label="testimonial page" />
            <CarouselButton label="Next testimonials" onClick={() => goToPage(page + 1)} direction="next" />
          </div>
        </div>

        {/* ------------------------------------------------------- Mobile -- */}
        <div className="lg:hidden">
          <div className="relative min-h-[24rem] overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                drag={shouldReduce ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.16}
                onDragEnd={(event, info) => {
                  const swipe = info.offset.x;
                  if (swipe < -70) goToIndex(index + 1, 1);
                  else if (swipe > 70) goToIndex(index - 1, -1);
                }}
                initial={shouldReduce ? { opacity: 0 } : { opacity: 0, x: direction * 120 }}
                animate={shouldReduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
                exit={shouldReduce ? { opacity: 0 } : { opacity: 0, x: direction * -120 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="cursor-grab active:cursor-grabbing"
              >
                <TestimonialCard testimonial={testimonials[index]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Centred so the "next" control never sits under the floating
              back-to-top button in the bottom-right corner. */}
          <div className="mt-7 flex items-center justify-center gap-4">
            <CarouselButton label="Previous testimonial" onClick={() => goToIndex(index - 1, -1)} direction="prev" />
            <Dots count={testimonials.length} active={index} onSelect={(next) => goToIndex(next, next > index ? 1 : -1)} label="testimonial" />
            <CarouselButton label="Next testimonial" onClick={() => goToIndex(index + 1, 1)} direction="next" />
          </div>

          <p className="mt-4 text-center text-xs text-content-subtle">Swipe to see more</p>
        </div>
      </div>

      {/* ------------------------------------------------------- Trust bar -- */}
      <Reveal delay={0.15} className="glass mt-14 flex flex-col items-center gap-3 rounded-3xl px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-3">
          <ul className="flex -space-x-3">
            {testimonials.slice(0, 4).map((testimonial) => (
              <li key={testimonial.id}>
                <SmartImage
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-9 w-9 rounded-full border-2 border-card"
                />
              </li>
            ))}
          </ul>
          <p className="text-sm text-content-muted">
            <span className="font-semibold text-content-strong">Feedback from collaborators</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-content-muted">Project and team experiences</span>
        </div>
      </Reveal>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function TestimonialCard({ testimonial }) {
  return (
    <figure className="gradient-ring group glass relative flex h-full flex-col rounded-3xl p-6 shadow-soft transition-shadow duration-500 hover:shadow-card sm:p-7">
      <LuQuote
        className="absolute right-6 top-6 text-4xl text-primary/15 transition-transform duration-500 group-hover:scale-110"
        aria-hidden="true"
      />

      <div className="flex gap-0.5 text-amber-400" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: testimonial.rating }, (_, index) => (
          <LuStar key={index} className="fill-current text-sm" aria-hidden="true" />
        ))}
      </div>

      <blockquote className="mt-4 flex-1 text-[14.5px] leading-relaxed text-content-muted">
        “{testimonial.quote}”
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <SmartImage
          src={testimonial.avatar}
          alt={testimonial.name}
          className="h-11 w-11 shrink-0 rounded-full ring-2 ring-primary/20"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm font-bold text-content-strong">{testimonial.name}</p>
          <p className="truncate text-xs text-content-muted">
            {testimonial.role} · <span className="text-primary">{testimonial.company}</span>
          </p>
        </div>
        {testimonial.linkedin && (
          <a
            href={testimonial.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${testimonial.name} on LinkedIn`}
            className="icon-btn h-9 w-9 text-[15px] hover:text-[#0A66C2]"
          >
            <LuLinkedin aria-hidden="true" />
          </a>
        )}
      </figcaption>
    </figure>
  );
}

function CarouselButton({ label, onClick, direction }) {
  const Icon = direction === 'prev' ? LuChevronLeft : LuChevronRight;
  return (
    <button type="button" onClick={onClick} aria-label={label} className="icon-btn h-11 w-11 text-lg">
      <Icon aria-hidden="true" />
    </button>
  );
}

function Dots({ count, active, onSelect, label }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelect(index)}
          aria-label={`Go to ${label} ${index + 1}`}
          aria-current={index === active}
          className={cn(
            'h-2 rounded-full transition-all duration-400 ease-premium',
            index === active ? 'w-7 bg-brand-gradient' : 'w-2 bg-line-strong hover:bg-primary/50'
          )}
        />
      ))}
    </div>
  );
}
