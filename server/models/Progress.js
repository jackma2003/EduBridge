const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  enrolledAt: {
    type: Date,
    default: Date.now
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  },
  completedModules: [{
    moduleId: {
      type: mongoose.Schema.Types.ObjectId
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  }],
  completedLessons: [{
    lessonId: {
      type: mongoose.Schema.Types.ObjectId
    },
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content'
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    timeSpent: {
      type: Number, // in seconds
      default: 0
    }
  }],
  quizResults: [{
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content'
    },
    score: {
      type: Number
    },
    totalQuestions: {
      type: Number
    },
    correctAnswers: {
      type: Number
    },
    attemptedAt: {
      type: Date,
      default: Date.now
    },
    timeSpent: {
      type: Number // in seconds
    }
  }],
  assignmentSubmissions: [{
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content'
    },
    submissionUrl: {
      type: String
    },
    submittedAt: {
      type: Date,
      default: Date.now
    },
    grade: {
      type: Number
    },
    feedback: {
      type: String
    },
    gradedAt: {
      type: Date
    },
    gradedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  overallProgress: {
    type: Number, // percentage
    default: 0
  },
  certificateIssued: {
    type: Boolean,
    default: false
  },
  certificateIssuedAt: {
    type: Date
  },
  certificateUrl: {
    type: String
  },
  notes: [{
    lessonId: {
      type: mongoose.Schema.Types.ObjectId
    },
    content: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }],
  bookmarks: [{
    lessonId: {
      type: mongoose.Schema.Types.ObjectId
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    note: {
      type: String
    }
  }],
  lastSyncedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create a compound index to ensure a user can only have one progress record per course
progressSchema.index({ user: 1, course: 1 }, { unique: true });

// Update the lastAccessed timestamp on every update
progressSchema.pre('save', function(next) {
  this.lastAccessed = Date.now();
  next();
});

// Method to calculate overall progress
progressSchema.methods.calculateOverallProgress = async function(courseId) {
  const Course = mongoose.model('Course');
  
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return this.overallProgress;
    }
    
    let totalLessons = 0;
    let completedLessons = this.completedLessons.length;
    
    // Count total lessons in the course
    course.modules.forEach(module => {
      totalLessons += module.lessons.length;
    });
    
    if (totalLessons === 0) {
      return 0;
    }
    
    const progress = Math.round((completedLessons / totalLessons) * 100);
    this.overallProgress = progress;
    
    // Check if certificate should be issued
    if (progress === 100 && !this.certificateIssued) {
      this.certificateIssued = true;
      this.certificateIssuedAt = Date.now();
      // Certificate URL would typically be generated here or by a separate process
    }
    
    return progress;
  } catch (error) {
    console.error('Error calculating progress:', error);
    return this.overallProgress;
  }
};

module.exports = mongoose.model('Progress', progressSchema);