import { useTranslation } from 'react-i18next';

const SignupPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 font-arabic">
              {t('auth.signup')}
            </h1>
          </div>
          
          {/* Signup form will be added here */}
          <div className="text-center">
            <p className="text-gray-500 font-arabic">
              قريباً - نموذج إنشاء الحساب قيد التطوير
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage; 