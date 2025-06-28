import express from 'express';
import Booking from '../models/Booking.js';
import Service from '../models/Service.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
router.get('/', protect, async (req, res, next) => {
  try {
    let query = {};
    
    // If not admin, only show user's bookings
    if (req.user.role !== 'admin') {
      query.user = req.user.id;
    }

    const bookings = await Booking.find(query)
      .populate('user', 'name phone email')
      .populate('service', 'name pricing.basePrice')
      .populate('assignedStaff.staff', 'name phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
router.get('/:id', protect, async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name phone email')
      .populate('service')
      .populate('assignedStaff.staff', 'name phone email');

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found',
        error_ar: 'الحجز غير موجود'
      });
    }

    // Check if user owns this booking or is admin
    if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this booking',
        error_ar: 'غير مخول للوصول إلى هذا الحجز'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
router.post('/', protect, async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    // Get service to calculate pricing
    const service = await Service.findById(req.body.service);
    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
        error_ar: 'الخدمة غير موجودة'
      });
    }

    // Set base price from service
    req.body.pricing = {
      basePrice: service.pricing.basePrice,
      totalPrice: service.pricing.basePrice,
      currency: service.pricing.currency
    };

    const booking = await Booking.create(req.body);

    // Calculate final price
    booking.calculateTotalPrice();
    await booking.save();

    // Populate the booking
    await booking.populate('service', 'name pricing');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      message_ar: 'تم إنشاء الحجز بنجاح',
      data: booking
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
router.put('/:id', protect, async (req, res, next) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found',
        error_ar: 'الحجز غير موجود'
      });
    }

    // Check ownership or admin
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this booking',
        error_ar: 'غير مخول لتحديث هذا الحجز'
      });
    }

    booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('service', 'name pricing');

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      message_ar: 'تم تحديث الحجز بنجاح',
      data: booking
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
router.put('/:id/cancel', protect, async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found',
        error_ar: 'الحجز غير موجود'
      });
    }

    // Check ownership or admin
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to cancel this booking',
        error_ar: 'غير مخول لإلغاء هذا الحجز'
      });
    }

    // Update booking status
    await booking.updateStatus('cancelled', req.user.id, req.body.reason);

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      message_ar: 'تم إلغاء الحجز بنجاح',
      data: booking
    });
  } catch (error) {
    next(error);
  }
});

export default router; 