# 🚀 دليل نشر مشروع Clean Master

## 📋 متطلبات النشر

### متغيرات البيئة للباك إند:
```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb://localhost:27017/cleanmaster
JWT_SECRET=your_super_secret_jwt_key_here
```

## 🌐 طرق النشر

### 1. **Vercel (Frontend) + Railway (Backend)**

#### نشر الباك إند على Railway:
1. اذهب إلى [railway.app](https://railway.app)
2. اربط حساب GitHub الخاص بك
3. انشئ مشروع جديد واختر "Deploy from GitHub repo"
4. اختر مجلد `server`
5. أضف متغيرات البيئة:
   - `NODE_ENV=production`
   - `JWT_SECRET=your_secret_key`
   - `MONGODB_URI=your_mongodb_connection_string`

#### نشر الفرونت إند على Vercel:
1. اذهب إلى [vercel.com](https://vercel.com)
2. اربط حساب GitHub
3. انشئ مشروع جديد واختر مجلد `client`
4. أضف متغير البيئة:
   - `VITE_API_URL=https://your-backend-url.railway.app`

### 2. **Netlify (Frontend) + Render (Backend)**

#### نشر الباك إند على Render:
1. اذهب إلى [render.com](https://render.com)
2. انشئ "Web Service" جديد
3. اربط GitHub repo واختر مجلد `server`
4. استخدم الإعدادات:
   - Build Command: `npm install`
   - Start Command: `npm start`

#### نشر الفرونت إند على Netlify:
1. اذهب إلى [netlify.com](https://netlify.com)
2. انشئ موقع جديد من GitHub
3. اختر مجلد `client`
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### 3. **Heroku (التطبيق كاملاً)**

#### إعداد Heroku:
```bash
# إنشاء تطبيق للباك إند
heroku create cleanmaster-api

# إعداد متغيرات البيئة
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret_key
heroku config:set MONGODB_URI=your_mongodb_uri

# نشر الباك إند
git subtree push --prefix server heroku main
```

### 4. **Firebase Hosting + Functions**

#### إعداد Firebase:
```bash
npm install -g firebase-tools
firebase login
firebase init
```

## 🔧 إعدادات الإنتاج

### تحديث Frontend للإنتاج:
1. تحديث `client/src/config/api.js`:
```javascript
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.com'
  : 'http://localhost:5000';
```

### تحديث Backend للإنتاج:
1. تحديث CORS في `server/server.js`:
```javascript
app.use(cors({
  origin: ['https://your-frontend-domain.com', 'http://localhost:5173'],
  credentials: true
}));
```

## 📊 مراقبة التطبيق

### صحة الخادم:
- Health Check: `https://your-backend-url.com/health`
- API Status: `https://your-backend-url.com/api/status`

### السجلات:
- Railway: Dashboard → Logs
- Vercel: Dashboard → Functions → Logs
- Netlify: Dashboard → Site → Functions

## 🔒 الأمان في الإنتاج

1. **استخدم HTTPS دائماً**
2. **غيّر JWT_SECRET**
3. **استخدم قاعدة بيانات آمنة**
4. **فعّل Rate Limiting**
5. **استخدم متغيرات بيئة آمنة**

## 🎯 روابط سريعة

- **Frontend Demo**: https://your-app.vercel.app
- **Backend API**: https://your-api.railway.app
- **Admin Panel**: https://your-app.vercel.app/admin

## 📞 معلومات تسجيل الدخول للعرض التجريبي

```
البريد الإلكتروني: admin@cleanmaster.com
كلمة المرور: admin123
```

## 🛠️ استكشاف الأخطاء

### مشاكل شائعة:
1. **CORS Error**: تحقق من إعدادات CORS في الباك إند
2. **API Connection**: تحقق من VITE_API_URL
3. **Database Connection**: تحقق من MONGODB_URI
4. **Authentication**: تحقق من JWT_SECRET

### إعادة النشر:
```bash
# للفرونت إند (Vercel)
vercel --prod

# للباك إند (Railway)
railway up

# للهيروكو
git push heroku main
``` 