'use client';

import { motion } from 'framer-motion';
import { Download, FileText, BarChart } from 'lucide-react';
import { MonoLabel } from '@/components/ui/mono-label';
import { BrandPattern } from '@/components/ui/BrandPattern';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const REPORTS = [
  { year: '2025', title: 'Impact Ecosystem Report', size: '4.2 MB PDF' },
  { year: '2024', title: 'Foundation Genesis Overview', size: '3.8 MB PDF' },
  { year: '2023', title: 'Early Stage Language Deficits', size: '2.1 MB PDF' },
];

export default function ReportsPage() {
  return (
    <>
      <Navigation />
      <div className="relative min-h-screen bg-base-stone overflow-hidden">
      <BrandPattern variant="interactive" />
      <BrandPattern variant="bloom" bloomPosition="bottom-left" />

      <main className="relative z-10 container-wide section-padding pt-32 pb-24">
        {/* Header */}
        <div className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <MonoLabel label="TRANSPARENCY & DATA" status="active" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-5xl md:text-7xl leading-tight tracking-tighter text-ink-monument mb-6"
          >
            Proof over promises. <br className="hidden md:block" />
            <span className="text-ink-steel">Our annual reports.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-ink-steel/80 max-w-2xl"
          >
            Digital sovereignty relies on radical transparency. Explore our financial distributions, raw impact metrics, and foundational milestones.
          </motion.p>
        </div>

        {/* Reports Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-32">
          {REPORTS.map((report, i) => (
            <motion.div
              key={report.year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="group relative backdrop-blur-md bg-white/40 border border-ink-monument/10 rounded-2xl p-8 hover:bg-white/60 hover:shadow-card transition-all duration-300"
            >
              <div className="absolute top-8 right-8 text-ink-monument/20 group-hover:text-accent-ochre transition-colors">
                <Download className="w-6 h-6" />
              </div>
              
              <div className="font-mono text-sm font-bold text-accent-ochre mb-4">{report.year}</div>
              <h3 className="font-display font-bold text-2xl text-ink-monument mb-4 group-hover:text-accent-ochre transition-colors">{report.title}</h3>
              
              <div className="flex items-center gap-2 text-ink-steel/60 text-sm mb-8">
                <FileText className="w-4 h-4" />
                <span>{report.size}</span>
              </div>

              <button className="text-sm font-mono uppercase tracking-widest text-ink-monument flex items-center gap-2 group-hover:underline">
                Download PDF
              </button>
            </motion.div>
          ))}
        </div>

        {/* Financial Governance */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="bg-ink-monument text-white rounded-[2rem] p-8 md:p-16 relative overflow-hidden"
        >
           <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <MonoLabel label="GOVERNANCE" status="active" className="mb-6 !border-white/20 !text-white" />
                <h2 className="font-display font-bold text-4xl mb-6">Financial Allocation</h2>
                <p className="text-white/70 max-w-md">100% of our enterprise validation revenue flows back into the foundation to distribute data bounties to African communities and fund the open-source infrastructure layer.</p>
              </div>
              <div className="flex flex-col gap-6">
                 {[
                   { label: "Community Data Bounties", value: "65%" },
                   { label: "Infrastructure & Compute", value: "20%" },
                   { label: "Core Operations Sandbox", value: "15%" },
                 ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-center pb-4 border-b border-white/20 last:border-0 last:pb-0">
                       <span className="font-sans font-medium text-white/80">{stat.label}</span>
                       <span className="font-mono font-bold text-xl text-accent-ochre">{stat.value}</span>
                    </div>
                 ))}
              </div>
           </div>
        </motion.div>

      </main>
    </div>
    <Footer />
    </>
  );
}
