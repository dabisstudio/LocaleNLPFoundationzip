# LocaleNLP Foundation — Supabase Database

## Migration order

Apply migrations in filename order:

1. `migrations/20251219204729_create_localenlp_schema.sql`  
   Core schema: `countries`, `languages`, `programs`, `impact_metrics`,
   `case_studies`, `team_members`, `partners`, `publications`,
   `contact_submissions`. RLS enabled with public SELECT policies on all
   content tables; INSERT-only policy on `contact_submissions`.

2. `migrations/20260331000000_add_insights_table.sql`  
   Adds `insights` table with `title`, `excerpt`, `category`,
   `read_time_minutes`, `published_at`, `cover_image_url`, `external_url`,
   `is_featured`, `order_index`. Indexes on `published_at DESC` and
   `category`. RLS + public SELECT policy.

3. `migrations/20260331000001_add_programs_country_fk.sql`  
   Adds `programs.country_id uuid REFERENCES countries(id)` FK column and
   index.

## Seed data

After all migrations have been applied, run `seed.sql` to populate:

| Table           | Rows |
|-----------------|------|
| countries       | 47   |
| programs        | 4    |
| impact_metrics  | 4    |
| team_members    | 6    |
| partners        | 8    |
| languages       | 20   |
| insights        | 6    |

The seed file is idempotent — `WHERE NOT EXISTS` guards prevent duplicate
inserts if run more than once.

## full_migration.sql

`full_migration.sql` is a convenience file combining all three migrations
and the seed into a single SQL file. It is useful for applying the entire
schema from scratch in the Supabase SQL Editor. **It is not part of the
standard migration flow** — the canonical source of truth is the individual
files in `migrations/`.
