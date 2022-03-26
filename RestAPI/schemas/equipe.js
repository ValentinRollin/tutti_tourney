const mongoose = require("mongoose");

const equipeSchema = new mongoose.Schema({
  nomEquipe: {
    type: String,
    required: true,
  },
  nbjoueur: {
    type: Number,
    required: true,
  },
  niveau: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

exports.equipeSchema = equipeSchema;
