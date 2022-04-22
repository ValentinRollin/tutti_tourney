const mongoose = require("mongoose");
const poule = require("./poule");
const equipe = require("./equipe");

const tourSchema = new mongoose.Schema({
  numeroTour: {
    type: Number,
    //required: true,
  },
  equipes: {
    type: [equipe.equipeSchema],
  },
  poules: {
    type: [poule.pouleSchema],
  },
});

exports.tourSchema = tourSchema;
