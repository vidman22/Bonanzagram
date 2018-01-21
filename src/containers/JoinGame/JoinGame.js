import React, { Component } from 'react';
import { USER_CONNECTED, NEW_ROOM } from '../../Events';
import { Route, Link } from 'react-router-dom';
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
	  	code:"",
	  	error: "",
	  	showLayout: false,
	  };
	}

	handleSubmit = (e)=>{
		e.preventDefault()
		console.log(this.state);
		const nickname = this.state.name;
		const code = this.state.code;
		socket.emit(USER_CONNECTED, nickname, socket.id, code,(room, players) =>{
			console.log(room);
			console.log(players);
			this.setState({
				action: 'waiting',
				room: room,
				players: players

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

					<h2>Add a Join Code</h2>
					<input
						type="text"
						name="code"
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
				return null; 
			  break;
		}
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
