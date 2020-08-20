import React, { useEffect, useState } from 'react';
import { FieldArray, reduxForm, Field } from "redux-form";
import validator from './validator'
const { InputSubmit } = require(`../../../../components/atoms/input-submit`);
const { UploadForm } = require('./form')
const { onSubmitFail, convertToESTTimeZone, diff_minutes } = require(`../../../../helpers`);
const { Form } = require(`../../../../components/atoms/form`);
const { SnackbarWrapper } = require(`../../../../components/molecules/snackbar-wrapper`);
const { ROUTES } = require(`../../../../shared/constants`);

const UploadScreen = ({ allPlatforms, history, exportWatchParty, allLeagues, handleSubmit = () => { } }) => {
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });

    const [file, onFile] = useState(null)

    const onsubmit = (credentials) => {
        console.log(credentials)

        credentials.WatchParty.map(party => {
            party.contentLength = diff_minutes(party.startTime, party.endTime)
            party.startTime = convertToESTTimeZone(party.startTime);
            party.endTime = convertToESTTimeZone(party.endTime);
            party.league = party.league.value
            party.platform = party.platform.value
            party.sports = party.sports.value === 'Yes' ? true : false

        })
        // console.log(credentials.WatchParty, ' credentials.WatchParty')
        exportWatchParty(credentials.WatchParty, (response) => {
            setSnackBarData({
                variant: response.status ? 'success' : 'error',
                message: response.msg
            });
            setOpenSnackbar(true)
            history.push(ROUTES.WATCH_PARTY)
        }, (error) => {
            setSnackBarData({
                variant: error.status ? 'success' : 'error',
                message: error.msg
            });
            setOpenSnackbar(true)
        })
    }

    return (
        <div className="container-fluid">
            <div class="content-panel">
                <SnackbarWrapper
                    visible={openSnackBar}
                    onClose={() => setOpenSnackbar(false)}
                    variant={snackbarData.variant}
                    message={snackbarData.message}
                />
                <div class="page-title col-12"><h4>Add Watch Party</h4></div>
                <Form onSubmit={handleSubmit(onsubmit)}>
                    <FieldArray
                        name="WatchParty"
                        component={UploadForm}
                        allLeagues={allLeagues}
                        allPlatforms={allPlatforms}
                        onFileChange={(file) => {
                            onFile(file)
                        }}
                    />
                    <InputSubmit buttonLabel={'Upload'} />
                </Form>
            </div>
        </div>
    )
}

export const Screen = reduxForm({
    form: "uploadWatchParty",
    fields: ['parties'],
    // onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(UploadScreen);

