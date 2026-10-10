# النجاح لإدارة المحلات التجارية | Najah Retail

هذه النسخة مربوطة الآن بمشروع Supabase حقيقي منفصل خاص بـ **Najah Retail**.

## بيانات الربط الحالية

- Project ref: `fdjakqefyeckoqqtqsux`
- Supabase URL: `https://fdjakqefyeckoqqtqsux.supabase.co`
- Publishable key: محفوظ في `supabase.config.js`

## ما الذي تم ربطه فعليًا

- إنشاء محل جديد عبر Edge Function: `register-tenant`
- تسجيل الدخول عبر Supabase Auth
- تحميل جلسة المحل وبياناته من الخادم عبر: `bootstrap-session`
- التحقق من الترخيص من الخادم عبر: `verify-license`
- معالجة البيع الحساسة عبر: `process-sale`
- قاعدة بيانات جديدة مع جداول المحلات والتراخيص والفروع والمنتجات والمبيعات والمشتريات والمخزون والتدقيق
- سياسات RLS لعزل بيانات كل محل

## Edge Functions المنشورة

- `register-tenant`
- `verify-license`
- `bootstrap-session`
- `process-sale`
- `admin-status`
- `admin-bootstrap`
- `admin-dashboard`
- `admin-update-license`
- `create-branch`
- `create-staff-user`

## ملفات مهمة

- `supabase.config.js` إعداد الواجهة الأمامية
- `supabase/migrations/0001_najah_core.sql` مخطط قاعدة البيانات
- `supabase/functions/*` دوال الخلفية
- `app.js` الواجهة بعد الربط الحقيقي

## طريقة التشغيل

```bash
cd /data/najah-retail
python3 -m http.server 8000
```

ثم افتح:

```text
http://localhost:8000
```

## ملاحظات

- لم يتم المساس بمشروع الصيدليات القديم.
- تم إنشاء مشروع Supabase جديد مستقل لـ Najah Retail.
- مفتاح `service_role` غير موجود في الواجهة الأمامية.

## تحسينات النسخة الحالية

- إضافة سجل تنفيذ ظاهر داخل الواجهة لعرض نجاح وفشل العمليات
- تحسين رسائل الأخطاء وربطها بالأسباب الفعلية
- تجهيز الواجهة كنسخة **RC-1** جاهزة للاختبار النهائي
- تفعيل CORS/OPTIONS على وظائف الخلفية لتنجح طلبات المتصفح

## فحص سريع قبل التسليم

1. إنشاء أول مدير منصة أو تسجيل دخوله
2. تسجيل محل جديد
3. إضافة فرع
4. إضافة مستخدم بصلاحيات
5. تنفيذ شراء ثم بيع ثم طباعة الفاتورة
6. تجربة تعليق الترخيص وإعادة تفعيله من لوحة الإدارة
