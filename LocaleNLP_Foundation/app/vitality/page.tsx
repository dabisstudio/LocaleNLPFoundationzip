import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { TranslatedPageHeader } from '@/components/ui/translated-page-header';
import { VitalityExplorer } from '@/components/vitality/VitalityExplorer';
import { CommunityImpactExplorer } from '@/components/vitality/CommunityImpactExplorer';
import { VITALITY_DATA, VITALITY_SUMMARY } from '@/lib/vitality-data';

export const metadata = {
  title: 'Digital Language Vitality Index | LocaleNLP Foundation',
  description:
    'Explore the AI readiness of 2,000+ African languages. Track tokens, speech hours, and deployment readiness across the continent.',
};

export default function VitalityPage() {
  return (
    <>
      <Navigation />

      <main id="main-content">
        <TranslatedPageHeader
          label="Digital Language Vitality Index"
          number="VI"
          status="beta"
          accentColor="cyan"
          titleKey="vitality.page_title"
          titleGradientKey="vitality.page_title_gradient"
          subtitleKey="vitality.page_subtitle"
          ctaButtons={[
            { labelKey: 'cta.fund_bounty', labelFallback: 'Fund a Data Bounty', href: '/bounties', variant: 'primary' },
            { labelKey: 'cta.contribute_data', labelFallback: 'Contribute Data', href: '/get-involved', variant: 'ghost' },
          ]}
        />

        <section className="bg-base-pure border-b border-ink-monument/8">
          <div className="container-wide section-padding py-8">
            <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
              <SummaryMetric value={VITALITY_SUMMARY.totalLanguages} label="Languages Audited" accent="cyan" />
              <SummaryMetric
                value={fmtBig(VITALITY_SUMMARY.totalTokens)}
                label="Total Open Tokens"
                accent="cyan"
              />
              <SummaryMetric
                value={`${(VITALITY_SUMMARY.totalSpeechHours / 1000).toFixed(0)}K+`}
                label="Speech Hours"
                accent="cyan"
              />
              <SummaryMetric value={VITALITY_SUMMARY.deployable} label="Deployable" accent="deployable" />
              <SummaryMetric value={VITALITY_SUMMARY.emerging} label="Emerging Corpus" accent="ochre" />
              <SummaryMetric value={VITALITY_SUMMARY.critical} label="Critical Debt" accent="clay" />
            </dl>
          </div>
        </section>

        <VitalityExplorer data={VITALITY_DATA} />

        <CommunityImpactExplorer />
      </main>

      <Footer />
    </>
  );
}

function fmtBig(n: number): string {
  if (n >= 1e12) return `${(n / 1e12).toFixed(1)}T`;
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(0)}M`;
  return String(n);
}

type AccentKey = 'cyan' | 'ochre' | 'clay' | 'deployable';

const ACCENT_CLASSES: Record<AccentKey, string> = {
  cyan:       'text-accent-cyan',
  ochre:      'text-accent-ochre',
  clay:       'text-accent-clay',
  deployable: 'text-accent-cyan',
};

function SummaryMetric({
  value,
  label,
  accent,
}: {
  value: string | number;
  label: string;
  accent: AccentKey;
}) {
  return (
    <div>
      <dt className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest mb-1">
        {label}
      </dt>
      <dd className={`font-display text-2xl font-bold ${ACCENT_CLASSES[accent]}`}>
        {value}
      </dd>
    </div>
  );
}
