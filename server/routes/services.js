import express from 'express';
import Service from '../models/Service.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all services
// @route   GET /api/services
// @access  Public
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const {
      category,
      featured,
      popular,
      search,
      language = 'ar',
      sort = 'name.ar',
      page = 1,
      limit = 10
    } = req.query;

    // Build query
    let query = { status: 'active' };
    
    if (category) query.category = category;
    if (featured === 'true') query.isFeatured = true;
    if (popular === 'true') query.isPopular = true;
    
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { [`name.${language}`]: searchRegex },
        { [`description.${language}`]: searchRegex },
        { [`tags.${language}`]: { $in: [searchRegex] } }
      ];
    }

    // Execute query
    const services = await Service.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Service.countDocuments(query);

    res.status(200).json({
      success: true,
      count: services.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      },
      data: services
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
        error_ar: 'الخدمة غير موجودة'
      });
    }

    // Increment view count
    service.metaData.analytics.views += 1;
    await service.save();

    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Create new service
// @route   POST /api/services
// @access  Private (Admin only)
router.post('/', protect, authorize('admin'), async (req, res, next) => {
  try {
    const service = await Service.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      message_ar: 'تم إنشاء الخدمة بنجاح',
      data: service
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private (Admin only)
router.put('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
        error_ar: 'الخدمة غير موجودة'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      message_ar: 'تم تحديث الخدمة بنجاح',
      data: service
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
        error_ar: 'الخدمة غير موجودة'
      });
    }

    await service.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully',
      message_ar: 'تم حذف الخدمة بنجاح',
      data: {}
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get popular services
// @route   GET /api/services/popular/list
// @access  Public
router.get('/popular/list', async (req, res, next) => {
  try {
    const { limit = 6 } = req.query;
    const services = await Service.getPopularServices(parseInt(limit));

    res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    next(error);
  }
});

export default router; 