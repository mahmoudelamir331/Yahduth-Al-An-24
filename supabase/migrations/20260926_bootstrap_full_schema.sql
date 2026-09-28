-- >>>PART 2<<<
-- ============================================================================
-- Bootstrap كامل للهيكل (Schema + RLS + Functions + Storage Buckets)
-- مشروع جديد فاضي: ejpynotorhqnuazfrola
-- لا يرفع أي بيانات محتوى، فقط الصفوف النظامية (الإعدادات والصفحات الأساسية).
-- ============================================================================
begin;

-- ---------------------------------------------------------------------------
-- 1) المتاحف الدالة للصلاحيات
-- ---------------------------------------------------------------------------
create table if not exists public.user_permissions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'editor' check (role in ('super_admin', 'editor', 'reviewer')),
  permissions jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_super_admin()
returns boolean language sql stable security definer
set search_path = public, pg_temp
as $$ select exists (select 1 from public.user_permissions where user_id = auth.uid() and role = 'super_admin'); $$;

create or replace function public.has_permission(required_key text)
returns boolean language sql stable security definer
set search_path = public, pg_temp
as $$
  select public.is_super_admin() or exists (
    select 1 from public.user_permissions up
    where up.user_id = auth.uid()
      and (
        coalesce(up.permissions ->> required_key, 'false') = 'true'
        or (required_key = 'article.create' and (up.permissions ?| array['content','manage_content','news.create']))
        or (required_key = 'article.edit'   and (up.permissions ?| array['content','manage_content','news.edit']))
        or (required_key = 'article.delete' and (up.permissions ?| array['content','manage_content','news.delete']))
        or (required_key = 'article.view'   and (up.permissions ?| array['content','manage_content','dashboard']))
        or (required_key = 'categories.manage' and (up.permissions ?| array['content','manage_content','news.publish']))
        or (required_key = 'dashboard'      and (up.permissions ?| array['content','manage_content']))
        or (required_key = 'settings.manage' and (up.permissions ?| array['content','manage_content','manage_content']))
      )
  );
$$;

revoke all on function public.is_super_admin() from public;
revoke all on function public.has_permission(text) from public;
grant execute on function public.is_super_admin() to authenticated;
grant execute on function public.has_permission(text) to authenticated;

-- ---------------------------------------------------------------------------
-- 2) الملفات الشخصية
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  bio text,
  facebook text,
  x_twitter text,
  whatsapp text,
  hide_identity boolean not null default false,
  ui_theme text not null default 'system' check (ui_theme in ('light', 'dark', 'system')),
  notify_password_requests boolean not null default true,
  notify_article_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 3) الأقسام
-- ---------------------------------------------------------------------------
create table if not exists public.categories (
  id text primary key default gen_random_uuid()::text,
  name text not null,
  slug text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'categories_slug_unique' and conrelid = 'public.categories'::regclass
  ) then
    alter table public.categories add constraint categories_slug_unique unique (slug);
  end if;
end $$;

create index if not exists categories_active_name_idx on public.categories (is_active, name);

-- ---------------------------------------------------------------------------
-- 4) الأخبار
-- ---------------------------------------------------------------------------
create table if not exists public.articles (
  id text primary key default gen_random_uuid()::text,
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  content text[] not null default '{}'::text[],
  cover_image_url text,
  category_id text references public.categories(id) on delete set null,
  author_name text not null default 'فريق التحرير',
  is_urgent boolean not null default false,
  is_headline boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'review', 'published')),
  views_count integer not null default 0,
  read_minutes integer not null default 1,
  published_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists articles_status_published_at_idx on public.articles (status, published_at desc);
create index if not exists articles_category_id_idx on public.articles (category_id);

-- ---------------------------------------------------------------------------
-- 5) إعدادات الموقع
-- ---------------------------------------------------------------------------
create table if not exists public.site_settings (
  id boolean primary key default true,
  founder_name text,
  founder_description text,
  founder_image_url text,
  founder_contact_url text,
  contact_phone text,
  contact_address text,
  contact_whatsapp text,
  social_facebook text,
  social_twitter text,
  social_youtube text,
  maintenance_enabled boolean not null default false,
  maintenance_message text,
  maintenance_ends_at timestamptz,
  content_protection_enabled boolean not null default false,
  anti_adblock_enabled boolean not null default false,
  live_streams jsonb not null default '[]'::jsonb,
  ads jsonb not null default '{}'::jsonb,
  logo_url text,
  favicon_url text,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now(),
  constraint site_settings_single_row check (id)
);

insert into public.site_settings (id) values (true) on conflict (id) do nothing;

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

