create table if not exists language_bounties (
  id                  uuid primary key default gen_random_uuid(),
  title               text not null,
  language_code       text not null,
  language_name       text not null,
  modality            text not null check (modality in ('Speech', 'Text-Pair', 'Transcription')),
  target_hours        float not null,
  funding_goal_usd    float not null check (funding_goal_usd > 0),
  current_funding_usd float not null default 0 check (current_funding_usd >= 0),
  bounty_status       text not null default 'funding' check (bounty_status in ('funding', 'active_collection', 'fulfilled')),
  urgency_level       text not null default 'standard' check (urgency_level in ('critical', 'standard')),
  contributors_engaged int not null default 0,
  created_at          timestamptz not null default now()
);

alter table language_bounties enable row level security;

create policy "Public read language_bounties"
  on language_bounties for select to anon using (true);

insert into language_bounties
  (title, language_code, language_name, modality, target_hours, funding_goal_usd, current_funding_usd, bounty_status, urgency_level, contributors_engaged)
values
  ('Medical Terminology in Wolof',        'wo', 'Wolof',    'Speech',        50,  12000, 3200,  'funding',           'critical',  12),
  ('Agricultural Advisory — Bambara',     'bm', 'Bambara',  'Speech',        80,  18000, 18000, 'fulfilled',         'standard',  47),
  ('Legal Corpus — Hausa',                'ha', 'Hausa',    'Text-Pair',     120, 24000, 9600,  'active_collection', 'critical',  31),
  ('Maternal Health IVR — Darija',        'ar', 'Darija',   'Transcription', 40,  9000,  1800,  'funding',           'critical',   5),
  ('Literacy Prompts — Pulaar',           'ff', 'Pulaar',   'Text-Pair',     60,  14000, 7200,  'active_collection', 'standard',  18),
  ('News Broadcast Corpus — Tigrinya',    'ti', 'Tigrinya', 'Speech',        200, 38000, 4000,  'funding',           'standard',   8),
  ('Oral History Archive — Somali',       'so', 'Somali',   'Transcription', 300, 55000, 55000, 'fulfilled',         'standard',  92),
  ('Conversational NLP Dataset — Amharic','am', 'Amharic',  'Text-Pair',     150, 32000, 11000, 'active_collection', 'critical',  24);
