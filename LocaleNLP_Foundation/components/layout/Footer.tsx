import Link from 'next/link';
import { Globe, Twitter, Linkedin, Github, Mail } from 'lucide-react';

const footerLinks = {
  programs: [
    { label: 'Language Futures Lab', href: '/programs/language-futures-lab' },
    { label: 'OpenSpeech Initiative', href: '/programs/openspeech-initiative' },
    { label: 'NLP for Public Good', href: '/programs/nlp-public-good' },
    { label: 'AIxLanguage Fellowship', href: '/programs/aixlanguage-fellowship' },
    { label: 'Civic AI', href: '/programs/civic-ai' },
  ],
  resources: [
    { label: 'Open Models & APIs', href: '/technology' },
    { label: 'Datasets', href: '/technology#datasets' },
    { label: 'Publications', href: '/insights' },
    { label: 'Documentation', href: '/technology#docs' },
  ],
  organization: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Team', href: '/about#team' },
    { label: 'Impact', href: '/impact' },
    { label: 'Careers', href: '/get-involved#careers' },
  ],
  connect: [
    { label: 'Partner With Us', href: '/get-involved#partner' },
    { label: 'Donate', href: '/donate' },
    { label: 'Newsletter', href: '#newsletter' },
    { label: 'Contact', href: '/get-involved#contact' },
  ],
};

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">

          {/* ── Brand column ──────────────────────────── */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-ochre/80 to-accent-clay/80 flex items-center justify-center">
                <Globe className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white group-hover:text-accent-ochre transition-colors duration-300">
                LocaleNLP
              </span>
            </Link>

            <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-xs">
              Building the open, ethical infrastructure for African and Indigenous languages.
              Ensuring no community is left behind in the intelligence era.
            </p>

            <div className="flex items-center gap-3">
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
          </div>

          {/* ── Programs ───────────────────────────────── */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 tracking-wide">
              Programs
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.programs.map((link) => (
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

          {/* ── Resources ──────────────────────────────── */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 tracking-wide">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
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

          {/* ── Organization ───────────────────────────── */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 tracking-wide">
              Organization
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.organization.map((link) => (
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

          {/* ── Connect ────────────────────────────────── */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 tracking-wide">
              Connect
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.connect.map((link) => (
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
        </div>

        {/* ── Bottom bar ─────────────────────────────── */}
        <div className="mt-12 pt-8 border-t border-white/6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-text-tertiary tracking-wider">
            © 2026 LocaleNLP Foundation. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="font-mono text-xs text-text-tertiary hover:text-text-secondary transition-colors duration-200 tracking-wide"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-mono text-xs text-text-tertiary hover:text-text-secondary transition-colors duration-200 tracking-wide"
            >
              Terms of Service
            </Link>
            <span className="font-mono text-xs text-text-tertiary tracking-wider">
              [ BUILT FOR AFRICA ]
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
