import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Sparkles, 
  Clock, 
  Shield, 
  Star, 
  Home, 
  Building2, 
  Car, 
  Droplets,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Phone,
  Award,
  Users,
  Zap
} from 'lucide-react';

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "متخصصون محترفون",
      description: "فريق محترف ومدرب على أعلى المستويات لضمان أفضل خدمة"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "خدمة سريعة",
      description: "نصل إليك في الوقت المحدد ونجز العمل بكفاءة عالية"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "جودة مضمونة",
      description: "ضمان الجودة وأمان كامل لممتلكاتك مع أفضل المواد"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "حجز سهل",
      description: "احجز بسهولة عبر الموقع أو واتساب في دقائق معدودة"
    }
  ];

  const services = [
    {
      icon: <Home className="w-12 h-12" />,
      title: "تنظيف المنازل",
      description: "تنظيف شامل لجميع غرف المنزل",
      price: "من 150 ريال"
    },
    {
      icon: <Building2 className="w-12 h-12" />,
      title: "تنظيف المكاتب", 
      description: "تنظيف احترافي للمكاتب والشركات",
      price: "من 200 ريال"
    },
    {
      icon: <Car className="w-12 h-12" />,
      title: "تنظيف السيارات",
      description: "غسيل وتنظيف شامل للسيارات",
      price: "من 80 ريال"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            
            {/* Main Heading */}
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 font-arabic leading-tight">
              كلين ماستر
              <span className="block text-2xl lg:text-4xl font-medium mt-2 text-blue-100">
                خدمات التنظيف الذكية
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed font-arabic max-w-4xl mx-auto">
              احصل على خدمات التنظيف الاحترافية في منزلك أو مكتبك مع ضمان الجودة والراحة التامة
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link
                to="/booking"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 rtl:space-x-reverse font-arabic"
              >
                <span>احجز الآن</span>
                <ArrowLeft className="w-6 h-6" />
              </Link>
              
              <Link
                to="/services"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 font-arabic"
              >
                تصفح الخدمات
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">+500</div>
                <div className="text-blue-100 font-arabic">عميل سعيد</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">4.9</div>
                <div className="text-blue-100 font-arabic">تقييم العملاء</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-blue-100 font-arabic">خدمة العملاء</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 font-arabic">
              لماذا نحن الأفضل؟
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-arabic leading-relaxed">
              نحن نقدم خدمات التنظيف بأعلى معايير الجودة والاحترافية مع فريق مدرب ومعدات حديثة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-all duration-300 bg-gray-50 rounded-3xl p-8 hover:bg-blue-50 hover:shadow-xl"
              >
                <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600 group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-arabic">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-arabic leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 font-arabic">
              خدماتنا المميزة
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-arabic leading-relaxed">
              مجموعة شاملة من خدمات التنظيف لتناسب جميع احتياجاتك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:scale-105"
              >
                <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-200 transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-arabic">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 font-arabic leading-relaxed">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600 font-arabic">{service.price}</span>
                  <Link
                    to="/booking"
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-300 font-arabic font-medium"
                  >
                    احجز الآن
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl hover:bg-blue-700 transition-colors duration-300 inline-flex items-center space-x-3 rtl:space-x-reverse font-arabic font-bold text-lg"
            >
              <span>تصفح جميع الخدمات</span>
              <ArrowLeft className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 font-arabic">
            جاهز للبدء؟
          </h2>
          <p className="text-xl text-blue-100 mb-8 font-arabic leading-relaxed">
            احجز خدمة التنظيف الآن واحصل على منزل نظيف ومريح
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/booking"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 rtl:space-x-reverse font-arabic"
            >
              <span>احجز الآن</span>
              <ArrowLeft className="w-6 h-6" />
            </Link>
            
            <a
              href="tel:+966123456789"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center space-x-3 rtl:space-x-reverse font-arabic"
            >
              <Phone className="w-6 h-6" />
              <span>اتصل بنا</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 