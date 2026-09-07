-- Password reset requests never need to persist the user's new password.
alter table public.password_reset_requests
  alter column proposed_password drop not null,
  alter column proposed_password set default null;

-- Requests are submitted only through the server-side route, which uses the service role.
drop policy if exists "Anyone can submit a reset request" on public.password_reset_requests;
drop policy if exists "Anyone can check their request status" on public.password_reset_requests;
