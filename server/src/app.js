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

/* TARGETS */

app.get('/photos', (req, res) => {
  photos.getAllPhotos(function(err, photos) {
    if (err) {
      console.error(err);
      return;
    }
    res.send(photos)
  })
})

/* SERVER */

mongoose.connect(MONGODB_URL);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
      console.log("Connection Succeeded");
});

app.listen(process.env.PORT || 8081)
