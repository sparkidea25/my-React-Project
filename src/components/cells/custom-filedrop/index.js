import React from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import './style.scss';
export const CustomFileDrop = ({
    disabled,
    DragDropCSVFile = 'Drag & drop a CSV file',
    or = 'or',
    browse = 'Browse',
    acceptFiles = ".csv",
    toChooseaFile = "to choose a file",
    buttonText = 'SUBMIT',
    handleSubmit = () => { },
}) => {
    // const [displayContents, setDisplayContents] = useState()
    const handleChangeStatus = ({ meta, file }, status) => {
        console.log('gfg', file, meta, status)

        handleSubmit({ meta, file }, status)
    }

    return (
        <>
            <Dropzone
                disabled={disabled}
                inputContent={(props) => {
                    return (
                        <div className="d-flex align-items-center w-100 drag_drop_option">
                            <i><img src={require(`../../../assets/img/icons/cloud_icon.svg`)} alt={'non-upload-icon'} width="80" /></i>
                            <div {...props} key={props} className="upload_btn">
                                {'Upload'}
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
