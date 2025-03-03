const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Please specify content type'],
    enum: ['video', 'document', 'quiz', 'assignment', 'interactive']
  },
  description: {
    type: String
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // For video content
  videoUrl: {
    type: String
  },
  duration: {
    type: Number // in seconds
  },
  // For document content
  documentUrl: {
    type: String
  },
  documentType: {
    type: String,
    enum: ['pdf', 'docx', 'txt', 'html', 'md']
  },
  // For quiz content
  questions: [{
    question: {
      type: String
    },
    options: [{
      text: String,
      isCorrect: Boolean
    }],
    explanation: String
  }],
  // For assignment content
  instructions: {
    type: String
  },
  dueDate: {
    type: Date
  },
  maxScore: {
    type: Number
  },
  // For all content types
  tags: [{
    type: String
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  version: {
    type: Number,
    default: 1
  },
  previousVersions: [{
    version: Number,
    updatedAt: Date,
    changes: String
  }],
  language: {
    type: String,
    default: 'English'
  },
  translations: [{
    language: String,
    title: String,
    description: String,
    content: String // This could be a reference to another content or embedded content
  }],
  accessControl: {
    isPublic: {
      type: Boolean,
      default: true
    },
    allowedUsers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Increment version on update
contentSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    // Store previous version information
    if (!this.previousVersions) {
      this.previousVersions = [];
    }
    
    this.previousVersions.push({
      version: this.version,
      updatedAt: new Date(),
      changes: 'Updated content'
    });
    
    // Increment version number
    this.version += 1;
  }
  next();
});

module.exports = mongoose.model('Content', contentSchema);