-- ============================================================================
-- إصلاح صلاحيات الموظفين (RBAC hardening)
--
-- المشكلة: الدالة has_permission كانت بتمنح الموظف (غير المدير العام)
-- صلاحيات عالية تلقائياً لو عنده content:
--   article.delete  +  settings.manage
-- وده يخالف قواعد الصلاحيات: الحذف النهائي وإعدادات الموقع للمدير العام فقط.
-- ============================================================================

create or replace function public.has_permission(required_key text)
returns boolean language sql stable security definer
set search_path = public, pg_temp
as $$
  select public.is_super_admin() or exists (
    select 1 from public.user_permissions up
    where up.user_id = auth.uid()
      and (
        coalesce(up.permissions ->> required_key, 'false') = 'true'
        or (required_key = 'article.create' and (up.permissions ?| array['content','manage_content','news.create']))
        or (required_key = 'article.edit'   and (up.permissions ?| array['content','manage_content','news.edit']))
        or (required_key = 'article.view'   and (up.permissions ?| array['content','manage_content','dashboard']))
        or (required_key = 'categories.manage' and (up.permissions ?| array['content','manage_content']))
        or (required_key = 'dashboard'      and (up.permissions ?| array['content','manage_content']))
      )
  );
$$;

revoke all on function public.has_permission(text) from public;
grant execute on function public.has_permission(text) to authenticated;
