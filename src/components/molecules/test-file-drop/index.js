import React from 'react';
import { CustomFileDrop } from '../../cells/custom-filedrop';
import './styles.scss';
const { browseFile } = require(`../../../../redux/sef/actions`)

export const TestFileDrop = ({
    handleSubmit,
    acceptFiles,
    input,
    label,
    meta: { touched, error },
    config,
    placeholder,
    widthStyle,
    fileType,
    style,
    data,
    ...props
}) => {
    widthStyle = widthStyle ? widthStyle : "col-md-12";
    const validationSpan =
        touched && error ? (
            <span className="error_msg text-danger">{error}</span>
        ) : null;
    if (fileType) {
        return (
            <div className='col-md-12 test-file-drop'>
                <hr />
                <label className="mb-3">Upload photo, video or audio</label>
                <div className='row'>
                    <div className='col-xl-12 col-md-12 col-sm-12 mb-3'>
                        <div className='drop_area mb-1'>
                            <CustomFileDrop
                                acceptFiles={fileType}
                                handleSubmit={handleSubmit}
                            />
                        </div>
                        {validationSpan}
                    </div>
                </div>
            </div>
        );
    }
    else {
        return null;
    }

}