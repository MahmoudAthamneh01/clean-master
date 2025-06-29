import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import api from '../../utils/api';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('🔄 Attempting login with:', formData.email);
      
      const result = await api.login({
        email: formData.email,
        password: formData.password
      });

      console.log('📥 Login result:', result);

      if (result.success) {
        console.log('✅ Login successful, user data:', result.data.user);
        
        // Store user data
        localStorage.setItem('cleanmaster_token', result.data.token);
        localStorage.setItem('cleanmaster_user', JSON.stringify(result.data.user));
        
        console.log('💾 Data stored in localStorage');
        console.log('🎭 User role:', result.data.user.role);
        
        // Navigate based on user role
        if (result.data.user.role === 'admin') {
          console.log('🚀 Navigating to admin panel...');
          navigate('/admin');
          setTimeout(() => {
            if (window.location.pathname !== '/admin') {
              console.log('🔄 Using window.location as fallback...');
              window.location.href = '/admin';
            }
          }, 1000);
        } else {
          console.log('🚀 Navigating to profile...');
          navigate('/profile');
          setTimeout(() => {
            if (window.location.pathname !== '/profile') {
              console.log('🔄 Using window.location as fallback...');
              window.location.href = '/profile';
            }
          }, 1000);
        }
      } else {
        console.log('❌ Login failed:', result.message);
        setError(result.message || 'فشل في تسجيل الدخول');
      }
    } catch (error) {
      console.error('💥 Login error:', error);
      setError('خطأ في الاتصال، يرجى المحاولة مرة أخرى');
    } finally {
      setIsLoading(false);
    }
  };

  // دخول إداري مباشر
  const handleAdminLoginDirect = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      console.log('🔄 Direct admin login attempt...');
      
      const result = await api.login({
        email: 'admin@cleanmaster.com',
        password: 'admin123'
      });

      if (result.success) {
        console.log('✅ Direct admin login successful:', result.data.user);
        
        // Store user data
        localStorage.setItem('cleanmaster_token', result.data.token);
        localStorage.setItem('cleanmaster_user', JSON.stringify(result.data.user));
        
        console.log('💾 Admin data stored, redirecting...');
        
        // Force navigation to admin
        window.location.href = '/admin';
      } else {
        setError('فشل في تسجيل دخول المدير');
      }
    } catch (error) {
      console.error('خطأ في دخول المدير:', error);
      setError('خطأ في دخول المدير');
    } finally {
      setIsLoading(false);
    }
  };

  // معلومات تسجيل الدخول التجريبية
  const demoCredentials = {
    admin: { email: 'admin@cleanmaster.com', password: 'admin123' },
    user: { email: 'user@example.com', password: 'user123' }
  };

  const fillDemo = (type) => {
    setFormData(demoCredentials[type]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('auth.welcome_back')}
          </h1>
          <p className="text-gray-600">
            {t('auth.sign_in_to_continue')}
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Demo Info */}
          {!api.isServerOnline() && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm mb-2">
                🔄 النظام يعمل في الوضع التجريبي
              </p>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => fillDemo('admin')}
                  className="block w-full text-left text-xs bg-yellow-100 hover:bg-yellow-200 p-2 rounded"
                >
                  👨‍💼 مدير: admin@cleanmaster.com / admin123
                </button>
                <button
                  type="button"
                  onClick={() => fillDemo('user')}
                  className="block w-full text-left text-xs bg-yellow-100 hover:bg-yellow-200 p-2 rounded"
                >
                  👤 عميل: user@example.com / user123
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.email')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder={t('auth.email_placeholder')}
                  required
                  dir="ltr"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder={t('auth.password_placeholder')}
                  required
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="mr-2 text-gray-600">{t('auth.remember_me')}</span>
              </label>
              <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700">
                {t('auth.forgot_password')}
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>{t('auth.sign_in')}</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Admin Login */}
          <div className="mt-4">
            <button
              type="button"
              onClick={handleAdminLoginDirect}
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
            >
              🚀 دخول المدير السريع
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {t('auth.no_account')}{' '}
              <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                {t('auth.sign_up')}
              </Link>
            </p>
          </div>
        </div>

        {/* Server Status */}
        <div className="mt-4 text-center">
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs ${
            api.isServerOnline() 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              api.isServerOnline() ? 'bg-green-500' : 'bg-yellow-500'
            }`}></div>
            <span>
              {api.isServerOnline() 
                ? `متصل: ${api.getServerUrl()}` 
                : 'وضع تجريبي - بدون خادم'
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 