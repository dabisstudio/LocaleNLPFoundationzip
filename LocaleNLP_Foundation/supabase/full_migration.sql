/*
  # LocaleNLP Foundation Database Schema

  1. New Tables
    - `countries` - African countries with coordinates for map visualization
      - `id` (uuid, primary key)
      - `name` (text) - Country name
      - `code` (text) - ISO country code
      - `lat` (decimal) - Latitude for map
      - `lng` (decimal) - Longitude for map
      - `region` (text) - African region (West, East, North, South, Central)
      - `active_projects` (integer) - Number of active projects
      - `created_at` (timestamptz)
    
    - `languages` - African languages being digitized
      - `id` (uuid, primary key)
      - `name` (text) - Language name
      - `native_name` (text) - Name in native script
      - `country_id` (uuid, foreign key)
      - `speakers_count` (integer) - Estimated number of speakers
      - `audio_sample_url` (text) - URL to audio sample
      - `transcript` (text) - Transcript of audio sample
      - `status` (text) - digitization status
      - `created_at` (timestamptz)
    
    - `programs` - Foundation programs
      - `id` (uuid, primary key)
      - `title` (text) - Program title
      - `slug` (text) - URL slug
      - `short_description` (text)
      - `full_description` (text)
      - `icon` (text) - Icon name
      - `color` (text) - Theme color
      - `problem_statement` (text)
      - `solution` (text)
      - `is_featured` (boolean)
      - `order_index` (integer)
      - `created_at` (timestamptz)
    
    - `impact_metrics` - Key impact statistics
      - `id` (uuid, primary key)
      - `label` (text) - Metric label
      - `value` (text) - Metric value
      - `unit` (text) - Unit of measurement
      - `icon` (text) - Icon name
      - `order_index` (integer)
      - `created_at` (timestamptz)
    
    - `case_studies` - Success stories
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text)
      - `summary` (text)
      - `content` (text)
      - `image_url` (text)
      - `country_id` (uuid, foreign key)
      - `program_id` (uuid, foreign key)
      - `is_featured` (boolean)
      - `created_at` (timestamptz)
    
    - `team_members` - Board and team
      - `id` (uuid, primary key)
      - `name` (text)
      - `role` (text)
      - `bio` (text)
      - `image_url` (text)
      - `linkedin_url` (text)
      - `twitter_url` (text)
      - `member_type` (text) - board, advisor, team
      - `order_index` (integer)
      - `created_at` (timestamptz)
    
    - `partners` - Partner organizations
      - `id` (uuid, primary key)
      - `name` (text)
      - `logo_url` (text)
      - `website_url` (text)
      - `partner_type` (text) - funding, research, implementation
      - `is_featured` (boolean)
      - `order_index` (integer)
      - `created_at` (timestamptz)
    
    - `publications` - Research publications
      - `id` (uuid, primary key)
      - `title` (text)
      - `authors` (text)
      - `abstract` (text)
      - `publication_date` (date)
      - `publication_type` (text) - paper, brief, report
      - `pdf_url` (text)
      - `external_url` (text)
      - `is_featured` (boolean)
      - `created_at` (timestamptz)
    
    - `contact_submissions` - Form submissions
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `organization` (text)
      - `inquiry_type` (text)
      - `message` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for content tables
    - Protected write access for contact_submissions
*/

CREATE TABLE IF NOT EXISTS countries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL,
  lat decimal(10, 6) NOT NULL,
  lng decimal(10, 6) NOT NULL,
  region text NOT NULL,
  active_projects integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS languages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  native_name text,
  country_id uuid REFERENCES countries(id) ON DELETE SET NULL,
  speakers_count integer,
  audio_sample_url text,
  transcript text,
  status text DEFAULT 'in_progress',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  short_description text,
  full_description text,
  icon text,
  color text DEFAULT 'royal',
  problem_statement text,
  solution text,
  is_featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS impact_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  value text NOT NULL,
  unit text,
  icon text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  summary text,
  content text,
  image_url text,
  country_id uuid REFERENCES countries(id) ON DELETE SET NULL,
  program_id uuid REFERENCES programs(id) ON DELETE SET NULL,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  bio text,
  image_url text,
  linkedin_url text,
  twitter_url text,
  member_type text NOT NULL DEFAULT 'team',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  website_url text,
  partner_type text DEFAULT 'research',
  is_featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS publications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  authors text,
  abstract text,
  publication_date date,
  publication_type text DEFAULT 'paper',
  pdf_url text,
  external_url text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  organization text,
  inquiry_type text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_languages_country ON languages(country_id);
