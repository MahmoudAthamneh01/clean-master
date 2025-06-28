import express from 'express';
import User from '../models/User.js';
import Service from '../models/Service.js';
import Booking from '../models/Booking.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes require admin access
router.use(protect);
router.use(authorize('admin'));

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private (Admin only)
router.get('/dashboard', async (req, res, next) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Get statistics
    const stats = {
      users: {
        total: await User.countDocuments(),
        new: await User.countDocuments({ createdAt: { $gte: startOfMonth } }),
        active: await User.countDocuments({ isActive: true })
      },
      services: {
        total: await Service.countDocuments(),
        active: await Service.countDocuments({ status: 'active' }),
        featured: await Service.countDocuments({ isFeatured: true })
      },
      bookings: {
        total: await Booking.countDocuments(),
        today: await Booking.countDocuments({ 
          scheduledDate: { $gte: startOfDay, $lt: new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000) }
        }),
        pending: await Booking.countDocuments({ status: 'pending' }),
        confirmed: await Booking.countDocuments({ status: 'confirmed' }),
        completed: await Booking.countDocuments({ status: 'completed' }),
        cancelled: await Booking.countDocuments({ status: 'cancelled' })
      }
    };

    // Calculate revenue
    const revenueData = await Booking.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$pricing.totalPrice' } } }
    ]);

    const monthlyRevenue = await Booking.aggregate([
      { 
        $match: { 
          status: 'completed',
          createdAt: { $gte: startOfMonth }
        } 
      },
      { $group: { _id: null, total: { $sum: '$pricing.totalPrice' } } }
    ]);

    stats.revenue = {
      total: revenueData[0]?.total || 0,
      monthly: monthlyRevenue[0]?.total || 0
    };

    // Recent bookings
    const recentBookings = await Booking.find()
      .populate('user', 'name phone')
      .populate('service', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        stats,
        recentBookings
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get bookings with filters
// @route   GET /api/admin/bookings
// @access  Private (Admin only)
router.get('/bookings', async (req, res, next) => {
  try {
    const {
      status,
      startDate,
      endDate,
      service,
      user,
      page = 1,
      limit = 20
    } = req.query;

    let query = {};

    if (status) query.status = status;
    if (service) query.service = service;
    if (user) query.user = user;

    if (startDate || endDate) {
      query.scheduledDate = {};
      if (startDate) query.scheduledDate.$gte = new Date(startDate);
      if (endDate) query.scheduledDate.$lte = new Date(endDate);
    }

    const bookings = await Booking.find(query)
      .populate('user', 'name phone email')
      .populate('service', 'name pricing.basePrice')
      .populate('assignedStaff.staff', 'name phone')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Booking.countDocuments(query);

    res.status(200).json({
      success: true,
      count: bookings.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      },
      data: bookings
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update booking status
// @route   PUT /api/admin/bookings/:id/status
// @access  Private (Admin only)
router.put('/bookings/:id/status', async (req, res, next) => {
  try {
    const { status, reason } = req.body;
    
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found',
        error_ar: 'الحجز غير موجود'
      });
    }

    await booking.updateStatus(status, req.user.id, reason);

    res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
      message_ar: 'تم تحديث حالة الحجز بنجاح',
      data: booking
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Assign staff to booking
// @route   PUT /api/admin/bookings/:id/assign
// @access  Private (Admin only)
router.put('/bookings/:id/assign', async (req, res, next) => {
  try {
    const { staffId, role = 'lead' } = req.body;
    
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found',
        error_ar: 'الحجز غير موجود'
      });
    }

    // Verify staff member exists and has staff role
    const staff = await User.findOne({ 
      _id: staffId, 
      role: { $in: ['staff', 'admin'] },
      isActive: true 
    });

    if (!staff) {
      return res.status(404).json({
        success: false,
        error: 'Staff member not found or inactive',
        error_ar: 'عضو الفريق غير موجود أو غير نشط'
      });
    }

    await booking.assignStaff(staffId, role);

    res.status(200).json({
      success: true,
      message: 'Staff assigned successfully',
      message_ar: 'تم تعيين الموظف بنجاح',
      data: booking
    });
  } catch (error) {
    next(error);
  }
});

export default router; 