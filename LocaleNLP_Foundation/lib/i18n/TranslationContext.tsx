'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

import en from './en.json';
import fr from './fr.json';
import ar from './ar.json';
import sw from './sw.json';

export type Locale = 'en' | 'fr' | 'ar' | 'sw';

const SUPPORTED: Locale[] = ['en', 'fr', 'ar', 'sw'];
const STORAGE_KEY = 'locale-pref';
const RTL_LOCALES: Locale[] = ['ar'];

type Dict = Record<string, string>;

const DICTS: Record<Locale, Dict> = { en, fr, ar, sw };

type TranslationCtx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, fallback?: string) => string;
  dir: 'ltr' | 'rtl';
};

const TranslationContext = createContext<TranslationCtx>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => key,
  dir: 'ltr',
});

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.includes(stored as Locale)) {
        setLocaleState(stored as Locale);
      }
    } catch {
      /* localStorage unavailable */
    }
  }, []);

  useEffect(() => {
    const dir = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch { /* noop */ }
  }, []);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const dict = DICTS[locale];
      return dict[key] ?? fallback ?? key;
    },
    [locale],
  );

  const dir: 'ltr' | 'rtl' = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
