import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// TEMPORARY: Mock admin for testing when DB is not available
const MOCK_ADMIN = {
  id: 'admin123',
  name: 'كلين ماستر - الإدارة',
  email: 'admin@cleanmaster.com',
  phone: '+966501234567',
  role: 'admin',
  password: '$2a$10$h8IQJPgWvCkUqMOZ6tS5O.kpQ6/cUX4NcQ3HZE7UO9LNZ6tS5O123' // 'admin123'
};

// @desc    Mock admin login (temporary for testing)
// @route   POST /api/auth/mock-admin
// @access  Public (for testing only)
router.post('/mock-admin', async (req, res) => {
  try {
    // Create token for mock admin
    const token = jwt.sign(
      { id: MOCK_ADMIN.id, role: MOCK_ADMIN.role },
      process.env.JWT_SECRET || 'clean-master-secret-key-2024',
      { expiresIn: '30d' }
    );

    res.status(200).json({
      success: true,
      message: 'Mock admin login successful',
      message_ar: 'تم تسجيل دخول المدير التجريبي بنجاح',
      token,
      user: {
        id: MOCK_ADMIN.id,
        name: MOCK_ADMIN.name,
        email: MOCK_ADMIN.email,
        phone: MOCK_ADMIN.phone,
        role: MOCK_ADMIN.role,
        preferences: { language: 'ar' }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      error_ar: 'خطأ في الخادم'
    });
  }
});

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User with this email or phone already exists',
        error_ar: 'مستخدم بهذا البريد الإلكتروني أو رقم الهاتف موجود بالفعل'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password
    });

    // Create token
    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      message_ar: 'تم تسجيل المستخدم بنجاح',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        preferences: user.preferences
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res, next) => {
  try {
    const { email, phone, password, role } = req.body;

    // Admin emails list
    const adminEmails = [
      'admin@cleanmaster.sa',
      'mahmoud@cleanmaster.sa', 
      'manager@cleanmaster.sa'
    ];

    // Validate email/phone and password
    if ((!email && !phone) || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email/phone and password',
        error_ar: 'يرجى تقديم البريد الإلكتروني/الهاتف وكلمة المرور'
      });
    }

    // For admin emails, use hardcoded credentials
    if (email && adminEmails.includes(email.toLowerCase())) {
      // Simple admin authentication (you can make this more secure later)
      if (password === 'admin123' || password === 'cleanmaster2024') {
        const token = jwt.sign(
          { id: 'admin_' + email.split('@')[0], role: 'admin' },
          process.env.JWT_SECRET || 'clean-master-secret-key-2024',
          { expiresIn: '30d' }
        );

        return res.status(200).json({
          success: true,
          message: 'Admin login successful',
          message_ar: 'تم تسجيل دخول المدير بنجاح',
          token,
          user: {
            id: 'admin_' + email.split('@')[0],
            name: 'مدير كلين ماستر',
            email: email,
            phone: '+966501234567',
            role: 'admin',
            preferences: { language: 'ar' }
          }
        });
      } else {
        return res.status(401).json({
          success: false,
          error: 'Invalid admin credentials',
          error_ar: 'بيانات دخول المدير غير صحيحة'
        });
      }
    }

    // Check for regular user in database
    const query = email ? { email } : { phone };
    const user = await User.findOne(query).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
        error_ar: 'بيانات الاعتماد غير صحيحة'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
        error_ar: 'بيانات الاعتماد غير صحيحة'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Account is deactivated',
        error_ar: 'الحساب معطل'
      });
    }

    // Update last login
    await user.updateLastLogin();

    // Create token
    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      message: 'Login successful',
      message_ar: 'تم تسجيل الدخول بنجاح',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        preferences: user.preferences,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('bookings', 'bookingNumber status scheduledDate');

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
router.put('/me', protect, async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      preferences: req.body.preferences
    };

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(key => 
      fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      message_ar: 'تم تحديث الملف الشخصي بنجاح',
      data: user
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
router.put('/updatepassword', protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
      return res.status(401).json({
        success: false,
        error: 'Password is incorrect',
        error_ar: 'كلمة المرور غير صحيحة'
      });
    }

    user.password = req.body.newPassword;
    await user.save();

    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully',
      message_ar: 'تم تحديث كلمة المرور بنجاح',
      token
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
router.post('/forgotpassword', async (req, res, next) => {
  try {
    const { email, phone } = req.body;
    
    if (!email && !phone) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email or phone number',
        error_ar: 'يرجى تقديم البريد الإلكتروني أو رقم الهاتف'
      });
    }

    const query = email ? { email } : { phone };
    const user = await User.findOne(query);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
        error_ar: 'المستخدم غير موجود'
      });
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // TODO: Send email/SMS with reset token
    // For now, we'll just return the token (remove this in production)
    res.status(200).json({
      success: true,
      message: 'Reset token sent',
      message_ar: 'تم إرسال رمز إعادة التعيين',
      resetToken // Remove this in production
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Reset password
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
router.put('/resetpassword/:resettoken', async (req, res, next) => {
  try {
    // Hash the token and find user
    const resetPasswordToken = bcrypt.hashSync(req.params.resettoken, 10);
    
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired token',
        error_ar: 'رمز غير صالح أو منتهي الصلاحية'
      });
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      message: 'Password reset successful',
      message_ar: 'تم إعادة تعيين كلمة المرور بنجاح',
      token
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
router.post('/logout', protect, (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
    message_ar: 'تم تسجيل الخروج بنجاح',
    data: {}
  });
});

export default router; 