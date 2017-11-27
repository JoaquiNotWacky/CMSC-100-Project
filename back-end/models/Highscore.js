const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HighscoreSchema = new Schema({
  user: { type: String, defualt: '' },
  score: { type: Number },
  category_one: {type: String, default:''},
  category_two: {type: String, default:''},
  category_three: {type: String, default:''}
});

module.exports = mongoose.model('highscore', HighscoreSchema, 'highscore');
