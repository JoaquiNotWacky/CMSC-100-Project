import React, {Component} from 'react';
const request = require('request');

class Quiztion extends Component{
	constructor(props){
		super(props);
		this.state={
				index: this.props.item_index,
        question: this.props.quiztion.question,
        answer: this.props.quiztion.answer,
        type: this.props.quiztion.type,
        category: this.props.quiztion.category,
        difficulty: this.props.quiztion.difficulty,
        user_answer: '',
				is_correct: 0

    }

    this.handleAnswerTofChange = this.handleAnswerTofChange.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
		this.checkIfCorrect = this.checkIfCorrect.bind(this);
		this.assure = this.assure.bind(this);
	}

  handleAnswerTofChange(e){
		this.setState({user_answer:e.target.value}, this.checkIfCorrect);
	}

  handleAnswerChange(e){
    this.setState({user_answer:e.target.value}, this.checkIfCorrect);
	}

	assure(){
		console.log(this.state.is_correct);
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
		this.assure()
	}

typeOfInput(){
  if(this.state.type === 'tof'){
    return(<AnswerInput changeHandler={this.handleAnswerChange}/>);
  } else if(this.state.type === 'text') {
    return(<PlainText placeholder="Your Answer" changeHandler={this.handleAnswerChange} type="text"/>);
  } else if(this.state.type === 'num') {
    return(<PlainText placeholder="Your Answer" changeHandler={this.handleAnswerChange} type="num"/>);
  }
}

	render(){
		return(
			<div className="content">
        {this.state.question}
        {this.typeOfInput()}
			</div>
		);
	}
}

class PlainText extends Component{
  render(){
    return(
      <div>
        <input placeholder={this.props.placeholder} onChange={this.props.changeHandler} type={this.props.type}/>
				<br/>
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
			<div className="printQuestion">
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

				<br/>
			</div>
			);
	}
}


export default Quiztion;
