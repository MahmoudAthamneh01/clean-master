import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  BarChart3,
  Calendar,
  Users,
  Settings,
  Home,
  UserCheck,
  TrendingUp,
  Clock,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Filter,
  Search
} from 'lucide-react';

// Import admin modals
import BookingModal from '../../components/admin/BookingModal';
import ServiceModal from '../../components/admin/ServiceModal';
import CustomerModal from '../../components/admin/CustomerModal';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const location = useLocation();

  // State management
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalBookings: 156,
    todayBookings: 12,
    revenue: 45000,
    customers: 89
  });
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Sidebar navigation items
  const navItems = [
    { id: 'dashboard', label: t('admin.dashboard'), icon: Home, path: '/admin' },
    { id: 'bookings', label: t('admin.bookings'), icon: Calendar, path: '/admin/bookings' },
    { id: 'services', label: t('admin.services'), icon: Settings, path: '/admin/services' },
    { id: 'customers', label: t('admin.users'), icon: Users, path: '/admin/customers' },
    { id: 'staff', label: t('admin.staff'), icon: UserCheck, path: '/admin/staff' },
    { id: 'reports', label: t('admin.reports'), icon: BarChart3, path: '/admin/reports' },
    { id: 'settings', label: t('admin.settings'), icon: Settings, path: '/admin/settings' }
  ];

  // Sample data - replace with actual API calls
  useEffect(() => {
    setTimeout(() => {
      setBookings([
        {
          id: 1,
          customer: 'أحمد محمد',
          service: 'تنظيف المنزل',
          date: '2024-01-15',
          time: '10:00',
          status: 'confirmed',
          amount: 250
        },
        {
          id: 2,
          customer: 'فاطمة علي',
          service: 'تنظيف المكتب',
          date: '2024-01-15',
          time: '14:00',
          status: 'pending',
          amount: 400
        },
        {
          id: 3,
          customer: 'محمد خالد',
          service: 'التنظيف العميق',
          date: '2024-01-16',
          time: '09:00',
          status: 'completed',
          amount: 500
        }
      ]);

      setServices([
        {
          id: 1,
          name: 'تنظيف المنازل',
          price: 250,
          duration: 120,
          active: true
        },
        {
          id: 2,
          name: 'تنظيف المكاتب',
          price: 400,
          duration: 180,
          active: true
        }
      ]);

      setCustomers([
        {
          id: 1,
          name: 'أحمد محمد',
          email: 'ahmed@example.com',
          phone: '+966501234567',
          totalBookings: 5
        },
        {
          id: 2,
          name: 'فاطمة علي',
          email: 'fatima@example.com',
          phone: '+966501234568',
          totalBookings: 3
        }
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  // Get current tab from URL
  useEffect(() => {
    const path = location.pathname;
    if (path === '/admin' || path === '/admin/') {
      setActiveTab('dashboard');
    } else if (path.includes('/bookings')) {
      setActiveTab('bookings');
    } else if (path.includes('/services')) {
      setActiveTab('services');
    } else if (path.includes('/customers')) {
      setActiveTab('customers');
    } else if (path.includes('/staff')) {
      setActiveTab('staff');
    } else if (path.includes('/reports')) {
      setActiveTab('reports');
    } else if (path.includes('/settings')) {
      setActiveTab('settings');
    }
  }, [location]);

  // Status colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'confirmed': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Handle booking save
  const handleBookingSave = (bookingData) => {
    if (selectedItem) {
      // Update existing booking
      setBookings(prev => prev.map(booking => 
        booking.id === selectedItem.id ? { ...bookingData, id: selectedItem.id } : booking
      ));
    } else {
      // Add new booking
      setBookings(prev => [...prev, { ...bookingData, id: Date.now() }]);
    }
    setShowBookingModal(false);
    setSelectedItem(null);
  };

  // Handle service save
  const handleServiceSave = (serviceData) => {
    if (selectedItem) {
      // Update existing service
      setServices(prev => prev.map(service => 
        service.id === selectedItem.id ? { ...serviceData, id: selectedItem.id } : service
      ));
    } else {
      // Add new service
      setServices(prev => [...prev, { ...serviceData, id: Date.now() }]);
    }
    setShowServiceModal(false);
    setSelectedItem(null);
  };

  // Handle customer save
  const handleCustomerSave = (customerData) => {
    if (selectedItem) {
      // Update existing customer
      setCustomers(prev => prev.map(customer => 
        customer.id === selectedItem.id ? { ...customerData, id: selectedItem.id } : customer
      ));
    } else {
      // Add new customer
      setCustomers(prev => [...prev, { ...customerData, id: Date.now() }]);
    }
    setShowCustomerModal(false);
    setSelectedItem(null);
  };

  // Handle delete functions
  const handleDeleteBooking = (bookingId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الحجز؟')) {
      setBookings(prev => prev.filter(booking => booking.id !== bookingId));
    }
  };

  const handleDeleteService = (serviceId) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
      setServices(prev => prev.filter(service => service.id !== serviceId));
    }
  };

  const handleDeleteCustomer = (customerId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العميل؟')) {
      setCustomers(prev => prev.filter(customer => customer.id !== customerId));
    }
  };

  // Dashboard Overview Component
  const DashboardOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('admin.stats.totalBookings')}</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+12%</span>
            <span className="text-sm text-gray-500 mr-2">من الشهر الماضي</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('admin.stats.todayBookings')}</p>
              <p className="text-2xl font-bold text-gray-900">{stats.todayBookings}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+5</span>
            <span className="text-sm text-gray-500 mr-2">من أمس</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('admin.stats.revenue')}</p>
              <p className="text-2xl font-bold text-gray-900">{stats.revenue.toLocaleString()} ر.س</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+8%</span>
            <span className="text-sm text-gray-500 mr-2">من الشهر الماضي</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('admin.stats.customers')}</p>
              <p className="text-2xl font-bold text-gray-900">{stats.customers}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+15</span>
            <span className="text-sm text-gray-500 mr-2">عميل جديد</span>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">أحدث الحجوزات</h3>
            <Link 
              to="/admin/bookings"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              عرض الكل
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {bookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{booking.customer}</p>
                    <p className="text-sm text-gray-600">{booking.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{booking.date} - {booking.time}</p>
                  <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {t(`bookings.status.${booking.status}`)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Bookings Management Component
  const BookingsManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{t('admin.bookings')}</h2>
        <button
          onClick={() => {
            setSelectedItem(null);
            setShowBookingModal(true);
          }}
          className="btn-primary flex items-center space-x-2 rtl:space-x-reverse"
        >
          <Plus className="w-4 h-4" />
          <span>حجز جديد</span>
        </button>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  العميل
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الخدمة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التاريخ والوقت
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المبلغ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{booking.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.service}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.date}</div>
                    <div className="text-sm text-gray-500">{booking.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {t(`bookings.status.${booking.status}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.amount} ر.س</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <button
                        onClick={() => {
                          setSelectedItem(booking);
                          setShowBookingModal(true);
                        }}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItem(booking);
                          setShowBookingModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteBooking(booking.id);
                        }}
                        className="text-red-600 hover:text-red-900"
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
    </div>
  );

  // Services Management Component
  const ServicesManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{t('admin.services')}</h2>
        <button
          onClick={() => {
            setSelectedItem(null);
            setShowServiceModal(true);
          }}
          className="btn-primary flex items-center space-x-2 rtl:space-x-reverse"
        >
          <Plus className="w-4 h-4" />
          <span>خدمة جديدة</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-2xl font-bold text-primary-600 mb-2">{service.price} ر.س</p>
                <p className="text-sm text-gray-600 mb-4">{service.duration} دقيقة</p>
                <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                  service.active ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                }`}>
                  {service.active ? 'نشطة' : 'غير نشطة'}
                </div>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <button
                  onClick={() => {
                    setSelectedItem(service);
                    setShowServiceModal(true);
                  }}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    handleDeleteService(service.id);
                  }}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Customers Management Component  
  const CustomersManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{t('admin.users')}</h2>
        <button
          onClick={() => {
            setSelectedItem(null);
            setShowCustomerModal(true);
          }}
          className="btn-primary flex items-center space-x-2 rtl:space-x-reverse"
        >
          <Plus className="w-4 h-4" />
          <span>عميل جديد</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الاسم
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  البريد الإلكتروني
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الهاتف
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  إجمالي الحجوزات
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.totalBookings}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <button
                        onClick={() => {
                          setSelectedItem(customer);
                          setShowCustomerModal(true);
                        }}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItem(customer);
                          setShowCustomerModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteCustomer(customer.id);
                        }}
                        className="text-red-600 hover:text-red-900"
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
    </div>
  );

  // Placeholder components for other tabs
  const StaffManagement = () => (
    <div className="text-center py-12">
      <UserCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">إدارة الموظفين</h3>
      <p className="text-gray-600">سيتم تطوير هذا القسم قريباً</p>
    </div>
  );

  const Reports = () => (
    <div className="text-center py-12">
      <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">التقارير والإحصائيات</h3>
      <p className="text-gray-600">سيتم تطوير هذا القسم قريباً</p>
    </div>
  );

  const SettingsPanel = () => (
    <div className="text-center py-12">
      <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">إعدادات النظام</h3>
      <p className="text-gray-600">سيتم تطوير هذا القسم قريباً</p>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900">{t('admin.dashboard')}</h2>
          </div>
          <nav className="mt-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-primary-600 bg-primary-50 border-r-2 border-primary-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/bookings" element={<BookingsManagement />} />
            <Route path="/services" element={<ServicesManagement />} />
            <Route path="/customers" element={<CustomersManagement />} />
            <Route path="/staff" element={<StaffManagement />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<SettingsPanel />} />
          </Routes>
        </main>
      </div>

      {/* Modals */}
      {showBookingModal && (
        <BookingModal
          booking={selectedItem}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedItem(null);
          }}
          onSave={handleBookingSave}
        />
      )}

      {showServiceModal && (
        <ServiceModal
          service={selectedItem}
          onClose={() => {
            setShowServiceModal(false);
            setSelectedItem(null);
          }}
          onSave={handleServiceSave}
        />
      )}

      {showCustomerModal && (
        <CustomerModal
          customer={selectedItem}
          onClose={() => {
            setShowCustomerModal(false);
            setSelectedItem(null);
          }}
          onSave={handleCustomerSave}
        />
      )}
    </div>
  );
};

export default AdminDashboard; 