import React, { Component } from 'react';
import { BrowserRouter,Switch, Route } from "react-router-dom";
import './App.css';
// import Layout from './containers/Layout';
import LandingPage from'./containers/LandingPage.js';
// import Rules from './containers/Rules';
import Lobby from './components/Lobby';
import Test from './components/TestComp/testComponent.js';
import Layout from './containers/Layout/Layout.js';

 
class App extends Component {
  render () {
    return (
    <BrowserRouter>
 		<Switch>
      <div className="App">
        <Route path="/game" component={Lobby}/>
        <Route path="/" component={LandingPage}/>
      </div>  
    </Switch>
    </BrowserRouter>
    );
  }
}

export default App;
