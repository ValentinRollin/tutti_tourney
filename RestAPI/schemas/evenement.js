const mongoose = require("mongoose");
const tournoi = require("./tournoi");

const evenementSchema = new mongoose.Schema({
  nomEvenement: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
  },
  description: {
    type: String,
    required: false,
  },
  tournois: {
    type: [tournoi.tournoiSchema],
  },
});

exports.evenementSchema = evenementSchema;

const Evenement = mongoose.model("Event", evenementSchema);
