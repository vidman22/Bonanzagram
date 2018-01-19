import React, { Component } from 'react';
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT  } from '../Events';
import LoginForm from '../components/LoginForm/LoginForm';
import WordBuilder from '../components/WordBuilder/WordBuilder';
import Aux from '../hoc/Wrap/Wrap';
const socketUrl = "http://localhost:3001";

import Player from '../components/Player/Player';
import Buttons from '../components/Buttons/Buttons';
import axios from 'axios'



export default class Layout extends Component {



	componentDidUpdate() {
	  const url = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20180115T021350Z.fd03fe3226cb1646.0c50c80f349bb8470b6527ff51dcb13c2d5d97f3&lang=en-ru&text=';
	  if ( this.state.callAPI) {
	     if (this.state.isWord === 'word not challenged') {
	  
				axios.get(url + this.state.userInput)
					.then(response => {
			   		console.log(response.data.def);
			   		if (response.data.def[0]) {
					this.setState({isWord: 'Word Completed!'});
					// this.setState({userInput: });
					return;
				   }
			    else {
			   		this.setState({isWord: 'Not a Word!'});
			   		// this.setState({userInput: });
			   	return;
			   } 
			
			});
		  }
		}
	}
	
	constructor(props) {
	  super(props);
	
	  this.state = { 
	  	userInput: [],
	  	socket:null,
	  	players: [],
	  	showPlayers: false,
	  	score : '25',
	  	current_turn: 0,
	  	timeOut: null,
	  	_turn: 0,
	  	MAX_WAITING: 25000,
	  	callAPI: false,
	  	isWord: 'word not challenged'
	  };


	};

	componentDidMount() {
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
			if (this.state.players[this.state._turn].id === socket){
				this.resetTimeOut();
				this.nextTurn();
			}
		  });

		socket.on('your_turn', () => {
			console.log("your turn");
		});

		socket.on('LETTER_UPDATE', (event) => {
           // let userInput = this.state.userInput;
           event = event.join('').toLowerCase();
           console.log('joined input: ' + event);
           this.setState({userInput: event });
           this.resetTimeOut();
           this.nextTurn();
          });
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

  // not working
	nextTurn = () => {
		
		let current_turn = this.state.current_turn;
		// _turn = this.state.current_turn++ % this.state.players.length;
		const turn = current_turn++ % this.state.players.length;
		console.log('turn: ' + turn);
		this.setState({_turn: turn});
		console.log('player turn',  this.state.players[turn])
		this.state.players[turn].id.emit('your_turn');
		console.log("next turn triggered ", turn);
		this.triggerTimeout();
	}

    triggerTimout = () => {
		let timeOut = this.setTimeout(() =>{
			this.nextTurn();
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

	// handleClick = () => {
	// 	this.callAPI();
	// }

	callAPI = () => {
		this.setState({callAPI: true});
		const socket = io(socketUrl);
		socket.emit('pass_turn');
	}

	clicked = () => {
		console.log("key clicked");
	}
 
	render() {
		let players = null;

		if (this.state.showPlayers) {
		  players = (
			<div>
			{this.state.players.map((player, index) => {
				return <Player 
				score={this.state.score}
				key={player.id}
				name={player.name} />
			})}
		</div>
	  );
	}

		const { socket, showPlayers } = this.state
		return (
			<Aux>
			<div className="Layout">
				{
					!showPlayers ?	
					<LoginForm socket={socket} setUser={this.setUser} />
					:
					<div>
					{players}

					<Buttons 
					clicked={() => this.callAPI()}
					click={() => this.callAPI()}/>
					<WordBuilder />
					<h2>{this.state.isWord}</h2>
					</div>
				}
			</div>
			</Aux>
		);
	}
}
