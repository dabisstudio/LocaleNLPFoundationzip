'use client';

import { useState, useEffect, useRef, useCallback, useId } from 'react';
import { cn } from '@/lib/utils';

const LANGUAGES = [
  { code: 'en', native: 'English',    dir: 'ltr' },
  { code: 'yo', native: 'Yorùbá',     dir: 'ltr' },
  { code: 'sw', native: 'Kiswahili',  dir: 'ltr' },
  { code: 'ha', native: 'Hausa',      dir: 'ltr' },
  { code: 'am', native: 'አማርኛ',      dir: 'ltr' },
  { code: 'ar', native: 'العربية',    dir: 'rtl' },
  { code: 'zu', native: 'isiZulu',    dir: 'ltr' },
  { code: 'ig', native: 'Igbo',       dir: 'ltr' },
  { code: 'so', native: 'Soomaali',   dir: 'ltr' },
  { code: 'wo', native: 'Wolof',      dir: 'ltr' },
  { code: 'fr', native: 'Français',   dir: 'ltr' },
  { code: 'pt', native: 'Português',  dir: 'ltr' },
  { code: 'ti', native: 'ትግርኛ',      dir: 'ltr' },
  { code: 'ak', native: 'Twi',        dir: 'ltr' },
];

const STORAGE_KEY = 'locale-pref';

function GlobeWaveIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="8" />
      <path d="M2 10h16M10 2c-2.5 2.5-4 5-4 8s1.5 5.5 4 8M10 2c2.5 2.5 4 5 4 8s-1.5 5.5-4 8" />
    </svg>
  );
}

interface LanguageSwitcherProps {
  mobile?: boolean;
}

export default function LanguageSwitcher({ mobile = false }: LanguageSwitcherProps) {
  const [selected, setSelected] = useState('en');
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && LANGUAGES.find((l) => l.code === stored)) {
        setSelected(stored);
      }
    } catch {
      /* localStorage unavailable */
    }
  }, []);

  const choose = useCallback((code: string) => {
    setSelected(code);
    setIsOpen(false);
    try { localStorage.setItem(STORAGE_KEY, code); } catch { /* noop */ }
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    btnRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    const onClickOut = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClickOut);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClickOut);
    };
  }, [isOpen, close]);

  const selectedLang = LANGUAGES.find((l) => l.code === selected) ?? LANGUAGES[0];

  if (mobile) {
    return (
      <div className="flex flex-col gap-1">
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="w-full flex items-center justify-between py-3 px-4 text-base font-medium text-white hover:bg-white/5 rounded-lg transition-colors"
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <span className="flex items-center gap-2.5">
            <GlobeWaveIcon className="w-4 h-4 text-accent-ochre" />
            <span>{selectedLang.native}</span>
          </span>
          <span className="font-mono text-xs text-text-tertiary uppercase tracking-wider">
            {selected}
          </span>
        </button>
        {isOpen && (
          <div id={panelId} className="pl-4 flex flex-wrap gap-2 px-4 pb-3">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => choose(lang.code)}
                dir={lang.dir}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm transition-all duration-150',
                  lang.code === selected
                    ? 'bg-accent-ochre/15 text-accent-ochre border border-accent-ochre/30 font-semibold'
                    : 'text-text-secondary hover:text-white hover:bg-white/5 border border-transparent',
                )}
              >
                {lang.native}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={panelId}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
          'border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ochre/60',
          isOpen
            ? 'border-accent-ochre/40 bg-accent-ochre/8 text-white'
            : 'border-white/10 bg-white/4 text-text-secondary hover:text-white hover:border-white/20 hover:bg-white/8',
        )}
      >
        <GlobeWaveIcon className="w-3.5 h-3.5" />
        <span
          dir={selectedLang.dir}
          className="max-w-[72px] truncate leading-none"
        >
          {selectedLang.native}
        </span>
        <span className="font-mono text-[10px] text-text-tertiary uppercase tracking-wider leading-none">
          {selected}
        </span>
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          id={panelId}
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-white/10 animate-slide-down overflow-hidden"
          style={{ background: '#09090E', boxShadow: '0 24px 60px rgba(0,0,0,0.8)' }}
        >
          <div className="px-4 pt-4 pb-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-accent-ochre mb-0.5">
              Language / Langue / Lugha
            </p>
            <p className="text-[10px] text-text-tertiary">
              Visual language selector — site content remains in English.
            </p>
          </div>
          <div className="px-3 pb-4 pt-1 grid grid-cols-2 gap-1">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === selected;
              return (
                <button
                  key={lang.code}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => choose(lang.code)}
                  dir={lang.dir}
                  className={cn(
                    'group flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-left transition-all duration-150',
                    isSelected
                      ? 'bg-accent-ochre/12 border border-accent-ochre/30'
                      : 'border border-transparent hover:bg-white/5',
                  )}
                >
                  <span
                    className={cn(
                      'text-sm font-medium leading-none transition-colors',
                      isSelected ? 'text-accent-ochre' : 'text-text-secondary group-hover:text-white',
                    )}
                  >
                    {lang.native}
                  </span>
                  <span
                    className={cn(
                      'font-mono text-[9px] uppercase tracking-wider leading-none shrink-0 transition-colors',
                      isSelected ? 'text-accent-ochre/70' : 'text-text-tertiary group-hover:text-text-secondary',
                    )}
                  >
                    {lang.code}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
