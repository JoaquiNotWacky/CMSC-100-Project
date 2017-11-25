import React, {Component} from 'react';
import Questions from './Questions'
const request = require('request');

class Category extends Component{
	constructor(props){
		super(props);
		this.state={
			category: [],
			chosen_category: '',
			category_name: ''
		}

		this.handle_chosen_category = this.handle_chosen_category.bind(this);
	}

	handle_chosen_category(e){
		this.setState({chosen_category: e.target.value});
	}

	componentDidMount(){
			fetch('http://localhost:3001/quiz-game/view-categories')
			.then((response)=> {return response.json()})
			.then((result)=>{
				this.setState({category: result});
			}).catch((e)=> {console.log(e);});
	}

	display_questions(){
		if(this.state.chosen_category == ''){
			return (<h2> Pick A Category </h2>);
		} else {
			return (<Questions categoryId={this.state.chosen_category}/>)
		}
	}

	render(){
		return(
			<div className="content">
				<h1> Categories</h1>

				<button>ADD CATEGORY</button>
				{this.state.category_name}
				<ol>
				{this.state.category.map((category) =>{
					return (<li key={category._id}> <button onClick={this.handle_chosen_category} value={category._id}> {category.name} </button> </li>)
				})}
				</ol>
				{this.display_questions()}

			</div>
		);
	}
}

export default Category;
