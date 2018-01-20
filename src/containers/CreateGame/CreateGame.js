import React, { Component } from 'react';
import { USER_CONNECTED, NEW_ROOM } from '../../Events'

export default class CreateGame extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	socket: '',
	  	nickname:"",
	  	error:""
	  };
	}

	componentDidMount() {
		// this.myFunction();
		// console.log(this.props.socket);
	}

	myFunction = () => {
		console.log(this.state);
		console.log(this.props);
	}

	handleSubmit = (e)=>{
		e.preventDefault()
		const nickname = this.state.nickname;
		this.props.socket.emit(NEW_ROOM, this.props.socket.id, nickname, data =>{
			console.log(data);
		});
		// console.log('socket:' + sock);
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
