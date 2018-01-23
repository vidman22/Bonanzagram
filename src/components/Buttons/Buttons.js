import React from 'react';
import './Buttons.css'

const buttons = ( props ) => {
    return (
    	<div className="Buttons">
        <button ref="button" onClick= {props.clicked} >Challenge Spelling</button>
        <button ref="button" onClick = {props.click} >Word Completed</button>
        </div>
    )
};

export default buttons;