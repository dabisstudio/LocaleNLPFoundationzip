create table if not exists contributor_signups (
  id              uuid primary key default gen_random_uuid(),
  phone           text not null,
  native_language text not null,
  created_at      timestamptz not null default now()
);

alter table contributor_signups enable row level security;

create policy "Anyone can insert contributor signups"
  on contributor_signups
  for insert
  to anon
  with check (true);
