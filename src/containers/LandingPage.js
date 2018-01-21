import React, { Component } from 'react';
import {Link } from 'react-router-dom';

import './LandingPage.css';
import CreateGame from './CreateGame/CreateGame';
import JoinGame from './JoinGame/JoinGame';
// import Rules from './Rules/Rules';



class LandingPage extends Component {


    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                        	<li><h1>BONANAZAGRAM</h1></li>
                            <li><Link to={{
                                pathname: '/create-game'
                            
                            }}>Create Game</Link></li>
                            <li><Link to={{
                            	pathname: '/join-game'
                            	
                            }}>Join Game</Link></li>
                            <li><Link to={{
                            	pathname: '/rules'
                            		
                            }}>Rules</Link></li>
                        </ul>
                    </nav>
                </header>
                
        <Route path="/create-game" component={CreateGame} />
        <Route path="/join-game" component={JoinGame} />
        <Route path="/rules" component={Rules} />


            </div>
        );
    }
}

export default LandingPage;