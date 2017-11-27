import React, {Component} from 'react';
const request = require('request');

class QuiztionMc extends Component{
	constructor(props){
		super(props);
		this.state={
				index: this.props.item_index,
        question: this.props.quiztion.question,
        answer: this.props.quiztion.answer,
        type: this.props.quiztion.type,
        category: this.props.quiztion.category,
        difficulty: this.props.quiztion.difficulty,
				A: this.props.quiztion.A,
				B: this.props.quiztion.B,
				C: this.props.quiztion.C,
				D: this.props.quiztion.D,
				user_answer:'',
				is_correct: 0
		}

		this.handleUserAnswerChange=this.handleUserAnswerChange.bind(this);
		this.checkIfCorrect = this.checkIfCorrect.bind(this);
  }

	handleUserAnswerChange(e){
		this.setState({user_answer:e.target.value}, this.checkIfCorrect);
	}

		checkIfCorrect(){
			if(this.state.user_answer === this.state.answer && this.state.difficulty == 'Easy'){
				this.setState({is_correct: 1}, this.props.checker(1, this.state.index));
			} else if(this.state.user_answer === this.state.answer && this.state.difficulty == 'Average') {
				this.setState({is_correct: 2}, this.props.checker(2, this.state.index));
			} else if(this.state.user_answer === this.state.answer && this.state.difficulty == 'Hard') {
				this.setState({is_correct: 3} , this.props.checker(3, this.state.index));
			} else {
				this.setState({is_correct: 0}, this.props.checker(0, this.state.index));
			}
		}


	render(){
		return(
			<div className="printQuestion">
				<p>{this.state.question}</p>
				<div className="left">
				<AnswerInput value={this.state.user_answer} changeHandler={this.handleUserAnswerChange}/>{this.state.A}
				<Answer3Input value={this.state.user_answer} changeHandler={this.handleUserAnswerChange}/>{this.state.C}
				</div>
				<div className="right">
				<Answer2Input value={this.state.user_answer} changeHandler={this.handleUserAnswerChange}/>{this.state.B}
				<Answer4Input value={this.state.user_answer} changeHandler={this.handleUserAnswerChange}/>{this.state.D}
				</div>
				<br/>
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
				className="radiob"
				type="radio"
				name="answer"
				value="A"
				onChange={this.props.changeHandler}/>A.
			</div>
			);
	}
}

class Answer2Input extends Component{

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
				className="radiob"
				type="radio"
				name="answer"
				value="B"
				onChange={this.props.changeHandler}/>B.
			</div>
			);
	}
}
class Answer3Input extends Component{

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
				className="radiob"
				type="radio"
				name="answer"
				value="C"
				onChange={this.props.changeHandler}/>C.
			</div>
			);
	}
}
class Answer4Input extends Component{

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
				className="radiob"
				type="radio"
				name="answer"
				value="D"
				onChange={this.props.changeHandler}/>D.
			</div>
			);
	}
}


export default QuiztionMc;
