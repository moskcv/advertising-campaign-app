import React from 'react';
import classes from './Modal.module.css';

const Modal = props => {
    if (!props.isVisible) {
        return null;
    }

    return (
        <React.Fragment>
            <div className={classes.Layout} onClick={props.onClick} />
            <div className={classes.Modal}>
                <div className={classes["Modal-Header"]}>
                    <h2>{props.header}</h2>
                    <span onClick={props.onClick}>&times;</span>
                </div>
                <div className={classes["Modal-Body"]}>{props.children}</div>
            </div>
        </React.Fragment>
    );
};

export default Modal;
