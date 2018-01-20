import React, { Component } from 'react';
import { USER_CONNECTED } from '../../Events'
import io from 'socket.io-client';

const socketUrl = "http://localhost:3001";
const socket = io(socketUrl);

export default class CreateGame extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	socket:"",
	  	nickname:"",
	  	error:""
	  };
	}


	handleSubmit = (e)=>{
		e.preventDefault()
		const sock = this.props.socket;
		const nickname = this.state.nickname;
		socket.emit(USER_CONNECTED, nickname , sock )
		console.log('socket:' + sock);
	}

	// setUser = (user)=>{
	// 	const { socket } = this.state;
	// 	console.log('socket:', user);
	// 	socket.emit(USER_CONNECTED, user);
	// 	this.setState({showPlayers: true});

	// }

	handleChange = (e)=>{
		this.setState({nickname:e.target.value})
	}

	setError = (error)=>{
		this.setState({error})
	}

	render() {	
		const { nickname, error } = this.state
		return (
			<div className="login">
				<form onSubmit={this.handleSubmit} className="login-form" >

					<label htmlFor="nickname">
						<h2>Add a Name</h2>
					</label>
					<input
						ref={(input)=>{ this.textInput = input }} 
						type="text"
						id="nickname"
						value={nickname}
						onChange={this.handleChange}
						placeholder={'Name'}
						/>
						<div className="error">{error ? error:null}</div>

				</form>
			</div>
		);
	}
}
