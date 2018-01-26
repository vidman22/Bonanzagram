import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import LandingPage from'./containers/LandingPage.js';



 
class App extends Component {
  render () {
    return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={LandingPage}/>
        <br/>
      </div>  

    </BrowserRouter>
    );
  }
}

export default App;