CREATE INDEX IF NOT EXISTS idx_case_studies_country ON case_studies(country_id);
CREATE INDEX IF NOT EXISTS idx_case_studies_program ON case_studies(program_id);
CREATE INDEX IF NOT EXISTS idx_programs_slug ON programs(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON case_studies(slug);

ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for countries"
  ON countries FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access for languages"
  ON languages FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access for programs"
  ON programs FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access for impact_metrics"
  ON impact_metrics FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access for case_studies"
  ON case_studies FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access for team_members"
  ON team_members FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access for partners"
  ON partners FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access for publications"
  ON publications FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND 
    email IS NOT NULL AND 
    inquiry_type IS NOT NULL AND 
    message IS NOT NULL
  );
CREATE TABLE IF NOT EXISTS insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text,
  category text NOT NULL DEFAULT 'research',
  read_time_minutes integer NOT NULL DEFAULT 5,
  published_at timestamptz NOT NULL DEFAULT now(),
  cover_image_url text,
  external_url text,
  is_featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_insights_published_at ON insights(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_insights_category ON insights(category);

ALTER TABLE insights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for insights"
  ON insights FOR SELECT
  TO anon, authenticated
  USING (true);
-- LocaleNLP Foundation — Seed Data
-- Idempotent: safe to run multiple times via ON CONFLICT DO NOTHING.

-- ─── COUNTRIES ───────────────────────────────────────────────────────────────
INSERT INTO countries (name, code, lat, lng, region, active_projects)
SELECT name, code, lat, lng, region, active_projects FROM (VALUES
  ('Nigeria',                  'NG', 9.082,   8.675,  'West',    4),
  ('Ethiopia',                 'ET', 9.145,  40.490,  'East',    3),
  ('Egypt',                    'EG', 26.820,  30.802,  'North',   1),
  ('Algeria',                  'DZ', 28.034,   1.659,  'North',   1),
  ('South Africa',             'ZA',-30.560,  22.938,  'South',   3),
  ('Tanzania',                 'TZ', -6.369,  34.889,  'East',    2),
  ('Kenya',                    'KE', -0.023,  37.906,  'East',    3),
  ('Morocco',                  'MA', 31.792,  -7.093,  'North',   1),
  ('Angola',                   'AO',-11.203,  17.874,  'Central', 1),
  ('Ghana',                    'GH',  7.947,  -1.024,  'West',    3),
  ('Cameroon',                 'CM',  3.848,  11.502,  'Central', 2),
  ('Ivory Coast',              'CI',  7.540,  -5.547,  'West',    2),
  ('Niger',                    'NE', 17.608,   8.082,  'West',    1),
  ('Mali',                     'ML', 17.571,  -3.996,  'West',    1),
  ('Burkina Faso',             'BF', 12.364,  -1.262,  'West',    1),
  ('Mozambique',               'MZ',-18.666,  35.530,  'East',    1),
  ('Madagascar',               'MG',-18.767,  46.870,  'East',    1),
  ('Uganda',                   'UG',  1.374,  32.290,  'East',    2),
  ('Senegal',                  'SN', 14.497, -14.452,  'West',    2),
  ('Rwanda',                   'RW', -1.940,  29.874,  'East',    2),
  ('Guinea',                   'GN', 11.104, -10.947,  'West',    1),
  ('Burundi',                  'BI', -3.373,  29.919,  'East',    1),
  ('Somalia',                  'SO',  5.152,  46.199,  'East',    1),
  ('Chad',                     'TD', 15.454,  18.732,  'Central', 1),
  ('Zambia',                   'ZM',-13.134,  27.849,  'East',    1),
  ('Zimbabwe',                 'ZW',-19.015,  29.155,  'South',   1),
  ('Sudan',                    'SD', 12.862,  30.218,  'North',   1),
  ('Togo',                     'TG',  8.620,   0.825,  'West',    0),
  ('Sierra Leone',             'SL',  8.461, -11.779,  'West',    0),
  ('Liberia',                  'LR',  6.428,  -9.430,  'West',    0),
  ('Central African Republic', 'CF',  6.611,  20.939,  'Central', 0),
  ('Congo Republic',           'CG', -0.228,  15.827,  'Central', 0),
  ('DR Congo',                 'CD', -4.038,  21.759,  'Central', 2),
  ('Malawi',                   'MW',-13.254,  34.302,  'East',    1),
  ('Namibia',                  'NA',-22.958,  18.491,  'South',   1),
  ('Botswana',                 'BW',-22.329,  24.684,  'South',   1),
  ('Mauritania',               'MR', 21.007, -10.940,  'West',    0),
  ('Gambia',                   'GM', 13.443, -15.311,  'West',    0),
  ('Guinea-Bissau',            'GW', 11.804, -15.180,  'West',    0),
  ('Benin',                    'BJ',  9.307,   2.315,  'West',    0),
  ('Eritrea',                  'ER', 15.180,  39.782,  'East',    0),
  ('Djibouti',                 'DJ', 11.825,  42.590,  'East',    0),
  ('Western Sahara',           'EH', 24.215, -12.886,  'North',   0),
  ('Cape Verde',               'CV', 16.538, -23.041,  'West',    0),
  ('Comoros',                  'KM',-11.875,  43.872,  'East',    0),
  ('South Sudan',              'SS',  6.877,  31.307,  'East',    1),
  ('Lesotho',                  'LS',-29.610,  28.233,  'South',   0)
) AS t(name, code, lat, lng, region, active_projects)
WHERE NOT EXISTS (SELECT 1 FROM countries WHERE countries.code = t.code);

-- ─── PROGRAMS ────────────────────────────────────────────────────────────────
INSERT INTO programs (title, slug, short_description, full_description, icon, color, problem_statement, solution, is_featured, order_index)
SELECT title, slug, short_description, full_description, icon, color, problem_statement, solution, is_featured, order_index FROM (VALUES
  (
    'OpenSpeech Initiative',
    'openspeech-initiative',
    'Community-led effort to collect, annotate, and release speech data for 200+ African languages under open licences.',
    'The OpenSpeech Initiative is a continent-wide participatory research programme dedicated to building the largest open-access speech corpus for African languages. Working with community annotators, language specialists, and volunteer speakers in 38 countries, we have collected over 12,000 hours of natural speech spanning greetings, civic discourse, healthcare dialogues, and oral tradition. Every recording is consented, speaker-attributed, and released under CC-BY-SA 4.0.',
    'Mic', 'ochre',
    'Only roughly 25 African languages have any meaningful speech technology coverage. The remaining 2,000+ remain completely undigitized, invisible to voice assistants, transcription tools, and accessibility software.',
    'Participatory data-collection pipelines paired with rigorous annotation workflows, releasing everything under permissive open-source licenses so any researcher or developer can build on our work without restriction.',
    true, 1
  ),
  (
    'Language Futures Lab',
    'language-futures-lab',
    'Research and development hub for low-resource African language models, benchmarks, and evaluation frameworks.',
    'The Language Futures Lab is our applied-research division, housed at partner universities across Nairobi, Lagos, Accra, and Dakar. Lab researchers design and train multilingual NLP models optimised for African morphological complexity, tonal languages, and code-switching patterns. We publish all benchmarks and model weights publicly, and collaborate with 40+ universities globally.',
    'Microscope', 'cyan',
    'Existing NLP benchmarks and pre-trained models are calibrated for European and East Asian languages. African languages perform 30-60 percentage points below baseline on standard benchmarks.',
    'Purpose-built benchmarks designed by African linguists, paired with model architectures that handle high morphological complexity and low-resource constraints. Every benchmark and model weight is published under Apache 2.0.',
    true, 2
  ),
  (
    'Lughatna Platform',
    'lughatna-platform',
    'Open digital platform enabling any African community to self-host localised NLP services without cloud dependency.',
    'Lughatna (Arabic: "our language") is a lightweight, offline-capable platform that allows community health workers, teachers, and civic organisations to deploy natural-language services on low-cost hardware without an internet connection. The platform ships with pre-trained models for 47 languages and has been piloted in 12 countries.',
    'Heart', 'clay',
    'Cloud-dependent AI services fail in rural Africa where connectivity is expensive or unreliable. Communities that need AI tools most are precisely those least able to pay per-API-call pricing models.',
    'An open-source, offline-first application server that bundles pre-trained models and a minimal inference runtime. Communities own the deployment; no data leaves their infrastructure without explicit consent.',
    true, 3
  ),
  (
    'Policy & Governance',
    'policy-governance',
    'Shaping national AI strategies and international standards to embed language equity at the policy level.',
    'Our Policy & Governance programme works with government ministries, regulatory bodies, and international standards organisations to ensure that African language needs are written into AI regulations, procurement requirements, and funding mandates. The team has contributed to the African Union''s AI Continental Strategy and UNESCO''s Recommendation on the Ethics of AI.',
    'Scale', 'ochre',
    'Governments across Africa are deploying AI systems designed for English or French speakers, systematically excluding citizens who communicate in local languages from digital public services.',
    'Strategic policy engagement, evidence-based advocacy, and capacity-building programmes that embed language-equity requirements into procurement standards, national AI strategies, and international governance frameworks.',
    true, 4
  ),
  (
    'AIxLanguage Fellowship',
    'aixlanguage-fellowship',
    'Fully-funded 12-month fellowships for African computational linguists and machine-learning engineers.',
    'The AIxLanguage Fellowship is a fully-funded 12-month immersive programme for African researchers at the intersection of linguistics and machine learning. Fellows are embedded with research teams at partner institutions, receive a monthly stipend, and work on a self-directed project culminating in at least one peer-reviewed publication. Since 2023, 240 fellows from 32 African countries have participated.',
    'GraduationCap', 'cyan',
    'The global NLP research community has minimal representation from African linguists and engineers. Without deliberate investment in African research capacity, African language technology will continue to be built by outsiders.',
    'Paid, year-long fellowships placing African researchers in immersive NLP research environments, combining mentorship from senior scientists with hands-on project work on African language challenges.',
    false, 5
  ),
  (
    'Health Communication',
    'health-communication',
    'Deploying language AI in clinic and community-health settings across 12 partner countries.',
    'The Health Communication programme partners with Ministries of Health and NGOs to deploy ASR and neural machine translation pipelines in primary-care clinics, enabling healthcare workers to communicate with patients in local languages. The programme has been deployed in 340 clinics across Nigeria, Kenya, Ethiopia, and Uganda.',
    'Heart', 'clay',
    'In health systems that operate in colonial languages, patients cannot accurately describe symptoms or understand diagnoses. This communication gap contributes to preventable morbidity and mortality.',
    'Tailored ASR and NMT pipelines deployed on clinic tablets, enabling real-time transcription and translation between patient and healthcare professional in 47 supported languages.',
    false, 6
  )
) AS t(title, slug, short_description, full_description, icon, color, problem_statement, solution, is_featured, order_index)
WHERE NOT EXISTS (SELECT 1 FROM programs WHERE programs.slug = t.slug);

-- ─── IMPACT METRICS ──────────────────────────────────────────────────────────
INSERT INTO impact_metrics (label, value, unit, icon, order_index)
SELECT label, value, unit, icon, order_index FROM (VALUES
  ('African Languages',    '2,000+', 'languages',          'Globe',         1),
  ('Speakers Underserved', '500M+',  'people',             'Users',         2),
  ('Languages Supported',  '47',     'languages',          'CheckCircle',   3),
  ('of AI Training Data',  '<1%',    '% African content',  'AlertTriangle', 4)
) AS t(label, value, unit, icon, order_index)
WHERE NOT EXISTS (SELECT 1 FROM impact_metrics WHERE impact_metrics.label = t.label);

-- ─── TEAM MEMBERS ────────────────────────────────────────────────────────────
INSERT INTO team_members (name, role, bio, image_url, linkedin_url, twitter_url, member_type, order_index)
SELECT name, role, bio, image_url, linkedin_url, twitter_url, member_type, order_index FROM (VALUES
  ('Dr. Adaeze Okonkwo',  'Executive Director',
   'Computational linguist and AI researcher with 15 years of experience in low-resource NLP. Former faculty at University of Lagos; co-founder of Masakhane West Africa chapter.',
   NULL, 'https://linkedin.com/in/placeholder', NULL, 'team', 1),
  ('Kwame Acheampong',    'Chief Technology Officer',
   'Machine learning engineer specialising in multilingual models and efficient inference. Previously led NLP infrastructure at a major African fintech. MS from Carnegie Mellon Africa.',
   NULL, 'https://linkedin.com/in/placeholder', 'https://twitter.com/placeholder', 'team', 2),
  ('Fatima Al-Rashidi',   'Director of Research',
   'Linguist and NLP researcher with expertise in Afro-Asiatic and Nilo-Saharan language families. PhD from SOAS University of London. Published 30+ papers on low-resource language modelling.',
   NULL, 'https://linkedin.com/in/placeholder', NULL, 'team', 3),
  ('Sipho Dlamini',       'Director of Community Partnerships',
   'Community organiser and digital-rights advocate with 12 years working across Southern Africa. Leads our participatory data-collection protocols and community consent frameworks.',
   NULL, NULL, 'https://twitter.com/placeholder', 'team', 4),
  ('Prof. Amara Diallo',  'Board Chair',
   'Professor of Computer Science at Université Cheikh Anta Diop, Dakar. Pioneer in West African language digitisation. Advisor to the African Union Digital Transformation Strategy.',
   NULL, 'https://linkedin.com/in/placeholder', NULL, 'board', 1),
  ('Dr. Nkechi Eze',      'Board Member — Ethics & Policy',
   'Technology policy researcher and former UN Special Rapporteur on AI and Human Rights. Author of "Digital Colonialism and the African Internet" (2022).',
   NULL, 'https://linkedin.com/in/placeholder', NULL, 'board', 2),
  ('Marcus Oliveira',     'Advisory Board — Engineering',
   'VP of Engineering at a leading multilingual AI lab. Brings expertise in large-scale model training, distributed systems, and open-source governance.',
   NULL, 'https://linkedin.com/in/placeholder', NULL, 'advisor', 1),
  ('Dr. Ayan Hassan',     'Advisory Board — Linguistics',
   'Expert in Cushitic and Omotic languages of the Horn of Africa. Senior Research Fellow at the African Languages Research Institute, Addis Ababa.',
   NULL, NULL, NULL, 'advisor', 2)
) AS t(name, role, bio, image_url, linkedin_url, twitter_url, member_type, order_index)
WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE team_members.name = t.name);

