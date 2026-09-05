-- Production uses public.has_permission(text) for role checks.
-- Restrict article uploads to staff who can create or edit news, and scope
-- avatar writes to their authenticated owner.
drop policy if exists "Authenticated users can upload news media" on storage.objects;
drop policy if exists "Authenticated users can update their news media" on storage.objects;

create policy "News staff upload article media"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'news-media'
  and name like 'articles/%'
  and (
    public.is_super_admin()
    or public.has_permission('news.create')
    or public.has_permission('news.edit')
  )
);

create policy "News staff update article media"
on storage.objects for update to authenticated
using (
  bucket_id = 'news-media'
  and name like 'articles/%'
  and (
    public.is_super_admin()
    or public.has_permission('news.create')
    or public.has_permission('news.edit')
  )
)
with check (
  bucket_id = 'news-media'
  and name like 'articles/%'
  and (
    public.is_super_admin()
    or public.has_permission('news.create')
    or public.has_permission('news.edit')
  )
);

create policy "Users upload their own avatars"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'news-media'
  and name like ('avatars/' || auth.uid()::text || '-%')
);

create policy "Users update their own avatars"
on storage.objects for update to authenticated
using (
  bucket_id = 'news-media'
  and name like ('avatars/' || auth.uid()::text || '-%')
)
with check (
  bucket_id = 'news-media'
  and name like ('avatars/' || auth.uid()::text || '-%')
);
