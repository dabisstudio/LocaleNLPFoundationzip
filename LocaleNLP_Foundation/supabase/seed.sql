-- LocaleNLP Foundation — Seed Data
-- Idempotent: safe to run multiple times via ON CONFLICT / WHERE NOT EXISTS.

-- ─── COUNTRIES (47 — one per African country node in the AfricaMap) ──────────
INSERT INTO countries (name, code, lat, lng, region, active_projects)
SELECT name, code, lat, lng, region, active_projects FROM (VALUES
  ('Nigeria',                  'NG',  9.082,   8.675, 'West',    4),
  ('Ethiopia',                 'ET',  9.145,  40.490, 'East',    3),
  ('Egypt',                    'EG', 26.820,  30.802, 'North',   1),
  ('Algeria',                  'DZ', 28.034,   1.659, 'North',   1),
  ('South Africa',             'ZA',-30.560,  22.938, 'South',   3),
  ('Tanzania',                 'TZ', -6.369,  34.889, 'East',    2),
  ('Kenya',                    'KE', -0.023,  37.906, 'East',    3),
  ('Morocco',                  'MA', 31.792,  -7.093, 'North',   1),
  ('Angola',                   'AO',-11.203,  17.874, 'Central', 1),
  ('Ghana',                    'GH',  7.947,  -1.024, 'West',    3),
  ('Cameroon',                 'CM',  3.848,  11.502, 'Central', 2),
  ('Ivory Coast',              'CI',  7.540,  -5.547, 'West',    2),
  ('Niger',                    'NE', 17.608,   8.082, 'West',    1),
  ('Mali',                     'ML', 17.571,  -3.996, 'West',    1),
  ('Burkina Faso',             'BF', 12.364,  -1.262, 'West',    1),
  ('Mozambique',               'MZ',-18.666,  35.530, 'East',    1),
  ('Madagascar',               'MG',-18.767,  46.870, 'East',    1),
  ('Uganda',                   'UG',  1.374,  32.290, 'East',    2),
  ('Senegal',                  'SN', 14.497, -14.452, 'West',    2),
  ('Rwanda',                   'RW', -1.940,  29.874, 'East',    2),
  ('Guinea',                   'GN', 11.104, -10.947, 'West',    1),
  ('Burundi',                  'BI', -3.373,  29.919, 'East',    1),
  ('Somalia',                  'SO',  5.152,  46.199, 'East',    1),
  ('Chad',                     'TD', 15.454,  18.732, 'Central', 1),
  ('Zambia',                   'ZM',-13.134,  27.849, 'East',    1),
  ('Zimbabwe',                 'ZW',-19.015,  29.155, 'South',   1),
  ('Sudan',                    'SD', 12.862,  30.218, 'North',   1),
  ('Togo',                     'TG',  8.620,   0.825, 'West',    0),
  ('Sierra Leone',             'SL',  8.461, -11.779, 'West',    0),
  ('Liberia',                  'LR',  6.428,  -9.430, 'West',    0),
  ('Central African Republic', 'CF',  6.611,  20.939, 'Central', 0),
  ('Congo Republic',           'CG', -0.228,  15.827, 'Central', 0),
  ('DR Congo',                 'CD', -4.038,  21.759, 'Central', 2),
  ('Malawi',                   'MW',-13.254,  34.302, 'East',    1),
  ('Namibia',                  'NA',-22.958,  18.491, 'South',   1),
  ('Botswana',                 'BW',-22.329,  24.684, 'South',   1),
  ('Mauritania',               'MR', 21.007, -10.940, 'West',    0),
  ('Gambia',                   'GM', 13.443, -15.311, 'West',    0),
  ('Guinea-Bissau',            'GW', 11.804, -15.180, 'West',    0),
  ('Benin',                    'BJ',  9.307,   2.315, 'West',    0),
  ('Eritrea',                  'ER', 15.180,  39.782, 'East',    0),
  ('Djibouti',                 'DJ', 11.825,  42.590, 'East',    0),
  ('Western Sahara',           'EH', 24.215, -12.886, 'North',   0),
  ('Cape Verde',               'CV', 16.538, -23.041, 'West',    0),
  ('Comoros',                  'KM',-11.875,  43.872, 'East',    0),
  ('South Sudan',              'SS',  6.877,  31.307, 'East',    1),
  ('Lesotho',                  'LS',-29.610,  28.233, 'South',   0)
) AS t(name, code, lat, lng, region, active_projects)
WHERE NOT EXISTS (SELECT 1 FROM countries WHERE countries.code = t.code);

