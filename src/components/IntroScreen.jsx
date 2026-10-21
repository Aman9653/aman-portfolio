import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../data/site';
import useScrollLock from '../hooks/useScrollLock';
import Skeleton from './Skeleton';

const INTRO_CONFIG = {
  name: 'AMAN YADAV',
  label: 'THE PORTFOLIO',
  role: 'REACT NATIVE • FULL STACK • MERN',
  welcome: "Welcome to my portfolio. Let's build something great together.",
  image: profile.photo,
  duration: 7000,
  reducedMotionDuration: 2500,
};

const EASE = [0.2, 0.8, 0.2, 1];
const EXIT_DURATION = 1.1;

export default function IntroScreen({ onExitStart, onComplete }) {
  const reduceMotion = useReducedMotion() === true;
  const [isExiting, setIsExiting] = useState(false);
  const [buttonReady, setButtonReady] = useState(reduceMotion);
  const [portraitLoaded, setPortraitLoaded] = useState(false);
  const buttonRef = useRef(null);
  const exitStarted = useRef(false);

  const beginExit = useCallback(() => {
    if (exitStarted.current) return;
    exitStarted.current = true;
    setIsExiting(true);
    onExitStart();
  }, [onExitStart]);

  useScrollLock(true);

  useEffect(() => {
    try {
      window.sessionStorage.setItem('aman-portfolio-intro', 'seen');
    } catch {
      // The intro can still run when session storage is unavailable.
    }
  }, []);

  useEffect(() => {
    const buttonTimer = window.setTimeout(() => {
      if (exitStarted.current) return;
      setButtonReady(true);
      buttonRef.current?.focus();
    }, reduceMotion ? 0 : 4100);
    const exitTimer = window.setTimeout(
      () => beginExit(),
      reduceMotion ? INTRO_CONFIG.reducedMotionDuration : INTRO_CONFIG.duration + 200
    );

    return () => {
      window.clearTimeout(buttonTimer);
      window.clearTimeout(exitTimer);
    };
  }, [beginExit, reduceMotion]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') beginExit();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [beginExit]);

  function handleAnimationComplete() {
    if (isExiting) onComplete();
  }

  const characterDelay = reduceMotion ? 0 : 0.5;

  return (
    <>
      <link rel="preload" as="image" href={INTRO_CONFIG.image} />
      <motion.div
        className="fixed inset-0 z-[100] isolate overflow-hidden bg-[#050816] text-white"
        role="dialog"
        aria-label="Welcome to Aman Yadav's portfolio"
        aria-modal="true"
        initial={false}
        animate={
          isExiting
            ? reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.06, filter: 'blur(12px)' }
            : { opacity: 1, scale: 1, filter: 'blur(0px)' }
        }
        transition={
          isExiting
            ? { duration: reduceMotion ? 0.25 : EXIT_DURATION, ease: EASE }
            : { duration: 0.2 }
        }
        onAnimationComplete={handleAnimationComplete}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(79,70,229,0.5),transparent_68%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 2.4, delay: reduceMotion ? 0 : 0.1, ease: EASE }}
        />

        <header className="absolute inset-x-0 top-[calc(env(safe-area-inset-top)+clamp(1.5rem,7vh,5rem))] z-10 flex flex-col items-center px-2 text-center">
          <motion.h1
            aria-label="Aman Yadav"
            className="m-0 w-full whitespace-nowrap font-normal uppercase text-white"
            style={{
              fontFamily: '"Bebas Neue", Impact, sans-serif',
              fontSize: 'clamp(60px, 19vw, 230px)',
              lineHeight: 0.9,
              letterSpacing: reduceMotion ? '0.015em' : '0.14em',
            }}
            animate={{ letterSpacing: '0.015em' }}
            transition={{ duration: reduceMotion ? 0 : 0.8, delay: characterDelay, ease: EASE }}
          >
            {'AMAN YADAV'.split('').map((character, index) => (
              <motion.span
                key={`${character}-${index}`}
                aria-hidden="true"
                className="inline-block"
                initial={reduceMotion ? false : { opacity: 0, y: 46, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: reduceMotion ? 0 : 0.8,
                  delay: reduceMotion ? 0 : 0.5 + index * 0.07,
                  ease: EASE,
                }}
              >
                {character === ' ' ? '\u00a0' : character}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            className="mt-3 text-[11px] font-semibold tracking-[0.5em] text-[#818CF8] sm:text-sm"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 1.8, ease: EASE }}
          >
            {INTRO_CONFIG.label}
          </motion.p>
        </header>

        <motion.div
          className="absolute bottom-0 left-1/2 z-[1] h-[50vh] w-[72vw] max-w-none sm:h-[60vh] sm:w-[min(400px,76vw)]"
          style={{
            maskImage: 'radial-gradient(ellipse 58% 76% at 50% 44%, #000 62%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 58% 76% at 50% 44%, #000 62%, transparent 100%)',
          }}
          initial={reduceMotion ? false : { opacity: 0, x: '-50%', y: '9%' }}
          animate={{ opacity: 1, x: '-50%', y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 1.5, delay: reduceMotion ? 0 : 2.1, ease: EASE }}
        >
          {!portraitLoaded && (
            <Skeleton variant="image" className="!absolute inset-0 h-full w-full" rounded={0} />
          )}
          <img
            src={INTRO_CONFIG.image}
            alt="Portrait of Aman Yadav"
            fetchPriority="high"
            decoding="async"
            onLoad={() => setPortraitLoaded(true)}
            onError={() => setPortraitLoaded(true)}
            className={`h-full w-full object-cover object-[center_18%] transition-opacity duration-[400ms] ${
              portraitLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </motion.div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[42%] bg-gradient-to-t from-[#050816] via-[#050816]/80 to-transparent"
        />

        <button
          type="button"
          onClick={beginExit}
          className="absolute right-4 top-[calc(env(safe-area-inset-top)+1rem)] z-20 flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/35 bg-[#050816]/35 px-4 text-[11px] font-semibold tracking-[0.14em] text-white outline-offset-4 transition-colors hover:border-white/70 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:right-8"
        >
          SKIP INTRO
        </button>

        <div className="absolute inset-x-4 bottom-[calc(env(safe-area-inset-bottom)+2rem)] z-10 mx-auto flex max-w-2xl flex-col items-center text-center sm:bottom-[calc(env(safe-area-inset-bottom)+2.5rem)]">
          <motion.p
            className="text-[10px] font-semibold tracking-[0.2em] text-white sm:text-xs sm:tracking-[0.32em]"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 3.2, ease: EASE }}
          >
            {INTRO_CONFIG.role}
          </motion.p>
          <motion.p
            className="mt-2 max-w-xl text-[13px] leading-relaxed text-white/75 sm:text-base"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 3.5, ease: EASE }}
          >
            {INTRO_CONFIG.welcome}
          </motion.p>
          <motion.button
            ref={buttonRef}
            type="button"
            onClick={beginExit}
            tabIndex={buttonReady ? 0 : -1}
            aria-hidden={!buttonReady}
            className="mt-4 flex min-h-11 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-[#111827] outline-offset-4 transition-colors hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: buttonReady ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion || buttonReady ? 0 : 4.1, ease: EASE }}
          >
            Enter portfolio
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
