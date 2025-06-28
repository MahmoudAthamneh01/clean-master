export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`,
    error_ar: `المسار ${req.originalUrl} غير موجود`,
    message: 'The requested resource was not found on this server',
    message_ar: 'المورد المطلوب غير موجود على هذا الخادم'
  });
}; 