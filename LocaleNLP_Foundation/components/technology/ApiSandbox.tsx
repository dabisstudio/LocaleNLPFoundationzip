'use client';

import { useState, useEffect, useRef } from 'react';
import { Copy, Check, Play } from 'lucide-react';
import { GlowButton } from '@/components/ui/glow-button';

const ENDPOINTS = [
  '/v1/speech-to-text',
  '/v1/dataset-query',
  '/v1/validate-token',
] as const;
type Endpoint = typeof ENDPOINTS[number];

const LANGUAGES = ['Swahili', 'Bambara', 'Hausa', 'Wolof'] as const;
type Language = typeof LANGUAGES[number];

const MOCK_RESPONSES: Record<Endpoint, Record<Language, object>> = {
  '/v1/speech-to-text': {
    Swahili: {
      request_id: 'req_7f4a2c1e',
      status: 'success',
      transcript: 'Lugha yetu ni mali yetu ya pamoja.',
      language: 'sw',
      model: 'afrispeech-asr-v2.1',
      confidence: 0.98,
      duration_ms: 2600,
      tokens: 7,
    },
    Bambara: {
      request_id: 'req_3b8d9e12',
      status: 'success',
      transcript: 'Bamanankan ye sira ye mɔgɔw tɛmɛnna.',
      language: 'bam',
      model: 'afrispeech-asr-v2.1',
      confidence: 0.96,
      duration_ms: 3500,
      tokens: 6,
    },
    Hausa: {
      request_id: 'req_1c5f7a09',
      status: 'success',
      transcript: 'Harshen mu shine abin da ke bayyana mu.',
      language: 'ha',
      model: 'afrispeech-asr-v2.1',
      confidence: 0.97,
      duration_ms: 2900,
      tokens: 8,
    },
    Wolof: {
      request_id: 'req_9d2e6b44',
      status: 'success',
      transcript: 'Wolof ci Senegaal la jëfandikoo.',
      language: 'wol',
      model: 'afrispeech-asr-v2.1',
      confidence: 0.98,
      duration_ms: 3200,
      tokens: 5,
    },
  },
  '/v1/dataset-query': {
    Swahili: {
      request_id: 'req_a1f3c8e2',
      status: 'success',
      dataset_id: 'SWA-CORPUS-v2.1',
      language: 'sw',
      total_records: 142_000,
      speech_hours: 312.4,
      license: 'CC-BY-4.0',
      contributors: 891,
      last_updated: '2026-03-28',
    },
    Bambara: {
      request_id: 'req_d7b2e5a1',
      status: 'success',
      dataset_id: 'BAM-CORPUS-v1.3',
      language: 'bam',
      total_records: 58_000,
      speech_hours: 128.7,
      license: 'CC-BY-4.0',
      contributors: 342,
      last_updated: '2026-02-14',
    },
    Hausa: {
      request_id: 'req_5c9d1b38',
      status: 'success',
      dataset_id: 'HAU-CORPUS-v2.0',
      language: 'ha',
      total_records: 195_000,
      speech_hours: 421.0,
      license: 'CC-BY-4.0',
      contributors: 1203,
      last_updated: '2026-03-15',
    },
    Wolof: {
      request_id: 'req_8e4f2c07',
      status: 'success',
      dataset_id: 'WOL-CORPUS-v1.8',
      language: 'wol',
      total_records: 73_000,
      speech_hours: 187.3,
      license: 'CC-BY-4.0',
      contributors: 456,
      last_updated: '2026-01-30',
    },
  },
  '/v1/validate-token': {
    Swahili: {
      request_id: 'req_2b7a4e91',
      status: 'success',
      token: 'lugha',
      language: 'sw',
      is_valid: true,
      annotation_tier: 'B2',
      validator_count: 7,
      consensus_score: 0.97,
      metadata: { pos: 'NOUN', domain: 'general' },
    },
    Bambara: {
      request_id: 'req_6d3c8f15',
      status: 'success',
      token: 'mɔgɔ',
      language: 'bam',
      is_valid: true,
      annotation_tier: 'A2',
      validator_count: 5,
      consensus_score: 0.92,
      metadata: { pos: 'NOUN', domain: 'general' },
    },
    Hausa: {
      request_id: 'req_0e9b2d47',
      status: 'success',
      token: 'harshe',
      language: 'ha',
      is_valid: true,
      annotation_tier: 'B1',
      validator_count: 6,
      consensus_score: 0.95,
      metadata: { pos: 'NOUN', domain: 'linguistics' },
    },
    Wolof: {
      request_id: 'req_4a1f7c83',
      status: 'success',
      token: 'jëfandikoo',
      language: 'wol',
      is_valid: true,
      annotation_tier: 'B1',
      validator_count: 4,
      consensus_score: 0.89,
      metadata: { pos: 'VERB', domain: 'general' },
    },
  },
};

