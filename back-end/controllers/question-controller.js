const Question = require('../models/Question');


exports.viewQuestions = (req, res) =>{
  const cat = req.params.category;
  const dif = req.params.difficulty;

  Question.find({category: cat, difficulty: dif}, (err, questions) => {
    if (err) {
      console.log(err);
      res.send({});
    } else {
      res.send(questions);
    }
  });
}


exports.addQuestion = (req, res) =>{
  const newQuestion = new Question(req.body);

  newQuestion.save((err, question)=>{
    if(err){ res.send({});
    }else {
      res.json(question);
    }
  });
}

exports.deleteQuestion = (req, res) =>{
  const _id = req.body._id;

  Question.remove({ _id }, (err) => {
    if (err) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
}
