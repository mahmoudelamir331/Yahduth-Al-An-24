-- Safe migration to the admin panel schema.
-- Legacy tables are renamed and retained; no existing row is deleted.
begin;

alter table if exists public.profiles rename to profiles_legacy_20260905;
alter table if exists public.user_permissions rename to user_permissions_legacy_20260905;
alter table if exists public.password_reset_requests rename to password_reset_requests_legacy_20260905;

create table public.profiles (
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

create table public.user_permissions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'editor' check (role in ('super_admin', 'editor', 'reviewer')),
  permissions jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.password_reset_requests (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  proposed_password text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  rejection_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.profiles (user_id, full_name, avatar_url, created_at, updated_at)
select id, full_name, avatar_url, created_at, updated_at
from public.profiles_legacy_20260905;

insert into public.user_permissions (user_id, role, permissions, created_at, updated_at)
select id, case when role::text = 'super_admin' then 'super_admin' else 'editor' end, '{}'::jsonb, created_at, updated_at
from public.profiles_legacy_20260905;

insert into public.password_reset_requests (id, email, status, created_at, updated_at)
select r.id, coalesce(u.email, r.user_id::text), r.status::text, r.created_at, coalesce(r.reviewed_at, r.created_at)
from public.password_reset_requests_legacy_20260905 r
left join auth.users u on u.id = r.user_id;

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

create policy "Users read own profile" on public.profiles for select to authenticated using (auth.uid() = user_id);
create policy "Users update own profile" on public.profiles for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users insert own profile" on public.profiles for insert to authenticated with check (auth.uid() = user_id);
create policy "Super admins manage profiles" on public.profiles for all to authenticated using (public.is_super_admin()) with check (public.is_super_admin());

create policy "Users read own permissions" on public.user_permissions for select to authenticated using (auth.uid() = user_id or public.is_super_admin());
create policy "Super admins manage permissions" on public.user_permissions for all to authenticated using (public.is_super_admin()) with check (public.is_super_admin());

create policy "Super admins manage reset requests" on public.password_reset_requests for all to authenticated using (public.is_super_admin()) with check (public.is_super_admin());

revoke all on function public.is_super_admin() from public;
revoke all on function public.has_permission(text) from public;
grant execute on function public.is_super_admin() to authenticated;
grant execute on function public.has_permission(text) to authenticated;

commit;
