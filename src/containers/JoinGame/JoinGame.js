import React, { Component } from 'react';
import { USER_CONNECTED } from '../../Events';
import io from 'socket.io-client';
const socketUrl = "http://localhost:3001";
const socket = io(socketUrl);

export default class JoinGame extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	nickname:"",
	  	code:"",
	  	error: ""
	  };
	}


	handleSubmit = (e)=>{
		e.preventDefault()
		console.log(this.state);
		const { nickname } = this.state;
		const { code } = this.state;
		socket.emit(USER_CONNECTED, nickname, socket.id, code, data => {
			// if(data === undefined) this.setState({error: "No room found with that phrase"});
			console.log(data);
		})
	}

	handleChange = (e)=>{
		const name = e.target.name;

		this.setState({
			[name] :e.target.value
		})
	}

	setError = (error)=>{
		this.setState({error})
	}

	render() {	
		const { error } = this.state
		return (
			<div className="login">
			{this.state.error &&
				<h3>{this.state.error}</h3>
			}
				<form onSubmit={this.handleSubmit} className="login-form" >

					<label htmlFor="nickname">
						<h2>Add a Name</h2>
					</label>
					<input
						type="text"
						name="nickname"
						onChange={this.handleChange}
						placeholder={'Name'}
					/>
						<h2>Add the Join Code</h2>
					<input
						type="text"
						name="code"
						onChange={this.handleChange}
						placeholder={'Code'}
					/>
					<button>Submit</button>
					<div className="error">{error ? error:null}</div>
				</form>
			</div>
		);
	}
}
