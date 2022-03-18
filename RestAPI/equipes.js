const mongoose = require("mongoose");

const equipeSchema = new mongoose.Schema({
    nom: {
      type: String,
      required: true,
    },
    nbjoueur: {
      type: Number,
      required: true,
    },
    niveau: {
      type : String,
      required : true
    }
  });;

  const Equipe = mongoose.model("Equipe", equipeSchema);
  exports.equipeModel = Equipe;

//GET ALL
exports.getAll = function (req, res) {
  Equipe.find(function (error, equipes) {
    if (error) {
      res.send(error);
    } else {
      res.send(equipes);
    }
  });
};

//POST
exports.post = function (req, res) {

  const newEquipe = new Equipe({
    nom: req.body.nom,
    nbjoueur: req.body.nbjoueur,
  });

  newEquipe.save(function (error) {
    if (error) {
      res.send(error);
    } else {
      res.send("Ajout de l'équipe réussi.");
    }
  });
};

//DELETE ALL
exports.deleteAll = function (req, res) {

  Equipe.deleteMany(function (error) {
    if (error) {
      res.send(error);
    } else {
      res.send("Suppression des equipes réussi.");
    }
  });
};
