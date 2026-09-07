-- Expected schema for real admin authorization. Apply after confirming the project auth profile columns.
create table if not exists public.user_permissions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'editor' check (role in ('super_admin', 'editor', 'reviewer')),
  permissions jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_permissions enable row level security;
create policy "Users can read their own permissions" on public.user_permissions for select to authenticated using (auth.uid() = user_id);
create policy "Super admins manage permissions" on public.user_permissions for all to authenticated using (exists (select 1 from public.user_permissions me where me.user_id = auth.uid() and me.role = 'super_admin')) with check (exists (select 1 from public.user_permissions me where me.user_id = auth.uid() and me.role = 'super_admin'));
