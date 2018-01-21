import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import Layout from '../../containers/Layout/Layout';
import { NEW_ROOM } from '../../Events';
import io from 'socket.io-client';
const socketUrl = "http://localhost:3001";
const socket = io(socketUrl);

export default class Waiting extends Component {
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


		const { nickname, error } = this.state;
		return (
			<div className="login">
	
				
						<div>
							<h1>Waiting for Players</h1>
							<h2>Access Code: {this.state.room}</h2>
							<Link to={{
	                            	pathname:'/game'	
	                            }}><h1>Play</h1></Link>
                          <ol>{players}</ol>
                        </div>

					}

					<Route path='/game' component={Layout} />
				
			</div>
		);
	}
}
