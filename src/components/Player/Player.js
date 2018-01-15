import React from 'react';
import Avatar from '../Avatar/Avatar'
import './Player.css'

const player = ( props ) => {
    return (
        <div className="Player">
            <Avatar />
            <h1>{props.name}</h1>
            <button>Challenge Spelling</button>
            <button onClick = {props.clicked} >Word Completed</button>

        </div>
    )
};

export default player;