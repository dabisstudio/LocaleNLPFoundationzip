import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Country = {
  id: string;
  name: string;
  code: string;
  lat: number;
  lng: number;
  region: string;
  active_projects: number;
  created_at: string;
};

export type Language = {
  id: string;
  name: string;
  native_name: string | null;
  country_id: string | null;
  speakers_count: number | null;
  audio_sample_url: string | null;
  transcript: string | null;
  status: string;
  created_at: string;
  countries?: Country;
};

export type Program = {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  full_description: string | null;
  icon: string | null;
  color: string;
  problem_statement: string | null;
  solution: string | null;
  is_featured: boolean;
  order_index: number;
  country_id: string | null;
  created_at: string;
  countries?: Country;
};

export type ImpactMetric = {
  id: string;
  label: string;
  value: string;
  unit: string | null;
  icon: string | null;
  order_index: number;
  created_at: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  content: string | null;
  image_url: string | null;
  country_id: string | null;
  program_id: string | null;
  is_featured: boolean;
  created_at: string;
  countries?: Country;
  programs?: Program;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  image_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  member_type: string;
  order_index: number;
  created_at: string;
};

export type Partner = {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  partner_type: string;
  is_featured: boolean;
  order_index: number;
  created_at: string;
};

export type Publication = {
  id: string;
  title: string;
  authors: string | null;
  abstract: string | null;
  publication_date: string | null;
  publication_type: string;
  pdf_url: string | null;
  external_url: string | null;
  is_featured: boolean;
  created_at: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  organization: string | null;
  inquiry_type: string;
  message: string;
  created_at: string;
};

export type Insight = {
  id: string;
  title: string;
  excerpt: string | null;
  category: string;
  read_time_minutes: number;
  published_at: string;
  cover_image_url: string | null;
  external_url: string | null;
  is_featured: boolean;
  order_index: number;
  created_at: string;
};
