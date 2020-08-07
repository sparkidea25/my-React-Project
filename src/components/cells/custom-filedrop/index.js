import React from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import './style.scss';
export const CustomFileDrop = ({
    disabled,
    DragDropCSVFile = 'Drag & drop a CSV file',
    or = 'or',
    browse = 'Browse',
    acceptFiles = ".zip,.csv",
    toChooseaFile = "to choose a file",
    buttonText = 'SUBMIT',
    handleSubmit = () => { },
}) => {
    const handleChangeStatus = ({ meta, file }, status) => {
        handleSubmit({ meta, file }, status)
    }

    return (
        <>
            <Dropzone
                disabled={disabled}
                inputContent={(props) => {
                    return (
                        <div className="d-flex align-items-center w-100 drag_drop_option">
                            <i>
                                <img src={require(`../../../assets/img/icons/cloud_icon.svg`)} alt={'non-upload-icon'} />
                            </i>
                            <div {...props} key={props} className="d-flex flex-column px-2 px-md-5 justify-content-center align-items-center">
                                <h4>{'Upload'}</h4>
                                {/* <p>{'File should be 16MB max.'}</p> */}
                            </div>
                        </div>)
                }}
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmit}
                maxFiles={1}
                maxSizeBytes={16 * 1000000}
                submitButtonContent={() => <button className='btn btn-md btn-primary' type="button" onClick={
                    handleChangeStatus
                }>Browse</button>}
                accept={acceptFiles}
                canCancel={true}
                canRemove={true}
            />
        </>
    )
}
