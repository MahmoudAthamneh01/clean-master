import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { testSupabaseConnection } from './config/supabase.js';

// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import serviceRoutes from './routes/services.js';
import bookingRoutes from './routes/bookings.js';
import adminRoutes from './routes/admin.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    message_ar: 'عدد كبير من الطلبات من هذا العنوان، يرجى المحاولة لاحقاً.'
  }
});

app.use(limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://cleanmaster.sa', 'https://www.cleanmaster.sa']
    : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', async (req, res) => {
  const dbStatus = await testSupabaseConnection();
  res.status(200).json({
    status: 'OK',
    message: 'Clean Master API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: dbStatus ? 'Connected' : 'Disconnected'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

// Welcome route
app.get('/', async (req, res) => {
  const dbStatus = await testSupabaseConnection();
  res.json({
    message: 'Welcome to Clean Master API',
    message_ar: 'مرحباً بك في واجهة برمجة تطبيقات كلين ماستر',
    version: '1.0.0',
    documentation: '/api/docs',
    database: dbStatus ? 'Connected' : 'Disconnected'
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server with Supabase
const startServer = async () => {
  // Test Supabase connection
  const dbConnected = await testSupabaseConnection();
  
  const server = app.listen(PORT, () => {
    console.log(`🚀 Clean Master Server running on port ${PORT}`);
    console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    console.log(`🔗 Mock Admin: POST http://localhost:${PORT}/api/auth/mock-admin`);
    
    if (!dbConnected) {
      console.log('⚠️  Running in MOCK MODE - Database not connected');
      console.log('🎭 Mock admin available for testing');
      console.log('📝 Please check your Supabase configuration');
    } else {
      console.log('🗄️  Supabase database connected successfully');
    }
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => {
      process.exit(1);
    });
  });
};

startServer(); 