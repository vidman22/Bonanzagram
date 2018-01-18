import React, {Component} from "react";
import './LandingPage.css';

class LandingPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
		  action: '',
		  name: ''
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state);

	}
	
	handleChange(event) {
		const name = event.target.name
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
						<form onSubmit={this.handleSubmit}>
							<input
							  type="text"
							  name="name"
							  onChange={this.handleChange}
							  placeholder="name"
							/>
							<button><b>next</b></button>
						</form>
					</div>
				}

				{this.state.action === 'join' &&
					<div><br/>
						<form className="join-form" onSubmit={this.handleSubmit}>
							<input
							  type="text"
							  name="name"
							  onChange={this.handleChange}
							  placeholder="name"
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