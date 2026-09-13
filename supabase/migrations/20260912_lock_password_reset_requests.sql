-- Password-reset requests contain account identifiers and must never be readable
-- by anonymous users (or by regular authenticated staff).
begin;

alter table public.password_reset_requests enable row level security;

-- Remove every existing policy so a legacy deployment cannot retain an old
-- public SELECT/INSERT policy under an unexpected name.
do $$
declare
  policy_name text;
begin
  for policy_name in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'password_reset_requests'
  loop
    execute format('drop policy if exists %I on public.password_reset_requests', policy_name);
  end loop;
end;
$$;

-- Only a signed-in super admin may inspect or manage requests. Public request
-- submission is performed exclusively by the protected server route.
create policy "Super admins manage reset requests"
  on public.password_reset_requests
  for all
  to authenticated
  using (public.is_super_admin())
  with check (public.is_super_admin());

revoke all on table public.password_reset_requests from anon, authenticated;
grant select, insert, update, delete on table public.password_reset_requests to authenticated;

commit;
