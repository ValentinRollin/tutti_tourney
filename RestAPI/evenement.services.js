const mongoose = require("mongoose");
const evenement = require("./schemas/evenement");

const Evenement = mongoose.model("Evenement", evenement.evenementSchema);

//Appel GET pour tout les evenements
exports.getAllEvenement = function (req, res) {
  Evenement.find(function (error, evenements) {
    if (error) {
      res.send(error);
    } else {
      res.send(evenements);
    }
  });
};
//Appel GET pour tout les tournois d'un evenement
exports.getTournois = function (req, res) {
  const name = req.params.evenement;
  Evenement.findOne({ evenement: name }, function (error, evenement) {
    if (error) {
      res.send(error);
    } else {
      res.send(evenement.tournois);
    }
  });
};
//Appel GET pour toutes les equipes d'un tournoi
exports.getEquipes = function (req, res) {
  const evenementName = req.params.evenement;
  const tournoiName = req.params.tournoi;
  Evenement.findOne(
    { evenement: evenementName, "tournois.tournoi": tournoiName },
    function (error, evenement) {
      if (error) {
        res.send(error);
      } else {
        let tournois = evenement.tournois.find(
          (tournoi) => tournoi.nom === tournoiName
        );
        res.send(tournois.equipes);
      }
    }
  );
}

//Appel pour POST un evenement (sans les tournois)
exports.postEvenement= function (req, res) {
  const newEvenement = new Evenement({
    nomEvenement: req.body.nomEvenement,
    date: req.body.date,
    tournois: req.body.tournois,
  });
  newEvenement.save(function (error) {
    if (error) {
      res.send(error);
    } else {
      res.send("Ajout de l'evenement réussi.");
    }
  });
}

//Appel PUT pour ajouter un tournoi à un évenement
exports.putTournoi= function(req, res) {
  const name = req.params.evenement;
  const tournoi = req.body;
  Evenement.updateOne(
    { evenement: name },
    { $push: { tournois: tournoi } },
    function (error) {
      if (error) {
        res.send(error);
      } else {
        res.send("Update de l'evenement réussi.");
      }
    }
  );
}

//Appel PUT pour ajouter une équipe à un tournoi
exports.putEquipe= function(req, res) {
  const evenementName = req.params.evenement;
  const tournoiName = req.params.tournoi;
  const equipe = req.body;
  Evenement.updateOne(
    { evenement: evenementName, "tournois.tournoi": tournoiName },
    { $push: { "tournois.$.equipes": equipe } },
    function (error) {
      if (error) {
        res.send(error);
      } else {
        res.send("Update de l'equipe réussi");
      }
    }
  );
}
