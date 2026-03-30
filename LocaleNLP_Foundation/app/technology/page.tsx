import Link from 'next/link';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { supabase, Language } from '@/lib/supabase';
import {
  Code,
  Database,
  FileCode,
  Github,
  ExternalLink,
  Cpu,
  Shield,
  Users,
  BookOpen,
} from 'lucide-react';

async function getLanguages(): Promise<Language[]> {
  const { data, error } = await supabase
    .from('languages')
    .select('*, countries(*)')
    .order('speakers_count', { ascending: false });

  if (error) return [];
  return data || [];
}

const models = [
  {
    name: 'AfriSpeech-ASR',
    description: 'Automatic speech recognition for 15+ African languages',
    languages: ['Yoruba', 'Swahili', 'Hausa', 'Amharic', 'Zulu'],
    github: 'https://github.com/localenlp/afrispeech-asr',
    version: 'v2.1.0',
  },
  {
    name: 'AfriMT',
    description: 'Neural machine translation across African languages and English',
    languages: ['Swahili', 'Yoruba', 'Igbo', 'Twi', 'Wolof'],
    github: 'https://github.com/localenlp/afrimt',
    version: 'v1.4.0',
  },
  {
    name: 'AfriVoice-TTS',
    description: 'Text-to-speech synthesis with natural African language intonation',
    languages: ['Swahili', 'Yoruba', 'Amharic', 'Hausa'],
    github: 'https://github.com/localenlp/afrivoice-tts',
    version: 'v1.2.0',
  },
];

const datasets = [
  {
    name: 'AfriSpeech Corpus',
    size: '2,400 hours',
    languages: 12,
    description: 'Multi-speaker speech corpus for African languages',
  },
  {
    name: 'AfriNews',
    size: '5M sentences',
    languages: 8,
    description: 'News articles for NLP training and evaluation',
  },
  {
    name: 'AfriDialog',
    size: '500K conversations',
    languages: 6,
    description: 'Conversational data for chatbot and dialog systems',
  },
  {
    name: 'AfriSent',
    size: '200K samples',
    languages: 10,
    description: 'Sentiment analysis dataset with cultural context',
  },
];

