import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useScrollLock from '../hooks/useScrollLock';
import { trackEvent } from '../lib/analytics';

const INTRO_CONFIG = {
  name: 'AMAN YADAV',
  message: "Welcome to my portfolio. Let's build something great together.",
  image: '/assets/images/intro-portrait.png',
  AUTO_EXIT_MS: 3400,
  tiltStrength: { x: 5, y: 7 },
};

const EASE = [0.2, 0.8, 0.2, 1];
const EXIT_EASE = [0.7, 0, 0.2, 1];
const STORAGE_KEY = 'aman-portfolio-intro';
const EXIT_MS = 1300;

export default function IntroScreen({ onExitStart, onComplete }) {
  const reduceMotion = useReducedMotion() === true;
  const lowPower = typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4;
  const [isExiting, setIsExiting] = useState(false);
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 700px)').matches);
  const [nameSettled, setNameSettled] = useState(reduceMotion);
  const [photoRevealed, setPhotoRevealed] = useState(reduceMotion);
  const [messageSettled, setMessageSettled] = useState(reduceMotion);
  const tiltRef = useRef(null);
  const exitStarted = useRef(false);

  const beginExit = useCallback(() => {
    if (exitStarted.current) return;
    exitStarted.current = true;
    setIsExiting(true);
    onExitStart();
  }, [onExitStart]);

  const skipIntro = useCallback(() => {
    if (exitStarted.current) return;
    trackEvent('intro_skip');
    beginExit();
  }, [beginExit]);

  useScrollLock(true);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, 'seen');
    } catch {
      // The intro can still run when session storage is unavailable.
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 700px)');
    const updateMobile = (event) => setMobile(event.matches);
    mediaQuery.addEventListener?.('change', updateMobile);
    return () => mediaQuery.removeEventListener?.('change', updateMobile);
  }, []);

  useEffect(() => {
    if (isExiting) return undefined;
    const timer = window.setTimeout(
      beginExit,
      reduceMotion ? 2000 : INTRO_CONFIG.AUTO_EXIT_MS
    );
    return () => window.clearTimeout(timer);
  }, [beginExit, isExiting, reduceMotion]);

  useEffect(() => {
    if (!isExiting) return undefined;
    const timer = window.setTimeout(onComplete, reduceMotion ? 300 : EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [isExiting, onComplete, reduceMotion]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') skipIntro();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [skipIntro]);

  useEffect(() => {
    const canTilt = !reduceMotion
      && !lowPower
      && !mobile
      && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const element = tiltRef.current;
    if (!canTilt || !element || isExiting) return undefined;

    let frame = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const updateTilt = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      element.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
      if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
        frame = window.requestAnimationFrame(updateTilt);
      } else {
        frame = null;
        element.style.willChange = 'auto';
      }
    };

    const queueUpdate = () => {
      element.style.willChange = 'transform';
      if (frame === null) frame = window.requestAnimationFrame(updateTilt);
    };
    const handlePointerMove = (event) => {
      const bounds = element.getBoundingClientRect();
      const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
      const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
      targetY = horizontal * INTRO_CONFIG.tiltStrength.y;
      targetX = -vertical * INTRO_CONFIG.tiltStrength.x;
      queueUpdate();
    };
    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
      queueUpdate();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      if (frame !== null) window.cancelAnimationFrame(frame);
      element.style.transform = '';
      element.style.willChange = 'auto';
    };
  }, [isExiting, lowPower, mobile, reduceMotion]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden text-white"
      style={{
        perspective: '1400px',
        transformStyle: 'preserve-3d',
        colorScheme: 'dark',
        fontFamily: 'Inter, Arial, sans-serif',
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
      role="dialog"
      aria-label="Welcome to Aman Yadav's portfolio"
      aria-modal="true"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-[#050816]"
        initial={{ opacity: 1 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: isExiting ? (reduceMotion ? 0.3 : 0.6) : 0 }}
      />

      {!reduceMotion && (
        <>
          <motion.div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 z-[2] w-1/2 bg-[#050816]"
            initial={false}
            animate={{ rotateY: isExiting ? -98 : 0 }}
            transition={{ duration: 1, delay: isExiting ? 0.2 : 0, ease: EXIT_EASE }}
            style={{
              transformOrigin: 'left center',
              backfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d',
            }}
          >
            <motion.span
              className="pointer-events-none absolute inset-y-0 right-0 w-[90px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: isExiting ? 0.45 : 0 }}
              transition={{ duration: 0.35, delay: isExiting ? 0.2 : 0 }}
              style={{ background: 'linear-gradient(270deg, rgba(79,70,229,.9), transparent)' }}
            />
          </motion.div>
          <motion.div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 z-[2] w-1/2 bg-[#050816]"
            initial={false}
            animate={{ rotateY: isExiting ? 98 : 0 }}
            transition={{ duration: 1, delay: isExiting ? 0.2 : 0, ease: EXIT_EASE }}
            style={{
              transformOrigin: 'right center',
              backfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d',
            }}
          >
            <motion.span
              className="pointer-events-none absolute inset-y-0 left-0 w-[90px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: isExiting ? 0.45 : 0 }}
              transition={{ duration: 0.35, delay: isExiting ? 0.2 : 0 }}
              style={{ background: 'linear-gradient(90deg, rgba(79,70,229,.9), transparent)' }}
            />
          </motion.div>
        </>
      )}

      <motion.div
        className="absolute inset-0 z-[3]"
        initial={reduceMotion ? false : { opacity: 0, z: mobile ? -140 : -280, rotateX: mobile ? 4 : 7 }}
        animate={{
          opacity: isExiting ? 0 : 1,
          z: 0,
          rotateX: 0,
          scale: isExiting && !reduceMotion ? 1.03 : 1,
        }}
        transition={{
          opacity: { duration: isExiting ? (reduceMotion ? 0.3 : 0.35) : 1.8, ease: EASE },
          scale: { duration: isExiting ? (reduceMotion ? 0.3 : 0.35) : 0, ease: EASE },
          z: { duration: isExiting ? 0 : reduceMotion ? 0 : 1.8, ease: EASE },
          rotateX: { duration: isExiting ? 0 : reduceMotion ? 0 : 1.8, ease: EASE },
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          ref={tiltRef}
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ transform: 'translateZ(-120px) scale(1.25)' }}
          >
            <motion.div
              className="absolute left-1/2 top-[42%] h-[min(72vw,760px)] w-[min(72vw,760px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
              initial={{ opacity: 0 }}
              animate={isExiting
                ? { opacity: 0, scale: 1 }
                : reduceMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 1, scale: [1, 1.06, 1] }}
              transition={isExiting
                ? { duration: reduceMotion ? 0.3 : 0.5 }
                : reduceMotion
                  ? { duration: 0 }
                  : { opacity: { duration: 1.2 }, scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
              style={{
                background: 'radial-gradient(ellipse, rgba(79,70,229,.38), rgba(37,99,235,.18) 42%, transparent 72%)',
                willChange: reduceMotion || isExiting ? 'auto' : 'transform, opacity',
              }}
            />
          </div>

          <motion.div
            className="absolute inset-0 flex flex-col items-center"
            initial={false}
            animate={isExiting
              ? { y: -20, filter: 'blur(5px)' }
              : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: reduceMotion ? 0.3 : 0.35, ease: EASE }}
          >
            <motion.h1
              aria-label="Aman Yadav"
              className="absolute top-[calc(env(safe-area-inset-top)+8vh)] m-0 whitespace-nowrap text-center text-white relative"
              initial={reduceMotion ? false : { letterSpacing: '0.14em' }}
              animate={{ letterSpacing: '0.015em' }}
              transition={{ duration: reduceMotion ? 0 : 1.4, delay: reduceMotion ? 0 : 0.2, ease: EASE }}
              onAnimationComplete={() => setNameSettled(true)}
              style={{
                z: 60,
                fontFamily: '"Bebas Neue", Impact, "Arial Narrow", sans-serif',
                fontSize: 'clamp(60px, 16vw, 210px)',
                lineHeight: 0.9,
                perspective: '800px',
                willChange: isExiting || nameSettled || reduceMotion ? 'auto' : 'transform, opacity',
              }}
            >
              {INTRO_CONFIG.name.split('').map((character, index) => (
                <motion.span
                  key={`${character}-${index}`}
                  aria-hidden="true"
                  className="inline-block"
                  initial={reduceMotion ? false : {
                    opacity: 0,
                    y: 34,
                    rotateX: -88,
                    rotateY: -10,
                    filter: lowPower ? 'blur(0px)' : 'blur(8px)',
                  }}
                  animate={isExiting
                    ? { opacity: 0, y: -20, rotateX: 0, rotateY: 0, filter: 'blur(5px)' }
                    : { opacity: 1, y: 0, rotateX: 0, rotateY: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: isExiting ? (reduceMotion ? 0.3 : 0.5) : reduceMotion ? 0 : 0.9,
                    delay: reduceMotion || isExiting ? 0 : 0.2 + index * 0.065,
                    ease: EASE,
                  }}
                  style={{ transformOrigin: 'center bottom', transformStyle: 'preserve-3d' }}
                >
                  {character === ' ' ? '\u00a0' : character}
                </motion.span>
              ))}
              {!reduceMotion && (
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 overflow-hidden whitespace-nowrap bg-clip-text text-transparent"
                  initial={{ x: '-110%' }}
                  animate={isExiting ? { opacity: 0 } : { x: '110%' }}
                  transition={{ duration: 0.9, delay: 1.2, ease: EASE }}
                  style={{
                    backgroundImage: 'linear-gradient(110deg, transparent 35%, rgba(255,255,255,.6) 47%, rgba(199,210,254,.6) 52%, transparent 65%)',
                    WebkitBackgroundClip: 'text',
                  }}
                >
                  {INTRO_CONFIG.name}
                </motion.span>
              )}
            </motion.h1>

            <motion.div
              aria-hidden="true"
              className="absolute top-[calc(env(safe-area-inset-top)+8vh+clamp(60px,16vw,210px))] h-px w-[min(68vw,680px)] origin-center bg-gradient-to-r from-indigo-600 via-indigo-300 to-cyan-500"
              initial={reduceMotion ? false : { scaleX: 0, opacity: 1 }}
              animate={reduceMotion ? { scaleX: 1, opacity: 0.2 } : { scaleX: 1, opacity: [1, 1, 0.2] }}
              transition={reduceMotion
                ? { duration: 0 }
                : { duration: 0.9, delay: 1.3, times: [0, 0.7, 1], ease: EASE }}
            />

            <div
              className="absolute bottom-0 left-1/2"
              style={{ transform: 'translateX(-50%) translateZ(30px)' }}
            >
              <motion.div
                initial={reduceMotion ? false : {
                  opacity: 0,
                  y: '8%',
                  scale: 1.05,
                  rotateX: 12,
                  rotateY: -6,
                  z: -40,
                  clipPath: 'inset(100% 0 0 0)',
                }}
                animate={isExiting
                  ? { opacity: 0, y: -20, rotateX: 0, rotateY: 0, z: 0, filter: 'blur(5px)' }
                  : reduceMotion
                    ? { opacity: 1, y: 0, scale: 1, rotateX: 0, rotateY: 0, z: 0, clipPath: 'inset(0% 0 0 0)' }
                    : { opacity: 1, y: 0, scale: 1, rotateX: 0, rotateY: 0, z: 0, clipPath: 'inset(0% 0 0 0)' }}
                transition={{
                  duration: isExiting ? (reduceMotion ? 0.3 : 0.5) : reduceMotion ? 0 : 1.3,
                  delay: reduceMotion || isExiting ? 0 : 0.9,
                  ease: EASE,
                }}
                onAnimationComplete={() => setPhotoRevealed(true)}
                style={{
                  height: mobile ? '58svh' : 'min(68svh, 700px)',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  willChange: isExiting || photoRevealed || reduceMotion ? 'auto' : 'clip-path, transform, opacity',
                }}
              >
                <motion.img
                  src={INTRO_CONFIG.image}
                  alt="Portrait of Aman Yadav"
                  fetchPriority="high"
                  decoding="async"
                  className="block h-full w-auto max-w-[90vw] object-contain object-bottom"
                  animate={reduceMotion || isExiting ? { y: 0 } : { y: [0, -6, 0] }}
                  transition={reduceMotion || isExiting
                    ? { duration: 0 }
                    : { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
                  style={{ willChange: reduceMotion || isExiting ? 'auto' : 'transform' }}
                />
              </motion.div>
            </div>

            <motion.p
              className="absolute inset-x-5 bottom-[calc(env(safe-area-inset-bottom)+5vh)] z-10 m-0 text-center text-sm font-medium leading-relaxed text-white drop-shadow-[0_2px_12px_rgba(0,0,0,.95)] sm:text-base"
              initial={reduceMotion ? false : {
                opacity: 0,
                y: 8,
                rotateX: 18,
                rotateY: -5,
                z: -40,
              }}
              animate={isExiting
                ? { opacity: 0, y: -20, rotateX: 0, rotateY: 0, z: 0, filter: 'blur(5px)' }
                : { opacity: 1, y: 0, rotateX: 0, rotateY: 0, z: 80, filter: 'blur(0px)' }}
              transition={{
                duration: isExiting ? (reduceMotion ? 0.3 : 0.5) : reduceMotion ? 0 : 0.7,
                delay: reduceMotion || isExiting ? 0 : 2.3,
                ease: EASE,
              }}
              onAnimationComplete={() => setMessageSettled(true)}
              style={{
                transformOrigin: 'center bottom',
                transformStyle: 'preserve-3d',
                willChange: isExiting || messageSettled || reduceMotion ? 'auto' : 'transform, opacity',
              }}
            >
              {INTRO_CONFIG.message}
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        type="button"
        onClick={skipIntro}
        tabIndex={isExiting ? -1 : 0}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: reduceMotion ? 0.3 : 0.35, ease: EASE }}
        className="absolute right-4 top-[calc(env(safe-area-inset-top)+1rem)] z-10 min-h-11 min-w-11 rounded-full px-3 text-xs font-semibold tracking-[0.12em] text-white/75 outline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
      >
        Skip
      </motion.button>

      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 z-[5] w-px -translate-x-1/2"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={isExiting ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
          transition={{ duration: 0.2, delay: isExiting ? 0.15 : 0, ease: EASE }}
          style={{
            transformOrigin: 'center',
            background: 'linear-gradient(to bottom, #4F46E5, #06B6D4)',
          }}
        />
      )}
    </motion.div>
  );
}
