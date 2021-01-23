import React from 'react';

const Alert = ({ alert, onClose }) => {
    if (!alert) {
        return null;
    }

    return (
        <div className={`alert alert-${alert.type}`}>
            {alert.message}
            <button type="button" className='close' onClick={onClose}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
};

export default Alert;
