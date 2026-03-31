'use client';

import { useState, useId } from 'react';
import { supabase } from '@/lib/supabase';
import { SuccessCheck } from '@/components/ui/success-check';
import { useTranslation } from '@/lib/i18n/TranslationContext';

const AFRICAN_LANGUAGES = [
  'Afrikaans', 'Amharic', 'Arabic (Maghrebi)', 'Bambara', 'Chichewa / Nyanja',
  'Dholuo', 'Ewe', 'Fulfulde / Fula', 'Ga', 'Hausa', 'Igbo', 'Kinyarwanda',
  'Kirundi', 'Lingala', 'Luganda', 'Malagasy', 'Oromo', 'Shona',
  'Somali', 'Sotho (Southern)', 'Swahili / Kiswahili', 'Tigrinya', 'Twi / Akan',
  'Wolof', 'Xhosa', 'Yoruba', 'Zarma / Djerma', 'Zulu', 'Other',
];

const inputBase =
  'w-full px-4 py-3.5 rounded-xl text-text-primary placeholder:text-text-tertiary text-sm ' +
  'bg-base-stone border border-ink-monument/12 ' +
  'focus:outline-none focus:border-accent-ochre/60 focus:ring-1 focus:ring-accent-ochre/25 ' +
  'transition-colors duration-200 appearance-none';

export function MicroCommitForm() {
  const phoneId = useId();
  const langId = useId();
  const { t } = useTranslation();

  const [phone, setPhone] = useState('');
  const [language, setLanguage] = useState('');
  const [filter, setFilter] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const filtered = AFRICAN_LANGUAGES.filter((l) =>
    l.toLowerCase().includes(filter.toLowerCase())
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim() || !language) {
      setError(t('form.validation_required', 'Please fill in both fields.'));
      return;
    }
    setIsSubmitting(true);
    setError('');

    const { error: dbErr } = await supabase.from('contributor_signups').insert([
      { phone: phone.trim(), native_language: language },
    ]);

    if (dbErr) {
      setError(t('form.error_retry', 'Something went wrong — please try again.'));
      setIsSubmitting(false);
      return;
    }

    setIsSubmitted(true);
    setIsSubmitting(false);
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center">
        <SuccessCheck visible size={80} />
        <h3 className="font-display text-xl font-semibold text-text-primary mt-6 mb-2">
          {t('form.success_title', "You're in the queue!")}
        </h3>
        <p className="text-text-secondary max-w-xs text-sm leading-relaxed">
          {t('form.success_body', "You'll receive an SMS from Lughatna within 24 hours with your first prompt in {language}.").replace('{language}', language)}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor={phoneId} className="block text-sm font-medium text-text-secondary mb-1.5">
          {t('form.phone_label', 'Phone number')} <span className="text-accent-cyan" aria-hidden="true">*</span>
        </label>
        <input
          id={phoneId}
          type="tel"
          required
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputBase}
          placeholder={t('form.phone_placeholder', '+234 800 000 0000')}
        />
      </div>

      <div className="relative">
        <label htmlFor={langId} className="block text-sm font-medium text-text-secondary mb-1.5">
          {t('form.language_label', 'Native language')} <span className="text-accent-cyan" aria-hidden="true">*</span>
        </label>

        <button
          type="button"
          id={langId}
          onClick={() => setDropdownOpen((v) => !v)}
          onBlur={(e) => {
            if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
              setDropdownOpen(false);
            }
          }}
          className={
            inputBase +
            ' text-left flex items-center justify-between ' +
            (language ? '' : 'text-text-tertiary')
          }
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}
        >
          <span>{language || t('form.language_placeholder', 'Select your language')}</span>
          <svg
            className={`w-4 h-4 text-text-tertiary shrink-0 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
            viewBox="0 0 16 16" fill="none" aria-hidden="true"
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {dropdownOpen && (
          <div
            className="absolute left-0 right-0 top-full mt-1 z-50 rounded-xl border border-ink-monument/12 overflow-hidden"
            style={{ background: '#0E0E14', boxShadow: '0 16px 48px rgba(0,0,0,0.7)' }}
            role="listbox"
            aria-label={t('form.language_placeholder', 'Select your native language')}
          >
            <div className="p-2 border-b border-ink-monument/10">
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder={t('form.language_search', 'Search languages…')}
                className="w-full px-3 py-2 text-sm bg-ink-monument/5 border border-ink-monument/10 rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-ochre/50"
                autoFocus
              />
            </div>
            <ul className="max-h-52 overflow-y-auto py-1">
              {filtered.length === 0 && (
                <li className="px-4 py-2.5 text-sm text-text-tertiary">{t('form.language_none', 'No results')}</li>
              )}
              {filtered.map((lang) => (
                <li key={lang}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={language === lang}
                    onClick={() => {
                      setLanguage(lang);
                      setFilter('');
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-ink-monument/5 ${
                      language === lang ? 'text-accent-cyan' : 'text-text-secondary'
                    }`}
                  >
                    {lang}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="text-sm text-accent-clay">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl
                   bg-accent-cyan text-brand-deep font-semibold text-sm
                   transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(0,229,255,0.35)]
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
              <path d="M12 2 A10 10 0 0 1 22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {t('form.submitting', 'Joining…')}
          </span>
        ) : (
          t('form.submit_join', 'Join the Lughatna Network')
        )}
      </button>

      <p className="text-center text-[11px] text-text-tertiary leading-relaxed">
        {t('form.privacy_note', 'We only use your number to send contribution prompts. No spam, no selling data.')}
      </p>
    </form>
  );
}
