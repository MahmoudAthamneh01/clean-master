# Clean Master Deployment Setup Script
# سكريبت إعداد نشر منصة كلين ماستر

Write-Host "🚀 إعداد نشر منصة كلين ماستر" -ForegroundColor Green

# Check if required tools are installed
Write-Host "📋 فحص الأدوات المطلوبة..." -ForegroundColor Yellow

# Check Git
if (Get-Command git -ErrorAction SilentlyContinue) {
    Write-Host "✅ Git مُثبت" -ForegroundColor Green
} else {
    Write-Host "❌ Git غير مُثبت - يُرجى تثبيته من https://git-scm.com/" -ForegroundColor Red
    exit 1
}

# Check Node.js
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "✅ Node.js مُثبت - الإصدار: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js غير مُثبت - يُرجى تثبيته من https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check environment files
Write-Host "📋 فحص ملفات الإعدادات..." -ForegroundColor Yellow

if (Test-Path "server\.env") {
    Write-Host "✅ ملف إعدادات الخادم موجود" -ForegroundColor Green
} else {
    Write-Host "❌ ملف إعدادات الخادم مفقود - سيتم إنشاؤه" -ForegroundColor Yellow
    Copy-Item "server\config-template.env" "server\.env"
    Write-Host "✅ تم إنشاء server\.env من النموذج" -ForegroundColor Green
}

if (Test-Path "client\.env") {
    Write-Host "✅ ملف إعدادات العميل موجود" -ForegroundColor Green
} else {
    Write-Host "❌ ملف إعدادات العميل مفقود - سيتم إنشاؤه" -ForegroundColor Yellow
    Copy-Item "client\config-template.env" "client\.env"
    Write-Host "✅ تم إنشاء client\.env من النموذج" -ForegroundColor Green
}

# Build and test
Write-Host "🔨 بناء واختبار المشروع..." -ForegroundColor Yellow

# Install dependencies
Write-Host "📦 تثبيت المكتبات..." -ForegroundColor Cyan
npm install

# Test client build
Write-Host "🎨 اختبار بناء الواجهة الأمامية..." -ForegroundColor Cyan
Set-Location client
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ بناء الواجهة الأمامية نجح" -ForegroundColor Green
} else {
    Write-Host "❌ فشل في بناء الواجهة الأمامية" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

# Test server
Write-Host "⚙️ اختبار الخادم..." -ForegroundColor Cyan
Set-Location server
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ تثبيت مكتبات الخادم نجح" -ForegroundColor Green
} else {
    Write-Host "❌ فشل في تثبيت مكتبات الخادم" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

Write-Host ""
Write-Host "🎉 إعداد النشر مكتمل!" -ForegroundColor Green
Write-Host ""
Write-Host "الخطوات التالية:" -ForegroundColor Yellow
Write-Host "1. أكمل إعداد MongoDB Atlas وحدث MONGODB_URI في server\.env" -ForegroundColor White
Write-Host "2. ادفع الكود إلى GitHub" -ForegroundColor White
Write-Host "3. اربط المشروع مع Railway (الخادم)" -ForegroundColor White
Write-Host "4. اربط المشروع مع Vercel (الواجهة)" -ForegroundColor White
Write-Host "5. حدث متغيرات البيئة في منصات النشر" -ForegroundColor White
Write-Host ""
Write-Host "📚 راجع DEPLOYMENT_GUIDE.md للتفاصيل الكاملة" -ForegroundColor Cyan 