export default async function TechnologyPage() {
  const languages = await getLanguages();

  return (
    <>
      <Navigation />
      <main className="pt-20">
        <section className="py-24 bg-hero-gradient relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-forest-500/10 rounded-full blur-3xl" />
          </div>

          <div className="container-wide section-padding relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-forest-500/10 text-forest-400 text-sm font-medium mb-6">
                Technology & Research
              </span>
              <h1 className="text-white mb-6">
                Open Source.
                <br />
                <span className="text-gradient">Open Access. Open Future.</span>
              </h1>
              <p className="text-lg text-midnight-200">
                We believe language technology should be a public good. All our models, datasets,
                and tools are freely available for researchers and developers worldwide.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-midnight-900">
          <div className="container-wide section-padding">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-royal-500/10 text-royal-400 text-sm font-medium mb-4">
                Open Models
              </span>
              <h2 className="text-white mb-4">Production-Ready AI Models</h2>
              <p className="text-midnight-200 max-w-2xl mx-auto">
                State-of-the-art NLP models trained specifically for African languages, available
                under permissive open-source licenses.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {models.map((model) => (
                <div
                  key={model.name}
                  className="glass-card p-6 hover:border-midnight-500 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-royal-500 to-royal-600 flex items-center justify-center">
                      <Cpu className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs px-2 py-1 bg-midnight-700 rounded text-midnight-300">
                      {model.version}
                    </span>
                  </div>
                  <h3 className="text-lg font-sora font-semibold text-white mb-2">{model.name}</h3>
                  <p className="text-sm text-midnight-300 mb-4">{model.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {model.languages.slice(0, 3).map((lang) => (
                      <span
                        key={lang}
                        className="text-xs px-2 py-1 bg-midnight-800 rounded text-midnight-400"
                      >
                        {lang}
                      </span>
                    ))}
                    {model.languages.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-midnight-800 rounded text-midnight-400">
                        +{model.languages.length - 3} more
                      </span>
                    )}
                  </div>
                  <a
                    href={model.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-ochre-400 hover:text-ochre-300 transition-colors"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="datasets" className="py-20 bg-midnight-950">
          <div className="container-wide section-padding">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-ochre-500/10 text-ochre-400 text-sm font-medium mb-4">
                Open Datasets
              </span>
              <h2 className="text-white mb-4">Training Data for African NLP</h2>
              <p className="text-midnight-200 max-w-2xl mx-auto">
                High-quality, ethically-sourced datasets created in partnership with African
                communities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {datasets.map((dataset) => (
                <div key={dataset.name} className="glass-card p-6">
                  <div className="w-10 h-10 rounded-lg bg-ochre-500/10 flex items-center justify-center mb-4">
                    <Database className="w-5 h-5 text-ochre-400" />
                  </div>
                  <h3 className="font-sora font-semibold text-white mb-1">{dataset.name}</h3>
                  <p className="text-xs text-midnight-400 mb-3">{dataset.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ochre-400">{dataset.size}</span>
                    <span className="text-midnight-400">{dataset.languages} languages</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-midnight-900">
          <div className="container-wide section-padding">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-forest-500/10 text-forest-400 text-sm font-medium mb-4">
                Supported Languages
              </span>
              <h2 className="text-white mb-4">Languages We Support</h2>
              <p className="text-midnight-200 max-w-2xl mx-auto">
                Active development and resources for these African languages, with more being added
                regularly.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {languages.map((lang) => (
                <div
                  key={lang.id}
                  className="glass-card p-4 text-center hover:border-royal-500/50 transition-all"
                >
                  <h4 className="font-medium text-white mb-1">{lang.name}</h4>
                  {lang.native_name && (
                    <p className="text-xs text-ochre-400 mb-2">{lang.native_name}</p>
                  )}
                  <p className="text-xs text-midnight-400">
                    {lang.speakers_count
                      ? `${(lang.speakers_count / 1000000).toFixed(1)}M speakers`
                      : 'Data pending'}
                  </p>
                  <span
                    className={`inline-block mt-2 text-xs px-2 py-0.5 rounded ${
                      lang.status === 'active'
                        ? 'bg-forest-500/10 text-forest-400'
                        : 'bg-ochre-500/10 text-ochre-400'
                    }`}
                  >
                    {lang.status === 'active' ? 'Active' : 'In Progress'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-midnight-950">
          <div className="container-wide section-padding">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-royal-500/10 text-royal-400 text-sm font-medium mb-4">
                Ethical AI Framework
              </span>
              <h2 className="text-white mb-4">Building Responsibly</h2>
              <p className="text-midnight-200 max-w-2xl mx-auto">
                Our commitment to ethical AI development guides every decision we make.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-card p-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-forest-500 to-forest-600 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-sora font-semibold text-white mb-3">
                  Community Ownership
                </h3>
                <p className="text-midnight-300 text-sm">
                  Communities own their data and have a say in how it is used. We never collect data
                  without informed consent.
                </p>
              </div>

              <div className="glass-card p-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-royal-500 to-royal-600 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-sora font-semibold text-white mb-3">Privacy First</h3>
                <p className="text-midnight-300 text-sm">
                  All personal information is protected. Voice data is anonymized and never used for
                  surveillance or tracking.
                </p>
              </div>

              <div className="glass-card p-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ochre-500 to-ochre-600 flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-sora font-semibold text-white mb-3">Open Science</h3>
                <p className="text-midnight-300 text-sm">
                  All research is published openly. Models and data are released under permissive
                  licenses for maximum impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="docs" className="py-20 bg-midnight-900">
          <div className="container-wide section-padding text-center">
            <h2 className="text-white mb-4">Ready to Build?</h2>
            <p className="text-midnight-200 max-w-lg mx-auto mb-8">
              Explore our documentation, access our APIs, or contribute to our open-source projects.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://github.com/localenlp"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Github className="w-4 h-4 mr-2" />
                View on GitHub
              </a>
              <Link href="/get-involved" className="btn-outline">
                <Code className="w-4 h-4 mr-2" />
                Contribute
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
