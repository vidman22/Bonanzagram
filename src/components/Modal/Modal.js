import React, { Component } from 'react';
import CSSTransition from "react-transition-group/CSSTransition";
import io from 'socket.io-client';
import { WORD_CHALLENGED } from '../../Events'
import './Modal.css'

const socket = io.connect('http://localhost:3001');
// const socket = io();
// const socket = io('https://frozen-caverns-17261.herokuapp.com');
// const socket = io("http://localhost:3001",{
//  path: "/socket.io",
//  "transports": ["xhr-polling"], 
//  "polling duration": 10
// })
// const socket = io.connect();
// const socket = io({
// 	transports: ['websocket']
// });

const animationTiming = {
    enter: 400,
    exit: 1000
};

export default class modal extends Component {
    constructor(props) {
    	super(props);

    	this.state = {
    		word:""
    	};
    }

    handleChange = (e) => {
    	this.setState({word: e.target.value});
    }

    handleSubmit = (e) => {
    	e.preventDefault();
    	const word = this.state.word;
    	socket.emit(WORD_CHALLENGED, word, this.props.room, 'spell');

    }


    render () {

    	return (
		    <CSSTransition 
		        mountOnEnter 
		        unmountOnExit 
		        in={this.props.show} 
		        timeout={animationTiming}
		        classNames={{
		            enter: '',
		            enterActive: 'ModalOpen',
		            exit: '',
		            exitActive: 'ModalClosed'
		        }}>
		        <div className="Modal">
		          <form onSubmit={this.handleSubmit} className="login-form">
		          	<h1>Challenged!</h1>
		            <h2>Correctly spell your word</h2>
		            
		            <input 
		            	ref={(input) =>{this.textInput = input}}
		            	type="text"
		            	id="word"
		            	value={this.state.word}
		            	onChange={this.handleChange}
		            	placeholder={this.props.value}
		            	 />
		            <button onSubmit={this.handleChange} onClick={this.props.closed}>
		              Submit
		            </button>
					</form>
				</div>
		    </CSSTransition>
		   );
        }
    };