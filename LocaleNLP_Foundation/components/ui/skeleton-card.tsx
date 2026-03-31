export function SkeletonCard() {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-ink-monument/10 bg-base-pure p-6"
      aria-hidden="true"
    >
      <div className="flex items-start justify-between mb-5">
        <div className="w-7 h-7 rounded-md bg-ink-monument/6 animate-pulse" />
        <div className="w-20 h-4 rounded bg-ink-monument/6 animate-pulse" />
      </div>

      <div className="space-y-2 mb-4">
        <div className="h-5 rounded bg-ink-monument/6 animate-pulse w-3/4" />
        <div className="h-4 rounded bg-ink-monument/6 animate-pulse w-1/2" />
      </div>

      <div className="space-y-1.5">
        <div className="h-3.5 rounded bg-ink-monument/6 animate-pulse w-full" />
        <div className="h-3.5 rounded bg-ink-monument/6 animate-pulse w-5/6" />
        <div className="h-3.5 rounded bg-ink-monument/6 animate-pulse w-4/6" />
      </div>

      <div className="mt-5 h-4 rounded bg-ink-monument/6 animate-pulse w-24" />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, transparent 40%, rgba(12,12,12,0.03) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
          animation: 'skeleton-shimmer 1.6s ease-in-out infinite',
        }}
      />
    </div>
  );
}
