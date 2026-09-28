# نقل البيانات من المشروع القديم — البيانات مطلوبة إزاي؟

## المشكلة اللي واقعها

مشروع المصدر `cuxvfekclhdlsidayxnr` **مقفول من Supabase**. كل نقطة دخول مردودة:

| Endpoint | الرد |
|---|---|
| `POST /rest/v1/articles` (GET) | `402 Payment Required` |
| `POST /rest/v1/categories` | `402` |
| `GET /auth/v1/admin/users` | `402` |
| `GET /storage/v1/bucket` | `402` |
| `db.cuxvfekclhdlsidayxnr.supabase.co:5432` | **CLOSED** (TCP مقفولة من الراوتر) |
| Management API بالمشروع | `403 - account does not have the necessary privileges` |

يعني المشروع موقوف (فاتورة / حدود). **مفيش أي طريقة تقنية تقرأ منه** — لا REST، لا Storage، ولا اتصال مباشر بقاعدة البيانات. 

## الحل: SQL Editor (الطريقة الوحيدة اللي هتشتغل)

الـ SQL Editor بيفتح **من جوه** مشروعك من غير ما يمر على الـ API المتأثر، فالجداول **لسه موجودة ومتاحة**. لو تقدر تفتحه، هنقدر نصدّر.

### الخطوة 1 — تصدير

1. افتح لوحة Supabase → المشروع القديم `cuxvfekclhdlsidayxnr` → **SQL Editor**
2. **New query**
3. انسخ محتوى الملف `scripts/export-from-old-project.sql` والصقه
4. اضغط **Run**
5. الـ Output هيطلع فيه **9 نتائج**، انسخهم كلهم وحفظهم في ملف نصي

> لو الـ Output كبير على المعروضة، صدّر الـ result كـ CSV من زر التنزيل تحت كل نتيجة.

### الخطوة 2 - الاستيراد

ابعتلي الـ output وأنا هكمّل:
- أصلّح الـ FKs (المستخدمين هيتعملوا في `auth.users` الأول وبعدين `profiles` و `user_permissions`)
- أنقل `articles` بالترتيب الصحيح: `categories` الأول وبعدين `articles`
- أعمل verification على عدد ونوع البيانات

---

## الحل البديل: CSV export (لو SQL Editor مش متاح)

من لوحة Supabase → **Table Editor** → اختر الجدول → **Export CSV**:

| الأولوية | الجدول | الترتيب |
|---|---|---|
| 1 | `categories` | لازم الأول |
| 2 | `articles` | بعد categories مباشرة |
| 3 | `profiles` | بعد إنشاء المستخدمين |
| 4 | `user_permissions` | بعد profiles |
| 5 | `site_pages` | — |
| 6 | `site_settings` | صف واحد |
| 7 | `ads` | — |
| 8 | `auth.users` | من Table Editor → schema `auth` |

---

## الحل التالت: لو تقدر تحيي المشروع

1. لوحة Supabase → المشروع القديم → **Restore project** (لو موقوف)
2. أو سدّد الفاتورة / ارفع حدود الاستخدام
3. وقولي "خلاص اتحمّل" وأنا هشغّل `node scripts/migrate-data.mjs --commit` على طول

---

## حاجة كمان ناقصة مني: Node.js

الجهاز ده **مش فيه Node مثبّت** (`node` مش موجود في الـ PATH، ومفيش `Program Files\nodejs`، ومفيش `winget`/`choco`).
فبقدر أكتب سكريبتات Node، بس **مش able أنفّذهم** — فبستغل PowerShell الموجود.

**ممكن تساعدني في:**
- تثبيت Node.js (أو تردّ لي بـ مسار `node.exe` لو موجود في مكان تاني)
- لو تحب أبسّط: ابعتلي الـ CSV dump وأنا أنفّذ الاستيراد بـ PowerShell على طول من غير Node

## حالة الوجهة دلوقتي

| الجدول | الصفوف |
|---|---|
| `categories` | 21 |
| `articles` | **0** |
| `site_pages` | 4 (فاضية، نظامية) |
| الباقي | 0 |
