'use client';

import { AlertTriangle, Globe, MessageCircle, Zap } from 'lucide-react';

const problems = [
  {
    icon: Globe,
    stat: '2,000+',
    description: 'African languages invisible to AI systems',
    color: 'text-royal-400',
  },
  {
    icon: MessageCircle,
    stat: '< 1%',
    description: 'of global AI training data represents Africa',
    color: 'text-ochre-400',
  },
  {
    icon: AlertTriangle,
    stat: '500M',
    description: 'people excluded from digital services',
    color: 'text-forest-400',
  },
  {
    icon: Zap,
    stat: '90%',
    description: 'of voice assistants cant understand African accents',
    color: 'text-royal-400',
  },
];

export default function ProblemSection() {
  return (
    <section className="py-24 bg-midnight-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(107,31,119,0.1),transparent_50%)]" />

      <div className="container-wide section-padding relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-royal-500/10 text-royal-400 text-sm font-medium mb-4">
            The Challenge
          </span>
          <h2 className="text-white mb-4">A Continent Left Behind</h2>
          <p className="text-midnight-200 max-w-2xl mx-auto">
            While AI transforms global communication, Africas rich linguistic heritage remains
            invisible to technology. This isnt just a technical problem its a crisis of equity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="glass-card p-6 group hover:border-midnight-500 transition-all duration-300"
            >
              <div className={`${problem.color} mb-4`}>
                <problem.icon className="w-8 h-8" />
              </div>
              <div className="text-4xl font-sora font-bold text-white mb-2">{problem.stat}</div>
              <p className="text-midnight-300 text-sm">{problem.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 glass-card p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-white mb-4">Why This Matters</h3>
              <p className="text-midnight-200 mb-4">
                When a mother in rural Nigeria cant access health information in Yoruba, when a
                farmer in Kenya cant get weather alerts in Swahili, when children cant learn in
                their mother tongue this is what linguistic exclusion looks like.
              </p>
              <p className="text-midnight-200">
                AI is reshaping how the world communicates, learns, and accesses services. Without
                intervention, 500 million Africans risk being excluded from this transformation.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-midnight-800 rounded-lg p-4 text-center">
                <div className="text-3xl font-sora font-bold text-ochre-400 mb-1">Healthcare</div>
                <p className="text-xs text-midnight-400">Critical info inaccessible</p>
              </div>
              <div className="bg-midnight-800 rounded-lg p-4 text-center">
                <div className="text-3xl font-sora font-bold text-forest-400 mb-1">Education</div>
                <p className="text-xs text-midnight-400">Learning barriers persist</p>
              </div>
              <div className="bg-midnight-800 rounded-lg p-4 text-center">
                <div className="text-3xl font-sora font-bold text-royal-400 mb-1">Finance</div>
                <p className="text-xs text-midnight-400">Services remain exclusive</p>
              </div>
              <div className="bg-midnight-800 rounded-lg p-4 text-center">
                <div className="text-3xl font-sora font-bold text-ochre-400 mb-1">Civic</div>
                <p className="text-xs text-midnight-400">Participation limited</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
