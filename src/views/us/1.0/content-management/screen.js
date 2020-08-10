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
                <div class="sec_row">

                    <div class="c-col-lft">
                        <div class="upload_csv">
                            <CustomFileDrop
                                handleSubmit={handleOnFileLoad}
                            />
                        </div>
                    </div>

                    <div class="event_posts">
                        <div class="date_time">
                            <span class="time">2:30</span>
                            <span class="date">
                                <strong>Fri</strong>Jul 31
                                </span>
                        </div>
                        <div class="team_group">
                            <hgroup>
                                <h5>Magic at Nets</h5>
                                <h6>Nba on abc</h6>
                            </hgroup>
                            <span class="total_joined">1 Joined</span>
                            <ul class="list_group">
                                <li><img src={require('../../../../assets/img/nba_logo.jpg')} alt="NBA" class="img-fluid" /></li>
                                <li><img src={require('../../../../assets/img/nba_logo.jpg')} alt="NBA" class="img-fluid" /></li>
                                <li><img src={require('../../../../assets/img/nba_logo.jpg')} alt="NBA" class="img-fluid" /></li>
                                <li><img src={require('../../../../assets/img/nba_logo.jpg')} alt="NBA" class="img-fluid" /></li>
                            </ul>
                            <div class="button_group">
                                <button class="btn btn-lg btn-primary btn-radius">Join</button>
                                <button class="btn btn-lg btn-secondary btn-radius">Intersted</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