-- ─── PROGRAMS (4 — the four core featured programmes) ────────────────────────
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
    'Existing NLP benchmarks and pre-trained models are calibrated for European and East Asian languages. African languages perform 30–60 percentage points below baseline on standard benchmarks.',
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
  )
) AS t(title, slug, short_description, full_description, icon, color, problem_statement, solution, is_featured, order_index)
WHERE NOT EXISTS (SELECT 1 FROM programs WHERE programs.slug = t.slug);

-- ─── IMPACT METRICS (4 — matching hardcoded UI values) ───────────────────────
INSERT INTO impact_metrics (label, value, unit, icon, order_index)
SELECT label, value, unit, icon, order_index FROM (VALUES
  ('African Languages',    '2,000+', 'languages',          'Globe',         1),
  ('Speakers Underserved', '500M+',  'people',             'Users',         2),
  ('Languages Supported',  '47',     'languages',          'CheckCircle',   3),
  ('of AI Training Data',  '<1%',    '% African content',  'AlertTriangle', 4)
) AS t(label, value, unit, icon, order_index)
WHERE NOT EXISTS (SELECT 1 FROM impact_metrics WHERE impact_metrics.label = t.label);

-- ─── TEAM MEMBERS (6) ────────────────────────────────────────────────────────
INSERT INTO team_members (name, role, bio, image_url, linkedin_url, twitter_url, member_type, order_index)
SELECT name, role, bio, image_url, linkedin_url, twitter_url, member_type, order_index FROM (VALUES
  ('Alieu Jagne', 'Founder & Executive Director',
   'Venture architect and entrepreneur dedicated to building digital and physical infrastructure across the African continent. Leads the strategic vision for language equity.',
   NULL, 'https://linkedin.com/in/alieu-jagne', 'https://twitter.com/alieujagne', 'team', 1),
  ('Prince Tagoe', 'General Secretary',
   'Oversees the Foundation''s legal, compliance, and governance architecture, ensuring all operations align with the Sovereign Data Pact and multi-jurisdictional regulations.',
   NULL, 'https://linkedin.com/in/prince-tagoe', NULL, 'team', 2),
  ('Khadijato Jallow', 'Treasurer',
   'Directs the financial oversight and treasury of the Foundation, managing the capital distribution for community bounties and ensuring strict financial segregation and transparency.',
   NULL, 'https://linkedin.com/in/khadijato-jallow', NULL, 'team', 3),
  ('Bubacarr Barry', 'Founding Member / Technical Lead',
   'Coordinates research, development, and infrastructure initiatives, including the OpenSpeech Initiative and the Lughatna platform architectures.',
   NULL, 'https://linkedin.com/in/bubacarr-barry', NULL, 'team', 4),
  ('Papa Elhadji Keba Cire Toure', 'Founding Member / Program Lead',
   'Cultivates strategic partnerships with governments, NGOs, and tech allies while overseeing the execution of LocaleNLP''s core capacity-building programs.',
   NULL, 'https://linkedin.com/in/papa-toure', NULL, 'team', 5),
  ('Mouhamed Bailo Ba', 'Founding Member / Communications Lead',
   'The principal liaison for public relations, managing community engagement and amplifying the Foundation''s mission across the global digital landscape.',
   NULL, 'https://linkedin.com/in/mouhamed-ba', NULL, 'team', 6)
) AS t(name, role, bio, image_url, linkedin_url, twitter_url, member_type, order_index)
WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE team_members.name = t.name);

