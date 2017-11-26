const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question: { type: String, defualt: '' },
  type: { type: String, defualt: '' },
  category: { type: String, defualt: '' },
  difficulty: { type: String, defualt: '' },
  answer: { type: String, defualt: '' },

});

const McQuestionSchema = new Schema({
  question: { type: String, defualt: '' },
  type: { type: String, defualt: '' },
  category: { type: String, defualt: '' },
  difficulty: { type: String, defualt: '' },
  answer: { type: String, defualt: '' },
  A: { type: String, defualt: '' },
  B: { type: String, defualt: '' },
  C: { type: String, defualt: '' },
  D: { type: String, defualt: '' },
});

module.exports = mongoose.model('question', QuestionSchema, 'questions');
module.exports = mongoose.model('mcquestion', McQuestionSchema, 'questions');
