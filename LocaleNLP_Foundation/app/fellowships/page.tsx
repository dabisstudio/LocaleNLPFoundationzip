'use client';

import { motion } from 'framer-motion';
import { MonoLabel } from '@/components/ui/mono-label';
import { GraduationCap, ArrowRight, Microchip, Earth } from 'lucide-react';
import { GlowButton } from '@/components/ui/glow-button';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export default function FellowshipsPage() {
  return (
    <>
      <Navigation />
      <div className="relative min-h-screen bg-base-stone">
      {/* Dynamic Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-ink-monument text-white rounded-b-[3rem]">
        <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />
        <div className="container-wide relative z-10 pt-16">
          <MonoLabel label="RESEARCH FELLOWSHIPS 2026" status="active" className="!border-white/20 !text-white mb-8" />
          
          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-[6rem] leading-[0.95] tracking-tighter mb-8 max-w-5xl">
            Fund the minds <br/><span className="text-accent-ochre">building the models.</span>
          </h1>
          
          <p className="text-xl text-white/70 max-w-2xl mb-12">
            The LocaleNLP Foundation awards fully-funded, unconstrained fellowships to exceptional African language researchers, ensuring the architecture of tomorrow is authored by the voices of today.
          </p>

          <div className="flex gap-4">
            <GlowButton href="#apply" variant="primary">Apply for Cohort III</GlowButton>
            <GlowButton href="#scholars" variant="ghost" className="!text-white border-white/20 hover:bg-white/10">View Alumni Fellows</GlowButton>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="container-wide section-padding py-24">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
           <div>
              <h2 className="font-display font-bold text-4xl text-ink-monument mb-6">Language equity requires structural investment.</h2>
              <p className="text-lg text-ink-steel mb-8">
                Silicon Valley cannot solve African NLP. True sovereignty requires deep cultural context, which is why we invest exclusively in researchers living and working on the continent. Our fellowship provides a massive compute stipend, direct financial grants, and access to our proprietary dataset pipeline.
              </p>

              <div className="flex flex-col gap-8">
                 <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-accent-ochre/10 flex items-center justify-center shrink-0">
                       <Microchip className="w-6 h-6 text-accent-ochre" />
                    </div>
                    <div>
                       <h3 className="font-bold text-ink-monument mb-2">Compute & API Access</h3>
                       <p className="text-ink-steel text-sm">H100 node access allocation and unmetered gateway keys to train foundational models across languages.</p>
                    </div>
                 </div>
                 <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-accent-ochre/10 flex items-center justify-center shrink-0">
                       <GraduationCap className="w-6 h-6 text-accent-ochre" />
                    </div>
                    <div>
                       <h3 className="font-bold text-ink-monument mb-2">Living Stipend</h3>
                       <p className="text-ink-steel text-sm">$35,000 USD unconstrained grant to support living expenses during the 9-month remote fellowship.</p>
                    </div>
                 </div>
                 <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-accent-ochre/10 flex items-center justify-center shrink-0">
                       <Earth className="w-6 h-6 text-accent-ochre" />
                    </div>
                    <div>
                       <h3 className="font-bold text-ink-monument mb-2">Global Cohort Network</h3>
                       <p className="text-ink-steel text-sm">Collaborate with leading researchers from Nairobi, Lagos, and Addis Ababa in private research sprints.</p>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="relative">
              <div className="aspect-[4/5] bg-ink-steel/5 rounded-2xl overflow-hidden relative">
                 <div className="absolute inset-x-8 bottom-8 p-8 bg-white border border-ink-monument/10 rounded-xl shadow-float">
                    <div className="font-mono text-sm text-accent-ochre font-bold mb-2">Current Focus Domains</div>
                    <ul className="space-y-3 font-sans text-ink-monument font-medium">
                       <li className="flex items-center gap-3"><ArrowRight className="w-4 h-4 text-ink-muted"/> Zero-shot translation efficiency</li>
                       <li className="flex items-center gap-3"><ArrowRight className="w-4 h-4 text-ink-muted"/> Speech-to-text in tonal languages</li>
                       <li className="flex items-center gap-3"><ArrowRight className="w-4 h-4 text-ink-muted"/> Corpus generation for oral history</li>
                    </ul>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
