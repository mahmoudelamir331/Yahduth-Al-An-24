begin;

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
alter table public.audit_logs enable row level security;
revoke all on table public.audit_logs from anon, authenticated;

commit;
