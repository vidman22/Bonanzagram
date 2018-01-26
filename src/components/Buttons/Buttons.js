import React from 'react';
import './Buttons.css'

const buttons = ( props ) => {
    return (
    	<div className="Buttons">
	        <button disabled={props.disabled} onClick= {props.clicked} >Challenge Spelling</button>
	        <button disabled={props.disabled} onClick = {props.click} >Word Completed</button>
        </div>
    )
};

export default buttons;