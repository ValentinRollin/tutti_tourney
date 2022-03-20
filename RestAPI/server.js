//requires
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const events = require("./evenements");
const tournois = require("./tournois");
const equipes = require("./equipes");

//express serveur
const app = express();

//parse les request
app.use(bodyParser.urlencoded({ extended: true }));
//pour fichier statique (ex : image)
app.use(express.static(__dirname));

// Add headers before the routes are defined
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());
// // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Connexion mongodb
mongoose.connect("mongodb://localhost:27017/tuttiDB");

//API evenements
app.get("/evenements", events.getAll);
app.post("/evenements", events.post);
app.delete("/evenements", events.deleteAll);
app.put("/evenements/:nomEvenement", events.put);

//API tournois
app.get("/tournois", tournois.getAll);
app.get("/tournois/:nomEvenement", tournois.get);
app.post("/tournois", tournois.post);
app.delete("/tournois", tournois.deleteAll);

//API equipes
app.get("/equipes", equipes.getAll);
app.post("/equipes", equipes.post);
app.delete("/equipes", equipes.deleteAll);

// listen du serveur
app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
