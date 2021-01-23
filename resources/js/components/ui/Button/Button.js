import React from 'react';

const Button = props => {
    return (
        <button
            className={`btn btn-${props.className}`}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.text}
        </button>
    );
};

export default Button;
