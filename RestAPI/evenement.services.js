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

//Appel GET pour tout les evenements
// exports.getTournoiByEtat = function (req, res) {
//   Evenement.find({ "tournois.etat": 1 }, function (error, evenements) {
//     if (error) {
//       res.send(error);
//     } else {
//       res.send(evenements);
//     }
//   });
// };

// //Appel GET pour tout les tournois d'un evenement
// exports.getTournois = function (req, res) {
//   const name = req.params.evenement;
//   Evenement.findOne({ nomEvenement: name }, function (error, evenement) {
//     if (error) {
//       res.send(error);
//     } else {
//       res.send(evenement.tournois);
//     }
//   });
// };
// //Appel GET pour UN tournoi en particulier
// exports.getTournoi = function (req, res) {
//   const evenementName = req.params.evenement;
//   const tournoiName = req.params.tournoi;
//   Evenement.findOne({ nomEvenement: evenementName}, function (error, evenement) {
//     if (error) {
//       res.send(error);
//     } else {
//       let tournoi = evenement.tournois.find(
//         (tournoi) => tournoi.nomTournoi === tournoiName
//       );
//       res.send(tournoi);
//     }
//   });
// };


// //Appel GET pour toutes les equipes d'un tournoi
// exports.getEquipes = function (req, res) {
//   const evenementName = req.params.evenement;
//   const tournoiName = req.params.tournoi;
//   Evenement.findOne(
//     { nomEvenement: evenementName },
//     function (error, evenement) {
//       if (error) {
//         res.send(error);
//       } else {
//         let tournoi = evenement.tournois.find(
//           (tournoi) => tournoi.nomTournoi === tournoiName
//         );
//         let equipes = (tournoi.equipes).sort((a,b) => (a.niveau > b.niveau) ? 1 : ((b.niveau > a.niveau) ? -1 : 0));
//         res.send(equipes);
//       }
//     }
//   );
// }

// //Appel GET pour toutes les poules d'un tournoi
// exports.getPoules = function (req, res) {
//   const evenementName = req.params.evenement;
//   const tournoiName = req.params.tournoi;
//   const tourNum = req.params.tour;

//   Evenement.findOne(
//     { nomEvenement: evenementName },
//     function (error, evenement) {
//       if (error) {
//         res.send(error);
//       } else {
//         let tournoi = evenement.tournois.find(
//           (tournoi) => tournoi.nomTournoi === tournoiName
//         );
//         let poules = (tournoi.tours[tourNum - 1].poules).sort((a,b) => (a.numeroPoule > b.numeroPoule) ? 1 : ((b.numeroPoule > a.numeroPoule) ? -1 : 0));
//         res.send(poules);
//       }
//     }
//   );
// }

// //Appel GET pour toutes les poules d'un tournoi
// exports.getMatchs = function (req, res) {
//   const evenementName = req.params.evenement;
//   const tournoiName = req.params.tournoi;
//   const tourNum = req.params.tour;
//   const pouleNum = req.params.poule;

//   Evenement.findOne(
//     { nomEvenement: evenementName },
//     function (error, evenement) {
//       if (error) {
//         res.send(error);
//       } else {
//         let tournoi = evenement.tournois.find(
//           (tournoi) => tournoi.nomTournoi === tournoiName
//         );
//         let poules = (tournoi.tours[tourNum - 1].poules[ pouleNum ].matchs); //.sort((a,b) => (a.numeroPoule > b.numeroPoule) ? 1 : ((b.numeroPoule > a.numeroPoule) ? -1 : 0));
//         res.send(poules);
//       }
//     }
//   );
// }


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

//Appel PUT pour ajouter une poule à un tour
exports.pushPoule= function(req, res) {
  const evenementName = req.params.evenement;
  const tournoiName = req.params.tournoi;
  const tourNb = req.params.tour;
  console.log(tournoiName);
  console.log(tourNb);
  const poule = req.body;
  Evenement.updateOne(
    { nomEvenement: evenementName},
    { $push: { "tournois.$[elementX].tours.$[elementY].poules": poule } },
    { arrayFilters: [
      {
      "elementY.numeroTour" : tourNb,
      },
      {
        "elementX.nomTournoi" : tournoiName
      }
  ],
    runValidators: true  },
    function (error) {
      if (error) {
        res.send(error);
      } else {
        res.send("Update des poules réussi");
      }
    }
  );
}

