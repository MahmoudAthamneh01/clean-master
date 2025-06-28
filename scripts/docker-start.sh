#!/bin/bash

echo "🐳 تشغيل Clean Master مع Docker"
echo "================================"

# التحقق من وجود Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker غير مثبت. يرجى تثبيته أولاً"
    exit 1
fi

# التحقق من وجود Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose غير مثبت. يرجى تثبيته أولاً"
    exit 1
fi

echo "🏗️  بناء وتشغيل الحاويات..."
docker-compose up --build -d

echo "⏳ انتظار بدء الخدمات..."
sleep 10

echo "🔍 فحص حالة الخدمات..."
docker-compose ps

echo ""
echo "✅ المشروع يعمل الآن!"
echo "🌐 الموقع: http://localhost:3000"
echo "🔧 API: http://localhost:5000"
echo "🗄️  قاعدة البيانات: localhost:27017"
echo ""
echo "📊 لوحة الإدارة: http://localhost:3000/admin"
echo "🔑 البريد: admin@cleanmaster.com"
echo "🔑 كلمة المرور: admin123"
echo ""
echo "🛑 لإيقاف المشروع: docker-compose down"
echo "📊 لعرض السجلات: docker-compose logs -f" 