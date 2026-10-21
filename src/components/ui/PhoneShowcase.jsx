import { useState } from 'react';
import cn from '../../lib/cn';

export default function PhoneShowcase({ screenshots, compact = false }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToPhone = (index) => {
    setActiveIndex(index);
    document.getElementById(`phone-screen-${index}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  return (
    <div>
      <div
        className={cn(
          'phone-showcase flex snap-x snap-mandatory items-center justify-start gap-5 overflow-x-auto px-4 pb-4 pt-3 md:justify-center md:overflow-visible',
          compact && 'gap-3'
        )}
        onScroll={(event) => {
          const { scrollLeft, clientWidth } = event.currentTarget;
          const itemWidth = event.currentTarget.firstElementChild?.getBoundingClientRect().width || clientWidth;
          setActiveIndex(Math.max(0, Math.min(screenshots.length - 1, Math.round(scrollLeft / (itemWidth + 20)))));
        }}
        aria-label="Livio Live mobile app screenshots"
      >
        {screenshots.map((screenshot, index) => (
          <div
            id={`phone-screen-${index}`}
            key={`${screenshot.label}-${index}`}
            className={cn(
              'phone-frame relative mx-auto w-[min(70vw,15.5rem)] shrink-0 snap-center rounded-[2.3rem] border-[6px] border-slate-900 bg-slate-950 p-2 shadow-xl dark:border-slate-600',
              compact ? 'md:w-[12rem]' : 'md:w-[14rem]',
              index === 1 && 'md:scale-[1.04]'
            )}
          >
            <span className="phone-notch absolute left-1/2 top-1.5 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-slate-950" />
            <div className="relative aspect-[9/19] overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-indigo-500/20 via-card to-blue-500/20">
              {screenshot.src ? (
                <img
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={screenshot.width || 360}
                  height={screenshot.height || 760}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 p-5 text-center">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-lg font-bold text-white">
                    LL
                  </span>
                  <span className="text-xs font-semibold text-content-muted">{screenshot.label}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex justify-center gap-2 md:hidden" aria-label="Choose screenshot">
        {screenshots.map((screenshot, index) => (
          <button
            key={`${screenshot.label}-dot-${index}`}
            type="button"
            onClick={() => scrollToPhone(index)}
            aria-label={`Show screenshot ${index + 1}`}
            aria-current={activeIndex === index ? 'true' : undefined}
            className={cn(
              'h-2.5 w-2.5 rounded-full transition-colors',
              activeIndex === index ? 'bg-primary' : 'bg-line-strong'
            )}
          />
        ))}
      </div>
    </div>
  );
}
