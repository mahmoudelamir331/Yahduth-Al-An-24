-- جدول محتوى الصفحات الثابتة (CMS)
-- الصفحات: /about, /contact, /privacy, /terms
begin;

create table if not exists public.site_pages (
  id bigint generated always as identity primary key,
  slug text not null unique,
  title text not null,
  content text not null default '',
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);

alter table public.site_pages enable row level security;

drop policy if exists "Public can read site pages" on public.site_pages;

-- الزوار والمسجلون يقرؤون محتوى الصفحات (لعرض الموقع العام)
create policy "Public can read site pages"
  on public.site_pages
  for select
  to anon, authenticated
  using (true);

-- لا توجد سياسات كتابة: الكتابة فقط عبر الخادم (service_role)

insert into public.site_pages (slug, title, content)
values
  ('about', 'من نحن', ''),
  ('contact', 'تواصل معنا', ''),
  ('privacy', 'سياسة الخصوصية', ''),
  ('terms', 'الشروط والأحكام', '')
on conflict (slug) do nothing;

commit;