'use client';

import { useState } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/lib/supabase';
import {
  Users,
  GraduationCap,
  Code,
  Heart,
  Building,
  Mic,
  CheckCircle,
  Send,
} from 'lucide-react';

const opportunities = [
  {
    icon: Building,
    title: 'Partner With Us',
    description:
      'Join our network of research institutions, governments, and NGOs working to bring language technology to Africa.',
    audience: 'Organizations',
    benefits: [
      'Access to open models and APIs',
      'Joint research opportunities',
      'Impact reporting and visibility',
      'Technical support and training',
    ],
  },
  {
    icon: GraduationCap,
    title: 'AIxLanguage Fellowship',
    description:
      'A fully-funded 12-month program for African researchers and engineers to specialize in NLP.',
    audience: 'Researchers & Engineers',
    benefits: [
      'Living stipend and equipment',
      'Mentorship from leading researchers',
      'Publication support',
      'Network access and job placement',
    ],
  },
  {
    icon: Code,
    title: 'Open Source Contributors',
    description:
      'Help build the next generation of African language models. All skill levels welcome.',
    audience: 'Developers',
    benefits: [
      'Work on impactful projects',
      'Learn from domain experts',
      'Build your portfolio',
      'Join our contributor community',
    ],
  },
  {
    icon: Mic,
    title: 'Community Data Contributors',
    description:
      'Help us collect speech and text data for your language. Get paid to preserve your heritage.',
    audience: 'Native Speakers',
    benefits: [
      'Competitive compensation',
      'Flexible remote work',
      'Preserve your language',
      'No technical skills required',
    ],
  },
];

const inquiryTypes = [
  'Partnership Inquiry',
  'Fellowship Application',
  'Research Collaboration',
  'Data Contribution',
  'Media Inquiry',
  'Other',
];

export default function GetInvolvedPage() {
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
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
      return;
    }

    setIsSubmitted(true);
    setIsSubmitting(false);
  }

  return (
    <>
      <Navigation />
      <main className="pt-20">
        <section className="py-24 bg-hero-gradient relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ochre-500/10 rounded-full blur-3xl" />
          </div>

          <div className="container-wide section-padding relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-ochre-500/10 text-ochre-400 text-sm font-medium mb-6">
                Get Involved
              </span>
              <h1 className="text-white mb-6">
                Join the Movement
                <br />
                <span className="text-gradient">for Language Equity</span>
              </h1>
              <p className="text-lg text-midnight-200">
                Whether you are a researcher, developer, funder, or community member, there is a
                place for you in our mission to bring every African language into the digital age.
              </p>
            </div>
          </div>
        </section>

        <section id="opportunities" className="py-20 bg-midnight-900">
          <div className="container-wide section-padding">
            <div className="text-center mb-16">
              <h2 className="text-white mb-4">Ways to Contribute</h2>
              <p className="text-midnight-200 max-w-2xl mx-auto">
                From technical contributions to community data collection, find the right way to
                make an impact.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {opportunities.map((opp) => (
                <div
                  key={opp.title}
                  className="glass-card p-8 hover:border-midnight-500 transition-all"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-royal-500 to-ochre-500 flex items-center justify-center flex-shrink-0">
                      <opp.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-midnight-400 mb-1 block">
                        {opp.audience}
                      </span>
                      <h3 className="text-xl font-sora font-semibold text-white">{opp.title}</h3>
                    </div>
                  </div>
                  <p className="text-midnight-300 mb-6">{opp.description}</p>
                  <ul className="space-y-2">
                    {opp.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-midnight-200">
                        <CheckCircle className="w-4 h-4 text-forest-400 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-midnight-950">
          <div className="container-wide section-padding">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-royal-500/10 text-royal-400 text-sm font-medium mb-4">
                  Contact Us
                </span>
                <h2 className="text-white mb-6">Let&apos;s Talk</h2>
                <p className="text-midnight-200 mb-8">
                  Ready to get involved? Have questions about our programs? We would love to hear
                  from you. Fill out the form and our team will get back to you within 48 hours.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-midnight-800 flex items-center justify-center">
                      <Users className="w-5 h-5 text-ochre-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">For Partnerships</h4>
                      <p className="text-sm text-midnight-300">partnerships@localenlp.org</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-midnight-800 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-ochre-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">For Fellowship</h4>
                      <p className="text-sm text-midnight-300">fellowship@localenlp.org</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-midnight-800 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-ochre-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">General Inquiries</h4>
                      <p className="text-sm text-midnight-300">hello@localenlp.org</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-forest-500/20 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-forest-400" />
                    </div>
                    <h3 className="text-xl font-sora font-semibold text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-midnight-300">
                      Thank you for reaching out. We will get back to you within 48 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-midnight-200 mb-2"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-midnight-800 border border-midnight-600 rounded-lg text-white placeholder:text-midnight-400 focus:outline-none focus:border-royal-500 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-midnight-200 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-midnight-800 border border-midnight-600 rounded-lg text-white placeholder:text-midnight-400 focus:outline-none focus:border-royal-500 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="organization"
                        className="block text-sm font-medium text-midnight-200 mb-2"
                      >
                        Organization
                      </label>
                      <input
                        type="text"
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full px-4 py-3 bg-midnight-800 border border-midnight-600 rounded-lg text-white placeholder:text-midnight-400 focus:outline-none focus:border-royal-500 transition-colors"
                        placeholder="Your organization (optional)"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry_type"
                        className="block text-sm font-medium text-midnight-200 mb-2"
                      >
                        Inquiry Type *
                      </label>
                      <select
                        id="inquiry_type"
                        required
                        value={formData.inquiry_type}
                        onChange={(e) => setFormData({ ...formData, inquiry_type: e.target.value })}
                        className="w-full px-4 py-3 bg-midnight-800 border border-midnight-600 rounded-lg text-white focus:outline-none focus:border-royal-500 transition-colors"
                      >
                        <option value="">Select an option</option>
                        {inquiryTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-midnight-200 mb-2"
                      >
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-midnight-800 border border-midnight-600 rounded-lg text-white placeholder:text-midnight-400 focus:outline-none focus:border-royal-500 transition-colors resize-none"
                        placeholder="Tell us how you would like to get involved..."
                      />
                    </div>

                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
