import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Phone, MapPin, Clock, User, LogOut, Settings } from 'lucide-react';
import api from '../../utils/api';

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Check for logged in user
  useEffect(() => {
    const token = localStorage.getItem('cleanmaster_token');
    const userData = localStorage.getItem('cleanmaster_user');
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('cleanmaster_token');
        localStorage.removeItem('cleanmaster_user');
      }
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    localStorage.removeItem('cleanmaster_token');
    localStorage.removeItem('cleanmaster_user');
    setUser(null);
    navigate('/');
  };

  const handleAdminLogin = async () => {
    try {
      const result = await api.login({
        email: 'admin@cleanmaster.com',
        password: 'admin123'
      });

      if (result.success) {
        localStorage.setItem('cleanmaster_token', result.data.token);
        localStorage.setItem('cleanmaster_user', JSON.stringify(result.data.user));
        setUser(result.data.user);
        navigate('/admin');
      }
    } catch (error) {
      console.error('خطأ في تسجيل دخول المدير:', error);
    }
  };

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/services', label: t('nav.services') },
    { href: '/booking', label: t('nav.booking') },
    { href: '/contact', label: t('nav.contact') }
  ];

  return (
    <header className="bg-white shadow-lg relative z-50">
      {/* Top Bar */}
      <div className="bg-primary-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Phone className="w-4 h-4" />
                <span>+966 50 123 4567</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <MapPin className="w-4 h-4" />
                <span>{t('header.location')}</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Clock className="w-4 h-4" />
                <span>{t('header.hours')}</span>
              </div>
            </div>
            
            {/* Server Status */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className={`flex items-center space-x-2 rtl:space-x-reverse px-2 py-1 rounded text-xs ${
                api.isServerOnline() 
                  ? 'bg-green-500 bg-opacity-20' 
                  : 'bg-yellow-500 bg-opacity-20'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  api.isServerOnline() ? 'bg-green-400' : 'bg-yellow-400'
                }`}></div>
                <span>
                  {api.isServerOnline() ? 'متصل' : 'تجريبي'}
                </span>
              </div>
              
              <button
                onClick={toggleLanguage}
                className="hover:text-gray-300 transition-colors"
              >
                {i18n.language === 'ar' ? 'EN' : 'العربية'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">ك</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t('brand.name')}</h1>
              <p className="text-sm text-gray-600">{t('brand.tagline')}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
            {user ? (
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="text-gray-700">مرحباً، {user.name}</span>
                
                {user.role === 'admin' ? (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-2 rtl:space-x-reverse bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>إدارة</span>
                  </Link>
                ) : (
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 rtl:space-x-reverse bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>حسابي</span>
                  </Link>
                )}
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>خروج</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <button
                  onClick={handleAdminLogin}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  إدارة
                </button>
                <Link
                  to="/login"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  {t('auth.login')}
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  {t('auth.signup')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-40">
          <div className="container mx-auto px-4 py-4">
            <nav className="space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block text-gray-700 hover:text-primary-600 font-medium transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="border-t pt-4 space-y-3">
                {user ? (
                  <>
                    <p className="text-gray-700">مرحباً، {user.name}</p>
                    {user.role === 'admin' ? (
                      <Link
                        to="/admin"
                        className="block bg-red-600 text-white px-4 py-2 rounded-lg text-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        إدارة
                      </Link>
                    ) : (
                      <Link
                        to="/profile"
                        className="block bg-primary-600 text-white px-4 py-2 rounded-lg text-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        حسابي
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left text-red-600 py-2"
                    >
                      خروج
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        handleAdminLogin();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full bg-red-600 text-white px-4 py-2 rounded-lg text-center"
                    >
                      إدارة
                    </button>
                    <Link
                      to="/login"
                      className="block text-primary-600 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('auth.login')}
                    </Link>
                    <Link
                      to="/signup"
                      className="block bg-primary-600 text-white px-4 py-2 rounded-lg text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('auth.signup')}
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 