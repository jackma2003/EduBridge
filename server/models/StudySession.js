// models/StudySession.js
const mongoose = require('mongoose');

const studySessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  day: {
    type: String,
    required: [true, 'Day is required'],
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required']
  },
  time: {
    type: String,
    required: [true, 'Time is required']
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const StudySession = mongoose.model('StudySession', studySessionSchema);

module.exports = StudySession;