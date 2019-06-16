// dependencies 
var express = require("express");
var handlebars = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// application port or use 3000;
var PORT = process.env.port || 3000;

// Initialize Express
var app = express();

// express router
var router = express.Router();

// Make public a static folder
app.use(express.static(__dirname + "/public"));

// setting up handlebars
app.engine("handlebars", handlebars(){
    defaultlayout: "main"
});
app.set("view engine", "handlebars");

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// all request go through the router
app.use(router);

//

app.listen(PORT, function() {
    console.log("Listening on port:", PORT);
})

// Require all models
var db = require("./models");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });


// Use morgan logger for logging requests
app.use(logger("dev"));

