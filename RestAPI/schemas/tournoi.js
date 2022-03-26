const mongoose = require("mongoose");
const equipe = require("./equipe");
const poule = require('./poule');

const tournoiSchema = new mongoose.Schema({
  nomTournoi: {
    type: String,
    required: true,
  },
  sport: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  equipes: {
    type: [equipe.equipeSchema],
  },
  poules : {
      type : [poule.pouleSchema]
  }
});

exports.tournoiSchema = tournoiSchema;
