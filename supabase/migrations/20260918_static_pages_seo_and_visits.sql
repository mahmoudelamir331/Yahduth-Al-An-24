-- Static pages: SEO fields, visibility toggle, and free-form page creation.
-- Site visits tracking table for the real-time newsroom dashboard.
-- REVIEW ONLY: applied to Production by the platform owner.
begin;

-- 1) site_pages upgrades -----------------------------------------------------
alter table public.site_pages
  add column if not exists seo_title text,
  add column if not exists seo_description text,
  add column if not exists is_visible boolean not null default true,
  add column if not exists is_system boolean not null default false;

-- The four original pages are system pages: they cannot be deleted.
update public.site_pages set is_system = true where slug in ('about', 'contact', 'privacy', 'terms');

create index if not exists site_pages_visible_idx on public.site_pages (is_visible) where is_visible;

-- Public reads only visible pages; admin uses the service role.
revoke all on table public.site_pages from anon, authenticated;

-- 2) Site visit tracking (one row per visitor hash per day) -------------------
create table if not exists public.site_visits (
  visitor_hash text primary key check (char_length(visitor_hash) = 64),
  visited_on date not null default current_date,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);
alter table public.site_visits enable row level security;
revoke all on table public.site_visits from anon, authenticated;

create or replace function public.record_site_visit(target_visitor_hash text)
returns void
language sql
security definer
set search_path = public, pg_temp
as $$
  insert into public.site_visits (visitor_hash, visited_on)
  values (target_visitor_hash, current_date)
  on conflict (visitor_hash) do update
    set last_seen_at = now(), visited_on = current_date;
$$;

revoke all on function public.record_site_visit(text) from public;
grant execute on function public.record_site_visit(text) to service_role;

commit;
