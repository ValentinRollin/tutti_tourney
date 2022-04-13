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
  Evenement.findOne({ nomEvenement: name }, function (error, evenement) {
    if (error) {
      res.send(error);
    } else {
      res.send(evenement.tournois);
    }
  });
};
//Appel GET pour UN tournoi en particulier
exports.getTournoi = function (req, res) {
  const evenementName = req.params.evenement;
  const tournoiName = req.params.tournoi;
  Evenement.findOne({ nomEvenement: evenementName, "tournois.nomTournoi": tournoiName}, function (error, evenement) {
    if (error) {
      res.send(error);
    } else {
      let tournoi = evenement.tournois.find(
        (tournoi) => tournoi.nomTournoi === tournoiName
      );
      res.send(tournoi);
    }
  });
};


//Appel GET pour toutes les equipes d'un tournoi
exports.getEquipes = function (req, res) {
  const evenementName = req.params.evenement;
  const tournoiName = req.params.tournoi;
  Evenement.findOne(
    { nomEvenement: evenementName, "tournois.nomTournoi": tournoiName },
    function (error, evenement) {
      if (error) {
        res.send(error);
      } else {
        let tournoi = evenement.tournois.find(
          (tournoi) => tournoi.nomTournoi === tournoiName
        );
        let equipes = (tournoi.equipes).sort((a,b) => (a.niveau > b.niveau) ? 1 : ((b.niveau > a.niveau) ? -1 : 0));
        res.send(equipes);
      }
    }
  );
}

//Appel GET pour toutes les poules d'un tournoi
exports.getPoules = function (req, res) {
  const evenementName = req.params.evenement;
  const tournoiName = req.params.tournoi;
  Evenement.findOne(
    { nomEvenement: evenementName, "tournois.nomTournoi": tournoiName },
    function (error, evenement) {
      if (error) {
        res.send(error);
      } else {
        let tournoi = evenement.tournois.find(
          (tournoi) => tournoi.nomTournoi === tournoiName
        );
        let poules = (tournoi.poules).sort((a,b) => (a.numeroPoule > b.numeroPoule) ? 1 : ((b.numeroPoule > a.numeroPoule) ? -1 : 0));
        res.send(poules);
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
exports.pushTournoi= function(req, res) {
  const name = req.params.evenement;
  const tournoi = req.body;
  Evenement.updateOne(
    { nomEvenement: name },
    { $push: { tournois: tournoi } },
    { runValidators: true },
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
exports.pushEquipe= function(req, res) {
  const evenementName = req.params.evenement;
  const tournoiName = req.params.tournoi;
  const equipe = req.body;
  Evenement.updateOne(
    { nomEvenement: evenementName, "tournois.nomTournoi": tournoiName },
    { $push: { "tournois.$.equipes": equipe } },
    { runValidators: true },
    function (error) {
      if (error) {
        res.send(error);
      } else {
        res.send("Update de l'equipe réussi");
      }
    }
  );
}

//Appel PUT pour ajouter une poule à un tournoi
exports.pushPoule= function(req, res) {
  const evenementName = req.params.evenement;
  const tournoiName = req.params.tournoi;
  const poule = req.body;
  Evenement.updateOne(
    { nomEvenement: evenementName, "tournois.nomTournoi": tournoiName },
    { $push: { "tournois.$.poules": poule } },
    { runValidators: true },
    function (error) {
      if (error) {
        res.send(error);
      } else {
        res.send("Update de les poules réussi");
      }
    }
  );
}

//Appel PUT pour update une poule à un tournoi
exports.updatePoule= function(req, res) {
  const evenementName = req.params.evenement;
  const tournoiName = req.params.tournoi;
  const poule = req.body;
  Evenement.updateOne(
    { nomEvenement: evenementName, "tournois.nomTournoi": tournoiName },
    {  "tournois.$.poules": poule },
    { runValidators: true },
    function (error) {
      if (error) {
        res.send(error);
      } else {
        res.send("Update de les poules réussi");
      }
    }
  );
}

//Appel PUT pour update l'etat d'un tournoi
exports.updateEtatTournoi= function(req, res) {
  const evenementName = req.params.evenement;
  const tournoiName = req.params.tournoi;
  const newEtat = req.body.etat;
  Evenement.updateOne(
    { nomEvenement: evenementName, "tournois.nomTournoi": tournoiName },
    {"tournois.$.etat": newEtat },
    { runValidators: true },
    function (error) {
      if (error) {
        res.send(error);
      } else {
        res.send("Update de l'état de la poule réussi");
      }
    }
  );
}