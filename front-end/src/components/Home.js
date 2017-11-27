import React, {Component} from 'react';
import '../css/Home.css';

class Home extends Component{
	render(){
		return(
			<div className="page">
			<div className="center">
				<a href={`/play-game`} className="button">PLAY</a>
				<a href={`/category`} className="button">CATEGORIES</a>
				<a href={`/view-scores`} className="button">HIGH SCORES</a>
			</div>
			</div>
		);
	}
}

export default Home;
