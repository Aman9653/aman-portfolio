import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { skills, skillCategories, skillHighlights } from '../../data/site';
import { EASE } from '../../lib/motion';
import cn from '../../lib/cn';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import Reveal, { RevealGroup, RevealItem } from '../ui/Reveal';
import TechIcon from '../ui/TechIcon';

export default function Skills() {
  const [category, setCategory] = useState('all');

  const visible = useMemo(
    () => (category === 'all' ? skills : skills.filter((skill) => skill.category === category)),
    [category]
  );

  return (
    <Section id="skills" glow="right" grid>
      <SectionHeading
        eyebrow="Skills"
        title="Technologies I"
        highlight="work with"
        description="Languages, frameworks, databases, tools, and core concepts in my toolkit."
      />

      {/* ------------------------------------------------------- Filters -- */}
      <Reveal delay={0.1} className="mt-10 flex flex-wrap justify-center gap-2">
        {skillCategories.map((tab) => {
          const isActive = category === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCategory(tab.id)}
              aria-pressed={isActive}
              className={cn(
                'relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
                isActive ? 'text-white' : 'text-content-muted hover:text-content-strong'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="skills-tab"
                  className="absolute inset-0 rounded-full bg-brand-gradient shadow-glow-sm"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </Reveal>

      {/* --------------------------------------------------------- Cards -- */}
      <motion.ul layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visible.map((skill, index) => (
            <SkillCard key={skill.id} skill={skill} index={index} />
          ))}
        </AnimatePresence>
      </motion.ul>

      {/* ---------------------------------------------------- Highlights -- */}
      <RevealGroup className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4" stagger={0.08}>
        {skillHighlights.map((highlight) => (
          <RevealItem
            key={highlight.id}
            className="glass rounded-2xl p-5 text-center transition-transform duration-300 hover:-translate-y-1"
          >
            <span className="block font-display text-2xl font-bold text-gradient-static sm:text-3xl">
              {highlight.value}
            </span>
            <span className="mt-1 block text-xs text-content-muted sm:text-[13px]">{highlight.label}</span>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function SkillCard({ skill, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const shouldReduce = useReducedMotion();

  return (
    <motion.li
      ref={ref}
      layout
      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
      animate={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.97 }}
      transition={{ duration: 0.45, ease: EASE, delay: Math.min(index * 0.05, 0.35) }}
      className="gradient-ring group surface-card surface-card-hover relative overflow-hidden p-5"
    >
      {/* Hover wash tinted with the technology's own colour */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(120% 90% at 0% 0%, ${skill.color}22, transparent 60%)` }}
      />

      <div className="relative flex items-center gap-3">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-line text-xl transition-transform duration-300 ease-premium group-hover:scale-110"
          style={{ color: skill.color, background: `${skill.color}14` }}
        >
          <TechIcon name={skill.icon} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-[15px] font-bold text-content-strong">{skill.name}</h3>
          <p className="text-xs text-content-subtle">
            {skillCategories.find((category) => category.id === skill.category)?.label ?? skill.category}
          </p>
        </div>
        {skill.level != null && (
          <span className="font-display text-sm font-bold text-content-strong tabular-nums">{skill.level}%</span>
        )}
      </div>

      {/* Progress: animates 0 → level when the card enters the viewport */}
      <div className="relative mt-4 h-2 w-full overflow-hidden rounded-full bg-canvas-alt">
        <motion.span
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${skill.color}, #8B5CF6)`,
            width: skill.level != null ? `${skill.level}%` : 0,
            transformOrigin: 'left',
          }}
          initial={{ scaleX: 0 }}
          animate={inView && skill.level != null ? { scaleX: 1 } : { scaleX: 0 }}
          transition={
            shouldReduce
              ? { duration: 0.001 }
              : { duration: 1.25, ease: EASE, delay: 0.15 + Math.min(index * 0.06, 0.4) }
          }
        />
      </div>
    </motion.li>
  );
}
