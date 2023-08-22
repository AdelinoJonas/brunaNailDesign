const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório.']
  },
  email: String,
  phone:  {
    type: String,
    required: [true, 'Telefone é obrigatório.']
  },
  password: {
    type: String,
    default: null,
    required: [true, 'Senha é obrigatória.']
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  completedAppoint: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Appointment',
    }
  ]

});

module.exports = mongoose.model('User', user);