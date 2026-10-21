import { useEffect, useRef, useState } from 'react';
import cn from '../lib/cn';
import Skeleton from './Skeleton';

export default function LazyImage({
  src,
  alt = '',
  width,
  height,
  className = '',
  wrapperClassName = '',
  ratio,
  loading = 'lazy',
  priority = false,
  ...imageProps
}) {
  const imageRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [src]);

  useEffect(() => {
    if (imageRef.current?.complete) {
      if (imageRef.current.naturalWidth > 0) setLoaded(true);
      else setFailed(true);
    }
  }, [src]);

  return (
    <span
      className={cn('relative block overflow-hidden', wrapperClassName)}
      style={ratio ? { aspectRatio: ratio } : undefined}
      aria-busy={!loaded && !failed}
    >
      {!loaded && !failed && <span className="sr-only">Loading</span>}
      {!loaded && !failed && (
        <Skeleton
          variant="image"
          className="!absolute inset-0 h-full w-full"
          rounded="inherit"
        />
      )}
      {failed ? (
        <span
          role="img"
          aria-label={alt}
          className="absolute inset-0 grid place-items-center bg-canvas-alt px-4 text-center text-sm text-content-muted"
        >
          {alt}
        </span>
      ) : (
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : loading}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn('opacity-0 transition-opacity duration-[400ms]', loaded && 'opacity-100', className)}
          {...imageProps}
        />
      )}
    </span>
  );
}
