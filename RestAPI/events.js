const mongoose = require("mongoose");
const tournoi = require('./tournois');

const eventSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
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

  const newEvent = new Event({
    nom: req.body.nom,
    date: req.body.date,
  });
  //console.log(newEvent);

  newEvent.save(function (error) {
    if (error) {
      res.send(error);
    } else {
      res.send("Ajout de l'event réussi.");
    }
  });
};

//PUT
exports.put = function (req, res) {

  const name = req.params.nomEvent;
  const tournoi = req.body;
  Event.updateOne({nom: name}, {tournois: tournoi}, function (error) {
    if (error) {
      res.send(error);
    } else {
      res.send("Update de l'event réussi.");
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
