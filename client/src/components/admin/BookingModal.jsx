import { useState, useEffect } from 'react';
import { X, Calendar, User, MapPin, Clock, DollarSign, Phone, Save } from 'lucide-react';

const BookingModal = ({ booking, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: '',
    customer: '',
    customerName: '',
    customerPhone: '',
    service: '',
    scheduledDate: '',
    scheduledTime: '',
    address: '',
    status: 'pending',
    amount: '',
    notes: '',
    assignedStaff: ''
  });

  const [errors, setErrors] = useState({});
  
  // Determine mode based on booking prop
  const mode = booking ? 'edit' : 'add';

  useEffect(() => {
    if (booking && mode === 'edit') {
      setFormData({
        id: booking.id || '',
        customer: booking.customer || '',
        customerName: booking.customer || '',
        customerPhone: booking.phone || '',
        service: booking.service || '',
        scheduledDate: booking.date || '',
        scheduledTime: booking.time || '',
        address: booking.address || '',
        status: booking.status || 'pending',
        amount: booking.amount || '',
        notes: booking.notes || '',
        assignedStaff: booking.assignedStaff || ''
      });
    } else if (mode === 'add') {
      const newBookingId = `#BK${String(Date.now()).slice(-6)}`;
      setFormData({
        id: newBookingId,
        customer: '',
        customerName: '',
        customerPhone: '',
        service: '',
        scheduledDate: '',
        scheduledTime: '',
        address: '',
        status: 'pending',
        amount: '',
        notes: '',
        assignedStaff: ''
      });
    }
  }, [booking, mode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for service selection
    if (name === 'service') {
      const servicePrices = {
        'تنظيف المنزل': 250,
        'تنظيف المكتب': 400,
        'التنظيف العميق': 500,
        'غسيل السيارات': 150
      };
      
      setFormData(prev => ({
        ...prev,
        service: value,
        amount: servicePrices[value] || ''
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

    if (!formData.customer.trim()) {
      newErrors.customer = 'العميل مطلوب';
    }

    if (!formData.service.trim()) {
      newErrors.service = 'الخدمة مطلوبة';
    }

    if (!formData.scheduledDate) {
      newErrors.scheduledDate = 'تاريخ الخدمة مطلوب';
    }

    if (!formData.scheduledTime) {
      newErrors.scheduledTime = 'وقت الخدمة مطلوب';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'العنوان مطلوب';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const bookingData = {
        ...formData,
        id: formData.id || `#BK${Date.now()}`,
        date: formData.scheduledDate,
        time: formData.scheduledTime,
        phone: formData.customerPhone
      };
      
      onSave(bookingData);
    }
  };

  const statusOptions = [
    { value: 'pending', label: 'في الانتظار', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'confirmed', label: 'مؤكد', color: 'bg-blue-100 text-blue-800' },
    { value: 'in-progress', label: 'جاري العمل', color: 'bg-purple-100 text-purple-800' },
    { value: 'completed', label: 'مكتمل', color: 'bg-green-100 text-green-800' },
    { value: 'cancelled', label: 'ملغي', color: 'bg-red-100 text-red-800' }
  ];

  const staffMembers = [
    'فريق التنظيف الأول',
    'فريق التنظيف الثاني',
    'فريق التنظيف الثالث',
    'أحمد محمد - منظف متخصص',
    'فاطمة علي - منظفة محترفة'
  ];

  const serviceOptions = [
    'تنظيف المنزل',
    'تنظيف المكتب',
    'التنظيف العميق',
    'غسيل السيارات'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 font-arabic">
                {mode === 'add' && 'حجز جديد'}
                {mode === 'edit' && 'تعديل الحجز'}
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
            
            {/* Customer & Service */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Customer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  العميل *
                </label>
                <input
                  type="text"
                  name="customer"
                  value={formData.customer}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                    errors.customer ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="اسم العميل"
                />
                {errors.customer && (
                  <p className="text-red-500 text-sm mt-1 font-arabic">{errors.customer}</p>
                )}
              </div>

              {/* Service */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  الخدمة *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                    errors.service ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">اختر الخدمة</option>
                  {serviceOptions.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
                {errors.service && (
                  <p className="text-red-500 text-sm mt-1 font-arabic">{errors.service}</p>
                )}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  التاريخ *
                </label>
                <input
                  type="date"
                  name="scheduledDate"
                  value={formData.scheduledDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.scheduledDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.scheduledDate && (
                  <p className="text-red-500 text-sm mt-1 font-arabic">{errors.scheduledDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  الوقت *
                </label>
                <input
                  type="time"
                  name="scheduledTime"
                  value={formData.scheduledTime}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.scheduledTime ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.scheduledTime && (
                  <p className="text-red-500 text-sm mt-1 font-arabic">{errors.scheduledTime}</p>
                )}
              </div>
            </div>

            {/* Phone & Amount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+966 5X XXX XXXX"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  المبلغ (ر.س)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                العنوان *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="أدخل العنوان بالتفصيل"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1 font-arabic">{errors.address}</p>
              )}
            </div>

            {/* Status & Staff */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  الحالة
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  الفريق المكلف
                </label>
                <select
                  name="assignedStaff"
                  value={formData.assignedStaff}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic"
                >
                  <option value="">اختر الفريق</option>
                  {staffMembers.map((staff) => (
                    <option key={staff} value={staff}>{staff}</option>
                  ))}
                </select>
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
                placeholder="أي ملاحظات إضافية"
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

export default BookingModal; 