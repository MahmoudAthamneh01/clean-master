import { useState, useEffect } from 'react';
import { X, Calendar, User, MapPin, Clock, DollarSign, Phone, Save } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, booking, mode, onSave, customers, services }) => {
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

  useEffect(() => {
    if (booking && (mode === 'edit' || mode === 'view')) {
      setFormData({
        id: booking.id || '',
        customer: booking.customer || '',
        customerName: booking.customerName || '',
        customerPhone: booking.phone || '',
        service: booking.service || '',
        scheduledDate: booking.scheduledDate || '',
        scheduledTime: booking.time || '',
        address: booking.address || '',
        status: booking.status || 'pending',
        amount: booking.amount || '',
        notes: booking.notes || '',
        assignedStaff: booking.assignedStaff || ''
      });
    } else if (mode === 'add') {
      const newBookingId = `#BK${String(Date.now()).slice(-3)}`;
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
  }, [booking, mode, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for customer selection
    if (name === 'customer') {
      const selectedCustomer = customers?.find(c => c.name === value);
      setFormData(prev => ({
        ...prev,
        customer: value,
        customerName: value,
        customerPhone: selectedCustomer?.phone || ''
      }));
    } else if (name === 'service') {
      const selectedService = services?.find(s => s.name === value);
      setFormData(prev => ({
        ...prev,
        service: value,
        amount: selectedService?.price || ''
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
    if (mode === 'view') return;

    if (validateForm()) {
      const bookingData = {
        ...formData,
        id: formData.id || `#BK${Date.now()}`,
        time: formData.scheduledTime,
        phone: formData.customerPhone
      };
      
      onSave(bookingData, mode);
      onClose();
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

  if (!isOpen) return null;

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
                {mode === 'view' && 'تفاصيل الحجز'}
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
                {mode === 'add' ? (
                  <select
                    name="customer"
                    value={formData.customer}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                      errors.customer ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">اختر العميل</option>
                    {customers?.map((customer) => (
                      <option key={customer.id} value={customer.name}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 rounded-xl">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-semibold text-gray-900 font-arabic">{formData.customerName}</p>
                      <p className="text-sm text-gray-600">{formData.customerPhone}</p>
                    </div>
                  </div>
                )}
                {errors.customer && (
                  <p className="text-red-500 text-sm mt-1 font-arabic">{errors.customer}</p>
                )}
              </div>

              {/* Service */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  الخدمة *
                </label>
                {mode === 'add' ? (
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                      errors.service ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">اختر الخدمة</option>
                    {services?.map((service, index) => (
                      <option key={index} value={service.name}>
                        {service.name} - {service.price}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="font-semibold text-gray-900 font-arabic">{formData.service}</p>
                  </div>
                )}
                {errors.service && (
                  <p className="text-red-500 text-sm mt-1 font-arabic">{errors.service}</p>
                )}
              </div>

            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  التاريخ *
                </label>
                <input
                  type="date"
                  name="scheduledDate"
                  value={formData.scheduledDate}
                  onChange={handleInputChange}
                  disabled={mode === 'view'}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    mode === 'view' ? 'bg-gray-50' : 'bg-white'
                  } ${errors.scheduledDate ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.scheduledDate && (
                  <p className="text-red-500 text-sm mt-1 font-arabic">{errors.scheduledDate}</p>
                )}
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  الوقت *
                </label>
                <input
                  type="time"
                  name="scheduledTime"
                  value={formData.scheduledTime}
                  onChange={handleInputChange}
                  disabled={mode === 'view'}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    mode === 'view' ? 'bg-gray-50' : 'bg-white'
                  } ${errors.scheduledTime ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.scheduledTime && (
                  <p className="text-red-500 text-sm mt-1 font-arabic">{errors.scheduledTime}</p>
                )}
              </div>

            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                العنوان *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={mode === 'view'}
                  className={`w-full px-4 py-3 pl-10 rtl:pr-10 rtl:pl-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                    mode === 'view' ? 'bg-gray-50' : 'bg-white'
                  } ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="أدخل العنوان التفصيلي"
                />
                <MapPin className="w-5 h-5 absolute left-3 rtl:right-3 top-3.5 text-gray-400" />
              </div>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1 font-arabic">{errors.address}</p>
              )}
            </div>

            {/* Status & Amount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  حالة الحجز
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  disabled={mode === 'view'}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                    mode === 'view' ? 'bg-gray-50' : 'bg-white border-gray-300'
                  }`}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  المبلغ
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    disabled={mode === 'view'}
                    className={`w-full px-4 py-3 pl-10 rtl:pr-10 rtl:pl-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      mode === 'view' ? 'bg-gray-50' : 'bg-white border-gray-300'
                    }`}
                    placeholder="150 ريال"
                  />
                  <DollarSign className="w-5 h-5 absolute left-3 rtl:right-3 top-3.5 text-gray-400" />
                </div>
              </div>

            </div>

            {/* Assigned Staff */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                الفريق المسؤول
              </label>
              <select
                name="assignedStaff"
                value={formData.assignedStaff}
                onChange={handleInputChange}
                disabled={mode === 'view'}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                  mode === 'view' ? 'bg-gray-50' : 'bg-white border-gray-300'
                }`}
              >
                <option value="">اختر الفريق</option>
                {staffMembers.map((staff, index) => (
                  <option key={index} value={staff}>
                    {staff}
                  </option>
                ))}
              </select>
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
                placeholder="أي ملاحظات خاصة بالحجز..."
              />
            </div>

            {/* Status Timeline (View Mode Only) */}
            {mode === 'view' && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4 font-arabic">تتبع حالة الحجز</h3>
                <div className="space-y-3">
                  {statusOptions.map((status, index) => (
                    <div key={status.value} className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className={`w-4 h-4 rounded-full ${
                        formData.status === status.value 
                          ? 'bg-blue-600' 
                          : statusOptions.findIndex(s => s.value === formData.status) > index
                            ? 'bg-green-500'
                            : 'bg-gray-300'
                      }`}></div>
                      <span className={`text-sm font-arabic ${
                        formData.status === status.value ? 'font-semibold text-blue-600' : 'text-gray-600'
                      }`}>
                        {status.label}
                      </span>
                    </div>
                  ))}
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
              <span>{mode === 'add' ? 'إنشاء حجز' : 'حفظ التغييرات'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal; 