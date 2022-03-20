const mongoose = require("mongoose");
const Evenement = require("./evenements");

const tournoiSchema = new mongoose.Schema({
    nom: {
      type: String,
      required: true,
    },
    sport: {
      type: String,
      required: true,
    },
    evenement: Evenement.evenementModel.schema
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

exports.get = function (req, res) {
  const name = req.params.nomEvenement;
  Tournoi.find( { 'evenement.nom' : name }, function (error, tournois) {
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
    evenement: req.body.evenement
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
