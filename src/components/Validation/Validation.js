import React from 'react';

const validation = ( props ) => {
    let validationMessage = 'Your Turn! Add a letter or challenge!';

    if (props.inputLength >= 1 ) {
    	validationMessage = 'Letter Added';
    }

    return (
        <div>
            <p>{validationMessage}</p>
        </div>
    );
};

export default validation;