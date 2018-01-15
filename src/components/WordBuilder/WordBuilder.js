import React, {Component} from 'react';
import Char from '../../components/Char/Char';
import Keyboard from '../../components/Keyboard/Keyboard';
import {LETTER_UPDATE} from '../../Events.js';
import io from 'socket.io-client';

const socketUrl = "http://localhost:3001"

  class WordBuilder extends Component {
  state = {
    lineOne: ['q','w','e','r','t','y','u','i','o','p'],
    lineTwo: ['a','s','d','f','g','h','j','k','l'],
    lineThree: ['z','x','c','v','b','n','m'],
    userInput: [],
  } 

  componentWillMount() {
    this.getInput();
  };

  getInput = () => {

    const socket = io(socketUrl);

    socket.on('LETTER_UPDATE', (event) => {
      console.log('received update: ' + event);
      // let userInput = [...this.state.userInput];
      this.setState({userInput: event });
      console.log('userInput: ' + this.state.userInput);
    });
  }



  inputChangedHandler = ( event ) => {
    const socket = io(socketUrl);
    socket.emit(LETTER_UPDATE, event);
    console.log('keyboard input: ' + event);
    // const text = this.state.userInput;
    // text.push(event.toUpperCase());
    // this.setState( { userInput: text} );

  
  }

  render () {
    const charList = this.state.userInput.map((ch, index) => {
      return <Char 
        character={ch} 
        key={index} />;
    });

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
        {charList}
      </div>
    );
  }
}

export default WordBuilder;