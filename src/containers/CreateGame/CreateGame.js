import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Layout from '../Layout/Layout';
import { USER_CONNECTED, NEW_ROOM } from '../../Events';
import io from 'socket.io-client';
const socketUrl = "http://localhost:3001";
const socket = io(socketUrl);

export default class CreateGame extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	socket: "",
	  	nickname:"",
	  	error:"",
	  	showLayout: false,
	  	room: ""
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
		socket.emit(NEW_ROOM, socket.id, nickname, (data, room) =>{
			console.log(data);
			this.setState({
				showLayout: true,
				room: room
			});
			console.log('room' + this.state.room);
		});
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
				{!this.state.showLayout ?
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
					:
					
						<Layout room={this.state.room}/>
	
				}

				
			</div>
		);
	}
}
