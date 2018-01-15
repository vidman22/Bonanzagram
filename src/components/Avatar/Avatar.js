import React from 'react';

import personAvatar from '../../assets/png/avatar.png';
import './Avatar.css';

const avatar = (props) => (
     <div className="Avatar">
        <img src={personAvatar} alt="Avatar" />
    </div>
);

export default avatar;