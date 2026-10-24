import { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import IntroScreen from '../components/IntroScreen';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BackToTop from '../components/layout/BackToTop';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import Testimonials from '../components/sections/Testimonials';
import Contact from '../components/sections/Contact';
import DotsBackground from '../components/ui/DotsBackground';
import { socials as contactSocials } from '../data/contact';
import { defaultDescription, defaultTitle, siteUrl, socialPreview } from '../config/site';
import { profile } from '../data/site';
import { useCookieConsent } from '../components/CookieBanner';

const INTRO_STORAGE_KEY = 'aman-portfolio-intro';

function shouldShowIntro() {
  try {
    return window.sessionStorage.getItem(INTRO_STORAGE_KEY) !== 'seen';
  } catch {
    return true;
  }
}

export default function HomePage() {
  const [introActive, setIntroActive] = useState(shouldShowIntro);
  const [portfolioEntering, setPortfolioEntering] = useState(!introActive);
  const hadIntro = useRef(introActive);
  const { setIntroActive: setConsentIntroActive } = useCookieConsent();
  const handleIntroExitStart = useCallback(() => setPortfolioEntering(true), []);
  const handleIntroComplete = useCallback(() => setIntroActive(false), []);

  useEffect(() => {
    setConsentIntroActive(introActive);
  }, [introActive, setConsentIntroActive]);

  useEffect(() => {
    if (!introActive && hadIntro.current) {
      document.getElementById('main')?.focus();
    }
  }, [introActive]);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: 'React Native & Full Stack Developer',
    url: siteUrl,
    sameAs: contactSocials
      .filter((social) => social.href.startsWith('https://'))
      .map((social) => social.href),
  };

  return (
    <>
      <Helmet>
        <title>{defaultTitle}</title>
        <meta name="description" content={defaultDescription} />
        <meta name="theme-color" content="#F8FAFC" />
        <link rel="canonical" href={siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={defaultTitle} />
        <meta property="og:description" content={defaultDescription} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={socialPreview} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Aman Yadav, React Native and Full Stack Developer" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={defaultTitle} />
        <meta name="twitter:description" content={defaultDescription} />
        <meta name="twitter:image" content={socialPreview} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <DotsBackground />
      {introActive && (
        <IntroScreen onExitStart={handleIntroExitStart} onComplete={handleIntroComplete} />
      )}
      <div className="relative z-[1]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-toast focus:rounded-full focus:bg-brand-gradient focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <motion.div
          initial={introActive ? { opacity: 0, y: 14, scale: 0.97 } : false}
          animate={portfolioEntering
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 14, scale: 0.97 }}
          transition={{
            duration: introActive && portfolioEntering ? 1 : 0.3,
            delay: introActive && portfolioEntering ? 0.45 : 0,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          style={{ pointerEvents: introActive ? 'none' : 'auto' }}
          aria-hidden={introActive}
          inert={introActive}
        >
          <main id="main" tabIndex="-1">
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
          <BackToTop />
        </motion.div>
      </div>
    </>
  );
}
