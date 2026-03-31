create table if not exists contributor_signups (
  id              uuid primary key default gen_random_uuid(),
  phone           text not null check (char_length(trim(phone)) >= 7),
  native_language text not null check (char_length(trim(native_language)) >= 2),
  created_at      timestamptz not null default now()
);

alter table contributor_signups enable row level security;

create policy "Anyone can insert contributor signups"
  on contributor_signups
  for insert
  to anon
  with check (
    char_length(trim(phone)) >= 7
    and char_length(trim(native_language)) >= 2
  );
