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
    type: Number,
    required: true,
    max: 10
  },
  description: {
    type: String,
    required: false,
  },
});

exports.equipeSchema = equipeSchema;
