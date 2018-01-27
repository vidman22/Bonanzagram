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
                
                
                        <div className="title">
                        	<div className="text text-B">B</div>
                            <div className="text text-O">O</div>
                            <div className="text text-N">N</div>
                            <div className="text text-A">A</div>
                            <div className="text text-N2">N</div>
                            <div className="text text-Z">Z</div>
                            <div className="text text-A2">A</div>
                            <div className="text text-G">G</div>
                            <div className="text text-R">R</div>
                            <div className="text text-A3">A</div>
                            <div className="text text-M">M</div>
                
                        </div>
                        
                   
               
                
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

                
            
            <Route exact path="/create-game" component={CreateGame}/>
            <Route path="/join-game" component={JoinGame} />
            <Route path="/rules" component={Rules} />
            </div>

        );
    }
}

export default LandingPage;