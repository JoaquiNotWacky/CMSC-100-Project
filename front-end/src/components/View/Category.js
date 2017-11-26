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

	add_category(){
		const new_category = {
			name: this.state.name,
		}

		request.post(
			'http://localhost:3001/quiz-game/add-category',
			{form: new_category},
			(error, response, body) => {
				console.log(body);
			}
		);
	}

	render(){
		return(
			<div className="content">

				<aside className="categories">

					<h1> Categories</h1>

					<button>ADD CATEGORY</button>
					{this.state.category_name}
					<ol>
					{this.state.category.map((category) =>{
						return (<li key={category._id}> <button onClick={this.handle_chosen_category} value={category._id}> {category.name} </button> </li>)
					})}
					</ol>
				</aside>

				<section clasName="questions">

					{this.display_questions()}
				</section>

				<footer className="foot"></footer>

			</div>
		);
	}
}

export default Category;
