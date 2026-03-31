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
