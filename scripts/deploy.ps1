Write-Host "🚀 نشر مشروع Clean Master" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan

# التحقق من Git
try {
    git status | Out-Null
} catch {
    Write-Host "❌ خطأ: المشروع ليس git repository" -ForegroundColor Red
    exit 1
}

# التحقق من وجود تغييرات غير محفوظة
$gitDiff = git diff --quiet
if ($LASTEXITCODE -ne 0) {
    $response = Read-Host "⚠️  يوجد تغييرات غير محفوظة. هل تريد المتابعة؟ (y/n)"
    if ($response -ne "y") {
        exit 1
    }
}

Write-Host "📦 تحضير الملفات..." -ForegroundColor Yellow
git add .
git commit -m "Deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
if ($LASTEXITCODE -ne 0) {
    Write-Host "لا توجد تغييرات جديدة" -ForegroundColor Yellow
}
git push origin main

Write-Host "✅ تم رفع الملفات على GitHub" -ForegroundColor Green
Write-Host ""
Write-Host "📋 الخطوات التالية:" -ForegroundColor Cyan
Write-Host "1. اذهب إلى https://railway.app"
Write-Host "2. انشئ مشروع جديد من GitHub"
Write-Host "3. اختر مجلد 'server'"
Write-Host "4. أضف متغيرات البيئة:"
Write-Host "   NODE_ENV=production"
Write-Host "   JWT_SECRET=cleanmaster_secret_2024"
Write-Host ""
Write-Host "5. اذهب إلى https://vercel.com"
Write-Host "6. انشئ مشروع جديد من GitHub"
Write-Host "7. اختر مجلد 'client'"
Write-Host "8. أضف متغير البيئة:"
Write-Host "   VITE_API_URL=https://your-railway-url.railway.app"
Write-Host ""
Write-Host "🎉 مبروك! المشروع جاهز للنشر" -ForegroundColor Green 