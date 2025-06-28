import { useState, useEffect } from 'react';
import { X, Settings, DollarSign, Clock, Save, AlertTriangle } from 'lucide-react';

const ServiceModal = ({ isOpen, onClose, service, mode, onSave, onDelete }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    duration: '',
    category: '',
    active: true,
    features: []
  });

  const [errors, setErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (service && mode === 'edit') {
      setFormData({
        id: service.id || '',
        name: service.name || '',
        description: service.description || '',
        price: service.price || '',
        duration: service.duration || '',
        category: service.category || 'تنظيف',
        active: service.active !== undefined ? service.active : true,
        features: service.features || []
      });
    } else if (mode === 'add') {
      setFormData({
        id: `SRV${Date.now()}`,
        name: '',
        description: '',
        price: '',
        duration: '',
        category: 'تنظيف',
        active: true,
        features: []
      });
    }
  }, [service, mode, isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

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

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'السعر مطلوب ويجب أن يكون أكبر من صفر';
    }

    if (!formData.duration || formData.duration <= 0) {
      newErrors.duration = 'المدة مطلوبة ويجب أن تكون أكبر من صفر';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (mode === 'view') return;

    if (validateForm()) {
      const serviceData = {
        ...formData,
        price: Number(formData.price),
        duration: Number(formData.duration)
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
    'صيانة',
    'تطهير',
    'تنظيم',
    'أخرى'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Settings className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 font-arabic">
                {mode === 'add' && 'خدمة جديدة'}
                {mode === 'edit' && 'تعديل الخدمة'}
              </h2>
              {formData.id && (
                <p className="text-sm text-gray-500">{formData.id}</p>
              )}
            </div>
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
            
            {/* Service Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                اسم الخدمة *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="مثال: تنظيف المنزل الشامل"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 font-arabic">{errors.name}</p>
              )}
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
                rows={3}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="وصف مفصل للخدمة وما تشمله"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1 font-arabic">{errors.description}</p>
              )}
            </div>

            {/* Price & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  السعر (ر.س) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pl-10 rtl:pr-10 rtl:pl-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="150"
                    min="0"
                  />
                  <DollarSign className="w-5 h-5 absolute left-3 rtl:right-3 top-3.5 text-gray-400" />
                </div>
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1 font-arabic">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  المدة (دقيقة) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pl-10 rtl:pr-10 rtl:pl-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.duration ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="120"
                    min="0"
                  />
                  <Clock className="w-5 h-5 absolute left-3 rtl:right-3 top-3.5 text-gray-400" />
                </div>
                {errors.duration && (
                  <p className="text-red-500 text-sm mt-1 font-arabic">{errors.duration}</p>
                )}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                التصنيف
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Active Status */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-sm font-medium text-gray-700 font-arabic">
                الخدمة نشطة ومتاحة للحجز
              </label>
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
        <div className="flex items-center justify-end space-x-4 rtl:space-x-reverse p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 font-arabic"
          >
            إلغاء
          </button>
          <button
            onClick={handleSave}
            className="btn-primary flex items-center space-x-2 rtl:space-x-reverse"
          >
            <Save className="w-4 h-4" />
            <span>حفظ</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal; 