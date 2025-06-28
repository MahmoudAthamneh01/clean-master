# Clean Master Deployment Setup Script
# PowerShell script to prepare the project for deployment

Write-Host "🚀 Clean Master - إعداد النشر" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "❌ Git غير مهيأ. قم بتهيئة git أولاً:" -ForegroundColor Red
    Write-Host "git init" -ForegroundColor Yellow
    Write-Host "git remote add origin YOUR_REPO_URL" -ForegroundColor Yellow
    exit 1
}

# Check if all files are committed
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "📝 حفظ التغييرات في git..." -ForegroundColor Yellow
    git add .
    git commit -m "Prepare for deployment"
    git push origin main
    Write-Host "✅ تم حفظ التغييرات" -ForegroundColor Green
} else {
    Write-Host "✅ جميع التغييرات محفوظة" -ForegroundColor Green
}

# Display deployment information
Write-Host ""
Write-Host "📋 معلومات النشر:" -ForegroundColor Cyan
Write-Host "==================" -ForegroundColor Cyan

Write-Host ""
Write-Host "🔧 متغيرات البيئة للخادم (Railway):" -ForegroundColor Yellow
Write-Host "NODE_ENV=production"
Write-Host "PORT=5000"
Write-Host "JWT_SECRET=your-very-long-secret-key-here"
Write-Host "SUPABASE_URL=https://uexwsyncimsjivrvqwlc.supabase.co"
Write-Host "SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVleHdzeW5jaW1zaml2cnZxd2xjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExNDAwNDYsImV4cCI6MjA2NjcxNjA0Nn0.1oG29VH4CqK3OTEPuwv8sBUumlNciiDxSOiTLiU9dUY"
Write-Host "FRONTEND_URL=https://your-vercel-app.vercel.app"

Write-Host ""
Write-Host "🎨 متغيرات البيئة للواجهة (Vercel):" -ForegroundColor Yellow
Write-Host "VITE_API_URL=https://your-railway-app.railway.app"

Write-Host ""
Write-Host "🔗 روابط النشر:" -ForegroundColor Cyan
Write-Host "Railway: https://railway.app"
Write-Host "Vercel: https://vercel.com"

Write-Host ""
Write-Host "📁 إعدادات البناء:" -ForegroundColor Cyan
Write-Host "Vercel Framework: Vite"
Write-Host "Root Directory: client"
Write-Host "Build Command: npm run build"
Write-Host "Output Directory: dist"

Write-Host ""
Write-Host "🔑 بيانات الدخول:" -ForegroundColor Cyan
Write-Host "Email: admin@cleanmaster.sa"
Write-Host "Password: admin123"

Write-Host ""
Write-Host "✅ المشروع جاهز للنشر!" -ForegroundColor Green
Write-Host "📖 راجع ملف QUICK_DEPLOY.md للتفاصيل" -ForegroundColor Blue 