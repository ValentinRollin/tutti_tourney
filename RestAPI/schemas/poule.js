const mongoose = require("mongoose");
const match = require("./match");
const equipe = require("./equipe");

const pouleSchema = new mongoose.Schema({
  numeroPoule: {
    type: Number,
    //required: true,
  },
  equipes: {
    type: [equipe.equipeSchema],
  },
  matchs: {
    type: [match.matchSchema],
  },
});

exports.pouleSchema = pouleSchema;
