import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import './LandingPage.css';
import CreateGame from './CreateGame/CreateGame';
import JoinGame from './JoinGame/JoinGame';
import Rules from './Rules/Rules';


class LandingPage extends Component {


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
                            }}>Create Game</Link></li>
                            <li><Link to={{
                            	pathname: '/join-game',
                            	hash: '#submit',
                            }}>Join Game</Link></li>
                            <li><Link to={{
                            	pathname: '/rules',
                            	hash: '#submit',	
                            }}>Rules</Link></li>
                        </ul>
                    </nav>
                </header>
                
            	<div className="form-stuff">
                    <button name="create" onClick={this.handleClick}>A</button>
                    <button name="join" onClick={this.handleClick}>B</button>
                </div>


            </div>
        );
    }
}

export default LandingPage;