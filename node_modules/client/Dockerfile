# مرحلة البناء
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# مرحلة الإنتاج
FROM nginx:alpine

# نسخ الملفات المبنية
COPY --from=build /app/dist /usr/share/nginx/html

# نسخ إعدادات nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# تعيين المنفذ
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"] 