'use client';

import { useEffect, useRef, useState } from 'react';
import type { TranscriptLine } from '@/lib/deploymentStories';

interface DeploymentAudioProps {
  audioUrl: string | null;
  transcript: TranscriptLine[];
  sector: string;
}

export function DeploymentAudio({ audioUrl, transcript, sector }: DeploymentAudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  const totalSimDuration = transcript.length > 0
    ? (transcript[transcript.length - 1].ts + 4)
    : 24;

  useEffect(() => {
    if (!isMounted) return;
    if (audioUrl) return;

    let frame: number;
    let start: number | null = null;
    let simTime = 0;

    if (!isPlaying) {
      cancelAnimationFrame(frame!);
      return;
    }

    const tick = (now: number) => {
      if (start === null) start = now;
      simTime = currentTime + (now - start) / 1000;
      if (simTime >= totalSimDuration) {
        simTime = totalSimDuration;
        setCurrentTime(simTime);
        setProgress(100);
        setIsPlaying(false);
        setActiveIndex(transcript.length - 1);
        return;
      }
      setCurrentTime(simTime);
      setProgress((simTime / totalSimDuration) * 100);
      const idx = [...transcript].reverse().findIndex((l) => l.ts <= simTime);
      setActiveIndex(idx >= 0 ? transcript.length - 1 - idx : -1);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isPlaying, audioUrl, transcript, totalSimDuration, isMounted, currentTime]);

  function togglePlay() {
    if (audioUrl && audioRef.current) {
      if (isPlaying) { audioRef.current.pause(); }
      else { audioRef.current.play(); }
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(!isPlaying);
    }
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const pct = Number(e.target.value);
    setProgress(pct);
    const t = (pct / 100) * (audioUrl ? duration : totalSimDuration);
    setCurrentTime(t);
    if (audioUrl && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = t;
    }
    const idx = [...transcript].reverse().findIndex((l) => l.ts <= t);
    setActiveIndex(idx >= 0 ? transcript.length - 1 - idx : -1);
    setIsPlaying(false);
  }

  function fmt(s: number) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  if (!isMounted) return null;

  const bars = Array.from({ length: 36 }, (_, i) => {
    const heights = [40, 55, 30, 70, 85, 45, 60, 35, 75, 50, 65, 80, 30, 55, 70, 45, 90, 40, 60, 50, 75, 35, 65, 80, 45, 55, 70, 30, 85, 50, 40, 65, 75, 55, 35, 60];
    return heights[i % heights.length];
  });

  const fillUpTo = Math.round((progress / 100) * bars.length);

  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-accent-ochre/10 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
            <circle cx="10" cy="10" r="8" stroke="#F5A623" strokeWidth="1.5" />
            <path d="M8 7.5 L14 10 L8 12.5 Z" fill="#F5A623" />
          </svg>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary">
            Audio Proof of Deployment
          </p>
          <p className="text-text-secondary text-sm font-medium">{sector} IVR Sample</p>
        </div>
        {!audioUrl && (
          <span className="ml-auto font-mono text-[9px] uppercase tracking-widest text-text-tertiary border border-white/10 rounded px-2 py-0.5">
            Demo playback
          </span>
        )}
      </div>

      <div className="flex items-end gap-0.5 h-16 mb-5" role="img" aria-label="Audio waveform visualisation">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-full transition-colors duration-75"
            style={{
              height: `${h}%`,
              backgroundColor: i < fillUpTo
                ? (i === fillUpTo - 1 && isPlaying ? '#F5A623' : 'rgba(245,166,35,0.7)')
                : 'rgba(255,255,255,0.1)',
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="space-y-3 mb-5">
        <input
          type="range"
          min={0}
          max={100}
          step={0.1}
          value={progress}
          onChange={handleSeek}
          className="w-full h-1 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #F5A623 ${progress}%, rgba(255,255,255,0.12) ${progress}%)`,
          }}
          aria-label="Audio playback position"
        />
        <div className="flex justify-between">
          <span className="font-mono text-[10px] text-text-tertiary">
            {fmt(currentTime)}
          </span>
          <span className="font-mono text-[10px] text-text-tertiary">
            {fmt(audioUrl ? duration : totalSimDuration)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-accent-ochre/15 border border-accent-ochre/30 flex items-center justify-center hover:bg-accent-ochre/25 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ochre/60"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
              <rect x="3" y="2" width="3.5" height="12" rx="1" fill="#F5A623" />
              <rect x="9.5" y="2" width="3.5" height="12" rx="1" fill="#F5A623" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 ml-0.5" aria-hidden="true">
              <path d="M4 2.5 L13 8 L4 13.5 Z" fill="#F5A623" />
            </svg>
          )}
        </button>

        <div className="flex-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-tertiary">
            {isPlaying ? 'Playing…' : currentTime > 0 ? 'Paused' : 'Press play'}
          </p>
        </div>
      </div>

      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={() => {
            if (!audioRef.current) return;
            const t = audioRef.current.currentTime;
            const d = audioRef.current.duration || 1;
            setCurrentTime(t);
            setProgress((t / d) * 100);
            const idx = [...transcript].reverse().findIndex((l) => l.ts <= t);
            setActiveIndex(idx >= 0 ? transcript.length - 1 - idx : -1);
          }}
          onLoadedMetadata={() => {
            if (audioRef.current) setDuration(audioRef.current.duration);
          }}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
          preload="metadata"
        />
      )}

      {transcript.length > 0 && (
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary mb-3">
            [ Transcript ]
          </p>
          <div className="space-y-2">
            {transcript.map((line, i) => (
              <p
                key={i}
                className={`text-sm leading-relaxed transition-colors duration-300 ${
                  i === activeIndex
                    ? 'text-text-primary'
                    : i < activeIndex
                    ? 'text-text-tertiary'
                    : 'text-text-secondary'
                }`}
              >
                <span className="font-mono text-[10px] text-text-tertiary mr-2 select-none">
                  {fmt(line.ts)}
                </span>
                {line.text}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
