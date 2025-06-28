import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, User, LogOut, Settings } from 'lucide-react';
import axios from 'axios';

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Mock user state - replace with actual auth context
  const [user, setUser] = useState(null);

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setUser(user);
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsUserMenuOpen(false);
    navigate('/');
  };



  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/booking', label: t('nav.booking') },
    { to: '/contact', label: t('nav.contact') }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">CM</span>
            </div>
            <span className="text-xl font-bold gradient-text font-arabic">
              {t('hero.title')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 font-arabic"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop User Actions */}
          <div className="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
            
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 rtl:space-x-reverse text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {i18n.language === 'ar' ? 'EN' : 'العربية'}
              </span>
            </button>



            {/* User Authentication */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 rtl:space-x-reverse text-gray-700 hover:text-primary-600 transition-colors duration-200"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium font-arabic">{user.name}</span>
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-100 py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-arabic"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      {t('nav.profile')}
                    </Link>
                    <Link
                      to="/my-bookings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-arabic"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      {t('nav.myBookings')}
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-arabic"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        {t('nav.admin')}
                      </Link>
                    )}
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-arabic flex items-center space-x-2 rtl:space-x-reverse"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t('nav.logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Link
                  to="/login"
                  className="text-primary-600 hover:text-primary-700 font-medium font-arabic"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary"
                >
                  {t('nav.signup')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-primary-600 hover:bg-gray-50"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-700 hover:text-primary-600 font-medium py-2 font-arabic"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 hover:text-primary-600 py-2"
              >
                <Globe className="w-4 h-4" />
                <span className="font-medium">
                  {i18n.language === 'ar' ? 'English' : 'العربية'}
                </span>
              </button>

              {/* Mobile Admin Button */}
              {!user && (
                <button
                  onClick={() => {
                    handleAdminLogin();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 rtl:space-x-reverse bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  <Settings className="w-4 h-4" />
                  <span>دخول الإدارة (مؤقت)</span>
                </button>
              )}

              {/* Mobile Auth Links */}
              {user ? (
                <div className="pt-3 border-t border-gray-100">
                  <Link
                    to="/profile"
                    className="block text-gray-700 hover:text-primary-600 font-medium py-2 font-arabic"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.profile')}
                  </Link>
                  <Link
                    to="/my-bookings"
                    className="block text-gray-700 hover:text-primary-600 font-medium py-2 font-arabic"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.myBookings')}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block text-red-600 hover:text-red-700 font-medium py-2 font-arabic"
                  >
                    {t('nav.logout')}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3 pt-3 border-t border-gray-100">
                  <Link
                    to="/login"
                    className="text-primary-600 hover:text-primary-700 font-medium font-arabic"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-primary inline-block text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.signup')}
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 