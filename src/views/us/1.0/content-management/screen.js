import React, { Component, useState } from 'react'
import { CSVReader } from 'react-papaparse'
const { CustomFileDrop } = require("../../../../components/cells/custom-filedrop")
const buttonRef = React.createRef()

export const Screen = ({ exportWatchParty }) => {
    const [partyData, setPartyData] = useState([])
    const handleOpenDialog = (e) => {
        // Note that the ref is set async, so it might be null at some point
        if (buttonRef.current) {
            buttonRef.current.open(e)
        }
    }
    const handleOnFileLoad = (data) => {
        console.log(data)
        // csvToPartydata(data)
        exportWatchParty(data, () => { }, () => { })
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


    const handleRemoveFile = (e) => {
        // Note that the ref is set async, so it might be null at some point
        if (buttonRef.current) {
            buttonRef.current.removeFile(e)
        }
    }
    return (
        <div class="container-fluid">
            <div class="content-panel">
                <div class="page-title">
                    <h1>Content Management</h1>
                </div>
                <div class="content_management">

                    <div class="upload_csv">
                        <div class="upload_btn">
                            <CustomFileDrop
                                // ref={buttonRef}
                                handleSubmit={handleOnFileLoad}
                            //   onError={this.handleOnError}
                            // noClick
                            // noDrag
                            // onRemoveFile={handleOnRemoveFile}
                            />
                        </div>

                        <div class="event_posts">

                        </div>

                    </div>
                </div>
            </div>


        </div>)
}
