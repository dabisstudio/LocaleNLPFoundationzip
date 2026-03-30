'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-midnight-900/95 backdrop-blur-lg border-b border-midnight-700/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-wide section-padding">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-royal-500 to-ochre-500 flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-sora font-bold text-xl text-white group-hover:text-ochre-400 transition-colors">
              LocaleNLP
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-sm font-medium text-midnight-200 hover:text-white transition-colors"
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-4 h-4" />}
                </Link>
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="bg-midnight-800 border border-midnight-600 rounded-lg shadow-xl py-2 min-w-[220px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-midnight-200 hover:text-white hover:bg-midnight-700 transition-colors"
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

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/donate" className="btn-primary text-sm">
              Donate
            </Link>
          </div>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-white"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileOpen && (
          <div className="lg:hidden py-4 border-t border-midnight-700/50">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block py-2 text-midnight-200 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-4 flex flex-col gap-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsMobileOpen(false)}
                          className="block py-1.5 text-sm text-midnight-300 hover:text-white transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/donate"
                onClick={() => setIsMobileOpen(false)}
                className="btn-primary text-sm mt-4 text-center"
              >
                Donate
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
