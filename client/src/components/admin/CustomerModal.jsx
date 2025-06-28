import { useState, useEffect } from 'react';
import { X, User, Save, Mail, Phone, MapPin } from 'lucide-react';

const CustomerModal = ({ customer, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    totalBookings: 0,
    joinDate: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  
  // Determine mode based on customer prop
  const mode = customer ? 'edit' : 'add';

  useEffect(() => {
    if (customer && mode === 'edit') {
      setFormData({
        id: customer.id || '',
        name: customer.name || '',
        email: customer.email || '',
        phone: customer.phone || '',
        address: customer.address || '',
        totalBookings: customer.totalBookings || 0,
        joinDate: customer.joinDate || new Date().toISOString().split('T')[0],
        notes: customer.notes || ''
      });
    } else if (mode === 'add') {
      setFormData({
        id: `CUST${Date.now()}`,
        name: '',
        email: '',
        phone: '',
        address: '',
        totalBookings: 0,
        joinDate: new Date().toISOString().split('T')[0],
        notes: ''
      });
    }
  }, [customer, mode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

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
      newErrors.name = 'اسم العميل مطلوب';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const customerData = {
        ...formData,
        totalBookings: Number(formData.totalBookings)
      };
      
      onSave(customerData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 font-arabic">
                {mode === 'add' && 'عميل جديد'}
                {mode === 'edit' && 'تعديل بيانات العميل'}
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
            
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                الاسم الكامل *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pl-10 rtl:pr-10 rtl:pl-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="أحمد محمد العلي"
                />
                <User className="w-5 h-5 absolute left-3 rtl:right-3 top-3.5 text-gray-400" />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 font-arabic">{errors.name}</p>
              )}
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className={`w-full px-4 py-3 pl-10 rtl:pr-10 rtl:pl-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="ahmed@example.com"
                    dir="ltr"
                  />
                  <Mail className="w-5 h-5 absolute left-3 rtl:right-3 top-3.5 text-gray-400" />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 font-arabic">{errors.email}</p>
                )}
              </div>

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
                    className={`w-full px-4 py-3 pl-10 rtl:pr-10 rtl:pl-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+966 5X XXX XXXX"
                    dir="ltr"
                  />
                  <Phone className="w-5 h-5 absolute left-3 rtl:right-3 top-3.5 text-gray-400" />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 font-arabic">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                العنوان
              </label>
              <div className="relative">
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 pl-10 rtl:pr-10 rtl:pl-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic"
                  placeholder="العنوان التفصيلي"
                />
                <MapPin className="w-5 h-5 absolute left-3 rtl:right-3 top-3.5 text-gray-400" />
              </div>
            </div>

            {/* Join Date & Total Bookings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  تاريخ الانضمام
                </label>
                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  إجمالي الحجوزات
                </label>
                <input
                  type="number"
                  name="totalBookings"
                  value={formData.totalBookings}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  readOnly={mode === 'edit'}
                />
              </div>
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
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic"
                placeholder="أي ملاحظات حول العميل"
              />
            </div>
          </form>
        </div>

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

export default CustomerModal; 