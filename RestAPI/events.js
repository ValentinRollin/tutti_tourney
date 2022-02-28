const mongoose = require("mongoose");
const tournoi = require('./tournois');

const eventSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    //ajouter condition : date >= date du jour)
  },
  tournois: [tournoi.tournoiModel.schema],
});

const Event = mongoose.model("Event", eventSchema);

//GET ALL
exports.getAll = function (req, res) {
  Event.find(function (error, events) {
    if (error) {
      res.send(error);
    } else {
      res.send(events);
    }
  });
};

//POST
exports.post = function (req, res) {
  //console.log(req.body.nom);
  //console.log(req.body.date);

  const newEvent = new Event({
    nom: req.body.nom,
    date: req.body.date,
  });

  newEvent.save(function (error) {
    if (error) {
      res.send(error);
    } else {
      res.send("Ajout de l'event réussi.");
    }
  });
};

//DELETE ALL
exports.deleteAll = function (req, res) {

  Event.deleteMany(function (error) {
    if (error) {
      res.send(error);
    } else {
      res.send("Suppression des events réussi.");
    }
  });
};
