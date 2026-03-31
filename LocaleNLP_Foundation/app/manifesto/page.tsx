import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { KernHeading } from '@/components/ui/kern-heading';
import { GlowButton } from '@/components/ui/glow-button';

export const metadata = {
  title: "Founder's Manifesto | LocaleNLP Foundation",
  description:
    'Artificial Intelligence is writing the future of humanity. But it is writing it in only three languages. The founding statement of LocaleNLP Foundation.',
};

const SECTIONS = [
  {
    number: '01',
    title: 'The Three Languages of Power',
    body: [
      'English, Mandarin, Spanish. Three languages that together represent fewer than half of the world\'s speakers have captured nearly all of the world\'s AI training data. Every large language model, every speech recognition system, every neural translation engine — built predominantly on the voices of the already-powerful.',
      'This is not an accident. It is the predictable outcome of building intelligence on top of existing economic structures. Data is expensive to collect. Labelling is labour-intensive. Infrastructure costs money. And so AI learns, overwhelmingly, from those who already have enough of all three.',
      'The consequence is a compounding inequality. Languages with fewer digital resources produce worse AI tools. Worse tools mean communities do not adopt digital services. Adoption gap means fewer digital traces. Fewer traces mean even less training data. The model degrades further. Communities fall further behind. The loop closes. The silence deepens.',
    ],
  },
  {
    number: '02',
    title: 'What Is Lost When Languages Are Erased',
    body: [
      'A language is not simply a medium of communication. It is a filing system for reality — a unique way of categorising time, kinship, ecology, moral obligation. When Dinka speakers in South Sudan cannot access healthcare information in their language, it is not merely an inconvenience. It is a failure of the global infrastructure to recognise that they are fully human.',
      'Pulaar encodes relationships to land and community that no English translation fully captures. Kabyle carries mathematical intuitions developed across millennia of oral scholarship. Amharic\'s fidel script is not a curiosity — it is a living cognitive architecture. Each language that falls below the threshold of "AI-useful" takes with it a way of knowing the world that no amount of English corpora can reconstruct.',
      'We have done this before. Colonial education systems, broadcast media monocultures, and internet architecture have each taken their turn narrowing the bandwidth of human expression. AI, unchecked, will finish the job. The velocity will be unmatched. The irreversibility will be total.',
    ],
  },
  {
    number: '03',
    title: 'Africa Is Not a Use Case',
    body: [
      'We reject, completely, the framing that positions African languages as a "growth opportunity" or an "underserved market." Africa is not a segment. Its people are not late adopters awaiting the gift of outside innovation. They are linguists, researchers, engineers, farmers, doctors, teachers — the most linguistically diverse population on Earth — and they deserve AI infrastructure that is built by them and for them, not extracted from them and sold back at a premium.',
      'The pan-African linguistic ecosystem represents over a third of all documented human languages. More varieties. More tonal registers. More morphological complexity. More grammatical innovation than any other region on the planet. Africa is not a problem to be solved by Western AI. Africa is an intellectual frontier from which the entire discipline of computational linguistics has everything to learn.',
      'Our research is not charity. It is restitution — of attention, of resources, and of the institutional legitimacy that has been directed elsewhere for too long.',
    ],
  },
  {
    number: '04',
    title: 'Open Infrastructure as Liberation',
    body: [
      'We have made specific, deliberate choices about how to build. Everything we produce is open-source. Every model weight, every training corpus, every annotation schema is released under permissive licences. We do not file for patents. We do not build proprietary moats. We will not, under any circumstances, sell access to the cultural patrimony of communities who trusted us with their voices.',
      'This is a political position, not merely a technical preference. Proprietary AI infrastructure is a mechanism of dependency. Closed data pipelines are a form of enclosure. When a single corporation controls the speech recognition models for an entire language, it controls a critical piece of that community\'s ability to participate in digital civic life. We refuse to be that corporation.',
      'Open is harder. Open means accepting external scrutiny. Open means slower monetisation curves that make investors nervous. Open means contributing to something that competitors can also use. We accept all of this, without reservation, because the alternative is to replicate exactly the power structures that created the language equity crisis in the first place.',
    ],
  },
  {
    number: '05',
    title: 'The Compact We Make Today',
    body: [
      'We are a foundation. We are not neutral. We are structurally committed to the position that the communities whose languages we work on are the primary beneficiaries of that work — not an afterthought, not a marketing vertical, not a data source. Every decision we make passes through this test: does this choice increase or decrease the agency of the communities we serve?',
      'We measure success differently from venture-backed AI companies. Not in valuations. Not in API call volume. In whether a child in Malawi can ask a health question in Chichewa and receive a trustworthy, locally-appropriate answer. In whether a court proceeding in Cameroon can be conducted and recorded in Fulfulde. In whether a grandmother in Eritrea can hear Tigrinya spoken back to her by a machine that understands what she is actually saying.',
      'These are not modest ambitions. They require serious engineering, sustained funding, institutional courage, and the kind of political will that does not expire when the news cycle moves on. We are asking for all of it. We are asking you — researcher, funder, technologist, policymaker, speaker — to consider that the intelligence era, built right, could be the most linguistically inclusive in human history. We are also asking you to consider what it looks like if it is not.',
    ],
  },
];

