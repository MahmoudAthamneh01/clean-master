import { useTranslation } from 'react-i18next';

const BookingsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-arabic">
            {t('bookings.title')}
          </h1>
        </div>
        
        {/* Bookings list will be added here */}
        <div className="card text-center">
          <p className="text-gray-500 font-arabic">
            قريباً - صفحة الحجوزات قيد التطوير
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage; 