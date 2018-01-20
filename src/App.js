import React, { Component } from 'react';
import { BrowserRouter, Switch } from "react-router-dom";
import './App.css';
<<<<<<< HEAD
import LandingPage from'./containers/LandingPage';
=======
import Layout from './containers/Layout';
import LandingPage from'./components/LandingPage';
import Rules from './components/Rules';
import Lobby from './components/Lobby';
>>>>>>> 478c88655be4aa317faa35deabe5f8de3ce671bd

class App extends Component {
  render () {
    return (
<<<<<<< HEAD
    
 		<BrowserRouter>
 		
    	  <div className="App">
      		<LandingPage />
      	  </div>
      	  
      	</BrowserRouter>

=======
      <BrowserRouter>
      	<Switch>
          <Route exact path="/layout" component={Layout}/>
          <Route path="/lobby/:str/:user" component={Lobby}/>
          <Route exact path="/rules" component={Rules}/>
      		<Route exact path="/" component={LandingPage}/>
        </Switch>
      </BrowserRouter>
>>>>>>> 478c88655be4aa317faa35deabe5f8de3ce671bd
    );
  }
}

export default App;
