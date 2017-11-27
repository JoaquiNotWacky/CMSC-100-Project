import React, {Component} from 'react';
import Quiztion from './Quiztion'
import QuiztionMc from './QuiztionMc'
const request = require('request');
const pickRandom = require('pick-random');


class Game extends Component{
	constructor(props){
		super(props);
		this.state={
      name: '',
      highscore: 0,
      number_chosen_question: 0,
      list_categories: [],
      questions_easy: [],
      questions_average: [],
      questions_hard: [],
      category_one: '',
      category_two: '',
      category_three: '',
			can_start: 'false',
			play: false,
			all_questions: [],
			all_correct: []
		}
    this.get_categories = this.get_categories.bind(this);
    this.canPlay = this.canPlay.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.getCategoryOne = this.getCategoryOne.bind(this);
    this.getCategoryTwo = this.getCategoryTwo.bind(this);
    this.getCategoryThree = this.getCategoryThree.bind(this);
    this.filterQuestions = this.filterQuestions.bind(this);
    this.setQuestionForGame = this.setQuestionForGame.bind(this);
    this.putQuestionTogether = this.putQuestionTogether.bind(this);
    this.setAllCorrect = this.setAllCorrect.bind(this);
    this.assure = this.assure.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
  }

  componentDidMount(){
    this.get_categories()
  }

  handleNumberChange(e){
    this.setState({number_chosen_question: e.target.value}, this.canPlay);
  }

  handleNameChange(e){
    this.setState({name: e.target.value}, this.canPlay);
  }

	setQuestionForGame(easy, average, hard){
		this.setState({questions_easy: easy, questions_average: average, questions_hard: hard, play:true}, this.putQuestionTogether);
	}

	setAllCorrect(){
		var n = 0;
		var temp = [];
		while(n < this.state.number_chosen_question){
			this.state.all_correct.push(0);
			n++;
		}
		this.assure()
	}

	assure(){
		console.log(this.state.all_questions);
		console.log(this.state.all_correct);
		console.log(this.state.highscore);
		console.log(this.state.all_correct);
	}

	putQuestionTogether(){
		var a = [];
		a = a.concat(this.state.questions_easy);
		a = a.concat(this.state.questions_average);
		a = a.concat(this.state.questions_hard);
		this.setState({all_questions: a}, this.setAllCorrect);
	}



  canPlay(){
		if(this.state.name.trim() === '' || this.state.category_one === '' || this.state.category_two === '' || this.state.category_three === ''){
      this.setState({can_start: 'false'})
			return

		}
			var filtered_easy = this.state.questions_easy.filter( quest => quest.category === this.state.category_one || quest.category === this.state.category_two || quest.category === this.state.category_three);
			var filtered_average = this.state.questions_average.filter( quest => quest.category === this.state.category_one || quest.category === this.state.category_two || quest.category === this.state.category_three);
			var filtered_hard = this.state.questions_hard.filter( quest => quest.category === this.state.category_one || quest.category === this.state.category_two || quest.category === this.state.category_three);
			console.log(filtered_easy)
			console.log(filtered_average)
			console.log(filtered_hard)
			const third = Math.floor(this.state.number_chosen_question/3)
		if(filtered_easy.length < third || filtered_average.length < third || filtered_hard.length < third){
      this.setState({can_start: 'false'})
    } else if (this.state.category_one === this.state.category_two || this.state.category_one === this.state.category_three || this.state.category_three === this.state.category_two) {
			this.setState({can_start: 'false'})
    } else {
      this.setState({can_start: ''})
    }
  }


	filterQuestions(){
		const third = Math.floor(this.state.number_chosen_question/3);
		const remainder = this.state.number_chosen_question-third-third;
		const chosen_easy = pickRandom(this.state.questions_easy.filter( quest => quest.category === this.state.category_one || quest.category === this.state.category_two || quest.category === this.state.category_three), {count: third});
		const chosen_average = pickRandom(this.state.questions_average.filter( quest => quest.category === this.state.category_one || quest.category === this.state.category_two || quest.category === this.state.category_three), {count: third});
		const chosen_hard = pickRandom(this.state.questions_hard.filter( quest => quest.category === this.state.category_one || quest.category === this.state.category_two || quest.category === this.state.category_three), {count: remainder});
		this.setState({}, this.setQuestionForGame(chosen_easy, chosen_average, chosen_hard))
	}

