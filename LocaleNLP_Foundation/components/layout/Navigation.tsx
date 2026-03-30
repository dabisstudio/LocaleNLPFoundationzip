'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { GlowButton } from '@/components/ui/glow-button';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'About', href: '/about' },
  {
    label: 'Programs',
    href: '/programs',
    children: [
      { label: 'Language Futures Lab', href: '/programs/language-futures-lab' },
      { label: 'OpenSpeech Initiative', href: '/programs/openspeech-initiative' },
      { label: 'NLP for Public Good', href: '/programs/nlp-public-good' },
      { label: 'AIxLanguage Fellowship', href: '/programs/aixlanguage-fellowship' },
      { label: 'Civic AI', href: '/programs/civic-ai' },
    ],
  },
  { label: 'Technology', href: '/technology' },
  { label: 'Impact', href: '/impact' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Insights', href: '/insights' },
];

export default function Navigation() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setIsMobileOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/8">
      <nav className="container-wide section-padding">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="LocaleNLP home">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-ochre/80 to-accent-clay/80 flex items-center justify-center transition-shadow duration-300 group-hover:shadow-glow-ochre">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-white group-hover:text-accent-ochre transition-colors duration-300">
              LocaleNLP
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-text-secondary hover:text-white transition-colors duration-200 rounded-md hover:bg-white/5"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 transition-transform duration-200',
                        openDropdown === item.label && 'rotate-180'
                      )}
                    />
                  )}
                </Link>

                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2 z-50 animate-slide-down">
                    <div className="glass-panel rounded-xl py-2 min-w-[220px] border border-white/8">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-text-secondary hover:text-white hover:bg-white/5 transition-colors duration-150"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            <GlowButton href="/donate" variant="primary" className="text-sm">
              Donate
            </GlowButton>
          </div>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-white rounded-md hover:bg-white/10 transition-colors"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 md:top-20 z-40 glass-panel border-t border-white/8 overflow-y-auto animate-slide-down">
          <nav className="container-wide section-padding py-6 flex flex-col gap-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block py-3 px-4 text-base font-medium text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4 flex flex-col gap-0.5 mt-1 mb-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsMobileOpen(false)}
                        className="block py-2 px-4 text-sm text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-white/8">
              <GlowButton
                href="/donate"
                variant="primary"
                className="w-full justify-center"
                onClick={() => setIsMobileOpen(false)}
              >
                Donate
              </GlowButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
