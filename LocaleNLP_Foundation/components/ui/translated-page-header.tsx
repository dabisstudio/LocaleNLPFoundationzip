'use client';

import type { ReactNode } from 'react';
import { useTranslation } from '@/lib/i18n/TranslationContext';
import { PageHeader } from '@/components/ui/page-header';

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
}: TranslatedPageHeaderProps) {
  const { t } = useTranslation();

  return (
    <PageHeader
      label={label}
      number={number}
      status={status}
      title={t(titleKey)}
      titleGradient={titleGradientKey ? t(titleGradientKey) : undefined}
      subtitle={t(subtitleKey)}
      accentColor={accentColor}
      cta={cta}
    >
      {children}
    </PageHeader>
  );
}
