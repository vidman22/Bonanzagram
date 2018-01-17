import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
// import Layout from './containers/Layout';
import LandingPage from'./components/LandingPage';
import Rules from './components/Rules';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
      	<Switch>
          {/*<Route exact path="/layout" component={Layout}/>  */}
          <Route exact path="/rules" component={Rules}/>
      		<Route exact path="/" component={LandingPage}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
