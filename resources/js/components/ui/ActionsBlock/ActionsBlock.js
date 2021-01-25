import React from 'react';
import { Link } from 'react-router-dom';

const ActionsBlock = props => (
    <div className="btn-group">
        <button type="button" className="btn btn-danger" onClick={() => props.onDelete(props.row.id)}>Delete</button>
        <button
            disabled={props.row.creatives.length === 0}
            type="button"
            className="btn btn-secondary"
            onClick={() => props.onPreview(props.row.creatives)}
        >
            Preview creatives
        </button>
        <Link to={`/campaigns/edit/${props.row.id}`} className="btn btn-info">Edit</Link>
    </div>
);

export default ActionsBlock;
