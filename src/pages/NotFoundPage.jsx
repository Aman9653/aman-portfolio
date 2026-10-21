import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { defaultTitle, siteUrl } from '../config/site';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>{`Page not found | ${defaultTitle}`}</title>
        <meta name="description" content="The page you requested could not be found." />
        <meta name="theme-color" content="#F8FAFC" />
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href={siteUrl} />
      </Helmet>
      <main className="shell grid min-h-screen place-content-center justify-items-center py-24 text-center">
        <p className="font-display text-8xl font-bold text-gradient sm:text-9xl">404</p>
        <h1 className="mt-3 font-display text-2xl font-bold text-content-strong">This page wandered off</h1>
        <p className="mt-2 text-content-muted">The page you are looking for does not exist.</p>
        <Link to="/" className="btn btn-primary mt-7">Back to Home</Link>
      </main>
    </>
  );
}
