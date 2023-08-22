const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const service = new Schema({
  title: {
    type: String,
    required: [true, 'O Título é obrigatório.']
  },
  description: {
    type: String,
    required: [true, 'uma descrição é obrigatória.']
  },
  price: {
    type: String,
    required: [true, 'O Preço é obrigatório.']
  },
  time: {
    type: String,
    required: [true, 'A duração é obrigatória.']
  },
  image: {
    type: String,
    default: null
  },
  isCourse: {
    type: Boolean,
    default: false
  }
  
});

module.exports = mongoose.model('Service', service);