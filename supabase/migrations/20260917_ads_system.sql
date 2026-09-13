-- Ads system upgrade: dedicated `ads` table with placements, status, schedule,
-- type (image_link / custom_code) and view/click counters + storage bucket.
-- REVIEW ONLY: applied to Production by the platform owner.
begin;

create table if not exists public.ads (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text,
  target_url text,
  custom_code text,
  placement text not null default 'header' check (placement in ('header','sidebar','in_article','home_page')),
  ad_type text not null default 'image_link' check (ad_type in ('image_link','custom_code')),
  status boolean not null default true,
  start_date timestamptz,
  end_date timestamptz,
  views integer not null default 0,
  clicks integer not null default 0,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists ads_placement_status_idx on public.ads (placement, status);
create index if not exists ads_active_window_idx on public.ads (start_date, end_date);

-- Keep operational/admin data off the public API: server reads with service role.
alter table public.ads enable row level security;
revoke all on table public.ads from anon, authenticated;

-- Public click tracking function (security definer) — increments clicks only.
create or replace function public.track_ad_click(target_ad_id uuid)
returns void
language sql
security definer
set search_path = public, pg_temp
as $$
  update public.ads
  set clicks = clicks + 1
  where id = target_ad_id
    and status = true
    and (start_date is null or start_date <= now())
    and (end_date is null or end_date >= now());
$$;

revoke all on function public.track_ad_click(uuid) from public;
grant execute on function public.track_ad_click(uuid) to anon, authenticated;

commit;
