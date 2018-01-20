import React, { Component } from 'react';
import { BrowserRouter, Switch } from "react-router-dom";
import './App.css';
import LandingPage from'./containers/LandingPage';

class App extends Component {
  render () {
    return (
    
 		<BrowserRouter>
 		
    	  <div className="App">
      		<LandingPage />
      	  </div>
      	  
      	</BrowserRouter>

    );
  }
}

export default App;
