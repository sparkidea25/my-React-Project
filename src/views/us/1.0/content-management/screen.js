import React, { useState } from 'react'
const { CustomFileDrop } = require("../../../../components/cells/custom-filedrop")
const { SnackbarWrapper } = require(`../../../../components/molecules/snackbar-wrapper`);

export const Screen = ({ exportWatchParty }) => {
    const [partyData, setPartyData] = useState([])
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });

    const handleOnFileLoad = (data) => {
        console.log(data)
        // csvToPartydata(data)
        exportWatchParty(data, (response) => {
            setSnackBarData({
                variant: response.status ? 'success' : 'error',
                message: response.msg
            });
            setOpenSnackbar(true)
        }, (response) => {
            setSnackBarData({
                variant: response.status ? 'success' : 'error',
                message: response.msg
            });
            setOpenSnackbar(true)
        })
    }

    return (
        <div class="container-fluid">
            <SnackbarWrapper
                visible={openSnackBar}
                onClose={() => setOpenSnackbar(false)}
                variant={snackbarData.variant}
                message={snackbarData.message}
            />
            <div class="content-panel">
                <div class="page-title">
                    <h1>Content Management</h1>
                </div>
                <div class="content_management">

                    <div class="upload_csv">
                        <div class="upload_btn">
                            <CustomFileDrop
                                handleSubmit={handleOnFileLoad}
                            />
                        </div>

                        <div class="event_posts">

                        </div>

                    </div>
                </div>
            </div>


        </div>)
}