  getQuestions(){
  	fetch(`http://localhost:3001/quiz-game/view-questions-all/Easy`)
  	.then((response)=> {return response.json()})
  	.then((result)=>{
  		this.setState({questions_easy: result});
  	}).catch((e)=> {console.log(e);});

  	fetch(`http://localhost:3001/quiz-game/view-questions-all/Average`)
  	.then((response)=> {return response.json()})
  	.then((result)=>{
  		this.setState({questions_average: result});
  	}).catch((e)=> {console.log(e);});

  	fetch(`http://localhost:3001/quiz-game/view-questions-all/Hard`)
  	.then((response)=> {return response.json()})
  	.then((result)=>{
  		this.setState({questions_hard: result});
  	}).catch((e)=> {console.log(e);});

  }

  getCategoryOne(e){
    const id = e.target.value;
    fetch(`http://localhost:3001/quiz-game/find-category-by-id/${id}`)
    .then((response)=> {return response.json()})
    .then((result)=>{
      this.setState({category_one: result.name}, this.canPlay);
    }).catch((e)=> {console.log(e);});
  }

  getCategoryTwo(e){
    const id = e.target.value;
    fetch(`http://localhost:3001/quiz-game/find-category-by-id/${id}`)
    .then((response)=> {return response.json()})
    .then((result)=>{
      this.setState({category_two: result.name}, this.canPlay);
    }).catch((e)=> {console.log(e);});
  }

  getCategoryThree(e){
    const id = e.target.value;
    fetch(`http://localhost:3001/quiz-game/find-category-by-id/${id}`)
    .then((response)=> {return response.json()})
    .then((result)=>{
      this.setState({category_three: result.name}, this.canPlay);
    }).catch((e)=> {console.log(e);});
  }

  get_categories(){
		fetch('http://localhost:3001/quiz-game/view-categories')
		.then((response)=> {return response.json()})
		.then((result)=>{
			this.setState({list_categories: result}, this.getQuestions);
		}).catch((e)=> {console.log(e);});
	}

	getUserAnswer = (answerBool, index) =>{
			const answers = this.state.all_correct;
			answers[index] = answerBool;
			this.setState({all_correct: answers}, this.assure);
	}

	calculateScore = () => {
		var n = 0;
		var score = 0
		while(n < this.state.number_chosen_question){
			score += this.state.all_correct[n]
			n++
		}
		if(n == this.state.number_chosen_question) {
			this.setState({highscore: score}, this.assure);
			alert("Your Score is " + score)

				const new_score = {
					user: this.state.name,
					score: this.state.highscore,
					category_one: this.state.category_one,
					category_two: this.state.category_two,
					category_three: this.state.category_three
				}

				request.post(
					'http://localhost:3001/quiz-game/add-score',
					{form: new_score},
					(error, response, body) => {
						console.log(body);
					}
				);


				location.href = '/';
		}
	}

	render(){
		return(
			<div className="content">
				{ this.state.play === false ?
				<div>
				<PlainText placeholder="Player Name" changeHandler={this.handleNameChange} type="text"/>
	        <select onChange={this.getCategoryOne}>
	          {this.state.category_one === '' ? <option></option>: ''}
	          {this.state.list_categories.map((category) =>{
	            return (<option key={category._id} value={category._id}> {category.name} </option>)
	          })}
	        </select>
	        <select onChange={this.getCategoryTwo}>
	          {this.state.category_two === '' ? <option></option>: ''}
	          {this.state.list_categories.map((category) =>{
	            return (<option key={category._id} value={category._id}> {category.name} </option>)
	          })}
	        </select>

	        <select onChange={this.getCategoryThree}>
	          {this.state.category_three === '' ? <option></option>: ''}
	          {this.state.list_categories.map((category) =>{
	            return (<option key={category._id} value={category._id}> {category.name} </option>)
	          })}
	        </select>
	        <PlainText placeholder="Number of Question" changeHandler={this.handleNumberChange} type="number"/>
	                  <button type="button" disabled={this.state.can_start} onClick={this.filterQuestions}>Start</button>
				</div> : <div>{this.state.all_questions.map((question, index)=>{
					return(<div className="printQuestion" key={question._id}><h3>Question #{index+1}</h3>{question.type === 'mc' ? <QuiztionMc quiztion={question} item_index={index} checker={this.getUserAnswer}/>:<Quiztion quiztion={question} item_index={index} checker={this.getUserAnswer}/>}</div>);
				})} <div className="printQuestion"><button className="addQButton" onClick={this.calculateScore}>Submit Answers</button></div></div>
			}


		</div>
		);
	}
}

class PlainText extends Component{
  render(){
    return(
      <div>
        <input placeholder={this.props.placeholder} onChange={this.props.changeHandler} type={this.props.type}/>
      </div>
    );
  }
}


export default Game;
