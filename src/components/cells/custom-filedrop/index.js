import React from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import './style.scss';
import { CLOSE_ICON } from '../../../shared/constants/icons'

export const CustomFileDrop = ({
    input,
    disabled,
    DragDropCSVFile = 'Drag & drop a CSV file',
    meta: { touched, error },
    or = 'or',
    browse = 'Browse',
    acceptFiles = " ",
    toChooseaFile = "to choose a file",
    buttonText = 'SUBMIT',
    handleSubmit = () => { },
    onChange,
    uploadVideoFile = () => { },
    userToken = ''
}) => {
    const buttonRef = React.createRef()
    const [filename, updateFilename] = React.useState()
    const validationSpan =
        touched && error ? (
            <span className="error_msg text-danger">{error}</span>
        ) : null;

    const handleChangeStatus = ({ meta, file }, status) => {
        console.log('video download status', { meta, file }, status)
        // handleSubmit({ meta, file }, status)
        console.log('meta', meta)
        updateFilename(file.name)
        if (status === 'done') {
            console.log('file', file.name)
            uploadVideoFile(file)
        }
    }
    return (
        <>
            <Dropzone
                ref={buttonRef}
                disabled={disabled}
                inputContent={(props) => {
                    return (
                        <div className="d-flex align-items-center w-100 drag_drop_option">
                            <i><img src={require(`../../../assets/img/icons/cloud_icon.svg`)} alt={'non-upload-icon'} width="55" /></i>
                            <div {...props} key={props} className="upload_btn">
                                {'Upload Video'}
                                {/* <p>{'File should be 16MB max.'}</p> */}
                            </div>
                        </div>)
                }}

                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmit}
                maxFiles={1}
                maxSizeBytes={25 * 1000000}
                // submitButtonContent={() => <button className='btn btn-md btn-primary' type="button" onClick={
                //     handleChangeStatus
                // }>Browse</button>}
                PreviewComponent={() => {
                    return <div class="dzu-dropzone"><div class="dzu-previewContainer"><span class="dzu-previewFileName">{filename}</span><div class="dzu-previewStatusContainer"><span class="dzu-previewButton" style={{ backgroundImage: `url(${CLOSE_ICON})` }}></span></div></div><div class="dzu-submitButtonContainer"><button class="dzu-submitButton">Submit</button></div></div>
                }}
                accept={acceptFiles}
                canCancel={true}
                canRemove={true}
            />
            {validationSpan}
        </>
    )
}