export default function ManifestoPage() {
  return (
    <>
      <Navigation />

      <main id="main-content">
        <section className="relative min-h-[72vh] flex flex-col justify-end py-24 overflow-hidden" style={{ backgroundColor: '#04040A' }}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(0,229,255,0.055), transparent 65%)',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:80px_80px]"
          />

          <div className="container-wide section-padding relative z-10">
            <div className="max-w-4xl">
              <p className="font-mono text-xs text-accent-cyan tracking-widest uppercase mb-10">
                [ FOUNDER&apos;S MANIFESTO // PUBLISHED 2026 ]
              </p>

              <h1 className="font-display font-bold leading-[1.07] text-white mb-10"
                style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}>
                Artificial Intelligence is writing the future of humanity.{' '}
                <span className="text-accent-cyan">But it is writing it in only three languages.</span>
              </h1>

              <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-3xl mb-12">
                A founding statement on language equity, digital sovereignty, and the responsibility of those who build machines that think.
              </p>

              <GlowButton href="/donate" variant="primary">
                Support This Work
              </GlowButton>
            </div>
          </div>
        </section>

        <div className="border-t border-white/6" aria-hidden="true" />

        <article className="bg-brand-deep">
          {SECTIONS.map((section, i) => (
            <section
              key={section.number}
              className={i % 2 === 0 ? 'bg-brand-deep' : 'bg-brand-surface'}
            >
              <div className="container-wide section-padding py-20">
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-baseline gap-4 mb-8">
                    <span className="font-mono text-xs text-accent-cyan tracking-widest shrink-0">
                      {section.number}
                    </span>
                    <div className="flex-1 h-px bg-white/8" aria-hidden="true" />
                  </div>

                  <KernHeading
                    as="h2"
                    className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-10"
                  >
                    {section.title}
                  </KernHeading>

                  <div className="space-y-6">
                    {section.body.map((para, j) => (
                      <p
                        key={j}
                        className="text-text-secondary text-base md:text-lg leading-relaxed"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}

          <section className="bg-brand-deep">
            <div className="container-wide section-padding py-20">
              <div className="max-w-3xl mx-auto">
                <div className="h-px bg-white/8 mb-12" aria-hidden="true" />

                <p className="font-mono text-sm text-text-secondary leading-relaxed mb-4 italic">
                  This manifesto was written by the founding team of LocaleNLP Foundation and represents
                  our collective commitment to language equity in the development of artificial intelligence.
                  It is a living document, subject to revision as we learn. It is not subject to compromise
                  on the principles it describes.
                </p>

                <p className="font-mono text-base text-accent-cyan">
                  — The LocaleNLP Founding Team
                </p>
              </div>
            </div>
          </section>

          <section className="bg-brand-surface border-t border-white/8">
            <div className="container-wide section-padding py-16">
              <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
                <div>
                  <p className="font-display text-xl font-bold text-white mb-1">
                    Put your resources behind the mission.
                  </p>
                  <p className="text-text-secondary text-sm">
                    Fund language data, fellowship researchers, or donate directly.
                  </p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <GlowButton href="/donate" variant="primary" showArrow={false}>
                    Donate
                  </GlowButton>
                  <GlowButton href="/get-involved" variant="ghost" showArrow={false}>
                    Get Involved
                  </GlowButton>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
