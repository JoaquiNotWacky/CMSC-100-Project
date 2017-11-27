import React, {Component} from 'react';

class Score extends Component{

	constructor(props){
		super(props);
		this.state = {
			topScorers: []
		}

		this.get_scores = this.get_scores.bind(this);
	}

	componentDidMount(){
    	this.get_scores()
  	}

	get_scores(){
		fetch('http://localhost:3001/quiz-game/view-score')
		.then((response)=> {
			return response.json()})
		.then((result)=>{
			console.log(result);
			this.setState({topScorers: result});
		}).catch((e)=> {console.log(e);});
	}


	render(){
		return(
			<div>
			<h3>High Scores</h3>
			<ol>
			{this.state.topScorers.map((score) =>{
            return (<li key={score._id}> {score.user} {score.score}</li>)
          })}
			</ol>
			</div>
		);
	}
}
export default Score;
