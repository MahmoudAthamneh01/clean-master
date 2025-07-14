// Core Entity Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  language: Language;
  timezone: string;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone: string;
  address?: string;
  city?: string;
  region?: string;
  rating?: number;
  total_bookings: number;
  total_spent: number;
  notes?: string;
  whatsapp_number?: string;
  preferred_contact_method: ContactMethod;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  customer_id: string;
  customer?: Customer;
  service_id: string;
  service?: Service;
  agent_id?: string;
  agent?: User;
  appointment_date: string;
  appointment_time: string;
  duration: number; // in minutes
  status: AppointmentStatus;
  price: number;
  currency: string;
  notes?: string;
  address: string;
  city: string;
  region?: string;
  rooms?: number;
  square_meters?: number;
  special_requirements?: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  name_ar: string;
  description?: string;
  description_ar?: string;
  base_price: number;
  price_per_room?: number;
  price_per_sqm?: number;
  duration: number; // in minutes
  category: string;
  is_active: boolean;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: string;
  appointment_id: string;
  appointment?: Appointment;
  customer_id: string;
  customer?: Customer;
  invoice_number: string;
  amount: number;
  tax_amount: number;
  total_amount: number;
  currency: string;
  status: InvoiceStatus;
  due_date: string;
  paid_date?: string;
  payment_method?: PaymentMethod;
  notes?: string;
  items: InvoiceItem[];
  created_at: string;
  updated_at: string;
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Inventory {
  id: string;
  name: string;
  name_ar: string;
  category: string;
  sku?: string;
  current_stock: number;
  min_stock: number;
  max_stock: number;
  unit: string;
  cost_price: number;
  supplier?: string;
  expiry_date?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Ticket {
  id: string;
  customer_id: string;
  customer?: Customer;
  agent_id?: string;
  agent?: User;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  source: TicketSource;
  whatsapp_message_id?: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
}

export interface WhatsAppMessage {
  id: string;
  phone_number: string;
  customer_id?: string;
  message_type: MessageType;
  content: string;
  is_incoming: boolean;
  status: MessageStatus;
  template_name?: string;
  media_url?: string;
  created_at: string;
}

export interface PricingRule {
  id: string;
  name: string;
  service_id: string;
  region?: string;
  min_rooms?: number;
  max_rooms?: number;
  min_sqm?: number;
  max_sqm?: number;
  base_price: number;
  price_per_room?: number;
  price_per_sqm?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ChatbotFlow {
  id: string;
  name: string;
  trigger_keywords: string[];
  flow_data: FlowNode[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FlowNode {
  id: string;
  type: NodeType;
  title: string;
  content: string;
  options?: FlowOption[];
  next_node_id?: string;
  conditions?: FlowCondition[];
}

export interface FlowOption {
  text: string;
  value: string;
  next_node_id: string;
}

export interface FlowCondition {
  field: string;
  operator: string;
  value: string;
  next_node_id: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger_event: TriggerEvent;
  conditions: AutomationCondition[];
  actions: AutomationAction[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AutomationCondition {
  field: string;
  operator: string;
  value: string;
}

export interface AutomationAction {
  type: ActionType;
  parameters: Record<string, any>;
}

export interface NotificationLog {
  id: string;
  type: NotificationType;
  recipient: string;
  subject?: string;
  content: string;
  status: NotificationStatus;
  sent_at?: string;
  delivered_at?: string;
  error_message?: string;
  created_at: string;
}

// Enum Types
export type UserRole = 'admin' | 'supervisor' | 'agent' | 'customer';
export type UserStatus = 'active' | 'inactive' | 'suspended';
export type Language = 'ar' | 'en';
export type ContactMethod = 'whatsapp' | 'phone' | 'email';
export type AppointmentStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'rescheduled';
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
export type PaymentMethod = 'cash' | 'card' | 'transfer' | 'stc_pay' | 'mada';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketSource = 'whatsapp' | 'phone' | 'email' | 'dashboard';
export type MessageType = 'text' | 'image' | 'document' | 'template';
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';
export type NodeType = 'message' | 'question' | 'condition' | 'action';
export type TriggerEvent = 'appointment_created' | 'appointment_completed' | 'invoice_sent' | 'customer_registered';
export type ActionType = 'send_whatsapp' | 'send_email' | 'send_sms' | 'create_ticket' | 'update_field';
export type NotificationType = 'whatsapp' | 'email' | 'sms' | 'push';
export type NotificationStatus = 'pending' | 'sent' | 'delivered' | 'failed';

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
  meta?: {
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
  };
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
  remember?: boolean;
}

export interface CustomerForm {
  name: string;
  email?: string;
  phone: string;
  address?: string;
  city?: string;
  region?: string;
  notes?: string;
  preferred_contact_method: ContactMethod;
}

export interface AppointmentForm {
  customer_id: string;
  service_id: string;
  appointment_date: string;
  appointment_time: string;
  address: string;
  city: string;
  region?: string;
  rooms?: number;
  square_meters?: number;
  special_requirements?: string;
  notes?: string;
}

export interface ServiceForm {
  name: string;
  name_ar: string;
  description?: string;
  description_ar?: string;
  base_price: number;
  price_per_room?: number;
  price_per_sqm?: number;
  duration: number;
  category: string;
}

// Filter Types
export interface AppointmentFilters {
  status?: AppointmentStatus;
  agent_id?: string;
  date_from?: string;
  date_to?: string;
  service_id?: string;
  customer_id?: string;
}

export interface CustomerFilters {
  search?: string;
  city?: string;
  region?: string;
  rating_min?: number;
  contact_method?: ContactMethod;
}

export interface InvoiceFilters {
  status?: InvoiceStatus;
  customer_id?: string;
  date_from?: string;
  date_to?: string;
  amount_min?: number;
  amount_max?: number;
}

// Analytics Types
export interface DashboardStats {
  total_appointments_today: number;
  total_appointments_upcoming: number;
  total_revenue_month: number;
  total_customers: number;
  pending_tickets: number;
  unread_messages: number;
  low_stock_items: number;
  overdue_invoices: number;
}

export interface RevenueAnalytics {
  daily: { date: string; amount: number }[];
  monthly: { month: string; amount: number }[];
  by_service: { service_name: string; amount: number; count: number }[];
}

export interface AgentPerformance {
  agent_id: string;
  agent_name: string;
  completed_appointments: number;
  customer_rating: number;
  revenue_generated: number;
}

// Settings Types
export interface AppSettings {
  company_name: string;
  company_logo?: string;
  whatsapp_token?: string;
  whatsapp_phone_id?: string;
  whatsapp_webhook_token?: string;
  email_smtp_host?: string;
  email_smtp_port?: number;
  email_smtp_user?: string;
  email_smtp_password?: string;
  default_currency: string;
  default_timezone: string;
  default_language: Language;
  tax_rate: number;
  invoice_prefix: string;
  reminder_hours_before: number;
  auto_assign_agents: boolean;
}