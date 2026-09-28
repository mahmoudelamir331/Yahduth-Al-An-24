-- إضافة أعمدة روابط السوشيال ميديا الإضافية
alter table public.site_settings
  add column if not exists social_instagram text,
  add column if not exists social_telegram text,
  add column if not exists social_whatsapp text;
