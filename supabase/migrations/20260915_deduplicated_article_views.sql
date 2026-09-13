-- Count one view per article / browser-session / IP address per day.
begin;

create table if not exists public.article_view_events (
  article_id text not null,
  viewer_hash text not null check (char_length(viewer_hash) = 64),
  viewed_on date not null default current_date,
  created_at timestamptz not null default now(),
  primary key (article_id, viewer_hash, viewed_on)
);

alter table public.article_view_events enable row level security;
revoke all on table public.article_view_events from anon, authenticated;

create or replace function public.record_article_view(
  target_article_id text,
  target_viewer_hash text,
  target_viewed_on date default current_date
)
returns boolean
language plpgsql
security definer
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

revoke all on function public.increment_article_views(text) from public;
revoke all on function public.record_article_view(text, text, date) from public;
grant execute on function public.increment_article_views(text) to service_role;
grant execute on function public.record_article_view(text, text, date) to service_role;

commit;
