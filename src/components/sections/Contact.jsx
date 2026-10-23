import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  LuMail,
  LuPhone,
  LuMapPin,
  LuCircleCheck,
  LuSend,
  LuCircleAlert,
  LuArrowUpRight,
  LuLinkedin,
  LuMessageCircle,
} from 'react-icons/lu';
import { contact, profile } from '../../data/site';
import { contactDetails, socials } from '../../data/contact';
import { EASE } from '../../lib/motion';
import cn from '../../lib/cn';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import Reveal, { RevealGroup, RevealItem } from '../ui/Reveal';
import SocialLinks from '../ui/SocialLinks';
import Skeleton from '../Skeleton';

const CHANNEL_ICONS = { mail: LuMail, phone: LuPhone, pin: LuMapPin, check: LuCircleCheck };

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };
const COOLDOWN_KEY = 'aman-portfolio-contact-cooldown';

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim()) errors.email = 'An email is needed so I can reply.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'That email address looks incomplete.';
  if (!values.subject.trim()) errors.subject = 'Please enter a subject.';
  if (values.message.trim().length < 10) errors.message = 'Please enter at least 10 characters.';
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const cooldownUntil = useRef(0);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    try {
      cooldownUntil.current = Number(window.sessionStorage.getItem(COOLDOWN_KEY)) || 0;
    } catch (error) {
      console.error('Unable to restore the contact form cooldown.', error);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
    if (status !== 'sending') {
      setStatus('idle');
      setStatusMessage('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (event.currentTarget.elements.website.value) return;

    const remaining = Math.ceil((cooldownUntil.current - Date.now()) / 1000);
    if (remaining > 0) {
      setStatus('error');
      setStatusMessage(`Please wait ${remaining} seconds before sending another message.`);
      return;
    }

    const serviceId = process.env.VITE_EMAILJS_SERVICE_ID?.trim();
    const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
    const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY?.trim();
    if (!serviceId || !templateId || !publicKey) {
      setStatus('error');
      setStatusMessage("Email delivery isn't configured yet. Something went wrong. Please email me directly.");
      return;
    }

    setStatus('sending');
    setStatusMessage('');
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: values.name.trim(),
          from_email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
        },
        publicKey
      );
      cooldownUntil.current = Date.now() + 30_000;
      try {
        window.sessionStorage.setItem(COOLDOWN_KEY, String(cooldownUntil.current));
      } catch (error) {
        console.error('Unable to save the contact form cooldown.', error);
      }
      setStatus('sent');
      setStatusMessage("Thanks! I'll reply within 24 hours.");
      setValues(EMPTY_FORM);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('EmailJS delivery failed.', error);
      }
      setStatus('error');
      setStatusMessage('Something went wrong. Please email me directly.');
    }
  };

  return (
    <Section id="contact" glow="both" grid>
      <SectionHeading eyebrow={contact.eyebrow} title="Let's work" highlight="together" description={contact.subtitle} />

      <div className="mt-14 grid gap-8 lg:mt-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
        {/* ------------------------------------------------------ Details -- */}
        <div className="flex flex-col gap-6">
          <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1" stagger={0.08}>
            {contact.channels.map((channel) => {
              const Icon = CHANNEL_ICONS[channel.icon] ?? LuMail;
              const Wrapper = channel.href ? 'a' : 'div';
              return (
                <RevealItem key={channel.id}>
                  <Wrapper
                    href={channel.href ?? undefined}
                    className={cn(
                      'gradient-ring group surface-card surface-card-hover flex items-center gap-4 p-4',
                      channel.href && 'cursor-pointer'
                    )}
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-gradient-soft text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-semibold uppercase tracking-wide text-content-subtle">
                        {channel.label}
                      </span>
                      <span className="block truncate text-sm font-medium text-content-strong">{channel.value}</span>
                    </span>
                    {channel.href && (
                      <LuArrowUpRight
                        className="shrink-0 text-content-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden="true"
                      />
                    )}
                  </Wrapper>
                </RevealItem>
              );
            })}
          </RevealGroup>

          {/* Availability card with the paper-plane flight path */}
          <Reveal delay={0.1} className="relative overflow-hidden rounded-3xl border border-line bg-card p-6">
            <PaperPlane shouldReduce={shouldReduce} />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Open to Full Stack &amp; React Native roles
              </span>

              <h3 className="mt-4 font-display text-xl font-bold text-content-strong">
                Let's build something <span className="text-gradient">amazing together</span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-content-muted">{profile.responseTime}</p>

              <div className="mt-5">
                <span className="mb-3 block text-2xs font-semibold uppercase tracking-label text-content-subtle">
                  Elsewhere
                </span>
                <SocialLinks items={socials} size="sm" animate={false} />
              </div>
            </div>
          </Reveal>
        </div>

        {/* --------------------------------------------------------- Form -- */}
        <Reveal direction="left" className="relative">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="gradient-ring gradient-ring-always relative overflow-hidden rounded-3xl border border-line bg-card p-6 shadow-card sm:p-8"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-gradient opacity-10 blur-3xl"
            />

            <h3 className="relative font-display text-xl font-bold text-content-strong">Send a message</h3>
            <p className="relative mt-1 text-sm text-content-muted">
              Fill in the form and I'll get back to you within 24 hours.
            </p>

            <div className="relative mt-4 flex flex-wrap gap-2" aria-label="Quick contact">
              <a
                href={contactDetails.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost h-10 px-3 text-xs"
              >
                <LuLinkedin aria-hidden="true" />
                LinkedIn
              </a>
              <a
                href={contactDetails.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost h-10 px-3 text-xs"
              >
                <LuMessageCircle aria-hidden="true" />
                WhatsApp
              </a>
              <a href={`mailto:${contactDetails.email}`} className="btn btn-ghost h-10 px-3 text-xs">
                <LuMail aria-hidden="true" />
                Email
              </a>
            </div>

            <div className="relative mt-6 grid gap-4 sm:grid-cols-2">
              <Field
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Your full name"
                autoComplete="name"
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="you@company.com"
                autoComplete="email"
              />

              <div className="sm:col-span-2">
                <Field
                  label="Subject"
                  name="subject"
                  value={values.subject}
                  onChange={handleChange}
                  error={errors.subject}
                  placeholder="What is this about?"
                  list="contact-subjects"
                />
                <datalist id="contact-subjects">
                  {contact.subjects.map((subject) => (
                    <option key={subject} value={subject} />
                  ))}
                </datalist>
              </div>

              <div className="sm:col-span-2">
                <Field
                  label="Message"
                  name="message"
                  as="textarea"
                  rows={5}
                  value={values.message}
                  onChange={handleChange}
                  error={errors.message}
                  placeholder="Tell me about your project, timeline and goals…"
                />
              </div>
            </div>
            <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="website">Leave this field empty</label>
              <input id="website" name="website" type="text" tabIndex="-1" autoComplete="off" />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              aria-busy={status === 'sending'}
              className="btn btn-primary group relative mt-6 w-full disabled:cursor-not-allowed disabled:opacity-80"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={status}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  {status === 'sending' && (
                    <>
                      <Skeleton
                        variant="button"
                        className="!absolute inset-0 z-0 h-full w-full !bg-transparent"
                        rounded="inherit"
                      />
                      <span className="relative z-10">Sending...</span>
                    </>
                  )}
                  {status === 'sent' && (
                    <>
                      <LuCircleCheck aria-hidden="true" />
                      Message sent
                    </>
                  )}
                  {(status === 'idle' || status === 'error') && (
                    <>
                      Send Message
                      <LuSend
                        className="transition-transform duration-300 ease-premium group-hover:translate-x-1 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </motion.span>
              </AnimatePresence>
            </button>

            <AnimatePresence>
              {(status === 'sent' || status === 'error') && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  aria-live="polite"
                  className={cn(
                    'relative mt-4 flex items-start gap-2 rounded-2xl border p-3 text-[13px]',
                    status === 'sent'
                      ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'border-rose-500/25 bg-rose-500/10 text-rose-600 dark:text-rose-400'
                  )}
                >
                  {status === 'sent' ? (
                    <LuCircleCheck className="mt-0.5 shrink-0" aria-hidden="true" />
                  ) : (
                    <LuCircleAlert className="mt-0.5 shrink-0" aria-hidden="true" />
                  )}
                  <span>
                    {statusMessage}{' '}
                    {status === 'error' && statusMessage.includes('Something went wrong') && (
                      <>
                        <a href={`mailto:${contactDetails.email}`} className="font-semibold underline">
                          {contactDetails.email}
                        </a>
                        .
                      </>
                    )}
                  </span>
                </motion.p>
              )}
            </AnimatePresence>

            <p className="relative mt-4 text-center text-xs text-content-subtle">
              Prefer email? Reach me at{' '}
              <a href={`mailto:${contactDetails.email}`} className="font-medium text-primary hover:underline">
                {contactDetails.email}
              </a>
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function Field({ label, name, as = 'input', error, className = '', ...rest }) {
  const Component = as;
  const errorId = `${name}-error`;

  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-[13px] font-semibold text-content-strong">
        {label}
      </label>
      <Component
        id={name}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn('field', as === 'textarea' && 'resize-y min-h-[7.5rem]', error && 'field-error')}
        {...rest}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-500"
          >
            <LuCircleAlert className="shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Decorative paper plane tracing a dashed gradient flight path. */
function PaperPlane({ shouldReduce }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 140"
      className="pointer-events-none absolute inset-x-0 top-0 h-32 w-full opacity-60"
      fill="none"
    >
      <defs>
        <linearGradient id="plane-path" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
          <stop offset="50%" stopColor="#6366F1" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <path
        id="flight-path"
        d="M-10 118 C 70 118, 96 34, 168 34 S 268 96, 330 22"
        stroke="url(#plane-path)"
        strokeWidth="2"
        strokeDasharray="6 8"
        strokeLinecap="round"
      />

      {!shouldReduce && (
        <g>
          <path d="M0 -7 L11 0 L0 7 L3 0 Z" fill="#8B5CF6">
            <animateMotion dur="7s" repeatCount="indefinite" rotate="auto" keyPoints="0;1" keyTimes="0;1">
              <mpath href="#flight-path" />
            </animateMotion>
          </path>
        </g>
      )}
    </svg>
  );
}
