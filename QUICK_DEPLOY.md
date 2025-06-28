# دليل النشر السريع لمنصة كلين ماستر 🚀

## الخطوات السريعة للنشر

### 1. نشر الخادم على Railway

1. **إنشاء حساب Railway**:
   - اذهب إلى [railway.app](https://railway.app)
   - سجل دخول بـ GitHub

2. **نشر الخادم**:
   - اضغط "New Project" → "Deploy from GitHub repo"
   - اختر مستودعك
   - اختر مجلد `server`
   - Railway سيبني ويرفع تلقائياً

3. **إضافة متغيرات البيئة**:
   ```env
   NODE_ENV=production
   PORT=5000
   JWT_SECRET=your-very-long-secret-key-here
   SUPABASE_URL=https://uexwsyncimsjivrvqwlc.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVleHdzeW5jaW1zaml2cnZxd2xjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExNDAwNDYsImV4cCI6MjA2NjcxNjA0Nn0.1oG29VH4CqK3OTEPuwv8sBUumlNciiDxSOiTLiU9dUY
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```

### 2. نشر الواجهة على Vercel

1. **إنشاء حساب Vercel**:
   - اذهب إلى [vercel.com](https://vercel.com)
   - سجل دخول بـ GitHub

2. **نشر الواجهة**:
   - اضغط "New Project"
   - اختر مستودعك
   - اضبط الإعدادات:
     - **Framework**: Vite
     - **Root Directory**: `client`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

3. **إضافة متغيرات البيئة**:
   ```env
   VITE_API_URL=https://your-railway-app.railway.app
   ```

### 3. تحديث الروابط

1. **في Railway** (بعد النشر):
   - انسخ رابط الخادم
   - أضفه كـ `FRONTEND_URL` في متغيرات البيئة

2. **في Vercel** (بعد النشر):
   - انسخ رابط الواجهة
   - أضفه كـ `VITE_API_URL` في متغيرات البيئة

### 4. اختبار النشر

- **الخادم**: `https://your-app.railway.app/health`
- **الواجهة**: `https://your-app.vercel.app`
- **الأدمن**: `https://your-app.vercel.app/admin`

### 5. بيانات الدخول

- **Email**: `admin@cleanmaster.sa`
- **Password**: `admin123`

---

## النشر البديل (Netlify + Railway)

### Netlify للواجهة:
1. اذهب إلى [netlify.com](https://netlify.com)
2. "New site from Git" → اختر المستودع
3. **Build settings**:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`

---

## ملاحظات مهمة

- ✅ **Supabase**: جاهز ومتصل
- ✅ **قاعدة البيانات**: تحتوي على بيانات تجريبية
- ✅ **المصادقة**: تعمل بشكل صحيح
- ✅ **التصميم**: متجاوب ومتعدد اللغات

### خدمات متاحة:
- تنظيف المنزل (150 ريال)
- تنظيف المكاتب (200 ريال)
- تنظيف عميق (300 ريال)
- تنظيف النوافذ (80 ريال)
- تنظيف السجاد (120 ريال)

---

**🎉 النظام جاهز للاستخدام التجاري!** 