# استخدام Node.js 20 لدعم React Router 7 و Vite 7
FROM node:20-alpine

# تعيين مجلد العمل
WORKDIR /app

# نسخ ملفات package
COPY package*.json ./

# تثبيت التبعيات
RUN npm install

# نسخ الكود المصدري
COPY . .

# بناء التطبيق
RUN npm run build

# تثبيت serve لتشغيل التطبيق
RUN npm install -g serve

# تعيين المنفذ
EXPOSE 3000

# تعيين متغيرات البيئة
ENV NODE_ENV=production

# أمر بدء التطبيق
CMD ["serve", "-s", "dist", "-l", "3000"] 