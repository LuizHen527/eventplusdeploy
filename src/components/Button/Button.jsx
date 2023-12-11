import React from 'react';

const Button = ( { type, textButton, fnClick} ) => {
    return (
        <button type={type}>
            {textButton}

        </button>
    );
};

export default Button;