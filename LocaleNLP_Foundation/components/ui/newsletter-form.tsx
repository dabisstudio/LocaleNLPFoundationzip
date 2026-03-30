'use client';

import { GlowButton } from '@/components/ui/glow-button';

export function NewsletterForm() {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      aria-label="Newsletter signup"
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="insights-email" className="sr-only">
        Email address
      </label>
      <input
        type="email"
        id="insights-email"
        autoComplete="email"
        placeholder="your@email.com"
        className="flex-1 px-4 py-3 rounded-lg text-text-primary placeholder:text-text-tertiary text-sm bg-brand-elevated border border-white/8 focus:outline-none focus:border-accent-ochre/50 focus:ring-1 focus:ring-accent-ochre/20 transition-colors"
      />
      <GlowButton type="submit" variant="primary" showArrow={false}>
        Subscribe
      </GlowButton>
    </form>
  );
}
