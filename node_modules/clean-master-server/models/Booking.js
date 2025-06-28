import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  service: {
    type: mongoose.Schema.ObjectId,
    ref: 'Service',
    required: [true, 'Service is required']
  },
  bookingNumber: {
    type: String,
    unique: true,
    required: true
  },
  scheduledDate: {
    type: Date,
    required: [true, 'Scheduled date is required']
  },
  scheduledTime: {
    start: {
      type: String, // "09:00"
      required: [true, 'Start time is required']
    },
    end: {
      type: String // "11:00" - calculated based on service duration
    }
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      default: 'الرياض'
    },
    district: {
      type: String,
      required: [true, 'District is required']
    },
    buildingNumber: String,
    unitNumber: String,
    additionalInfo: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  contact: {
    name: {
      type: String,
      required: [true, 'Contact name is required']
    },
    phone: {
      type: String,
      required: [true, 'Contact phone is required']
    },
    alternativePhone: String,
    email: String
  },
  pricing: {
    basePrice: {
      type: Number,
      required: [true, 'Base price is required']
    },
    additionalCharges: [{
      name: {
        ar: String,
        en: String
      },
      price: Number,
      quantity: {
        type: Number,
        default: 1
      }
    }],
    discount: {
      type: Number,
      default: 0
    },
    discountType: {
      type: String,
      enum: ['percentage', 'fixed'],
      default: 'fixed'
    },
    tax: {
      type: Number,
      default: 0
    },
    totalPrice: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'SAR'
    }
  },
  status: {
    type: String,
    enum: [
      'pending',        // Waiting for confirmation
      'confirmed',      // Confirmed by admin/staff
      'assigned',       // Staff assigned
      'in_progress',    // Work started
      'completed',      // Work finished
      'cancelled',      // Cancelled by user/admin
      'rescheduled',    // Date/time changed
      'no_show'         // Customer not available
    ],
    default: 'pending'
  },
  assignedStaff: [{
    staff: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['lead', 'assistant'],
      default: 'lead'
    },
    assignedAt: {
      type: Date,
      default: Date.now
    }
  }],
  specialRequests: {
    type: String,
    maxlength: [500, 'Special requests cannot exceed 500 characters']
  },
  workDetails: {
    startTime: Date,
    endTime: Date,
    actualDuration: Number, // in minutes
    workCompleted: [String],
    materials: [{
      name: String,
      quantity: Number,
      cost: Number
    }],
    beforePhotos: [String],
    afterPhotos: [String],
    notes: String
  },
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    serviceQuality: {
      type: Number,
      min: 1,
      max: 5
    },
    staffBehavior: {
      type: Number,
      min: 1,
      max: 5
    },
    punctuality: {
      type: Number,
      min: 1,
      max: 5
    },
    wouldRecommend: Boolean,
    submittedAt: Date
  },
  payment: {
    method: {
      type: String,
      enum: ['cash', 'card', 'transfer', 'wallet'],
      default: 'cash'
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paidAt: Date,
    refundedAt: Date,
    refundAmount: Number
  },
  communication: [{
    type: {
      type: String,
      enum: ['call', 'sms', 'whatsapp', 'email', 'internal_note'],
      required: true
    },
    content: String,
    sentBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    sentAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['sent', 'delivered', 'read', 'failed'],
      default: 'sent'
    }
  }],
  cancellation: {
    reason: String,
    cancelledBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    cancelledAt: Date,
    refundAmount: Number
  },
  reschedule: {
    previousDate: Date,
    previousTime: String,
    reason: String,
    requestedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    requestedAt: Date
  },
  metadata: {
    source: {
      type: String,
      enum: ['website', 'whatsapp', 'phone', 'admin'],
      default: 'website'
    },
    deviceInfo: String,
    ipAddress: String,
    referrer: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
BookingSchema.index({ user: 1, status: 1 });
BookingSchema.index({ service: 1, status: 1 });
BookingSchema.index({ scheduledDate: 1, status: 1 });
BookingSchema.index({ bookingNumber: 1 });
BookingSchema.index({ 'assignedStaff.staff': 1 });

// Generate booking number before saving
BookingSchema.pre('save', async function(next) {
  if (this.isNew) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    // Find the last booking number for today
    const lastBooking = await this.constructor.findOne({
      bookingNumber: new RegExp(`^CM${year}${month}${day}`)
    }).sort({ bookingNumber: -1 });
    
    let sequence = 1;
    if (lastBooking) {
      const lastSequence = parseInt(lastBooking.bookingNumber.slice(-3));
      sequence = lastSequence + 1;
    }
    
    this.bookingNumber = `CM${year}${month}${day}${sequence.toString().padStart(3, '0')}`;
  }
  
  next();
});

