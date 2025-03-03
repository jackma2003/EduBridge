const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a course title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: [
      'Technology',
      'Business',
      'Science',
      'Arts',
      'Humanities',
      'Mathematics',
      'Language',
      'Health',
      'Other'
    ]
  },
  subcategory: {
    type: String
  },
  level: {
    type: String,
    required: [true, 'Please add a difficulty level'],
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coverImage: {
    type: String,
    default: 'default-course.jpg'
  },
  modules: [{
    title: {
      type: String,
      required: true
    },
    description: String,
    order: Number,
    lessons: [{
      title: {
        type: String,
        required: true
      },
      description: String,
      content: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content'
      },
      duration: Number, // in minutes
      order: Number
    }]
  }],
  prerequisites: [{
    type: String
  }],
  objectives: [{
    type: String
  }],
  duration: { // total duration in minutes
    type: Number
  },
  languages: [{
    type: String,
    default: 'English'
  }],
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  enrollments: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate slug from title
courseSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  }
  
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = Date.now();
  }
  
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.model('Course', courseSchema);