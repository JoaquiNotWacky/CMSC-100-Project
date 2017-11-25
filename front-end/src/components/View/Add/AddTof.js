import React, { Component } from 'react';

const request = require('request');
class AddTof extends Component{

	constructor(props){
		super(props);

		this.state={
			question: '',
			type: 'tof',
			category: this.props.categoryName,
			difficulty: 'Easy',
			answer: '',
			can_add_question: 'false'

		}
		this.handleQuestionChange=this.handleQuestionChange.bind(this);
		this.handleTypeChange=this.handleTypeChange.bind(this);
		this.handleDifficultyChange=this.handleDifficultyChange.bind(this);
		this.handleAnswerChange=this.handleAnswerChange.bind(this);
		this.candAdd=this.canAdd.bind(this);
	}

	canAdd(){
		if(this.state.question.trim() == '' || this.state.answer == ''){
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
		this.setState({answer:e.target.value}, this.canAdd);
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
	}

	render(){
		return(
			<fieldset>
				<QuestionInput
				value={this.state.question}
				changeHandler={this.handleQuestionChange}/>
				<div className="error-message">{this.state.question.trim() === '' ? 'Question is required.' : ''}</div>
				<p><b>Difficulty</b></p>
				<DifficultyInput
				value={this.state.difficulty}
				changeHandler={this.handleDifficultyChange}/><div className="error-message">{this.state.difficulty === ''  ? 'Difficulty is required' : ''}</div>
				<p> <b>Answer</b></p>
				<AnswerInput value={this.state.answer} changeHandler={this.handleAnswerChange}/>
				<div className="error-message">{this.state.answer === ''  ? 'Answer is required' : ''}</div>
				<button type="button" onClick={() => this.add_question()} disabled={this.state.can_add_question}>Add Question</button>
			</fieldset>
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

class AnswerInput extends Component{

	constructor(){
		super();

		this.state={
			text:'true'
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
				type="radio"
				name="answer"
				value="true"
				onChange={this.props.changeHandler}/>True<br/>

				<input
				className="input"
				type="radio"
				name="answer"
				value="false"
				onChange={this.props.changeHandler}/>False<br/>


			</div>
			);
	}
}

export default AddTof;
