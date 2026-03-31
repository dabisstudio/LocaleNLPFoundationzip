'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { SuccessCheck } from '@/components/ui/success-check';

const INQUIRY_TYPES = [
  'Partnership Inquiry',
  'Fellowship Application',
  'Research Collaboration',
  'Data Contribution',
  'Media Inquiry',
  'Other',
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiry_type: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const { error: submitError } = await supabase.from('contact_submissions').insert([formData]);

    if (submitError) {
      setError('Something went wrong. Please try again or email us directly.');
      setIsSubmitting(false);
      return;
    }

    setIsSubmitted(true);
    setIsSubmitting(false);
  }

  const inputClass =
    'w-full px-4 py-3 rounded-lg text-text-primary placeholder:text-text-tertiary text-sm ' +
    'bg-base-stone border border-ink-monument/10 ' +
    'focus:outline-none focus:border-accent-ochre/50 focus:ring-1 focus:ring-accent-ochre/20 ' +
    'transition-colors duration-200';

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-5">
          <SuccessCheck visible={true} size={72} />
        </div>
        <h3 className="font-display text-xl font-semibold text-text-primary mb-3">
          Message Sent
        </h3>
        <p className="text-text-secondary max-w-xs">
          Thank you for reaching out. Our team will respond within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="gi-name" className="block text-sm font-medium text-text-secondary mb-1.5">
          Full Name <span aria-hidden="true" className="text-accent-ochre">*</span>
        </label>
        <input
          type="text"
          id="gi-name"
          required
          autoComplete="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={inputClass}
          placeholder="Amara Osei"
        />
      </div>

      <div>
        <label htmlFor="gi-email" className="block text-sm font-medium text-text-secondary mb-1.5">
          Email Address <span aria-hidden="true" className="text-accent-ochre">*</span>
        </label>
        <input
          type="email"
          id="gi-email"
          required
          autoComplete="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={inputClass}
          placeholder="amara@institution.org"
        />
      </div>

      <div>
        <label htmlFor="gi-org" className="block text-sm font-medium text-text-secondary mb-1.5">
          Organization
        </label>
        <input
          type="text"
          id="gi-org"
          autoComplete="organization"
          value={formData.organization}
          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
          className={inputClass}
          placeholder="University, NGO, or company (optional)"
        />
      </div>

      <div>
        <label
          htmlFor="gi-type"
          className="block text-sm font-medium text-text-secondary mb-1.5"
        >
          Inquiry Type <span aria-hidden="true" className="text-accent-ochre">*</span>
        </label>
        <select
          id="gi-type"
          required
          value={formData.inquiry_type}
          onChange={(e) => setFormData({ ...formData, inquiry_type: e.target.value })}
          className={inputClass}
        >
          <option value="">Select an option</option>
          {INQUIRY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="gi-message"
          className="block text-sm font-medium text-text-secondary mb-1.5"
        >
          Message <span aria-hidden="true" className="text-accent-ochre">*</span>
        </label>
        <textarea
          id="gi-message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={inputClass + ' resize-none'}
          placeholder="Tell us how you would like to get involved…"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-accent-clay">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg
                   bg-white text-brand-deep font-medium text-sm
                   ring-1 ring-transparent
                   transition-all duration-300 ease-apple-ease
                   hover:ring-accent-ochre/50 hover:-translate-y-0.5
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ochre
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {isSubmitting ? (
          'Sending…'
        ) : (
          <>
            Send Message
            <Send className="w-4 h-4" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
