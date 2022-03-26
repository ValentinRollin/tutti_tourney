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
  score: {
    type: String,
    required: false,
  },
  fini: {
    type: Boolean,
    default: false,
  },
});

exports.matchSchema = matchSchema;
