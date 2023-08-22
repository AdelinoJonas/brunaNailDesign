const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schedules = new Schema({
  registerDate: {
    type: Date,
    default: Date.now,
  },
  time: {
    type: Date,
    required: true
  },
  services: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Service',
      required: true
    },
  ],
  dias: {
    type: [Number],
    required: true
  },
  startAppoint: {
    type: Date,
    required: true
  },
  endAppoint: {
    type: Date,
    required: true
  },
});

module.exports = mongoose.model('Schedules', schedules);