-- >>>PART 3<<<
-- ---------------------------------------------------------------------------
-- 6) الصفحات الثابتة (CMS)
-- ---------------------------------------------------------------------------
create table if not exists public.site_pages (
  id bigint generated always as identity primary key,
  slug text not null unique,
  title text not null,
  content text not null default '',
  seo_title text,
  seo_description text,
  is_visible boolean not null default true,
  is_system boolean not null default false,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists site_pages_visible_idx on public.site_pages (is_visible) where is_visible;

insert into public.site_pages (slug, title, content, is_system)
values
  ('about', 'من نحن', '', true),
  ('contact', 'تواصل معنا', '', true),
  ('privacy', 'سياسة الخصوصية', '', true),
  ('terms', 'الشروط والأحكام', '', true)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- 7) الإعلانات
-- ---------------------------------------------------------------------------
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

create or replace function public.track_ad_click(target_ad_id uuid)
returns void language sql security definer
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

-- ---------------------------------------------------------------------------
-- 8) طلبات استعادة كلمة المرور
-- ---------------------------------------------------------------------------
create table if not exists public.password_reset_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  email text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  rejection_reason text,
  decided_at timestamptz,
  decided_by uuid references auth.users(id) on delete set null,
  reset_email_sent_at timestamptz,
  reset_email_sent_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists password_reset_requests_email_idx on public.password_reset_requests (email);
create index if not exists password_reset_requests_user_id_idx on public.password_reset_requests (user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- 9) سجل التدقيق
-- ---------------------------------------------------------------------------
create table if not exists public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  target_type text,
  target_id text,
  request_method text not null,
  ip_hash text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_logs_actor_created_at_idx on public.audit_logs (actor_id, created_at desc);
create index if not exists audit_logs_action_created_at_idx on public.audit_logs (action, created_at desc);

-- ---------------------------------------------------------------------------
-- 10) عدادات المشاهدات والزيارات
-- ---------------------------------------------------------------------------
create table if not exists public.article_view_events (
  article_id text not null,
  viewer_hash text not null check (char_length(viewer_hash) = 64),
  viewed_on date not null default current_date,
  created_at timestamptz not null default now(),
  primary key (article_id, viewer_hash, viewed_on)
);

create or replace function public.record_article_view(
  target_article_id text,
  target_viewer_hash text,
  target_viewed_on date default current_date
)
returns boolean language plpgsql security definer
set search_path = public, pg_temp
as $$
declare
  inserted_count integer := 0;
begin
  insert into public.article_view_events (article_id, viewer_hash, viewed_on)
  values (target_article_id, target_viewer_hash, target_viewed_on)
  on conflict do nothing;
  get diagnostics inserted_count = row_count;
  if inserted_count = 0 then
    return false;
  end if;
  update public.articles
  set views_count = coalesce(views_count, 0) + 1
  where id::text = target_article_id
    and status = 'published'
    and (published_at is null or published_at <= now());
  if not found then
    delete from public.article_view_events
    where article_id = target_article_id
      and viewer_hash = target_viewer_hash
      and viewed_on = target_viewed_on;
    return false;
  end if;
  return true;
end;
$$;

revoke all on function public.record_article_view(text, text, date) from public;
grant execute on function public.record_article_view(text, text, date) to service_role;

create table if not exists public.site_visits (
  visitor_hash text primary key check (char_length(visitor_hash) = 64),
  visited_on date not null default current_date,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

create or replace function public.record_site_visit(target_visitor_hash text)
returns void language sql security definer
set search_path = public, pg_temp
as $$
  insert into public.site_visits (visitor_hash, visited_on)
  values (target_visitor_hash, current_date)
  on conflict (visitor_hash) do update
    set last_seen_at = now(), visited_on = current_date;
$$;

revoke all on function public.record_site_visit(text) from public;
grant execute on function public.record_site_visit(text) to service_role;

-- >>>PART 4<<<
-- ---------------------------------------------------------------------------
-- 11) صلاحيات الوصول على الجداول
-- ---------------------------------------------------------------------------
alter table public.user_permissions enable row level security;
alter table public.profiles enable row level security;
alter table public.articles enable row level security;
alter table public.categories enable row level security;
alter table public.site_settings enable row level security;
alter table public.site_pages enable row level security;
alter table public.ads enable row level security;
alter table public.password_reset_requests enable row level security;
alter table public.audit_logs enable row level security;
alter table public.article_view_events enable row level security;
alter table public.site_visits enable row level security;

