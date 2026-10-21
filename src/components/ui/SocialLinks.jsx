import { motion } from 'framer-motion';
import { LuGithub, LuLinkedin, LuTwitter, LuInstagram, LuMail } from 'react-icons/lu';
import { socials } from '../../data/site';
import { EASE } from '../../lib/motion';
import cn from '../../lib/cn';

const SOCIAL_ICONS = {
  github: LuGithub,
  linkedin: LuLinkedin,
  twitter: LuTwitter,
  instagram: LuInstagram,
  email: LuMail,
};

/** Brand tints used for the hover glow, keeping each icon recognisable. */
const SOCIAL_TINT = {
  github: 'group-hover:text-content-strong',
  linkedin: 'group-hover:text-[#0A66C2]',
  twitter: 'group-hover:text-content-strong',
  instagram: 'group-hover:text-[#E1306C]',
  email: 'group-hover:text-primary',
};

export default function SocialLinks({
  items = socials,
  size = 'md',
  className = '',
  itemClassName = '',
  showLabels = false,
  stagger = 0.06,
  animate = true,
}) {
  const sizing = {
    sm: 'h-9 w-9 text-[15px]',
    md: 'h-11 w-11 text-[17px]',
    lg: 'h-12 w-12 text-lg',
  }[size];

  const Wrapper = animate ? motion.ul : 'ul';
  const Item = animate ? motion.li : 'li';

  const wrapperProps = animate
    ? {
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, amount: 0.4 },
        variants: { hidden: {}, show: { transition: { staggerChildren: stagger } } },
      }
    : {};

  return (
    <Wrapper className={cn('flex flex-wrap items-center gap-2.5', className)} {...wrapperProps}>
      {items.map((social) => {
        const Icon = SOCIAL_ICONS[social.id] ?? LuMail;
        const itemProps = animate
          ? {
              variants: {
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
              },
            }
          : {};

        return (
          <Item key={social.id} {...itemProps}>
            <a
              href={social.href}
              target={social.id === 'email' ? undefined : '_blank'}
              rel="noreferrer noopener"
              aria-label={social.label}
              title={social.label}
              className={cn(
                'icon-btn group',
                sizing,
                showLabels && 'w-auto gap-2 px-4',
                SOCIAL_TINT[social.id],
                itemClassName
              )}
            >
              <Icon aria-hidden="true" />
              {showLabels && <span className="text-sm font-medium">{social.label}</span>}
            </a>
          </Item>
        );
      })}
    </Wrapper>
  );
}

export { SOCIAL_ICONS };
