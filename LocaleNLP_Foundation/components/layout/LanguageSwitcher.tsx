'use client';

import { useState, useEffect, useRef, useCallback, useId } from 'react';
import { cn } from '@/lib/utils';
import { useTranslation, type Locale } from '@/lib/i18n/TranslationContext';

const LANGUAGES = [
  { code: 'en' as Locale, native: 'English',    dir: 'ltr' as const },
  { code: 'fr' as Locale, native: 'Français',   dir: 'ltr' as const },
  { code: 'ar' as Locale, native: 'العربية',    dir: 'rtl' as const },
  { code: 'sw' as Locale, native: 'Kiswahili',  dir: 'ltr' as const },
];

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
  const { locale, setLocale, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const choose = useCallback((code: Locale) => {
    setLocale(code);
    setIsOpen(false);
  }, [setLocale]);

  const close = useCallback(() => {
    setIsOpen(false);
    btnRef.current?.focus();
  }, []);

  const scheduleClose = useCallback(() => {
    leaveTimer.current = setTimeout(() => setIsOpen(false), 150);
  }, []);

  const cancelClose = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  useEffect(() => {
    return () => { if (leaveTimer.current) clearTimeout(leaveTimer.current); };
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

  const selectedLang = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  if (mobile) {
    return (
      <div className="flex flex-col gap-1">
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="w-full flex items-center justify-between py-3 px-4 text-base font-medium text-white hover:bg-white/5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-label={t('a11y.lang_select', 'Select language')}
        >
          <span className="flex items-center gap-2.5">
            <GlobeWaveIcon className="w-4 h-4 text-accent-ochre" />
            <span dir={selectedLang.dir}>{selectedLang.native}</span>
          </span>
          <span className="font-mono text-xs text-text-tertiary uppercase tracking-wider">
            {locale}
          </span>
        </button>
        {isOpen && (
          <div
            id={panelId}
            role="listbox"
            aria-label={t('a11y.lang_select', 'Select language')}
            className="pl-4 flex flex-wrap gap-2 px-4 pb-3"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                role="option"
                aria-selected={lang.code === locale}
                onClick={() => choose(lang.code)}
                dir={lang.dir}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan',
                  lang.code === locale
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
    <div
      className="relative"
      onMouseEnter={() => { cancelClose(); setIsOpen(true); }}
      onMouseLeave={scheduleClose}
    >
      <button
        ref={btnRef}
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={panelId}
        aria-label={t('a11y.lang_select', 'Select language')}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
          'border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#04040A]',
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
          {locale}
        </span>
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          id={panelId}
          role="listbox"
          aria-label={t('a11y.lang_select', 'Select language')}
          className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-white/10 animate-slide-down overflow-hidden"
          style={{ background: '#09090E', boxShadow: '0 24px 60px rgba(0,0,0,0.8)' }}
        >
          <div className="px-4 pt-4 pb-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-accent-ochre mb-0.5">
              {t('lang.switcher.label', 'Language / Langue / Lugha')}
            </p>
            <p className="text-[10px] text-text-tertiary">
              {t('lang.switcher.note', 'Site UI is translated — body content remains in English.')}
            </p>
          </div>
          <div className="px-3 pb-4 pt-1 flex flex-col gap-1">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === locale;
              return (
                <button
                  key={lang.code}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => choose(lang.code)}
                  dir={lang.dir}
                  className={cn(
                    'group flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan',
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
