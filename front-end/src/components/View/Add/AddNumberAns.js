import React, { Component } from 'react';
const request = require('request');

class AddNumberAns extends Component{
	constructor(props){
		super(props);

		this.state={
			question: '',
			type: 'num',
			category: this.props.categoryName,
			difficulty: 'Easy',
			answer: '1',
			can_add_question: 'false'
		}
		this.handleQuestionChange=this.handleQuestionChange.bind(this);
		this.handleTypeChange=this.handleTypeChange.bind(this);
		this.handleDifficultyChange=this.handleDifficultyChange.bind(this);
		this.handleAnswerChange=this.handleAnswerChange.bind(this);
		this.handleButtonClick=this.handleButtonClick.bind(this);
		this.candAdd=this.canAdd.bind(this);
	}


	canAdd(){
		if(this.state.question.trim() == ''){
			this.setState({can_add_question: 'false'})
		} else{
			this.setState({can_add_question: ''})
		}
	}


	handleQuestionChange(e){
		this.setState({question:e.target.value}, this.canAdd);
	}

	handleTypeChange(e){
		this.setState({type:e.target.value});
	}

	handleDifficultyChange(e){
		this.setState({difficulty:e.target.value});
	}
	handleAnswerChange(e){
		this.setState({answer:e.target.value});
	}
	handleButtonClick(e){
		this.setState({buttonClicked:true});
	}

	add_question(){
		const new_question = {
			question: this.state.question,
			type: this.state.type,
			category: this.state.category,
			difficulty: this.state.difficulty,
			answer: this.state.answer
		}

		request.post(
			'http://localhost:3001/quiz-game/add-question',
			{form: new_question},
			(error, response, body) => {
				console.log(body);
			}
		);

		location.href = '/category';


	}

	render(){
		return(
			<div class="addQuestion">
		    <form>
		    <fieldset>
				<legend><span class="number">1</span>Question</legend>
				<QuestionInput
				value={this.state.question}
				changeHandler={this.handleQuestionChange}/>
				<div className="error-message">{this.state.question === '' ? 'Question is required.' : ''}</div>
				<br/>
         		<legend><span class="number">2</span>Difficulty</legend>
				<DifficultyInput
				value={this.state.difficulty}
				changeHandler={this.handleDifficultyChange}/><div className="error-message">{this.state.difficulty === ''  ? 'Difficulty is required' : ''}</div>
				<legend><span class="number">3</span>Answer</legend>
				<AnswerInput
				value={this.state.answer}
				changeHandler={this.handleAnswerChange}/><div className="error-message">{this.state.answer === ''  ? 'Answer is required' : ''}</div>
				</fieldset>
		        <button type="button" className="addQButton" onClick={() => this.add_question()} disabled={this.state.can_add_question}>Add Question</button>
		        </form>
		        </div>
			);
	}
}

class QuestionInput extends Component{

	constructor(){
		super();

		this.state={
			text:''
		}

		this.handleTextChange=this.handleTextChange.bind(this);
	}
	handleTextChange(e){
		this.setState({text:e.target.value});
	}

	render(){
		return(
			<div>
				<input
				className="input"
				type="text"
				placeholder="Question"
				value={this.props.value}
				onChange={this.props.changeHandler}/> {this.props.label}
			</div>
			);
	}
}

class AnswerInput extends Component{

	constructor(){
		super();

		this.state={
			text:''
		}

		this.handleTextChange=this.handleTextChange.bind(this);
	}
	handleTextChange(e){
		this.setState({text:e.target.value});
	}

	render(){
		return(
			<div>
				<input
				className="input"
				type="num"
				placeholder="Number Answer"
				value={this.props.value}
				onChange={this.props.changeHandler}/> {this.props.label}
			</div>
			);
	}
}

class DifficultyInput extends Component{

	constructor(){
		super();

		this.state={
			text:''
		}

		this.handleTextChange=this.handleTextChange.bind(this);
	}
	handleTextChange(e){
		this.setState({text:e.target.value});
	}

	render(){
		return(
			<div>
				<select className="dropdown"
				value={this.props.value}
				onChange={this.props.changeHandler}>
				<option>Easy</option>
				<option>Average</option>
				<option>Hard</option>
				</select>
			</div>
			);
	}
}

export default AddNumberAns;
