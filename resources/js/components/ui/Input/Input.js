import React from 'react';

const isInvalid = ({valid, touched}) => {
    return !valid && touched;
};

const Input = props => {
    const inputType = props.type || 'text';
    const cls = [
        props.className || 'form-control'
    ];

    if (isInvalid(props)) {
        cls.push('is-invalid');
    }

    return (
        <div className="form-group">
            <label htmlFor={props.name}>{props.label}</label>
            <input
                className={cls.join(" ")}
                type={inputType}
                id={props.name}
                name={props.name}
                value={props.value}
                multiple={props.multiple}
                onChange={props.onChange}
                step={props.step}
                accept={props.accept}
            />
            <div className="invalid-feedback">{props.errorMessage}</div>
        </div>
    );
};

export default Input;
