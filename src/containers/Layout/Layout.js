import React, { Component } from 'react';
import './Layout.css';
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT, PLAYER_UNSUCCESSFUL, PLAYER_SUCCESSFUL, SEND_MODAL } from '../../Events';
import WordBuilder from '../../components/WordBuilder/WordBuilder';
import Char from '../../components/Char/Char';
import Aux from '../../hoc/Wrap/Wrap';
import Player from '../../components/Player/Player';
import Buttons from '../../components/Buttons/Buttons';
import Modal from '../../components/Modal/Modal';
import Backdrop from '../../components/Backdrop/Backdrop';
import Start from '../../components/StartModal/StartModal';
import Finish from '../../components/FinishModal/FinishModal';
import axios from 'axios';

const socketUrl = "http://localhost:3001";
const socket = io(socketUrl);

export default class Layout extends Component {

	componentDidUpdate() {  
		if (this.state.isWord === 'word not challenged') {
	        if (this.state.wordChallenge !== '') {
	     		const word = this.state.wordChallenge;
	  			const url = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20180115T021350Z.fd03fe3226cb1646.0c50c80f349bb8470b6527ff51dcb13c2d5d97f3&lang=en-ru&text=';
				axios.get(url + word)
					.then(response => {
			   		console.log(response.data.def);
			   		let length = this.state.userInput.length;
			   		let firstWordPart = word.slice(0, length);
			   		console.log("word challenged: " + word);
			   		if (response.data.def[0] && firstWordPart === this.state.userInput ) {
					this.setState(prevState => ({
				    isWord: !prevState.isWord
					}));
					this.setState(prevState => ({
				    wordChallenge: !prevState.wordChallenge
					}));
					console.log("successful challenge");
					socket.emit(PLAYER_SUCCESSFUL);
					return;
				   }
			    else {
			   		this.setState(prevState => ({
				    isWord: !prevState.isWord
					}));
					this.setState(prevState => ({
				    wordChallenge: !prevState.wordChallenge
					}));
			   		socket.emit(PLAYER_UNSUCCESSFUL);
			   	return;
			   }
			});
		}
	}

		if (this.state.isWord === 'word not challenged') {
	     	if ( this.state.checkCompletion) {
	     	  const word = this.state.userInput;
	  		  const url = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20180115T021350Z.fd03fe3226cb1646.0c50c80f349bb8470b6527ff51dcb13c2d5d97f3&lang=en-ru&text=';
				axios.get(url + word)
					.then(response => {
			   		console.log(response.data.def);
			   		if (response.data.def[0]) {
					this.setState(prevState => ({
				    isWord: !prevState.isWord
					}));
					this.setState(prevState => ({
				    checkCompletion: !prevState.checkCompletion
					}));
					socket.emit(PLAYER_SUCCESSFUL);
					return;
				   }
			    else {
			   		this.setState(prevState => ({
				    isWord: !prevState.isWord
					}));
					this.setState(prevState => ({
				    checkCompletion: !prevState.checkCompletion
					}));
			   		socket.emit(PLAYER_UNSUCCESSFUL);
			   	return;
			   }
			});
		  }
		}
	}
	
	
	constructor(props) {
	  super(props);
	  this.state = { 
	  	room: 'asdfsd',
	  	userInput: '',
	  	wordChallenge: '',
	  	socket:null,
	  	players: [],
	  	score : 2,
	  	time: 5,
	  	turn: 'Not Your Turn',
	  	checkCompletion: false,
	  	openModal: false,
	  	checkChallenge: false,
	  	showPlayers: false,
	  	showBackdrop: true,
	  	showStart: true,
	  	showFinish: false,
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

		this.setState({socket});


		socket.on('USER_CONNECTED', (room, users) => {
			console.log(room)
			let players = [...this.state.players];
			players = users;
			this.setState({players});
			console.log('players', this.state.players);

		});

		socket.on('USER_DISCONNECTED', (data) => {
			this.setState({players: data});
			console.log("players after disconnect: ", this.state.players);
		});


		socket.on('YOUR_TURN', (data) => {
			if (this.state.socket.id === data) {
				console.log("your turn");
				this.setState({showBackdrop: false});
				this.setState({turn: 'Your Turn!'})
				this.setState({showStart: false});
			// this.triggerTimer();
		} 
			else {
				this.setState({showBackdrop: true});
				this.setState({turn: 'not your turn'});
		}
			// if (this.state.showStart === false) {
			// 	this.setState({showStart: true});
			//} 
		});

		socket.on('WORD_CHALLENGED', (data) => {
			this.setState({wordChallenge: data});
			console.log(data);
		});

		socket.on('SEND_MODAL', (data) => {
			if (this.state.socket.id === data) {
				this.openModal();
			} 
			else return; 
		});

		socket.on('LETTER_UPDATE', (event) => {
           // let userInput = this.state.userInput;
           event = event.join('').toLowerCase();
           console.log('joined input: ' + event);
           this.setState({userInput: event });
          });

		socket.on('lost_points', (data) => {
			if (this.state.socket.id === data) {
				let points = this.state.userInput.length;
				console.log('you lost ' + points + ' points :(');
				let score = this.state.score - points;
				this.setState({score: score});

				if (this.state.score <= 0) {
					this.setState({showFinish: true});
					socket.emit('player_lost');
				}
		  }
	});
  }

	/*
	* 	Sets the user property in state 
	*	@param user {id:number, name:string}
	*/	
	setUser = (user)=>{
		const { socket } = this.state;
		console.log('socket:', user);
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
	

	callAPI = () => {
		this.setState({checkCompletion: true});
	}

	openModal = () => {
		this.setState({openModal: true});
	}

	closeModal = () => {
		this.setState({openModal: false});
	}
 	

 	startGame = () => {
 		
 		socket.emit('start');
 		this.setState({showStart: false});
 	}

 	sendModal = () => {
 		socket.emit(SEND_MODAL);
 	}

 	triggerTimer = () => {
	console.log("triggered");
 	  	let time = 5;
 	  let interval = setInterval(trigger(), 1000);
	  function trigger() {
	 		if (time === 0) {
	 			clearInterval(interval);
	 			this.setState({time: 5});
			 	} else {
			 		
			 		time--;
			 		console.log(time);
					this.setState({time: time});
			 	}
		}
	}
		
	render() {
		let players = null;

		if (this.state.showPlayers) {
		  players = (
			<div>
			  { this.state.players.map((player, index) => {
				return <Player 
				score={this.state.score}
				key={player.id}
				name={player.name}
				time={this.state.time}
		        />
			  })}
		    </div>
	       );
	    }
	    
		const charList = this.state.userInput.toUpperCase().split('').map((ch, index) => {
          return <Char 
            character={ch} 
            key={index} />;
        });
	
		return (
			<Aux>
			<div className="Layout">
				{
					<div>
					{players}
					
						<div>
							<h4>{this.state.isWord}</h4>
							<h4>{this.state.turn}</h4>
						</div>
						<div>
							<Buttons 
								clicked={() => this.sendModal()}
								click={() => this.callAPI()}/> 
							<WordBuilder />
						</div> 
					
					{charList}
					<Modal show={this.state.openModal} value={this.state.userInput} closed={this.closeModal} />
					{this.state.openModal ? <Backdrop show /> : null}
					<Start show={this.state.showStart} clicked={this.startGame} closed={this.startGame}/> 
					{this.state.showBackdrop ? <Backdrop show /> : null}
					<Finish show={this.state.showFinish} clicked={this.home} click={this.home}/> 
					{this.state.showFinish ? <Backdrop show /> : null}
					
					</div> 
				}
			</div>
			</Aux>
		);
	}
}
