-- Move the public live-channel playlist from the frontend into site_settings.
-- This keeps the existing channels available while making them editable from the admin panel.
begin;

alter table if exists public.site_settings
  add column if not exists live_streams jsonb not null default '[]'::jsonb;

update public.site_settings
set live_streams = '[
  {"id":"1","youtubeId":"https://www.youtube.com/watch?v=bNyUyrR0PHo","title":"بث مباشر: تغطية صحفية وإخبارية شاملة لكافة الأحداث والتقارير الميدانية 24/7","channel":"الجزيرة الإخبارية مباشر","enabled":true},
  {"id":"2","youtubeId":"https://www.youtube.com/watch?v=mX2_tA-vGMo","title":"بث مباشر: إكسترا نيوز - متابعات ميدانية ونشرات أخبار مصر والصعيد على مدار الساعة","channel":"إكسترا نيوز مصر","enabled":true},
  {"id":"3","youtubeId":"https://www.youtube.com/watch?v=x9J2k0o0xGE","title":"بث مباشر: النشرات الإخبارية والتغطيات الاقتصادية والميدانية المباشرة","channel":"العربية الحدث","enabled":true},
  {"id":"4","youtubeId":"https://www.youtube.com/watch?v=2g811Eo7K8U","title":"بث مباشر: سكاي نيوز عربية - تغطية شاملة للأخبار العاجلة والتحليلات الإخبارية","channel":"سكاي نيوز عربية","enabled":true}
]'::json
where id = true
  and (live_streams is null or jsonb_typeof(live_streams) <> 'array' or jsonb_array_length(live_streams) = 0);

commit;
