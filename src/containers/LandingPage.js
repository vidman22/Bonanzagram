import React, { Component } from 'react';
import {Link, Route } from 'react-router-dom';

import './LandingPage.css';
import CreateGame from './CreateGame/CreateGame';
import JoinGame from './JoinGame/JoinGame';
import Rules from './Rules/Rules';



class LandingPage extends Component {


    render () {
        return (
            <div className="Home">
                <header>
                    <nav>
                        <ul>
                        	<li><h1>BONANAZAGRAM</h1></li>
                        </ul>
                    </nav>
                </header>
                <header>
                    <nav>
                        <ul>
                            <li><Link to={{
                                pathname: '/create-game'
                            
                            }}><h3>Create Game</h3></Link></li>
                            <li><Link to={{
                                pathname: '/join-game'
                                
                            }}><h3>Join Game</h3></Link></li>
                            <li><Link to={{
                                pathname: '/rules'
                                    
                            }}><h3>Rules</h3></Link></li>
                        </ul>
                    </nav>
                </header>
            
            <Route exact path="/create-game" component={CreateGame}/>
            <Route path="/join-game" component={JoinGame} />
            <Route path="/rules" component={Rules} />
            
            </div>
        );
    }
}

export default LandingPage;