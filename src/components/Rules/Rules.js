import React, {Component} from "react";
import './Rules.css';
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT, PLAYER_UNSUCCESSFUL, PLAYER_SUCCESSFUL, SEND_MODAL } from '../../Events';
const socketUrl = "http://localhost:3001";
const socket = io(socketUrl);


class Rules extends Component {
	constructor(props) {
		super(props);
		this.state = {
			socket: null
		}
		this.initSocket = this.initSocket.bind(this);
		this.setUser = this.setUser.bind(this);
	}

	componentDidMount() {
		this.initSocket();
		this.setUser("john guy", "b11111");
	};

	setUser(user, room_id) {
		const { socket } = this.state;
		console.log(this.state);
		socket.emit(USER_CONNECTED, user, room_id);
	}


	/* Connect to and initializes the socket */
	initSocket() {

		const sock = io(socketUrl);
		this.setState({socket: sock});


		socket.on('USER_CONNECTED', (data) => {
			// console.log('user connected', data)
			// let players = [...this.state.players];
			// players = data;
			// this.setState({players});
			// console.log('players', this.state.players);
		});

		socket.on('USER_DISCONNECTED', (data) => {
			// this.setState({players: data});
			// console.log("players after disconnect: ", this.state.players);
		});


		// socket.on('YOUR_TURN', (data) => {
		// 	if (this.state.socket.id === data) {
		// 		console.log("your turn");
		// 		this.setState({showBackdrop: false});
		// 		this.setState({turn: 'Your Turn!'})
		// 		this.setState({showStart: false});
		// 	// this.triggerTimer();
		// 	} else {
		// 		this.setState({showBackdrop: true});
		// 		this.setState({turn: 'not your turn'});
		// 	}
		// 	// if (this.state.showStart === false) {
		// 	// 	this.setState({showStart: true});
		// 	//} 
		// });

		socket.on('WORD_CHALLENGED', (data) => {
			// this.setState({wordChallenge: data});
			// console.log(data);
		});

		socket.on('SEND_MODAL', (data) => {
			// if (this.state.socket.id === data) {
			// 	this.openModal();
			// } 
			// else return; 
		});

		socket.on('LETTER_UPDATE', (event) => {
           // let userInput = this.state.userInput;
           event = event.join('').toLowerCase();
           console.log('joined input: ' + event);
           // this.setState({userInput: event });
          });

		socket.on('lost_points', (data) => {
			// if (this.state.socket.id === data) {
			// 	let points = this.state.userInput.length;
			// 	console.log('you lost ' + points + ' points :(');
			// 	let score = this.state.score - points;
			// 	this.setState({score: score});

			// 	if (this.state.score <= 0) {
			// 		this.setState({showFinish: true});
			// 		socket.emit('player_lost');
			// 	}
		 //  }
		});


	}

	render() {
		return (
			<div>
				<div className="header">
					<h2>Rules</h2>
				</div>
				<br/>
				<div className="content">
					<h4>Header</h4>
					<p>test test</p>
				</div>
			</div>
		)
	}
}

export default Rules;


