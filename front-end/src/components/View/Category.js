import React, {Component} from 'react';
import Questions from './Questions'
const request = require('request');

class Category extends Component{
	constructor(props){
		super(props);
		this.state={
			category: [],
			chosen_category: '',
			new_category:''
		}

		this.get_categories = this.get_categories.bind(this);
		this.handle_chosen_category = this.handle_chosen_category.bind(this);
		this.handle_new_cat = this.handle_new_cat.bind(this);
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

	handle_new_cat(e){
		this.setState({new_category: e.target.value});
	}

	get_categories(){
		fetch('http://localhost:3001/quiz-game/view-categories')
		.then((response)=> {return response.json()})
		.then((result)=>{
			this.setState({category: result}, this.setState({}));
		}).catch((e)=> {console.log(e);});
	}

	add_category(){
		const new_category = {
			name: this.state.new_category,
			easy: 0,
			average: 0,
			hard: 0
		}

		if(new_category.name.trim() != ''){
			request.post(
				'http://localhost:3001/quiz-game/add-category',
				{form: new_category},
				(error, response, body) => {
					console.log(body);
				}
			);
		}
	}

	delete_category(_id, name){
	 	request.post('http://localhost:3001/quiz-game/delete-category', { form: {_id} }, (error, response, body) => { console.log(body); });
	 	request.post('http://localhost:3001/quiz-game/delete-question-category', { form: {name} }, (error, response, body) => { console.log(body); });
		this.setState({chosen_category: '', category_name: ''}, this.get_categories);
	}

	render(){
		return(
			<div className="content">

				<aside className="categories">

					<h1> Categories</h1>

					<ol>
					{this.state.category.map((category) =>{
						return (<li key={category._id}> <button onClick={this.handle_chosen_category} value={category._id}> {category.name} </button>
							<button type="button" onClick={ () => this.delete_category(category._id, category.name)}> DELETE </button> </li>)
					})}
					</ol>
					 	<PlainText placeholder="New Category" changeHandler={this.handle_new_cat}/>
						<button onClick={() => this.add_category()}>ADD CATEGORY</button>
				</aside>

				<section clasName="questions">

					{this.display_questions()}
				</section>


			</div>
		);
	}
}

class PlainText extends Component{
  render(){
    return(
      <div>
        <input type="text" value={this.props.value} placeholder={this.props.placeholder} onChange={this.props.changeHandler}/>
      </div>
    );
  }
}


export default Category;
