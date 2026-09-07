-- RLS hardening for public content tables.
-- REVIEW ONLY: do not execute against Production without explicit approval.
-- Server-side writes must use the Supabase service role.

begin;

alter table if exists public.articles enable row level security;
alter table if exists public.categories enable row level security;
alter table if exists public.site_settings enable row level security;

-- Re-running this migration should replace only these policies.
drop policy if exists "Public can read published articles" on public.articles;
drop policy if exists "Public can read active categories" on public.categories;
drop policy if exists "Public can read site settings" on public.site_settings;

-- Public visitors may read published news only.
create policy "Public can read published articles"
  on public.articles
  for select
  to anon, authenticated
  using (
    status = 'published'
    and (published_at is null or published_at <= now())
  );

-- Public visitors may read active categories only.
create policy "Public can read active categories"
  on public.categories
  for select
  to anon, authenticated
  using (is_active = true);

-- The public site needs these settings for maintenance mode and protection.
create policy "Public can read site settings"
  on public.site_settings
  for select
  to anon, authenticated
  using (true);

-- No INSERT, UPDATE, or DELETE policies are intentionally defined for
-- articles, categories, or site_settings. With RLS enabled, those writes
-- are denied for anon/authenticated clients by default.
-- The service_role key bypasses RLS and is used only by protected server APIs.

commit;
