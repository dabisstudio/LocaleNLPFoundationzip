'use client';

import { motion } from 'framer-motion';
import { MonoLabel } from '@/components/ui/mono-label';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export default function TermsPage() {
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
          Terms of Service
        </motion.h1>
        <p className="font-mono text-sm text-ink-muted mb-16">Effective Date: April  1, 2026</p>

        <div className="prose prose-lg prose-headings:font-display prose-headings:font-bold prose-a:text-accent-ochre prose-p:text-ink-steel prose-p:leading-relaxed max-w-none">
           <p>Welcome to the LocaleNLP Foundation. By accessing our platform, participating in the OpenSpeech initiative, or utilizing our Enterprise API, you agree to be bound by these Terms of Service.</p>
           
           <h2>1. Acceptance of Terms</h2>
           <p>By registering for an account or using our tools, you agree to comply with and be legally bound by these terms. If you do not agree to these terms, please do not use our services.</p>

           <h2>2. API Usage Restrictions</h2>
           <p>Our Enterprise API is provided for research, testing, and production environments. You agree not to:</p>
           <ul>
             <li>Reverse-engineer the underlying models or algorithms.</li>
             <li>Exceed the rate limits defined by your service tier without written permission.</li>
             <li>Use the API to generate harmful, illegal, or discriminatory content.</li>
           </ul>

           <h2>3. Data Contribution License</h2>
           <p>By submitting linguistic data (text, audio, or metadata) to the Foundation, you grant us a perpetual, irrevocable, worldwide license to use, modify, and distribute the data as part of our open-source datasets, subject always to the protections outlined in our Data Pact.</p>

           <h2>4. Limitation of Liability</h2>
           <p>The Foundation provides its models and datasets on an "AS IS" basis. We bear no liability for indirect, incidental, or consequential damages arising from the use of our natural language processing infrastructure in production environments.</p>
        </div>
      </main>
    </div>
    <Footer />
    </>
  );
}
