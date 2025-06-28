import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  name: {
    ar: {
      type: String,
      required: [true, 'Arabic name is required'],
      trim: true
    },
    en: {
      type: String,
      required: [true, 'English name is required'],
      trim: true
    }
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  description: {
    ar: {
      type: String,
      required: [true, 'Arabic description is required']
    },
    en: {
      type: String,
      required: [true, 'English description is required']
    }
  },
  category: {
    type: String,
    required: [true, 'Service category is required'],
    enum: ['home', 'office', 'car', 'special'],
    default: 'home'
  },
  pricing: {
    basePrice: {
      type: Number,
      required: [true, 'Base price is required'],
      min: 0
    },
    currency: {
      type: String,
      default: 'SAR'
    },
    priceType: {
      type: String,
      enum: ['fixed', 'per_hour', 'per_sqm', 'custom'],
      default: 'fixed'
    },
    discountPrice: {
      type: Number,
      min: 0
    },
    additionalCharges: [{
      name: {
        ar: String,
        en: String
      },
      price: Number,
      optional: {
        type: Boolean,
        default: true
      }
    }]
  },
  duration: {
    estimated: {
      type: Number, // in minutes
      required: [true, 'Estimated duration is required']
    },
    minimum: Number,
    maximum: Number
  },
  features: [{
    ar: String,
    en: String
  }],
  includes: [{
    ar: String,
    en: String
  }],
  excludes: [{
    ar: String,
    en: String
  }],
  requirements: [{
    ar: String,
    en: String
  }],
  images: [{
    url: String,
    alt: {
      ar: String,
      en: String
    },
    isMain: {
      type: Boolean,
      default: false
    }
  }],
  availability: {
    workingDays: [{
      type: String,
      enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    }],
    workingHours: {
      start: String, // "08:00"
      end: String    // "22:00"
    },
    advanceBooking: {
      minimum: {
        type: Number,
        default: 2 // hours
      },
      maximum: {
        type: Number,
        default: 720 // hours (30 days)
      }
    }
  },
  serviceAreas: [{
    city: String,
    districts: [String],
    additionalCharge: {
      type: Number,
      default: 0
    }
  }],
  staff: {
    required: {
      type: Number,
      default: 1
    },
    skills: [String],
    equipment: [String]
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'coming_soon'],
    default: 'active'
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: {
    ar: [String],
    en: [String]
  },
  metaData: {
    seo: {
      title: {
        ar: String,
        en: String
      },
      description: {
        ar: String,
        en: String
      },
      keywords: {
        ar: [String],
        en: [String]
      }
    },
    analytics: {
      views: {
        type: Number,
        default: 0
      },
      bookings: {
        type: Number,
        default: 0
      },
      conversationRate: {
        type: Number,
        default: 0
      }
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for service bookings
ServiceSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'service',
  justOne: false
});

// Create slug from name before saving
ServiceSchema.pre('save', function(next) {
  if (this.isModified('name') || this.isNew) {
    this.slug = this.name.en.toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
  next();
});

// Update rating when new booking is added
ServiceSchema.methods.updateRating = async function() {
  const Booking = mongoose.model('Booking');
  
  const stats = await Booking.aggregate([
    {
      $match: { 
        service: this._id,
        status: 'completed',
        rating: { $exists: true, $ne: null }
      }
    },
    {
      $group: {
        _id: '$service',
        averageRating: { $avg: '$rating' },
        ratingCount: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    this.rating.average = Math.round(stats[0].averageRating * 10) / 10;
    this.rating.count = stats[0].ratingCount;
  } else {
    this.rating.average = 0;
    this.rating.count = 0;
  }

  await this.save();
};

// Static method to get popular services
ServiceSchema.statics.getPopularServices = function(limit = 10) {
  return this.find({ 
    status: 'active',
    isPopular: true 
  })
  .sort({ 'rating.average': -1, 'rating.count': -1 })
  .limit(limit);
};

// Static method to search services
ServiceSchema.statics.searchServices = function(query, language = 'ar') {
  const searchRegex = new RegExp(query, 'i');
  
  return this.find({
    status: 'active',
    $or: [
      { [`name.${language}`]: searchRegex },
      { [`description.${language}`]: searchRegex },
      { [`tags.${language}`]: { $in: [searchRegex] } }
    ]
  });
};

export default mongoose.model('Service', ServiceSchema); 