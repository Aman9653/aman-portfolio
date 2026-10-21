import { motion, useReducedMotion } from 'framer-motion';
import Skeleton from './Skeleton';

function HomeSkeleton() {
  return (
    <div className="shell grid min-h-[80vh] items-center gap-10 py-24 lg:grid-cols-2">
      <div className="space-y-5">
        <Skeleton variant="text" className="!h-4 !w-40" />
        <Skeleton variant="title" className="!h-14 !w-4/5 sm:!h-16" />
        <div className="space-y-3">
          <Skeleton variant="text" className="!h-4 !w-full" />
          <Skeleton variant="text" className="!h-4 !w-5/6" />
        </div>
        <div className="flex gap-3 pt-2">
          <Skeleton variant="button" className="!w-36" />
          <Skeleton variant="button" className="!w-36" />
        </div>
      </div>
      <Skeleton variant="image" className="!h-64 !w-full sm:!h-96" rounded="2rem" />
    </div>
  );
}

function ProjectSkeleton() {
  return (
    <main className="shell min-h-screen max-w-5xl space-y-8 pb-20 pt-24 sm:pt-32">
      <Skeleton variant="text" className="!h-4 !w-36" />
      <header className="space-y-4">
        <Skeleton variant="title" className="!h-12 !w-4/5 sm:!h-14" />
        <Skeleton variant="text" className="!h-4 !w-3/4" />
      </header>
      <div className="grid grid-cols-2 gap-4 rounded-3xl border border-line bg-card p-5 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} variant="card" className="!h-20 !w-full" rounded="1rem" />
        ))}
      </div>
      <Skeleton variant="image" className="!h-64 !w-full sm:!h-[28rem]" rounded="1.5rem" />
      <div className="grid gap-8 md:grid-cols-2">
        <Skeleton variant="card" className="!h-36 !w-full" rounded="1rem" />
        <Skeleton variant="card" className="!h-36 !w-full" rounded="1rem" />
      </div>
    </main>
  );
}

function OtherSkeleton() {
  return (
    <main className="shell min-h-screen space-y-6 pb-20 pt-32">
      <Skeleton variant="title" className="!h-12 !w-2/3" />
      {Array.from({ length: 3 }, (_, index) => (
        <Skeleton key={index} variant="text" className="!h-4 !w-full max-w-3xl" />
      ))}
    </main>
  );
}

export default function RouteSkeleton({ pathname }) {
  const shouldReduce = useReducedMotion();
  const content = pathname === '/' ? <HomeSkeleton /> : pathname.startsWith('/projects/') ? <ProjectSkeleton /> : <OtherSkeleton />;

  return (
    <motion.div
      className="fixed inset-0 z-[90] overflow-y-auto bg-canvas"
      aria-busy="true"
      role="status"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduce ? 0 : 0.2 }}
    >
      <span className="sr-only">Loading</span>
      <div aria-hidden="true">{content}</div>
    </motion.div>
  );
}
