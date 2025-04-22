// models/LearningGoal.js
const mongoose = require('mongoose');

const learningGoalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: [true, 'Goal text is required']
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

const LearningGoal = mongoose.model('LearningGoal', learningGoalSchema);

module.exports = LearningGoal;