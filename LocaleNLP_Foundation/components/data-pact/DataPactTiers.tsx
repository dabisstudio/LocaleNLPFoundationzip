'use client';

import { Check } from 'lucide-react';
import { GlowButton } from '@/components/ui/glow-button';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n/TranslationContext';

type Tier = {
  id: string;
  badgeKey: string;
  nameKey: string;
  costKey: string;
  costSubKey: string;
  descKey: string;
  featuresKeys: string[];
  ctaKey: string;
  ctaHref: string;
  color: string;
  bgColor: string;
  borderColor: string;
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    id: 'contributor',
    badgeKey: 'pact.tier.contributor.badge',
    nameKey: 'pact.tier.contributor.name',
    costKey: 'pact.tier.contributor.cost',
    costSubKey: 'pact.tier.contributor.cost_sub',
    descKey: 'pact.tier.contributor.desc',
    featuresKeys: [
      'pact.tier.contributor.f1',
      'pact.tier.contributor.f2',
      'pact.tier.contributor.f3',
      'pact.tier.contributor.f4',
    ],
    ctaKey: 'pact.tier.contributor.cta',
    ctaHref: '/get-involved',
    color: '#F5A623',
    bgColor: 'rgba(245,166,35,0.05)',
    borderColor: 'rgba(245,166,35,0.18)',
  },
  {
    id: 'academic',
    badgeKey: 'pact.tier.academic.badge',
    nameKey: 'pact.tier.academic.name',
    costKey: 'pact.tier.academic.cost',
    costSubKey: 'pact.tier.academic.cost_sub',
    descKey: 'pact.tier.academic.desc',
    featuresKeys: [
      'pact.tier.academic.f1',
      'pact.tier.academic.f2',
      'pact.tier.academic.f3',
      'pact.tier.academic.f4',
    ],
    ctaKey: 'pact.tier.academic.cta',
    ctaHref: '/technology#sandbox',
    color: '#00E5FF',
    bgColor: 'rgba(0,229,255,0.05)',
    borderColor: 'rgba(0,229,255,0.18)',
    featured: true,
  },
  {
    id: 'enterprise',
    badgeKey: 'pact.tier.enterprise.badge',
    nameKey: 'pact.tier.enterprise.name',
    costKey: 'pact.tier.enterprise.cost',
    costSubKey: 'pact.tier.enterprise.cost_sub',
    descKey: 'pact.tier.enterprise.desc',
    featuresKeys: [
      'pact.tier.enterprise.f1',
      'pact.tier.enterprise.f2',
      'pact.tier.enterprise.f3',
      'pact.tier.enterprise.f4',
      'pact.tier.enterprise.f5',
    ],
    ctaKey: 'pact.tier.enterprise.cta',
    ctaHref: '/get-involved#contact',
    color: '#E07A5F',
    bgColor: 'rgba(224,122,95,0.05)',
    borderColor: 'rgba(224,122,95,0.18)',
  },
];

export function DataPactTiers() {
  const { t } = useTranslation();

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {TIERS.map((tier) => (
        <article
          key={tier.id}
          className={cn(
            'relative flex flex-col rounded-2xl border p-6 transition-colors duration-200',
          )}
          style={{ backgroundColor: tier.bgColor, borderColor: tier.borderColor }}
          aria-label={t(tier.nameKey)}
        >
          {tier.featured && (
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border"
              style={{ color: tier.color, backgroundColor: `${tier.color}15`, borderColor: `${tier.color}30` }}
            >
              {t('pact.tier.recommended', 'Recommended')}
            </div>
          )}

          <div className="mb-5">
            <span
              className="inline-block px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-widest mb-3"
              style={{ color: tier.color, backgroundColor: `${tier.color}12` }}
            >
              {t(tier.badgeKey)}
            </span>
            <h3 className="text-ink-monument font-bold text-lg mb-1">{t(tier.nameKey)}</h3>
            <p className="text-2xl font-bold mb-0.5" style={{ color: tier.color }}>
              {t(tier.costKey)}
            </p>
            <p className="text-text-tertiary text-xs">{t(tier.costSubKey)}</p>
          </div>

          <p className="text-text-secondary text-sm leading-relaxed mb-5 flex-1">
            {t(tier.descKey)}
          </p>

          <ul className="space-y-2.5 mb-6">
            {tier.featuresKeys.map((fk) => (
              <li key={fk} className="flex items-start gap-2 text-text-secondary text-sm">
                <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: tier.color }} aria-hidden="true" />
                {t(fk)}
              </li>
            ))}
          </ul>

          {tier.id === 'enterprise' ? (
            <GlowButton href={tier.ctaHref} variant="primary" className="w-full justify-center text-sm">
              {t(tier.ctaKey)}
            </GlowButton>
          ) : (
            <GlowButton href={tier.ctaHref} variant="ghost" className="w-full justify-center text-sm">
              {t(tier.ctaKey)}
            </GlowButton>
          )}
        </article>
      ))}
    </div>
  );
}
