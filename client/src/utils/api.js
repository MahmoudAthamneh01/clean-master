// نظام API مرن - Flexible API System
import axios from 'axios';

// إعدادات API
const API_CONFIG = {
  // جرب عدة عناوين للخادم
  POSSIBLE_URLS: [
    import.meta.env.VITE_API_URL,
    'http://localhost:5000',
    'http://127.0.0.1:5000',
    window.location.origin.replace(/:\d+/, ':5000'), // نفس النطاق مع منفذ 5000
  ].filter(Boolean),
  
  TIMEOUT: 5000, // 5 ثوان
};

// حالة الخادم
let serverStatus = {
  isOnline: false,
  workingUrl: null,
  lastCheck: 0,
};

// بيانات وهمية للعمل بدون خادم
const MOCK_DATA = {
  // إحصائيات
  stats: {
    totalBookings: 156,
    todayBookings: 12,
    revenue: 45000,
    customers: 89
  },
  
  // الحجوزات
  bookings: [
    {
      id: 1,
      customer: 'أحمد محمد',
      service: 'تنظيف المنزل',
      date: '2024-01-15',
      time: '10:00',
      status: 'confirmed',
      amount: 250,
      phone: '+966501234567'
    },
    {
      id: 2,
      customer: 'فاطمة علي',
      service: 'تنظيف المكتب',
      date: '2024-01-15',
      time: '14:00',
      status: 'pending',
      amount: 400,
      phone: '+966501234568'
    },
    {
      id: 3,
      customer: 'محمد خالد',
      service: 'التنظيف العميق',
      date: '2024-01-16',
      time: '09:00',
      status: 'completed',
      amount: 500,
      phone: '+966501234569'
    }
  ],
  
  // الخدمات
  services: [
    {
      id: 1,
      name: 'تنظيف المنازل',
      price: 250,
      duration: 120,
      active: true,
      description: 'تنظيف شامل للمنزل'
    },
    {
      id: 2,
      name: 'تنظيف المكاتب',
      price: 400,
      duration: 180,
      active: true,
      description: 'تنظيف المكاتب والشركات'
    },
    {
      id: 3,
      name: 'التنظيف العميق',
      price: 500,
      duration: 240,
      active: true,
      description: 'تنظيف عميق ومتخصص'
    }
  ],
  
  // العملاء
  customers: [
    {
      id: 1,
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      phone: '+966501234567',
      totalBookings: 5,
      address: 'الرياض، المملكة العربية السعودية'
    },
    {
      id: 2,
      name: 'فاطمة علي',
      email: 'fatima@example.com',
      phone: '+966501234568',
      totalBookings: 3,
      address: 'جدة، المملكة العربية السعودية'
    },
    {
      id: 3,
      name: 'محمد خالد',
      email: 'mohammed@example.com',
      phone: '+966501234569',
      totalBookings: 2,
      address: 'الدمام، المملكة العربية السعودية'
    }
  ]
};

// تخزين محلي للبيانات
const getStorageKey = (key) => `cleanmaster_${key}`;

const loadFromStorage = (key) => {
  try {
    const data = localStorage.getItem(getStorageKey(key));
    return data ? JSON.parse(data) : MOCK_DATA[key];
  } catch (error) {
    console.warn('خطأ في تحميل البيانات من التخزين المحلي:', error);
    return MOCK_DATA[key];
  }
};

const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(getStorageKey(key), JSON.stringify(data));
  } catch (error) {
    console.warn('خطأ في حفظ البيانات في التخزين المحلي:', error);
  }
};

