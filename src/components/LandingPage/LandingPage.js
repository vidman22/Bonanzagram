import React, {Component} from "react";
import './LandingPage.css';

class LandingPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
		  action: '',
		  message: '',
		  name: ''
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		// console.log(this.state);

		const bank = "abcdefghijklmnopqrstuvwxyz123456890";
		var phrase = this.state.name.charAt(0);

		for(var i=0; i<7; i++) {
			let rando = Math.floor((Math.random() * bank.length ));
			phrase += bank.charAt(rando);
		}

		// console.log(phrase);
		window.location = './lobby/' + phrase + '/' + this.state.name;
	}
	
	handleChange(event) {
		const name = event.target.name;

		this.setState({
		  [name]: event.target.value
		})
	}

	handleClick(event) {
		console.log(event)
		this.setState({action: event});
	}



	render() {
		return (
			<div>
				<div className="header">
					<h2>Game Header</h2>
				</div>

				{this.state.action === 'create' &&
					<div><br/>
						<p>enter your display name</p><br/>
						<form onSubmit={this.handleSubmit}>
							<input
							  type="text"
							  name="name"
							  onChange={this.handleChange}
							  placeholder="display name"
							/>
							<button><b>next</b></button>
						</form>
					</div>
				}

				{this.state.action === 'join' &&
					<div><br/>
						<p>enter your display name & lobby phrase</p><br/>
						<form className="join-form" onSubmit={this.handleSubmit}>
							<input
							  type="text"
							  name="name"
							  onChange={this.handleChange}
							  placeholder="display name"
							/>
							<input 
								type="text"
								name="phrase"
								placeholder="lobby phrase"
								onChange={this.handleChange}
							/>
							<button><b>next</b></button>
						</form>
					</div>
				}
				<br/>
				<div className="content">
					<button className="create" onClick={() => this.handleClick('create')}><b>Create Lobby</b></button>
					<button className="join" onClick={() => this.handleClick('join')}><b>Join Existing Game</b></button>
				</div>
				<br/>
				
			</div>
		)
	}
}

export default LandingPage;