//Appel PUT pour update une poule à un tournoi
exports.updatePoule= function(req, res) {
  const evenementName = req.params.evenement;
  const tournoiName = req.params.tournoi;
  const tourNb = req.params.tour;
  const poule = req.body;
  Evenement.updateOne(
    { nomEvenement: evenementName, "tournois.nomTournoi": tournoiName },
    {"tournois.$[elementX].tours.$[elementY].poules": poule },
    { arrayFilters: [
      {
      "elementY.numeroTour" : tourNb,
      },
      {
        "elementX.nomTournoi" : tournoiName
      }
  ],
    runValidators: true  },
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

//Appel put pour initialisation d'un tour 
exports.pushTour= function(req, res) {
  const evenementName = req.params.evenement;
  const tournoiName = req.params.tournoi;
  const tour = req.body;
  Evenement.updateOne(
    { nomEvenement: evenementName, "tournois.nomTournoi": tournoiName },
    { $push: { "tournois.$.tours": tour } },
    { runValidators: true },
    function (error) {
      if (error) {
        res.send(error);
      } else {
        res.send("Ajout d'un tour au tournois réussi");
      }
    }
  );
}


//Appel PUT pour ajouter un match à un tour
exports.pushMatch= function(req, res) {
  const evenementName = req.params.evenement;
  const tournoiName = req.params.tournoi;
  const tourNb = req.params.tour;
  const pouleNum = req.params.poule;
  const match = req.body;
  Evenement.updateOne(
    { nomEvenement: evenementName},
    { $push: { "tournois.$[elementX].tours.$[elementY].poules.$[elementZ].matchs": match } },
    { arrayFilters: [
      {
      "elementY.numeroTour" : tourNb
      },
      {
        "elementX.nomTournoi" : tournoiName
      },
      {
        "elementZ.numeroPoule" : pouleNum
      }
  ],
    runValidators: true  },
    function (error) {
      if (error) {
        res.send(error);
      } else {
        res.send("Update des matchs réussi");
      }
    }
  );
}

exports.updateMatch= function(req, res) {
  const evenementName = req.params.evenement;
  const tournoiName = req.params.tournoi;
  const tourNb = req.params.tour;
  const pouleNum = req.params.poule;
  const match_id = req.body._id;

  const newScore1 = req.body.scoreEquipe1;
  const newScore2 = req.body.scoreEquipe2;


  Evenement.updateOne(
    { nomEvenement: evenementName},
    { "tournois.$[elementX].tours.$[elementY].poules.$[elementZ].matchs.$[elementW].scoreEquipe1": newScore1, 
      "tournois.$[elementX].tours.$[elementY].poules.$[elementZ].matchs.$[elementW].scoreEquipe2": newScore2
   } ,
    { arrayFilters: [
      {
      "elementY.numeroTour" : tourNb
      },
      {
        "elementX.nomTournoi" : tournoiName
      },
      {
        "elementZ.numeroPoule" : pouleNum
      },
      {
        "elementW._id" : match_id
      }
  ],
    runValidators: true  },
    function (error) {
      if (error) {
        res.send(error);
      } else {
        res.send("Update des matchs réussi");
      }
    }
  );
}

//Appel PUT pour update un match à un tournoi
exports.updatePoule= function(req, res) {
  const evenementName = req.params.evenement;
  const tournoiName = req.params.tournoi;
  const tourNb = req.params.tour;
  const poule = req.body;
  Evenement.updateOne(
    { nomEvenement: evenementName, "tournois.nomTournoi": tournoiName },
    {"tournois.$[elementX].tours.$[elementY].poules": poule },
    { arrayFilters: [
      {
      "elementY.numeroTour" : tourNb,
      },
      {
        "elementX.nomTournoi" : tournoiName
      }
  ],
    runValidators: true  },
    function (error) {
      if (error) {
        res.send(error);
      } else {
        res.send("Update de les poules réussi");
      }
    }
  );
}