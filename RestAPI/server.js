const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const evenement = require("./evenement.services");

//express serveur
const app = express();

//parse les request
app.use(bodyParser.urlencoded({ extended: true }));
//pour fichier statique (ex : image)
app.use(express.static(__dirname));

// Add headers before the routes are defined
app.use(cors());

// parse les requetes de type - application/json
app.use(bodyParser.json());
// parse les requetes de type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Connexion mongodb
mongoose.connect("mongodb://localhost:27017/testDB");

//API evenements
app.get("/evenements" , evenement.getAllEvenement);
app.post("/evenements", evenement.postEvenement);

//API tournois
app.get("/:evenement/tournois", evenement.getTournois);
app.get("/evenements/:evenement/:tournoi", evenement.getTournoi);
app.put("/evenements/:evenement", evenement.pushTournoi);

//API equipes
app.get("/:evenement/:tournoi/equipes",evenement.getEquipes);
app.put("/evenements/:evenement/:tournoi", evenement.pushEquipe);

//API Poules
app.get("/:evenement/:tournoi/poules",evenement.getPoules);
app.put("/evenements/:evenement/:tournoi/poules", evenement.pushPoule);
app.put("/evenements/:evenement/:tournoi/poules/update", evenement.updatePoule);

// listen du serveur
app.listen(3000, function () {
  console.log("Server started on port 3000.");
});