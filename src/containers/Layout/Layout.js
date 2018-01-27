import React, { Component } from 'react';
import './Layout.css';
import io from 'socket.io-client';
import { LOGOUT, USER_DISCONNECTED, SEND_MODAL, WORD_CHALLENGED } from '../../Events';
import WordBuilder from '../../components/WordBuilder/WordBuilder';
import Char from '../../components/Char/Char';
import Aux from '../../hoc/Wrap/Wrap';
import Player from '../../components/Player/Player';
import Buttons from '../../components/Buttons/Buttons';
import Modal from '../../components/Modal/Modal';
import Backdrop from '../../components/Backdrop/Backdrop';
import WordModal from '../../components/WordModal/StartModal';
import Finish from '../../components/FinishModal/FinishModal';
// import axios from 'axios';

const socketUrl = "http://localhost:3001";
const socket = io(socketUrl);

class Layout extends Component {

	constructor(props) {
	  super(props);
	  this.state = { 
	  	userInput: '',
	  	wordChallenge: '',
	  	socket:null,
	  	players: [],
	  	time: 5,
	  	turn: 'Not Your Turn',
	  	openModal: false,
	  	wordModal: false,
	 	disabled: true,
	  	showBackdrop: true,
	  	showStart: true,
	  	showFinish: false,
	  	showPlayers: false,
	  	endGame: '',
	  	isWord: '',
	  	score: '10'

	  };

	};
		

	
	componentDidMount() {
		console.log(this.props);
		this.initSocket();
	};




	/* 
	*	Connect to and initializes the socket.
	*/
	initSocket = () => {

		socket.on('USER_DISCONNECTED', (players, room) => {
			if (this.props.room === room) {
			let newPlayers = players;
			newPlayers.push(players);
			this.setState({
					players: newPlayers,
					showPlayers: true});
			
		  }
		});

		socket.on('winner', (player) => {
			if (this.props.player === player) {
				this.setState({
					showFinish: true,
					endGame: 'You Won!'})
			}
		})


		socket.on('YOUR_TURN', (data) => {
			if (this.props.player === data) {
				console.log("your turn");
				this.setState({
					showBackdrop: false,
					turn: 'Your Turn!'
				});

				this.clearTimer();
				this.triggerTimer();
		} 
			else {
				this.setState({
					showBackdrop: true,
					turn: 'Not Your Turn'
				});
			}
		});

		socket.on('WORD_CHALLENGED', (data, room, player) => {
			if (this.props.room === room && this.props.player === player) {
			this.setState({wordChallenge: data});
			console.log('word received :' + data);
		} else return;
		});

		socket.on('SEND_MODAL', (data) => {
			if (this.props.player === data) {
				this.openModal();
			} 
			else return; 
		});

		socket.on('LETTER_UPDATE', (text, room) => {
           if (this.props.room === room) {
	           text = text.join('').toLowerCase();
	           console.log('joined input: ' + text);
	           this.setState({userInput: text });
	        if (this.state.userInput.length >= 3) {
	        	this.setState({disabled: false});
	        }	
       } else return;
          });

		socket.on('lost_points', (player, players, room, points) => {
			if (this.props.room === room) {
				let newPlayers = players;
				this.setState({
					userInput: '',
					players: newPlayers,
					showPlayers: true
				});
			}
			if (this.props.player === player){
				let score = this.state.score;
				let newScore = score - points;
				this.setState({
						score: newScore,
						turn: 'you lost points',
						
							});
				console.log("lost points received");
		}
				if (this.state.score <= 0) {
					this.setState({
						showFinish: true,
						endGame: 'You Lost',
						score: '0'
					});
					socket.emit(USER_DISCONNECTED, (this.props.player));
				}
		 
		});

		socket.on('word_spelled', (word, room) => {
			console.log(word);
			if (this.props.room === room) {
				this.setState({
					isWord: 'The word was spelled was ' + word,
					wordModal: true
				 });

				this.wordModal();
			}
		});

		socket.on('wrong_word', (word, room ) => {
			if (this.props.room === room) {
				this.setState({
					isWord: 'There is no such word as ' + word,
					wrongModal: true
				})

				this.wrongModal();
			}
		})
  }

	


	/*
	*	Sets the user property in state to null.
	*/
	logout = () => {
		socket.emit(LOGOUT);

	}

	// ===================================================================
	

	callAPI = () => {
		socket.emit(WORD_CHALLENGED, this.state.userInput, this.props.room, 'completed' );
	}

	openModal = () => {
		this.setState({openModal: true});
	}

	closeModal = () => {
		this.setState({openModal: false});
	}
 	
 	closeFinish = () => {
 		this.setState({showFinish:false,
 					showBackdrop:false });
 	}

 	startGame = () => {
 		
 		this.setState({showStart: false});
 	}

 	sendModal = () => {
 		
 		socket.emit(SEND_MODAL, this.props.room);
 	}

 	wordModal = () => {
 		setTimeout(this.setState({wordModal: false}), 7000);
 	}
 	// Timer functions ======================================================


 	tick() {
		this.setState({time:(this.state.time-1)})
		if (this.state.time === 0) {
			this.setState({time: 5});
		}
	}

	triggerTimer() {
		clearInterval(this.timer)
		this.timer = setInterval(this.tick.bind(this), 1000)
	}

	clearTimer() {
		this.setState({time: 5});
	}

	// ==================================================================================

		
	render() {
		let players= null; 
			if (!this.state.showPlayers) {
			players = this.props.players.map((player, index) => {
					return <Player
					score={player.score} 
					key={player.id}
					name={player.name}
			        />
			});
		} else {
			players = this.state.players.map((player, index) => {
					return <Player 
					score={player.score}
					key={player.id}
					name={player.name}
			        />
			});
		}

	    
	    
		const charList = this.state.userInput.toUpperCase().split('').map((ch, index) => {
          return <Char 
            character={ch} 
            key={index} />;
        });
	
		return (
			<Aux>
			<div className="Layout">	
				<div>
				{/*JSON.stringify(this.props.players) + ' ' + this.props.players.length*/}
					<div>
				  {players}
				  </div>
				  <h3>Score: {this.state.score}</h3>
				  <h3>Time Left: {this.state.time}</h3>
				  <h3>{this.state.turn}</h3>
				</div>
						<div>
							
							{charList}
							<Buttons 
								disabled={this.state.disabled}
								clicked={() => this.sendModal()}
								click={() => this.callAPI()}/> 
					
							
							<WordBuilder player={this.props.player} room={this.props.room}/>
						</div> 
					<Modal show={this.state.openModal} room={this.props.room} player={this.props.player} value={this.state.userInput} closed={this.closeModal} />
					{this.state.openModal ? <Backdrop show /> : null}
					
					<WordModal show={this.state.wordModal} word={this.state.isWord}  />
					{this.state.showBackdrop ? <Backdrop show /> : null}

					<Finish show={this.state.showFinish} message={this.state.endGame}  closed={this.closeFinish} /> 
					{this.state.showFinish ? <Backdrop show /> : null}
					
					
			</div>
			</Aux>
		);
	}
}
export default Layout;