const LANG_ISO: Record<Language, string> = { Swahili: 'sw', Bambara: 'bam', Hausa: 'ha', Wolof: 'wol' };

const SELECT_STYLE = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2352525B' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat' as const,
  backgroundPosition: 'right 14px center',
};

function renderJson(raw: string) {
  return raw.split('\n').map((line, i) => {
    const keyMatch = line.match(/^(\s*)"([^"]+)":/);
    const strValMatch = line.match(/:\s*"([^"]+)"/);
    const numMatch = line.match(/:\s*(-?\d+\.?\d*)/);
    const boolMatch = line.match(/:\s*(true|false)/);
    if (keyMatch) {
      const indent = keyMatch[1];
      const key = keyMatch[2];
      const rest = line.slice(keyMatch[0].length);
      const trailingComma = rest.trim().endsWith(',') ? ',' : '';
      return (
        <span key={i} style={{ display: 'block' }}>
          {indent}
          <span style={{ color: '#00E5FF' }}>&quot;{key}&quot;</span>
          <span style={{ color: '#71717A' }}>: </span>
          {strValMatch ? (
            <span style={{ color: '#F5A623' }}>&quot;{strValMatch[1]}&quot;{trailingComma}</span>
          ) : boolMatch ? (
            <span style={{ color: '#E07A5F' }}>{boolMatch[1]}{trailingComma}</span>
          ) : numMatch ? (
            <span style={{ color: '#E07A5F' }}>{numMatch[1]}{trailingComma}</span>
          ) : (
            <span style={{ color: '#8F8F9D' }}>{rest}</span>
          )}
        </span>
      );
    }
    return (
      <span key={i} style={{ display: 'block', color: '#52525B' }}>{line}</span>
    );
  });
}

function SkeletonLine({ width }: { width: string }) {
  return (
    <div
      className="h-3 rounded mb-2"
      style={{
        width,
        background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.04) 100%)',
        backgroundSize: '200% 100%',
        animation: 'skeleton-shimmer 1.4s ease-in-out infinite',
      }}
    />
  );
}

