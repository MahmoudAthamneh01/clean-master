import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Language } from '../types'

interface LanguageState {
  language: Language
  direction: 'ltr' | 'rtl'
  translations: Record<string, string>
  isLoading: boolean
}

interface LanguageActions {
  setLanguage: (language: Language) => void
  getTranslation: (key: string, fallback?: string) => string
  initializeLanguage: () => void
  loadTranslations: (language: Language) => Promise<void>
}

type LanguageStore = LanguageState & LanguageActions

// Default translations
const defaultTranslations: Record<Language, Record<string, string>> = {
  ar: {
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.appointments': 'المواعيد',
    'nav.customers': 'العملاء',
    'nav.invoices': 'الفواتير',
    'nav.inventory': 'المخزون',
    'nav.tickets': 'التذاكر',
    'nav.pricing_rules': 'قواعد التسعير',
    'nav.automation_rules': 'قواعد الأتمتة',
    'nav.chatbot_builder': 'منشئ الروبوت',
    'nav.analytics': 'التحليلات',
    'nav.settings': 'الإعدادات',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.add': 'إضافة',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.export': 'تصدير',
    'common.import': 'استيراد',
    'common.refresh': 'تحديث',
    'common.back': 'رجوع',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.submit': 'إرسال',
    'common.confirm': 'تأكيد',
    'common.yes': 'نعم',
    'common.no': 'لا',
    
    // Status
    'status.pending': 'قيد الانتظار',
    'status.confirmed': 'مؤكد',
    'status.in_progress': 'قيد التنفيذ',
    'status.completed': 'مكتمل',
    'status.cancelled': 'ملغي',
    'status.active': 'نشط',
    'status.inactive': 'غير نشط',
    
    // Forms
    'form.name': 'الاسم',
    'form.email': 'البريد الإلكتروني',
    'form.phone': 'رقم الهاتف',
    'form.address': 'العنوان',
    'form.city': 'المدينة',
    'form.notes': 'ملاحظات',
    'form.date': 'التاريخ',
    'form.time': 'الوقت',
    'form.price': 'السعر',
    'form.quantity': 'الكمية',
    'form.description': 'الوصف',
    'form.category': 'الفئة',
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.welcome': 'مرحباً',
    'dashboard.total_appointments_today': 'مواعيد اليوم',
    'dashboard.upcoming_appointments': 'المواعيد القادمة',
    'dashboard.total_revenue_month': 'إيرادات الشهر',
    'dashboard.total_customers': 'إجمالي العملاء',
    'dashboard.pending_tickets': 'التذاكر المعلقة',
    'dashboard.unread_messages': 'الرسائل غير المقروءة',
    
    // Appointments
    'appointments.title': 'إدارة المواعيد',
    'appointments.new_appointment': 'موعد جديد',
    'appointments.customer': 'العميل',
    'appointments.service': 'الخدمة',
    'appointments.agent': 'المندوب',
    'appointments.date_time': 'التاريخ والوقت',
    'appointments.status': 'الحالة',
    'appointments.actions': 'الإجراءات',
    
    // Customers
    'customers.title': 'إدارة العملاء',
    'customers.new_customer': 'عميل جديد',
    'customers.contact_method': 'طريقة التواصل',
    'customers.total_bookings': 'إجمالي الحجوزات',
    'customers.total_spent': 'إجمالي المبلغ المنفق',
    'customers.rating': 'التقييم',
    
    // Messages
    'messages.success': 'تم بنجاح',
    'messages.error': 'حدث خطأ',
    'messages.confirm_delete': 'هل أنت متأكد من الحذف؟',
    'messages.no_data': 'لا توجد بيانات',
    'messages.loading': 'جاري التحميل...',
  },
  
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.appointments': 'Appointments',
    'nav.customers': 'Customers',
    'nav.invoices': 'Invoices',
    'nav.inventory': 'Inventory',
    'nav.tickets': 'Tickets',
    'nav.pricing_rules': 'Pricing Rules',
    'nav.automation_rules': 'Automation Rules',
    'nav.chatbot_builder': 'Chatbot Builder',
    'nav.analytics': 'Analytics',
    'nav.settings': 'Settings',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.refresh': 'Refresh',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.submit': 'Submit',
    'common.confirm': 'Confirm',
    'common.yes': 'Yes',
    'common.no': 'No',
    
    // Status
    'status.pending': 'Pending',
    'status.confirmed': 'Confirmed',
    'status.in_progress': 'In Progress',
    'status.completed': 'Completed',
    'status.cancelled': 'Cancelled',
    'status.active': 'Active',
    'status.inactive': 'Inactive',
    
    // Forms
    'form.name': 'Name',
    'form.email': 'Email',
    'form.phone': 'Phone',
    'form.address': 'Address',
    'form.city': 'City',
    'form.notes': 'Notes',
    'form.date': 'Date',
    'form.time': 'Time',
    'form.price': 'Price',
    'form.quantity': 'Quantity',
    'form.description': 'Description',
    'form.category': 'Category',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome',
    'dashboard.total_appointments_today': "Today's Appointments",
    'dashboard.upcoming_appointments': 'Upcoming Appointments',
    'dashboard.total_revenue_month': "Month's Revenue",
    'dashboard.total_customers': 'Total Customers',
    'dashboard.pending_tickets': 'Pending Tickets',
    'dashboard.unread_messages': 'Unread Messages',
    
    // Appointments
    'appointments.title': 'Appointment Management',
    'appointments.new_appointment': 'New Appointment',
    'appointments.customer': 'Customer',
    'appointments.service': 'Service',
    'appointments.agent': 'Agent',
    'appointments.date_time': 'Date & Time',
    'appointments.status': 'Status',
    'appointments.actions': 'Actions',
    
    // Customers
    'customers.title': 'Customer Management',
    'customers.new_customer': 'New Customer',
    'customers.contact_method': 'Contact Method',
    'customers.total_bookings': 'Total Bookings',
    'customers.total_spent': 'Total Spent',
    'customers.rating': 'Rating',
    
    // Messages
    'messages.success': 'Success',
    'messages.error': 'Error occurred',
    'messages.confirm_delete': 'Are you sure you want to delete?',
    'messages.no_data': 'No data available',
    'messages.loading': 'Loading...',
  }
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      // Initial state
      language: 'ar',
      direction: 'rtl',
      translations: defaultTranslations.ar,
      isLoading: false,

      // Actions
      setLanguage: (language: Language) => {
        const direction = language === 'ar' ? 'rtl' : 'ltr'
        const translations = defaultTranslations[language]
        
        set({
          language,
          direction,
          translations,
        })
      },

      getTranslation: (key: string, fallback?: string) => {
        const { translations } = get()
        return translations[key] || fallback || key
      },

      initializeLanguage: () => {
        const { language } = get()
        const direction = language === 'ar' ? 'rtl' : 'ltr'
        const translations = defaultTranslations[language]
        
        set({
          direction,
          translations,
        })
      },

      loadTranslations: async (language: Language) => {
        try {
          set({ isLoading: true })
          
          // In a real app, you would load translations from an API or files
          // For now, we use the default translations
          const direction = language === 'ar' ? 'rtl' : 'ltr'
          const translations = defaultTranslations[language]
          
          set({
            language,
            direction,
            translations,
            isLoading: false,
          })
        } catch (error) {
          console.error('Failed to load translations:', error)
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'language-storage',
      partialize: (state) => ({
        language: state.language,
      }),
    }
  )
)

// Hook for easy translation usage
export const useTranslation = () => {
  const { getTranslation } = useLanguageStore()
  return { t: getTranslation }
}