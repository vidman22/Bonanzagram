import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import LandingPage from'./containers/LandingPage.js';


 
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
