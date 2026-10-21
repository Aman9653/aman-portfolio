import cn from '../../lib/cn';
import LazyImage from '../LazyImage';

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
  return (
    <LazyImage
      src={src}
      alt={alt || fallbackLabel}
      wrapperClassName={cn('bg-card-alt', className)}
      className={cn('h-full w-full object-cover', imgClassName)}
      ratio={ratio}
      loading={loading}
      priority={priority}
      {...rest}
    />
  );
}
