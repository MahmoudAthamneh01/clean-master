# استخدام Node.js 18 كصورة أساسية
FROM node:18-alpine

# تعيين مجلد العمل
WORKDIR /app

# نسخ ملفات package
COPY package*.json ./

# تثبيت التبعيات
RUN npm ci --omit=dev

# نسخ الكود المصدري
COPY . .

# إنشاء مجلد للسجلات
RUN mkdir -p logs

# تعيين المنفذ
EXPOSE 5000

# تعيين متغيرات البيئة
ENV NODE_ENV=production
ENV PORT=5000

# إنشاء مستخدم غير مميز
RUN addgroup -g 1001 -S nodejs
RUN adduser -S cleanmaster -u 1001
USER cleanmaster

# أمر بدء التطبيق
CMD ["npm", "start"] 