'use client';

import { motion } from 'framer-motion';
import { Newspaper, ArrowUpRight, FolderDown, Megaphone, Download } from 'lucide-react';
import { MonoLabel } from '@/components/ui/mono-label';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const ARTICLES = [
  { source: "Wired", headline: "The Foundation Giving Africa's Languages a Voice in AI", date: "Mar 12, 2026", type: "Feature" },
  { source: "TechCrunch", headline: "LocaleNLP Unveils 16 Billion Token Open Dataset", date: "Feb 04, 2026", type: "News" },
  { source: "MIT Tech Review", headline: "Digital Sovereignty: A New Model for AI Data Licensing", date: "Nov 28, 2025", type: "Analysis" },
];

export default function MediaPage() {
  return (
    <>
      <Navigation />
      <div className="relative min-h-screen bg-base-stone pt-32 pb-24">
      <main className="container-wide section-padding">
        
        <div className="max-w-4xl mb-24">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <MonoLabel label="PRESS & MEDIA ROOM" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display font-bold text-5xl md:text-7xl leading-tight tracking-tighter text-ink-monument mb-6"
          >
            The language equity <br className="hidden md:block"/>
            <span className="text-ink-steel">conversation.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl text-ink-steel/80 max-w-2xl"
          >
            For press inquiries, expert commentary on AI sovereignty, or to request media assets, please contact our communications desk.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Main Coverage Column */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <h2 className="font-mono text-sm uppercase tracking-widest text-ink-muted mb-4 border-b border-ink-monument/10 pb-4">Recent Coverage</h2>
            
            {ARTICLES.map((article, i) => (
              <motion.a
                key={i}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="group block p-8 bg-white border border-ink-monument/5 hover:border-accent-ochre/50 rounded-2xl transition-all shadow-card hover:shadow-glow-ochre"
              >
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold bg-accent-ochre/10 text-accent-ochre py-1 px-3 rounded-full">{article.type}</span>
                    <span className="font-sans font-semibold text-ink-monument">{article.source}</span>
                  </div>
                  <span className="font-mono text-xs text-ink-muted">{article.date}</span>
                </div>
                
                <div className="flex justify-between items-end gap-6">
                  <h3 className="font-display font-medium text-2xl text-ink-steel group-hover:text-ink-monument md:max-w-[70%]">{article.headline}</h3>
                  <div className="w-12 h-12 rounded-full border border-ink-monument/10 flex items-center justify-center group-hover:bg-accent-ochre group-hover:text-white transition-colors duration-300">
                     <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Press Kit Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 bg-white border border-ink-monument/10 rounded-2xl p-8 shadow-editorial">
               <h3 className="font-display font-bold text-2xl text-ink-monument mb-6 flex items-center gap-3">
                  <FolderDown className="w-6 h-6 text-accent-ochre" />
                  Media Assets
               </h3>
               <p className="text-ink-steel text-sm mb-8">
                 Download high-resolution logos, executive headshots, and our brand guidelines for authorized press usage.
               </p>
               
               <div className="flex flex-col gap-3 mb-8">
                  <button className="flex items-center justify-between w-full p-4 border border-ink-monument/10 hover:border-ink-monument/50 rounded-lg transition-colors group">
                     <span className="font-mono text-sm font-medium">Brand Guidelines (PDF)</span>
                     <Download className="w-4 h-4 text-ink-muted group-hover:text-ink-monument" />
                  </button>
                  <button className="flex items-center justify-between w-full p-4 border border-ink-monument/10 hover:border-ink-monument/50 rounded-lg transition-colors group">
                     <span className="font-mono text-sm font-medium">Vector Logos (ZIP)</span>
                     <Download className="w-4 h-4 text-ink-muted group-hover:text-ink-monument" />
                  </button>
                  <button className="flex items-center justify-between w-full p-4 border border-ink-monument/10 hover:border-ink-monument/50 rounded-lg transition-colors group">
                     <span className="font-mono text-sm font-medium">Platform Screenshots (ZIP)</span>
                     <Download className="w-4 h-4 text-ink-muted group-hover:text-ink-monument" />
                  </button>
               </div>

               <div className="pt-6 border-t border-ink-monument/10">
                  <h4 className="font-mono text-xs uppercase text-ink-muted tracking-widest mb-4">Press Inquiries</h4>
                  <a href="mailto:press@localenlp.org" className="text-accent-ochre font-bold hover:underline flex items-center gap-2">
                     <Megaphone className="w-4 h-4" /> press@localenlp.org
                  </a>
               </div>
            </div>
          </div>

        </div>
      </main>
    </div>
    <Footer />
    </>
  );
}
