import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Mock admin for testing when DB is not available
const MOCK_ADMIN = {
  id: 'admin123',
  _id: 'admin123',
  name: 'كلين ماستر - الإدارة',
  email: 'admin@cleanmaster.com',
  phone: '+966501234567',
  role: 'admin',
  preferences: { language: 'ar' },
  isActive: true
};

// Protect routes - verify JWT token
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route',
      error_ar: 'غير مخول للوصول إلى هذا المسار'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'clean-master-secret-key-2024');

    // Check if this is mock admin
    if (decoded.id === 'admin123' && decoded.role === 'admin') {
      req.user = MOCK_ADMIN;
      return next();
    }

    // Get user from database
    try {
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'User not found',
          error_ar: 'المستخدم غير موجود'
        });
      }
    } catch (dbError) {
      // If database is not available, check if it's mock admin
      if (decoded.id === 'admin123' && decoded.role === 'admin') {
        req.user = MOCK_ADMIN;
        return next();
      }
      
      return res.status(500).json({
        success: false,
        error: 'Database connection error',
        error_ar: 'خطأ في الاتصال بقاعدة البيانات'
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route',
      error_ar: 'غير مخول للوصول إلى هذا المسار'
    });
  }
};

// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role '${req.user.role}' is not authorized to access this route`,
        error_ar: `دور المستخدم '${req.user.role}' غير مخول للوصول إلى هذا المسار`
      });
    }
    next();
  };
};

// Optional authentication (for public routes that can benefit from user context)
export const optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'clean-master-secret-key-2024');
      
      // Check if this is mock admin
      if (decoded.id === 'admin123' && decoded.role === 'admin') {
        req.user = MOCK_ADMIN;
        return next();
      }
      
      try {
        req.user = await User.findById(decoded.id).select('-password');
      } catch (dbError) {
        // If database is not available, check if it's mock admin
        if (decoded.id === 'admin123' && decoded.role === 'admin') {
          req.user = MOCK_ADMIN;
        } else {
          req.user = null;
        }
      }
    } catch (error) {
      // Token is invalid, but we don't fail the request
      req.user = null;
    }
  }

  next();
}; 