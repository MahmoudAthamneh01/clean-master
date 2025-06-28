import { useState, useEffect } from 'react';
import { X, Settings, DollarSign, Clock, Save, AlertTriangle } from 'lucide-react';

const ServiceModal = ({ isOpen, onClose, service, mode, onSave, onDelete }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: '',
    isActive: true,
    features: []
  });

  const [errors, setErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (service && (mode === 'edit' || mode === 'view')) {
      setFormData({
        name: service.name || '',
        description: service.description || '',
        price: service.price || '',
        duration: service.duration || '',
        category: service.category || 'تنظيف',
        isActive: service.isActive !== undefined ? service.isActive : true,
        features: service.features || []
      });
    } else if (mode === 'add') {
      setFormData({
        name: '',
        description: '',
        price: '',
        duration: '',
        category: 'تنظيف',
        isActive: true,
        features: []
      });
    }
  }, [service, mode, isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFeatureAdd = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const handleFeatureChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const handleFeatureRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'اسم الخدمة مطلوب';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'وصف الخدمة مطلوب';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'السعر مطلوب';
    }

    if (!formData.duration.trim()) {
      newErrors.duration = 'مدة الخدمة مطلوبة';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (mode === 'view') return;

    if (validateForm()) {
      const serviceData = {
        ...formData,
        id: service?.id || Date.now(),
        bookings: service?.bookings || 0,
        revenue: service?.revenue || '0 ريال'
      };
      
      onSave(serviceData, mode);
      onClose();
    }
  };

  const handleDelete = () => {
    if (service) {
      onDelete(service.id || service.name);
      onClose();
    }
  };

  const categories = [
    'تنظيف',
    'تنظيف منازل',
    'تنظيف مكاتب',
    'تنظيف سيارات',
    'تنظيف خاص',
    'صيانة'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Settings className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 font-arabic">
              {mode === 'add' && 'إضافة خدمة جديدة'}
              {mode === 'edit' && 'تعديل الخدمة'}
              {mode === 'view' && 'تفاصيل الخدمة'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <form className="space-y-6">
            
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Service Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  اسم الخدمة *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={mode === 'view'}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                    mode === 'view' ? 'bg-gray-50' : 'bg-white'
                  } ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="مثل: تنظيف منزل شامل"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 font-arabic">{errors.name}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  السعر *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    disabled={mode === 'view'}
                    className={`w-full px-4 py-3 pl-10 rtl:pr-10 rtl:pl-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      mode === 'view' ? 'bg-gray-50' : 'bg-white'
                    } ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="150 ريال"
                  />
                  <DollarSign className="w-5 h-5 absolute left-3 rtl:right-3 top-3.5 text-gray-400" />
                </div>
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1 font-arabic">{errors.price}</p>
                )}
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  مدة الخدمة *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    disabled={mode === 'view'}
                    className={`w-full px-4 py-3 pl-10 rtl:pr-10 rtl:pl-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                      mode === 'view' ? 'bg-gray-50' : 'bg-white'
                    } ${errors.duration ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="2-3 ساعات"
                  />
                  <Clock className="w-5 h-5 absolute left-3 rtl:right-3 top-3.5 text-gray-400" />
                </div>
                {errors.duration && (
                  <p className="text-red-500 text-sm mt-1 font-arabic">{errors.duration}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  الفئة
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  disabled={mode === 'view'}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                    mode === 'view' ? 'bg-gray-50' : 'bg-white border-gray-300'
                  }`}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  حالة الخدمة
                </label>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    disabled={mode === 'view'}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 font-arabic">
                    الخدمة متاحة للحجز
                  </span>
                </div>
              </div>

            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                وصف الخدمة *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                disabled={mode === 'view'}
                rows={4}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                  mode === 'view' ? 'bg-gray-50' : 'bg-white'
                } ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="اكتب وصفاً تفصيلياً للخدمة..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1 font-arabic">{errors.description}</p>
              )}
            </div>

            {/* Features */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700 font-arabic">
                  ميزات الخدمة
                </label>
                {mode !== 'view' && (
                  <button
                    type="button"
                    onClick={handleFeatureAdd}
                    className="text-sm text-blue-600 hover:text-blue-700 font-arabic"
                  >
                    + إضافة ميزة
                  </button>
                )}
              </div>
              
              <div className="space-y-3">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      disabled={mode === 'view'}
                      className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                        mode === 'view' ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
                      }`}
                      placeholder="مثل: تنظيف جميع الغرف"
                    />
                    {mode !== 'view' && (
                      <button
                        type="button"
                        onClick={() => handleFeatureRemove(index)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                
                {formData.features.length === 0 && mode === 'view' && (
                  <p className="text-gray-500 text-sm font-arabic">لا توجد ميزات محددة</p>
                )}
              </div>
            </div>

            {/* Service Stats (View Mode Only) */}
            {mode === 'view' && service && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4 font-arabic">إحصائيات الخدمة</h3>
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <p className="text-3xl font-bold text-blue-600">{service.bookings}</p>
                    <p className="text-sm text-gray-600 font-arabic">حجز</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-green-600">{service.revenue}</p>
                    <p className="text-sm text-gray-600 font-arabic">إجمالي الإيرادات</p>
                  </div>
                </div>
              </div>
            )}

          </form>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <h3 className="text-lg font-bold text-gray-900 font-arabic">تأكيد الحذف</h3>
              </div>
              <p className="text-gray-600 mb-6 font-arabic">
                هل أنت متأكد من حذف هذه الخدمة؟ لا يمكن التراجع عن هذا الإجراء.
              </p>
              <div className="flex space-x-3 rtl:space-x-reverse">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 font-arabic"
                >
                  إلغاء
                </button>
                <button
                  onClick={() => {
                    handleDelete();
                    setShowDeleteConfirm(false);
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-arabic"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50 rounded-b-2xl">
          
          {/* Delete Button (Edit/View Mode Only) */}
          {mode !== 'add' && (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-6 py-2 text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 font-arabic"
            >
              حذف الخدمة
            </button>
          )}
          
          {mode === 'add' && <div></div>}

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 font-arabic"
            >
              إلغاء
            </button>
            
            {mode !== 'view' && (
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center space-x-2 rtl:space-x-reverse font-arabic"
              >
                <Save className="w-4 h-4" />
                <span>{mode === 'add' ? 'إضافة الخدمة' : 'حفظ التغييرات'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal; 