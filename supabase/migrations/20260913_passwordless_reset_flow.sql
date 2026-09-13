-- Passwords and password-derived values must never be retained with a reset
-- request. Supabase sends the recovery email after a super-admin approves it.
begin;

alter table public.password_reset_requests
  add column if not exists reset_email_sent_at timestamptz,
  add column if not exists reset_email_sent_by uuid references auth.users(id) on delete set null;

alter table public.password_reset_requests
  drop column if exists proposed_password,
  drop column if exists proposed_password_hash,
  drop column if exists approved_password;

commit;
