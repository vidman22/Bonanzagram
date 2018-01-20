import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

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
                
                	<div className ="Links">
                	<ul>

                            <li><Link to={{
                                pathname: '/',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>Create Game</Link></li>
                            <li><Link to={{
                            	pathname: '/join-game',
                            	hash: '#submit',
                            	search: '?quick-submit=true'
                            }}>Join Game</Link></li>
                           
                        </ul>
                	</div>
               <Switch>
                <Route path="/" component={CreateGame} />
                <Route path="/join-game" component={JoinGame} />
                <Route path="/rules" component={Rules} />
               </Switch>
            </div>
        );
    }
}

export default LandingPage;