import React from 'react';

import './Keyboard.css';

const Keyboard = (props) => (
     <div className="Keyboard" disabled={props.disabled} onClick={props.clicked}>
        <p>{props.letter}</p>
    </div>
);

export default Keyboard;