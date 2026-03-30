import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/ui/page-header';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { MonoLabel } from '@/components/ui/mono-label';
import { GlowButton } from '@/components/ui/glow-button';
import { TerminalDemo } from '@/components/technology/TerminalDemo';
import { supabase, Language } from '@/lib/supabase';
import {
  Code,
  Database,
  Github,
  ExternalLink,
  Cpu,
  Shield,
  Users,
  BookOpen,
  FileText,
  Lock,
  Zap,
  Globe,
} from 'lucide-react';

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
    description:
      'Automatic speech recognition for 15+ African languages, optimised for low-resource deployment.',
    languages: ['Yoruba', 'Swahili', 'Hausa', 'Amharic', 'Zulu'],
    github: 'https://github.com/localenlp/afrispeech-asr',
    version: 'v2.1.0',
    accent: 'text-accent-ochre',
    spot: 'rgba(245,166,35,0.1)',
  },
  {
    name: 'AfriMT',
    description:
      'Neural machine translation across African languages and English with direct language-pair routing.',
    languages: ['Swahili', 'Yoruba', 'Igbo', 'Twi', 'Wolof'],
    github: 'https://github.com/localenlp/afrimt',
    version: 'v1.4.0',
    accent: 'text-accent-cyan',
    spot: 'rgba(0,229,255,0.08)',
  },
  {
    name: 'AfriVoice-TTS',
    description:
      'Text-to-speech synthesis with natural African language prosody and intonation patterns.',
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


const API_ENDPOINTS = [
  {
    method: 'POST',
    path: '/v1/asr/transcribe',
    description: 'Transcribe audio to text for a given African language.',
    auth: 'API key',
    accent: 'text-accent-ochre',
    border: 'border-accent-ochre',
    methodColor: 'text-accent-ochre bg-accent-ochre/10',
  },
  {
    method: 'POST',
    path: '/v1/mt/translate',
    description: 'Translate text between African languages and English.',
    auth: 'API key',
    accent: 'text-accent-cyan',
    border: 'border-accent-cyan',
    methodColor: 'text-accent-cyan bg-accent-cyan/10',
  },
  {
    method: 'POST',
    path: '/v1/tts/synthesise',
    description: 'Convert text to natural-sounding speech in African languages.',
    auth: 'API key',
    accent: 'text-accent-clay',
    border: 'border-accent-clay',
    methodColor: 'text-accent-clay bg-accent-clay/10',
  },
  {
    method: 'GET',
    path: '/v1/languages',
    description: 'List all supported languages with metadata and model coverage.',
    auth: 'None required',
    accent: 'text-text-secondary',
    border: 'border-white/20',
    methodColor: 'text-text-secondary bg-white/8',
  },
];

const RESEARCH_PAPERS = [
  {
    title: 'AfriSpeech: 2000+ Hours Pan-African Speech Corpus',
    venue: 'EMNLP 2023',
    authors: 'Olatunji et al.',
    description:
      'A large-scale crowdsourced speech corpus spanning 120+ African accents across 36 countries, with a focus on clinical domain ASR.',
    tags: ['Speech Recognition', 'Low-Resource', 'Pan-African'],
    accent: 'text-accent-ochre',
    bg: 'bg-accent-ochre/10',
  },
  {
    title: 'Masakhane MT: Machine Translation for African Languages',
    venue: 'ACL 2022',
    authors: 'Adelani et al.',
    description:
      'A community-driven project translating into and between African languages, demonstrating the power of participatory NLP research.',
    tags: ['Machine Translation', 'Community AI', 'Low-Resource NLP'],
    accent: 'text-accent-cyan',
    bg: 'bg-accent-cyan/10',
  },
  {
    title: 'NLP for African Languages: Challenges & Opportunities',
    venue: 'TACL 2023',
    authors: 'LocaleNLP Research Team',
    description:
      'A comprehensive survey of the current state of NLP for African languages, covering 2,000+ languages and identifying priority gaps.',
    tags: ['Survey', 'African NLP', 'Language Technology'],
    accent: 'text-accent-clay',
    bg: 'bg-accent-clay/10',
  },
];

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

            <TerminalDemo />
          </div>
        </section>

        <section id="architecture" className="py-20 bg-brand-deep">
          <div className="container-wide section-padding">
            <div className="text-center mb-14">
              <MonoLabel label="PLATFORM ARCHITECTURE" number="02" className="mb-5" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Three Pillars of Our Technology
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Our stack is designed from first principles for the realities of African
                connectivity — low bandwidth, intermittent power, and heterogeneous devices.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <SpotlightCard spotlightColor="rgba(245,166,35,0.1)" className="p-8">
                <div className="w-12 h-12 rounded-xl bg-accent-ochre/10 flex items-center justify-center mb-5">
                  <Zap className="w-6 h-6 text-accent-ochre" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-semibold text-text-primary mb-3">
                  Edge-Optimised Runtime
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Quantised models run entirely on-device using ONNX Runtime and WebAssembly.
                  Inference works offline, preserving privacy and eliminating round-trip latency on
                  sub-5 Mbps connections.
                </p>
              </SpotlightCard>

              <SpotlightCard spotlightColor="rgba(0,229,255,0.08)" className="p-8">
                <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center mb-5">
                  <Users className="w-6 h-6 text-accent-cyan" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-semibold text-text-primary mb-3">
                  Community Data Pipeline
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  A contributor-first collection stack with differential privacy, consent
                  management, and on-chain provenance. Communities retain full ownership of
                  contributions and receive equitable compensation.
                </p>
              </SpotlightCard>

              <SpotlightCard spotlightColor="rgba(224,122,95,0.1)" className="p-8">
                <div className="w-12 h-12 rounded-xl bg-accent-clay/10 flex items-center justify-center mb-5">
                  <Code className="w-6 h-6 text-accent-clay" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-semibold text-text-primary mb-3">
                  Open Inference API
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  A developer-first REST and gRPC surface — versioned, rate-limited, and free for
                  non-commercial use. All endpoints are self-hostable under our permissive licence.
                </p>
              </SpotlightCard>
            </div>
          </div>
        </section>

        <section id="api" className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="text-center mb-14">
              <MonoLabel label="REST API" number="03" className="mb-5" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                API Endpoint Reference
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Integrate African language AI directly into your applications. All endpoints accept
                JSON and return structured responses.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-12">
              <div className="space-y-3">
                {API_ENDPOINTS.map((ep) => (
                  <div
                    key={ep.path}
                    className={`glass-card p-4 border-l-2 ${ep.border}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${ep.methodColor}`}>
                        {ep.method}
                      </span>
                      <code className={`font-mono text-sm ${ep.accent}`}>{ep.path}</code>
                    </div>
                    <p className="text-text-secondary text-xs leading-relaxed mb-2">
                      {ep.description}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-text-tertiary" aria-hidden="true" />
                      <span className="font-mono text-[10px] text-text-tertiary">{ep.auth}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="rounded-xl overflow-hidden border border-white/8 bg-[#0A0A0F]"
                aria-label="Example curl request and JSON response"
              >
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-white/3">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-white/10" aria-hidden="true" />
                    <span className="w-3 h-3 rounded-full bg-white/10" aria-hidden="true" />
                    <span className="w-3 h-3 rounded-full bg-white/10" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[11px] text-text-tertiary ml-2">
                    example_request.sh
                  </span>
                </div>
                <pre className="p-5 text-xs leading-6 overflow-x-auto">
                  <code>
                    <span className="text-text-tertiary">{`# Transcribe Yoruba audio`}</span>{'\n'}
                    <span className="text-accent-cyan">curl</span>
                    <span className="text-text-secondary">{` -X POST \\`}</span>{'\n'}
                    <span className="text-text-secondary">{`  https://api.localenlp.org/v1/asr/transcribe \\`}</span>{'\n'}
                    <span className="text-text-secondary">{`  -H `}</span>
                    <span className="text-accent-ochre">{`"Authorization: Bearer $API_KEY"`}</span>
                    <span className="text-text-secondary">{` \\`}</span>{'\n'}
                    <span className="text-text-secondary">{`  -H `}</span>
                    <span className="text-accent-ochre">{`"Content-Type: application/json"`}</span>
                    <span className="text-text-secondary">{` \\`}</span>{'\n'}
                    <span className="text-text-secondary">{`  -d '`}</span>
                    <span className="text-accent-clay">{`{`}</span>{'\n'}
                    <span className="text-accent-clay">{`    "language": "yo",`}</span>{'\n'}
                    <span className="text-accent-clay">{`    "audio_url": "https://cdn.example.com/clip.wav",`}</span>{'\n'}
                    <span className="text-accent-clay">{`    "model": "afrispeech-asr-v2"`}</span>{'\n'}
                    <span className="text-accent-clay">{`  }`}</span>
                    <span className="text-text-secondary">{`'`}</span>{'\n\n'}
                    <span className="text-text-tertiary">{`# Response`}</span>{'\n'}
                    <span className="text-accent-cyan">{`{`}</span>{'\n'}
                    <span className="text-text-secondary">{`  "transcript": `}</span>
                    <span className="text-accent-ochre">{`"Bawo ni o se ri agbara ede wa?",`}</span>{'\n'}
                    <span className="text-text-secondary">{`  "confidence": `}</span>
                    <span className="text-accent-clay">{`0.94,`}</span>{'\n'}
                    <span className="text-text-secondary">{`  "language": `}</span>
                    <span className="text-accent-ochre">{`"yo",`}</span>{'\n'}
                    <span className="text-text-secondary">{`  "duration_ms": `}</span>
                    <span className="text-accent-clay">{`3200`}</span>{'\n'}
                    <span className="text-accent-cyan">{`}`}</span>
                  </code>
                </pre>
              </div>
            </div>

            <div className="text-center">
              <GlowButton href="https://docs.localenlp.org/api" variant="ghost">
                <Code className="w-4 h-4" aria-hidden="true" />
                Full API Documentation
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </GlowButton>
            </div>
          </div>
        </section>

        <section id="datasets" className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="text-center mb-14">
              <MonoLabel label="OPEN DATASETS" number="04" className="mb-5" />
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
                  <h3 className="font-display font-semibold text-text-primary mb-1">
                    {dataset.name}
                  </h3>
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
          <section className="py-20 bg-brand-deep">
            <div className="container-wide section-padding">
              <div className="text-center mb-14">
                <MonoLabel label="LANGUAGE COVERAGE" number="05" className="mb-5" />
                <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                  Languages We Support
                </h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
                  Active development and language resources, with more being added from every
                  African language family.
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

        <section id="research" className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="text-center mb-14">
              <MonoLabel label="RESEARCH PAPERS" number="06" className="mb-5" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Peer-Reviewed Publications
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Our research is published openly in top-tier NLP venues. Every paper comes with
                released code and datasets.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {RESEARCH_PAPERS.map((paper) => (
                <SpotlightCard
                  key={paper.title}
                  spotlightColor="rgba(245,166,35,0.08)"
                  className="p-7"
                >
                  <div className="flex items-center gap-2 mb-5">
                    <span
                      className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded ${paper.bg} ${paper.accent}`}
                    >
                      {paper.venue}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-text-primary mb-2 leading-snug">
                    {paper.title}
                  </h3>
                  <p className="font-mono text-xs text-text-tertiary mb-4">{paper.authors}</p>
                  <p className="text-text-secondary text-sm leading-relaxed mb-5">
                    {paper.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/8">
                    {paper.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] uppercase tracking-wide px-2 py-0.5 rounded bg-white/5 text-text-tertiary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              ))}
            </div>

            <div className="text-center mt-10">
              <GlowButton href="/insights" variant="ghost">
                <FileText className="w-4 h-4" aria-hidden="true" />
                All Publications
              </GlowButton>
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-deep">
          <div className="container-wide section-padding">
            <div className="text-center mb-14">
              <MonoLabel label="ETHICAL AI" number="07" className="mb-5" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Building Responsibly
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Our commitment to ethical AI development guides every model, dataset, and deployment
                decision we make.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {ETHICAL_PILLARS.map((pillar) => (
                <SpotlightCard
                  key={pillar.title}
                  spotlightColor="rgba(245,166,35,0.08)"
                  className="p-8"
                >
                  <pillar.icon className="w-7 h-7 text-accent-ochre mb-5" aria-hidden="true" />
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
