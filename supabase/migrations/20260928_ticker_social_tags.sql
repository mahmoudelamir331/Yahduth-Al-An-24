-- ============================================================================
-- ميزة الشريط العاجل (Breaking News Ticker) + السوشيال ميديا الإضافية
-- والوسوم (tags) للأخبار
-- ============================================================================

-- 1) الشريط العاجل في إعدادات الموقع
alter table public.site_settings
  add column if not exists ticker_enabled boolean not null default false,
  add column if not exists ticker_text text,
  add column if not exists ticker_link text;

-- 2) السوشيال ميديا الإضافية
alter table public.site_settings
  add column if not exists social_instagram text,
  add column if not exists social_telegram text,
  add column if not exists social_whatsapp text;

-- 3) الوسوم (tags) للأخبار — جدول وسيط many-to-many
create table if not exists public.article_tags (
  article_id text not null references public.articles(id) on delete cascade,
  tag text not null,
  created_at timestamptz not null default now(),
  primary key (article_id, tag)
);
create index if not exists article_tags_tag_idx on public.article_tags (tag);
create index if not exists article_tags_article_id_idx on public.article_tags (article_id);

alter table public.article_tags enable row level security;

drop policy if exists "Public can read article tags" on public.article_tags;
create policy "Public can read article tags" on public.article_tags
  for select to anon, authenticated using (true);

-- 4) تحديث الـ public view ليعرض السوشيال + الشريط العاجل
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
  logo_url,
  social_facebook,
  social_twitter,
  social_youtube,
  social_instagram,
  social_telegram,
  social_whatsapp,
  ticker_enabled,
  ticker_text,
  ticker_link
from public.site_settings
where id = true;

revoke all on table public.public_site_settings from public;
grant select on table public.public_site_settings to anon, authenticated;
