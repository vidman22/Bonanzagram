import React, { Component } from 'react';
import {NEW_ROOM} from '../../Events';
import io from 'socket.io-client';
const socketUrl = "http://localhost:3001";
const socket = io(socketUrl);


export default class Test extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	nickname:"",
	  	error:""
	  };
	}

	handleSubmit = (e)=>{
		e.preventDefault()
		// const { socket } = this.props
		// const { nickname } = this.state
		console.log('hi');
		console.log(socket);
		socket.emit(NEW_ROOM, "jobe", "abc123", data => {
			console.log(data);
		});
	}

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
