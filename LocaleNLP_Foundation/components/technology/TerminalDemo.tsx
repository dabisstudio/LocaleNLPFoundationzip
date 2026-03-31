'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface CodeToken {
  text: string;
  color: string;
}

type CodeLine = CodeToken[];

const LINES: CodeLine[] = [
  [{ text: '# LocaleNLP AfriSpeech-ASR — quick start', color: '#71717A' }],
  [],
  [{ text: 'from ', color: '#00E5FF' }, { text: 'localenlp', color: '#FAFAFA' }, { text: ' import ', color: '#00E5FF' }, { text: 'AfriSpeechASR', color: '#F5A623' }],
  [],
  [{ text: 'model', color: '#FAFAFA' }, { text: ' = ', color: '#71717A' }, { text: 'AfriSpeechASR', color: '#F5A623' }, { text: '.from_pretrained(', color: '#FAFAFA' }],
  [{ text: '    language', color: '#E07A5F' }, { text: '=', color: '#71717A' }, { text: '"yo"', color: '#F5A623' }, { text: ',  # Yoruba', color: '#71717A' }],
  [{ text: '    model_version', color: '#E07A5F' }, { text: '=', color: '#71717A' }, { text: '"v2.1.0"', color: '#F5A623' }, { text: ',', color: '#FAFAFA' }],
  [{ text: ')', color: '#FAFAFA' }],
  [],
  [{ text: 'transcript', color: '#FAFAFA' }, { text: ' = ', color: '#71717A' }, { text: 'model', color: '#FAFAFA' }, { text: '.transcribe(', color: '#00E5FF' }, { text: '"audio.wav"', color: '#F5A623' }, { text: ')', color: '#FAFAFA' }],
  [{ text: '>>> ', color: '#71717A' }, { text: 'transcript', color: '#FAFAFA' }],
  [{ text: '"Bawo ni o se ri agbara ede wa?"', color: '#E07A5F' }],
];

function flattenLine(line: CodeLine): string {
  return line.map((t) => t.text).join('');
}

export function TerminalDemo() {
  const [revealedChars, setRevealedChars] = useState(0);
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const reducedRef = useRef(false);

  const totalChars = LINES.reduce((sum, line) => sum + flattenLine(line).length + 1, 0);

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedRef.current) {
      setRevealedChars(totalChars);
    } else {
      setPlaying(true);
    }
  }, [totalChars]);

  useEffect(() => {
    if (!playing) return;
    const CHARS_PER_MS = 0.08;

    const tick = (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      setRevealedChars((prev) => {
        const next = Math.min(prev + delta * CHARS_PER_MS, totalChars);
        if (next >= totalChars) setPlaying(false);
        return next;
      });
      if (playing) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [playing, totalChars]);

  const replay = useCallback(() => {
    if (reducedRef.current) return;
    setRevealedChars(0);
    lastTimeRef.current = null;
    setPlaying(true);
  }, []);

  let charBudget = Math.floor(revealedChars);
  const renderedLines: JSX.Element[] = [];

  for (let li = 0; li < LINES.length; li++) {
    const line = LINES[li];
    if (charBudget <= 0) break;
    const lineText = flattenLine(line);
    const lineLen = lineText.length;

    if (charBudget >= lineLen + 1) {
      // Full line rendered
      charBudget -= lineLen + 1; // +1 for newline
      if (line.length === 0) {
        renderedLines.push(<div key={li} className="h-6" />);
      } else {
        renderedLines.push(
          <div key={li} className="leading-7">
            {line.map((tok, ti) => (
              <span key={ti} style={{ color: tok.color }}>{tok.text}</span>
            ))}
          </div>
        );
      }
    } else {
      // Partial line
      let remaining = charBudget;
      charBudget = 0;
      const spans: JSX.Element[] = [];
      for (let ti = 0; ti < line.length && remaining > 0; ti++) {
        const tok = line[ti];
        if (remaining >= tok.text.length) {
          spans.push(<span key={ti} style={{ color: tok.color }}>{tok.text}</span>);
          remaining -= tok.text.length;
        } else {
          spans.push(<span key={ti} style={{ color: tok.color }}>{tok.text.slice(0, remaining)}</span>);
          remaining = 0;
        }
      }
      renderedLines.push(
        <div key={li} className="leading-7">{spans}</div>
      );
    }
  }

  const isDone = revealedChars >= totalChars;

  return (
    <div className="rounded-2xl border border-ink-monument/10 bg-base-pure shadow-editorial overflow-hidden">
      {/* Light bezel header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-ink-monument/10 bg-base-stone">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400/80" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/80" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-accent-emerald/80" aria-hidden="true" />
          </div>
          <span className="ml-3 font-mono text-xs text-ink-muted">localenlp_demo.py</span>
        </div>
        {isDone && (
          <button
            onClick={replay}
            className="font-mono text-xs text-accent-ochre hover:opacity-80 transition-opacity px-2 py-0.5 rounded border border-accent-ochre/30 hover:bg-accent-ochre/5"
            aria-label="Replay terminal demo"
          >
            ↺ Replay
          </button>
        )}
      </div>
      {/* Dark terminal screen inside the light bezel */}
      <div className="dark-panel">
        <pre
          className="p-6 text-sm overflow-x-auto font-mono"
          style={{ minHeight: '280px', background: '#0A1931' }}
          aria-label="Python code example for AfriSpeech-ASR"
        >
          {renderedLines}
          {!isDone && (
            <span
              className="inline-block w-[0.55em] h-[1.1em] bg-accent-ochre/80 align-text-bottom animate-[blink_1s_step-end_infinite]"
              aria-hidden="true"
            />
          )}
        </pre>
      </div>
    </div>
  );
}
