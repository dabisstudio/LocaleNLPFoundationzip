import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/ui/page-header';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { MonoLabel } from '@/components/ui/mono-label';
import { GlowButton } from '@/components/ui/glow-button';
import { supabase, Language } from '@/lib/supabase';
import { Code, Database, Github, ExternalLink, Cpu, Shield, Users, BookOpen } from 'lucide-react';

async function getLanguages(): Promise<Language[]> {
  const { data, error } = await supabase
    .from('languages')
    .select('*, countries(*)')
    .order('speakers_count', { ascending: false });
  if (error) return [];
  return data || [];
}

const MODELS = [
  {
    name: 'AfriSpeech-ASR',
    description: 'Automatic speech recognition for 15+ African languages, optimised for low-resource deployment.',
    languages: ['Yoruba', 'Swahili', 'Hausa', 'Amharic', 'Zulu'],
    github: 'https://github.com/localenlp/afrispeech-asr',
    version: 'v2.1.0',
    accent: 'text-accent-ochre',
    spot: 'rgba(245,166,35,0.1)',
  },
  {
    name: 'AfriMT',
    description: 'Neural machine translation across African languages and English with direct language-pair routing.',
    languages: ['Swahili', 'Yoruba', 'Igbo', 'Twi', 'Wolof'],
    github: 'https://github.com/localenlp/afrimt',
    version: 'v1.4.0',
    accent: 'text-accent-cyan',
    spot: 'rgba(0,229,255,0.08)',
  },
  {
    name: 'AfriVoice-TTS',
    description: 'Text-to-speech synthesis with natural African language prosody and intonation patterns.',
    languages: ['Swahili', 'Yoruba', 'Amharic', 'Hausa'],
    github: 'https://github.com/localenlp/afrivoice-tts',
    version: 'v1.2.0',
    accent: 'text-accent-clay',
    spot: 'rgba(224,122,95,0.1)',
  },
];

const DATASETS = [
  { name: 'AfriSpeech Corpus', size: '2,400 hrs', languages: 12, description: 'Multi-speaker speech corpus' },
  { name: 'AfriNews', size: '5M sentences', languages: 8, description: 'News articles for NLP training' },
  { name: 'AfriDialog', size: '500K turns', languages: 6, description: 'Conversational data for dialog systems' },
  { name: 'AfriSent', size: '200K samples', languages: 10, description: 'Sentiment with cultural context' },
];

const TERMINAL_LINES = [
  { type: 'comment', text: '# LocaleNLP AfriSpeech-ASR — quick start' },
  { type: 'blank', text: '' },
  { type: 'import', text: 'from localenlp import AfriSpeechASR' },
  { type: 'blank', text: '' },
  { type: 'code', text: 'model = AfriSpeechASR.from_pretrained(' },
  { type: 'string', text: '    language="yo",  # Yoruba' },
  { type: 'string', text: '    model_version="v2.1.0",' },
  { type: 'code', text: ')' },
  { type: 'blank', text: '' },
  { type: 'code', text: 'transcript = model.transcribe("audio.wav")' },
  { type: 'output', text: '>>> transcript' },
  { type: 'result', text: '"Bawo ni o se ri agbara ede wa?"' },
];

const LINE_COLORS: Record<string, string> = {
  comment: 'text-text-tertiary',
  blank: '',
  import: 'text-accent-cyan',
  code: 'text-text-primary',
  string: 'text-accent-ochre',
  output: 'text-text-tertiary',
  result: 'text-accent-clay',
};

const ETHICAL_PILLARS = [
  {
    icon: Users,
    title: 'Community Ownership',
    description:
      'Communities own their data. We never collect without explicit, informed consent — and communities retain moral rights over their linguistic heritage.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description:
      'All personal information is protected. Voice data is anonymised and never used for surveillance, tracking, or profiling.',
  },
  {
    icon: BookOpen,
    title: 'Open Science',
    description:
      'All research is published openly. Models and datasets are released under permissive licences for maximum community benefit.',
  },
];

