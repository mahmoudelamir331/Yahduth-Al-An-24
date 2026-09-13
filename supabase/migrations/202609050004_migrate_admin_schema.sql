-- Safe alignment for the admin panel schema.
-- This file is intentionally idempotent for production projects where parts of
-- the schema were applied before migration history was recorded.
begin;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  bio text,
  facebook text,
  x_twitter text,
  whatsapp text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_permissions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'editor' check (role in ('super_admin', 'editor', 'reviewer')),
  permissions jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.password_reset_requests (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  proposed_password text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  rejection_reason text,
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
        or (required_key = 'news.create' and (up.permissions ?| array['content', 'manage_content', 'article.create']))
        or (required_key = 'news.edit' and (up.permissions ?| array['content', 'manage_content', 'article.edit']))
        or (required_key = 'news.publish' and (up.permissions ?| array['content', 'manage_content', 'categories.manage']))
      )
  );
$$;

alter table public.profiles enable row level security;
alter table public.user_permissions enable row level security;
alter table public.password_reset_requests enable row level security;

drop policy if exists "Users read own profile" on public.profiles;
drop policy if exists "Users update own profile" on public.profiles;
drop policy if exists "Users insert own profile" on public.profiles;
drop policy if exists "Super admins read all profiles" on public.profiles;
drop policy if exists "Super admins manage profiles" on public.profiles;
create policy "Users read own profile" on public.profiles for select to authenticated using (auth.uid() = user_id);
create policy "Users update own profile" on public.profiles for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users insert own profile" on public.profiles for insert to authenticated with check (auth.uid() = user_id);
create policy "Super admins manage profiles" on public.profiles for all to authenticated using (public.is_super_admin()) with check (public.is_super_admin());

drop policy if exists "Users can read their own permissions" on public.user_permissions;
drop policy if exists "Users read own permissions" on public.user_permissions;
drop policy if exists "Super admins manage permissions" on public.user_permissions;
create policy "Users read own permissions" on public.user_permissions for select to authenticated using (auth.uid() = user_id or public.is_super_admin());
create policy "Super admins manage permissions" on public.user_permissions for all to authenticated using (public.is_super_admin()) with check (public.is_super_admin());

drop policy if exists "Super admins manage reset requests" on public.password_reset_requests;
create policy "Super admins manage reset requests" on public.password_reset_requests for all to authenticated using (public.is_super_admin()) with check (public.is_super_admin());

revoke all on function public.is_super_admin() from public;
revoke all on function public.has_permission(text) from public;
grant execute on function public.is_super_admin() to authenticated;
grant execute on function public.has_permission(text) to authenticated;

commit;
