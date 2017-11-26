import React, {Component} from 'react';
const request = require('request');

class Game extends Component{
	constructor(props){
		super(props);
		this.state={
      one_id: '',
      highscore: 0,
      number_chosen_question: 0,
      list_categories: [],
      questions_to_anwer: [],
      category_one_easy: [],
      category_one_average: [],
      category_one_hard: [],
      can_start: 'false',
      category: ''
		}
    this.get_categories = this.get_categories.bind(this);
    this.canPlay = this.canPlay.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.getCategory = this.getCategory.bind(this);
  }

  componentDidMount(){
    this.get_categories()
  }

  handleNumberChange(e){
    this.setState({number_chosen_question: e.target.value}, this.canPlay);
  }


  canPlay(){
    const third = this.state.number_chosen_question/3
    if(this.state.category_one_easy.length < third || this.state.category_one_average.length < third || this.state.category_one_hard.length < third){
      this.setState({can_start: 'false'})
    } else {
      this.setState({can_start: ''})
    }
  }

  getQuestions(){
  	fetch(`http://localhost:3001/quiz-game/view-questions/${this.state.category}/Easy`)
  	.then((response)=> {return response.json()})
  	.then((result)=>{
  		this.setState({category_one_easy: result});
      console.log(this.state.category_one_easy)
  	}).catch((e)=> {console.log(e);});

  	fetch(`http://localhost:3001/quiz-game/view-questions/${this.state.category}/Average`)
  	.then((response)=> {return response.json()})
  	.then((result)=>{
  		this.setState({category_one_average: result});
  	}).catch((e)=> {console.log(e);});

  	fetch(`http://localhost:3001/quiz-game/view-questions/${this.state.category}/Hard`)
  	.then((response)=> {return response.json()})
  	.then((result)=>{
  		this.setState({category_one_hard: result});
  	}).catch((e)=> {console.log(e);});
    console.log(this.state.category)
  }

  getCategory(e){
    const id = e.target.value;
    console.log(id)
    fetch(`http://localhost:3001/quiz-game/find-category-by-id/${id}`)
    .then((response)=> {return response.json()})
    .then((result)=>{
      this.setState({category: result.name}, this.getQuestions);
    }).catch((e)=> {console.log(e);});
  }

  get_categories(){
		fetch('http://localhost:3001/quiz-game/view-categories')
		.then((response)=> {return response.json()})
		.then((result)=>{
			this.setState({list_categories: result}, this.setState({}));
		}).catch((e)=> {console.log(e);});
	}

	render(){
		return(
			<div className="content">
        <select onChange={this.getCategory}>
          <option></option>
          {this.state.list_categories.map((category) =>{
            return (<option key={category._id} value={category._id}> {category.name} </option>)
          })}
        </select>
        <PlainText placeholder="Number of Question" changeHandler={this.handleNumberChange}/>
                  <button type="button" disabled={this.state.can_start}>Start</button>
			</div>
		);
	}
}

class PlainText extends Component{
  render(){
    return(
      <div>
        <input placeholder={this.props.placeholder} onChange={this.props.changeHandler} type="number"/>
      </div>
    );
  }
}


export default Game;
