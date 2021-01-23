import React from 'react';

const Form = props => {
    return (
        <form
            className="form"
            onSubmit={props.onSubmit}
            encType="multipart/form-data"
        >
            { props.children }
            <div className="form-group text-right">
                <button
                    disabled={!props.isFormValid}
                    type="submit"
                    className="btn btn-success"
                >Save</button>
            </div>
        </form>
    );
};

export default Form;
