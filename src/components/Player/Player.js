import React from 'react';
import Avatar from '../Avatar/Avatar'
import './Player.css'

const player = ( props ) => {
    return (
        <div className="Player">
            <Avatar />
            <h1>{props.name}</h1>
            <h2>Score: {props.score}</h2>
            <h3>{props.turn}</h3>
            

        </div>
    )
};

export default player;