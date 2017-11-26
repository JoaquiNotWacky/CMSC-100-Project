import React, {Component} from 'react';
import AddMultipleChoice from './AddMultipleChoice';
import AddText from './AddText';
import AddTof from './AddTof';
class AddQuestion extends Component{
	constructor(props){
		super(props);
		this.state={
			category: this.props.match.params.categoryName,
			tof_state: false,
			mc_state: false,
			text_state: false,
			num_state: false

		}

		this.handle_tof_change = this.handle_tof_change.bind(this);
		this.handle_mc_change = this.handle_mc_change.bind(this);
		this.handle_text_change = this.handle_text_change.bind(this);
		this.handle_num_change = this.handle_num_change.bind(this);
	}

	handle_tof_change(){
		this.setState({tof_state: true, mc_state: false, text_state: false, num_state: false})
	}

	handle_mc_change(){
		this.setState({tof_state: false, mc_state: true, text_state: false, num_state: false})
	}

	handle_text_change(){
		this.setState({tof_state: false, mc_state: false, text_state: true, num_state: false})
	}

	handle_num_change(){
		this.setState({tof_state: false, mc_state: false, text_state: false, num_state: true})
	}

	check_question_type(){
		if (this.state.tof_state){
			return (<AddTof categoryName={this.state.category}/>);
		} else if(this.state.mc_state){
			return (<AddMultipleChoice categoryName={this.state.category}/>);
		} else if(this.state.text_state){
			return (<AddText categoryName={this.state.category}/>);
		} else if(this.state.num_state){
			return (<h3> Number </h3>);
		} else{
			return (<h3> Pick A Question Type </h3>);
		}
	}

	render(){
		return(
			<div className="content">
				<a href={`/`}> BACK TO CATEGORIES </a>
			<h1>{this.state.category}</h1>
			<h2>Type of Question </h2>
			<button onClick={this.handle_text_change}>Text</button>
			 <button onClick={this.handle_num_change}>Number</button>
			 <button onClick={this.handle_mc_change}>Multiple Choice</button>
			 <button onClick={this.handle_tof_change}>True or False</button>
			{ this.check_question_type() }
			</div>
		);
	}
}

export default AddQuestion;
