import React, { Component } from 'react';
const request = require('request');

class AddMultipleChoice extends Component{
	constructor(props){
		super(props);

		this.state={
			question: '',
			type: 'mc',
			category: this.props.categoryName,
			difficulty: 'Easy',
			answer: 'A',
			A:'',
			B:'',
			C:'',
			D:'',
			can_add_question: 'false'
		}
		this.handleQuestionChange=this.handleQuestionChange.bind(this);
		this.handleTypeChange=this.handleTypeChange.bind(this);
		this.handleDifficultyChange=this.handleDifficultyChange.bind(this);
		this.handleAnswerChange=this.handleAnswerChange.bind(this);
		this.handleButtonClick=this.handleButtonClick.bind(this);
		this.handleChoiceAChange=this.handleChoiceAChange.bind(this);
		this.handleChoiceBChange=this.handleChoiceBChange.bind(this);
		this.handleChoiceCChange=this.handleChoiceCChange.bind(this);
		this.handleChoiceDChange=this.handleChoiceDChange.bind(this);
		this.candAdd=this.canAdd.bind(this);
	}


	canAdd(){
		if(this.state.question.trim() == '' || this.state.A.trim() == '' || this.state.B.trim() == '' || this.state.C.trim() == ''  || this.state.D.trim() == '' ){
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
	handleChoiceAChange(e){
		this.setState({A:e.target.value}, this.canAdd);
	}
	handleChoiceBChange(e){
		this.setState({B:e.target.value}, this.canAdd);
	}
	handleChoiceCChange(e){
		this.setState({C:e.target.value}, this.canAdd);
	}
	handleChoiceDChange(e){
		this.setState({D:e.target.value}, this.canAdd);
	}

	add_question(){
		const new_question = {
			question: this.state.question,
			type: this.state.type,
			category: this.state.category,
			difficulty: this.state.difficulty,
			answer: this.state.answer,
			A: this.state.A,
			B: this.state.B,
			C: this.state.C,
			D: this.state.D
		}

		request.post(
			'http://localhost:3001/quiz-game/add-question',
			{form: new_question},
			(error, response, body) => {
				console.log(body);
			}
		);

		location.href = '/';


	}

	render(){
		return(
			<fieldset>
				<QuestionInput
				value={this.state.question}
				changeHandler={this.handleQuestionChange}/>
				<div className="error-message">{this.state.question === '' ? 'Question is required.' : ''}</div>
				<p><b>Difficulty</b></p>
				<DifficultyInput
				value={this.state.difficulty}
				changeHandler={this.handleDifficultyChange}/><div className="error-message">{this.state.difficulty === ''  ? 'Difficulty is required' : ''}</div>
				<p> <b>Choices</b></p>
				<p>A.</p>
				<ChoiceInput
				value={this.state.A}
				changeHandler={this.handleChoiceAChange}/><div className="error-message">{this.state.A === ''  ? 'Choice A is required' : ''}</div>
				<p>B.</p>
				<ChoiceInput
				value={this.state.B}
				changeHandler={this.handleChoiceBChange}/><div className="error-message">{this.state.B === ''  ? 'Choice B is required' : ''}</div>
				<p>C.</p>
				<ChoiceInput
				value={this.state.C}
				changeHandler={this.handleChoiceCChange}/><div className="error-message">{this.state.C === ''  ? 'Choice C is required' : ''}</div>
				<p>D.</p>
				<ChoiceInput
				value={this.state.D}
				changeHandler={this.handleChoiceDChange}/><div className="error-message">{this.state.D === ''  ? 'Choice D is required' :''}</div>
				<p> <b>Answer</b></p>
				<AnswerInput
				value={this.state.answer}
				changeHandler={this.handleAnswerChange}/><div className="error-message">{this.state.answer === ''  ? 'Answer is required' : ''}</div>
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
				<div>
				<select className="dropdown"
				value={this.props.value}
				onChange={this.props.changeHandler}>
				<option>A</option>
				<option>B</option>
				<option>C</option>
				<option>D</option>
				</select>
			</div>

			</div>
			);
	}
}

class ChoiceInput extends Component{

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
				placeholder="Choice"
				value={this.props.value}
				onChange={this.props.changeHandler}/> {this.props.label}


			</div>
			);
	}
}


export default AddMultipleChoice;