// فحص حالة الخادم
const checkServerStatus = async (url) => {
  try {
    const response = await axios.get(`${url}/health`, { 
      timeout: API_CONFIG.TIMEOUT 
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

// العثور على خادم يعمل
const findWorkingServer = async () => {
  const now = Date.now();
  
  // فحص كل 30 ثانية فقط
  if (serverStatus.workingUrl && (now - serverStatus.lastCheck) < 30000) {
    return serverStatus.workingUrl;
  }
  
  for (const url of API_CONFIG.POSSIBLE_URLS) {
    if (await checkServerStatus(url)) {
      serverStatus = {
        isOnline: true,
        workingUrl: url,
        lastCheck: now
      };
      console.log('✅ خادم متصل:', url);
      return url;
    }
  }
  
  serverStatus = {
    isOnline: false,
    workingUrl: null,
    lastCheck: now
  };
  
  console.log('⚠️ لا يوجد خادم متاح، سيتم استخدام البيانات المحلية');
  return null;
};

// دالة API عامة
const apiRequest = async (method, endpoint, data = null) => {
  const workingUrl = await findWorkingServer();
  
  if (workingUrl) {
    try {
      const config = {
        method,
        url: `${workingUrl}${endpoint}`,
        timeout: API_CONFIG.TIMEOUT,
        headers: {
          'Content-Type': 'application/json',
        }
      };
      
      if (data) {
        config.data = data;
      }
      
      const response = await axios(config);
      return { success: true, data: response.data };
    } catch (error) {
      console.warn('خطأ في الاتصال بالخادم:', error.message);
      serverStatus.isOnline = false;
      serverStatus.workingUrl = null;
    }
  }
  
  // في حالة عدم وجود خادم، استخدم البيانات المحلية
  return handleOfflineRequest(method, endpoint, data);
};

// معالجة الطلبات بدون اتصال
const handleOfflineRequest = async (method, endpoint, data) => {
  // محاكاة تأخير الشبكة
  await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));
  
  const segments = endpoint.split('/').filter(Boolean);
  const resource = segments[1]; // api/bookings -> bookings
  
  switch (method.toLowerCase()) {
    case 'get':
      if (resource === 'stats') {
        return { success: true, data: loadFromStorage('stats') || MOCK_DATA.stats };
      }
      return { success: true, data: loadFromStorage(resource) || MOCK_DATA[resource] || [] };
      
    case 'post':
      if (endpoint === '/api/auth/login') {
        console.log('🔐 Mock login attempt:', data);
        // محاكاة تسجيل الدخول
        if (data.email === 'admin@cleanmaster.com' && data.password === 'admin123') {
          const adminUser = {
            success: true, 
            data: { 
              token: 'mock-admin-token', 
              user: { id: 'admin', name: 'المدير', role: 'admin' } 
            } 
          };
          console.log('✅ Mock admin login successful:', adminUser);
          return adminUser;
        }
        console.log('❌ Mock login failed for:', data.email);
        return { success: false, message: 'بيانات دخول خاطئة' };
      }
      
      // إضافة عنصر جديد
      const currentData = loadFromStorage(resource) || MOCK_DATA[resource] || [];
      const newItem = { ...data, id: Date.now() };
      const updatedData = [...currentData, newItem];
      saveToStorage(resource, updatedData);
      return { success: true, data: newItem };
      
    case 'put':
      // تحديث عنصر
      const id = segments[2];
      const existingData = loadFromStorage(resource) || MOCK_DATA[resource] || [];
      const updatedArray = existingData.map(item => 
        item.id.toString() === id ? { ...item, ...data } : item
      );
      saveToStorage(resource, updatedArray);
      return { success: true, data: { ...data, id } };
      
    case 'delete':
      // حذف عنصر
      const deleteId = segments[2];
      const dataToDelete = loadFromStorage(resource) || MOCK_DATA[resource] || [];
      const filteredData = dataToDelete.filter(item => item.id.toString() !== deleteId);
      saveToStorage(resource, filteredData);
      return { success: true, data: { id: deleteId } };
      
    default:
      return { success: false, message: 'طريقة غير مدعومة' };
  }
};

// API functions
export const api = {
  // Authentication
  login: (credentials) => apiRequest('POST', '/api/auth/login', credentials),
  
  // Stats
  getStats: () => apiRequest('GET', '/api/stats'),
  
  // Bookings
  getBookings: () => apiRequest('GET', '/api/bookings'),
  createBooking: (booking) => apiRequest('POST', '/api/bookings', booking),
  updateBooking: (id, booking) => apiRequest('PUT', `/api/bookings/${id}`, booking),
  deleteBooking: (id) => apiRequest('DELETE', `/api/bookings/${id}`),
  
  // Services
  getServices: () => apiRequest('GET', '/api/services'),
  createService: (service) => apiRequest('POST', '/api/services', service),
  updateService: (id, service) => apiRequest('PUT', `/api/services/${id}`, service),
  deleteService: (id) => apiRequest('DELETE', `/api/services/${id}`),
  
  // Customers
  getCustomers: () => apiRequest('GET', '/api/customers'),
  createCustomer: (customer) => apiRequest('POST', '/api/customers', customer),
  updateCustomer: (id, customer) => apiRequest('PUT', `/api/customers/${id}`, customer),
  deleteCustomer: (id) => apiRequest('DELETE', `/api/customers/${id}`),
  
  // Server status
  isServerOnline: () => serverStatus.isOnline,
  getServerUrl: () => serverStatus.workingUrl
};

export default api; 