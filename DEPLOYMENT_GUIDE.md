# دليل رفع منصة كلين ماستر 🚀

## المتطلبات المسبقة
- حساب Vercel (للواجهة الأمامية)
- حساب Railway أو DigitalOcean (للخادم الخلفي)
- حساب MongoDB Atlas (لقاعدة البيانات)

## 1. إعداد قاعدة البيانات (MongoDB Atlas)

### خطوات الإعداد:
1. اذهب إلى [MongoDB Atlas](https://cloud.mongodb.com)
2. أنشئ حساب جديد أو سجل دخول
3. أنشئ Cluster جديد (اختر المجاني M0)
4. اضبط إعدادات الشبكة:
   - اضغط على "Network Access"
   - أضف IP Address: `0.0.0.0/0` (لجميع IPs)
5. أنشئ مستخدم قاعدة البيانات:
   - اضغط على "Database Access"
   - أضف مستخدم جديد مع كلمة مرور قوية
6. احصل على Connection String:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/cleanmaster?retryWrites=true&w=majority
   ```

## 2. رفع الخادم الخلفي (Railway)

### إعداد Railway:
1. اذهب إلى [Railway.app](https://railway.app)
2. سجل دخول باستخدام GitHub
3. اضغط "New Project" → "Deploy from GitHub repo"
4. اختر مجلد `server` من مستودعك

### متغيرات البيئة في Railway:
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/cleanmaster
JWT_SECRET=your-super-secret-jwt-key-here-make-it-very-long-and-random
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### Commands للنشر:
```json
{
  "build": "npm install",
  "start": "node server.js"
}
```

## 3. رفع الواجهة الأمامية (Vercel)

### خطوات النشر:
1. اذهب إلى [Vercel.com](https://vercel.com)
2. سجل دخول باستخدام GitHub
3. اضغط "New Project"
4. اختر مجلد `client` من مستودعك
5. اضبط الإعدادات:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### متغيرات البيئة في Vercel:
```env
VITE_API_URL=https://your-railway-app.railway.app
VITE_WHATSAPP_NUMBER=+966501234567
```

## 4. إعداد النطاق المخصص (اختياري)

### للنطاق المخصص:
1. **في Vercel**:
   - اذهب إلى Project Settings → Domains
   - أضف نطاقك المخصص
   - اضبط DNS Records حسب التعليمات

2. **في Railway**:
   - اذهب إلى Project Settings → Domains
   - أضف نطاق فرعي للAPI (مثل: api.yoursite.com)

## 5. إعداد SSL وHTTPS
- Vercel و Railway يوفران SSL مجاناً
- تأكد من أن جميع الروابط تستخدم HTTPS
- احدث متغيرات البيئة لتعكس الروابط الجديدة

## 6. اختبار النشر

### اختبارات مطلوبة:
1. **الواجهة الأمامية**:
   - تحميل الصفحة الرئيسية
   - تبديل اللغة (عربي/إنجليزي)
   - تسجيل الدخول كمدير
   - الوصول لجميع صفحات لوحة التحكم

2. **الخادم الخلفي**:
   - API endpoints تعمل
   - قاعدة البيانات متصلة
   - المصادقة تعمل بشكل صحيح

3. **التكامل**:
   - تسجيل الدخول من الواجهة
   - عرض البيانات من قاعدة البيانات
   - إنشاء وتعديل البيانات

## 7. مراقبة الأداء

### أدوات المراقبة:
- **Vercel Analytics**: لمراقبة الواجهة الأمامية
- **Railway Metrics**: لمراقبة الخادم الخلفي
- **MongoDB Atlas Monitoring**: لمراقبة قاعدة البيانات

## 8. النسخ الاحتياطي والأمان

### إعدادات الأمان:
1. **متغيرات البيئة**:
   - لا تضع المفاتيح السرية في الكود
   - استخدم متغيرات البيئة دائماً

2. **قاعدة البيانات**:
   - فعل النسخ الاحتياطي التلقائي في Atlas
   - اضبط IP whitelist بحذر

3. **API Security**:
   - فعل Rate Limiting
   - استخدم CORS بشكل صحيح
   - تحقق من صحة جميع المدخلات

## 9. تحديثات المستقبل

### للتحديثات:
1. **Git Workflow**:
   ```bash
   git add .
   git commit -m "Update: description"
   git push origin main
   ```

2. **Auto-Deploy**:
   - Vercel و Railway ينشران تلقائياً عند Push
   - تحقق من Deployment Status

## 10. استكشاف الأخطاء

### أخطاء شائعة:
1. **CORS Errors**: تحقق من FRONTEND_URL في الخادم
2. **Database Connection**: تحقق من MONGODB_URI
3. **Build Errors**: تحقق من Dependencies في package.json
4. **API Calls Failing**: تحقق من VITE_API_URL في الواجهة

### سجلات الأخطاء:
- **Vercel**: Function Logs في Dashboard
- **Railway**: Deployment Logs في Project
- **MongoDB**: Atlas Logs في Monitoring

## 📞 الدعم التقني
- راجع هذا الدليل عند حدوث مشاكل
- تحقق من Status Pages للخدمات المستخدمة
- استخدم Developer Tools في المتصفح لتشخيص الأخطاء

---

## نموذج ملف `.env` للإنتاج:

### `server/.env`:
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cleanmaster
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
FRONTEND_URL=https://cleanmaster.vercel.app
```

### `client/.env`:
```env
VITE_API_URL=https://cleanmaster-api.railway.app
VITE_WHATSAPP_NUMBER=+966501234567
VITE_SUPPORT_EMAIL=support@cleanmaster.com
```

---

**✅ بعد اتباع هذا الدليل، ستكون منصة كلين ماستر جاهزة للاستخدام العملي!** 