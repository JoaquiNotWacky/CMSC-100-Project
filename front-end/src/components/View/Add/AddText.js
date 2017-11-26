import React, { Component } from 'react';
const request = require('request');


class AddText extends Component{
  constructor(props){
    super(props);
    this.state = {
      category: this.props.categoryName,
      question_text: "",
      question_placeholder: "Question",
      question_error: "",

      answer_text: "",
      answer_placeholder: "Answer",
      answer_error: "",

      type: "text",
      can_add_question: 'false',
      difficulty: ""
    }


    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
    this.candAdd=this.canAdd.bind(this);
  }

  canAdd(){
		if(this.state.question_text.trim() == '' || this.state.answer_text.trim() == ''){
			this.setState({can_add_question: 'false'})
		} else{
			this.setState({can_add_question: ''})
		}
	}

  handleQuestionChange(e){
    this.setState({question_text: e.target.value}, this.canAdd);
  }

  handleAnswerChange(e){
    this.setState({answer_text: e.target.value}, this.canAdd);
  }

  handleDifficultyChange(e){
    this.setState({difficulty: e.target.value});
  }

  add_question(){
		const new_question = {
			question: this.state.question_text,
			type: this.state.type,
			category: this.state.category,
			difficulty: this.state.difficulty,
			answer: this.state.answer_text
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
      <div>
        <fieldset>
          <PlainText placeholder={this.state.question_placeholder} error={this.state.question_error} changeHandler={this.handleQuestionChange}/>
          <div className="error-message">{this.state.question_text.trim() === ''  ? 'Question is required' : ''}</div>
          <PlainText placeholder={this.state.answer_placeholder} error={this.state.answer_error} changeHandler={this.handleAnswerChange}/>
          <div className="error-message">{this.state.answer_text.trim() === ''  ? 'Answer is required' : ''}</div>
          <DifficultyList changeHandler={this.handleDifficultyChange} />
          <button type="button" onClick={() => this.add_question()} disabled={this.state.can_add_question}>Add Question</button>
        </fieldset>
      </div>
    );
  }
}

class PlainText extends Component{
  render(){
    return(
      <div>
        <input type="text" value={this.props.value} placeholder={this.props.placeholder} onChange={this.props.changeHandler}/>
        <label> {this.props.error} </label>
      </div>
    );
  }
}


class DifficultyList extends Component{
  render(){
    return(
      <div> <select className="dropdown" onChange={this.props.changeHandler}>
        <option value="Easy">Easy</option>
        <option value="Average">Average</option>
        <option value="Hard">Hard</option>
        </select>
        </div>
    );
  }
}



export default AddText;
