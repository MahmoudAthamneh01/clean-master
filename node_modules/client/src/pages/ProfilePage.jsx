import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-arabic">
            {t('profile.title')}
          </h1>
        </div>
        
        {/* Profile content will be added here */}
        <div className="card text-center">
          <p className="text-gray-500 font-arabic">
            قريباً - صفحة الملف الشخصي قيد التطوير
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 