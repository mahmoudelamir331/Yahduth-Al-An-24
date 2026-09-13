-- Keep operational/admin settings off the public API. The website reads only
-- this deliberately limited view; the base table remains server-only.
begin;

alter table public.site_settings enable row level security;
drop policy if exists "Public can read site settings" on public.site_settings;
revoke all on table public.site_settings from anon, authenticated;

create or replace view public.public_site_settings
with (security_barrier = true, security_invoker = false)
as
select
  id,
  maintenance_enabled,
  maintenance_message,
  maintenance_ends_at,
  live_streams,
  content_protection_enabled,
  anti_adblock_enabled,
  ads,
  logo_url
from public.site_settings
where id = true;

revoke all on table public.public_site_settings from public;
grant select on table public.public_site_settings to anon, authenticated;

commit;
