const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose');
const morgan = require('morgan')

var photos = require("./photos");
var helpers = require("./helpers");

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

/* RUN PARAMS */

MONGODB_URL = "mongodb://localhost:27017/library";
RESULTS_PER_PAGE = 20

/* SERVER */

mongoose.connect(MONGODB_URL);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
      console.log("Connection Succeeded");
});

/* TARGETS */

app.get('/photos', (req, res) => {
  var page = req.query.page || 1;
  var skip = (page - 1) * RESULTS_PER_PAGE;
  var limit = RESULTS_PER_PAGE;

  photos.getAllPhotos(function(err, photos) {
    if (err) {
      console.error(err);
      return;
    }
    res.send(photos)
  }, skip, limit);
})

app.get('/photos-rand', (req, res) => {
  var limit = RESULTS_PER_PAGE;

  photos.getRandomPhotos(function(err, photos) {
    if (err) {
      console.error(err);
      return;
    }
    res.send(photos)
  }, limit);
})

app.listen(process.env.PORT || 8081)
