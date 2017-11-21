const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HighscoreSchema = new Schema({
  user: { type: String, defualt: '' },
  score: { type: Number },

});

module.exports = mongoose.model('Highscore', HighscoreSchema);
