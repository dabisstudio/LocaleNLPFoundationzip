import { Program } from '@/lib/supabase';

export const PLACEHOLDER_PROGRAMS: Program[] = [
  {
    id: 'p1',
    slug: 'afrispeech',
    title: 'AfriSpeech',
    short_description: 'ASR & TTS for 100+ African languages',
    problem_statement:
      'Only ~25 African languages have any speech technology coverage. 2,000+ remain completely undigitized.',
    solution:
      'Community-led voice data collection pipelines paired with multilingual ASR/TTS model training at continental scale.',
    icon: 'Mic',
    color: 'ochre',
    is_featured: true,
    order_index: 1,
    full_description: null,
    created_at: '',
  },
  {
    id: 'p2',
    slug: 'afrimt',
    title: 'AfriMT',
    short_description: 'Neural machine translation across African language families',
    problem_statement:
      'Cross-language communication in Africa relies on colonial-era intermediary languages, excluding millions.',
    solution:
      'Direct African-to-African neural translation models trained on parallel corpora we collect and curate.',
    icon: 'Microscope',
    color: 'cyan',
    is_featured: true,
    order_index: 2,
    full_description: null,
    created_at: '',
  },
  {
    id: 'p3',
    slug: 'language-documentation',
    title: 'Documentation Initiative',
    short_description: 'Preserving endangered languages before they are lost',
    problem_statement:
      'Hundreds of African languages have fewer than 10,000 speakers. Without documentation, they will vanish within decades.',
    solution:
      'Rapid-documentation protocols co-designed with linguists and community elders for endangered language archiving.',
    icon: 'BookOpen',
    color: 'clay',
    is_featured: false,
    order_index: 3,
    full_description: null,
    created_at: '',
  },
  {
    id: 'p4',
    slug: 'aixlanguage-fellowship',
    title: 'AIxLanguage Fellowship',
    short_description: 'Growing African NLP research capacity',
    problem_statement:
      'The global NLP research community has almost no representation from African linguists and engineers.',
    solution:
      'Fully-funded 12-month fellowships placing African researchers in immersive NLP research and engineering roles.',
    icon: 'GraduationCap',
    color: 'ochre',
    is_featured: true,
    order_index: 4,
    full_description: null,
    created_at: '',
  },
  {
    id: 'p5',
    slug: 'language-policy',
    title: 'Language Policy Advocacy',
    short_description: 'Shaping national AI strategies for linguistic inclusion',
    problem_statement:
      'Governments deploy AI systems in English or French, ignoring the majority of their population.',
    solution:
      'Policy briefs, government partnerships, and capacity-building programs to embed language equity in national AI strategies.',
    icon: 'Scale',
    color: 'cyan',
    is_featured: false,
    order_index: 5,
    full_description: null,
    created_at: '',
  },
  {
    id: 'p6',
    slug: 'community-health',
    title: 'Health Communication',
    short_description: 'Deploying language AI in healthcare settings',
    problem_statement:
      'Patients cannot communicate symptoms or understand diagnoses in health systems that operate in foreign languages.',
    solution:
      'Tailored ASR + NMT pipelines deployed in clinic settings, enabling healthcare professionals to serve patients in local languages.',
    icon: 'Heart',
    color: 'clay',
    is_featured: false,
    order_index: 6,
    full_description: null,
    created_at: '',
  },
];
