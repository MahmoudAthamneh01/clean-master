#!/bin/bash

echo "🚀 نشر مشروع Clean Master"
echo "========================="

# التحقق من Git
if ! git status > /dev/null 2>&1; then
    echo "❌ خطأ: المشروع ليس git repository"
    exit 1
fi

# التحقق من وجود تغييرات غير محفوظة
if ! git diff --quiet; then
    echo "⚠️  يوجد تغييرات غير محفوظة. هل تريد المتابعة؟ (y/n)"
    read -r response
    if [[ "$response" != "y" ]]; then
        exit 1
    fi
fi

echo "📦 تحضير الملفات..."
git add .
git commit -m "Deploy: $(date +%Y-%m-%d\ %H:%M:%S)" || echo "لا توجد تغييرات جديدة"
git push origin main

echo "✅ تم رفع الملفات على GitHub"
echo ""
echo "📋 الخطوات التالية:"
echo "1. اذهب إلى https://railway.app"
echo "2. انشئ مشروع جديد من GitHub"
echo "3. اختر مجلد 'server'"
echo "4. أضف متغيرات البيئة:"
echo "   NODE_ENV=production"
echo "   JWT_SECRET=cleanmaster_secret_2024"
echo ""
echo "5. اذهب إلى https://vercel.com"
echo "6. انشئ مشروع جديد من GitHub"
echo "7. اختر مجلد 'client'"
echo "8. أضف متغير البيئة:"
echo "   VITE_API_URL=https://your-railway-url.railway.app"
echo ""
echo "🎉 مبروك! المشروع جاهز للنشر" 