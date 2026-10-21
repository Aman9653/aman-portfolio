import cn from '../lib/cn';

const VARIANTS = {
  text: 'h-4 w-full rounded',
  title: 'h-8 w-3/4 rounded-lg',
  circle: 'h-11 w-11 rounded-full',
  image: 'h-48 w-full rounded-2xl',
  card: 'h-64 w-full rounded-2xl',
  button: 'h-11 w-32 rounded-xl',
};

export default function Skeleton({ variant = 'text', className = '', width, height, rounded }) {
  return (
    <span
      aria-hidden="true"
      className={cn('skeleton-shimmer block', VARIANTS[variant] || VARIANTS.text, className)}
      style={{
        ...(width !== undefined ? { width } : {}),
        ...(height !== undefined ? { height } : {}),
        ...(rounded !== undefined ? { borderRadius: rounded } : {}),
      }}
    />
  );
}
