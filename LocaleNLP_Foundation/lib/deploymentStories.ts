export interface Metric {
  value: string;
  label: string;
  accent: 'ochre' | 'cyan' | 'clay';
}

export interface TranscriptLine {
  ts: number;
  text: string;
}

export interface Milestone {
  date: string;
  title: string;
  body: string;
  accent: 'ochre' | 'cyan' | 'clay';
}

export interface DeploymentStory {
  slug: string;
  country: string;
  region: string;
  sector: string;
  headline: string;
  tagline: string;
  metrics: Metric[];
  problem: string;
  solution: string;
  audioUrl: string | null;
  transcript: TranscriptLine[];
  milestones: Milestone[];
  relatedProgram: string;
  relatedProgramSlug: string;
  accentColor: 'ochre' | 'cyan' | 'clay';
}

export const DEPLOYMENT_STORIES: DeploymentStory[] = [
  {
    slug: 'agriculture-senegal',
    country: 'Senegal',
    region: 'West Africa',
    sector: 'Agriculture',
    headline: 'Farming by Voice in Wolof & Pulaar',
    tagline: 'When over 80% of Senegalese farmers can\'t read French, the harvest advisory they never receive is the yield they never gain.',
    metrics: [
      { value: '12,000', label: 'Farmers Reached', accent: 'ochre' },
      { value: '4',      label: 'Local Languages', accent: 'cyan' },
      { value: '98%',    label: 'Uptime',          accent: 'clay' },
      { value: '31%',    label: 'Yield Increase',  accent: 'ochre' },
    ],
    problem:
      'In the Casamance and Sahel regions of Senegal, smallholder farmers depend on government agricultural extension services that publish advisories exclusively in French. More than 80% of rural farming communities speak Wolof, Pulaar, Serer, or Jola as their primary language — leaving critical crop, weather, and pest-management guidance locked behind a literacy and language wall. Missed planting windows and undetected fungal outbreaks cost an estimated USD 18M in crop losses annually in the Kaolack region alone.',
    solution:
      'LocaleNLP\'s OpenSpeech corpus for Wolof and Pulaar powered a conversational voice AI deployed as automated SMS + IVR calls through the national Senegalese agricultural extension network (SDDR). Farmers call a single national number and receive a 90-second briefing in their chosen language — covering rainfall forecasts, pest alerts, and planting schedules synthesised from ANSD and ANACIM data. The Lughatna platform manages the TTS voice models and pushes weekly updates from a self-hosted server in Dakar, eliminating cloud-dependency latency.',
    audioUrl: null,
    transcript: [
      { ts: 0,  text: 'Assalamu Alaykum. Dëgg nga message bu ndaw yi ci tëlëfon bi.' },
      { ts: 4,  text: 'Ci wiki bi jengu na, dëgg na ko fi: Kaolack, Fatick ak Diourbel.' },
      { ts: 9,  text: 'Ndox bi dafay wëcc ci altine ak talaata. Lekk na ci 40 mm.' },
      { ts: 14, text: 'Jëf dëgg: Nianu na mbedd bi ak nianu na jabar yi.' },
      { ts: 19, text: 'Yégg yi ngi ci dëkk bi ci suba. Jooy rekk.' },
    ],
    milestones: [
      {
        date: 'Jan 2023',
        title: 'Corpus Collection Begins',
        body: '3,200 hours of Wolof speech donated by community contributors via Lughatna\'s offline recording booth in Thiès.',
        accent: 'ochre',
      },
      {
        date: 'Jun 2023',
        title: 'Pilot Launch — Kaolack Region',
        body: 'IVR system deployed for 400 pilot farmers. 89% completion rate on first calls.',
        accent: 'cyan',
      },
      {
        date: 'Oct 2023',
        title: 'Ministry Partnership Signed',
        body: 'Senegal SDDR formally integrates the Lughatna TTS pipeline into the national extension network.',
        accent: 'clay',
      },
      {
        date: 'Mar 2024',
        title: 'Pulaar & Serer Added',
        body: 'Two additional language models launched. Coverage extended to 12,000 registered farmers.',
        accent: 'ochre',
      },
      {
        date: 'Sep 2024',
        title: 'Harvest Impact Audit',
        body: 'Independent NGO audit confirms 31% average yield improvement across participating households.',
        accent: 'cyan',
      },
    ],
    relatedProgram: 'OpenSpeech Initiative',
    relatedProgramSlug: 'openspeech-initiative',
    accentColor: 'ochre',
  },

  {
    slug: 'health-mali',
    country: 'Mali',
    region: 'West Africa',
    sector: 'Healthcare',
    headline: 'Clinic Navigation in Bambara',
    tagline: 'In a country where 73% of women give birth without a skilled attendant, language is not a soft barrier — it is a fatal one.',
    metrics: [
      { value: '50,000', label: 'Consultations Assisted', accent: 'cyan' },
      { value: '6',      label: 'Regional Hospitals',     accent: 'ochre' },
      { value: '72%',    label: 'Referral Completion',    accent: 'cyan' },
      { value: '3',      label: 'Languages Deployed',     accent: 'clay' },
    ],
    problem:
      'Mali\'s public health system operates predominantly in French, while 80% of the population speaks Bambara, Fulfulde, or Dogon as their primary language. Pregnant women in peri-urban Bamako and the Koulikoro region routinely miss critical referral appointments because discharge instructions, triage scripts, and antenatal care reminders are communicated in a language they cannot understand. The result: a maternal mortality ratio of 562 per 100,000 live births — among the highest in the world.',
    solution:
      'LocaleNLP partnered with ASACO (community health associations) to deploy a Bambara-language conversational assistant on the CHW (Community Health Worker) smartphone kit. Using the Language Futures Lab\'s low-resource Bambara NLP model, the assistant helps CHWs conduct standardised triage interviews, generate Bambara audio discharge summaries, and schedule follow-up reminders via SMS in Bambara. The Lughatna platform handles voice synthesis locally on device — no internet required at point of care.',
    audioUrl: null,
    transcript: [
      { ts: 0,  text: 'I ni sogoma. Ne b\'a fɛ i dɛmɛ tile bi.' },
      { ts: 4,  text: 'I ka jɛkuluya bɛ cogo di? I ka dimi bɛ min na?' },
      { ts: 9,  text: 'Dɔktɔrɔ b\'a fɔ ko i ka taa kliniki kɔnɔna tile saba kɔnɔ.' },
      { ts: 14, text: 'N\'b\'i weele a tile o tile ka tile ɲɔgɔn sɛbɛn ka taa.' },
      { ts: 19, text: 'I jɛkuluya bɛ ɲɛ. Aw ni baara.' },
    ],
    milestones: [
      {
        date: 'Mar 2022',
        title: 'Bambara Corpus Phase I',
        body: '800 hours of Bambara speech collected across Bamako, Ségou, and Mopti health districts.',
        accent: 'cyan',
      },
      {
        date: 'Nov 2022',
        title: 'CHW Pilot — Koulikoro',
        body: '42 Community Health Workers onboarded. Triage assist reduces consultation time by 22%.',
        accent: 'ochre',
      },
      {
        date: 'Apr 2023',
        title: 'Ministry of Health MOU',
        body: 'Mali\'s Direction Nationale de la Santé formally adopts Lughatna discharge summaries.',
        accent: 'clay',
      },
      {
        date: 'Dec 2023',
        title: '6 Hospitals Live',
        body: 'Deployment expanded to 6 regional hospitals. 50,000 consultations assisted to date.',
        accent: 'cyan',
      },
    ],
    relatedProgram: 'Language Futures Lab',
    relatedProgramSlug: 'language-futures-lab',
    accentColor: 'cyan',
  },

  {
    slug: 'education-nigeria',
    country: 'Nigeria',
    region: 'West Africa',
    sector: 'Education',
    headline: 'E-Learning Localisation in Hausa',
    tagline: 'Nigeria has 524 languages and one national curriculum. Hausa-speaking children in Kano are not behind — they are being taught in the wrong language.',
    metrics: [
      { value: '25,000', label: 'Students Reached', accent: 'clay' },
      { value: '524',    label: 'Nigerian Languages', accent: 'ochre' },
      { value: '43%',    label: 'Reading Score Gain', accent: 'clay' },
      { value: '12',     label: 'Partner Schools',    accent: 'cyan' },
    ],
    problem:
      'The Nigerian national curriculum mandates English-medium instruction from Primary 1, despite research consistently showing that children learn to read and write more effectively in their mother tongue during early years. In Kano State, where Hausa is spoken by 99% of households, children spend their first three years of school in a state of linguistic dissonance — unable to bridge classroom instruction with the language of home, community, and thought. Early-grade reading assessments in Kano show that only 18% of P3 students can read a simple Hausa sentence in Roman script.',
    solution:
      'LocaleNLP\'s Policy & Governance programme co-developed a mother-tongue literacy module with Kano State Ministry of Education, built on a Hausa TTS engine trained on the OpenSpeech corpus. The module runs on low-cost Android tablets pre-loaded with the Lughatna offline app: children hear a word spoken aloud in Hausa, see the Hausa script, and respond via a simple tap-and-record interface. Teachers receive real-time pronunciation and comprehension analytics via the Lughatna teacher dashboard — in Hausa.',
    audioUrl: null,
    transcript: [
      { ts: 0,  text: 'Sannu, ɗalibi. Bari mu fara karatu a yau.' },
      { ts: 4,  text: 'Ka danna zanen nan kuma ka karanta kalmar da ke ciki.' },
      { ts: 9,  text: 'Kalmar ita ce: Mango. Ka ce: Mango.' },
      { ts: 14, text: 'Madalla! Karɓar liyafar taka ta dace. Ka yi kyau ƙwarai.' },
      { ts: 19, text: 'Yanzu je darasin mai zuwa. Ci gaba da ƙoƙari!' },
    ],
    milestones: [
      {
        date: 'Aug 2022',
        title: 'Hausa Curriculum Audit',
        body: 'LocaleNLP and Kano MoE complete linguistic alignment audit of P1–P3 literacy standards.',
        accent: 'clay',
      },
      {
        date: 'Feb 2023',
        title: 'Hausa TTS Model v1',
        body: '2,100 hours of Hausa speech annotated. Model achieves 4.1 MOS on intelligibility.',
        accent: 'ochre',
      },
      {
        date: 'Sep 2023',
        title: 'Pilot — 4 Schools',
        body: 'Lughatna literacy app deployed to 4 Kano primary schools. 1,800 students enrolled.',
        accent: 'cyan',
      },
      {
        date: 'Jan 2024',
        title: 'Reading Assessment Results',
        body: 'Pilot students show 43% reading score gain vs. 9% control group. Results peer-reviewed.',
        accent: 'clay',
      },
      {
        date: 'Sep 2024',
        title: 'Scale to 12 Schools',
        body: 'Programme expanded to 12 schools, 25,000 students. USAID co-funding secured.',
        accent: 'ochre',
      },
    ],
    relatedProgram: 'Policy & Governance',
    relatedProgramSlug: 'policy-governance',
    accentColor: 'clay',
  },
];

export function getStoryBySlug(slug: string): DeploymentStory | undefined {
  return DEPLOYMENT_STORIES.find((s) => s.slug === slug);
}
