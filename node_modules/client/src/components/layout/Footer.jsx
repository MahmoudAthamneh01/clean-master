import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/booking', label: t('nav.booking') },
    { to: '/contact', label: t('nav.contact') }
  ];

  const services = [
    { to: '/services', label: t('services.homecleaning.title') },
    { to: '/services', label: t('services.officecleaning.title') },
    { to: '/services', label: t('services.deepCleaning.title') },
    { to: '/services', label: t('services.carWash.title') }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">CM</span>
              </div>
              <span className="text-xl font-bold text-white font-arabic">
                {t('hero.title')}
              </span>
            </div>
            <p className="text-gray-300 mb-6 font-arabic leading-relaxed">
              {t('hero.description')}
            </p>
            
            {/* WhatsApp Contact Button */}
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-2xl transition-colors duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="font-arabic">{t('whatsapp.chatNow')}</span>
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-arabic">
              {t('nav.home')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-white transition-colors duration-200 font-arabic"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-arabic">
              {t('services.title')}
            </h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.to}
                    className="text-gray-300 hover:text-white transition-colors duration-200 font-arabic"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-arabic">
              {t('contact.title')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse text-gray-300">
                <Phone className="w-4 h-4 text-primary-400" />
                <span className="font-arabic">+966 50 123 4567</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse text-gray-300">
                <Mail className="w-4 h-4 text-primary-400" />
                <span>info@cleanmaster.sa</span>
              </div>
              <div className="flex items-start space-x-3 rtl:space-x-reverse text-gray-300">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5" />
                <span className="font-arabic">
                  الرياض، المملكة العربية السعودية
                </span>
              </div>
            </div>
            
            {/* Working Hours */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2 font-arabic">
                {t('contact.workingHours')}
              </h4>
              <p className="text-gray-300 text-sm font-arabic">
                السبت - الخميس: 8:00 ص - 10:00 م
              </p>
              <p className="text-gray-300 text-sm font-arabic">
                الجمعة: 2:00 م - 10:00 م
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm font-arabic mb-4 md:mb-0">
              © 2024 كلين ماستر. جميع الحقوق محفوظة.
            </div>
            
            {/* Social Links or Additional Info */}
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200 font-arabic"
              >
                سياسة الخصوصية
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200 font-arabic"
              >
                الشروط والأحكام
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 