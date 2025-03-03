// models/TeacherProfile.js - Teacher profile model for EduBridge

const mongoose = require('mongoose');

const teacherProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: [true, 'Professional title is required']
  },
  institution: {
    type: String,
    required: [true, 'Institution/organization is required']
  },
  expertise: {
    type: String,
    required: [true, 'Areas of expertise are required']
  },
  biography: {
    type: String,
    required: [true, 'Biography is required']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  rejectionReason: {
    type: String
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  // Optional fields for additional teacher information
  certifications: [{
    name: String,
    issuer: String,
    dateIssued: Date,
    expiryDate: Date,
    certificateUrl: String
  }],
  education: [{
    institution: String,
    degree: String,
    fieldOfStudy: String,
    from: Date,
    to: Date,
    current: Boolean,
    description: String
  }],
  socialProfiles: {
    website: String,
    linkedin: String,
    twitter: String,
    github: String,
    youtube: String
  }
});

// Update the updatedAt field on save
teacherProfileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const TeacherProfile = mongoose.model('TeacherProfile', teacherProfileSchema);

module.exports = TeacherProfile;