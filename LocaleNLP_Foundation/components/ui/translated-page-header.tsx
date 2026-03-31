'use client';

import type { ReactNode } from 'react';
import { useTranslation } from '@/lib/i18n/TranslationContext';
import { PageHeader } from '@/components/ui/page-header';
import { GlowButton } from '@/components/ui/glow-button';

interface CtaConfig {
  labelKey: string;
  labelFallback: string;
  href: string;
  variant: 'primary' | 'ghost';
  showArrow?: boolean;
}

interface TranslatedPageHeaderProps {
  titleKey: string;
  titleGradientKey?: string;
  subtitleKey: string;
  label: string;
  number?: string;
  status?: 'active' | 'beta' | 'legacy';
  accentColor?: 'ochre' | 'cyan' | 'clay';
  cta?: ReactNode;
  children?: ReactNode;
  ctaButtons?: CtaConfig[];
}

export function TranslatedPageHeader({
  titleKey,
  titleGradientKey,
  subtitleKey,
  label,
  number,
  status,
  accentColor,
  cta,
  children,
  ctaButtons,
}: TranslatedPageHeaderProps) {
  const { t } = useTranslation();

  const resolvedCta = ctaButtons ? (
    <>
      {ctaButtons.map((btn) => (
        <GlowButton
          key={btn.href + btn.labelKey}
          href={btn.href}
          variant={btn.variant}
          showArrow={btn.showArrow}
        >
          {t(btn.labelKey, btn.labelFallback)}
        </GlowButton>
      ))}
    </>
  ) : (cta ?? children);

  return (
    <PageHeader
      label={label}
      number={number}
      status={status}
      title={t(titleKey)}
      titleGradient={titleGradientKey ? t(titleGradientKey) : undefined}
      subtitle={t(subtitleKey)}
      accentColor={accentColor}
      cta={resolvedCta}
    />
  );
}
