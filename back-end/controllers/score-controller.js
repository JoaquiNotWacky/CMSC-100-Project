const Highscore = require('../models/Highscore');

exports.viewScores = (req, res) =>{

  	Highscore.find({}, (err, scores) => {
    	if (err) {
      		console.log(err);
      		res.send({});
    	} else {
    		const sorted = scores.sort(function(a, b){return b.score - a.score;});
    		var items = sorted.slice(0, 5);
      		console.log(items);
      		res.send(items);
    	}
  	});
}

exports.addScore = (req, res) =>{
  const newScore = new Score(req.body);
  newScore.save((err, score)=>{
    if(err){ res.send({});
    }else {
      res.json(score);
    }
  });
}
