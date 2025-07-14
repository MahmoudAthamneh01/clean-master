import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = process.env.PORT || 8000;
const JWT_SECRET = 'mock-jwt-secret-key';

// Middleware
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Mock database
const users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@cleanease.pro',
    password: await bcrypt.hash('password', 10),
    role: 'admin',
    status: 'active',
    avatar: null,
    language: 'ar',
    timezone: 'Asia/Riyadh',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Mock response helper
const mockResponse = (data, message = 'Success') => ({
  success: true,
  data,
  message,
});

const mockError = (message, errors = null) => ({
  success: false,
  message,
  errors,
});

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json(mockError('Access token required'));
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json(mockError('Invalid or expired token'));
    }
    req.user = user;
    next();
  });
};

// Routes

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json(mockError('Email and password required'));
  }

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json(mockError('Invalid credentials'));
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json(mockError('Invalid credentials'));
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  const { password: _, ...userWithoutPassword } = user;
  
  res.json(mockResponse({ user: userWithoutPassword, token }));
});

app.post('/api/auth/logout', authenticateToken, (req, res) => {
  res.json(mockResponse(null, 'Logged out successfully'));
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json(mockError('User not found'));
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json(mockResponse(userWithoutPassword));
});

app.put('/api/auth/me', authenticateToken, (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.user.id);
  if (userIndex === -1) {
    return res.status(404).json(mockError('User not found'));
  }

  users[userIndex] = {
    ...users[userIndex],
    ...req.body,
    updated_at: new Date().toISOString(),
  };

  const { password: _, ...userWithoutPassword } = users[userIndex];
  res.json(mockResponse(userWithoutPassword));
});

// Dashboard analytics
app.get('/api/analytics/today', authenticateToken, (req, res) => {
  const stats = {
    total_appointments_today: 12,
    total_appointments_upcoming: 28,
    total_revenue_month: 15750,
    total_customers: 245,
    pending_tickets: 3,
    unread_messages: 7,
    low_stock_items: 2,
    overdue_invoices: 1,
  };
  
  res.json(mockResponse(stats));
});

// Appointments routes
app.get('/api/appointments', authenticateToken, (req, res) => {
  const appointments = [
    {
      id: '1',
      customer_id: '1',
      service_id: '1',
      appointment_date: '2024-01-15',
      appointment_time: '14:00',
      status: 'confirmed',
      price: 150,
      currency: 'SAR',
      address: 'Riyadh, Saudi Arabia',
      created_at: new Date().toISOString(),
    },
  ];

  res.json(mockResponse(appointments));
});

app.post('/api/appointments', authenticateToken, (req, res) => {
  const appointment = {
    id: Date.now().toString(),
    ...req.body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  res.status(201).json(mockResponse(appointment));
});

// Customers routes
app.get('/api/customers', authenticateToken, (req, res) => {
  const customers = [
    {
      id: '1',
      name: 'Ahmed Al-Rashid',
      phone: '+966501234567',
      email: 'ahmed@example.com',
      total_bookings: 5,
      total_spent: 750,
      rating: 4.8,
      created_at: new Date().toISOString(),
    },
  ];

  res.json(mockResponse(customers));
});

// Services routes
app.get('/api/services', authenticateToken, (req, res) => {
  const services = [
    {
      id: '1',
      name: 'Apartment Cleaning',
      name_ar: 'تنظيف الشقة',
      base_price: 150,
      duration: 120,
      category: 'residential',
      is_active: true,
    },
  ];

  res.json(mockResponse(services));
});

// Invoices routes
app.get('/api/invoices', authenticateToken, (req, res) => {
  const invoices = [
    {
      id: '1',
      invoice_number: 'INV-2024-001',
      customer_id: '1',
      amount: 150,
      tax_amount: 22.5,
      total_amount: 172.5,
      status: 'paid',
      due_date: '2024-01-20',
      created_at: new Date().toISOString(),
    },
  ];

  res.json(mockResponse(invoices));
});

// Inventory routes
app.get('/api/inventory', authenticateToken, (req, res) => {
  const inventory = [
    {
      id: '1',
      name: 'All-Purpose Cleaner',
      name_ar: 'منظف متعدد الأغراض',
      current_stock: 50,
      min_stock: 10,
      unit: 'bottles',
      cost_price: 15,
      is_active: true,
    },
  ];

  res.json(mockResponse(inventory));
});

// Tickets routes
app.get('/api/tickets', authenticateToken, (req, res) => {
  const tickets = [
    {
      id: '1',
      customer_id: '1',
      title: 'Cleaning quality complaint',
      status: 'open',
      priority: 'high',
      category: 'complaint',
      source: 'whatsapp',
      created_at: new Date().toISOString(),
    },
  ];

  res.json(mockResponse(tickets));
});

// WhatsApp messages routes
app.get('/api/whatsapp/messages', authenticateToken, (req, res) => {
  const messages = [
    {
      id: '1',
      phone_number: '+966501234567',
      content: 'I need to reschedule my appointment',
      is_incoming: true,
      status: 'delivered',
      created_at: new Date().toISOString(),
    },
  ];

  res.json(mockResponse(messages));
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json(mockError('Endpoint not found'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json(mockError('Internal server error'));
});

app.listen(PORT, () => {
  console.log(`🚀 Mock API server running on http://localhost:${PORT}`);
  console.log(`📚 API endpoints available at http://localhost:${PORT}/api`);
});