-- user_permissions
drop policy if exists "Users read own permissions" on public.user_permissions;
drop policy if exists "Super admins manage permissions" on public.user_permissions;
create policy "Users read own permissions" on public.user_permissions
  for select to authenticated using (auth.uid() = user_id or public.is_super_admin());
create policy "Super admins manage permissions" on public.user_permissions
  for all to authenticated using (public.is_super_admin()) with check (public.is_super_admin());

-- profiles
drop policy if exists "Users read own profile" on public.profiles;
drop policy if exists "Users update own profile" on public.profiles;
drop policy if exists "Users insert own profile" on public.profiles;
drop policy if exists "Super admins manage profiles" on public.profiles;
create policy "Users read own profile" on public.profiles
  for select to authenticated using (auth.uid() = user_id);
create policy "Users update own profile" on public.profiles
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users insert own profile" on public.profiles
  for insert to authenticated with check (auth.uid() = user_id);
create policy "Super admins manage profiles" on public.profiles
  for all to authenticated using (public.is_super_admin()) with check (public.is_super_admin());

-- articles: قراءة عامة للمنشور فقط، الكتابة من الخادم فقط
drop policy if exists "Public can read published articles" on public.articles;
create policy "Public can read published articles" on public.articles
  for select to anon, authenticated
  using (status = 'published' and (published_at is null or published_at <= now()));

-- categories
drop policy if exists "Public can read active categories" on public.categories;
create policy "Public can read active categories" on public.categories
  for select to anon, authenticated using (is_active = true);

-- site_settings: الجدول للخدمة فقط، والقراءة العامة عبر الـ view
revoke all on table public.site_settings from anon, authenticated;

-- site_pages: قراءة عامة للصفحات الظاهرة فقط
drop policy if exists "Public can read site pages" on public.site_pages;
create policy "Public can read site pages" on public.site_pages
  for select to anon, authenticated using (is_visible = true);
revoke all on table public.site_pages from anon, authenticated;
grant select on table public.site_pages to anon, authenticated;

-- ads: للخدمة فقط (القراءة من السيرفر)
revoke all on table public.ads from anon, authenticated;

-- password_reset_requests: المدير العام فقط
do $$
declare
  policy_name text;
begin
  for policy_name in
    select policyname from pg_policies
    where schemaname = 'public' and tablename = 'password_reset_requests'
  loop
    execute format('drop policy if exists %I on public.password_reset_requests', policy_name);
  end loop;
end;
$$;
create policy "Super admins manage reset requests" on public.password_reset_requests
  for all to authenticated using (public.is_super_admin()) with check (public.is_super_admin());
revoke all on table public.password_reset_requests from anon, authenticated;
grant select, insert, update, delete on table public.password_reset_requests to authenticated;

-- سجلات التشغيل: سيرفر فقط
revoke all on table public.audit_logs from anon, authenticated;
revoke all on table public.article_view_events from anon, authenticated;
revoke all on table public.site_visits from anon, authenticated;

-- ---------------------------------------------------------------------------
-- 12) Storage Buckets + السياسات
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('news-media', 'news-media', true), ('ads-media', 'ads-media', true)
on conflict (id) do nothing;

drop policy if exists "Public can read news media" on storage.objects;
create policy "Public can read news media" on storage.objects
  for select to public using (bucket_id in ('news-media', 'ads-media'));

drop policy if exists "News staff upload article media" on storage.objects;
drop policy if exists "News staff update article media" on storage.objects;
drop policy if exists "Authenticated users can upload news media" on storage.objects;
drop policy if exists "Authenticated users can update their news media" on storage.objects;

create policy "News staff upload article media" on storage.objects
  for insert to authenticated
  with check (
    bucket_id in ('news-media', 'ads-media')
    and (public.is_super_admin() or public.has_permission('content') or public.has_permission('ads'))
  );

create policy "News staff update article media" on storage.objects
  for update to authenticated
  using (
    bucket_id in ('news-media', 'ads-media')
    and (public.is_super_admin() or public.has_permission('content') or public.has_permission('ads'))
  )
  with check (
    bucket_id in ('news-media', 'ads-media')
    and (public.is_super_admin() or public.has_permission('content') or public.has_permission('ads'))
  );

drop policy if exists "Users upload their own avatars" on storage.objects;
drop policy if exists "Users update their own avatars" on storage.objects;
create policy "Users upload their own avatars" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'news-media' and name like ('avatars/' || auth.uid()::text || '-%'));
create policy "Users update their own avatars" on storage.objects
  for update to authenticated
  using (bucket_id = 'news-media' and name like ('avatars/' || auth.uid()::text || '-%'))
  with check (bucket_id = 'news-media' and name like ('avatars/' || auth.uid()::text || '-%'));

commit;
