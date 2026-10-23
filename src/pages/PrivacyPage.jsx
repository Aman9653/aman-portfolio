import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { defaultTitle, siteUrl } from '../config/site';
import { contactDetails } from '../data/contact';
import { profile } from '../data/site';
import Footer from '../components/layout/Footer';
import DotsBackground from '../components/ui/DotsBackground';
import Logo from '../components/ui/Logo';
import { useCookieConsent } from '../components/CookieBanner';
import { trackEvent } from '../lib/analytics';
import ANALYTICS_EVENTS from '../lib/events';

export default function PrivacyPage() {
  const { openSettings } = useCookieConsent();

  return (
    <>
      <Helmet>
        <title>{`Privacy | ${defaultTitle}`}</title>
        <meta name="description" content="How this portfolio uses Google Analytics cookies and how to manage your consent." />
        <meta name="theme-color" content="#F8FAFC" />
        <link rel="canonical" href={`${siteUrl}/privacy`} />
      </Helmet>
      <DotsBackground />
      <header className="shell relative z-[1] pt-6">
        <Logo href="/" />
      </header>
      <main className="shell relative z-[1] max-w-4xl py-12 sm:py-16">
        <Link to="/" className="text-sm font-semibold text-primary hover:underline">
          ← Back to portfolio
        </Link>
        <article className="surface-card mt-6 rounded-2xl p-6 sm:p-10">
          <p className="eyebrow">Privacy</p>
          <h1 className="mt-3 font-display text-3xl font-bold text-content-strong sm:text-4xl">
            Cookie and analytics information
          </h1>
          <div className="mt-6 space-y-6 text-sm leading-relaxed text-content-muted">
            <section>
              <h2 className="font-display text-lg font-bold text-content-strong">Analytics used</h2>
              <p className="mt-2">
                This site uses Google Analytics 4 (GA4) to understand visits and how the portfolio is used.
                Analytics is loaded only after you accept cookies. The events sent do not contain names,
                email addresses, phone numbers, or message text.
              </p>
            </section>
            <section>
              <h2 className="font-display text-lg font-bold text-content-strong">Cookies</h2>
              <p className="mt-2">
                After consent, Google Analytics may set first-party cookies such as <code>_ga</code> and
                <code> _ga_&lt;measurement-id&gt;</code>. They help distinguish visits and maintain analytics
                session information. Your consent choice is stored in this browser&apos;s local storage under
                <code> cookie-consent</code>; it is not an analytics cookie.
              </p>
            </section>
            <section>
              <h2 className="font-display text-lg font-bold text-content-strong">Declining or changing your choice</h2>
              <p className="mt-2">
                Choose <strong>Decline</strong> on the cookie banner to prevent GA4 from loading. You can reopen
                the banner at any time with the Cookie settings link in the footer and change your choice.
              </p>
              <button
                type="button"
                onClick={openSettings}
                className="mt-3 rounded-xl border border-line bg-card px-4 py-2 font-semibold text-primary hover:bg-card-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              >
                Open cookie settings
              </button>
            </section>
            <section>
              <h2 className="font-display text-lg font-bold text-content-strong">Contact</h2>
              <p className="mt-2">
                Questions about privacy? Email{' '}
                <a
                  className="font-semibold text-primary hover:underline"
                  href={`mailto:${contactDetails.email}`}
                  onClick={() => trackEvent(ANALYTICS_EVENTS.CLICK_EMAIL)}
                >
                  {profile.email}
                </a>.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
