import Link from 'next/link';
import { ArrowRight, Heart, Users, Code } from 'lucide-react';

const actions = [
  {
    icon: Heart,
    title: 'Donate',
    description: 'Fund the digitization of endangered African languages',
    href: '/donate',
    color: 'from-royal-500 to-royal-600',
  },
  {
    icon: Users,
    title: 'Partner',
    description: 'Join our mission as a research or implementation partner',
    href: '/get-involved#partner',
    color: 'from-ochre-500 to-ochre-600',
  },
  {
    icon: Code,
    title: 'Contribute',
    description: 'Join our open-source community and build with us',
    href: '/technology',
    color: 'from-forest-500 to-forest-600',
  },
];

export default function CTASection() {
  return (
    <section className="py-24 bg-midnight-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-royal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-ochre-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-wide section-padding relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-white mb-4">Join the Movement</h2>
          <p className="text-midnight-200 text-lg">
            Every language preserved is a culture saved. Every voice enabled is a barrier broken.
            Be part of the solution.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {actions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="glass-card p-8 text-center group hover:border-midnight-500 transition-all duration-300"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
              >
                <action.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-sora font-semibold text-white mb-2">{action.title}</h3>
              <p className="text-midnight-300 text-sm mb-4">{action.description}</p>
              <span className="inline-flex items-center text-sm text-ochre-400 font-medium">
                Get Started
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        <div className="glass-card p-8 md:p-12 text-center">
          <h3 className="text-white mb-4">Stay Updated</h3>
          <p className="text-midnight-200 mb-6 max-w-lg mx-auto">
            Get monthly updates on our research, new language releases, and stories from the
            communities we serve.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-midnight-800 border border-midnight-600 rounded-lg text-white placeholder:text-midnight-400 focus:outline-none focus:border-royal-500 transition-colors"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
          <p className="text-xs text-midnight-400 mt-4">
            No spam, unsubscribe anytime. Read our privacy policy.
          </p>
        </div>
      </div>
    </section>
  );
}
