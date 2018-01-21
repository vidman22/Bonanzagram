import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import LandingPage from'./containers/LandingPage';
import Layout from './containers/Layout/Layout';

 
class App extends Component {
  render () {
    return (
    
 		<BrowserRouter>
 		
      <div className="App">
        <LandingPage />
        <Route path="/game"  component={Layout} />
      </div>  
    </BrowserRouter>
    );
  }
}

export default App;
