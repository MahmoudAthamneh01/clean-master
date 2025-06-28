import { useTranslation } from 'react-i18next';

const ServicesPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-arabic">
            {t('services.title')}
          </h1>
          <p className="text-xl text-gray-600 font-arabic">
            {t('services.subtitle')}
          </p>
        </div>
        
        {/* Services content will be added here */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 font-arabic">
            قريباً - صفحة الخدمات قيد التطوير
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage; 