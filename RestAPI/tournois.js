const mongoose = require("mongoose");
const equipe = require("./equipes");

const tournoiSchema = new mongoose.Schema({
    nom: {
      type: String,
      required: true,
    },
    sport: {
      type: String,
      required: true,
    },
    equipes: [equipe.equipeModel.schema]
  });

  const Tournoi = mongoose.model("Tournoi", tournoiSchema);
  exports.tournoiModel = Tournoi;

//GET ALL
exports.getAll = function (req, res) {
  Tournoi.find(function (error, tournois) {
    if (error) {
      res.send(error);
    } else {
      res.send(tournois);
    }
  });
};

//POST
exports.post = function (req, res) {

  const newTournoi = new Tournoi({
    nom: req.body.nom,
    sport: req.body.sport,
  });

  newTournoi.save(function (error) {
    if (error) {
      res.send(error);
    } else {
      res.send("Ajout du tournoi réussi.");
    }
  });
};

//DELETE ALL
exports.deleteAll = function (req, res) {

  Tournoi.deleteMany(function (error) {
    if (error) {
      res.send(error);
    } else {
      res.send("Suppression des tournois réussi.");
    }
  });
};
