-- إصلاحات آمنة قابلة للتشغيل أكثر من مرة للوحة الإدارة.
-- لا تحذف أو تعيد تسمية أي بيانات موجودة.
begin;

alter table if exists public.categories
  add column if not exists is_active boolean not null default true;

-- أي أقسام قديمة لا بد أن تظل ظاهرة إلى أن يوقفها المدير صراحةً.
update public.categories set is_active = true where is_active is null;

create index if not exists categories_active_name_idx
  on public.categories (is_active, name);

-- بيانات الملف الشخصي المطلوبة لإظهار الكاتب أو إخفائه من الخبر.
alter table if exists public.profiles
  add column if not exists bio text,
  add column if not exists facebook text,
  add column if not exists x_twitter text,
  add column if not exists hide_identity boolean not null default false,
  add column if not exists ui_theme text not null default 'system' check (ui_theme in ('light', 'dark', 'system')),
  add column if not exists notify_password_requests boolean not null default true,
  add column if not exists notify_article_published boolean not null default true;

alter table if exists public.site_settings
  add column if not exists logo_url text,
  add column if not exists favicon_url text;

-- لا نخزن كلمة مرور صريحة في طلب التغيير؛ تحفظ كتجزئة فقط.
alter table if exists public.password_reset_requests
  add column if not exists user_id uuid references auth.users(id) on delete cascade,
  add column if not exists proposed_password_hash text,
  add column if not exists approved_password text,
  add column if not exists decided_at timestamptz,
  add column if not exists decided_by uuid references auth.users(id) on delete set null;

create index if not exists password_reset_requests_user_id_idx
  on public.password_reset_requests (user_id, created_at desc);

commit;
