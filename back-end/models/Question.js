const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question: { type: String, defualt: '' },
  type: { type: String, defualt: '' },
  category: { type: String, defualt: '' },
  difficulty: { type: String, defualt: '' },
  answer: { type: String, defualt: '' },

});

module.exports = mongoose.model('question', QuestionSchema, 'questions');
