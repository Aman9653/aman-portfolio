import cn from '../../lib/cn';

/**
 * Premium glass-aurora hero backdrop.
 *
 * Subtle, static atmospheric lighting with just enough structure to feel
 * premium without competing with the content or reducing readability.
 */
export default function AmbientBackground({ className = '' }) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div className="absolute inset-0 bg-transparent" />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 14% 18%, rgba(139, 92, 246, 0.14), transparent 20%), radial-gradient(circle at 82% 12%, rgba(59, 130, 246, 0.12), transparent 24%), radial-gradient(circle at 52% 100%, rgba(34, 211, 238, 0.11), transparent 30%)',
        }}
      />

      <span className="absolute -left-16 top-[-7rem] h-[30rem] w-[30rem] rounded-full bg-brand-500/18 blur-3xl dark:bg-brand-500/24" />
      <span className="absolute -right-12 top-[2rem] h-[27rem] w-[27rem] rounded-full bg-sky-500/15 blur-3xl dark:bg-sky-500/22" />
      <span className="absolute bottom-[-14rem] left-[35%] h-[24rem] w-[24rem] rounded-full bg-cyan-400/12 blur-3xl dark:bg-cyan-400/18" />

      <div className="absolute inset-x-0 top-[10%] h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent dark:via-brand-500/28" />
      <div className="absolute inset-x-0 bottom-[10%] h-px bg-gradient-to-r from-transparent via-cyan-400/18 to-transparent dark:via-cyan-400/24" />
      <div className="absolute inset-y-0 left-[8%] w-px bg-gradient-to-b from-transparent via-sky-500/12 to-transparent dark:via-sky-500/16" />
      <div className="absolute inset-y-0 right-[8%] w-px bg-gradient-to-b from-transparent via-brand-500/12 to-transparent dark:via-brand-500/18" />

      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.82), rgba(0,0,0,0.2) 62%, transparent 100%)',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 58%, rgba(15, 23, 42, 0.08) 100%)',
        }}
      />
    </div>
  );
}
