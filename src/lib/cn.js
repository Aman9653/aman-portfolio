/**
 * Tiny class-name joiner. Skips falsy values so conditional classes read well:
 *   cn('btn', isActive && 'btn-primary')
 */
export default function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
