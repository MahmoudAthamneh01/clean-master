# 🚀 دليل إعداد Supabase لمنصة كلين ماستر

## الخطوة 1: إنشاء حساب Supabase

1. اذهب إلى [supabase.com](https://supabase.com)
2. انقر على "Start your project"
3. أنشئ حساب جديد أو سجل الدخول
4. انقر على "New Project"

## الخطوة 2: إعداد المشروع

1. **اسم المشروع**: `clean-master`
2. **كلمة مرور قاعدة البيانات**: اختر كلمة مرور قوية واحفظها
3. **المنطقة**: اختر أقرب منطقة (مثل Europe West)
4. **الخطة**: Free Plan (مجانية)
5. انقر على "Create new project"

## الخطوة 3: الحصول على بيانات الاتصال

بعد إنشاء المشروع:

1. اذهب إلى **Settings** > **API**
2. انسخ:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## الخطوة 4: إنشاء الجداول

1. اذهب إلى **SQL Editor** في لوحة التحكم
2. انسخ محتويات ملف `server/supabase-schema.sql`
3. الصق الكود في SQL Editor
4. انقر على "Run" لتنفيذ الأوامر

## الخطوة 5: تحديث ملف .env

حديث ملف `server/.env`:

```env
NODE_ENV=development
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:5175

# Supabase Configuration
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
```

## الخطوة 6: تشغيل المشروع

```bash
npm run dev
```

## ✅ التحقق من النجاح

1. افتح المتصفح على `http://localhost:5000/health`
2. يجب أن تظهر `"database": "Connected"`

## 🔐 بيانات الدخول الافتراضية

- **البريد الإلكتروني**: `admin@cleanmaster.sa`
- **كلمة المرور**: `admin123`

## 📊 مراقبة قاعدة البيانات

يمكنك مراقبة البيانات من خلال:
- **Table Editor** في Supabase Dashboard
- **Authentication** لإدارة المستخدمين
- **Database** لمراقبة الأداء

## 🛠️ المميزات الجديدة مع Supabase

- ✅ اتصال فوري بدون مشاكل DNS
- ✅ واجهة إدارة سهلة
- ✅ نسخ احتياطية تلقائية
- ✅ أمان عالي مع Row Level Security
- ✅ مجاني حتى 500MB

## 🔧 استكشاف الأخطاء

### إذا لم يتصل:
1. تأكد من صحة SUPABASE_URL و SUPABASE_ANON_KEY
2. تأكد من تنفيذ ملف SQL Schema
3. تحقق من اتصال الإنترنت

### إذا ظهرت أخطاء في الجداول:
1. اذهب إلى Table Editor في Supabase
2. تأكد من وجود الجداول: users, services, bookings
3. أعد تنفيذ ملف SQL Schema إذا لزم الأمر 