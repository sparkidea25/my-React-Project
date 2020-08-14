import React, { useState, useEffect } from 'react'
import { CSVReader } from 'react-papaparse'
import moment from 'moment';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const { SnackbarWrapper } = require(`../../../../components/molecules/snackbar-wrapper`);
const { PreviewSlider } = require('../../../../components/atoms/preview-slider')

export const Screen = ({ exportWatchParty, allPlatforms, getPlatforms, getLeagues, getSports, allLeagues }) => {
    const buttonRef = React.createRef()
    const [partyData, setPartyData] = useState([])
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [previewIndex, setPreviewIndex] = useState(1);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    useEffect(() => {
        getPlatforms(() => { }, () => { })
        getLeagues(() => { }, () => { })
        getSports(() => { }, () => { })
    }, [])
    useEffect(() => {

    }, [allPlatforms])
    const handleOnFileLoad = (data) => {

        let arr = []
        for (let i = 1; i < data.length; i++) {
            let obj
            data[0].data.map((head, index) => {
                obj = { ...obj, [head]: data[i].data[index] }
            })

            arr.push(obj)
        }

        setPartyData(arr)
    }
    const handleOnError = () => {

    }
    const handleOnRemoveFile = () => {

    }
    const handleOpenDialog = (e) => {
        // Note that the ref is set async, so it might be null at some point
        if (buttonRef.current) {
            buttonRef.current.open(e)
        }
    }

    const uploadWatchParty = () => {
        let file = { file: buttonRef.current.state.file }
        exportWatchParty(file, (response) => {
            document.getElementsByTagName('body')[0].scrollTo(0, 0)
            setSnackBarData({
                variant: response.status ? 'success' : 'error',
                message: response.msg
            });
            setOpenSnackbar(true)
        }, (response) => {
            document.getElementsByTagName('body')[0].scrollTo(0, 0)
            setSnackBarData({
                variant: response.status ? 'success' : 'error',
                message: response.msg
            });
            setOpenSnackbar(true)
        })
    }
    let platform;
    let league;
    return (
        <>
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
                    <div class="row sec_row">

                        <div class="col-md-5">
                            <div class="upload_csv">
                                {/* <CustomFileDrop
                                handleSubmit={handleOnFileLoad}
                            /> */}
                                <div className="d-flex align-items-center w-100 drag_drop_option">
                                    <i><img src={require(`../../../../assets/img/icons/cloud_icon.svg`)} alt={'non-upload-icon'} width="80" /></i>
                                    <CSVReader
                                        ref={buttonRef}
                                        onFileLoad={handleOnFileLoad}
                                        onError={handleOnError}
                                        noClick
                                        noDrag
                                        onRemoveFile={handleOnRemoveFile}
                                    >
                                        {({ file }) => (
                                            < button
                                                type='button'
                                                onClick={(e) => { handleOpenDialog(e, file) }}
                                                id='upload_btn'
                                            >
                                                Browse
                                            </button>
                                        )}
                                    </CSVReader>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-7">

                            <div className="carasoul-slide">
                                {partyData && partyData.length > 0 ?
                                    partyData[0].sports && partyData[0].league ?
                                        <Carousel onChange={(index) => { setPreviewIndex(index + 1) }}>

                                            {partyData.length > 0 && partyData.map((party, index) => {

                                                platform = allPlatforms && allPlatforms.filter(obj => { return party && party.platform && party.platform.trim() === obj._id.trim() })
                                                league = allLeagues && allLeagues.filter(obj => { return party && party.league && party.league.trim() === obj._id.trim() })
                                                // console.log(platform, league)
                                                return <>
                                                    <div class="event_posts" key={index}>
                                                        <div class="date_time">
                                                            <span class="time">{moment(party && party.startTime).format('LT')}</span>
                                                            <span class="date">
                                                                <strong>{moment(party && party.startTime).format('llll').split(',')[0].toUpperCase()}</strong>
                                                                {moment(party && party.startTime).format('MMM Do').split('th')[0].toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <div class="team_group">
                                                            <hgroup>
                                                                <h5>{party && party.contentName}</h5>
                                                                <h6>{`${platform && platform[0] && platform[0].name} on ${league && league[0] && league[0].name}`}</h6>
                                                            </hgroup>
                                                            <span class="total_joined"></span>
                                                            <ul class="list_group">
                                                                <li><img src={require('../../../../assets/img/nba_logo.jpg')} alt="NBA" class="img-fluid" /></li>
                                                                <li><img src={require('../../../../assets/img/nba_logo.jpg')} alt="NBA" class="img-fluid" /></li>
                                                                <li><img src={require('../../../../assets/img/nba_logo.jpg')} alt="NBA" class="img-fluid" /></li>
                                                                <li><img src={require('../../../../assets/img/nba_logo.jpg')} alt="NBA" class="img-fluid" /></li>
                                                            </ul>
                                                            <div class="button_group">
                                                                <button class="btn btn-lg btn-primary btn-radius">Join</button>
                                                                <button class="btn btn-lg btn-secondary btn-radius">Interested</button>
                                                            </div>
                                                        </div>
                                                    </div> </>

                                            })}
                                        </Carousel> :
                                        'Csv cannot be uploaded' : ''
                                }
                                {partyData && partyData.length > 0 && partyData[0].sports && partyData[0].league ? <PreviewSlider
                                    currentPage={previewIndex}
                                    totalPages={partyData && partyData.length}
                                /> : ''

                                }
                            </div>
                            <div className="text-right">
                                {partyData.length > 0 && partyData[0].sports && partyData[0].league ? <button className="btn btn-lg btn-secondary" onClick={uploadWatchParty}>Upload</button> : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
