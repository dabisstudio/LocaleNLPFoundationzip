import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Locale Data Pact | LocaleNLP Foundation',
  description:
    "The world's first Sovereign IP Licensing Model for African language data. A live, enforceable framework ensuring data sovereignty, equitable compensation, and open-source innovation for 2,000+ African languages.",
  openGraph: {
    title: 'The Locale Data Pact — Sovereign IP for African Language Data',
    description:
      "We built the world's first Sovereign IP Licensing Model for African language data — proving that ethical AI and commercial viability are not in conflict, but mutually reinforcing.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Locale Data Pact | LocaleNLP Foundation',
    description:
      "The world's first Sovereign IP Licensing Model for African language data.",
  },
};

export default function DataPactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