-- ─── PARTNERS ────────────────────────────────────────────────────────────────
INSERT INTO partners (name, logo_url, website_url, partner_type, is_featured, order_index)
SELECT name, logo_url, website_url, partner_type, is_featured, order_index FROM (VALUES
  ('Google AI',          NULL, 'https://ai.google',               'funding',        true,  1),
  ('Mozilla Foundation', NULL, 'https://foundation.mozilla.org',  'funding',        true,  2),
  ('Masakhane NLP',      NULL, 'https://www.masakhane.io',        'research',       true,  3),
  ('AI4D Africa',        NULL, 'https://ai4d.ai',                 'research',       true,  4),
  ('African Union',      NULL, 'https://au.int',                  'governance',     true,  5),
  ('Lacuna Fund',        NULL, 'https://lacunafund.org',          'funding',        true,  6),
  ('DataKind',           NULL, 'https://datakind.org',            'implementation', true,  7),
  ('Microsoft Research', NULL, 'https://microsoft.com/research',  'research',       true,  8)
) AS t(name, logo_url, website_url, partner_type, is_featured, order_index)
WHERE NOT EXISTS (SELECT 1 FROM partners WHERE partners.name = t.name);

-- ─── LANGUAGES (representative sample) ───────────────────────────────────────
INSERT INTO languages (name, native_name, country_id, speakers_count, status)
SELECT t.name, t.native_name, c.id, t.speakers_count, t.status
FROM (VALUES
  ('Yoruba',      'Yorùbá',      'NG', 45000000, 'active'),
  ('Hausa',       'Hausa',       'NG', 70000000, 'active'),
  ('Igbo',        'Igbo',        'NG', 44000000, 'active'),
  ('Amharic',     'አማርኛ',        'ET', 22000000, 'active'),
  ('Oromo',       'Oromoo',      'ET', 37000000, 'active'),
  ('Swahili',     'Kiswahili',   'TZ', 80000000, 'active'),
  ('Zulu',        'isiZulu',     'ZA', 12000000, 'active'),
  ('Xhosa',       'isiXhosa',    'ZA',  8000000, 'active'),
  ('Twi',         'Twi',         'GH',  9000000, 'active'),
  ('Ewe',         'Eʋegbe',      'TG',  4000000, 'active'),
  ('Wolof',       'Wolof',       'SN',  5000000, 'active'),
  ('Fula',        'Fulfulde',    'SN', 24000000, 'active'),
  ('Kinyarwanda', 'Ikinyarwanda','RW', 12000000, 'active'),
  ('Luganda',     'Luganda',     'UG',  5000000, 'active'),
  ('Somali',      'Soomaali',    'SO', 21000000, 'active'),
  ('Malagasy',    'Malagasy',    'MG', 25000000, 'active'),
  ('Chichewa',    'Chichewa',    'MW', 12000000, 'active'),
  ('Shona',       'ChiShona',    'ZW', 15000000, 'active'),
  ('Tigrinya',    'ትግርኛ',        'ER',  7000000, 'active'),
  ('Akan',        'Akan',        'GH', 11000000, 'active')
) AS t(name, native_name, country_code, speakers_count, status)
JOIN countries c ON c.code = t.country_code
WHERE NOT EXISTS (SELECT 1 FROM languages WHERE languages.name = t.name);