-- ─── PARTNERS (8) ────────────────────────────────────────────────────────────
INSERT INTO partners (name, logo_url, website_url, partner_type, is_featured, order_index)
SELECT name, logo_url, website_url, partner_type, is_featured, order_index FROM (VALUES
  ('Google AI',          'https://logo.clearbit.com/ai.google',               'https://ai.google',               'funding',        true, 1),
  ('Mozilla Foundation', 'https://logo.clearbit.com/foundation.mozilla.org',  'https://foundation.mozilla.org',  'funding',        true, 2),
  ('Masakhane NLP',      'https://logo.clearbit.com/masakhane.io',            'https://www.masakhane.io',        'research',       true, 3),
  ('AI4D Africa',        'https://logo.clearbit.com/ai4d.ai',                 'https://ai4d.ai',                 'research',       true, 4),
  ('African Union',      'https://logo.clearbit.com/au.int',                  'https://au.int',                  'governance',     true, 5),
  ('Lacuna Fund',        'https://logo.clearbit.com/lacunafund.org',          'https://lacunafund.org',          'funding',        true, 6),
  ('DataKind',           'https://logo.clearbit.com/datakind.org',            'https://datakind.org',            'implementation', true, 7),
  ('Microsoft Research', 'https://logo.clearbit.com/microsoft.com',           'https://microsoft.com/research',  'research',       true, 8)
) AS t(name, logo_url, website_url, partner_type, is_featured, order_index)
WHERE NOT EXISTS (SELECT 1 FROM partners WHERE partners.name = t.name);

-- ─── LANGUAGES (20 — representative sample across the continent) ──────────────
INSERT INTO languages (name, native_name, country_id, speakers_count, status)
SELECT t.name, t.native_name, c.id, t.speakers_count, t.status
FROM (VALUES
  ('Yoruba',      'Yorùbá',       'NG', 45000000, 'active'),
  ('Hausa',       'Hausa',        'NG', 70000000, 'active'),
  ('Igbo',        'Igbo',         'NG', 44000000, 'active'),
  ('Amharic',     'አማርኛ',         'ET', 22000000, 'active'),
  ('Oromo',       'Oromoo',       'ET', 37000000, 'active'),
  ('Swahili',     'Kiswahili',    'TZ', 80000000, 'active'),
  ('Zulu',        'isiZulu',      'ZA', 12000000, 'active'),
  ('Xhosa',       'isiXhosa',     'ZA',  8000000, 'active'),
  ('Twi',         'Twi',          'GH',  9000000, 'active'),
  ('Ewe',         'Eʋegbe',       'TG',  4000000, 'active'),
  ('Wolof',       'Wolof',        'SN',  5000000, 'active'),
  ('Fula',        'Fulfulde',     'SN', 24000000, 'active'),
  ('Kinyarwanda', 'Ikinyarwanda', 'RW', 12000000, 'active'),
  ('Luganda',     'Luganda',      'UG',  5000000, 'active'),
  ('Somali',      'Soomaali',     'SO', 21000000, 'active'),
  ('Malagasy',    'Malagasy',     'MG', 25000000, 'active'),
  ('Chichewa',    'Chichewa',     'MW', 12000000, 'active'),
  ('Shona',       'ChiShona',     'ZW', 15000000, 'active'),
  ('Tigrinya',    'ትግርኛ',         'ER',  7000000, 'active'),
  ('Akan',        'Akan',         'GH', 11000000, 'active')
) AS t(name, native_name, country_code, speakers_count, status)
JOIN countries c ON c.code = t.country_code
WHERE NOT EXISTS (SELECT 1 FROM languages WHERE languages.name = t.name);

-- ─── INSIGHTS (6 — articles/field stories) ────────────────────────────────────
INSERT INTO insights (title, excerpt, category, read_time_minutes, published_at, is_featured, order_index)
SELECT title, excerpt, category, read_time_minutes, published_at::timestamptz, is_featured, order_index FROM (VALUES
  (
    'AfriSpeech-200: A Multilingual Speech Corpus for 200 African Languages',
    'We introduce AfriSpeech-200, the largest publicly-available African speech dataset, covering 200 languages across 38 countries with over 12,000 hours of annotated audio.',
    'research', 12, '2025-11-15 00:00:00+00', true, 1
  ),
  (
    'The 1% Problem: Why African Languages Are Missing from AI',
    'Despite Africa being home to a third of all human languages, fewer than 1% of AI training data represents African languages. This policy brief examines the structural causes and proposes actionable interventions.',
    'policy', 6, '2025-10-02 00:00:00+00', true, 2
  ),
  (
    'Field Notes: Deploying Voice AI in a Rural Nigerian Clinic',
    'In September 2025, we partnered with a primary-care clinic in Kwara State to deploy our Yoruba-language ASR system. This field report documents the 90-day pilot.',
    'field-story', 8, '2025-09-18 00:00:00+00', true, 3
  ),
  (
    'Benchmarking African NLP: Introducing AfriGLUE',
    'Standard NLP benchmarks were designed for English and European languages. AfriGLUE is our proposed evaluation suite covering 47 African languages across four NLP tasks.',
    'research', 10, '2025-08-05 00:00:00+00', false, 4
  ),
  (
    'Language Policy and the African Union AI Strategy: Our Recommendations',
    'The African Union released its Continental AI Strategy without a single mention of indigenous language support. This brief documents our five key policy recommendations.',
    'policy', 5, '2025-07-22 00:00:00+00', false, 5
  ),
  (
    'Training Data Consent in Practice: Lessons from Three Years of Community Recording',
    'Ethical data collection is an ongoing relationship with communities. This report shares protocols developed across 14 countries and the principles we consider non-negotiable.',
    'field-story', 7, '2025-06-10 00:00:00+00', false, 6
  )
) AS t(title, excerpt, category, read_time_minutes, published_at, is_featured, order_index)
WHERE NOT EXISTS (SELECT 1 FROM insights WHERE insights.title = t.title);

