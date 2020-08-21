import React from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import './style.scss';
export const CustomFileDrop = ({
    input,
    disabled,
    DragDropCSVFile = 'Drag & drop a CSV file',
    meta: { touched, error },
    or = 'or',
    browse = 'Browse',
    acceptFiles = ".jpeg,.png",
    toChooseaFile = "to choose a file",
    buttonText = 'SUBMIT',
    handleSubmit = () => { },
    onChange,
    uploadImage
}) => {
    const buttonRef = React.createRef()
    const validationSpan =
        touched && error ? (
            <span className="error_msg text-danger">{error}</span>
        ) : null;

    const handleChangeStatus = ({ meta, file }, status) => {
        console.log({ meta, file })
        handleSubmit({ meta, file }, status)

        if (status === 'done') {
            uploadImage({ file }, (response) => {
                input.onChange(response && response.fileUrl)
            }, () => { })
        } else if (status === 'removed') {
            input.onChange("")
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
                                {'Upload image'}
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
                accept={acceptFiles}
                canCancel={true}
                canRemove={true}

            />
            {validationSpan}
        </>
    )
}
