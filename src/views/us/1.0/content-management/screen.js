import React, { Component, useState } from 'react'
import { CSVReader } from 'react-papaparse'

const buttonRef = React.createRef()

export const Screen = () => {
    const [partyData, setPartyData] = useState([])
    const handleOpenDialog = (e) => {
        // Note that the ref is set async, so it might be null at some point
        if (buttonRef.current) {
            buttonRef.current.open(e)
        }
    }
    const handleOnFileLoad = (data) => {
        console.log(data)
        csvToPartydata(data)
    }

    const csvToPartydata = (data) => {
        let watchPartyArr = []
        let header = data[0].data
        for (let i = 1; i < data.length; i++) {
            let partyArr = [];
            data[i].data.map((obj, index) => {
                let objName = header[index]
                partyArr.push({ [objName]: obj })
            })
            watchPartyArr.push(partyArr)
        }
        console.log('sddg', watchPartyArr)
        setPartyData(watchPartyArr)
    }
    const handleOnRemoveFile = (data) => {
        console.log(data)
    }

    const handleRemoveFile = (e) => {
        // Note that the ref is set async, so it might be null at some point
        if (buttonRef.current) {
            buttonRef.current.removeFile(e)
        }
    }
    return (<div>
        <CSVReader
            ref={buttonRef}
            onFileLoad={handleOnFileLoad}
            //   onError={this.handleOnError}
            noClick
            noDrag
            onRemoveFile={handleOnRemoveFile}
        >
            {({ file }) => (
                <>
                    <div class="container-fluid">
                        <div class="content-panel">
                            <div class="page-title">
                                <h1>Content Management</h1>
                            </div>
                            <div class="content_management">
                                <div class="upload_csv">
                                    <div class="upload_btn">
                                        <i><img src={require(`../../../../assets/img/icons/cloud_icon.svg`)} alt="Collyde" width="70" className="img-fluid" /></i>
                                        <button
                                            type='button'
                                            onClick={handleOpenDialog}
                                        >
                                            Upload
                                        </button>
                                    </div>
                                    <div class="file_name">
                                        {file && file.name}
                                    </div>
                                    <button onClick={handleRemoveFile}> Remove</button>
                                </div>

                                <div class="event_posts">
                                    <div class="date_time">
                                        <span class="time">2:30</span>
                                        <span class="date">
                                            <strong>Fri</strong>
                                            Jul 31
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
                </>
            )}
        </CSVReader>
    </div>)
}
