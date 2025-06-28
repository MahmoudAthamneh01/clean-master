import { useTranslation } from 'react-i18next';

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-arabic">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-gray-600 font-arabic">
            {t('contact.subtitle')}
          </p>
        </div>
        
        {/* Contact form will be added here */}
        <div className="card text-center">
          <p className="text-gray-500 font-arabic">
            قريباً - صفحة التواصل قيد التطوير
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 