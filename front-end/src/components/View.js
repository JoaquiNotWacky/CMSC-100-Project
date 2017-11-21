import React, {Component} from 'react';
const request = require('request');

class View extends Component{
	constructor(props){
		super(props);
		this.state={
			questions: [],
			category: []
		}
	}

	componentDidMount(){
			fetch('http://localhost:3001/quiz-game/view-questions')
			.then((response)=> {return response.json()})
			.then((result)=>{
				this.setState({questions: result});
			}).catch((e)=> {console.log(e);});

			fetch('http://localhost:3001/quiz-game/view-categories')
			.then((response)=> {return response.json()})
			.then((result)=>{
				this.setState({category: result});
			}).catch((e)=> {console.log(e);});
			console.log("TANGINA");
	}

	componentDidUpdate(){
		fetch('http://localhost:3001/quiz-game/view-questions')
		.then((response)=> {return response.json()})
		.then((result)=>{
			this.setState({questions: result});
		}).catch((e)=> {console.log(e);});

		fetch('http://localhost:3001/quiz-game/view-categories')
		.then((response)=> {return response.json()})
		.then((result)=>{
			this.setState({category: result});
		}).catch((e)=> {console.log(e);});
	}

	render(){
		return(
			<div className="content">
				<h2> Questions </h2>
				{this.state.category.map((category) =>{
					return (<h1> {category.name} </h1>)
				})}

				<h1></h1>
				<ol> {
					this.state.questions.map((question) => {
						return(<li key={question._id}> {question.question}, {question.type}, {question.category}, {question.difficulty}</li>)
					})
				}</ol>
			</div>
		);
	}
}

export default View;
