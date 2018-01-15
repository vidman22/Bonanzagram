import React, { Component } from 'react';
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT  } from '../Events';
import LoginForm from '../components/LoginForm/LoginForm';
import WordBuilder from '../components/WordBuilder/WordBuilder';
import Aux from '../hoc/Wrap/Wrap';
import Player from '../components/Player/Player';

const socketUrl = "http://localhost:3001";



export default class Layout extends Component {

	
	constructor(props) {
	  super(props);
	
	  this.state = { 
	  	socket:null,
	  	players: [],
	  	showPlayers: false,
	  	score : 25,
	  	current_turn: 0,
	  	timeOut: null,
	  	_turn: 0,
	  	MAX_WAITING: 25000

	  };


	};

	componentWillMount() {
		this.initSocket();
	};



	/*
	*	Connect to and initializes the socket.
	*/
	initSocket = () => {

		const socket = io(socketUrl);
		this.setState({socket});


		socket.on('USER_CONNECTED', (data) => {
			console.log('user connected', data)
			let players = [...this.state.players];
			players = data;
			this.setState({players});
			console.log('players', this.state.players);

			if(this.state.players[this.state._turn].id === socket) {
			this.resetTimeOut();
			this.next_turn();
		 }
		});

		socket.on('USER_DISCONNECTED', (data) => {
			this.setState({players: data});
			console.log("players after disconnect: ", this.state.players);
		});

		socket.on('pass_turn', () => {
			if (this.state.players[this.state._turn] === socket){
				this.resetTimeOut();
				this.next_turn();
			}
		})
	}

	/*
	* 	Sets the user property in state 
	*	@param user {id:number, name:string}
	*/	
	setUser = (user)=>{
		const { socket } = this.state;
		socket.emit(USER_CONNECTED, user);
		this.setState({showPlayers: true});

	}

	/*
	*	Sets the user property in state to null.
	*/
	logout = () => {
		const { socket } = this.state;
		socket.emit(LOGOUT);
		const players = [...this.state.players];
		players.splice(0, 1);
		this.setState({ players: players });

	}

	// ===================================================================
	// Game Logic


	// next_turn = () => {
	
	// 	// _turn = this.state.current_turn++ % this.state.players.length;
	// 	const turn = this.state.current_turn++ % this.state.players.length;
	// 	console.log('turn: ' + turn);
	// 	this.setState({_turn: turn})
	// 	this.state.players[this.state._turn].id.emit('your_turn');
	// 	console.log("next turn triggered ", turn);
	// 	this.triggerTimeout();
	// }

    triggerTimout = () => {
		let timeOut = this.setTimeout(() =>{
			this.next_turn();
		}, this.state.MAX_WAITING);
		this.setState({timeOut});
	}

	resetTimeOut = () => {
		let timeOut = this.state.timeOut;
		if(typeof timeOut === 'object'){
			console.log("timeout reset");
			clearTimeout(timeOut);
			this.setState({timeOut});
		}
	}

	handleClick = (e) => {
		const socket = io(socketUrl);
		socket.emit('pass_turn');
	}

	

	render() {
		let players = null;

		if (this.state.showPlayers) {
		  players = (
			<div>
			{this.state.players.map((player, index) => {
				return <Player 
				clicked={this.handleClick()}
				key={player.id}
				name={player.name} />
			})}
		</div>
	  );
	}

		const { socket, showPlayers } = this.state
		return (
			<Aux>
			<div className="container">
				{
					!showPlayers ?	
					<LoginForm socket={socket} setUser={this.setUser} />
					:
					<div>
					{players}
					<WordBuilder />
					</div>
				}
			</div>
			</Aux>
		);
	}
}
