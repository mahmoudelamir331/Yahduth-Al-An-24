begin;

alter table if exists public.site_settings
  add column if not exists ads jsonb not null default '{}'::jsonb;

commit;
