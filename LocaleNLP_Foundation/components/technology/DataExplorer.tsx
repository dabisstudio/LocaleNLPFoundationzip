'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

type Modality = 'speech' | 'text';

interface SpeechEntry {
  id: string;
  dialect: string;
  confidence_score: number;
  speaker_id: string;
  duration_ms: number;
  sample_rate: number;
  en: string;
  fr: string;
}

interface TextEntry {
  id: string;
  language: string;
  lang_code: string;
  sentence: string;
  tokens: string[];
  num_tokens: number;
  annotation_tier: string;
  en: string;
}

interface LanguageData {
  speech: SpeechEntry;
  text: TextEntry;
}

const EXPLORER_DATA: Record<string, LanguageData> = {
  Wolof: {
    speech: {
      id: 'WOL-3847',
      dialect: 'Senegalese-Wolof',
      confidence_score: 0.98,
      speaker_id: 'SPK-0091',
      duration_ms: 3200,
      sample_rate: 16000,
      en: 'The knowledge of a language is the preservation of a culture.',
      fr: 'La connaissance d\'une langue est la préservation d\'une culture.',
    },
    text: {
      id: 'WOL-T-0412',
      language: 'Wolof',
      lang_code: 'wol',
      sentence: 'Wolof ci Senegaal la jëfandikoo.',
      tokens: ['Wolof', 'ci', 'Senegaal', 'la', 'jëfandikoo'],
      num_tokens: 5,
      annotation_tier: 'B2',
      en: 'Wolof is the language used in Senegal.',
    },
  },
  Darija: {
    speech: {
      id: 'DAR-1092',
      dialect: 'Moroccan-Darija',
      confidence_score: 0.95,
      speaker_id: 'SPK-0214',
      duration_ms: 2800,
      sample_rate: 16000,
      en: 'Our dialect carries the memory of generations.',
      fr: 'Notre dialecte porte la mémoire des générations.',
    },
    text: {
      id: 'DAR-T-0187',
      language: 'Darija',
      lang_code: 'ary',
      sentence: 'هاد اللغة هي اللغة ديال بلادنا.',
      tokens: ['هاد', 'اللغة', 'هي', 'اللغة', 'ديال', 'بلادنا'],
      num_tokens: 6,
      annotation_tier: 'B1',
      en: 'This language is the language of our country.',
    },
  },
  Bambara: {
    speech: {
      id: 'BAM-0738',
      dialect: 'Bamako-Bambara',
      confidence_score: 0.96,
      speaker_id: 'SPK-0057',
      duration_ms: 3500,
      sample_rate: 16000,
      en: 'Language is the bridge between communities.',
      fr: 'La langue est le pont entre les communautés.',
    },
    text: {
      id: 'BAM-T-0294',
      language: 'Bambara',
      lang_code: 'bam',
      sentence: 'Bamanankan ye sira ye mɔgɔw tɛmɛnna.',
      tokens: ['Bamanankan', 'ye', 'sira', 'ye', 'mɔgɔw', 'tɛmɛnna'],
      num_tokens: 6,
      annotation_tier: 'A2',
      en: 'Bambara is the bridge between people.',
    },
  },
  Yoruba: {
    speech: {
      id: 'YOR-2156',
      dialect: 'Lagos-Yoruba',
      confidence_score: 0.97,
      speaker_id: 'SPK-0183',
      duration_ms: 2950,
      sample_rate: 16000,
      en: 'The voice of the people must be heard in every technology.',
      fr: 'La voix des peuples doit être entendue dans chaque technologie.',
    },
    text: {
      id: 'YOR-T-0631',
      language: 'Yoruba',
      lang_code: 'yor',
      sentence: 'Bawo ni o se ri agbara ede wa?',
      tokens: ['Bawo', 'ni', 'o', 'se', 'ri', 'agbara', 'ede', 'wa'],
      num_tokens: 8,
      annotation_tier: 'B1',
      en: 'How do you see the power of our language?',
    },
  },
  Amharic: {
    speech: {
      id: 'AMH-4401',
      dialect: 'Addis-Amharic',
      confidence_score: 0.94,
      speaker_id: 'SPK-0312',
      duration_ms: 4100,
      sample_rate: 16000,
      en: 'Every word spoken is a thread in the fabric of our identity.',
      fr: 'Chaque mot prononcé est un fil dans le tissu de notre identité.',
    },
    text: {
      id: 'AMH-T-0078',
      language: 'Amharic',
      lang_code: 'amh',
      sentence: 'ቋንቋ የማንነታችን አካል ነው።',
      tokens: ['ቋንቋ', 'የማንነታችን', 'አካል', 'ነው'],
      num_tokens: 4,
      annotation_tier: 'A1',
      en: 'Language is part of our identity.',
    },
  },
  Swahili: {
    speech: {
      id: 'SWA-0925',
      dialect: 'Coastal-Swahili',
      confidence_score: 0.99,
      speaker_id: 'SPK-0028',
      duration_ms: 2600,
      sample_rate: 16000,
      en: 'Swahili is a language that unites the continent.',
      fr: 'Le swahili est une langue qui unit le continent.',
    },
    text: {
      id: 'SWA-T-0503',
      language: 'Swahili',
      lang_code: 'swh',
      sentence: 'Lugha yetu ni mali yetu ya pamoja.',
      tokens: ['Lugha', 'yetu', 'ni', 'mali', 'yetu', 'ya', 'pamoja'],
      num_tokens: 7,
      annotation_tier: 'B2',
      en: 'Our language is our shared treasure.',
    },
  },
};

