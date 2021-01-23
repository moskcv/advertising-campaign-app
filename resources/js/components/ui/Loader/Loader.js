import React from 'react';
import classes from './Loader.module.css';

const Loader = ({ isLoading }) => {
    if (!isLoading) {
        return null;
    }

    return (
        <div className={classes.Layout}>
            <div className={classes.Loader}>
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
            </div>

        </div>
    );
};

export default Loader;
