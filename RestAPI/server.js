//requires
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const events = require("./events");
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

//Connexion mongodb
mongoose.connect("mongodb://localhost:27017/tuttiDB");

//API evenements
app.get("/events", events.getAll);
app.post("/events", events.post);
app.delete("/events", events.deleteAll);

//API tournois
app.get("/tournois", tournois.getAll);
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
