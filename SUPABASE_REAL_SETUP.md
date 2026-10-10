# ربط Najah Retail بـ Supabase الحقيقي

تم تجهيز المشروع للعمل مع مشروع Supabase الحقيقي ذي المرجع:

- Project Ref: `aqpevohnzfodxshnwbld`
- URL: `https://aqpevohnzfodxshnwbld.supabase.co`

## ما الذي بقي؟

1. الحصول على المفتاح publishable / anon من المشروع بعد اكتمال تشغيله.
2. تطبيق migration الأساسية.
3. نشر Edge Functions:
   - `register-tenant`
   - `verify-license`
   - `process-sale`
4. استبدال المصادقة والتخزين المحليين في الواجهة بالاتصال الحقيقي.

## ملفات الإعداد

- `supabase/migrations/0001_najah_core.sql`
- `supabase/functions/*`
- `supabase.config.example.js`

## ملاحظة مهمة

- لا تضع `service_role` في الواجهة الأمامية.
- استخدم فقط المفتاح publishable / anon في الواجهة.
- استخدم `SUPABASE_SERVICE_ROLE_KEY` داخل Edge Functions والخادم فقط.
