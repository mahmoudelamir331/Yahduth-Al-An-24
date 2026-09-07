-- طلبات تغيير كلمة المرور: الموظف يقدم الطلب (إيميل + باسورد مقترح) والمالك يوافق أو يرفض.
create table if not exists public.password_reset_requests (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  proposed_password text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  rejection_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.password_reset_requests enable row level security;

-- الموظف (أي زائر) يقدر يقدم طلب جديد أو يقرأ حالة طلبه بالبريد.
create policy "Anyone can submit a reset request" on public.password_reset_requests for insert to anon, authenticated with check (true);
create policy "Anyone can check their request status" on public.password_reset_requests for select to anon, authenticated using (true);

-- المالك (super_admin) فقط يدير الطلبات.
create policy "Super admins manage reset requests" on public.password_reset_requests for all to authenticated
  using (exists (select 1 from public.user_permissions me where me.user_id = auth.uid() and me.role = 'super_admin'))
  with check (exists (select 1 from public.user_permissions me where me.user_id = auth.uid() and me.role = 'super_admin'));

create index if not exists password_reset_requests_email_idx on public.password_reset_requests (email);
