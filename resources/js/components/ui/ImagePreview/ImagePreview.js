import React from 'react-router-dom';
import classes from './ImagePreview.module.css';

const ImagePreview = ({ control, onClick, controlName }) => {
    if (!control.files || !control.uploaded) {
        return null;
    }

    return (
        <div className={classes.ImagePreview}>
            <div>
                {control.files.map((file, index) => {
                    return (
                        <div className={classes.ImageWrapper} key={index}>
                            <img src={URL.createObjectURL(file)} alt={file.name} />
                            <span onClick={() => onClick(controlName, index, 'files')}>&times;</span>
                        </div>
                    );
                })}
            </div>
            <div>
                {control.uploaded.map((upload, index) => {
                    return (
                        <div className={classes.ImageWrapper} key={index}>
                            <img src={`/uploads/${upload.name}`} alt={upload.name} />
                            <span onClick={() => onClick(controlName, upload.id, 'uploaded')}>&times;</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ImagePreview;
