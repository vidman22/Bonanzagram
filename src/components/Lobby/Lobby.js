import React, {Component} from "react";
import {Link} from 'react-router-dom';
import './Lobby.css';

class Lobby extends Component {

	constructor(props) {
		super(props);
		this.state = {
			players: [],
		}
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		// console.log(this.props.match.params.str);
	}

	handleClick(event) {
		console.log(event)
		this.setState({action: event});
	}



	render() {
		return (
			<div>
				<div className="header">
					<h2>Welcome {this.props.match.params.user}</h2>
					<h3>Lobby: {this.props.match.params.str}</h3>
				</div>
				<div className="content">
					<h3>Game Rules</h3>
					<form>

					</form>
				</div>
				<br/>
				<Link to="/rules">Rules Page</Link>
			</div>
		)
	}
}

export default Lobby;