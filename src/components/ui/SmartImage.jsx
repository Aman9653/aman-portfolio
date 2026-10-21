import { useState } from 'react';
import cn from '../../lib/cn';

/**
 * Image with a graceful, on-brand fallback.
 *
 * Every visual asset in `data/site.js` points at a file under `public/assets`.
 * Replace that file with a real photo or screenshot and it just works; if the
 * file is missing, this renders a branded gradient tile with the initials
 * instead of a broken-image icon.
 *
 * Loading is lazy and decoding async by default to keep the page light.
 */
export default function SmartImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  fallbackLabel = '',
  ratio,
  loading = 'lazy',
  priority = false,
  ...rest
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <span
      className={cn('relative block overflow-hidden bg-card-alt', className)}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {/* Skeleton shimmer while the real asset decodes */}
      {!loaded && !failed && (
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-shimmer bg-brand-sheen bg-shimmer opacity-40"
        />
      )}

      {failed ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center bg-brand-gradient-soft"
        >
          <span className="flex flex-col items-center gap-2 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient font-display text-lg font-bold text-white shadow-glow-sm">
              AY
            </span>
            {fallbackLabel && (
              <span className="px-4 text-xs font-medium text-content-muted">{fallbackLabel}</span>
            )}
          </span>
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : loading}
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-700 ease-premium',
            loaded ? 'opacity-100' : 'opacity-0',
            imgClassName
          )}
          {...rest}
        />
      )}
    </span>
  );
}