-- ─── INSIGHTS ────────────────────────────────────────────────────────────────
INSERT INTO insights (title, excerpt, category, read_time_minutes, published_at, is_featured, order_index)
SELECT title, excerpt, category, read_time_minutes, published_at::timestamptz, is_featured, order_index FROM (VALUES
  (
    'AfriSpeech-200: A Multilingual Speech Corpus for 200 African Languages',
    'We introduce AfriSpeech-200, the largest publicly-available African speech dataset, covering 200 languages across 38 countries with over 12,000 hours of annotated audio. This paper describes our data-collection methodology, speaker demographics, annotation pipeline, and baseline ASR experiments.',
    'research', 12, '2025-11-15 00:00:00+00', true, 1
  ),
  (
    'The 1% Problem: Why African Languages Are Missing from AI',
    'Despite Africa being home to a third of all human languages, fewer than 1% of AI training data represents African languages. This policy brief examines the structural causes of this gap and proposes actionable interventions for funders, governments, and technology companies.',
    'policy', 6, '2025-10-02 00:00:00+00', true, 2
  ),
  (
    'Field Notes: Deploying Voice AI in a Rural Nigerian Clinic',
    'In September 2025, we partnered with a primary-care clinic in Kwara State to deploy our Yoruba-language ASR system. This field report documents the 90-day pilot: what worked, what failed, and what we learned about deploying language AI in environments with no reliable electricity or internet.',
    'field-story', 8, '2025-09-18 00:00:00+00', true, 3
  ),
  (
    'Benchmarking African NLP: Introducing AfriGLUE',
    'Standard NLP benchmarks were designed for English and a handful of European languages. AfriGLUE is our proposed evaluation suite for African languages, covering natural language inference, named entity recognition, sentiment analysis, and machine translation across 47 languages.',
    'research', 10, '2025-08-05 00:00:00+00', false, 4
  ),
  (
    'Language Policy and the African Union AI Strategy: Our Recommendations',
    'The African Union released its Continental AI Strategy in 2024 without a single mention of indigenous language support. This brief documents our submission to the AU Commission and outlines the five policy changes we believe are essential.',
    'policy', 5, '2025-07-22 00:00:00+00', false, 5
  ),
  (
    'Training Data Consent in Practice: Lessons from Three Years of Community Recording',
    'Ethical data collection is not just a checkbox — it is an ongoing relationship with communities. This report shares what we have learned from three years of conducting informed-consent recording sessions in 14 countries, including the protocols we developed and the principles we now consider non-negotiable.',
    'field-story', 7, '2025-06-10 00:00:00+00', false, 6
  )
) AS t(title, excerpt, category, read_time_minutes, published_at, is_featured, order_index)
WHERE NOT EXISTS (SELECT 1 FROM insights WHERE insights.title = t.title);
