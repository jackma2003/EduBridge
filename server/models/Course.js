// models/Course.js - Course model for EduBridge

// Update to the Course.js model file
// Add completedContent array to the enrolledStudents schema

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
    },
    // Add the completedContent array to track completed lessons
    completedContent: [{
      contentId: {
        type: mongoose.Schema.Types.ObjectId
      },
      moduleIndex: {
        type: Number
      },
      completedAt: {
        type: Date,
        default: Date.now
      }
    }]
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
  // Add averageRating as an actual field in the schema
  averageRating: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { 
  // Add toJSON configuration to include virtuals
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Pre-save middleware to calculate average rating before saving
courseSchema.pre('save', function(next) {
  // Only calculate if there are ratings
  if (this.ratings && this.ratings.length > 0) {
    const totalRating = this.ratings.reduce((sum, item) => sum + item.rating, 0);
    this.averageRating = parseFloat((totalRating / this.ratings.length).toFixed(1));
  } else {
    this.averageRating = 0;
  }
  
  // Update the updatedAt field
  this.updatedAt = Date.now();
  
  next();
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;