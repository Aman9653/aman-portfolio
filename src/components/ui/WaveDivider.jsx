import { useId, useMemo } from 'react';
import cn from '../../lib/cn';

/**
 * One tile is TILE_W wide and fills the container; the SVG is rendered at
 * double that (w-[200%]) so the CSS loop can translate it by exactly one tile
 * (-50% of its own width) and land on an identical crest — no visible jump.
 */
const TILE_W = 1440;
const VIEW_W = TILE_W * 2;
const VIEW_H = 120;

/** Smooth sine-like wave built from cubic segments, drawn across both tiles. */
function wavePath(period, amplitude, baseline) {
  const segments = [`M 0 ${baseline}`];
  const q = period / 8;

  for (let x = 0; x < VIEW_W; x += period) {
    segments.push(
      `C ${x + q} ${baseline - amplitude}, ${x + q * 3} ${baseline - amplitude}, ${x + period / 2} ${baseline}`,
      `C ${x + q * 5} ${baseline + amplitude}, ${x + q * 7} ${baseline + amplitude}, ${x + period} ${baseline}`
    );
  }

  segments.push(`L ${VIEW_W} ${VIEW_H}`, `L 0 ${VIEW_H}`, 'Z');
  return segments.join(' ');
}

/* Each period divides TILE_W exactly, which is what keeps the loop seamless. */
const LAYERS = [
  { key: 'back', period: 720, amplitude: 26, baseline: 62, opacity: 0.5, animation: 'animate-wave-slow' },
  { key: 'mid', period: 360, amplitude: 17, baseline: 76, opacity: 0.7, animation: 'animate-wave-mid' },
  { key: 'front', period: 240, amplitude: 11, baseline: 90, opacity: 1, animation: 'animate-wave-fast' },
];

/**
 * The signature purple/blue wave that closes every section.
 * Three layers drift at different speeds; `--wave-opacity` keeps it subtle in
 * light mode and slightly more present in dark mode.
 */
export default function WaveDivider({
  className = '',
  height = 'h-16 sm:h-20 lg:h-24',
  flip = false,
  showLine = true,
}) {
  const gradientId = useId();
  const paths = useMemo(
    () => LAYERS.map((layer) => ({ ...layer, d: wavePath(layer.period, layer.amplitude, layer.baseline) })),
    []
  );

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none relative w-full overflow-hidden', height, flip && 'rotate-180', className)}
      style={{ opacity: 'var(--wave-opacity)' }}
    >
      {paths.map((layer, index) => (
        <svg
          key={layer.key}
          className={cn('absolute inset-y-0 left-0 h-full w-[200%] gpu', layer.animation)}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          focusable="false"
        >
          <defs>
            <linearGradient id={`${gradientId}-${index}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="35%" stopColor="#6366F1" />
              <stop offset="70%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
          <path d={layer.d} fill={`url(#${gradientId}-${index})`} opacity={layer.opacity} />
        </svg>
      ))}

      {showLine && (
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      )}
    </div>
  );
}
