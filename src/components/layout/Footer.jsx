import { LuArrowUpRight } from 'react-icons/lu';
import { footer, profile } from '../../data/site';
import Logo from '../ui/Logo';
import SocialLinks from '../ui/SocialLinks';
import Reveal, { RevealGroup, RevealItem } from '../ui/Reveal';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-[#F8FAFC] text-[#64748B] transition-colors duration-300 dark:bg-[#0B1020] dark:text-[#94A3B8]">
      {/* Ambient wash */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="glow-blob -left-20 -top-24 h-72 w-72 bg-brand-500/40" />
      </div>

      <div className="shell relative z-10 py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Brand */}
          <Reveal className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-content-muted">{footer.description}</p>
            <SocialLinks size="sm" animate={false} className="mt-5" />
          </Reveal>

          {/* Link columns */}
          {footer.columns.map((column) => (
            <Reveal key={column.id} delay={0.08}>
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-content-strong">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-content-muted transition-colors duration-300 hover:text-primary"
                    >
                      <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-3" aria-hidden="true" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          {/* Contact card */}
          <Reveal delay={0.16}>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-content-strong">Get in touch</h3>
            <RevealGroup className="mt-4 space-y-2.5" stagger={0.06}>
              <RevealItem>
                <a
                  href={`mailto:${profile.email}`}
                  className="group flex items-center gap-1.5 text-sm text-content-muted transition-colors hover:text-primary"
                >
                  {profile.email}
                  <LuArrowUpRight
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </RevealItem>
              <RevealItem>
                <a
                  href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`}
                  className="group flex items-center gap-1.5 text-sm text-content-muted transition-colors hover:text-primary"
                >
                  {profile.phone}
                  <LuArrowUpRight
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </RevealItem>
              <RevealItem as="p" className="text-sm text-content-muted">
                {profile.location}
              </RevealItem>
              <RevealItem>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {profile.availabilityShort}
                </span>
              </RevealItem>
            </RevealGroup>

            <a href="#contact" className="btn btn-primary mt-5 h-10 px-5 text-[13px]">
              Hire Me
            </a>
          </Reveal>
        </div>

        <div className="flex flex-col items-center gap-3 border-t border-line/50 py-6 text-center font-sans text-sm transition-colors duration-300 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-4 md:text-left">
          <p className="text-[#64748B] transition-colors duration-300 hover:text-content-strong dark:text-[#94A3B8] dark:hover:text-content-strong">
            © {year} {profile.name}. All rights reserved.
          </p>

          <p className="flex max-w-full items-start justify-center gap-2 text-center text-[#64748B] transition-colors duration-300 hover:text-content-strong dark:text-[#94A3B8] dark:hover:text-content-strong md:max-w-[38rem]">
            <span className="mt-[5px] h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
            <span>Based in Mumbai, India · Open to Full Stack &amp; React Native opportunities</span>
          </p>

          <a
            href="#home"
            aria-label="Back to top"
            className="justify-self-center text-[#64748B] transition-[color,transform] duration-300 hover:-translate-y-0.5 hover:text-content-strong dark:text-[#94A3B8] dark:hover:text-content-strong motion-reduce:transform-none motion-reduce:transition-none md:justify-self-end"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
