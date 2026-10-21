import { useEffect, useRef } from 'react';

const SHOW_IN_LIGHT_MODE = true;
const PARTICLE_COUNT = 145;
const MOBILE_PARTICLE_COUNT = 80;
const MAX_DOT_RADIUS = 3.5;
const SPEED_MULTIPLIER = 2.2;
const BASE_FRAME_DURATION = 1000 / 60;
const CONNECTION_DISTANCE = 120;
const CURSOR_DISTANCE = 120;

const THEME_STYLES = {
  dark: { color: '#a78bfa', minOpacity: 0.35, maxOpacity: 0.8, lineOpacity: 0.18 },
  light: { color: '#7c5cf0', minOpacity: 0.25, maxOpacity: 0.55, lineOpacity: 0.12 },
};

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function hexToRgb(hex) {
  const value = hex.slice(1);
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

export default function DotsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) {
      console.error('DotsBackground could not initialize its canvas context.');
      return undefined;
    }

    const root = document.documentElement;
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = { x: -1000, y: -1000 };
    let particles = [];
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let theme = root.classList.contains('dark') || root.dataset.theme === 'dark' ? 'dark' : 'light';
    let reducedMotion = reducedMotionQuery.matches;
    let frameId = null;
    let lastFrameTime = 0;

    const createParticle = () => ({
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      driftX: randomBetween(-0.25, 0.25),
      driftY: randomBetween(0.05, 0.35),
      radius: randomBetween(MAX_DOT_RADIUS * 0.6, MAX_DOT_RADIUS),
      phase: randomBetween(0, Math.PI * 2),
      twinkleSpeed: randomBetween(0.0005, 0.0012),
    });

    const resize = () => {
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;
      const nextPixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const targetCount = nextWidth < 640 ? MOBILE_PARTICLE_COUNT : PARTICLE_COUNT;

      if (nextWidth !== width || nextHeight !== height || targetCount !== particles.length) {
        width = nextWidth;
        height = nextHeight;
        particles = Array.from({ length: targetCount }, createParticle);
      }

      pixelRatio = nextPixelRatio;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw(performance.now(), 0);
    };

    const draw = (timestamp, delta) => {
      context.clearRect(0, 0, width, height);
      if (theme === 'light' && !SHOW_IN_LIGHT_MODE) return;

      const style = THEME_STYLES[theme];
      const { r, g, b } = hexToRgb(style.color);
      const cursorDistanceSquared = CURSOR_DISTANCE * CURSOR_DISTANCE;

      if (!reducedMotion) {
        const frameScale = (delta / BASE_FRAME_DURATION) * SPEED_MULTIPLIER;
        particles.forEach((particle) => {
          particle.x += particle.driftX * frameScale;
          particle.y -= particle.driftY * frameScale;
          if (particle.x < -MAX_DOT_RADIUS) particle.x = width + MAX_DOT_RADIUS;
          if (particle.x > width + MAX_DOT_RADIUS) particle.x = -MAX_DOT_RADIUS;
          if (particle.y < -MAX_DOT_RADIUS) particle.y = height + MAX_DOT_RADIUS;
        });
      }

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        let drawX = particle.x;
        let drawY = particle.y;
        const dx = drawX - pointer.x;
        const dy = drawY - pointer.y;
        const distanceSquared = dx * dx + dy * dy;

        if (distanceSquared < cursorDistanceSquared && distanceSquared > 0) {
          const distance = Math.sqrt(distanceSquared);
          const push = (1 - distance / CURSOR_DISTANCE) * 10;
          drawX += (dx / distance) * push;
          drawY += (dy / distance) * push;
        }

        const twinkle = reducedMotion ? 0.5 : (Math.sin(timestamp * particle.twinkleSpeed + particle.phase) + 1) / 2;
        const opacity = style.minOpacity + (style.maxOpacity - style.minOpacity) * twinkle;

        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j];
          const lineX = other.x - particle.x;
          const lineY = other.y - particle.y;
          const lineDistanceSquared = lineX * lineX + lineY * lineY;
          if (lineDistanceSquared >= CONNECTION_DISTANCE * CONNECTION_DISTANCE) continue;

          const proximity = 1 - Math.sqrt(lineDistanceSquared) / CONNECTION_DISTANCE;
          context.beginPath();
          context.moveTo(drawX, drawY);
          context.lineTo(other.x, other.y);
          context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${style.lineOpacity * proximity})`;
          context.lineWidth = 0.7;
          context.stroke();
        }

        context.beginPath();
        context.arc(drawX, drawY, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        context.fill();
      }
    };

    const animate = (timestamp) => {
      const delta = lastFrameTime ? Math.min(timestamp - lastFrameTime, 32) : 16.67;
      lastFrameTime = timestamp;
      draw(timestamp, delta);
      if (!reducedMotion && document.visibilityState === 'visible') {
        frameId = window.requestAnimationFrame(animate);
      } else {
        frameId = null;
      }
    };

    const startAnimation = () => {
      if (document.visibilityState !== 'visible' || frameId !== null) return;
      if (reducedMotion) {
        draw(performance.now(), 0);
        return;
      }
      lastFrameTime = 0;
      frameId = window.requestAnimationFrame(animate);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (frameId !== null) window.cancelAnimationFrame(frameId);
        frameId = null;
      } else {
        startAnimation();
      }
    };

    const handlePointerMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const handlePointerLeave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };

    const handleThemeChange = () => {
      theme = root.classList.contains('dark') || root.dataset.theme === 'dark' ? 'dark' : 'light';
      draw(performance.now(), 0);
    };

    const handleReducedMotionChange = (event) => {
      reducedMotion = event.matches;
      if (reducedMotion && frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
        draw(performance.now(), 0);
      } else {
        startAnimation();
      }
    };

    const themeObserver = new MutationObserver(handleThemeChange);
    themeObserver.observe(root, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('blur', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    resize();
    startAnimation();

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      themeObserver.disconnect();
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('blur', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
