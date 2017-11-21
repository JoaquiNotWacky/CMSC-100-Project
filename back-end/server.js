const express = require('express');
const app = express();

const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost/Quizgame';
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL);

// for CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// body parsing
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup Routes
const QuizGameRouter = require('./routes/quiz-game-router');
app.use('/quiz-game', QuizGameRouter);

// Homepage message
app.get('/', (req, res) => {
  res.send('API is working!');
});

app.listen(3001 , (err) => {
  if (err) { console.log(err); }
  else { console.log('\nQuiz Game server is running at http://localhost:3001'); }
});
