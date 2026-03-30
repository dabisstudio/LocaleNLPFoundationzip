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
