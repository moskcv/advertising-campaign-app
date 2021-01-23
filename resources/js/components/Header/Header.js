import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

const Header = props => {
    return (
        <div className="header">
            <div className="tools d-flex justify-content-between mb-3">
                <div className="tools-left">
                    <h3 className="title">{ props.title }</h3>
                </div>
                <div className="tools-right">
                    <Link to={props.buttonLink} className="btn btn-primary">{ props.buttonText }</Link>
                </div>
            </div>
        </div>
    );
};

Header.propTypes = {
    title: propTypes.string.isRequired,
    buttonLink: propTypes.string.isRequired,
    buttonText:propTypes.string.isRequired
};

export default Header;
