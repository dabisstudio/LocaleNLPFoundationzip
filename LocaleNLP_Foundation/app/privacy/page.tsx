'use client';

import { motion } from 'framer-motion';
import { MonoLabel } from '@/components/ui/mono-label';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-base-paper pt-32 pb-24">
      <main className="max-w-3xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <MonoLabel label="LEGAL COMPLIANCE" />
        </motion.div>
        
        <motion.h1 
           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
           className="font-display font-bold text-4xl md:text-5xl text-ink-monument mb-6"
        >
          Privacy Policy
        </motion.h1>
        <p className="font-mono text-sm text-ink-muted mb-16">Effective Date: April 1, 2026</p>

        <div className="prose prose-lg prose-headings:font-display prose-headings:font-bold prose-a:text-accent-ochre prose-p:text-ink-steel prose-p:leading-relaxed max-w-none">
           <p>The LocaleNLP Foundation ("we," "us," or "our") respects your privacy and is committed to protecting the personal and linguistic data we collect. This Privacy Policy explains our practices regarding data collection across our platform, APIs, and the OpenSpeech Initiative.</p>
           
           <h2>1. Data We Collect</h2>
           <p>As a community-driven NLP platform, we collect two tiers of data:</p>
           <ul>
             <li><strong>Linguistic Data:</strong> Voice recordings, text translations, and annotations submitted voluntarily through our programs. This data is explicitly licensed under our sovereignty framework.</li>
             <li><strong>Account Data:</strong> Information provided during API signup or fellowship applications, including email addresses, names, and institutional affiliations.</li>
           </ul>

           <h2>2. How We Use the Data</h2>
           <p>Linguistic data is used strictly for the training and refinement of open-source language models. Account data is used for operational communication and ecosystem access provisioning. We do not sell personally identifiable information to third parties.</p>

           <h2>3. Data Sovereignty & Anonymization</h2>
           <p>All voice and text contributions are stripped of PII (Personally Identifiable Information) before being merged into the global corpus. Contributors retain the right to withdraw their annotated data from future model versions via our Data Pact dashboard.</p>

           <h2>4. Contact Us</h2>
           <p>For privacy inquiries or to exercise your GDPR/CCPA rights, contact our compliance team at <strong>compliance@localenlp.org</strong>.</p>
        </div>
      </main>
    </div>
    <Footer />
    </>
  );
}
