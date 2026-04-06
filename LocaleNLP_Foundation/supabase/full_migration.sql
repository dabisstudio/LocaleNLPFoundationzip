-- LocaleNLP Foundation: Full Database Migration (Unified)
-- This file consolidates all institutional, community, and operational schemas.

-- 0. Extensions & Setup
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Institutional Framework
--------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS countries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text UNIQUE NOT NULL, -- ISO code
  lat decimal(10, 6) NOT NULL,
  lng decimal(10, 6) NOT NULL,
  region text NOT NULL, -- North, South, East, West, Central Africa
  active_projects integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS languages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  native_name text,
  country_id uuid REFERENCES countries(id) ON DELETE SET NULL,
  speakers_count bigint,
  audio_sample_url text, -- For deployment demos
  transcript text,
  status text NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'stabilized', 'deployed')),
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

CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  bio text,
  image_url text,
  linkedin_url text,
  twitter_url text,
  member_type text NOT NULL DEFAULT 'team' CHECK (member_type IN ('board', 'advisor', 'team', 'fellow')),
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  website_url text,
  partner_type text DEFAULT 'research' CHECK (partner_type IN ('funding', 'research', 'implementation', 'corporate')),
  is_featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- 2. Content & Research
--------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text,
  category text NOT NULL DEFAULT 'research' CHECK (category IN ('research', 'field_note', 'announcement', 'technical')),
  read_time_minutes integer NOT NULL DEFAULT 5,
  published_at timestamptz NOT NULL DEFAULT now(),
  cover_image_url text,
  external_url text,
  is_featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS publications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  authors text,
  abstract text,
  publication_date date DEFAULT current_date,
  publication_type text DEFAULT 'paper' CHECK (publication_type IN ('paper', 'brief', 'report', 'dataset')),
  pdf_url text,
  external_url text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 3. Community Engagement & Forms
--------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  organization text,
  inquiry_type text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  source text DEFAULT 'footer',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contributor_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text NOT NULL CHECK (char_length(trim(phone)) >= 7),
  native_language text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS fellowship_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fellowship_type text NOT NULL,
  applicant_name text NOT NULL,
  email text NOT NULL,
  linkedin_profile text,
  statement_of_purpose text NOT NULL,
  portfolio_url text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'interview', 'accepted', 'rejected')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS media_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization text NOT NULL,
  journalist_name text NOT NULL,
  email text NOT NULL,
  topic text NOT NULL,
  deadline date,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- 4. Impact & Economy
--------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS language_bounties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  language_code text NOT NULL,
  language_name text NOT NULL,
  modality text NOT NULL CHECK (modality IN ('Speech', 'Text-Pair', 'Transcription')),
  target_hours float NOT NULL DEFAULT 50,
  funding_goal_usd float NOT NULL CHECK (funding_goal_usd > 0),
  current_funding_usd float DEFAULT 0,
  bounty_status text DEFAULT 'funding' CHECK (bounty_status IN ('funding', 'active_collection', 'fulfilled')),
  urgency_level text DEFAULT 'standard' CHECK (urgency_level IN ('critical', 'standard')),
  contributors_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS community_impact_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  language_id uuid REFERENCES languages(id) ON DELETE SET NULL,
  reporter_name text,
  story_body text NOT NULL,
  image_url text,
  location_name text,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS supporter_dashboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL, -- Connects to stripe/auth
  total_contributed_usd float DEFAULT 0,
  tier text DEFAULT 'Supporter' CHECK (tier IN ('Supporter', 'Sustainer', 'Pioneer', 'Guardian')),
  last_contribution_date timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- 5. Indexes & Security
--------------------------------------------------------------------------------

-- Indexes (Optimizing common filters)
CREATE INDEX IF NOT EXISTS idx_languages_country ON languages(country_id);
CREATE INDEX IF NOT EXISTS idx_insights_published_at ON insights(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_bounties_status ON language_bounties(bounty_status);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);

-- Row Level Security (RLS)
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributor_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE fellowship_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE language_bounties ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_impact_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE supporter_dashboard ENABLE ROW LEVEL SECURITY;

-- Public Read Policies (Institutional Content)
CREATE POLICY "Public read access for countries" ON countries FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read access for languages" ON languages FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read access for programs" ON programs FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read access for impact_metrics" ON impact_metrics FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read access for team_members" ON team_members FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read access for partners" ON partners FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read access for insights" ON insights FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read access for publications" ON publications FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read access for language_bounties" ON language_bounties FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read access for impact_reports" ON community_impact_reports FOR SELECT TO anon, authenticated USING (true);

-- Insert Only Policies (Forms)
CREATE POLICY "Anyone can submit contact forms" ON contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscriptions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can signup as contributor" ON contributor_signups FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can apply for fellowship" ON fellowship_applications FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can submit media inquiries" ON media_inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Supporter Policies
CREATE POLICY "Supporters can view their own dashboard" ON supporter_dashboard FOR SELECT TO authenticated USING (auth.email() = email);
