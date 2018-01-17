import React, {Component} from "react";
import './LandingPage.css';

class LandingPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
		  btnClick: false,
		  name: ''
		}

		this.createLobby = this.createLobby.bind(this);
		this.joinGame = this.joinGame.bind(this);
	}

	createLobby() {
		this.setState({btnClick: true});
	}

	joinGame() {
		this.setState({btnClick: true});
		console.log(this.state);
	}

	render() {
		return (
			<div>
				<div className="header">
					<h2>Game Header</h2>
				</div>
				<br/><br/>
				<div className="content">
					<button className="create" onClick={this.createLobby}><b>Create Lobby</b></button>
					<button className="join" onClick={this.joinGame}><b>Join Existing Game</b></button>
				</div>
				<br/>
				{this.state.btnClick ?
					<div>
						<form>
							<input></input>

						</form>
					</div>
					: <p>make selection</p>
				}
			</div>
		)
	}
}

export default LandingPage;