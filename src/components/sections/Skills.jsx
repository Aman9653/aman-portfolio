import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { skills, skillRows } from '../../data/skills';
import { EASE } from '../../lib/motion';
import WaveDivider from '../ui/WaveDivider';
import skillIcons from '../skills/skillIcons';
import './Skills.css';

const DARK_LOGO_SKILLS = new Set([
  'nextjs',
  'github',
  'react-native-expo',
  'aws-ec2-s3',
  'zustand',
]);

const headingVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const headingItemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const rowsVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 });
  const shouldReduceMotion = useReducedMotion();
  const showContent = shouldReduceMotion || isInView;
  const skillsById = new Map(skills.map((skill) => [skill.id, skill]));

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="skills-section relative w-full overflow-hidden"
      aria-labelledby="skills-heading"
    >
      <div className="shell section-y skills-section-inner relative z-10">
        <div className="skills-header">
          <motion.header
            className="skills-header-copy"
            variants={headingVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={showContent ? 'show' : 'hidden'}
          >
            <motion.p className="skills-eyebrow" variants={headingItemVariants}>
              TECHNICAL CAPABILITIES
            </motion.p>
            <motion.h2
              id="skills-heading"
              className="skills-heading"
              variants={headingItemVariants}
            >
              Skills &amp; <span className="skills-heading-gradient">Technologies</span>
            </motion.h2>
            <motion.p className="skills-subtitle" variants={headingItemVariants}>
              Focused on building scalable applications with modern tools and technologies.
            </motion.p>
          </motion.header>
          <DesktopTiles />
        </div>

        <motion.div
          className="skills-rows"
          variants={rowsVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          animate={showContent ? 'show' : 'hidden'}
        >
          {skillRows.map((row) => (
            <motion.section
              key={row.id}
              className="skills-row"
              aria-labelledby={`skills-row-${row.id}`}
              variants={shouldReduceMotion
                ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0 } } }
                : rowVariants}
              style={{
                '--skills-accent': row.accent,
                '--skills-accent-light': row.lightAccent,
              }}
            >
              <div className="skills-row-intro">
                <span className="skills-row-number" aria-hidden="true">{row.number}</span>
                <span className="skills-row-rule" aria-hidden="true" />
                <div className="skills-row-copy">
                  <h3 id={`skills-row-${row.id}`} className="skills-row-title">{row.title}</h3>
                  <p className="skills-row-description">{row.description}</p>
                </div>
              </div>

              <ul className="skills-chip-list" aria-label={`${row.title} skills`}>
                {row.skillIds.map((skillId) => {
                  const skill = skillsById.get(skillId);
                  const Icon = skillIcons[skill.id] || skillIcons[skill.icon];

                  return (
                    <li
                      key={skillId}
                      className="skills-chip"
                      style={{ '--skill-icon-color': skill.color }}
                    >
                      <span
                        className={`skills-chip-icon${DARK_LOGO_SKILLS.has(skill.id) ? ' skills-chip-icon-theme' : ''}`}
                        aria-hidden="true"
                      >
                        <Icon />
                      </span>
                      <span className="skills-chip-name">{skill.name}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.section>
          ))}
        </motion.div>
      </div>
      <WaveDivider className="relative z-10" />
    </section>
  );
}

function DesktopTiles() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined;

    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const updateMatches = () => setIsDesktop(desktopQuery.matches);

    updateMatches();
    desktopQuery.addEventListener('change', updateMatches);

    return () => desktopQuery.removeEventListener('change', updateMatches);
  }, []);

  if (!isDesktop) return null;

  const tiles = [
    { key: 'react', className: 'skills-tile-react', angle: -8, delay: 0, color: '#FFFFFF' },
    { key: 'javascript', className: 'skills-tile-javascript', angle: -14, delay: 0.4, color: '#0B1020' },
    { key: 'typescript', className: 'skills-tile-typescript', angle: 8, delay: 0.8, color: '#FFFFFF' },
    { key: 'nextjs', className: 'skills-tile-nextjs', angle: -6, delay: 1.2, color: '#FFFFFF' },
    { key: 'php', className: 'skills-tile-php', angle: 10, delay: 1.6, color: '#282447' },
  ];

  return (
    <div className="skills-tiles" aria-hidden="true">
      {tiles.map((tile) => {
        const Icon = skillIcons[tile.key];
        return (
          <div
            key={tile.key}
            className={`skills-tile ${tile.className}`}
            style={{
              '--tile-angle': `${tile.angle}deg`,
              '--tile-delay': `${tile.delay}s`,
            }}
          >
            <Icon style={{ color: tile.color }} />
          </div>
        );
      })}
      <span className="skills-tile-dot skills-tile-dot-one" />
      <span className="skills-tile-dot skills-tile-dot-two" />
      <span className="skills-tile-dot skills-tile-dot-three" />
    </div>
  );
}
