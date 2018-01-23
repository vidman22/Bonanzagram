import React from 'react';

import './Keyboard.css';

const Keyboard = (props) => (
     <div className="Keyboard" ref="btn" onClick={props.clicked}>
        <p>{props.letter}</p>
    </div>
);

export default Keyboard;