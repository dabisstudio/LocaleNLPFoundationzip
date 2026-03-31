'use client';

import { GlowButton } from '@/components/ui/glow-button';
import { useTranslation } from '@/lib/i18n/TranslationContext';

export function NewsletterForm() {
  const { t } = useTranslation();
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      aria-label={t('form.newsletter_aria', 'Newsletter signup')}
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="insights-email" className="sr-only">
        {t('form.email_label', 'Email address')}
      </label>
      <input
        type="email"
        id="insights-email"
        autoComplete="email"
        placeholder={t('form.email_placeholder', 'your@email.com')}
        className="flex-1 px-4 py-3 rounded-lg text-text-primary placeholder:text-text-tertiary text-sm bg-base-stone border border-ink-monument/10 focus:outline-none focus:border-accent-ochre/50 focus:ring-1 focus:ring-accent-ochre/20 transition-colors"
      />
      <GlowButton type="submit" variant="primary" showArrow={false}>
        {t('form.subscribe', 'Subscribe')}
      </GlowButton>
    </form>
  );
}