-- ─── LANGUAGE BOUNTIES (Sample dataset for BountyBoard) ──────────────────────
INSERT INTO language_bounties (title, language_code, language_name, modality, target_hours, funding_goal_usd, current_funding_usd, bounty_status, urgency_level, contributors_count)
SELECT title, language_code, language_name, modality, target_hours, funding_goal_usd, current_funding_usd, bounty_status, urgency_level, contributors_count FROM (VALUES
  ('Medical Terminology in Wolof',        'wo', 'Wolof',    'Speech',        50,  12000, 3200,  'funding',           'critical',  12),
  ('Agricultural Advisory — Bambara',     'bm', 'Bambara',  'Speech',        80,  18000, 18000, 'fulfilled',         'standard',  47),
  ('Legal Corpus — Hausa',                'ha', 'Hausa',    'Text-Pair',     120, 24000, 9600,  'active_collection', 'critical',  31),
  ('Conversational NLP Dataset — Amharic','am', 'Amharic',  'Text-Pair',     150, 32000, 11000, 'active_collection', 'critical',  24)
) AS t(title, language_code, language_name, modality, target_hours, funding_goal_usd, current_funding_usd, bounty_status, urgency_level, contributors_count)
WHERE NOT EXISTS (SELECT 1 FROM language_bounties WHERE language_bounties.title = t.title);

-- ─── PUBLICATIONS (Sample research assets) ──────────────────────────────────
INSERT INTO publications (title, authors, abstract, publication_type, is_featured)
SELECT title, authors, abstract, publication_type, is_featured FROM (VALUES
  ('NLLB-200: Scaling Machine Translation', 'Meta AI, et al.', 'A breakthrough in multilingual translation covering 200 languages.', 'paper', true),
  ('Masakhane: Machine Translation for Africa', 'Masakhane Community', 'A participatory approach to low-resource NLP.', 'paper', true),
  ('State of African Languages 2025', 'LocaleNLP Research', 'Annual report on digitization progress across the continent.', 'report', true)
) AS t(title, authors, abstract, publication_type, is_featured)
WHERE NOT EXISTS (SELECT 1 FROM publications WHERE publications.title = t.title);

-- ─── CASE STUDIES ────────────────────────────────────────────────────────────
INSERT INTO case_studies (title, slug, summary, content, country_id, program_id, is_featured)
SELECT t.title, t.slug, t.summary, t.content, c.id, p.id, t.is_featured
FROM (VALUES
  ('Digitizing Hausa Legal Text', 'hausa-legal', 'Building a legal corpus for Northern Nigeria.', 'Extensive work on legal terminology...', 'NG', 'openspeech-initiative', true),
  ('Yoruba Healthcare ASR', 'yoruba-healthcare', 'Deploying ASR in primary care clinics.', 'Voice interface for patient records...', 'NG', 'lughatna-platform', true)
) AS t(title, slug, summary, content, country_code, program_slug, is_featured)
JOIN countries c ON c.code = t.country_code
JOIN programs p ON p.slug = t.program_slug
WHERE NOT EXISTS (SELECT 1 FROM case_studies WHERE case_studies.slug = t.slug);
