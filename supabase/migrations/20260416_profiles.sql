-- بروفايل الموظف: صورة، نبذة، سوشيال ميديا، اسم، موبايل (الإيميل في Auth مش هنا).
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

alter table public.profiles enable row level security;

-- كل موظف يقرأ ويعدل بروفايله بنفسه.
create policy "Users read own profile" on public.profiles for select to authenticated using (auth.uid() = user_id);
create policy "Users update own profile" on public.profiles for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users insert own profile" on public.profiles for insert to authenticated with check (auth.uid() = user_id);

-- المالك (super_admin) يقرأ كل البروفايلات لإدارة الفريق.
create policy "Super admins read all profiles" on public.profiles for select to authenticated
  using (exists (select 1 from public.user_permissions me where me.user_id = auth.uid() and me.role = 'super_admin'));
