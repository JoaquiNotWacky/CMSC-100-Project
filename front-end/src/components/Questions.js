import React, {Component} from 'react';
const request = require('request');

class Questions extends Component{
	constructor(props){
		super(props);
		this.state={
			_id: this.props.match.params.categoryId,
			category: '',
			question_easy: [],
			question_average: [],
			question_hard: []
		}
	}

	componentDidMount(){
			fetch(`http://localhost:3001/quiz-game/find-category-by-id/${this.state._id}`)
			.then((response)=> {return response.json()})
			.then((result)=>{
				this.setState({category: result.name});
			}).catch((e)=> {console.log(e);});
	}

	componentDidUpdate(){
		fetch(`http://localhost:3001/quiz-game/view-questions/${this.state.category}/Easy`)
		.then((response)=> {return response.json()})
		.then((result)=>{
			this.setState({question_easy: result});
		}).catch((e)=> {console.log(e);});

		fetch(`http://localhost:3001/quiz-game/view-questions/${this.state.category}/Average`)
		.then((response)=> {return response.json()})
		.then((result)=>{
			this.setState({question_average: result});
		}).catch((e)=> {console.log(e);});

		fetch(`http://localhost:3001/quiz-game/view-questions/${this.state.category}/Hard`)
		.then((response)=> {return response.json()})
		.then((result)=>{
			this.setState({question_hard: result});
		}).catch((e)=> {console.log(e);});

	}

	delete_question_easy(_id, difficulty){
		if(difficulty == "Easy") {
			if(this.state.question_easy.length > 1) request.post('http://localhost:3001/quiz-game/delete-question', { form: {_id} }, (error, response, body) => { console.log(body); });
			else alert("Must at least have 1 question");
		}
	}

	delete_question_average(_id, difficulty){
		if(difficulty == "Average"){
			if(this.state.question_average.length > 1) request.post('http://localhost:3001/quiz-game/delete-question', { form: {_id} }, (error, response, body) => { console.log(body); });
			else alert("Must at least have 1 question");
		}
	}

	delete_question_hard(_id, difficulty){
		if(difficulty == "Hard"){
			if(this.state.question_hard.length > 1) request.post('http://localhost:3001/quiz-game/delete-question', { form: {_id} }, (error, response, body) => { console.log(body); });
			else alert("Must at least have 1 question");
		}
	}

	render(){
		return(
			<div className="content">
				<a href={`/`}> BACK TO CATEGORIES </a>
				<h1> {this.state.category} </h1>
					<button>ADD QUESTION</button>
				<h3> Easy</h3>

			<ol>
			{this.state.question_easy.map((question) =>{
				return (<li key={question._id}> {question.question}  <button type="button" onClick={ () => this.delete_question_easy(question._id, question.difficulty)}> DELETE </button></li>)
			})}
			</ol>

			<h3> Average</h3>
			<ol>
			{this.state.question_average.map((question) =>{
				return (<li key={question._id}> {question.question}<button type="button" onClick={ () => this.delete_question_average(question._id, question.difficulty)}> DELETE </button></li>)
			})}
			</ol>

			<h3> Hard</h3>
			<ol>
			{this.state.question_hard.map((question) =>{
				return (<li key={question._id}> {question.question}<button type="button" onClick={ () => this.delete_question_hard(question._id, question.difficulty)}> DELETE </button></li>)
			})}
			</ol>
			</div>
		);
	}
}

export default Questions;
