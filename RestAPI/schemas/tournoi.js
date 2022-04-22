const mongoose = require("mongoose");
const equipe = require("./equipe");
const tour = require('./tour');

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
  tours : {
      type : [tour.tourSchema]
  },
  etat : {
    type : Number,
    enum : [ 0, 1, 2],
    default : 0 
  }
});

exports.tournoiSchema = tournoiSchema;
