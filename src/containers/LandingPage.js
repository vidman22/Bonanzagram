import React, { Component } from 'react';
import {Link } from 'react-router-dom';

import './LandingPage.css';
import CreateGame from './CreateGame/CreateGame';
import JoinGame from './JoinGame/JoinGame';
// import Rules from './Rules/Rules';

import {NEW_ROOM} from '../Events';
import io from 'socket.io-client';
const socketUrl = "http://localhost:3001";
const socket = io(socketUrl);

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createGame: true,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        var action = e.target.name;
        if(action === 'create') this.setState({createGame: true});
        if(action === 'join') this.setState({createGame: false});

    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                        	<li><h1>BONANAZAGRAM</h1></li>
                            <li><Link to={{
                                pathname: '/create-game',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>Create Game</Link></li>
                            <li><Link to={{
                            	pathname: '/join-game',
                            	hash: '#submit',
                            	search: '?quick-submit=true'
                            }}>Join Game</Link></li>
                            <li><Link to={{
                            	pathname: '/rules',
                            	hash: '#submit',
                            	search: '?quick-submit=true'
                            }}>Rules</Link></li>
                        </ul>
                    </nav>
                </header>
                
            	<div className="form-stuff">
                    <button name="create" onClick={this.handleClick}>A</button>
                    <button name="join" onClick={this.handleClick}>B</button>
                </div>

            { this.state.createGame ?
                <div>
                    <CreateGame
                      socket={socket}
                    />
                </div>
                :                    
                <div>
                    <JoinGame
                      socket={socket}
                    />
                </div>
            }

            </div>
        );
    }
}

export default LandingPage;