export function ApiSandbox() {
  const [isMounted, setIsMounted] = useState(false);
  const [endpoint, setEndpoint] = useState<Endpoint>('/v1/speech-to-text');
  const [language, setLanguage] = useState<Language>('Swahili');
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');
  const [response, setResponse] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setIsMounted(true); }, []);
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  if (!isMounted) return null;

  function runRequest() {
    setState('loading');
    setResponse(null);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const data = MOCK_RESPONSES[endpoint][language];
      setResponse(JSON.stringify(data, null, 2));
      setState('done');
    }, 1000);
  }

  function copyResponse() {
    if (!response) return;
    navigator.clipboard.writeText(response).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const iso = LANG_ISO[language];
  const curlSnippet = endpoint === '/v1/speech-to-text'
    ? `curl -X POST https://api.localenlp.org${endpoint} \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"language":"${iso}","audio_url":"https://cdn.example.com/clip.wav"}'`
    : endpoint === '/v1/dataset-query'
    ? `curl -X GET "https://api.localenlp.org${endpoint}?language=${iso}&limit=100" \\\n  -H "Authorization: Bearer $API_KEY"`
    : `curl -X POST https://api.localenlp.org${endpoint} \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"token":"${language.toLowerCase().slice(0,5)}","language":"${iso}"}'`;

  return (
    <div className="glass-card overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/8 bg-brand-elevated">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="font-mono text-xs text-text-tertiary ml-2">LocaleNLP API Sandbox</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" aria-hidden="true" />
          <span className="font-mono text-[10px] text-accent-cyan uppercase tracking-widest">Live</span>
        </div>
      </div>

      <div className="p-5 md:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="sandbox-endpoint" className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary mb-2 block">
              Endpoint
            </label>
            <select
              id="sandbox-endpoint"
              value={endpoint}
              onChange={(e) => { setEndpoint(e.target.value as Endpoint); setState('idle'); setResponse(null); }}
              className="w-full bg-brand-deep border border-white/10 text-text-primary text-sm font-mono rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 transition-colors cursor-pointer appearance-none"
              style={SELECT_STYLE}
            >
              {ENDPOINTS.map((ep) => (
                <option key={ep} value={ep}>{ep}</option>
              ))}
            </select>
          </div>

          <div className="sm:w-48">
            <label htmlFor="sandbox-language" className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary mb-2 block">
              Language
            </label>
            <select
              id="sandbox-language"
              value={language}
              onChange={(e) => { setLanguage(e.target.value as Language); setState('idle'); setResponse(null); }}
              className="w-full bg-brand-deep border border-white/10 text-text-primary text-sm font-medium rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent-cyan/40 focus:ring-1 focus:ring-accent-cyan/20 transition-colors cursor-pointer appearance-none"
              style={SELECT_STYLE}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          <div className="sm:w-auto flex items-end">
            <GlowButton
              type="button"
              onClick={runRequest}
              variant="primary"
              showArrow={false}
              disabled={state === 'loading'}
              className="w-full sm:w-auto gap-2"
            >
              <Play className="w-3.5 h-3.5" aria-hidden="true" />
              {state === 'loading' ? 'Running…' : 'Run API Request'}
            </GlowButton>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-xl overflow-hidden border border-white/8 bg-[#07070C]">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/8 bg-white/3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-text-tertiary">request.sh</span>
              </div>
              <span className="font-mono text-[10px] text-accent-ochre uppercase tracking-widest">curl</span>
            </div>
            <pre className="p-5 text-[11px] leading-[1.7] overflow-x-auto font-mono text-text-secondary whitespace-pre-wrap">
              {curlSnippet.split('\n').map((line, i) => {
                const hasDollar = line.includes('$API_KEY');
                if (hasDollar) {
                  const parts = line.split('$API_KEY');
                  return (
                    <span key={i} style={{ display: 'block' }}>
                      <span style={{ color: '#8F8F9D' }}>{parts[0]}</span>
                      <span style={{ color: '#F5A623' }}>$API_KEY</span>
                      <span style={{ color: '#8F8F9D' }}>{parts[1]}</span>
                    </span>
                  );
                }
                if (line.startsWith('curl')) return <span key={i} style={{ display: 'block' }}><span style={{ color: '#00E5FF' }}>curl</span><span style={{ color: '#8F8F9D' }}>{line.slice(4)}</span></span>;
                if (line.includes('"language"') || line.includes('"audio_url"') || line.includes('"token"')) return <span key={i} style={{ display: 'block', color: '#E07A5F' }}>{line}</span>;
                return <span key={i} style={{ display: 'block', color: '#8F8F9D' }}>{line}</span>;
              })}
            </pre>
          </div>

          <div className="rounded-xl overflow-hidden border border-white/8 bg-[#07070C]">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/8 bg-white/3">
              <span className="font-mono text-[10px] text-text-tertiary">response.json</span>
              {state === 'done' && response && (
                <button
                  type="button"
                  onClick={copyResponse}
                  className="flex items-center gap-1.5 font-mono text-[10px] text-text-tertiary hover:text-text-secondary transition-colors"
                  aria-label="Copy response JSON"
                >
                  {copied ? <Check className="w-3 h-3 text-accent-cyan" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              )}
            </div>
            <div className="p-5 min-h-[180px]">
              {state === 'idle' && (
                <p className="font-mono text-[11px] text-text-tertiary italic">
                  Click &quot;Run API Request&quot; to see the response…
                </p>
              )}
              {state === 'loading' && (
                <div className="space-y-1.5 pt-1">
                  <SkeletonLine width="60%" />
                  <SkeletonLine width="85%" />
                  <SkeletonLine width="70%" />
                  <SkeletonLine width="90%" />
                  <SkeletonLine width="55%" />
                  <SkeletonLine width="78%" />
                  <SkeletonLine width="40%" />
                </div>
              )}
              {state === 'done' && response && (
                <pre className="text-[11px] leading-[1.7] overflow-x-auto font-mono">
                  <code>{renderJson(response)}</code>
                </pre>
              )}
            </div>
          </div>
        </div>

        <p className="font-mono text-[10px] text-text-tertiary text-center">
          Simulated responses — <span className="text-accent-ochre">No API key required for this demo</span>. Production endpoints require Bearer auth.
        </p>
      </div>
    </div>
  );
}
