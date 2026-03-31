import { Program } from '@/lib/supabase';

export const PLACEHOLDER_PROGRAMS: Program[] = [
  {
    id: 'p1',
    slug: 'openspeech-initiative',
    title: 'OpenSpeech Initiative',
    short_description: 'Community-led effort to collect, annotate, and release speech data for 200+ African languages under open licences.',
    problem_statement:
      'Only roughly 25 African languages have any meaningful speech technology coverage. The remaining 2,000+ remain completely undigitized.',
    solution:
      'Participatory data-collection pipelines paired with rigorous annotation workflows, releasing everything under permissive open-source licenses.',
    icon: 'Mic',
    color: 'ochre',
    is_featured: true,
    order_index: 1,
    full_description: null,
    country_id: null,
    created_at: '',
  },
  {
    id: 'p2',
    slug: 'language-futures-lab',
    title: 'Language Futures Lab',
    short_description: 'Research and development hub for low-resource African language models, benchmarks, and evaluation frameworks.',
    problem_statement:
      'Existing NLP benchmarks and pre-trained models are calibrated for European and East Asian languages.',
    solution:
      'Purpose-built benchmarks designed by African linguists, paired with model architectures that handle high morphological complexity.',
    icon: 'Microscope',
    color: 'cyan',
    is_featured: true,
    order_index: 2,
    full_description: null,
    country_id: null,
    created_at: '',
  },
  {
    id: 'p3',
    slug: 'lughatna-platform',
    title: 'Lughatna Platform',
    short_description: 'Open digital platform enabling any African community to self-host localised NLP services without cloud dependency.',
    problem_statement:
      'Cloud-dependent AI services fail in rural Africa where connectivity is expensive or unreliable.',
    solution:
      'An open-source, offline-first application server that bundles pre-trained models and a minimal inference runtime.',
    icon: 'Heart',
    color: 'clay',
    is_featured: true,
    order_index: 3,
    full_description: null,
    country_id: null,
    created_at: '',
  },
  {
    id: 'p4',
    slug: 'policy-governance',
    title: 'Policy & Governance',
    short_description: 'Shaping national AI strategies and international standards to embed language equity at the policy level.',
    problem_statement:
      'Governments across Africa are deploying AI systems designed for English or French speakers.',
    solution:
      'Strategic policy engagement, evidence-based advocacy, and capacity-building programmes that embed language-equity requirements.',
    icon: 'Scale',
    color: 'ochre',
    is_featured: true,
    order_index: 4,
    full_description: null,
    country_id: null,
    created_at: '',
  },
];
