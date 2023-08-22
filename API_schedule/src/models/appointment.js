const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointment = new Schema({
  registerDate: {
    type: Date,
    default: Date.now,
  },
  serviceId: {
    type: mongoose.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Appointment', appointment);