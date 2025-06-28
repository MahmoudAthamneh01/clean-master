import { useState, useEffect } from 'react';
import { X, User, Mail, Phone, MapPin, Save, Edit } from 'lucide-react';

const CustomerModal = ({ isOpen, onClose, customer, mode, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      district: '',
      postalCode: ''
    },
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (customer && (mode === 'edit' || mode === 'view')) {
      setFormData({
        name: customer.name || '',
        email: customer.email || '',
        phone: customer.phone || '',
        address: customer.address || {
          street: '',
          city: '',
          district: '',
          postalCode: ''
        },
        notes: customer.notes || ''
      });
    } else if (mode === 'add') {
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: {
          street: '',
          city: '',
          district: '',
          postalCode: ''
        },
        notes: ''
      });
    }
  }, [customer, mode, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (!/^(\+966|966|0)?[5-9][0-9]{8}$/.test(formData.phone)) {
      newErrors.phone = 'رقم الهاتف غير صحيح';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (mode === 'view') return;

    if (validateForm()) {
      const customerData = {
        ...formData,
        id: customer?.id || Date.now(),
        bookings: customer?.bookings || 0,
        totalSpent: customer?.totalSpent || '0 ريال',
        lastBooking: customer?.lastBooking || new Date().toISOString().split('T')[0]
      };
      
      onSave(customerData, mode);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 font-arabic">
              {mode === 'add' && 'إضافة عميل جديد'}
              {mode === 'edit' && 'تعديل العميل'}
              {mode === 'view' && 'تفاصيل العميل'}
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
              
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  الاسم الكامل *
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
                  placeholder="أدخل الاسم الكامل"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 font-arabic">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  البريد الإلكتروني *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={mode === 'view'}
                    className={`w-full px-4 py-3 pl-10 rtl:pr-10 rtl:pl-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      mode === 'view' ? 'bg-gray-50' : 'bg-white'
                    } ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="example@email.com"
                  />
                  <Mail className="w-5 h-5 absolute left-3 rtl:right-3 top-3.5 text-gray-400" />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 font-arabic">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  رقم الهاتف *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={mode === 'view'}
                    className={`w-full px-4 py-3 pl-10 rtl:pr-10 rtl:pl-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      mode === 'view' ? 'bg-gray-50' : 'bg-white'
                    } ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="+966501234567"
                  />
                  <Phone className="w-5 h-5 absolute left-3 rtl:right-3 top-3.5 text-gray-400" />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 font-arabic">{errors.phone}</p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  المدينة
                </label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  disabled={mode === 'view'}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                    mode === 'view' ? 'bg-gray-50' : 'bg-white border-gray-300'
                  }`}
                  placeholder="الرياض"
                />
              </div>

            </div>

            {/* Address */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 font-arabic">
                العنوان
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="address.district"
                  value={formData.address.district}
                  onChange={handleInputChange}
                  disabled={mode === 'view'}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                    mode === 'view' ? 'bg-gray-50' : 'bg-white border-gray-300'
                  }`}
                  placeholder="الحي"
                />
                
                <input
                  type="text"
                  name="address.postalCode"
                  value={formData.address.postalCode}
                  onChange={handleInputChange}
                  disabled={mode === 'view'}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    mode === 'view' ? 'bg-gray-50' : 'bg-white border-gray-300'
                  }`}
                  placeholder="الرمز البريدي"
                />
              </div>
              
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleInputChange}
                disabled={mode === 'view'}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                  mode === 'view' ? 'bg-gray-50' : 'bg-white border-gray-300'
                }`}
                placeholder="الشارع والعنوان التفصيلي"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                ملاحظات
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                disabled={mode === 'view'}
                rows={3}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                  mode === 'view' ? 'bg-gray-50' : 'bg-white border-gray-300'
                }`}
                placeholder="أي ملاحظات إضافية..."
              />
            </div>

            {/* Customer Stats (View Mode Only) */}
            {mode === 'view' && customer && (
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3 font-arabic">إحصائيات العميل</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{customer.bookings}</p>
                    <p className="text-sm text-gray-600 font-arabic">حجز</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{customer.totalSpent}</p>
                    <p className="text-sm text-gray-600 font-arabic">إجمالي الإنفاق</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-600">{customer.lastBooking}</p>
                    <p className="text-sm text-gray-600 font-arabic">آخر حجز</p>
                  </div>
                </div>
              </div>
            )}

          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 rtl:space-x-reverse p-6 border-t bg-gray-50 rounded-b-2xl">
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
              <span>{mode === 'add' ? 'إضافة' : 'حفظ'}</span>
            </button>
          )}
          
          {mode === 'view' && (
            <button
              onClick={() => {
                // Switch to edit mode - this would be handled by parent component
                onClose();
              }}
              className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 flex items-center space-x-2 rtl:space-x-reverse font-arabic"
            >
              <Edit className="w-4 h-4" />
              <span>تعديل</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerModal; 