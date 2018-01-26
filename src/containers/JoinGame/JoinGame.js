import React, { Component } from 'react';
import { USER_CONNECTED } from '../../Events';
import Layout from '../Layout/Layout';
import Waiting from '../../components/WaitingPage/WaitingPage';
import io from 'socket.io-client';
const socketUrl = "http://localhost:3001";
const socket = io(socketUrl);

export default class JoinGame extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	name:"",
	  	action: 'input',
	  	room:"",
	  	error: "",
	  	showLayout: false,
	  	players: null,
	  	activePlayer: ''
	  };
	}

	componentDidMount() {

		this.initSocket();
	};


	/* 	Connect to and initializes the socket. */
	initSocket = () => {
		socket.on('USER_CONNECTED', (room, users) => {
			this.setState({players: users});
		});

		socket.on('START', (room_id) => {
			if(this.state.room === room_id) {
				this.startGame();
				console.log('room id: ' + room_id);
			} else return;
		});
	};


	handleSubmit = (e)=>{
		e.preventDefault()
		console.log(this.state);
		const nickname = this.state.name;
		const room = this.state.room;
		socket.emit(USER_CONNECTED, nickname, socket.id, room,(room, players) =>{
			console.log(room);
			console.log(players);
			this.setState({
				action: 'waiting',
				room: room,
				players: players,
				activePlayer: socket.id

			});
		});
	}

	startGame = () => {
		this.setState({action: 'game'})
	}



	addComponent() {
		var result;
		switch(this.state.action) {

			case 'input':
			  result = (
			  	<form onSubmit={this.handleSubmit} className="login-form" >

					<h2>Add a Join Code</h2>
					<input
						type="text"
						name="room"
						onChange={this.handleChange}
						placeholder={'Code'}
					/> 
					<label htmlFor="nickname">
						<h2>Add a Name</h2>
					</label>
					<input
						ref={(input)=>{ this.textInput = input }} 
						type="text"
						name="name"
						onChange={this.handleChange}
						placeholder={'Name'}
					/>
					<div className="error">{this.state.error ? this.state.error:null}</div>
					<button >Submit</button>
				</form>
			  )
			  break;
			case 'waiting':
			  result = (
				  	<div>
				  		<Waiting players={this.state.players} room={this.state.room}/>
				  	</div>

			  )
			   
			  break;
			case 'game':
				result = <Layout players={this.state.players} room={this.state.room} player={this.state.activePlayer} />
			  break;
			default:
				result = <h1>Something went wrong. Try something else.</h1>  
			  break;
		}
		return result;
	}

	handleChange = (e)=>{
		const name = e.target.name;
		this.setState({[name]:e.target.value})
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
