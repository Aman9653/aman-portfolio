import WaveDivider from './WaveDivider';
import cn from '../../lib/cn';

/**
 * Shared section shell: consistent vertical rhythm, an optional tinted
 * background, decorative corner glows and the signature closing wave.
 */
export default function Section({
  id,
  children,
  className = '',
  innerClassName = '',
  tinted = false,
  wave = true,
  glow = 'none',
  grid = false,
  as: Component = 'section',
}) {
  return (
    <Component
      id={id}
      className={cn('relative w-full overflow-hidden', tinted && 'bg-canvas-alt', className)}
    >
      {grid && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 grid-backdrop opacity-60 mask-fade-b"
        />
      )}

      {glow !== 'none' && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {(glow === 'left' || glow === 'both') && (
            <span className="glow-blob -left-24 top-10 h-[26rem] w-[26rem] bg-brand-500/45" />
          )}
          {(glow === 'right' || glow === 'both') && (
            <span className="glow-blob -right-28 bottom-0 h-[24rem] w-[24rem] bg-sky-500/40" />
          )}
        </div>
      )}

      <div className={cn('shell section-y relative z-10', innerClassName)}>{children}</div>

      {wave && <WaveDivider className="relative z-10" />}
    </Component>
  );
}
