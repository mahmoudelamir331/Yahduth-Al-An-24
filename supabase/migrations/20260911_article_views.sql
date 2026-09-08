-- Public article view counter. The function only increments an existing article.
begin;

create or replace function public.increment_article_views(article_id text)
returns void
language sql
security definer
set search_path = public, pg_temp
as $$
  update public.articles
  set views_count = coalesce(views_count, 0) + 1
  where id::text = article_id
    and status = 'published'
    and (published_at is null or published_at <= now());
$$;

revoke all on function public.increment_article_views(text) from public;
grant execute on function public.increment_article_views(text) to anon, authenticated;

commit;
