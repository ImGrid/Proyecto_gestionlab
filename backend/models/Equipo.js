const mongoose = require('mongoose');

const equipoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  buen: { type: String, required: true },
  mal: { type: String, required: true },
  total: { type: String, required: true }
});

module.exports = mongoose.model('Equipo', equipoSchema);
