const Question = require('../models/Question');


exports.viewQuestions = (req, res) =>{
  Question.find({}, (err, questions) => {
    if (err) {
      console.log(err);
      res.send({});
    } else {
      res.send(questions);
    }
  });
}



exports.addQuestion = (req, res) =>{

}

exports.deleteQuestion = (req, res) =>{

}
