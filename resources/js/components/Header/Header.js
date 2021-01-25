import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => (
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

export default Header;
