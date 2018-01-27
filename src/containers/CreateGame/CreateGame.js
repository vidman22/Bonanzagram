import React, { Component } from 'react';
import Layout from '../Layout/Layout';
import Waiting from '../../components/WaitingPage/WaitingPage'
import { NEW_ROOM, START } from '../../Events';
import io from 'socket.io-client';

// const socket = io.connect('http://localhost:3001');

// const socket = io('https://frozen-caverns-17261.herokuapp.com');
// const socket = io();
// const socket = io("http://localhost:3001",{
//  path: "/socket.io",
//  "transports": ["xhr-polling"], 
//  "polling duration": 10
// })

// const socket = io.connect();
const socket = io({
	transports: ['websocket']
});
export default class CreateGame extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	socket: "",
	  	nickname:"",
	  	error:"",
	  	waiting:"Waiting for Players...",
	  	action: 'input',
	  	room: "",
	  	players: null,
	  	activePlayer: '',
	  	disableButton: true
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
			if (users.length >= 2) {

				this.setState({
					disableButton: false,
					waiting:"Enough Players to Start"
				})
			}
		});
	}

	handleSubmit = (e)=>{
		e.preventDefault()
		console.log(this.state);
		const nickname = this.state.nickname;
		socket.emit(NEW_ROOM, socket.id, nickname, (data, room, users) =>{
			console.log(data);
			this.setState({
				action: 'waiting',
				room: room,
				players: users,
				activePlayer: socket.id

			});
		});
	}

	startGame = () => {
		this.setState({action: 'game'}); 
		socket.emit(START, this.state.room, data => {
			console.log(data);
		});
	}

	back = () => {
		this.setState({action: 'input'});
	}

	addComponent() {
		let result;
		switch(this.state.action) {
			case 'input':
			  result = (
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
			  result = (
			  	<div className="login-form">
			  		<Waiting players={this.state.players} waiting={this.state.waiting} room={this.state.room}/>
			  		<button disabled={this.state.disableButton} onClick={() => this.startGame()}>Play</button>
			  		<button onClick={() => this.back()}>Back</button>
			  	</div>
			  )		   
			  break;
			case 'game':
				result = <Layout players={this.state.players} room={this.state.room} player={this.state.activePlayer}/>
			  break;
			default:
				result = <h1>Something went wrong. Try something else.</h1> 
			  break;
		}
			return result;
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