const LANGUAGES = Object.keys(EXPLORER_DATA);

const WAVEFORM_HEIGHTS = [
  0.3, 0.5, 0.8, 0.6, 0.9, 0.4, 0.7, 0.95, 0.5, 0.6, 0.85, 0.4, 0.7, 0.3, 0.9, 0.6,
  0.5, 0.8, 0.4, 0.95, 0.6, 0.7, 0.3, 0.85, 0.5, 0.6, 0.9, 0.4, 0.7, 0.8, 0.5, 0.35,
];

function SpeechPanel({ entry, isPlaying }: { entry: SpeechEntry; isPlaying: boolean }) {
  const jsonStr = JSON.stringify(
    {
      id: entry.id,
      dialect: entry.dialect,
      confidence_score: entry.confidence_score,
      speaker_id: entry.speaker_id,
      duration_ms: entry.duration_ms,
      sample_rate: entry.sample_rate,
    },
    null,
    2
  );

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="rounded-xl bg-brand-deep border border-white/8 p-6">
        <p className="font-mono text-xs tracking-[0.12em] text-accent-cyan uppercase mb-4">
          Audio Waveform
        </p>

        <div className="flex items-end gap-[3px] h-16 mb-5" aria-hidden="true">
          {WAVEFORM_HEIGHTS.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-accent-cyan"
              style={{
                height: `${h * 100}%`,
                opacity: isPlaying ? undefined : 0.4,
                animation: isPlaying ? `wave-bar ${0.6 + (i % 5) * 0.12}s ease-in-out ${i * 0.04}s infinite alternate` : undefined,
              }}
            />
          ))}
        </div>

        <div className="space-y-3">
          <div className="rounded-lg bg-brand-elevated border border-white/8 p-3">
            <p className="font-mono text-[10px] text-text-tertiary mb-1">EN</p>
            <p className="text-text-secondary text-sm leading-relaxed">{entry.en}</p>
          </div>
          <div className="rounded-lg bg-brand-elevated border border-white/8 p-3">
            <p className="font-mono text-[10px] text-text-tertiary mb-1">FR</p>
            <p className="text-text-secondary text-sm leading-relaxed">{entry.fr}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden border border-white/8 bg-[#07070C]">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8 bg-white/3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" aria-hidden="true" />
          </div>
          <span className="font-mono text-[10px] text-text-tertiary ml-1">api_response.json</span>
        </div>
        <pre className="p-5 text-[11px] leading-5 overflow-x-auto font-mono">
          <code>
            {jsonStr.split('\n').map((line, i) => {
              const keyMatch = line.match(/^(\s*)"([^"]+)":/);
              const strValMatch = line.match(/:\s*"([^"]+)"/);
              const numValMatch = line.match(/:\s*(\d+\.?\d*)/);
              if (keyMatch) {
                const indent = keyMatch[1];
                const key = keyMatch[2];
                const rest = line.slice(keyMatch[0].length);
                return (
                  <span key={i} style={{ display: 'block' }}>
                    {indent}
                    <span style={{ color: '#00E5FF' }}>&quot;{key}&quot;</span>
                    <span style={{ color: '#71717A' }}>:</span>
                    {strValMatch ? (
                      <span style={{ color: '#F5A623' }}> &quot;{strValMatch[1]}&quot;{rest.endsWith(',') ? ',' : ''}</span>
                    ) : numValMatch ? (
                      <span style={{ color: '#E07A5F' }}> {numValMatch[1]}{rest.endsWith(',') ? ',' : ''}</span>
                    ) : (
                      <span style={{ color: '#8F8F9D' }}>{rest}</span>
                    )}
                  </span>
                );
              }
              return (
                <span key={i} style={{ display: 'block', color: '#52525B' }}>{line}</span>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
}

function TextPanel({ entry }: { entry: TextEntry }) {
  const jsonStr = JSON.stringify(
    {
      id: entry.id,
      language: entry.lang_code,
      text: entry.sentence,
      tokens: entry.tokens,
      num_tokens: entry.num_tokens,
      annotation_tier: entry.annotation_tier,
    },
    null,
    2
  );

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="rounded-xl bg-brand-deep border border-white/8 p-6">
        <p className="font-mono text-xs tracking-[0.12em] text-accent-ochre uppercase mb-4">
          Text Sample
        </p>

        <div className="rounded-lg bg-brand-elevated border border-white/8 p-4 mb-4">
          <p className="text-text-primary text-base leading-relaxed mb-1" lang={entry.lang_code}>
            {entry.sentence}
          </p>
          <p className="text-text-tertiary text-xs font-mono">{entry.en}</p>
        </div>

        <p className="font-mono text-[10px] text-text-tertiary uppercase mb-2">
          Tokenised
        </p>
        <div className="flex flex-wrap gap-1.5">
          {entry.tokens.map((token, i) => (
            <span
              key={i}
              className="font-mono text-xs px-2 py-1 rounded bg-accent-ochre/10 text-accent-ochre border border-accent-ochre/20"
            >
              {token}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-xl overflow-hidden border border-white/8 bg-[#07070C]">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8 bg-white/3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" aria-hidden="true" />
          </div>
          <span className="font-mono text-[10px] text-text-tertiary ml-1">api_response.json</span>
        </div>
        <pre className="p-5 text-[11px] leading-5 overflow-x-auto font-mono">
          <code>
            {jsonStr.split('\n').map((line, i) => {
              const keyMatch = line.match(/^(\s*)"([^"]+)":/);
              const strValMatch = line.match(/:\s*"([^"]+)"/);
              const numValMatch = line.match(/:\s*(\d+)/);
              if (keyMatch) {
                const indent = keyMatch[1];
                const key = keyMatch[2];
                const rest = line.slice(keyMatch[0].length);
                return (
                  <span key={i} style={{ display: 'block' }}>
                    {indent}
                    <span style={{ color: '#F5A623' }}>&quot;{key}&quot;</span>
                    <span style={{ color: '#71717A' }}>:</span>
                    {strValMatch ? (
                      <span style={{ color: '#00E5FF' }}> &quot;{strValMatch[1]}&quot;{rest.endsWith(',') ? ',' : ''}</span>
                    ) : numValMatch ? (
                      <span style={{ color: '#E07A5F' }}> {numValMatch[1]}{rest.endsWith(',') ? ',' : ''}</span>
                    ) : (
                      <span style={{ color: '#8F8F9D' }}>{rest}</span>
                    )}
                  </span>
                );
              }
              if (line.trim().startsWith('"')) {
                return (
                  <span key={i} style={{ display: 'block', color: '#00E5FF' }}>{line}</span>
                );
              }
              return (
                <span key={i} style={{ display: 'block', color: '#52525B' }}>{line}</span>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
}

export function DataExplorer() {
  const [language, setLanguage] = useState('Wolof');
  const [modality, setModality] = useState<Modality>('speech');
  const [isPlaying, setIsPlaying] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);
  const playTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const data = EXPLORER_DATA[language];

  function changeLanguage(lang: string) {
    setIsPlaying(false);
    if (playTimerRef.current) clearTimeout(playTimerRef.current);
    setLanguage(lang);
    setFadeKey((k) => k + 1);
  }

  function changeModality(mod: Modality) {
    setIsPlaying(false);
    if (playTimerRef.current) clearTimeout(playTimerRef.current);
    setModality(mod);
    setFadeKey((k) => k + 1);
  }

  function togglePlay() {
    if (isPlaying) {
      setIsPlaying(false);
      if (playTimerRef.current) clearTimeout(playTimerRef.current);
    } else {
      setIsPlaying(true);
      const duration = data.speech.duration_ms;
      playTimerRef.current = setTimeout(() => setIsPlaying(false), duration);
    }
  }

  useEffect(() => {
    return () => {
      if (playTimerRef.current) clearTimeout(playTimerRef.current);
    };
  }, []);

  return (
    <section id="explorer" className="py-20 bg-brand-deep">
      <div className="container-wide section-padding">
        <div className="text-center mb-12">
          <span className="font-mono text-xs tracking-[0.18em] text-text-tertiary uppercase">
            LIVE DATA EXPLORER
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mt-3 mb-4">
            Touch the Infrastructure
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Select a language and data type. See the exact JSON output that an AI researcher
            receives from our API — developer-ready, community-sourced, ethically collected.
          </p>
        </div>

        <div className="glass-card p-6 md:p-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <label htmlFor="explorer-language" className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary mb-2 block">
                Language
              </label>
              <select
                id="explorer-language"
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="w-full bg-brand-elevated border border-white/10 text-text-primary text-sm font-medium rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 transition-colors cursor-pointer appearance-none"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath d=\'M1 1l5 5 5-5\' stroke=\'%2352525B\' stroke-width=\'1.5\' fill=\'none\' stroke-linecap=\'round\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div className="sm:w-64">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary mb-2">
                Data Type
              </p>
              <div className="flex rounded-lg overflow-hidden border border-white/10 bg-brand-elevated">
                {(['speech', 'text'] as Modality[]).map((mod) => (
                  <button
                    key={mod}
                    type="button"
                    onClick={() => changeModality(mod)}
                    className={[
                      'flex-1 py-2.5 text-sm font-medium transition-all duration-200',
                      modality === mod
                        ? 'bg-accent-cyan/15 text-accent-cyan'
                        : 'text-text-tertiary hover:text-text-secondary',
                    ].join(' ')}
                  >
                    {mod === 'speech' ? 'Speech Audio' : 'Text Corpora'}
                  </button>
                ))}
              </div>
            </div>

            {modality === 'speech' && (
              <div className="sm:w-auto flex items-end">
                <button
                  type="button"
                  onClick={togglePlay}
                  className={[
                    'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all duration-200',
                    isPlaying
                      ? 'bg-accent-cyan/15 border-accent-cyan/30 text-accent-cyan'
                      : 'bg-brand-elevated border-white/10 text-text-secondary hover:border-accent-cyan/20 hover:text-text-primary',
                  ].join(' ')}
                  aria-label={isPlaying ? 'Pause sample' : 'Play sample'}
                >
                  {isPlaying ? (
                    <><Pause className="w-4 h-4" aria-hidden="true" /> Pause</>
                  ) : (
                    <><Play className="w-4 h-4" aria-hidden="true" /> Play Sample</>
                  )}
                </button>
              </div>
            )}
          </div>

          <div
            key={`${language}-${modality}-${fadeKey}`}
            className="animate-fade-in"
          >
            {modality === 'speech' ? (
              <SpeechPanel entry={data.speech} isPlaying={isPlaying} />
            ) : (
              <TextPanel entry={data.text} />
            )}
          </div>
        </div>
      </div>

    </section>
  );
}
