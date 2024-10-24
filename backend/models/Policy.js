const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  version: {
    type: Number,
    default: 1,
  },
}, { timestamps: true }); // timestamps crea createdAt y updatedAt automáticamente

const Policy = mongoose.model('Policy', policySchema);

module.exports = Policy;