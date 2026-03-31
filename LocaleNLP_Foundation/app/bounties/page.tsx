import { createClient } from '@supabase/supabase-js';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/ui/page-header';
import { BountyBoard } from '@/components/bounties/BountyBoard';
import { GlowButton } from '@/components/ui/glow-button';
import type { LanguageBounty } from '@/lib/supabase';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Language Data Bounties | LocaleNLP Foundation',
  description:
    'Fund specific language data deficits across Africa. Every dollar goes directly to community voice collectors, transcribers, and annotators.',
};

async function fetchBounties(): Promise<LanguageBounty[]> {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const { data, error } = await client
    .from('language_bounties')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) return FALLBACK_BOUNTIES;
  return data as LanguageBounty[];
}

export default async function BountiesPage() {
  const bounties = await fetchBounties();

  const openCount      = bounties.filter((b) => b.bounty_status !== 'fulfilled').length;
  const totalFunded    = bounties.reduce((s, b) => s + b.current_funding_usd, 0);
  const totalGoal      = bounties.reduce((s, b) => s + b.funding_goal_usd, 0);
  const criticalCount  = bounties.filter((b) => b.urgency_level === 'critical').length;

  return (
    <>
      <Navigation />
      <main className="pt-24">
      <PageHeader
        label="Data Bounties"
        number="01"
        status="active"
        title="Fund the Languages"
        titleGradient="the World Ignores"
        subtitle="Specific, transparent, and community-accountable. Each bounty is a real data deficit with a funding target. Every dollar moves directly to local voice collectors, transcribers, and annotators."
        accentColor="ochre"
        cta={
          <>
            <GlowButton href="#bounties" variant="primary">
              Browse Open Bounties
            </GlowButton>
            <GlowButton href="/get-involved" variant="ghost" showArrow={false}>
              Become a Contributor
            </GlowButton>
          </>
        }
      />

      <section className="border-b border-white/8 bg-brand-surface">
        <div className="container-wide section-padding py-10">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <dt className="font-mono text-xs text-text-secondary uppercase tracking-widest mb-1">Open Bounties</dt>
              <dd className="font-display text-3xl font-bold text-white">{openCount}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-text-secondary uppercase tracking-widest mb-1">Critical Needs</dt>
              <dd className="font-display text-3xl font-bold text-accent-clay">{criticalCount}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-text-secondary uppercase tracking-widest mb-1">Raised to Date</dt>
              <dd className="font-display text-3xl font-bold text-accent-ochre">
                ${(totalFunded / 1000).toFixed(0)}k
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-text-secondary uppercase tracking-widest mb-1">Languages Covered</dt>
              <dd className="font-display text-3xl font-bold text-accent-cyan">{bounties.length}</dd>
            </div>
          </dl>
        </div>
      </section>

      <div id="bounties">
        <BountyBoard bounties={bounties} />
      </div>

      <section className="border-t border-white/8 bg-brand-surface">
        <div className="container-wide section-padding py-20 text-center">
          <p className="font-mono text-xs text-accent-ochre uppercase tracking-widest mb-4">
            [ TRANSPARENCY ]
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            100% of bounty funds reach the community
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            LocaleNLP takes no platform fee on data bounties. Funds are held in escrow per language community and released milestone-by-milestone, tracked on-chain.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GlowButton href="/technology#escrow" variant="ghost" showArrow={false}>
              View Escrow Architecture
            </GlowButton>
            <GlowButton href="/donate" variant="primary">
              Make a General Donation
            </GlowButton>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}

const FALLBACK_BOUNTIES: LanguageBounty[] = [
  {
    id: 'f1', title: 'Medical Terminology in Wolof',
    language_code: 'wo', language_name: 'Wolof',
    modality: 'Speech', target_hours: 50,
    funding_goal_usd: 12000, current_funding_usd: 3200,
    bounty_status: 'funding', urgency_level: 'critical',
    contributors_engaged: 12, created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'f2', title: 'Agricultural Advisory — Bambara',
    language_code: 'bm', language_name: 'Bambara',
    modality: 'Speech', target_hours: 80,
    funding_goal_usd: 18000, current_funding_usd: 18000,
    bounty_status: 'fulfilled', urgency_level: 'standard',
    contributors_engaged: 47, created_at: '2026-01-02T00:00:00Z',
  },
  {
    id: 'f3', title: 'Legal Corpus — Hausa',
    language_code: 'ha', language_name: 'Hausa',
    modality: 'Text-Pair', target_hours: 120,
    funding_goal_usd: 24000, current_funding_usd: 9600,
    bounty_status: 'active_collection', urgency_level: 'critical',
    contributors_engaged: 31, created_at: '2026-01-03T00:00:00Z',
  },
  {
    id: 'f4', title: 'Maternal Health IVR — Darija',
    language_code: 'ar', language_name: 'Darija',
    modality: 'Transcription', target_hours: 40,
    funding_goal_usd: 9000, current_funding_usd: 1800,
    bounty_status: 'funding', urgency_level: 'critical',
    contributors_engaged: 5, created_at: '2026-01-04T00:00:00Z',
  },
  {
    id: 'f5', title: 'Literacy Prompts — Pulaar',
    language_code: 'ff', language_name: 'Pulaar',
    modality: 'Text-Pair', target_hours: 60,
    funding_goal_usd: 14000, current_funding_usd: 7200,
    bounty_status: 'active_collection', urgency_level: 'standard',
    contributors_engaged: 18, created_at: '2026-01-05T00:00:00Z',
  },
  {
    id: 'f6', title: 'News Broadcast Corpus — Tigrinya',
    language_code: 'ti', language_name: 'Tigrinya',
    modality: 'Speech', target_hours: 200,
    funding_goal_usd: 38000, current_funding_usd: 4000,
    bounty_status: 'funding', urgency_level: 'standard',
    contributors_engaged: 8, created_at: '2026-01-06T00:00:00Z',
  },
  {
    id: 'f7', title: 'Oral History Archive — Somali',
    language_code: 'so', language_name: 'Somali',
    modality: 'Transcription', target_hours: 300,
    funding_goal_usd: 55000, current_funding_usd: 55000,
    bounty_status: 'fulfilled', urgency_level: 'standard',
    contributors_engaged: 92, created_at: '2026-01-07T00:00:00Z',
  },
  {
    id: 'f8', title: 'Conversational NLP Dataset — Amharic',
    language_code: 'am', language_name: 'Amharic',
    modality: 'Text-Pair', target_hours: 150,
    funding_goal_usd: 32000, current_funding_usd: 11000,
    bounty_status: 'active_collection', urgency_level: 'critical',
    contributors_engaged: 24, created_at: '2026-01-08T00:00:00Z',
  },
];
