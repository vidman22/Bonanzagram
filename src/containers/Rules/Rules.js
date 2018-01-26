import React, {Component} from "react";
import './Rules.css';
import axios from 'axios';

class Rules extends Component {
	constructor(props) {
		super(props);
		this.state = {
			intervalId: null,
			currentTime: 20
		}
		// this.timer = this.timer.bind(this);
	}
	
	componentDidMount() {
		axios.get('/words').then(data => {
			console.log(data);
		});
		axios.get('/words/money').then(data => {
			console.log(data);
		});
		
		// var intervalId = setInterval(this.timer, 1000);
		// this.setState({intervalId: intervalId});
	}
	
	// componentWillUnmount() {
	// 	clearInterval(this.state.intervalId);
	// }
	

	// timer() {
	// 	console.log(this.state);
	// 	var newTime = this.state.currentTime - 1;
	// 	if(newTime >= 0) {
	// 		this.setState({currentTime: newTime});
	// 	} else clearInterval(this.state.intervalId);
		
	// }

	render() {
		return (
			<div>
				<div className="header">
					<h2>Bonanzagram Rules!</h2>
					<h2>{this.state.currentTime}</h2>
				</div>
				<br/>
				<div className="content">
		
					<p>	   The goal of the game is to continue spelling a word without any errors and without ending a word.</p>
					<p>If you complete a word, then the next player can declare your word completed and you will be docked points 
					equivalent to the number of letters in the word. If they prematurely declared your word compelted, they will 
					be docked the points.</p>
					<p>    If you spell a word incorrectly, the subsequent player can challenge your spelling and you must prove 
					that you were spelling an actual word.</p>
					<p>    If you've successfully entered the word you had been spelling, the challenger will be docked points equivalent to the number of 
					letters in the word. If your word was incorrect, then you will lose the points.</p>
					
					<p>Happy Spelling!</p>
				</div>
			</div>
		)
	}
}

export default Rules;


