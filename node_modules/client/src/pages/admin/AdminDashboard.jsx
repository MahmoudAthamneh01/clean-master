import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Star,
  Home,
  Car,
  Building2,
  Settings,
  BarChart3,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  Save,
  User,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Modal states
  const [customerModal, setCustomerModal] = useState({ isOpen: false, mode: 'add', data: null });
  const [bookingModal, setBookingModal] = useState({ isOpen: false, mode: 'add', data: null });
  const [serviceModal, setServiceModal] = useState({ isOpen: false, mode: 'add', data: null });
  
  // Data states
  const [customersData, setCustomersData] = useState([]);
  const [bookingsData, setBookingsData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  
  // Search states
  const [customerSearch, setCustomerSearch] = useState('');
  const [bookingFilter, setBookingFilter] = useState('all');

  // Mock data
  const stats = [
    {
      title: "إجمالي العملاء",
      value: "524",
      icon: <Users className="w-8 h-8" />,
      change: "+12%",
      positive: true
    },
    {
      title: "الحجوزات اليوم",
      value: "18",
      icon: <Calendar className="w-8 h-8" />,
      change: "+5",
      positive: true
    },
    {
      title: "الإيرادات الشهرية",
      value: "45,280 ريال",
      icon: <DollarSign className="w-8 h-8" />,
      change: "+8.2%",
      positive: true
    },
    {
      title: "معدل الرضا",
      value: "4.9/5",
      icon: <Star className="w-8 h-8" />,
      change: "+0.1",
      positive: true
    }
  ];

  const recentBookings = [
    {
      id: "#BK001",
      customer: "أحمد محمد",
      service: "تنظيف منزل",
      status: "completed",
      amount: "150 ريال",
      time: "10:30 ص",
      phone: "+966501234567",
      address: "الرياض - حي النرجس"
    },
    {
      id: "#BK002", 
      customer: "فاطمة علي",
      service: "تنظيف مكتب",
      status: "in-progress",
      amount: "200 ريال",
      time: "2:00 م",
      phone: "+966507654321",
      address: "الرياض - حي العليا"
    },
    {
      id: "#BK003",
      customer: "محمد السعد",
      service: "تنظيف سيارة",
      status: "pending",
      amount: "80 ريال",
      time: "4:30 م",
      phone: "+966512345678",
      address: "الرياض - حي الملز"
    }
  ];

  const customers = [
    {
      id: 1,
      name: "أحمد محمد",
      email: "ahmed@example.com",
      phone: "+966501234567",
      bookings: 5,
      totalSpent: "750 ريال",
      lastBooking: "2024-01-15"
    },
    {
      id: 2,
      name: "فاطمة علي",
      email: "fatima@example.com",
      phone: "+966507654321",
      bookings: 3,
      totalSpent: "600 ريال",
      lastBooking: "2024-01-10"
    },
    {
      id: 3,
      name: "محمد السعد",
      email: "mohamed@example.com",
      phone: "+966512345678",
      bookings: 8,
      totalSpent: "1200 ريال",
      lastBooking: "2024-01-12"
    }
  ];

  const services = [
    {
      name: "تنظيف المنازل",
      icon: <Home className="w-6 h-6" />,
      bookings: 156,
      revenue: "23,400 ريال",
      price: "150 ريال",
      duration: "2-3 ساعات"
    },
    {
      name: "تنظيف المكاتب",
      icon: <Building2 className="w-6 h-6" />,
      bookings: 89,
      revenue: "17,800 ريال",
      price: "200 ريال",
      duration: "3-4 ساعات"
    },
    {
      name: "تنظيف السيارات",
      icon: <Car className="w-6 h-6" />,
      bookings: 234,
      revenue: "18,720 ريال",
      price: "80 ريال",
      duration: "1-2 ساعة"
    }
  ];

  const navigationTabs = [
    { id: 'dashboard', label: 'الرئيسية', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'customers', label: 'العملاء', icon: <Users className="w-5 h-5" /> },
    { id: 'bookings', label: 'الحجوزات', icon: <Calendar className="w-5 h-5" /> },
    { id: 'services', label: 'الخدمات', icon: <Settings className="w-5 h-5" /> },
  ];

  // Initialize data
  useEffect(() => {
    setCustomersData(customers);
    setBookingsData(recentBookings);
    setServicesData(services);
  }, []);

  // Customer functions
  const handleCustomerSave = (customerData, mode) => {
    if (mode === 'add') {
      setCustomersData(prev => [...prev, customerData]);
    } else if (mode === 'edit') {
      setCustomersData(prev => prev.map(c => c.id === customerData.id ? customerData : c));
    }
    setCustomerModal({ isOpen: false, mode: 'add', data: null });
  };

  const handleCustomerDelete = (customerId) => {
    setCustomersData(prev => prev.filter(c => c.id !== customerId));
  };

  // Booking functions
  const handleBookingSave = (bookingData, mode) => {
    if (mode === 'add') {
      setBookingsData(prev => [...prev, bookingData]);
    } else if (mode === 'edit') {
      setBookingsData(prev => prev.map(b => b.id === bookingData.id ? bookingData : b));
    }
    setBookingModal({ isOpen: false, mode: 'add', data: null });
  };

  const handleBookingDelete = (bookingId) => {
    setBookingsData(prev => prev.filter(b => b.id !== bookingId));
  };

  // Service functions
  const handleServiceSave = (serviceData, mode) => {
    if (mode === 'add') {
      setServicesData(prev => [...prev, serviceData]);
    } else if (mode === 'edit') {
      setServicesData(prev => prev.map(s => (s.id || s.name) === (serviceData.id || serviceData.name) ? serviceData : s));
    }
    setServiceModal({ isOpen: false, mode: 'add', data: null });
  };

  const handleServiceDelete = (serviceId) => {
    setServicesData(prev => prev.filter(s => (s.id || s.name) !== serviceId));
  };

  // Filter functions
  const filteredCustomers = customersData.filter(customer =>
    customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    customer.email.toLowerCase().includes(customerSearch.toLowerCase()) ||
    customer.phone.includes(customerSearch)
  );

  const filteredBookings = bookingsData.filter(booking =>
    bookingFilter === 'all' || booking.status === bookingFilter
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'مكتمل';
      case 'in-progress': return 'جاري العمل';
      case 'pending': return 'في الانتظار';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  // Simple Modal Component
  const SimpleModal = ({ isOpen, onClose, title, children, size = 'medium' }) => {
    if (!isOpen) return null;
    
    const sizeClasses = {
      small: 'max-w-md',
      medium: 'max-w-2xl',
      large: 'max-w-4xl'
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className={`bg-white rounded-2xl ${sizeClasses[size]} w-full max-h-[90vh] overflow-y-auto`}>
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900 font-arabic">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  // Customer Form Component
  const CustomerForm = ({ customer, mode, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      name: customer?.name || '',
      email: customer?.email || '',
      phone: customer?.phone || '',
      address: customer?.address || '',
      notes: customer?.notes || ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    };

    const validate = () => {
      const newErrors = {};
      if (!formData.name.trim()) newErrors.name = 'الاسم مطلوب';
      if (!formData.email.trim()) newErrors.email = 'البريد الإلكتروني مطلوب';
      if (!formData.phone.trim()) newErrors.phone = 'رقم الهاتف مطلوب';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (validate()) {
        const customerData = {
          ...formData,
          id: customer?.id || Date.now(),
          bookings: customer?.bookings || 0,
          totalSpent: customer?.totalSpent || '0 ريال',
          lastBooking: customer?.lastBooking || new Date().toISOString().split('T')[0]
        };
        onSave(customerData, mode);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">الاسم *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={mode === 'view'}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                mode === 'view' ? 'bg-gray-50' : 'bg-white'
              } ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="أدخل الاسم الكامل"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1 font-arabic">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">البريد الإلكتروني *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={mode === 'view'}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                mode === 'view' ? 'bg-gray-50' : 'bg-white'
              } ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="example@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 font-arabic">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">رقم الهاتف *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={mode === 'view'}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                mode === 'view' ? 'bg-gray-50' : 'bg-white'
              } ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="+966501234567"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1 font-arabic">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">العنوان</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={mode === 'view'}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                mode === 'view' ? 'bg-gray-50' : 'bg-white border-gray-300'
              }`}
              placeholder="العنوان التفصيلي"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">ملاحظات</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            disabled={mode === 'view'}
            rows={3}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
              mode === 'view' ? 'bg-gray-50' : 'bg-white border-gray-300'
            }`}
            placeholder="أي ملاحظات إضافية..."
          />
        </div>

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

        <div className="flex justify-end space-x-3 rtl:space-x-reverse pt-6 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 font-arabic"
          >
            إلغاء
          </button>
          {mode !== 'view' && (
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center space-x-2 rtl:space-x-reverse font-arabic"
            >
              <Save className="w-4 h-4" />
              <span>{mode === 'add' ? 'إضافة' : 'حفظ'}</span>
            </button>
          )}
        </div>
      </form>
    );
  };

  // Booking Form Component
  const BookingForm = ({ booking, mode, customers, services, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      customer: booking?.customer || '',
      customerId: booking?.customerId || '',
      service: booking?.service || '',
      serviceId: booking?.serviceId || '',
      date: booking?.date || '',
      time: booking?.time || '',
      address: booking?.address || '',
      phone: booking?.phone || '',
      amount: booking?.amount || '',
      status: booking?.status || 'pending',
      notes: booking?.notes || ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Handle customer selection
      if (name === 'customerId') {
        const selectedCustomer = customers.find(c => c.id == value);
        if (selectedCustomer) {
          setFormData(prev => ({
            ...prev,
            customer: selectedCustomer.name,
            phone: selectedCustomer.phone,
            address: selectedCustomer.address || ''
          }));
        }
      }

      // Handle service selection
      if (name === 'serviceId') {
        const selectedService = services.find(s => (s.id || s.name) == value);
        if (selectedService) {
          setFormData(prev => ({
            ...prev,
            service: selectedService.name,
            amount: selectedService.price
          }));
        }
      }

      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    };

    const validate = () => {
      const newErrors = {};
      if (!formData.customerId) newErrors.customerId = 'اختيار العميل مطلوب';
      if (!formData.serviceId) newErrors.serviceId = 'اختيار الخدمة مطلوب';
      if (!formData.date) newErrors.date = 'التاريخ مطلوب';
      if (!formData.time) newErrors.time = 'الوقت مطلوب';
      if (!formData.address.trim()) newErrors.address = 'العنوان مطلوب';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (validate()) {
        const bookingData = {
          ...formData,
          id: booking?.id || `#BK${String(Date.now()).slice(-3)}`,
        };
        onSave(bookingData, mode);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">العميل *</label>
            <select
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              disabled={mode === 'view'}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                mode === 'view' ? 'bg-gray-50' : 'bg-white'
              } ${errors.customerId ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">اختر العميل</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} - {customer.phone}
                </option>
              ))}
            </select>
            {errors.customerId && <p className="text-red-500 text-sm mt-1 font-arabic">{errors.customerId}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">الخدمة *</label>
            <select
              name="serviceId"
              value={formData.serviceId}
              onChange={handleChange}
              disabled={mode === 'view'}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                mode === 'view' ? 'bg-gray-50' : 'bg-white'
              } ${errors.serviceId ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">اختر الخدمة</option>
              {services.map((service, index) => (
                <option key={service.id || service.name || index} value={service.id || service.name}>
                  {service.name} - {service.price}
                </option>
              ))}
            </select>
            {errors.serviceId && <p className="text-red-500 text-sm mt-1 font-arabic">{errors.serviceId}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">التاريخ *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              disabled={mode === 'view'}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                mode === 'view' ? 'bg-gray-50' : 'bg-white'
              } ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1 font-arabic">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">الوقت *</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              disabled={mode === 'view'}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                mode === 'view' ? 'bg-gray-50' : 'bg-white'
              } ${errors.time ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.time && <p className="text-red-500 text-sm mt-1 font-arabic">{errors.time}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">المبلغ</label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              disabled={mode === 'view'}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                mode === 'view' ? 'bg-gray-50' : 'bg-white border-gray-300'
              }`}
              placeholder="150 ريال"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">الحالة</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={mode === 'view'}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                mode === 'view' ? 'bg-gray-50' : 'bg-white border-gray-300'
              }`}
            >
              <option value="pending">في الانتظار</option>
              <option value="confirmed">مؤكدة</option>
              <option value="in-progress">جاري العمل</option>
              <option value="completed">مكتملة</option>
              <option value="cancelled">ملغية</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">العنوان *</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={mode === 'view'}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
              mode === 'view' ? 'bg-gray-50' : 'bg-white'
            } ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="العنوان التفصيلي للخدمة"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1 font-arabic">{errors.address}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">ملاحظات</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            disabled={mode === 'view'}
            rows={3}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
              mode === 'view' ? 'bg-gray-50' : 'bg-white border-gray-300'
            }`}
            placeholder="أي ملاحظات إضافية..."
          />
        </div>

        <div className="flex justify-end space-x-3 rtl:space-x-reverse pt-6 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 font-arabic"
          >
            إلغاء
          </button>
          {mode !== 'view' && (
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center space-x-2 rtl:space-x-reverse font-arabic"
            >
              <Save className="w-4 h-4" />
              <span>{mode === 'add' ? 'إضافة' : 'حفظ'}</span>
            </button>
          )}
        </div>
      </form>
    );
  };

  // Service Form Component
  const ServiceForm = ({ service, mode, onSave, onDelete, onCancel }) => {
    const [formData, setFormData] = useState({
      name: service?.name || '',
      price: service?.price || '',
      duration: service?.duration || '',
      category: service?.category || 'تنظيف',
      description: service?.description || '',
      icon: service?.icon || 'Home'
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    };

    const validate = () => {
      const newErrors = {};
      if (!formData.name.trim()) newErrors.name = 'اسم الخدمة مطلوب';
      if (!formData.price.trim()) newErrors.price = 'السعر مطلوب';
      if (!formData.duration.trim()) newErrors.duration = 'المدة مطلوبة';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (validate()) {
        const serviceData = {
          ...formData,
          id: service?.id || Date.now(),
          bookings: service?.bookings || 0,
          revenue: service?.revenue || '0 ريال',
          icon: getServiceIcon(formData.category)
        };
        onSave(serviceData, mode);
      }
    };

    const handleDeleteClick = () => {
      if (window.confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
        onDelete(service?.id || service?.name);
      }
    };

    const getServiceIcon = (category) => {
      switch (category) {
        case 'تنظيف منازل': return <Home className="w-6 h-6" />;
        case 'تنظيف مكاتب': return <Building2 className="w-6 h-6" />;
        case 'تنظيف سيارات': return <Car className="w-6 h-6" />;
        default: return <Settings className="w-6 h-6" />;
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">اسم الخدمة *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={mode === 'view'}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                mode === 'view' ? 'bg-gray-50' : 'bg-white'
              } ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="تنظيف المنازل"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1 font-arabic">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">السعر *</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              disabled={mode === 'view'}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                mode === 'view' ? 'bg-gray-50' : 'bg-white'
              } ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="150 ريال"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1 font-arabic">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">المدة المتوقعة *</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              disabled={mode === 'view'}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                mode === 'view' ? 'bg-gray-50' : 'bg-white'
              } ${errors.duration ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="2-3 ساعات"
            />
            {errors.duration && <p className="text-red-500 text-sm mt-1 font-arabic">{errors.duration}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">الفئة</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={mode === 'view'}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
                mode === 'view' ? 'bg-gray-50' : 'bg-white border-gray-300'
              }`}
            >
              <option value="تنظيف">تنظيف</option>
              <option value="تنظيف منازل">تنظيف منازل</option>
              <option value="تنظيف مكاتب">تنظيف مكاتب</option>
              <option value="تنظيف سيارات">تنظيف سيارات</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">وصف الخدمة</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={mode === 'view'}
            rows={4}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic ${
              mode === 'view' ? 'bg-gray-50' : 'bg-white border-gray-300'
            }`}
            placeholder="اكتب وصفاً تفصيلياً للخدمة..."
          />
        </div>

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

        <div className="flex justify-between pt-6 border-t">
          {mode !== 'add' && mode !== 'view' && (
            <button
              type="button"
              onClick={handleDeleteClick}
              className="px-6 py-2 text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 font-arabic"
            >
              حذف الخدمة
            </button>
          )}
          
          {(mode === 'add' || mode === 'view') && <div></div>}

          <div className="flex space-x-3 rtl:space-x-reverse">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 font-arabic"
            >
              إلغاء
            </button>
            {mode !== 'view' && (
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center space-x-2 rtl:space-x-reverse font-arabic"
              >
                <Save className="w-4 h-4" />
                <span>{mode === 'add' ? 'إضافة الخدمة' : 'حفظ التغييرات'}</span>
              </button>
            )}
          </div>
        </div>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-arabic mb-2">
            لوحة تحكم كلين ماستر
          </h1>
          <p className="text-gray-600 font-arabic">
            مرحباً بك في لوحة التحكم الرئيسية
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 rtl:space-x-reverse">
              {navigationTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 rtl:space-x-reverse py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span className="font-arabic">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'dashboard' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-blue-600">
                        {stat.icon}
                      </div>
                      <div className={`text-sm px-2 py-1 rounded-lg ${stat.positive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {stat.change}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-gray-600 font-arabic text-sm">
                      {stat.title}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Bookings */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 font-arabic">
                      الحجوزات الأخيرة
                    </h2>
                    <Calendar className="w-5 h-5 text-gray-400" />
                  </div>
                  
                  <div className="space-y-4">
                    {recentBookings.map((booking, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                            <span className="font-semibold text-gray-900 font-arabic">
                              {booking.customer}
                            </span>
                            <span className="text-sm text-gray-500">
                              {booking.id}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 font-arabic">
                            {booking.service}
                          </p>
                        </div>
                        
                        <div className="text-center mx-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {getStatusText(booking.status)}
                          </span>
                        </div>
                        
                        <div className="text-left rtl:text-right">
                          <p className="font-semibold text-gray-900">
                            {booking.amount}
                          </p>
                          <p className="text-sm text-gray-500">
                            {booking.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Performance */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 font-arabic">
                      أداء الخدمات
                    </h2>
                    <BarChart3 className="w-5 h-5 text-gray-400" />
                  </div>
                  
                  <div className="space-y-4">
                    {services.map((service, index) => (
                      <div key={index} className="flex items-center space-x-4 rtl:space-x-reverse p-4 bg-gray-50 rounded-xl">
                        <div className="text-blue-600">
                          {service.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 font-arabic">
                            {service.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {service.bookings} حجز
                          </p>
                        </div>
                        <div className="text-left rtl:text-right">
                          <p className="font-bold text-gray-900">
                            {service.revenue}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
          
          {activeTab === 'customers' && (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 font-arabic">
                  إدارة العملاء
                </h2>
                <div className="flex space-x-3 rtl:space-x-reverse">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 rtl:right-3 top-3 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="البحث عن عميل..."
                      value={customerSearch}
                      onChange={(e) => setCustomerSearch(e.target.value)}
                      className="pl-10 rtl:pr-10 pr-4 rtl:pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic"
                    />
                  </div>
                  <button 
                    onClick={() => setCustomerModal({ isOpen: true, mode: 'add', data: null })}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 rtl:space-x-reverse font-arabic"
                  >
                    <Plus className="w-4 h-4" />
                    <span>عميل جديد</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-right rtl:text-left p-4 font-semibold text-gray-900 font-arabic">الاسم</th>
                      <th className="text-right rtl:text-left p-4 font-semibold text-gray-900 font-arabic">البريد الإلكتروني</th>
                      <th className="text-right rtl:text-left p-4 font-semibold text-gray-900 font-arabic">الهاتف</th>
                      <th className="text-right rtl:text-left p-4 font-semibold text-gray-900 font-arabic">عدد الحجوزات</th>
                      <th className="text-right rtl:text-left p-4 font-semibold text-gray-900 font-arabic">إجمالي الإنفاق</th>
                      <th className="text-right rtl:text-left p-4 font-semibold text-gray-900 font-arabic">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-arabic">{customer.name}</td>
                        <td className="p-4">{customer.email}</td>
                        <td className="p-4">{customer.phone}</td>
                        <td className="p-4">{customer.bookings}</td>
                        <td className="p-4 font-semibold">{customer.totalSpent}</td>
                        <td className="p-4">
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <button 
                              onClick={() => setCustomerModal({ isOpen: true, mode: 'view', data: customer })}
                              className="text-blue-600 hover:text-blue-800 p-2 tooltip" 
                              title="عرض التفاصيل"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => setCustomerModal({ isOpen: true, mode: 'edit', data: customer })}
                              className="text-green-600 hover:text-green-800 p-2 tooltip" 
                              title="تعديل"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => {
                                if (window.confirm('هل أنت متأكد من حذف هذا العميل؟')) {
                                  handleCustomerDelete(customer.id);
                                }
                              }}
                              className="text-red-600 hover:text-red-800 p-2 tooltip" 
                              title="حذف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 font-arabic">
                  إدارة الحجوزات
                </h2>
                <div className="flex space-x-3 rtl:space-x-reverse">
                  <select 
                    value={bookingFilter}
                    onChange={(e) => setBookingFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-arabic"
                  >
                    <option value="all">جميع الحجوزات</option>
                    <option value="pending">في الانتظار</option>
                    <option value="confirmed">مؤكدة</option>
                    <option value="in-progress">جاري العمل</option>
                    <option value="completed">مكتملة</option>
                    <option value="cancelled">ملغية</option>
                  </select>
                  <button 
                    onClick={() => setBookingModal({ isOpen: true, mode: 'add', data: null })}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 rtl:space-x-reverse font-arabic"
                  >
                    <Plus className="w-4 h-4" />
                    <span>حجز جديد</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredBookings.map((booking, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <span className="font-bold text-lg text-gray-900">{booking.id}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="text-right rtl:text-left">
                          <p className="font-bold text-lg text-gray-900">{booking.amount}</p>
                          <p className="text-sm text-gray-500">{booking.time}</p>
                        </div>
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <button 
                            onClick={() => setBookingModal({ isOpen: true, mode: 'view', data: booking })}
                            className="text-blue-600 hover:text-blue-800 p-2 tooltip" 
                            title="عرض التفاصيل"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setBookingModal({ isOpen: true, mode: 'edit', data: booking })}
                            className="text-green-600 hover:text-green-800 p-2 tooltip" 
                            title="تعديل"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => {
                              if (window.confirm('هل أنت متأكد من حذف هذا الحجز؟')) {
                                handleBookingDelete(booking.id);
                              }
                            }}
                            className="text-red-600 hover:text-red-800 p-2 tooltip" 
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1 font-arabic">العميل:</p>
                        <p className="font-semibold text-gray-900 font-arabic">{booking.customer}</p>
                        <p className="text-sm text-gray-600">{booking.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1 font-arabic">الخدمة:</p>
                        <p className="font-semibold text-gray-900 font-arabic">{booking.service}</p>
                        <p className="text-sm text-gray-600 font-arabic">{booking.address}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 font-arabic">
                  إدارة الخدمات
                </h2>
                <button 
                  onClick={() => setServiceModal({ isOpen: true, mode: 'add', data: null })}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 rtl:space-x-reverse font-arabic"
                >
                  <Plus className="w-4 h-4" />
                  <span>خدمة جديدة</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicesData.map((service, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="text-blue-600">
                          {service.icon}
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 font-arabic">
                          {service.name}
                        </h3>
                      </div>
                      <button 
                        onClick={() => setServiceModal({ isOpen: true, mode: 'view', data: service })}
                        className="text-gray-400 hover:text-gray-600 p-1"
                        title="عرض التفاصيل"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-arabic">السعر:</span>
                        <span className="font-semibold">{service.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-arabic">المدة:</span>
                        <span className="font-semibold font-arabic">{service.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-arabic">عدد الحجوزات:</span>
                        <span className="font-semibold">{service.bookings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-arabic">الإيرادات:</span>
                        <span className="font-semibold text-green-600">{service.revenue}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 rtl:space-x-reverse mt-4">
                      <button 
                        onClick={() => setServiceModal({ isOpen: true, mode: 'edit', data: service })}
                        className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors font-arabic"
                      >
                        تعديل
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
                            handleServiceDelete(service.id || service.name);
                          }
                        }}
                        className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-colors font-arabic"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Customer Modal */}
      <SimpleModal
        isOpen={customerModal.isOpen}
        onClose={() => setCustomerModal({ isOpen: false, mode: 'add', data: null })}
        title={
          customerModal.mode === 'add' ? 'إضافة عميل جديد' :
          customerModal.mode === 'edit' ? 'تعديل العميل' :
          'تفاصيل العميل'
        }
        size="large"
      >
        <CustomerForm
          customer={customerModal.data}
          mode={customerModal.mode}
          onSave={handleCustomerSave}
          onCancel={() => setCustomerModal({ isOpen: false, mode: 'add', data: null })}
        />
      </SimpleModal>

      {/* Booking Modal */}
      <SimpleModal
        isOpen={bookingModal.isOpen}
        onClose={() => setBookingModal({ isOpen: false, mode: 'add', data: null })}
        title={
          bookingModal.mode === 'add' ? 'إضافة حجز جديد' :
          bookingModal.mode === 'edit' ? 'تعديل الحجز' :
          'تفاصيل الحجز'
        }
        size="large"
      >
        <BookingForm
          booking={bookingModal.data}
          mode={bookingModal.mode}
          customers={customersData}
          services={servicesData}
          onSave={handleBookingSave}
          onCancel={() => setBookingModal({ isOpen: false, mode: 'add', data: null })}
        />
      </SimpleModal>

      {/* Service Modal */}
      <SimpleModal
        isOpen={serviceModal.isOpen}
        onClose={() => setServiceModal({ isOpen: false, mode: 'add', data: null })}
        title={
          serviceModal.mode === 'add' ? 'إضافة خدمة جديدة' :
          serviceModal.mode === 'edit' ? 'تعديل الخدمة' :
          'تفاصيل الخدمة'
        }
        size="large"
      >
        <ServiceForm
          service={serviceModal.data}
          mode={serviceModal.mode}
          onSave={handleServiceSave}
          onDelete={handleServiceDelete}
          onCancel={() => setServiceModal({ isOpen: false, mode: 'add', data: null })}
        />
      </SimpleModal>
    </div>
  );
};

export default AdminDashboard; 