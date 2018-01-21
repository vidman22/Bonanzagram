import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import Layout from '../Layout/Layout';
import Player from '../../components/Player/Player'
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
	  	showLayout: false,
	  	room: "",
	  	players:''
	  };
	}

	componentDidMount() {
		// this.initSocket();
	};



	/* 
	*	Connect to and initializes the socket.
	*/
	// initSocket = () => {

	// 	socket.on('USER_CONNECTED', (room, users) ) => {

	// 	}
	// }

	myFunction = () => {
		console.log(this.state);
		console.log(this.props);
	}

	handleSubmit = (e)=>{
		e.preventDefault()
		const nickname = this.state.nickname;
		socket.emit(NEW_ROOM, socket.id, nickname, (data, room, users) =>{
			console.log(data);
			this.setState({
				showLayout: true,
				room: room,
				players: users

			});
			console.log('room' + this.state.room);
			console.log('players: ', this.state.players);
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
		let players = null;
		if (this.state.showLayout) {
		  players = (
			<div>
			  { this.state.players.map((player, index) => {
				return<div key={index}> <p>
				{index + 1}. { player.name}
				
		        </p>
		       	<hr></hr>
		       	</div>
			  })}
		    </div>
		   );
		}

		const Button = () => (
          <Route render={({ history}) => (
            <button
              type='button'
              onClick={() => { history.push('/game') }}
            >Submit</button>
          )} />
    	)

		const { nickname, error } = this.state;
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
						<div>
							<h2>Access Code: {this.state.room}</h2>
							{Button()}
                          <ol>{players}</ol>
                        </div>
                       
					}

					 
				
			</div>
		);
	}
}
