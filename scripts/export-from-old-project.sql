-- ============================================================================
-- EXPORT — شغّله جوه SQL Editor في المشروع القديم (cuxvfekclhdlsidayxnr) فقط
-- قراءة فقط، بيبني جملة UPDATE لكل صف على حدة.
-- خد الـ Output كله، احفظه، وابعتهولي.
-- ============================================================================

-- 1) categories  (لازم الأول — articles حايدة عليها)
select 'update public.categories set name=''' || name || ''', slug=''' || slug
  || ''', is_active=' || is_active || ', updated_at=''' || updated_at
  || ''' where id=''' || id::text || ''';' as stmt
from public.categories
order by id;

-- 2) site_pages
select 'update public.site_pages set title=''' || title || ''', content=''' || quote_literal(content)
  || ''', seo_title=' || coalesce(quote_literal(seo_title), 'null')
  || ', seo_description=' || coalesce(quote_literal(seo_description), 'null')
  || ', is_visible=' || is_visible || ', is_system=' || is_system
  || ', updated_at=''' || updated_at
  || ''' where slug=''' || slug || ''';' as stmt
from public.site_pages
order by slug;

-- 3) site_settings (صف واحد)
select 'update public.site_settings set maintenance_enabled=' || maintenance_enabled
  || ', maintenance_message=' || coalesce(quote_literal(maintenance_message), 'null')
  || ', maintenance_ends_at=' || coalesce(quote_literal(maintenance_ends_at::text), 'null')
  || ', content_protection_enabled=' || content_protection_enabled
  || ', anti_adblock_enabled=' || anti_adblock_enabled
  || ', logo_url=' || coalesce(quote_literal(logo_url), 'null')
  || ', favicon_url=' || coalesce(quote_literal(favicon_url), 'null')
  || ', live_streams=' || quote_literal(live_streams::text)
  || ', ads=' || quote_literal(ads::text)
  || ', updated_at=' || quote_literal(now()::text)
  || ' where id=true;' as stmt
from public.site_settings
where id = true;

-- 4) ads
select 'insert into public.ads (id,title,image_url,target_url,custom_code,placement,ad_type,status,start_date,end_date,views,clicks,created_at,updated_at) values ('''
  || quote_literal(id::text) || ',' || quote_literal(title)
  || ',' || coalesce(quote_literal(image_url), 'null')
  || ',' || coalesce(quote_literal(target_url), 'null')
  || ',' || coalesce(quote_literal(custom_code), 'null')
  || ',' || quote_literal(placement) || ',' || quote_literal(ad_type)
  || ',' || status
  || ',' || coalesce(quote_literal(start_date::text), 'null')
  || ',' || coalesce(quote_literal(end_date::text), 'null')
  || ',' || views || ',' || clicks
  || ',' || quote_literal(created_at::text) || ',' || quote_literal(updated_at::text)
  || ') on conflict (id) do nothing;' as stmt
from public.ads
order by created_at;

-- 5) articles — الأهم. content بيتحول من text[] لـ jsonb عشان ينكتب صح.
select 'insert into public.articles (id,slug,title,excerpt,content,cover_image_url,category_id,author_name,is_urgent,is_headline,status,views_count,read_minutes,published_at,created_at,updated_at) values ('''
  || quote_literal(id::text) || ',' || quote_literal(slug)
  || ',' || quote_literal(title) || ',' || quote_literal(coalesce(excerpt, ''))
  || ',' || quote_literal(to_jsonb(content)::text)
  || ',' || coalesce(quote_literal(cover_image_url), 'null')
  || ',' || coalesce(quote_literal(category_id::text), 'null')
  || ',' || quote_literal(coalesce(author_name, 'فريق التحرير'))
  || ',' || coalesce(is_urgent, false) || ',' || coalesce(is_headline, false)
  || ',' || quote_literal(coalesce(status, 'draft'))
  || ',' || coalesce(views_count, 0) || ',' || coalesce(read_minutes, 1)
  || ',' || coalesce(quote_literal(published_at::text), 'null')
  || ',' || quote_literal(created_at::text) || ',' || quote_literal(updated_at::text)
  || ') on conflict (id) do update set slug=excluded.slug, title=excluded.title,'
  || ' excerpt=excluded.excerpt, content=excluded.content, cover_image_url=excluded.cover_image_url,'
  || ' category_id=excluded.category_id, author_name=excluded.author_name, is_urgent=excluded.is_urgent,'
  || ' is_headline=excluded.is_headline, status=excluded.status, views_count=excluded.views_count,'
  || ' read_minutes=excluded.read_minutes, published_at=excluded.published_at, updated_at=excluded.updated_at;' as stmt
from public.articles
order by id;

-- 6) مستخدمين auth.users — هدول هنعملهم في المشروع الجديد واحد واحد
select email, raw_user_meta_data::text, created_at, email_confirmed_at, last_sign_in_at
from auth.users
order by created_at;

-- 7) user_permissions
select role, permissions::text, user_id, created_at
from public.user_permissions
order by created_at;

-- 8) profiles
select full_name, phone, avatar_url, bio, facebook, x_twitter, whatsapp,
       hide_identity, ui_theme, user_id, created_at
from public.profiles
order by created_at;

-- 9) عدادات - للتأكد إن التصدير كامل
select 'categories=' || (select count(*) from public.categories)
    || ' | articles=' || (select count(*) from public.articles)
    || ' | site_pages=' || (select count(*) from public.site_pages)
    || ' | ads=' || (select count(*) from public.ads)
    || ' | profiles=' || (select count(*) from public.profiles)
    || ' | user_permissions=' || (select count(*) from public.user_permissions)
    || ' | auth_users=' || (select count(*) from auth.users) as counts;
