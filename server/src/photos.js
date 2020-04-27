
var mongoose = require("mongoose");
var path = require('path');
var Schema = mongoose.Schema;

var helpers = require("./helpers");

/* MODEL */

var PhotoSchema = new Schema({
  _id: Schema.Types.ObjectId,
  path: String,
  hashe: String,
  size: Number,
  thumbnail: Buffer,
  //thumbnail: { data: Buffer, contentType: String }
  ext: String
});

var Photo = mongoose.model("Photo", PhotoSchema);

/* DB ACCESS */

function getAllPhotos(callback, skip=0, limit=0) {
  Photo.find({}, 'path size ext thumbnail').
  skip(skip).
  limit(limit).
  exec(function (error, db_photos) {
    if (error) {
      callback(error);
    }
    callback(null, enrich_photos(helpers.db_to_json(db_photos)))
  })
}

function getRandomPhotos(callback, count=20) {
  Photo.aggregate([{'$sample' : {'size': count}}], function (error, db_photos_objs) {
    if (error) {
      callback(error);
    }

    // convert to Photo object
    var db_photos = []
    db_photos_objs.forEach(function(obj) {
      db_photos.push(new Photo(obj));
    });

    callback(null, enrich_photos(helpers.db_to_json(db_photos)))
  })
}

/* ENRICHMENT */

function enrich_photos(json_photos) {
  json_photos.forEach(function(photo) {
    photo.filename = path.basename(photo.path)
    photo.dirname = path.basename(path.dirname(photo.path))
  })
  return json_photos
}

/* API */

module.exports = {
  getAllPhotos,
  getRandomPhotos,
}
