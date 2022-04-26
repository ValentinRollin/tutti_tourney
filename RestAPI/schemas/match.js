const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  nomEquipe1: {
    type: String,
    required: true,
  },
  nomEquipe2: {
    type: String,
    required: true,
  },
  scoreEquipe1: {
    type: Number,
    required: false,
    default: 0
  },
  scoreEquipe2: {
    type: Number,
    required: false,
    default: 0
  },
  etat: {
    type: Boolean,
    default: false,
  },
});

exports.matchSchema = matchSchema;
