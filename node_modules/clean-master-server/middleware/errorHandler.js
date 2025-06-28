export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    const message_ar = 'المورد غير موجود';
    error = { message, message_ar };
    return res.status(404).json({
      success: false,
      error: error.message,
      error_ar: error.message_ar
    });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    const message_ar = 'القيمة المدخلة موجودة مسبقاً';
    error = { message, message_ar };
    return res.status(400).json({
      success: false,
      error: error.message,
      error_ar: error.message_ar
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    const message_ar = 'خطأ في البيانات المدخلة';
    error = { message, message_ar };
    return res.status(400).json({
      success: false,
      error: error.message,
      error_ar: error.message_ar
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    const message_ar = 'رمز مميز غير صالح';
    return res.status(401).json({
      success: false,
      error: message,
      error_ar: message_ar
    });
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    const message_ar = 'انتهت صلاحية الرمز المميز';
    return res.status(401).json({
      success: false,
      error: message,
      error_ar: message_ar
    });
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
    error_ar: error.message_ar || 'خطأ في الخادم'
  });
}; 