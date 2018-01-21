import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Layout from '../Layout/Layout';
import { USER_CONNECTED, NEW_ROOM } from '../../Events'

// const Button = () => (
//   <Route render={({ history}) => (
//     <button
//       type='button'
//       onClick={() => { history.push('/new-location') }}
//     >
//       Click Me!
//     </button>
//   )} />
// )

export default class CreateGame extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	socket: "",
	  	nickname:"",
	  	error:"",
	  	showLayout: false,
	  	room: ""
	  };
	}

	componentDidMount() {
		// this.myFunction();
		// console.log(this.props.socket);

	}


	handleSubmit = (e)=>{
		e.preventDefault()
		const nickname = this.state.nickname;
		this.props.socket.emit(NEW_ROOM, this.props.socket.id, nickname, (data, room) =>{
			console.log(data);
			this.setState({
				showLayout: true,
				room: room
			});
		});
	}

	handleChange = (e)=>{
		this.setState({nickname:e.target.value})
	}

	setError = (error)=>{
		this.setState({error})
	}

	render() {	
		const { nickname, error } = this.state;

		const Button = () => (
		  <Route render={({ history}) => (
		    <button
		      type='button'
		      onClick={() => { history.push('/game') }}
		    >Submit</button>
		  )} />
		)


		return (
			<div className="login">
				 {/*!this.state.showLayout ?*/}
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
						{Button()} 
					</form>
					{/* :
					<div>
						<Layout room={this.state.room}/>
					</div>	*/}
					

			</div>
		);
	}
}
