import React, { Component } from 'react';
import { BrowserRouter,Switch, Route } from "react-router-dom";
import './App.css';
import LandingPage from'./containers/LandingPage.js';
// import Rules from './containers/Rules';
import Layout from './containers/Layout/Layout.js';

// import CreateGame from '.src//CreateGame/CreateGame';
// import JoinGame from './JoinGame/JoinGame';
// import Rules from './Rules/Rules';

 
class App extends Component {
  render () {
    return (
    <BrowserRouter>
 		<Switch>
      <div className="App">
        {/*<Route path="/game/:num" component={Layout}/>*/}
        <Route path="/" component={LandingPage}/>
      </div>  
    </Switch>
    </BrowserRouter>
    );
  }
}

export default App;
