-- Run this migration in Supabase SQL Editor with an authenticated admin role.
insert into storage.buckets (id, name, public)
values ('news-media', 'news-media', true)
on conflict (id) do nothing;

drop policy if exists "Authenticated users can upload news media" on storage.objects;
create policy "Authenticated users can upload news media"
on storage.objects for insert to authenticated
with check (bucket_id = 'news-media');

drop policy if exists "Public can read news media" on storage.objects;
create policy "Public can read news media"
on storage.objects for select to public
using (bucket_id = 'news-media');

drop policy if exists "Authenticated users can update their news media" on storage.objects;
create policy "Authenticated users can update their news media"
on storage.objects for update to authenticated
using (bucket_id = 'news-media')
with check (bucket_id = 'news-media');
