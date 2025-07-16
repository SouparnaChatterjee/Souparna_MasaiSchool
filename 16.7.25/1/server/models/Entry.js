const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  userId: String,
  date: String,
  studyHours: Number,
  breakTime: Number,
  sleepHours: Number,
  stressLevel: Number,
  focusLevel: Number,
  reflection: String,
  sharedWithMentor: { type: Boolean, default: false }
});

module.exports = mongoose.model('Entry', entrySchema);