export default async function TechnologyPage() {
  const languages = await getLanguages();

  return (
    <>
      <Navigation />
      <main className="pt-24">
        <PageHeader
          label="TECHNOLOGY"
          number="00"
          title="Open Source."
          titleGradient="Open Access. Open Future."
          subtitle="Language technology should be a public good. All our models, datasets, and tools are freely available to researchers and developers worldwide — no paywalls, no lock-in."
          accentColor="cyan"
        >
          <GlowButton href="https://github.com/localenlp" variant="primary">
            <Github className="w-4 h-4" aria-hidden="true" />
            View on GitHub
          </GlowButton>
          <GlowButton href="/get-involved" variant="ghost">
            Contribute
          </GlowButton>
        </PageHeader>

        <section className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="text-center mb-14">
              <MonoLabel label="OPEN MODELS" number="01" className="mb-5" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Production-Ready AI Models
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                State-of-the-art NLP models trained specifically for African languages, available
                under permissive open-source licences.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {MODELS.map((model) => (
                <SpotlightCard key={model.name} spotlightColor={model.spot} className="p-6">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                      <Cpu className={`w-5 h-5 ${model.accent}`} aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs text-text-tertiary bg-white/5 px-2 py-1 rounded">
                      {model.version}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-text-primary mb-2">
                    {model.name}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {model.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {model.languages.slice(0, 3).map((lang) => (
                      <span
                        key={lang}
                        className="font-mono text-[10px] uppercase tracking-wide px-2 py-0.5 rounded bg-white/5 text-text-tertiary"
                      >
                        {lang}
                      </span>
                    ))}
                    {model.languages.length > 3 && (
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-text-tertiary">
                        +{model.languages.length - 3}
                      </span>
                    )}
                  </div>
                  <a
                    href={model.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 text-sm font-medium ${model.accent} hover:opacity-80 transition-opacity`}
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                    View on GitHub
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </SpotlightCard>
              ))}
            </div>

            <div className="glass-card overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/8 bg-brand-elevated">
                <div className="w-3 h-3 rounded-full bg-red-500/70" aria-hidden="true" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" aria-hidden="true" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" aria-hidden="true" />
                <span className="ml-3 font-mono text-xs text-text-tertiary">localenlp_demo.py</span>
              </div>
              <pre
                className="p-6 text-sm leading-7 overflow-x-auto"
                aria-label="Python code example for AfriSpeech-ASR"
              >
                {TERMINAL_LINES.map((line, i) => (
                  <div key={i} className={LINE_COLORS[line.type] || ''}>
                    {line.text || '\u00A0'}
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </section>

        <section id="datasets" className="py-20 bg-brand-deep">
          <div className="container-wide section-padding">
            <div className="text-center mb-14">
              <MonoLabel label="OPEN DATASETS" number="02" className="mb-5" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Training Data for African NLP
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                High-quality, ethically-sourced datasets created in partnership with African
                communities under community ownership agreements.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {DATASETS.map((dataset) => (
                <SpotlightCard
                  key={dataset.name}
                  spotlightColor="rgba(245,166,35,0.08)"
                  className="p-6"
                >
                  <Database className="w-5 h-5 text-accent-ochre mb-4" aria-hidden="true" />
                  <h3 className="font-display font-semibold text-text-primary mb-1">{dataset.name}</h3>
                  <p className="text-text-tertiary text-xs mb-4">{dataset.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-accent-ochre">{dataset.size}</span>
                    <span className="font-mono text-xs text-text-tertiary">
                      {dataset.languages} langs
                    </span>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {languages.length > 0 && (
          <section className="py-20 bg-brand-surface">
            <div className="container-wide section-padding">
              <div className="text-center mb-14">
                <MonoLabel label="LANGUAGE COVERAGE" number="03" className="mb-5" />
                <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                  Languages We Support
                </h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
                  Active development and language resources, with more being added from every African
                  language family.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {languages.map((lang) => (
                  <SpotlightCard
                    key={lang.id}
                    spotlightColor="rgba(245,166,35,0.08)"
                    className="p-4 text-center"
                  >
                    <h4 className="font-display font-medium text-text-primary text-sm mb-1">
                      {lang.name}
                    </h4>
                    {lang.native_name && (
                      <p className="font-mono text-xs text-accent-ochre mb-2">{lang.native_name}</p>
                    )}
                    <p className="text-xs text-text-tertiary mb-2">
                      {lang.speakers_count
                        ? `${(lang.speakers_count / 1_000_000).toFixed(1)}M speakers`
                        : 'Data pending'}
                    </p>
                    <span
                      className={`inline-block text-[10px] font-mono uppercase tracking-wide px-2 py-0.5 rounded ${
                        lang.status === 'active'
                          ? 'bg-accent-ochre/10 text-accent-ochre'
                          : 'bg-white/5 text-text-tertiary'
                      }`}
                    >
                      {lang.status === 'active' ? 'Active' : 'In Progress'}
                    </span>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-20 bg-brand-deep">
          <div className="container-wide section-padding">
            <div className="text-center mb-14">
              <MonoLabel label="ETHICAL AI" number="04" className="mb-5" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Building Responsibly
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Our commitment to ethical AI development guides every model, dataset, and
                deployment decision we make.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {ETHICAL_PILLARS.map((pillar) => (
                <SpotlightCard
                  key={pillar.title}
                  spotlightColor="rgba(245,166,35,0.08)"
                  className="p-8"
                >
                  <pillar.icon
                    className="w-7 h-7 text-accent-ochre mb-5"
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-lg font-semibold text-text-primary mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{pillar.description}</p>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        <section id="docs" className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="glass-card p-10 md:p-14 text-center max-w-3xl mx-auto">
              <MonoLabel label="READY TO BUILD" status="active" className="mb-5" />
              <h2 className="font-display text-3xl font-bold text-text-primary mb-4">
                Start Building Today
              </h2>
              <p className="text-text-secondary mb-8 max-w-lg mx-auto">
                Explore our GitHub organisation, access our APIs, or contribute to our open-source
                projects. No registration required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <GlowButton href="https://github.com/localenlp" variant="primary">
                  <Github className="w-4 h-4" aria-hidden="true" />
                  GitHub Organisation
                </GlowButton>
                <GlowButton href="/get-involved" variant="ghost">
                  <Code className="w-4 h-4" aria-hidden="true" />
                  Contribute Code
                </GlowButton>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
