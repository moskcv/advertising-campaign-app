import React from 'react';
import { Link } from 'react-router-dom';

const ActionsBlock = props => (
    <div className="btn-group">
        <button type="button" className="btn btn-danger" onClick={() => props.onDelete(props.id)}>Delete</button>
        <button type="button" className="btn btn-secondary" onClick={() => props.onPreview(props.id)}>Preview creatives</button>
        <Link to={`/campaigns/edit/${props.id}`} className="btn btn-info">Edit</Link>
    </div>
);

export default ActionsBlock;
