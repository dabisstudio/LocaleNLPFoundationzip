ALTER TABLE programs
  ADD COLUMN IF NOT EXISTS country_id uuid REFERENCES countries(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_programs_country ON programs(country_id);
