import React, { Component } from 'react';
import Keyboard from '../../components/Keyboard/Keyboard';
import {LETTER_UPDATE} from '../../Events.js';
import io from 'socket.io-client';

const socketUrl = "http://localhost:3001";
  
 export default class WordBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineOne: ['q','w','e','r','t','y','u','i','o','p'],
      lineTwo: ['a','s','d','f','g','h','j','k','l'],
      lineThree: ['z','x','c','v','b','n','m'],
      userInput: [],
    };
   }

  componentWillUpdate() {
    // this.getInput();
  };


  inputChangedHandler = ( event ) => {
    this.refs.btn.setAttribute("disabled", "disabled");
    const socket = io(socketUrl);
    socket.emit(LETTER_UPDATE, event.toUpperCase(), this.props.room, this.props.player);
    this.refs.btn.removeAttribute("disabled");
  }

  render () {
    

    const line_one = this.state.lineOne.map((ch, index) => {
      return <Keyboard
          letter={ch.toUpperCase()}
          clicked={() => this.inputChangedHandler(ch)}
          key={index} />;
    });

    const line_two = this.state.lineTwo.map((ch, index) => {
      return <Keyboard
          letter={ch.toUpperCase()}
          clicked={() => this.inputChangedHandler(ch)}
          key={index} />;
    });

    const line_three = this.state.lineThree.map((ch, index) => {
      return <Keyboard
          letter={ch.toUpperCase()}
          clicked={() => this.inputChangedHandler(ch)}
          key={index} />;
    });

    return (
      <div className="App">
        {line_one}
        <div></div>
        {line_two}
        <div></div>
        {line_three}
        <div></div>
      </div>
    );
  }
}
