import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import Layout from '../Layout/Layout';
import Player from '../../components/Player/Player'
import CreateInput from '../../components/CreateInput/CreateInput';
import Waiting from '../../components/WaitingPage/WaitingPage'
import { NEW_ROOM } from '../../Events';
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
	  	action: 'input',
	  	room: "",
	  	players:''
	  };

	  this.addComponent = this.addComponent.bind(this);
	}

	componentDidMount() {

		this.initSocket();
	};


	/* 	Connect to and initializes the socket. */
	initSocket = () => {
		socket.on('USER_CONNECTED', (room, users) => {
			this.setState({players: users});
		}
	)}

	handleSubmit = (e)=>{
		e.preventDefault()
		console.log(this.state);
		const nickname = this.state.nickname;
		socket.emit(NEW_ROOM, socket.id, nickname, (data, room, users) =>{
			console.log(data);
			this.setState({
				action: 'waiting',
				room: room,
				players: users

			});
		});
	}

	startGame = () => {
		this.setState({action: 'game'})
	}

	addComponent() {
		switch(this.state.action) {
			case 'input':
			  return (
			  	<form onSubmit={this.handleSubmit} className="login-form" >

					<label htmlFor="nickname">
						<h2>Add a Name</h2>
					</label>
					<input
						ref={(input)=>{ this.textInput = input }} 
						type="text"
						id="id"
						value={this.state.nickname}
						onChange={this.handleChange}
						placeholder={'Name'}
					/>
					<div className="error">{this.state.error ? this.state.error:null}</div>
					<button>Submit</button>
				</form>
			  )
			  break;
			case 'waiting':
			  return (
			  	<div>
			  		<Waiting players={this.state.players} room={this.state.room}/>
			  		<button onClick={() => this.startGame()}>Play</button>
			  	</div>
			  )
			   
			  break;
			case 'game':
				return <Layout players={this.state.players} room={this.state.room} />
			  break;
			default:
				return test; 
			  break;
		}
	}

	handleChange = (e)=>{
		this.setState({nickname:e.target.value})
	}

	setError = (error)=>{
		this.setState({error})
	}

	render() {	
		return (
			<div className="login">
				{this.addComponent()}
			</div>
		);
	}
}
