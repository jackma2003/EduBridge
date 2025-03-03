// models/Course.js - Course model for EduBridge

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: [100, 'Course title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Course description is required']
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Course must have an instructor']
  },
  coverImage: {
    type: String,
    default: 'default-course.jpg'
  },
  languages: [{
    type: String,
    enum: ['en', 'es', 'fr'],
    default: ['en']
  }],
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: [true, 'Course level is required']
  },
  topics: [{
    type: String,
    required: [true, 'At least one topic is required']
  }],
  modules: [{
    title: {
      type: String,
      required: [true, 'Module title is required']
    },
    description: {
      type: String
    },
    content: [{
      type: {
        type: String,
        enum: ['video', 'document', 'quiz', 'assignment'],
        required: [true, 'Content type is required']
      },
      title: {
        type: String,
        required: [true, 'Content title is required']
      },
      description: {
        type: String
      },
      url: {
        type: String
      },
      duration: {
        type: Number // in minutes
      },
      isDownloadable: {
        type: Boolean,
        default: false
      }
    }]
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  enrolledStudents: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    progress: {
      type: Number,
      default: 0 // percentage
    }
  }],
  ratings: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Rating value is required']
    },
    review: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate average rating
courseSchema.virtual('averageRating').get(function() {
  if (this.ratings.length === 0) return 0;
  
  const sum = this.ratings.reduce((total, rating) => total + rating.rating, 0);
  return (sum / this.ratings.length).toFixed(1);
});

// Update the updatedAt field on save
courseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;