// Calculate end time based on service duration
BookingSchema.pre('save', async function(next) {
  if (this.isModified('scheduledTime.start') || this.isModified('service')) {
    if (this.service && this.scheduledTime.start) {
      const Service = mongoose.model('Service');
      const service = await Service.findById(this.service);
      
      if (service && service.duration.estimated) {
        const [hours, minutes] = this.scheduledTime.start.split(':').map(Number);
        const startTime = new Date();
        startTime.setHours(hours, minutes, 0, 0);
        
        const endTime = new Date(startTime.getTime() + service.duration.estimated * 60000);
        this.scheduledTime.end = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;
      }
    }
  }
  
  next();
});

// Virtual for booking duration
BookingSchema.virtual('duration').get(function() {
  if (this.workDetails.startTime && this.workDetails.endTime) {
    return Math.round((this.workDetails.endTime - this.workDetails.startTime) / (1000 * 60));
  }
  return null;
});

// Virtual for days until booking
BookingSchema.virtual('daysUntilBooking').get(function() {
  const today = new Date();
  const bookingDate = new Date(this.scheduledDate);
  const diffTime = bookingDate - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Method to calculate total price
BookingSchema.methods.calculateTotalPrice = function() {
  let total = this.pricing.basePrice;
  
  // Add additional charges
  if (this.pricing.additionalCharges) {
    this.pricing.additionalCharges.forEach(charge => {
      total += charge.price * (charge.quantity || 1);
    });
  }
  
  // Apply discount
  if (this.pricing.discount > 0) {
    if (this.pricing.discountType === 'percentage') {
      total -= (total * this.pricing.discount / 100);
    } else {
      total -= this.pricing.discount;
    }
  }
  
  // Add tax
  if (this.pricing.tax > 0) {
    total += (total * this.pricing.tax / 100);
  }
  
  this.pricing.totalPrice = Math.round(total * 100) / 100;
  return this.pricing.totalPrice;
};

// Method to update status with notification
BookingSchema.methods.updateStatus = async function(newStatus, updatedBy, reason = '') {
  const oldStatus = this.status;
  this.status = newStatus;
  
  // Add communication log
  this.communication.push({
    type: 'internal_note',
    content: `Status changed from ${oldStatus} to ${newStatus}. ${reason}`,
    sentBy: updatedBy
  });
  
  await this.save();
  
  // TODO: Send notification to user
  // this.sendStatusNotification(oldStatus, newStatus);
  
  return this;
};

// Method to assign staff
BookingSchema.methods.assignStaff = function(staffId, role = 'lead') {
  // Remove existing assignment for this role
  this.assignedStaff = this.assignedStaff.filter(assignment => assignment.role !== role);
  
  // Add new assignment
  this.assignedStaff.push({
    staff: staffId,
    role: role,
    assignedAt: new Date()
  });
  
  if (this.status === 'confirmed') {
    this.status = 'assigned';
  }
  
  return this.save();
};

// Static method to get bookings by date range
BookingSchema.statics.getBookingsByDateRange = function(startDate, endDate, status = null) {
  const query = {
    scheduledDate: {
      $gte: startDate,
      $lte: endDate
    }
  };
  
  if (status) {
    query.status = status;
  }
  
  return this.find(query)
    .populate('user', 'name phone email')
    .populate('service', 'name pricing.basePrice')
    .populate('assignedStaff.staff', 'name phone')
    .sort({ scheduledDate: 1, 'scheduledTime.start': 1 });
};

// Static method to get booking statistics
BookingSchema.statics.getBookingStats = async function(dateRange = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - dateRange);
  
  const stats = await this.aggregate([
    { $match: { createdAt: { $gte: startDate } } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalRevenue: { $sum: '$pricing.totalPrice' }
      }
    }
  ]);
  
  return stats;
};

export default mongoose.model('Booking', BookingSchema); 