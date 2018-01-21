import React, { Component } from 'react'
import io from 'socket.io-client';
const socketUrl = "http://localhost:3001";
const socket = io(socketUrl);

export default class Waiting extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	room: "",
	  	players:''
	  };
	}

	componentDidMount() {
		this.initSocket();
		console.log(this.props);
	}



	initSocket = () => {

		socket.on('USER_CONNECTED', (room, users)  => {
			this.setState({players: users});
			this.setState({room: room});
		})
	};


	render() {	
		
		 let players = (
			<div>
			  {this.props.players.map((player, index) => {
				return<div key={index}> <p>
				{index + 1}. { player.name}
				
		        </p>
		       	<hr></hr>
		       	</div>
			  })}
		    </div>
		   );

		return (
			<div className="login">
				<div>
					<h1>Waiting for Players</h1>
					<h2>Access Code: {this.props.room}</h2>
                  <ol>{players}</ol>
                </div>
				
			</div>
		);
	}
}