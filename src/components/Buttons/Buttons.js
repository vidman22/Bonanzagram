import React from 'react';
import './Buttons.css'

const buttons = ( props ) => {
    return (
    	<div className="Buttons">
        <button onClick= {props.clicked} >Challenge Spelling</button>
        <button onClick = {props.click} >Word Completed</button>
        </div>
    )
};

export default buttons;