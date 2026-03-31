import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

const siteLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Technology', href: '/technology' },
  { label: 'Impact', href: '/impact' },
  { label: 'Insights', href: '/insights' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Donate', href: '/donate' },
];

const resourceLinks = [
  { label: 'Open Models & APIs', href: '/technology' },
  { label: 'Datasets', href: '/technology#datasets' },
  { label: 'Vitality Index', href: '/vitality' },
  { label: 'Bounty Board', href: '/bounties' },
  { label: 'Publications', href: '/insights' },
  { label: 'Documentation', href: '/technology#docs' },
  { label: 'Partner With Us', href: '/get-involved#partner' },
  { label: 'Careers', href: '/get-involved#careers' },
];

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/localenlp', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/localenlp', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/localenlp', label: 'GitHub' },
  { icon: Mail, href: 'mailto:hello@localenlp.org', label: 'Email' },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#04040A' }} className="border-t border-white/8">
      <div className="container-wide section-padding py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex mb-5 group" aria-label="LocaleNLP Foundation home">
              <Image
                src="/logo-white.png"
                alt="LocaleNLP Foundation"
                width={200}
                height={40}
                className="h-9 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Building open, ethical language infrastructure for Africa and the Global South.
              Ensuring no community is left behind in the intelligence era.
            </p>
          </div>

          {/* Col 2 — Site Links */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 tracking-wide">
              Site
            </h4>
            <ul className="space-y-2.5">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Resources */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 tracking-wide">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Connect & Social */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 tracking-wide">
              Connect
            </h4>
            <div className="flex flex-wrap gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg glass-panel flex items-center justify-center text-text-secondary hover:text-white hover:border-accent-ochre/30 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <ul className="space-y-2.5">
              <li>
                <Link href="/get-involved#contact" className="text-sm text-text-secondary hover:text-white transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#newsletter" className="text-sm text-text-secondary hover:text-white transition-colors duration-200">
                  Newsletter
                </a>
              </li>
              <li>
                <a href="mailto:hello@localenlp.org" className="text-sm text-text-secondary hover:text-white transition-colors duration-200">
                  hello@localenlp.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-text-tertiary tracking-wider">
            © 2026 LocaleNLP Foundation. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="font-mono text-xs text-text-tertiary hover:text-text-secondary transition-colors duration-200 tracking-wide">
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-mono text-xs text-text-tertiary hover:text-text-secondary transition-colors duration-200 tracking-wide">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
