import React, {Component} from 'react';
const request = require('request');

class Category extends Component{
	constructor(props){
		super(props);
		this.state={
			category: [],
			
		}
	}

	componentDidMount(){
			fetch('http://localhost:3001/quiz-game/view-categories')
			.then((response)=> {return response.json()})
			.then((result)=>{
				this.setState({category: result});
			}).catch((e)=> {console.log(e);});
	}

	componentDidUpdate(){
		fetch('http://localhost:3001/quiz-game/view-categories')
		.then((response)=> {return response.json()})
		.then((result)=>{
			this.setState({category: result});
		}).catch((e)=> {console.log(e);});
	}

	render(){
		return(
			<div className="content">
				<h1> Categories</h1>

				<button>ADD CATEGORY</button>

				<ol>
				{this.state.category.map((category) =>{
					return (<li key={category._id}> <a href={`/category-questions/${category._id}`}> {category.name} </a> </li>)
				})}
				</ol>

			</div>
		);
	}
}

export default Category;
