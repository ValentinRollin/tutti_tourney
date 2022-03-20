const mongoose = require("mongoose");

const evenementSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    //ajouter condition : date >= date du jour)
  }
});

const Evenement = mongoose.model("Evenement", evenementSchema);
exports.evenementModel = Evenement;
//GET ALL
exports.getAll = function (req, res) {
  Evenement.find(function (error, evenements) {
    if (error) {
      res.send(error);
    } else {
      res.send(evenements);
    }
  });
};

//POST
exports.post = function (req, res) {

  const newEvenement = new Evenement({
    nom: req.body.nom,
    date: req.body.date,
  });
  //console.log(newEvenement);

  newEvenement.save(function (error) {
    if (error) {
      res.send(error);
    } else {
      res.send("Ajout de l'evenement réussi.");
    }
  });
};

//PUT
exports.put = function (req, res) {

  const name = req.params.nomEvenement;
  const tournoi = req.body;
  Evenement.updateOne({nom: name}, {tournois: tournoi}, function (error) {
    if (error) {
      res.send(error);
    } else {
      res.send("Update de l'evenement réussi.");
    }
  });
};

//DELETE ALL
exports.deleteAll = function (req, res) {

  Evenement.deleteMany(function (error) {
    if (error) {
      res.send(error);
    } else {
      res.send("Suppression des evenements réussi.");
    }
  });
};
